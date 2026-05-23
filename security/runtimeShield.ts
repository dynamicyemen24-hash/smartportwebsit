/**
 * runtimeShield - طبقات متعددة للحماية في بيئة التشغيل
 * @param {Object} options - إعدادات اختيارية
 * @param {boolean} options.detectDevTools - كشف أدوات المطور (افتراضي true)
 * @param {boolean} options.blockShortcuts - منع اختصارات لوحة المفاتيح (افتراضي true)
 * @param {boolean} options.preventCopy - منع النسخ والقص (افتراضي false، لأنها قد تضر بتجربة المستخدم)
 * @param {boolean} options.redirectOnDetect - إعادة التوجيه عند كشف الاختراق (افتراضي false، يمكن توجيه إلى صفحة أمنية)
 * @param {string} options.redirectUrl - رابط إعادة التوجيه في حالة الكشف
 * @returns {Function} دالة لإيقاف الحماية (cleanup)
 */
export function runtimeShield(
  options: {
    detectDevTools?: boolean;
    blockShortcuts?: boolean;
    preventCopy?: boolean;
    redirectOnDetect?: boolean;
    redirectUrl?: string;
  } = {},
) {
  const {
    detectDevTools = true,
    blockShortcuts = true,
    preventCopy = false,
    redirectOnDetect = false,
    redirectUrl = '/security-alert.html',
  } = options;

  let devToolsActive = false;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  // ---------- 1. كشف أدوات المطور المتقدم ----------
  function detectDevToolsAdvanced() {
    // الطريقة 1: فحص الفرق بين عرض النافذة وعرض العنصر الخارجي (مستخدمة في React DevTools)
    const threshold = 160; // فرق معقول لفتح أدوات المطور
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > threshold || heightDiff > threshold) {
      return true;
    }

    // الطريقة 2: فحص كونسول الديباتشر (debugger) - المكرر
    // نستخدم try-catch مع Date لتحديد ما إذا تم فتح DevTools
    const before = new Date().getTime();
    debugger; // إذا كانت أدوات المطور مفتوحة، سيوقف التنفيذ مؤقتاً مما يزيد الوقت
    const after = new Date().getTime();
    if (after - before > 100) {
      return true;
    }

    // الطريقة 3: فحص toString للكائنات المستخدمة في console
    const fake = /./;
    fake.toString = function () {
      throw new Error('DevTools detected');
    };
    try {
      console.log(fake);
    } catch (e) {
      return true;
    }

    // الطريقة 4: فحص وجود console.clear مغير (بعض أدوات المطور تستدعيه)
    const originalClear = console.clear;
    console.clear = function () {
      devToolsActive = true;
      return originalClear.apply(this, []);
    };
    setTimeout(() => {
      console.clear = originalClear;
    }, 1000);

    return devToolsActive;
  }

  // رد الفعل عند كشف أدوات المطور
  function handleDevToolsDetected() {
    if (redirectOnDetect) {
      window.location.href = redirectUrl;
    } else {
      // تعطيل الصفحة بشكل كامل دون إعادة توجيه (مسح المحتوى)
      document.body.innerHTML = '<h1>Access Denied</h1><p>Developer tools are not allowed.</p>';
      // منع أي أحداث أخرى
      document.body.style.pointerEvents = 'none';
      throw new Error('Security violation: Developer tools detected');
    }
  }

  // ---------- 2. منع الاختصارات الضارة ----------
  function blockHarmfulShortcuts(e: KeyboardEvent) {
    const key = e.key;
    const ctrl = e.ctrlKey || e.metaKey;
    const shift = e.shiftKey;

    // منع F12 و Ctrl+Shift+I و Ctrl+Shift+C و Ctrl+Shift+J و Ctrl+U (عرض المصدر) و Ctrl+S (حفظ) و Ctrl+P (طباعة)
    if (
      key === 'F12' ||
      (ctrl && shift && (key === 'I' || key === 'C' || key === 'J')) ||
      (ctrl && key === 'u') ||
      (ctrl && key === 's') ||
      (ctrl && key === 'p') ||
      (ctrl && shift && key === 'K') // فتح console في Firefox
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // منع Ctrl+Shift+K (تنظيف console في Firefox)
    if (ctrl && shift && key === 'K') {
      e.preventDefault();
      return false;
    }

    return true;
  }

  // ---------- 3. حماية ضد العبث بالـ prototype أو إعادة تعريف الدوال ----------
  function freezePrototypes() {
    // تجميد الكائنات الأساسية لمنع التعديل (في بيئة آمنة، لكن بحذر)
    // لا نجمّد الـ Object نفسها لأنها قد تعطل المكتبات، بل نحمي بعض الخواص
    const importantObjects = [window, document, navigator];
    importantObjects.forEach((obj) => {
      if (obj && !Object.isFrozen(obj)) {
        try {
          Object.freeze(obj);
        } catch (e) {
          /* بعض الكائنات لا تقبل التجميد */
        }
      }
    });
  }

  // ---------- 4. منع النسخ والقص (اختياري) ----------
  function disableCopyPaste(e: Event) {
    e.preventDefault();
    return false;
  }

  // ---------- 5. الكشف الدوري (loop detection) ----------
  function startPeriodicCheck() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (detectDevTools && detectDevToolsAdvanced()) {
        handleDevToolsDetected();
      }
    }, 2000); // فحص كل ثانيتين
  }

  // ---------- 6. إرفاق المستمعات ----------
  function attachEventListeners() {
    if (blockShortcuts) {
      document.addEventListener('keydown', blockHarmfulShortcuts, false);
    }
    if (preventCopy) {
      document.addEventListener('copy', disableCopyPaste);
      document.addEventListener('cut', disableCopyPaste);
      document.addEventListener('contextmenu', disableCopyPaste); // منع قائمة النقر اليمنى
    } else {
      // على الأقل نمنع قائمة النقر اليمنى بشكل افتراضي (يمكن إلغاء التعليق)
      document.addEventListener('contextmenu', (e) => e.preventDefault());
    }
  }

  // ---------- 7. تنفيذ الحماية ----------
  attachEventListeners();
  freezePrototypes();

  if (detectDevTools) {
    startPeriodicCheck();
    // محاولة فورية للكشف
    if (detectDevToolsAdvanced()) handleDevToolsDetected();
  }

  // حماية ضد فتح أدوات المطور عن طريق الـ console (تعطيل بعض الدوال)
  if (window.console) {
    const noop: (...args: unknown[]) => void = () => {};
    // تعطيل دوال console التي قد تستخدم في الحقن (مع الاحتفاظ بـ error و warn للإبلاغ)
    const sensitiveMethods: Array<keyof Console> = [
      'log',
      'info',
      'debug',
      'trace',
      'table',
      'dir',
      'assert',
    ];
    sensitiveMethods.forEach((method) => {
      if (console[method]) {
        console[method] = noop as any;
      }
    });
    // حماية console من التعديل
    Object.freeze(console);
  }

  // ---------- 8. دالة التنظيف (في حال أردت إيقاف الحماية) ----------
  return function cleanup() {
    if (intervalId) clearInterval(intervalId);
    document.removeEventListener('keydown', blockHarmfulShortcuts);
    document.removeEventListener('copy', disableCopyPaste);
    document.removeEventListener('cut', disableCopyPaste);
    document.removeEventListener('contextmenu', disableCopyPaste);
    // إعادة console إلى حالته الأصلية (صعب، لكن يمكن حذفنا للإشارة)
  };
}

// مثال على الاستخدام داخل تطبيق React (مثلاً في useEffect)
/*
useEffect(() => {
  const cleanup = runtimeShield({
    detectDevTools: true,
    blockShortcuts: true,
    preventCopy: false,
    redirectOnDetect: true,
    redirectUrl: '/unauthorized'
  });
  return cleanup;
}, []);
*/
