import { Package, Truck, Warehouse, Network, CheckCircle2, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

const solutions = [
  {
    name: 'إدارة المستودعات الذكية',
    subtitle: 'Intelligent Warehouse Management',
    icon: Warehouse,
    image:
      'https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    features: [
      'أنظمة تخزين آلية متطورة',
      'إدارة المخزون في الوقت الفعلي',
      'تتبع الشحنات بتقنية RFID',
      'تحسين استخدام المساحات',
      'تقارير وتحليلات شاملة',
    ],
    color: '#1e3a5f',
    gradient: 'from-blue-900 to-blue-800',
  },
  {
    name: 'حلول النقل واللوجستيات',
    subtitle: 'Transportation & Logistics',
    icon: Truck,
    image:
      'https://images.unsplash.com/photo-1565891741441-64926e441838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    features: [
      'إدارة أسطول النقل',
      'تخطيط المسارات الأمثل',
      'تتبع الشحنات GPS',
      'خدمات الميل الأخير',
      'التكامل مع منصات الشحن',
    ],
    color: '#d4a574',
    gradient: 'from-lime-400 to-lime-500',
  },
  {
    name: 'إدارة سلاسل الإمداد',
    subtitle: 'Supply Chain Management',
    icon: Network,
    image:
      'https://images.unsplash.com/photo-1716191300038-28ba994616a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    features: [
      'تخطيط الطلب والتوريد',
      'إدارة الموردين والعملاء',
      'تحسين مستويات المخزون',
      'تحليل الأداء والمخاطر',
      'التكامل الشامل',
    ],
    color: '#6b7c93',
    gradient: 'from-gray-600 to-gray-700',
  },
  {
    name: 'خدمات التوزيع المتكاملة',
    subtitle: 'Integrated Distribution',
    icon: Package,
    image:
      'https://images.unsplash.com/photo-1770827730773-cc7848b2ee61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    features: [
      'مراكز توزيع استراتيجية',
      'خدمات التعبئة والتغليف',
      'إدارة المرتجعات',
      'خدمات القيمة المضافة',
      'تكامل مع منصات التجارة',
    ],
    color: '#1e3a5f',
    gradient: 'from-blue-800 to-blue-900',
  },
];

export default function SolutionsSection() {
  const [selectedSolution, setSelectedSolution] = useState<(typeof solutions)[0] | null>(null);

  return (
    <section id="solutions" className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
                حلول متكاملة
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              حلولنا اللوجستية المتطورة
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الحلول اللوجستية الذكية المصممة لتحسين كفاءة عملياتك
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={solution.image}
                    alt={solution.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${solution.gradient} opacity-60`}
                  ></div>

                  {/* Icon Overlay */}
                  <div
                    className="absolute top-4 right-4 w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all group-hover:scale-110"
                    style={{
                      backgroundColor:
                        solution.color === '#d4a574' ? solution.color : 'rgba(255,255,255,0.9)',
                      border: `2px solid ${solution.color}`,
                    }}
                  >
                    <Icon
                      size={32}
                      style={{ color: solution.color === '#d4a574' ? '#1e3a5f' : solution.color }}
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl mb-1" style={{ color: '#1e3a5f' }}>
                      {solution.name}
                    </h3>
                    <p className="text-sm text-gray-500">{solution.subtitle}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          size={20}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: '#d4a574' }}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedSolution(solution)}
                    className="w-full py-3 rounded-lg border-2 transition-all hover:shadow-md flex items-center justify-center gap-2"
                    style={{ borderColor: '#d4a574', color: '#d4a574' }}
                  >
                    <span>اعرف المزيد</span>
                    <ArrowLeft size={18} />
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(10, 31, 68, 0.9)' }}
              onClick={() => setSelectedSolution(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Image */}
                <div className="relative h-64">
                  <ImageWithFallback
                    src={selectedSolution.image}
                    alt={selectedSolution.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${selectedSolution.gradient} opacity-80`}
                  ></div>
                  <button
                    onClick={() => setSelectedSolution(null)}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <X size={24} className="text-white" />
                  </button>
                  <div className="absolute bottom-6 right-6">
                    <h3 className="text-3xl text-white mb-2">{selectedSolution.name}</h3>
                    <p className="text-white/80">{selectedSolution.subtitle}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h4 className="text-xl mb-4" style={{ color: '#d4a574' }}>
                    المميزات والخدمات
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-4 mb-8">
                    {selectedSolution.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                        <CheckCircle2
                          size={20}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: '#d4a574' }}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t pt-6" style={{ borderColor: '#d4a57430' }}>
                    <h4 className="text-lg mb-3" style={{ color: '#1e3a5f' }}>
                      كيف نساعدك؟
                    </h4>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      نقدم حلولاً مخصصة تماماً لاحتياجاتك. فريقنا الاستشاري جاهز لدراسة متطلباتك
                      وتقديم أفضل الحلول التي تضمن تحقيق أهدافك بكفاءة عالية.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="#contact"
                        onClick={() => setSelectedSolution(null)}
                        className="flex-1 py-3 rounded-lg text-white flex items-center justify-center gap-2 text-center"
                        style={{ backgroundColor: '#d4a574' }}
                      >
                        <span>احجز استشارتك المتخصصة</span>
                        <ArrowLeft size={18} />
                      </a>
                      <button
                        onClick={() => setSelectedSolution(null)}
                        className="px-6 py-3 rounded-lg border-2 transition-all"
                        style={{ borderColor: '#E5E7EB', color: '#6B7280' }}
                      >
                        إغلاق
                      </button>
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
