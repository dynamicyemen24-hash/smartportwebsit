import { TrendingUp, Users, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const caseStudies = [
  {
    title: 'تحول رقمي لمستودعات شركة التصنيع المتقدم',
    category: 'إدارة المستودعات',
    client: 'شركة التصنيع المتقدم',
    image:
      'https://images.unsplash.com/photo-1740914994162-0b2a49280aeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    challenge:
      'كانت الشركة تعاني من تأخيرات في الشحن وصعوبة في تتبع المخزون عبر 5 مستودعات بمساحة إجمالية 50,000 متر مربع',
    solution: 'قمنا بتنفيذ نظام إدارة مستودعات ذكي (WMS) متكامل مع تقنية RFID وأتمتة العمليات',
    results: [
      { metric: '45%', label: 'تحسين الكفاءة التشغيلية' },
      { metric: '60%', label: 'تقليل أخطاء الجرد' },
      { metric: '35%', label: 'تسريع عمليات الشحن' },
      { metric: '3 أشهر', label: 'مدة التنفيذ' },
    ],
    tags: ['WMS', 'RFID', 'أتمتة', 'تحليلات'],
  },
  {
    title: 'محطة طاقة شمسية بقدرة 2.5 ميجاوات',
    category: 'الطاقة المتجددة',
    client: 'شركة الطاقة المستدامة',
    image:
      'https://images.unsplash.com/photo-1774927334511-c2d1cf654b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    challenge: 'تكاليف الكهرباء المرتفعة وضغط على ميزانية الطاقة للمنشأة الصناعية',
    solution: 'تصميم وتنفيذ محطة طاقة شمسية متكاملة بقدرة 2.5 ميجاوات مع نظام مراقبة وإدارة ذكي',
    results: [
      { metric: '65%', label: 'توفير في فاتورة الكهرباء' },
      { metric: '4.2 سنة', label: 'فترة استرداد الاستثمار' },
      { metric: '2500 طن', label: 'تقليل انبعاثات CO₂ سنوياً' },
      { metric: '25 سنة', label: 'ضمان الأداء' },
    ],
    tags: ['طاقة شمسية', 'استدامة', 'توفير', 'ESG'],
  },
  {
    title: 'حلول لوجستية متكاملة لشركة التوزيع الوطنية',
    category: 'النقل واللوجستيات',
    client: 'مجموعة التوزيع الوطنية',
    image:
      'https://images.unsplash.com/photo-1565891741441-64926e441838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    challenge: 'عدم كفاءة في إدارة الأسطول وارتفاع تكاليف الوقود وصعوبة في تتبع الشحنات',
    solution: 'تطوير نظام متكامل لإدارة الأسطول مع GPS، تحسين المسارات، وتطبيق موبايل للسائقين',
    results: [
      { metric: '40%', label: 'تقليل استهلاك الوقود' },
      { metric: '98%', label: 'دقة مواعيد التسليم' },
      { metric: '50%', label: 'تحسين إنتاجية الأسطول' },
      { metric: '120 مركبة', label: 'حجم الأسطول المُدار' },
    ],
    tags: ['إدارة أسطول', 'GPS', 'تحسين مسارات', 'موبايل'],
  },
];

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
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
                قصص نجاح
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              مشاريع غيّرت قواعد اللعبة
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نفخر بشراكاتنا الناجحة مع عملائنا وتحقيق نتائج استثنائية تتجاوز التوقعات
            </p>
          </motion.div>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-64 lg:h-auto">
                  <ImageWithFallback
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/40 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-6 right-6">
                    <div
                      className="px-4 py-2 rounded-full backdrop-blur-md"
                      style={{ backgroundColor: 'rgba(191, 255, 0, 0.9)', color: '#1e3a5f' }}
                    >
                      <span className="text-sm font-bold">{study.category}</span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-10">
                  <h3 className="text-2xl lg:text-3xl mb-3" style={{ color: '#1e3a5f' }}>
                    {study.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-6">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{study.client}</span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div
                        className="text-sm font-bold mb-1"
                        style={{ color: '#d4a574', WebkitTextStroke: '0.5px #1e3a5f' }}
                      >
                        التحدي:
                      </div>
                      <p className="text-gray-700 leading-relaxed">{study.challenge}</p>
                    </div>

                    <div>
                      <div
                        className="text-sm font-bold mb-1"
                        style={{ color: '#d4a574', WebkitTextStroke: '0.5px #1e3a5f' }}
                      >
                        الحل:
                      </div>
                      <p className="text-gray-700 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.results.map((result, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-start gap-2 mb-1">
                          <TrendingUp size={16} style={{ color: '#d4a574' }} className="mt-1" />
                          <div className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>
                            {result.metric}
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs bg-lime-50 border"
                        style={{ borderColor: '#d4a574', color: '#1e3a5f' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="flex items-center gap-2 text-sm hover:gap-3 transition-all"
                    style={{ color: '#1e3a5f' }}
                  >
                    <span className="font-bold">اقرأ القصة الكاملة</span>
                    <ArrowLeft size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
          >
            <span>ابدأ قصة نجاحك معنا</span>
            <ArrowLeft size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
