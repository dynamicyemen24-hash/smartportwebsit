import {
  Package,
  Truck,
  Warehouse,
  Network,
  CheckCircle2,
  X,
  ArrowLeft,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

const solutions = [
  {
    name: 'إدارة المستودعات الذكية',
    subtitle: 'Intelligent Warehouse Management',
    icon: Warehouse,
    image:
      'https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'أنظمة متكاملة لإدارة المستودعات بتقنيات الأتمتة الكاملة والتتبع الفوري',
    features: [
      'أنظمة WMS متطورة مع تكامل ERP',
      'تتبع فوري بتقنية RFID وIoT',
      'أتمتة كاملة للعمليات اللوجستية',
      'تحليلات ذكية وتقارير في الوقت الفعلي',
      'تحسين استخدام المساحات بنسبة 45%',
    ],
    stats: [
      { value: '45%', label: 'تحسين الكفاءة' },
      { value: '99.8%', label: 'دقة المخزون' },
    ],
    color: '#1e3a5f',
    gradient: 'from-blue-900 to-blue-800',
  },
  {
    name: 'حلول النقل واللوجستيات',
    subtitle: 'Transportation & Logistics',
    icon: Truck,
    image:
      'https://images.unsplash.com/photo-1775756789951-3f2ef4307258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'شبكة نقل متكاملة مع تتبع لحظي وإدارة أسطول ذكية',
    features: [
      'إدارة أسطول النقل بتقنيات GPS المتقدمة',
      'تخطيط ذكي للمسارات وتوفير الوقود',
      'تتبع الشحنات في الوقت الفعلي',
      'خدمات الميل الأخير المتطورة',
      'تكامل مع منصات الشحن الدولية',
    ],
    stats: [
      { value: '30%', label: 'خفض التكاليف' },
      { value: '95%', label: 'التسليم في الموعد' },
    ],
    color: '#d4a574',
    gradient: 'from-amber-600 to-amber-700',
  },
  {
    name: 'إدارة سلاسل الإمداد',
    subtitle: 'Supply Chain Management',
    icon: Network,
    image:
      'https://images.unsplash.com/photo-1716191300038-28ba994616a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'منظومة متكاملة لإدارة وتحسين كفاءة سلاسل الإمداد',
    features: [
      'تخطيط الطلب والتوريد بالذكاء الاصطناعي',
      'إدارة شاملة للموردين والعملاء',
      'تحسين مستويات المخزون وتقليل الفاقد',
      'تحليل المخاطر والأداء المتقدم',
      'تكامل شامل مع أنظمة المؤسسة',
    ],
    stats: [
      { value: '40%', label: 'تقليل التكاليف' },
      { value: '98%', label: 'رضا العملاء' },
    ],
    color: '#5a9367',
    gradient: 'from-green-700 to-green-800',
  },
  {
    name: 'خدمات التوزيع المتكاملة',
    subtitle: 'Integrated Distribution',
    icon: Package,
    image:
      'https://images.unsplash.com/photo-1769283431582-efdb02caf94d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'شبكة توزيع استراتيجية تغطي كامل المملكة والمنطقة',
    features: [
      'مراكز توزيع استراتيجية في مواقع رئيسية',
      'خدمات التعبئة والتغليف الاحترافية',
      'إدارة ذكية للمرتجعات والصيانة',
      'خدمات القيمة المضافة المتخصصة',
      'تكامل كامل مع منصات التجارة الإلكترونية',
    ],
    stats: [
      { value: '24/7', label: 'التشغيل' },
      { value: '100%', label: 'التغطية' },
    ],
    color: '#6b7c93',
    gradient: 'from-gray-700 to-gray-800',
  },
];

export default function SolutionsSectionPro() {
  const [selectedSolution, setSelectedSolution] = useState<(typeof solutions)[0] | null>(null);

  return (
    <section
      id="solutions"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: '#f8f9fb' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%)',
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
              <Award size={18} style={{ color: '#d4a574' }} />
              <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                حلول متكاملة ومبتكرة
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-6 font-bold"
              style={{ color: '#1e3a5f' }}
            >
              حلولنا اللوجستية المتطورة
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#4a5568' }}>
              منظومة شاملة من الحلول الذكية المصممة لتحقيق التميز التشغيلي وتعظيم العائد على
              الاستثمار
            </p>
          </motion.div>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border overflow-hidden"
                style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={solution.image}
                    alt={solution.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${solution.gradient} opacity-75`}
                  ></div>

                  {/* Icon Badge */}
                  <div
                    className="absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all group-hover:scale-110"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: `2px solid ${solution.color}`,
                    }}
                  >
                    <Icon size={32} style={{ color: solution.color }} />
                  </div>

                  {/* Stats Badges */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                    {solution.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center border"
                        style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
                      >
                        <div className="text-2xl font-bold" style={{ color: solution.color }}>
                          {stat.value}
                        </div>
                        <div className="text-xs font-medium" style={{ color: '#6b7c93' }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
                      {solution.name}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: '#6b7c93' }}>
                      {solution.subtitle}
                    </p>
                    <p className="leading-relaxed" style={{ color: '#4a5568' }}>
                      {solution.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {solution.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          size={20}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: '#5a9367' }}
                        />
                        <span className="text-sm" style={{ color: '#2d3748' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedSolution(solution)}
                    className="w-full py-4 rounded-xl border-2 font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2 group/btn"
                    style={{ borderColor: '#d4a574', color: '#1e3a5f', backgroundColor: 'white' }}
                  >
                    <span>تفاصيل الحل المتكامل</span>
                    <ArrowLeft
                      size={18}
                      className="group-hover/btn:-translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Dialog */}
        <AnimatePresence>
          {selectedSolution && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(30, 58, 95, 0.8)' }}
              onClick={() => setSelectedSolution(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Image */}
                <div className="relative h-80">
                  <ImageWithFallback
                    src={selectedSolution.image}
                    alt={selectedSolution.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${selectedSolution.gradient} opacity-85`}
                  ></div>

                  <button
                    onClick={() => setSelectedSolution(null)}
                    className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <X size={24} className="text-white" />
                  </button>

                  <div className="absolute bottom-8 right-8 left-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
                      >
                        {(() => {
                          const Icon = selectedSolution.icon;
                          return <Icon size={40} style={{ color: selectedSolution.color }} />;
                        })()}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-4xl font-bold text-white mb-2">
                          {selectedSolution.name}
                        </h3>
                        <p className="text-white/90 text-lg">{selectedSolution.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {selectedSolution.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center flex-1"
                        >
                          <div
                            className="text-3xl font-bold mb-1"
                            style={{ color: selectedSolution.color }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-sm font-medium" style={{ color: '#6b7c93' }}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-10">
                  <div className="mb-8">
                    <h4 className="text-2xl font-bold mb-4" style={{ color: '#1e3a5f' }}>
                      نظرة شاملة على الحل
                    </h4>
                    <p className="text-lg leading-relaxed" style={{ color: '#4a5568' }}>
                      {selectedSolution.description}
                    </p>
                  </div>

                  <h4 className="text-xl font-bold mb-6" style={{ color: '#1e3a5f' }}>
                    المميزات والقدرات الرئيسية
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-10">
                    {selectedSolution.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ backgroundColor: '#f8f9fb' }}
                      >
                        <CheckCircle2
                          size={22}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: '#5a9367' }}
                        />
                        <span style={{ color: '#2d3748' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="border-t pt-8"
                    style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl p-8">
                      <h4 className="text-xl font-bold mb-3" style={{ color: '#1e3a5f' }}>
                        كيف نُمكّنك من تحقيق أهدافك؟
                      </h4>
                      <p className="mb-6 leading-relaxed" style={{ color: '#4a5568' }}>
                        فريقنا الاستشاري المتخصص جاهز لتصميم حل متكامل يتناسب تماماً مع احتياجاتك
                        المؤسسية. نقدم دراسة شاملة لعملياتك الحالية، وخطة تنفيذ واضحة مع مؤشرات أداء
                        قابلة للقياس، لضمان تحقيق النتائج المستهدفة.
                      </p>
                      <div className="flex gap-4">
                        <a
                          href="#contact"
                          onClick={() => setSelectedSolution(null)}
                          className="flex-1 py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 text-center transition-all hover:shadow-xl"
                          style={{ backgroundColor: '#1e3a5f' }}
                        >
                          <span>احجز استشارتك المتخصصة</span>
                          <ArrowLeft size={20} />
                        </a>
                        <button
                          onClick={() => setSelectedSolution(null)}
                          className="px-8 py-4 rounded-xl border-2 font-medium transition-all"
                          style={{ borderColor: '#6b7c93', color: '#6b7c93' }}
                        >
                          إغلاق
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
