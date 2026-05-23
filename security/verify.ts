type VerifyOptions = {
  checkExpiry: boolean;
  tokenLeeway?: number;
  requireFingerprint: boolean;
  clientFingerprint?: string;
};

type VerifiedUser = {
  id: string;
  role: string;
  exp: number;
  jti: string;
};

function decodeBase64(value: string): string {
  if (typeof atob !== 'function') {
    throw new Error('Base64 decode is unavailable in this environment');
  }
  return atob(value);
}

function parseTokenPayload(token: string): Record<string, unknown> {
  const segments = token.split('.').filter(Boolean);
  const payloadSegment = segments.length >= 2 ? segments[1] : token;

  if (!payloadSegment) {
    throw new Error('Token payload is missing');
  }

  try {
    const decoded = decodeBase64(payloadSegment.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch (error) {
    throw new Error('Failed to decode token payload');
  }
}

export async function verifyUser(
  token: string,
  options: VerifyOptions,
): Promise<VerifiedUser | null> {
  if (!token) {
    throw new Error('Invalid token');
  }

  const payload = parseTokenPayload(token);
  const id = String(payload.sub ?? payload.id ?? 'user-unknown');
  const role = String(payload.role ?? 'user');
  const exp = Number(payload.exp ?? 0);
  const jti = String(payload.jti ?? `jti-${Math.random().toString(36).slice(2)}`);

  const now = Math.floor(Date.now() / 1000);
  const leeway = options.tokenLeeway ?? 60;

  if (options.checkExpiry && exp && exp + leeway < now) {
    throw new Error('Token expired');
  }

  if (options.requireFingerprint && options.clientFingerprint) {
    const tokenFingerprint = String(payload.fp ?? '');
    if (!tokenFingerprint || tokenFingerprint !== options.clientFingerprint) {
      throw new Error('Fingerprint mismatch');
    }
  }

  return {
    id,
    role,
    exp: exp || now + 60 * 60,
    jti,
  };
}
