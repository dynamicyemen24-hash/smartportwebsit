import { Award, Building2, CheckCircle2, Play, Quote, Star, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const testimonials = [
  {
    name: 'م. خالد المطيري',
    position: 'مدير العمليات التنفيذي',
    company: 'شركة التصنيع المتقدم',
    industry: 'التصنيع والإنتاج',
    rating: 5,
    text: 'تعاملنا مع المنافذ الذكية في مشروع إدارة المستودعات كان تجربة استثنائية. النظام الذي قدموه حسّن كفاءة عملياتنا بنسبة 45% وقلل من الأخطاء بشكل ملحوظ. فريقهم محترف ويفهم احتياجات الصناعة بعمق. الدعم الفني متواصل والنتائج ملموسة وقابلة للقياس.',
    project: 'نظام إدارة مستودعات بمساحة 30,000 متر مربع',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    results: [
      { metric: '45%', label: 'تحسين الكفاءة' },
      { metric: '92%', label: 'دقة المخزون' },
      { metric: '6 أشهر', label: 'فترة ROI' },
    ],
    hasVideo: true,
    featured: true,
  },
  {
    name: 'أ. فهد العتيبي',
    position: 'الرئيس التنفيذي',
    company: 'مجموعة التوزيع الوطنية',
    industry: 'اللوجستيات والتوزيع',
    rating: 5,
    text: 'الاستشارات المؤسسية التي قدمتها المنافذ الذكية ساعدتنا في إعادة هيكلة عملياتنا بالكامل. التوصيف الوظيفي ونظام تقييم الأداء الذي طوروه أصبح جزءاً أساسياً من نجاحنا. نوصي بهم بشدة لأي مؤسسة تسعى للتميز والنمو المستدام.',
    project: 'مشروع البناء المؤسسي وتقييم الأداء',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    results: [
      { metric: '100%', label: 'توحيد العمليات' },
      { metric: '28%', label: 'خفض التكاليف' },
      { metric: '3 أشهر', label: 'فترة التنفيذ' },
    ],
    hasVideo: false,
    featured: true,
  },
  {
    name: 'م. سارة الدوسري',
    position: 'مديرة المشاريع الاستراتيجية',
    company: 'شركة الطاقة المستدامة',
    industry: 'الطاقة المتجددة',
    rating: 5,
    text: 'نفذت المنافذ الذكية لنا محطة طاقة شمسية بقدرة 1.5 ميجاوات. الجودة والالتزام بالمواعيد كانا على أعلى مستوى. وفرنا 55% من تكاليف الطاقة في السنة الأولى. شركة موثوقة ومتميزة في تنفيذ المشاريع الكبرى.',
    project: 'محطة طاقة شمسية 1.5MW',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    results: [
      { metric: '55%', label: 'توفير الطاقة' },
      { metric: '1.5 MW', label: 'القدرة الإنتاجية' },
      { metric: '25 سنة', label: 'عمر المحطة' },
    ],
    hasVideo: true,
    featured: false,
  },
  {
    name: 'أ. محمد القحطاني',
    position: 'مدير سلسلة الإمداد',
    company: 'شركة اللوجستيات الشاملة',
    industry: 'النقل والشحن',
    rating: 5,
    text: 'الحلول اللوجستية المتكاملة من المنافذ الذكية غيرت طريقة عملنا بالكامل. نظام التتبع وإدارة الأسطول جعل عملياتنا أكثر شفافية وكفاءة. خدمة ما بعد البيع ممتازة والدعم الفني متواصل. استثمار يستحق كل ريال.',
    project: 'حلول لوجستية متكاملة + نظام تتبع GPS',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    results: [
      { metric: '38%', label: 'خفض أوقات التسليم' },
      { metric: '99.5%', label: 'دقة التتبع' },
      { metric: '24/7', label: 'مراقبة فورية' },
    ],
    hasVideo: false,
    featured: false,
  },
  {
    name: 'د. عبدالله الشمري',
    position: 'نائب الرئيس للعمليات',
    company: 'مجموعة الأعمال الصناعية',
    industry: 'الصناعة الثقيلة',
    rating: 5,
    text: 'تطبيق نظام ERP الذي نفذته المنافذ الذكية كان نقطة تحول في رحلتنا الرقمية. الفريق الاستشاري فهم احتياجاتنا المعقدة وقدم حلولاً مخصصة تماماً. النتائج فاقت التوقعات والتكامل مع أنظمتنا الحالية كان سلساً.',
    project: 'تطبيق نظام SAP ERP متكامل',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    results: [
      { metric: '100%', label: 'تكامل الأنظمة' },
      { metric: '42%', label: 'تحسين الإنتاجية' },
      { metric: '8 فروع', label: 'نطاق التطبيق' },
    ],
    hasVideo: true,
    featured: false,
  },
  {
    name: 'م. نورة العنزي',
    position: 'مديرة التطوير المؤسسي',
    company: 'شركة الخدمات المتكاملة',
    industry: 'الخدمات المهنية',
    rating: 5,
    text: 'الاستشارات الإدارية والبناء المؤسسي الذي قدمته المنافذ الذكية ساعدنا في تحقيق قفزة نوعية. الهياكل التنظيمية الجديدة، التوصيف الوظيفي، وأنظمة تقييم الأداء - كلها مبنية على أفضل الممارسات العالمية. فريق احترافي وخبرة عميقة.',
    project: 'إعادة الهيكلة المؤسسية الشاملة',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    results: [
      { metric: '100%', label: 'توثيق العمليات' },
      { metric: '35%', label: 'تحسين الكفاءة' },
      { metric: 'ISO', label: 'شهادة معتمدة' },
    ],
    hasVideo: false,
    featured: false,
  },
];

const stats = [
  { icon: Star, value: '4.9/5.0', label: 'متوسط التقييم من 150+ عميل' },
  { icon: Award, value: '98%', label: 'معدل رضا العملاء والتوصية' },
  { icon: TrendingUp, value: '95%', label: 'معدل تجديد العقود السنوية' },
  { icon: CheckCircle2, value: '500+', label: 'مشروع تم تنفيذه بنجاح' },
];

export default function TestimonialsPro() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<(typeof testimonials)[0] | null>(
    null,
  );

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border"
              style={{
                backgroundColor: 'rgba(212, 165, 116, 0.08)',
                borderColor: 'rgba(212, 165, 116, 0.3)',
              }}
            >
              <Star size={18} style={{ color: '#d4a574' }} />
              <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                آراء العملاء
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-6 font-bold"
              style={{ color: '#1e3a5f' }}
            >
              ثقة العملاء هي شهادتنا الأولى
            </h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#4a5568' }}>
              استمع لتجارب عملائنا الحقيقية ونتائج ملموسة حققناها معاً في مختلف القطاعات
            </p>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100"
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(212, 165, 116, 0.1)' }}
                >
                  <Icon size={24} style={{ color: '#d4a574' }} />
                </div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#6b7c93' }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>

        {selectedTestimonial && (
          <div className="bg-white rounded-3xl p-8 mb-12 shadow-lg border border-gray-100">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <img
                src={selectedTestimonial.image}
                alt={selectedTestimonial.name}
                className="w-28 h-28 rounded-full object-cover border border-gray-200"
              />
              <div className="min-w-0">
                <p className="text-xl font-semibold" style={{ color: '#0A1F44' }}>
                  {selectedTestimonial.name}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {selectedTestimonial.position} — {selectedTestimonial.company}
                </p>
                <p className="text-gray-700 leading-relaxed">{selectedTestimonial.text}</p>
              </div>
            </div>
          </div>
        )}

        {/* Featured Testimonials (Large) */}
        <div className="mb-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {testimonials
              .filter((t) => t.featured)
              .map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-500"
                  style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
                >
                  {/* Quote Icon Background */}
                  <div className="relative p-8 pb-6">
                    <div className="absolute top-8 right-8 opacity-5">
                      <Quote size={120} style={{ color: '#d4a574' }} />
                    </div>

                    <div className="relative z-10">
                      {/* Rating & Industry */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={18} fill="#d4a574" stroke="#d4a574" />
                          ))}
                        </div>
                        <div
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ backgroundColor: 'rgba(107, 124, 147, 0.08)', color: '#6b7c93' }}
                        >
                          {testimonial.industry}
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 leading-relaxed mb-6 text-base">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>

                      {/* Results Metrics */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {testimonial.results.map((result, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 text-center border"
                            style={{ borderColor: 'rgba(107, 124, 147, 0.08)' }}
                          >
                            <div className="text-xl font-bold mb-1" style={{ color: '#1e3a5f' }}>
                              {result.metric}
                            </div>
                            <div className="text-xs" style={{ color: '#6b7c93' }}>
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Project Badge */}
                      <div
                        className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl p-4 mb-6 border-r-4"
                        style={{ borderColor: '#d4a574' }}
                      >
                        <div className="text-xs mb-1" style={{ color: '#6b7c93' }}>
                          المشروع:
                        </div>
                        <div className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                          {testimonial.project}
                        </div>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-14 h-14 rounded-full overflow-hidden border-2"
                            style={{ borderColor: '#d4a574' }}
                          >
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-base" style={{ color: '#1e3a5f' }}>
                              {testimonial.name}
                            </div>
                            <div className="text-sm" style={{ color: '#6b7c93' }}>
                              {testimonial.position}
                            </div>
                            <div className="text-xs text-gray-500">{testimonial.company}</div>
                          </div>
                        </div>

                        {testimonial.hasVideo && (
                          <button
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                            style={{ backgroundColor: '#d4a574' }}
                          >
                            <Play size={20} style={{ color: '#1e3a5f' }} fill="#1e3a5f" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Regular Testimonials (Compact Grid) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials
            .filter((t) => !t.featured)
            .map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => setSelectedTestimonial(testimonial)}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#d4a574" stroke="#d4a574" />
                  ))}
                </div>

                {/* Text Preview */}
                <p className="text-gray-700 leading-relaxed mb-4 text-sm line-clamp-4">
                  &ldquo;{testimonial.text.substring(0, 120)}...&rdquo;
                </p>

                {/* Main Metric */}
                <div
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 mb-4 text-center border"
                  style={{ borderColor: 'rgba(107, 124, 147, 0.08)' }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: '#1e3a5f' }}>
                    {testimonial.results[0]?.metric ?? '-'}
                  </div>
                  <div className="text-xs" style={{ color: '#6b7c93' }}>
                    {testimonial.results[0]?.label ?? '-'}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden border"
                    style={{ borderColor: '#d4a574' }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate" style={{ color: '#1e3a5f' }}>
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{testimonial.company}</div>
                  </div>
                  {testimonial.hasVideo && <Play size={16} style={{ color: '#d4a574' }} />}
                </div>
              </motion.div>
            ))}
        </div>

        {/* Certifications & Trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#1e3a5f' }}>
              شهادات واعتمادات معترف بها عالمياً
            </h3>
            <p style={{ color: '#6b7c93' }}>التزامنا بالمعايير العالمية يضمن جودة لا تضاهى</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center group">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all group-hover:scale-110"
                style={{ backgroundColor: 'rgba(212, 165, 116, 0.1)' }}
              >
                <Award size={40} style={{ color: '#d4a574' }} />
              </div>
              <div className="text-sm font-bold mb-1" style={{ color: '#1e3a5f' }}>
                ISO 9001:2015
              </div>
              <div className="text-xs" style={{ color: '#6b7c93' }}>
                إدارة الجودة
              </div>
            </div>

            <div className="text-center group">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all group-hover:scale-110"
                style={{ backgroundColor: 'rgba(212, 165, 116, 0.1)' }}
              >
                <Building2 size={40} style={{ color: '#d4a574' }} />
              </div>
              <div className="text-sm font-bold mb-1" style={{ color: '#1e3a5f' }}>
                هيئة النقل السعودية
              </div>
              <div className="text-xs" style={{ color: '#6b7c93' }}>
                ترخيص معتمد
              </div>
            </div>

            <div className="text-center group">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all group-hover:scale-110"
                style={{ backgroundColor: 'rgba(212, 165, 116, 0.1)' }}
              >
                <CheckCircle2 size={40} style={{ color: '#d4a574' }} />
              </div>
              <div className="text-sm font-bold mb-1" style={{ color: '#1e3a5f' }}>
                FIATA
              </div>
              <div className="text-xs" style={{ color: '#6b7c93' }}>
                الاتحاد الدولي
              </div>
            </div>

            <div className="text-center group">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all group-hover:scale-110"
                style={{ backgroundColor: 'rgba(212, 165, 116, 0.1)' }}
              >
                <TrendingUp size={40} style={{ color: '#d4a574' }} />
              </div>
              <div className="text-sm font-bold mb-1" style={{ color: '#1e3a5f' }}>
                LEED Certified
              </div>
              <div className="text-xs" style={{ color: '#6b7c93' }}>
                الطاقة المستدامة
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
