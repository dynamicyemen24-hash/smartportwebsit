import {
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  ShieldUser, // Changed from ShieldStar
} from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../../utils/api';
import Logo from '../components/Logo';

interface AdminLoginProps {
  readonly onLoginSuccess: () => void; // Made read-only
}

const DEFAULT_ADMIN = {
  email: 'admin@smartportsco.com',
  password: 'process.env.ADMIN_DEFAULT_PASSWORD', // Placeholder, emphasize secure handling
  label: 'الحساب الإداري الافتراضي',
};

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('admin_remember_email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await api.login(email, password);
      if (rememberMe) {
        localStorage.setItem('admin_remember_email', email);
      } else {
        localStorage.removeItem('admin_remember_email');
      }
      onLoginSuccess();
    } catch (err: unknown) { // Changed from any to unknown
      let errorMessage = 'فشل تسجيل الدخول';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fillDefaultAdmin = () => {
    setEmail(DEFAULT_ADMIN.email);
    setPassword(DEFAULT_ADMIN.password);
    setError('');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"
      dir="rtl"
    >
      <div className="w-full max-w-2xl px-4">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[radial-gradient(circle_at_top_right,_rgba(191,255,0,0.22),_transparent_35%)] p-8">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-3xl grid place-items-center"
                  style={{ backgroundColor: '#BFFF00' }}
                >
                  <Logo size={34} />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold" style={{ color: '#0A1F44' }}>
                    دخول لوحة الإدارة
                  </h1>
                  <p className="text-sm text-slate-600">
                    واجهة احترافية لإدارة المنصة وبيانات العملاء
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span>تسجيل دخول آمن عبر جلسة مشفرة</span>
                </div>
                <div className="flex items-center gap-2">
                  <KeyRound size={18} className="text-sky-500" />
                  <span>إدارة المستخدمين والصلاحيات بطريقة احترافية</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldUser size={18} className="text-violet-500" />
                  <span>وضع قياسي للاعتماد على أفضل الممارسات الأمنية</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              {error && (
                <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pr-10 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-200"
                      placeholder="admin@smartportsco.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <Lock
                      size={20}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pr-12 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-200"
                      placeholder="••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                      aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-lime-500 focus:ring-lime-500"
                    />
                    تذكر البريد الإلكتروني
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-[#BFFF00] px-5 py-3 text-lg font-semibold text-slate-950 transition hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{DEFAULT_ADMIN.label}</p>
                    <p className="text-sm text-slate-600">
                      استخدم بيانات الدخول التالية للوصول بسرعة.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fillDefaultAdmin}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                  >
                    تعبئة بيانات العرض
                  </button>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-slate-600">
                  <div className="rounded-xl bg-white p-3 border border-slate-200">
                    <span className="font-medium text-slate-800">البريد</span>:{' '}
                    {DEFAULT_ADMIN.email}
                  </div>
                  <div className="rounded-xl bg-white p-3 border border-slate-200">
                    <span className="font-medium text-slate-800">كلمة المرور</span>:{' '}
                    {DEFAULT_ADMIN.password}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl bg-white/10 p-5 border border-white/10">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
                  أثناء تسجيل الدخول
                </div>
                <h2 className="mt-4 text-2xl font-semibold">بيئة وصول احترافية</h2>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  قم بتسجيل الدخول باستخدام حسابك الإداري الخاص أو جرب الحساب الافتراضي للعرض.
                  الحماية المتقدمة والواجهة المريحة تجعل إدارتك أسرع وأكثر ثقة.
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  'دعم متعدد المستخدمين',
                  'تسجيل دخول عبر بريد الشركة',
                  'جلسات آمنة ومشفرة',
                  'تقارير ومتابعة في الوقت الحقيقي',
                ].map((text) => (
                  <div key={text} className="rounded-3xl bg-white/10 p-4 border border-white/10">
                    <div className="text-sm text-slate-200">{text}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl bg-white/10 p-5 border border-white/10 text-sm text-slate-300">
                <div className="font-semibold text-lime-300">طرق دخول احترافية</div>
                <ul className="mt-3 space-y-2 text-slate-200">
                  <li>• تسجيل دخول مباشر عبر البريد الإلكتروني</li>
                  <li>• خيار تذكر البريد الإلكتروني</li>
                  <li>• تنبيه فوري لحالة الحساب</li>
                  <li>• روابط مساعدة للاستعادة والدعم</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-slate-500">
          <a href="/" className="font-medium text-slate-700 hover:text-slate-900">
            ← العودة إلى الموقع الرئيسي
          </a>
        </div>
      </div>
    </div>
  );
}
