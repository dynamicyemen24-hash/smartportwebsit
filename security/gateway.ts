// secure.ts
import { getClientFingerprint } from './fingerprint'; // بصمة المتصفح
import { logSecurityEvent } from './logger'; // سجل الأمان
import { rateLimit } from './rateLimit'; // نفترض وجود دالة جاهزة أو يمكننا تنفيذها
import { verifyUser } from './verify';

// واجهة إضافية لبيئة الطلب
interface SecureRequest extends Request {
  ip?: string;
  userAgent?: string;
}

// الإعدادات الافتراضية
const DEFAULT_OPTIONS = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 100, // 100 طلب كحد أقصى لكل بصمة/ip
  },
  maxFailedAttempts: 5, // عدد محاولات الفشل قبل قفل الحساب مؤقتًا
  lockDuration: 30 * 60 * 1000, // 30 دقيقة قفل
  enableFingerprinting: true, // ربط التوكن ببصمة العميل
  enableReplayProtection: true, // منع إعادة استخدام التوكن القديم
  tokenLeeway: 60, // السماح بفارق 60 ثانية في التوقيت (للتسامح)
};

const REPLAY_PROTECTION_TTL = 5 * 60 * 1000; // 5 دقائق

type FailedAttemptInfo = {
  count: number;
  firstAttemptAt: number;
};

type LockInfo = {
  expiresAt: number;
};

type UsedTokenInfo = {
  expiresAt: number;
};

const failedAttemptsStore = new Map<string, FailedAttemptInfo>();
const lockoutStore = new Map<string, LockInfo>();
const replayTokenStore = new Map<string, UsedTokenInfo>();

/**
 * secure - دالة مصادقة وتفويض متقدمة
 * @param req الطلب الوارد (مع معلومات IP و User-Agent)
 * @param roles قائمة الأدوار المسموح بها
 * @param handler الدالة التي سيتم تنفيذها عند النجاح
 * @param options إعدادات إضافية لتخصيص الحماية
 */
export async function secure(
  req: SecureRequest,
  roles: string[],
  handler: Function,
  options: Partial<typeof DEFAULT_OPTIONS> = {},
): Promise<Response> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const clientId = config.enableFingerprinting
    ? await getClientFingerprint(req)
    : req.ip || req.headers.get('x-forwarded-for') || 'unknown';

  // 1. التحقق من معدل الطلبات (Rate Limiting)
  const isRateLimited = await rateLimit(clientId, config.rateLimit);
  if (isRateLimited) {
    await logSecurityEvent('rate_limit_exceeded', { clientId, path: req.url });
    return new Response('Too Many Requests', { status: 429 });
  }

  // 2. التحقق من القفل المؤقت قبل محاولة التفويض
  if (await isAccountLocked(clientId)) {
    await logSecurityEvent('account_locked', { clientId, path: req.url });
    return new Response('Account temporarily locked. Try again later.', { status: 403 });
  }

  // 3. استخراج التوكن من الـ Header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    await logSecurityEvent('missing_token', { clientId });
    return new Response('Unauthorized: Missing or invalid token format', { status: 401 });
  }
  const token = authHeader.slice(7);

  // 3. التحقق من صحة التوكن (expiry, signature, issuer...)
  let user;
  try {
    user = await verifyUser(token, {
      checkExpiry: true,
      tokenLeeway: config.tokenLeeway,
      requireFingerprint: config.enableFingerprinting,
      clientFingerprint: clientId,
    });
  } catch (err: any) {
    // زيادة عداد المحاولات الفاشلة
    await incrementFailedAttempts(clientId, config.maxFailedAttempts, config.lockDuration);
    await logSecurityEvent('invalid_token', { clientId, error: err.message });
    return new Response('Invalid token', { status: 401 });
  }

  if (!user) {
    await incrementFailedAttempts(clientId, config.maxFailedAttempts, config.lockDuration);
    return new Response('Unauthorized', { status: 401 });
  }

  // 5. التحقق من الدور (Role-Based Access Control)
  if (!roles.includes(user.role)) {
    await logSecurityEvent('forbidden_role', {
      userId: user.id,
      role: user.role,
      requiredRoles: roles,
    });
    return new Response('Forbidden: Insufficient permissions', { status: 403 });
  }

  // 6. حماية إعادة التشغيل (Replay Attack) باستخدام nonce أو timestamp مخزن
  if (config.enableReplayProtection) {
    const tokenId = user.jti || token.slice(-16); // jti = unique token ID
    const isReplay = await isTokenReplayed(tokenId);
    if (isReplay) {
      await logSecurityEvent('replay_attack', { userId: user.id, tokenId });
      return new Response('Invalid request', { status: 401 });
    }
    await markTokenAsUsed(tokenId);
  }

  // 7. (اختياري) تجديد التوكن إذا كان على وشك الانتهاء
  let newToken: string | null = null;
  if (shouldRefreshToken(user.exp)) {
    newToken = await generateRefreshedToken(user);
    // إضافة التوكن الجديد في الرد Header (يمكن للعميل استبداله)
  }

  // 8. تنفيذ الـ handler الأصلي مع إمكانية إضافة التوكن الجديد للرد
  const response = await handler(user, req);

  // 9. إضافة التوكن الجديد في الرد إذا وُجد
  if (newToken && response instanceof Response) {
    response.headers.set('X-New-Authorization', `Bearer ${newToken}`);
  }

  return response;
}

// ========== دوال مساعدة (يمكن تنفيذها باستخدام Redis أو تخزين مؤقت) ==========

async function incrementFailedAttempts(
  clientId: string,
  maxAttempts: number,
  lockDuration: number,
) {
  const now = Date.now();
  const current = failedAttemptsStore.get(clientId);

  if (!current || now - current.firstAttemptAt > lockDuration) {
    failedAttemptsStore.set(clientId, { count: 1, firstAttemptAt: now });
    return;
  }

  const updatedCount = current.count + 1;
  if (updatedCount >= maxAttempts) {
    lockoutStore.set(clientId, { expiresAt: now + lockDuration });
    failedAttemptsStore.delete(clientId);
    return;
  }

  failedAttemptsStore.set(clientId, {
    count: updatedCount,
    firstAttemptAt: current.firstAttemptAt,
  });
}

async function isAccountLocked(clientId: string): Promise<boolean> {
  const lockInfo = lockoutStore.get(clientId);
  if (!lockInfo) {
    return false;
  }

  if (lockInfo.expiresAt <= Date.now()) {
    lockoutStore.delete(clientId);
    return false;
  }

  return true;
}

async function isTokenReplayed(tokenId: string): Promise<boolean> {
  const usedToken = replayTokenStore.get(tokenId);
  if (!usedToken) {
    return false;
  }

  if (usedToken.expiresAt <= Date.now()) {
    replayTokenStore.delete(tokenId);
    return false;
  }

  return true;
}

async function markTokenAsUsed(tokenId: string) {
  replayTokenStore.set(tokenId, { expiresAt: Date.now() + REPLAY_PROTECTION_TTL });
}

function shouldRefreshToken(exp: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = exp - now;
  return timeLeft < 300; // أقل من 5 دقائق متبقية
}

async function generateRefreshedToken(user: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user.id,
    role: user.role,
    exp: now + 60 * 60,
    jti: user.jti ?? `jti-${Math.random().toString(36).slice(2)}`,
  };

  if (typeof btoa !== 'function') {
    throw new Error('Token refresh is not supported in this environment');
  }

  const body = btoa(JSON.stringify(payload));
  return `refresh.${body}.signature`;
}
