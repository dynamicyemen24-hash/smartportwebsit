import {
  AlertCircle,
  Award,
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  MapPin as Location,
  Mail,
  MapPin,
  Phone,
  Send,
  Target,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function ContactSectionPro() {
  const [formData, setFormData] = useState({
    // البيانات الشخصية
    name: '',
    email: '',
    phone: '',
    position: '',

    // معلومات المؤسسة
    company: '',
    companySize: '',
    industryType: '',
    businessNature: '',

    // معلومات الموقع
    country: '',
    city: '',
    region: '',
    fullAddress: '',

    // تفاصيل المشروع
    services: [] as string[],
    projectBudget: '',
    projectTimeline: '',
    projectPriority: '',

    // التفاصيل الإضافية
    currentChallenges: '',
    specificRequirements: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [requestId, setRequestId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const serviceCategories = [
    {
      category: 'الحلول اللوجستية المتكاملة',
      icon: '🚛',
      services: [
        { id: 'warehouse', label: 'إدارة المستودعات الذكية', description: 'أنظمة WMS متطورة' },
        { id: 'transportation', label: 'خدمات النقل والشحن', description: 'حلول لوجستية شاملة' },
        { id: 'supply-chain', label: 'إدارة سلاسل الإمداد', description: 'تحسين وتطوير' },
        { id: 'distribution', label: 'خدمات التوزيع', description: 'شبكة توزيع متكاملة' },
      ],
    },
    {
      category: 'الاستشارات المؤسسية والإدارية',
      icon: '💼',
      services: [
        {
          id: 'erp-planning',
          label: 'تخطيط موارد المؤسسات (ERP)',
          description: 'أنظمة إدارة متكاملة',
        },
        { id: 'organizational-building', label: 'البناء المؤسسي', description: 'هيكلة وتطوير' },
        { id: 'hr-job-description', label: 'الموارد البشرية', description: 'التوصيف والتقييم' },
        {
          id: 'performance-evaluation',
          label: 'تقييم الأداء المؤسسي',
          description: 'معايير ومؤشرات',
        },
      ],
    },
    {
      category: 'الاستشارات التقنية والمالية',
      icon: '💡',
      services: [
        { id: 'tech-consulting', label: 'الاستشارات التقنية', description: 'حلول رقمية متقدمة' },
        { id: 'accounting-consulting', label: 'الاستشارات المحاسبية', description: 'تخطيط مالي' },
        { id: 'digital-transformation', label: 'التحول الرقمي', description: 'رؤية 2030' },
      ],
    },
    {
      category: 'المقاولات والبنية التحتية',
      icon: '🏗️',
      services: [
        { id: 'solar', label: 'أنظمة الطاقة الشمسية', description: 'حلول مستدامة' },
        { id: 'construction', label: 'المقاولات العامة', description: 'إنشاءات متكاملة' },
        { id: 'engineering-consulting', label: 'الاستشارات الهندسية', description: 'تصميم وتنفيذ' },
      ],
    },
  ];

  const gulfCities = [
    { label: 'الرياض', value: 'riyadh', country: 'السعودية' },
    { label: 'جدة', value: 'jeddah', country: 'السعودية' },
    { label: 'الدمام', value: 'dammam', country: 'السعودية' },
    { label: 'مكة المكرمة', value: 'makkah', country: 'السعودية' },
    { label: 'المدينة المنورة', value: 'madinah', country: 'السعودية' },
    { label: 'مسقط', value: 'muscat', country: 'عمان' },
    { label: 'صلالة', value: 'salalah', country: 'عمان' },
    { label: 'دبي', value: 'dubai', country: 'الإمارات' },
    { label: 'أبوظبي', value: 'abudhabi', country: 'الإمارات' },
    { label: 'الكويت', value: 'kuwait', country: 'الكويت' },
    { label: 'المنامة', value: 'manama', country: 'البحرين' },
    { label: 'الدوحة', value: 'doha', country: 'قطر' },
  ];

  const availableCountries = Array.from(new Set(gulfCities.map((city) => city.country)));
  const filteredCities = formData.country
    ? gulfCities.filter((city) => city.country === formData.country)
    : [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage(null);

    try {
      const { api } = await import('../../utils/api');

      // تجميع البيانات المفصلة
      const selectedCityLabel = gulfCities.find((city) => city.value === formData.city)?.label;
      const detailedMessage = `
=== معلومات المؤسسة ===
المنصب: ${formData.position || 'غير محدد'}
حجم المؤسسة: ${formData.companySize || 'غير محدد'}
نوع النشاط: ${formData.industryType || 'غير محدد'}
طبيعة العمل: ${formData.businessNature || 'غير محدد'}

=== معلومات الموقع ===
الدولة: ${formData.country || 'غير محدد'}
المدينة: ${selectedCityLabel || formData.city || 'غير محدد'}
المنطقة / الحي: ${formData.region || 'غير محدد'}
العنوان الكامل: ${formData.fullAddress || 'غير محدد'}

=== تفاصيل المشروع ===
الميزانية: ${formData.projectBudget || 'غير محدد'}
الإطار الزمني: ${formData.projectTimeline || 'غير محدد'}
الأولوية: ${formData.projectPriority || 'غير محدد'}

=== التحديات والمتطلبات ===
التحديات الحالية: ${formData.currentChallenges || 'غير محدد'}
المتطلبات الخاصة: ${formData.specificRequirements || 'غير محدد'}

=== الوصف التفصيلي ===
${formData.message || 'لا يوجد'}
      `.trim();

      const result = await api.submitContactRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.services.join(', ') || 'استشارة عامة',
        message: detailedMessage,
        country: formData.country,
        city: selectedCityLabel || formData.city,
        region: formData.region,
        fullAddress: formData.fullAddress,
      });

      setSubmitStatus('success');
      setRequestId(result.requestId);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        company: '',
        companySize: '',
        industryType: '',
        businessNature: '',
        country: '',
        city: '',
        region: '',
        fullAddress: '',
        services: [],
        projectBudget: '',
        projectTimeline: '',
        projectPriority: '',
        currentChallenges: '',
        specificRequirements: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage((error as any)?.message || String(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const nextFormData = { ...prev, [name]: value };
      if (
        name === 'country' &&
        prev.city &&
        !gulfCities.some((city) => city.value === prev.city && city.country === value)
      ) {
        nextFormData.city = '';
      }
      return nextFormData;
    });
  };

  const toggleService = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const companyStats = [
    { icon: Building2, value: '500+', label: 'مشروع منجز' },
    { icon: Users, value: '200+', label: 'عميل راضٍ' },
    { icon: Award, value: '15+', label: 'عام خبرة' },
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4"
              style={{ backgroundColor: '#d4a57415', borderColor: '#d4a574' }}
            >
              <span className="text-sm" style={{ color: '#d4a574' }}>
                استشارة مجانية ومخصصة
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4" style={{ color: '#1e3a5f' }}>
              دعنا نحول رؤيتك إلى واقع
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              فريق من الخبراء الاستشاريين لخدمتك - نحتاج لمعرفة تفاصيل أكثر لنقدم لك الحل الأمثل
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {companyStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: '#d4a57420' }}
                    >
                      <Icon size={28} style={{ color: '#d4a574' }} />
                    </div>
                    <div className="text-3xl mb-1" style={{ color: '#d4a574' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto mb-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhcmVob3VzZSUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3ODE2ODY5NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="تقنيات لوجستية متقدمة - المنافذ الذكية"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white text-right">
                  <div className="text-2xl mb-2">تقنيات لوجستية متقدمة</div>
                  <div className="text-sm text-gray-200">نستخدم أحدث التقنيات لخدمتك</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Main Contact Card */}
            <div
              className="bg-gradient-to-br p-8 rounded-2xl text-white shadow-xl"
              style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #6b7c93 100%)' }}
            >
              <h3 className="text-2xl mb-2">تواصل مع الخبراء</h3>
              <p className="text-gray-200 mb-6">فريق استشاري متخصص في خدمتك</p>

              <div className="space-y-4">
                <a
                  href="tel:+966667780832"
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">الهاتف الموحد</div>
                    <div className="text-lg" dir="ltr">
                      +966 66 777 0832
                    </div>
                    <div className="text-xs text-gray-400 mt-1">متاح على مدار الساعة</div>
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
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">البريد الإلكتروني</div>
                    <div className="text-sm break-all">info@smartportsco.com</div>
                    <div className="text-xs text-gray-400 mt-1">نرد خلال 24 ساعة</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">المقر الرئيسي</div>
                    <div className="text-sm">الرياض، المملكة العربية السعودية</div>
                    <div className="text-xs text-gray-400 mt-1">نخدم جميع دول الخليج</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">ساعات العمل</div>
                    <div className="text-sm">الأحد - الخميس: 8:00 ص - 5:00 م</div>
                    <div className="text-xs text-gray-400 mt-1">الجمعة - السبت: عطلة</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div
              className="p-6 rounded-xl border-2"
              style={{ backgroundColor: '#d4a57408', borderColor: '#d4a574' }}
            >
              <h4 className="text-lg mb-3 flex items-center gap-2" style={{ color: '#d4a574' }}>
                <Award size={20} />
                <span>لماذا المنافذ الذكية؟</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>خبرة تزيد عن 15 عاماً في السوق الخليجي</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>فريق استشاري معتمد ومتخصص</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>حلول مخصصة تناسب احتياجاتك بدقة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>دعم فني مستمر بعد التنفيذ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>شهادات جودة عالمية (ISO)</span>
                </li>
              </ul>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-md">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1774929108280-652f82f21d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBzdXBwbHklMjBjaGFpbiUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzc4MTY4Njk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="إدارة سلاسل الإمداد"
                  className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1775644125504-ab20f983e905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGVuZXJneSUyMG1pZGRsZSUyMGVhc3R8ZW58MXx8fHwxNzc4MTY3ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="أنظمة الطاقة الشمسية"
                  className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {submitStatus === 'success' ? (
              <div className="bg-white rounded-2xl p-8 border shadow-lg text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: '#5a936710' }}
                >
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: '#1e3a5f' }}>
                  🎉 تم استلام طلبك الاستشاري بنجاح!
                </h3>
                <p className="text-gray-600 mb-4">
                  نقدر تواصلك معنا. سيقوم أحد استشارينا المتخصصين بالتواصل معك خلال{' '}
                  <strong>24 ساعة</strong> لمناقشة متطلباتك بالتفصيل.
                </p>
                <div
                  className="p-4 rounded-lg mb-6 border"
                  style={{ backgroundColor: '#d4a57408', borderColor: '#d4a574' }}
                >
                  <div className="text-sm" style={{ color: '#1e3a5f' }}>
                    <strong>رقم المرجع:</strong>{' '}
                    <code
                      className="text-xs px-2 py-1 rounded"
                      style={{ backgroundColor: '#d4a574', color: 'white' }}
                    >
                      {requestId}
                    </code>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    يُرجى الاحتفاظ بهذا الرقم للمتابعة
                  </div>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-3 rounded-lg text-white"
                  style={{ backgroundColor: '#d4a574' }}
                >
                  طلب استشارة جديدة
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border shadow-lg">
                <h3 className="text-2xl mb-2" style={{ color: '#1e3a5f' }}>
                  نموذج طلب استشارة مفصل
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  املأ البيانات التالية بدقة لنتمكن من تقديم أفضل الحلول المناسبة
                </p>

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
                        'عذراً، حدث خطأ في الاتصال. يرجى التحقق من الاتصال بالإنترنت والمحاولة مرة أخرى.'
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  {/* البيانات الشخصية */}
                  <div>
                    <h4
                      className="text-sm mb-4 pb-2 border-b flex items-center gap-2"
                      style={{ color: '#d4a574', borderColor: '#d4a57430' }}
                    >
                      <Users size={18} />
                      <span>البيانات الشخصية</span>
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          الاسم الكامل <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="مثال: أحمد محمد العتيبي"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          المنصب / الصفة
                        </label>
                        <input
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="مثال: مدير العمليات"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          رقم الجوال <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="+966 5X XXX XXXX"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          البريد الإلكتروني <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="example@company.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* معلومات المؤسسة */}
                  <div>
                    <h4
                      className="text-sm mb-4 pb-2 border-b flex items-center gap-2"
                      style={{ color: '#d4a574', borderColor: '#d4a57430' }}
                    >
                      <Building2 size={18} />
                      <span>معلومات المؤسسة</span>
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          اسم المؤسسة / الشركة
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="اسم الشركة"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          حجم المؤسسة
                        </label>
                        <select
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        >
                          <option value="">حدد حجم المؤسسة</option>
                          <option value="micro">صغيرة جداً (1-10 موظفين)</option>
                          <option value="small">صغيرة (11-50 موظف)</option>
                          <option value="medium">متوسطة (51-200 موظف)</option>
                          <option value="large">كبيرة (201-1000 موظف)</option>
                          <option value="enterprise">مؤسسة كبرى (+1000 موظف)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          نوع النشاط
                        </label>
                        <select
                          name="industryType"
                          value={formData.industryType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        >
                          <option value="">حدد نوع النشاط</option>
                          <option value="logistics">لوجستيات ونقل</option>
                          <option value="manufacturing">تصنيع</option>
                          <option value="retail">تجزئة وتوزيع</option>
                          <option value="ecommerce">تجارة إلكترونية</option>
                          <option value="construction">مقاولات وإنشاءات</option>
                          <option value="healthcare">صحة وأدوية</option>
                          <option value="food">أغذية ومشروبات</option>
                          <option value="technology">تقنية ومعلومات</option>
                          <option value="other">أخرى</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          طبيعة العمل
                        </label>
                        <input
                          type="text"
                          name="businessNature"
                          value={formData.businessNature}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="مثال: استيراد وتوزيع"
                        />
                      </div>
                    </div>
                  </div>

                  {/* معلومات الموقع */}
                  <div>
                    <h4
                      className="text-sm mb-4 pb-2 border-b flex items-center gap-2"
                      style={{ color: '#d4a574', borderColor: '#d4a57430' }}
                    >
                      <Location size={18} />
                      <span>معلومات الموقع</span>
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          الدولة
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        >
                          <option value="">اختر الدولة</option>
                          {availableCountries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          المدينة / المحافظة
                        </label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          disabled={!formData.country}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white disabled:cursor-not-allowed disabled:bg-gray-100"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        >
                          <option value="">
                            {formData.country ? 'اختر المدينة أو المحافظة' : 'حدد الدولة أولاً'}
                          </option>
                          {filteredCities.map((city) => (
                            <option key={city.value} value={city.value}>
                              {city.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          المنطقة / الحي
                        </label>
                        <input
                          type="text"
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="مثال: حي العليا"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          العنوان الكامل (اختياري)
                        </label>
                        <input
                          type="text"
                          name="fullAddress"
                          value={formData.fullAddress}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="العنوان التفصيلي (للزيارات الميدانية)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* الخدمات المطلوبة */}
                  <div>
                    <h4
                      className="text-sm mb-4 pb-2 border-b flex items-center justify-between"
                      style={{ color: '#d4a574', borderColor: '#d4a57430' }}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase size={18} />
                        <span>الخدمات المطلوبة (اختيار متعدد)</span>
                      </div>
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: '#d4a57420' }}
                      >
                        {formData.services.length} محددة
                      </span>
                    </h4>
                    <div className="space-y-4">
                      {serviceCategories.map((category, catIndex) => (
                        <div key={catIndex}>
                          <div
                            className="text-sm mb-2 flex items-center gap-2"
                            style={{ color: '#1e3a5f' }}
                          >
                            <span>{category.icon}</span>
                            <span>{category.category}</span>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {category.services.map((service) => (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => toggleService(service.id)}
                                className={`p-4 rounded-lg border-2 text-right transition-all hover:shadow-md ${
                                  formData.services.includes(service.id)
                                    ? 'border-2 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                style={
                                  formData.services.includes(service.id)
                                    ? { borderColor: '#d4a574', backgroundColor: '#d4a57408' }
                                    : {}
                                }
                              >
                                <div className="flex items-start justify-between mb-1">
                                  <div className="text-sm flex-1" style={{ color: '#1e3a5f' }}>
                                    {service.label}
                                  </div>
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mr-2 ${
                                      formData.services.includes(service.id) ? 'border-0' : ''
                                    }`}
                                    style={
                                      formData.services.includes(service.id)
                                        ? { backgroundColor: '#d4a574' }
                                        : { borderColor: '#D1D5DB' }
                                    }
                                  >
                                    {formData.services.includes(service.id) && (
                                      <CheckCircle size={16} className="text-white" />
                                    )}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500">{service.description}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* تفاصيل المشروع */}
                  <div>
                    <h4
                      className="text-sm mb-4 pb-2 border-b flex items-center gap-2"
                      style={{ color: '#d4a574', borderColor: '#d4a57430' }}
                    >
                      <Target size={18} />
                      <span>تفاصيل المشروع</span>
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          الميزانية التقديرية
                        </label>
                        <select
                          name="projectBudget"
                          value={formData.projectBudget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        >
                          <option value="">حدد الميزانية التقديرية</option>
                          <option value="less-50k">أقل من 50,000 ريال</option>
                          <option value="50k-100k">50,000 - 100,000 ريال</option>
                          <option value="100k-250k">100,000 - 250,000 ريال</option>
                          <option value="250k-500k">250,000 - 500,000 ريال</option>
                          <option value="500k-1m">500,000 - 1,000,000 ريال</option>
                          <option value="more-1m">أكثر من مليون ريال</option>
                          <option value="flexible">مرنة حسب الحل المقترح</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          الإطار الزمني المطلوب
                        </label>
                        <select
                          name="projectTimeline"
                          value={formData.projectTimeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        >
                          <option value="">حدد الإطار الزمني</option>
                          <option value="urgent">عاجل (أقل من شهر)</option>
                          <option value="1-3months">1-3 أشهر</option>
                          <option value="3-6months">3-6 أشهر</option>
                          <option value="6-12months">6-12 شهر</option>
                          <option value="more-year">أكثر من سنة</option>
                          <option value="flexible">مرن حسب الخطة</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          أولوية المشروع
                        </label>
                        <select
                          name="projectPriority"
                          value={formData.projectPriority}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                        >
                          <option value="">حدد أولوية المشروع</option>
                          <option value="high">عالية - نحتاج للبدء فوراً</option>
                          <option value="medium">متوسطة - خلال الشهر القادم</option>
                          <option value="low">منخفضة - للتخطيط المستقبلي</option>
                          <option value="evaluation">في مرحلة التقييم والدراسة</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          التحديات الحالية التي تواجهها
                        </label>
                        <textarea
                          name="currentChallenges"
                          value={formData.currentChallenges}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white resize-none"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="مثال: تأخير في التسليم، زيادة التكاليف، نقص في الكفاءة..."
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          المتطلبات الخاصة أو التفاصيل الفنية
                        </label>
                        <textarea
                          name="specificRequirements"
                          value={formData.specificRequirements}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white resize-none"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="أي متطلبات فنية أو تقنية خاصة..."
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#1e3a5f' }}>
                          وصف عام للمشروع والأهداف
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white resize-none"
                          style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                          placeholder="يرجى تزويدنا بوصف شامل للمشروع والأهداف المرجوة..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg flex items-center justify-center gap-2 text-lg transition-all hover:opacity-90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <span>{isSubmitting ? 'جاري إرسال الطلب...' : 'طلب استشارة مجانية مفصلة'}</span>
                    <Send size={20} />
                  </button>

                  <div className="text-xs text-gray-500 text-center space-y-1">
                    <p className="flex items-center justify-center gap-1">
                      <CheckCircle size={14} className="text-green-600" />
                      <span>استشارة مجانية بدون أي التزام</span>
                    </p>
                    <p>بإرسال هذا النموذج، توافق على سياسة الخصوصية ومعالجة البيانات</p>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
