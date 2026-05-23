import { Building2, Building, Store, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const systems = [
  {
    name: 'GsERP 1-2-3',
    target: 'المؤسسات الكبرى',
    icon: Building2,
    features: [
      'إدارة متعددة الفروع والشركات',
      'تكامل كامل مع الأنظمة المصرفية',
      'تقارير متقدمة وتحليلات BI',
      'دعم آلاف المستخدمين',
      'تخصيص غير محدود',
    ],
    color: '#1e3a5f',
  },
  {
    name: 'GS4',
    target: 'المؤسسات المتوسطة',
    icon: Building,
    features: [
      'إدارة الموارد والمخزون',
      'نظام محاسبي متكامل',
      'إدارة العملاء والموردين',
      'تقارير مالية وإدارية',
      'سهولة الاستخدام',
    ],
    color: '#d4a574',
  },
  {
    name: 'GS5',
    target: 'الأعمال الصغيرة',
    icon: Store,
    features: [
      'نقاط البيع الذكية',
      'إدارة المخزون البسيطة',
      'الفواتير الإلكترونية',
      'تقارير يومية',
      'أسعار تنافسية',
    ],
    color: '#6b7c93',
  },
];

export default function SystemsSection() {
  return (
    <section id="systems" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              منظومة GsERP البرمجية
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              حلول برمجية متكاملة لكل حجم مؤسسة - من الشركات الناشئة إلى المؤسسات الكبرى
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105"
              >
                <div className="mb-6">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor:
                        system.color === '#d4a574' ? system.color : `${system.color}15`,
                      border: `2px solid ${system.color}`,
                    }}
                  >
                    <Icon
                      size={32}
                      style={{ color: system.color === '#d4a574' ? '#1e3a5f' : system.color }}
                    />
                  </div>
                  <h3 className="text-2xl mb-2" style={{ color: '#1e3a5f' }}>
                    {system.name}
                  </h3>
                  <p
                    className="text-sm px-4 py-1.5 rounded-full inline-block"
                    style={{ backgroundColor: `${system.color}20`, color: system.color }}
                  >
                    {system.target}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {system.features.map((feature, i) => (
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
                  className="w-full py-3 rounded-lg border-2 transition-all hover:shadow-md"
                  style={{ borderColor: system.color, color: system.color }}
                >
                  اطلب عرض توضيحي
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-4xl mx-auto"
            style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
          >
            <h3 className="text-2xl md:text-3xl mb-4 text-white">هل تحتاج حل مخصص؟</h3>
            <p className="text-gray-200 mb-6 text-lg">
              نقدم تطوير أنظمة مخصصة بالكامل تناسب احتياجاتك الفريدة
            </p>
            <button
              className="px-8 py-3 rounded-lg text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
            >
              تحدث مع مستشار تقني
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
