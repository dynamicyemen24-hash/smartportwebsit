import { TrendingUp, Package, Building2, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function CaseStudiesPro() {
  const caseStudies = [
    {
      client: 'شركة رائدة في التجزئة',
      industry: 'التجارة والتوزيع',
      icon: Package,
      challenge: 'تكاليف تشغيلية عالية وفاقد في المخزون بنسبة 18%',
      solution: 'تطبيق نظام WMS متكامل مع إعادة هندسة العمليات اللوجستية',
      results: [
        { metric: '42%', label: 'خفض التكاليف التشغيلية' },
        { metric: '95%', label: 'تحسين دقة المخزون' },
        { metric: '6 أشهر', label: 'فترة تحقيق ROI' },
      ],
      testimonial: 'حققنا نتائج فاقت توقعاتنا بكثير. الفريق محترف جداً والحل متكامل.',
      color: '#1e3a5f',
    },
    {
      client: 'مؤسسة صناعية كبرى',
      industry: 'التصنيع والإنتاج',
      icon: Building2,
      challenge: 'عدم كفاءة سلسلة الإمداد وتأخير في التسليم',
      solution: 'بناء منظومة SCM متكاملة مع تتبع فوري وتحليلات ذكية',
      results: [
        { metric: '38%', label: 'تحسين سرعة التسليم' },
        { metric: '99%', label: 'دقة تنفيذ الطلبات' },
        { metric: '2.5M', label: 'وفورات سنوية (ريال)' },
      ],
      testimonial: 'شراكة استراتيجية حقيقية. التحسينات واضحة والنتائج مستمرة.',
      color: '#d4a574',
    },
    {
      client: 'مجموعة لوجستية إقليمية',
      industry: 'الخدمات اللوجستية',
      icon: TrendingUp,
      challenge: 'توسع سريع مع الحاجة لتوحيد العمليات',
      solution: 'استشارات ERP وتطبيق نظام موحد عبر 8 فروع إقليمية',
      results: [
        { metric: '100%', label: 'توحيد العمليات' },
        { metric: '35%', label: 'تحسين الكفاءة' },
        { metric: '24/7', label: 'رؤية فورية للعمليات' },
      ],
      testimonial: 'ساعدونا في التوسع بثقة. النظام الآن يدعم نمونا المستقبلي.',
      color: '#5a9367',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#f8f9fb' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(90, 147, 103, 0.12) 0%, transparent 70%)',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
              <Sparkles size={18} style={{ color: '#d4a574' }} />
              <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                قصص نجاح موثقة
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-6 font-bold"
              style={{ color: '#1e3a5f' }}
            >
              نتائج حقيقية لعملاء حقيقيين
            </h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#4a5568' }}>
              اكتشف كيف ساعدنا مؤسسات رائدة في تحقيق تحول جذري في عملياتها وتحقيق نتائج استثنائية
              قابلة للقياس
            </p>
          </motion.div>
        </div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border"
                style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
              >
                <div className="grid md:grid-cols-5 gap-8 p-8 md:p-10">
                  {/* Left: Client Info */}
                  <div className="md:col-span-2">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${study.color}15` }}
                    >
                      <Icon size={32} style={{ color: study.color }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
                      {study.client}
                    </h3>
                    <div
                      className="text-sm mb-6 px-3 py-1 rounded-full inline-block"
                      style={{ backgroundColor: 'rgba(107, 124, 147, 0.08)', color: '#6b7c93' }}
                    >
                      {study.industry}
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="text-sm font-bold mb-1" style={{ color: '#d4a574' }}>
                          التحدي
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                          {study.challenge}
                        </p>
                      </div>

                      <div>
                        <div className="text-sm font-bold mb-1" style={{ color: '#d4a574' }}>
                          الحل المُقدّم
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    <div
                      className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl p-4 border-r-4"
                      style={{ borderColor: study.color }}
                    >
                      <p className="text-sm italic leading-relaxed" style={{ color: '#2d3748' }}>
                        &ldquo;{study.testimonial}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Right: Results */}
                  <div className="md:col-span-3">
                    <div className="mb-6">
                      <h4 className="text-xl font-bold mb-4" style={{ color: '#1e3a5f' }}>
                        النتائج المُحققة
                      </h4>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                      {study.results.map((result, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 text-center shadow-sm border"
                          style={{ borderColor: 'rgba(107, 124, 147, 0.08)' }}
                        >
                          <div className="text-4xl font-bold mb-2" style={{ color: study.color }}>
                            {result.metric}
                          </div>
                          <div className="text-sm font-medium" style={{ color: '#2d3748' }}>
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{ backgroundColor: '#f8f9fb' }}
                      >
                        <CheckCircle
                          size={20}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: '#5a9367' }}
                        />
                        <div>
                          <div className="font-semibold text-sm mb-1" style={{ color: '#1e3a5f' }}>
                            تحسينات قابلة للقياس والتوثيق
                          </div>
                          <div className="text-xs" style={{ color: '#6b7c93' }}>
                            جميع النتائج مدعومة ببيانات ومؤشرات أداء موثقة
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{ backgroundColor: '#f8f9fb' }}
                      >
                        <CheckCircle
                          size={20}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: '#5a9367' }}
                        />
                        <div>
                          <div className="font-semibold text-sm mb-1" style={{ color: '#1e3a5f' }}>
                            دعم مستمر وتطوير دائم
                          </div>
                          <div className="text-xs" style={{ color: '#6b7c93' }}>
                            شراكة طويلة الأمد مع التحسين المستمر للأنظمة
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{ backgroundColor: '#f8f9fb' }}
                      >
                        <CheckCircle
                          size={20}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: '#5a9367' }}
                        />
                        <div>
                          <div className="font-semibold text-sm mb-1" style={{ color: '#1e3a5f' }}>
                            ROI سريع وواضح
                          </div>
                          <div className="text-xs" style={{ color: '#6b7c93' }}>
                            عائد استثماري ملموس خلال أشهر قليلة من التطبيق
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-10 md:p-12 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              هل أنتم مستعدون لتحقيق نتائج مماثلة؟
            </h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              دعونا نناقش كيف يمكننا مساعدتكم في تحقيق أهدافكم وتحسين عملياتكم
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all hover:shadow-2xl text-lg"
              style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
            >
              <span>ابدأ رحلة التحول الآن</span>
              <ArrowLeft size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
