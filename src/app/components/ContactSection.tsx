import { AlertCircle, CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { type ChangeEvent, type FormEvent, useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [requestId, setRequestId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage(null);

    try {
      const { api } = await import('../../utils/api');
      const result = await api.submitContactRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: formData.message,
      });

      setSubmitStatus('success');
      setRequestId(result.requestId);
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: unknown }).message ?? 'فشل في إرسال الطلب')
          : String(error);
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-50 border mb-4"
              style={{ borderColor: '#d4a574' }}
            >
              <span className="text-sm" style={{ color: '#1e3a5f' }}>
                تواصل معنا
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              ابدأ مشروعك معنا
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نحن هنا لمساعدتك في تحقيق أهدافك اللوجستية والهندسية
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div
              className="bg-gradient-to-br p-8 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
            >
              <h3 className="text-2xl mb-2">المنافذ الذكية</h3>
              <p className="text-gray-200 mb-6">شريكك الموثوق في الحلول اللوجستية الذكية</p>

              <div className="space-y-4">
                <a
                  href="tel:+966667780832"
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <Phone size={24} style={{ color: '#1e3a5f' }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">اتصل بنا</div>
                    <div className="text-lg">+966 66 777 0832</div>
                  </div>
                </a>

                <a
                  href="mailto:info@smartportsco.com"
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <Mail size={24} style={{ color: '#1e3a5f' }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">راسلنا</div>
                    <div className="text-lg break-all">info@smartportsco.com</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <MapPin size={24} style={{ color: '#1e3a5f' }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">موقعنا</div>
                    <div className="text-lg">الرياض، المملكة العربية السعودية</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <Clock size={24} style={{ color: '#1e3a5f' }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">ساعات العمل</div>
                    <div className="text-sm">الأحد - الخميس: 8:00 ص - 5:00 م</div>
                    <div className="text-sm text-gray-400">الجمعة - السبت: عطلة نهاية الأسبوع</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-lime-50 p-6 rounded-xl border" style={{ borderColor: '#d4a574' }}>
              <h4 className="text-lg mb-2" style={{ color: '#1e3a5f' }}>
                💡 هل تعلم؟
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                العملاء الذين يتواصلون معنا يحصلون على استشارة مجانية وتحليل أولي لاحتياجاتهم خلال
                24 ساعة
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {submitStatus === 'success' ? (
              <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: '#5a936710' }}
                >
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: '#1e3a5f' }}>
                  تم استلام طلبك بنجاح!
                </h3>
                <p className="text-gray-600 mb-4">
                  شكراً لتواصلك معنا. سيقوم فريقنا بمراجعة طلبك والرد عليك خلال 24 ساعة.
                </p>
                <div
                  className="bg-lime-50 p-4 rounded-lg mb-6 border"
                  style={{ borderColor: '#d4a574' }}
                >
                  <div className="text-sm text-gray-700">
                    <strong>رقم الطلب:</strong> <code className="text-xs">{requestId}</code>
                  </div>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-3 rounded-lg"
                  style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
                >
                  إرسال طلب جديد
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
              >
                <h3 className="text-2xl mb-6" style={{ color: '#1e3a5f' }}>
                  احصل على عرض مجاني
                </h3>

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-700">
                      {errorMessage ? (
                        <>
                          <div className="mb-2">عذراً، فشل الإرسال: {errorMessage}</div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={async () => {
                                // إعادة المحاولة بنفس البيانات
                                const fakeEvent = {
                                  preventDefault: () => {},
                                } as unknown as FormEvent<HTMLFormElement>;
                                await handleSubmit(fakeEvent);
                              }}
                              className="px-3 py-1 rounded bg-white text-sm"
                            >
                              إعادة المحاولة
                            </button>
                            <a
                              href="mailto:info@smartportsco.com"
                              className="px-3 py-1 rounded bg-white text-sm"
                            >
                              الاتصال بالبريد
                            </a>
                          </div>
                        </>
                      ) : (
                        'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.'
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                        style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                        style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        placeholder="+966 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                        style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                        اسم الشركة
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                        style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        placeholder="اسم شركتك (اختياري)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                      الخدمة المطلوبة *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                      style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                    >
                      <option value="">اختر الخدمة المطلوبة</option>
                      <optgroup label="الخدمات اللوجستية">
                        <option value="warehouse">إدارة المستودعات</option>
                        <option value="transportation">خدمات النقل واللوجستيات</option>
                        <option value="supply-chain">إدارة سلاسل الإمداد</option>
                        <option value="distribution">خدمات التوزيع</option>
                      </optgroup>
                      <optgroup label="الاستشارات المؤسسية">
                        <option value="erp-planning">تخطيط موارد المؤسسات (ERP)</option>
                        <option value="organizational-building">البناء المؤسسي</option>
                        <option value="hr-job-description">الموارد البشرية والتوصيف الوظيفي</option>
                        <option value="performance-evaluation">تقييم الأداء المؤسسي</option>
                      </optgroup>
                      <optgroup label="الاستشارات التقنية والمالية">
                        <option value="tech-consulting">الاستشارات التقنية</option>
                        <option value="accounting-consulting">الاستشارات المحاسبية والمالية</option>
                      </optgroup>
                      <optgroup label="المقاولات والبنية التحتية">
                        <option value="solar">أنظمة الطاقة الشمسية</option>
                        <option value="construction">المقاولات العامة</option>
                        <option value="engineering-consulting">الاستشارات الهندسية</option>
                      </optgroup>
                      <option value="other">خدمات أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                      تفاصيل المشروع
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white resize-none"
                      style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                      placeholder="أخبرنا المزيد عن احتياجاتك ومتطلبات مشروعك..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg flex items-center justify-center gap-2 text-lg transition-all hover:opacity-90 shadow-lg disabled:opacity-50"
                    style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
                  >
                    <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}</span>
                    <Send size={20} />
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    بإرسالك هذا النموذج، فإنك توافق على سياسة الخصوصية الخاصة بنا
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
