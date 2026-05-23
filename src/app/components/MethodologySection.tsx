import { Target, Search, Lightbulb, Rocket, BarChart, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const methodology = [
  {
    phase: '01',
    icon: Search,
    title: 'التحليل والاستكشاف',
    description: 'نبدأ بفهم عميق لاحتياجاتك وتحدياتك',
    activities: ['دراسة الوضع الحالي', 'تحليل الفجوات', 'تحديد الأولويات', 'جمع المتطلبات'],
    color: '#1e3a5f',
  },
  {
    phase: '02',
    icon: Lightbulb,
    title: 'التخطيط الاستراتيجي',
    description: 'نضع خطة شاملة ومفصلة للتنفيذ',
    activities: ['تصميم الحلول', 'وضع خارطة الطريق', 'تحديد الموارد', 'إعداد الجداول الزمنية'],
    color: '#d4a574',
  },
  {
    phase: '03',
    icon: Rocket,
    title: 'التنفيذ والتطبيق',
    description: 'ننفذ الحلول بكفاءة ومهنية عالية',
    activities: ['تنفيذ على مراحل', 'إدارة المشروع', 'ضمان الجودة', 'المتابعة المستمرة'],
    color: '#6b7c93',
  },
  {
    phase: '04',
    icon: BarChart,
    title: 'القياس والتحسين',
    description: 'نقيس النتائج ونطور باستمرار',
    activities: ['قياس الأداء', 'جمع التغذية الراجعة', 'التحسين المستمر', 'التوثيق والتدريب'],
    color: '#5a9367',
  },
];

const principles = [
  {
    icon: Target,
    title: 'التركيز على النتائج',
    description: 'نلتزم بتحقيق أهداف قابلة للقياس',
  },
  {
    icon: CheckCircle,
    title: 'الجودة أولاً',
    description: 'معايير عالمية في كل مرحلة',
  },
  {
    icon: Users,
    title: 'الشراكة الحقيقية',
    description: 'نعمل معك كفريق واحد',
  },
];

function Users(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}

export default function MethodologySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
                منهجيتنا
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              كيف نعمل معك
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              منهجية مجربة ومثبتة تضمن نجاح مشروعك من البداية حتى التسليم والدعم
            </p>
          </motion.div>
        </div>

        {/* Methodology Steps */}
        <div className="relative mb-20">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-200 transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {methodology.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    {/* Phase Number */}
                    <div
                      className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.phase}
                    </div>

                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                      style={{
                        backgroundColor: `${step.color}20`,
                        border: `2px solid ${step.color}`,
                      }}
                    >
                      <Icon size={32} style={{ color: step.color }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl mb-3 text-center" style={{ color: '#1e3a5f' }}>
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Activities */}
                    <ul className="space-y-2">
                      {step.activities.map((activity, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: step.color }}
                          ></div>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Core Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br p-12 rounded-2xl shadow-xl"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl mb-4 text-white">مبادئنا الأساسية</h3>
            <p className="text-gray-200 max-w-2xl mx-auto">القيم التي نلتزم بها في كل مشروع</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <Icon size={32} style={{ color: '#1e3a5f' }} />
                  </div>
                  <h4 className="text-lg mb-2 text-white">{principle.title}</h4>
                  <p className="text-sm text-gray-300">{principle.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
