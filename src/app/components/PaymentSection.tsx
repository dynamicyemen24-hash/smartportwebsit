import { useState } from 'react';
import { api } from '../../utils/api';

export default function PaymentSection() {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceDescription, setServiceDescription] = useState(
    'عربون لحجز استشارة متخصصة أو تطبيق الحلول اللوجستية الذكية',
  );
  const [amount, setAmount] = useState('2500');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartCheckout = async () => {
    setMessage(null);
    const parsedAmount = Number(amount);

    if (!customerName || !email || !parsedAmount || parsedAmount <= 0) {
      setMessage('يرجى إدخال الاسم، البريد الإلكتروني، والمبلغ بشكل صحيح.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.createCheckoutSession({
        amount: parsedAmount,
        currency: 'sar',
        name: customerName,
        email,
        description: serviceDescription,
      });

      if (!response.url) {
        throw new Error('تعذر إنشاء جلسة الدفع. حاول مرة أخرى لاحقاً.');
      }

      window.location.href = response.url;
    } catch (error: any) {
      setMessage(error?.message || 'حدث خطأ أثناء إعداد الدفع.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-slate-950 text-white py-16" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950">
              سداد آمن عبر Stripe
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              ابدأ دفع العربون لتسريع مشروعك
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              احصل على حجز استشارة أو بدء تنفيذ الحلول الذكية بسرعة. اختر قيمة العربون ثم تابع إلى
              صفحة الدفع الآمنة.
            </p>
            <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/10">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">الاسم الكامل</label>
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="اسم العميل"
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    البريد الإلكتروني
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    type="email"
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">وصف الخدمة</label>
                  <textarea
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    rows={3}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    مبلغ العربون (SAR)
                  </label>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    min={1}
                    step={50}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
                  />
                </div>
                {message && <p className="text-sm text-rose-300">{message}</p>}
                <button
                  onClick={handleStartCheckout}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? 'جاري إنشاء جلسة الدفع...' : 'ابدأ الدفع الآمن'}
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white/5 p-8 shadow-2xl shadow-slate-950/20 ring-1 ring-white/10">
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-950/90 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                  لماذا Stripe؟
                </p>
                <p className="mt-4 text-slate-300">
                  الدفع يتم عبر بوابة عالمية موثوقة، مع تشفير كامل وتأمين البيانات. خصص العربون
                  بنفسك وابدأ التفاعل مباشرة.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-5">
                  <p className="text-sm text-slate-400">مدة تنفيذ أسرع</p>
                  <p className="mt-3 text-3xl font-semibold text-white">24 ساعة</p>
                </div>
                <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-5">
                  <p className="text-sm text-slate-400">رسوم آمنة</p>
                  <p className="mt-3 text-3xl font-semibold text-white">محمي 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
