import {
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award,
  CheckCircle,
  Target,
  BarChart3,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ValuePropositionSection() {
  const valueProps = [
    {
      icon: TrendingUp,
      title: 'نتائج مثبتة وقابلة للقياس',
      description: 'تحقيق وفورات تصل إلى 40% وتحسين الكفاءة بنسبة 45% مع مؤشرات أداء واضحة',
      metrics: [
        'متوسط خفض التكاليف: 35-40%',
        'تحسين الكفاءة التشغيلية: 40-45%',
        'معدل ROI: 200-300% خلال سنتين',
      ],
    },
    {
      icon: Shield,
      title: 'موثوقية وجودة مضمونة',
      description: 'شهادات دولية ومعايير عالمية مع التزام صارم بالجودة والمواعيد',
      metrics: ['ISO 9001:2015 معتمد', '99.8% دقة في التنفيذ', '100% التزام بالجداول الزمنية'],
    },
    {
      icon: Zap,
      title: 'تقنيات متقدمة ومبتكرة',
      description: 'استخدام أحدث التقنيات في الأتمتة والذكاء الاصطناعي وإنترنت الأشياء',
      metrics: ['WMS & ERP Integration', 'AI-Powered Analytics', 'IoT & RFID Tracking'],
    },
    {
      icon: Users,
      title: 'خبرة إقليمية عميقة',
      description: 'أكثر من 15 عاماً في السوق الخليجي مع فهم عميق للتحديات المحلية',
      metrics: ['+500 مشروع ناجح', '98% معدل رضا العملاء', 'تغطية شاملة للمملكة والخليج'],
    },
  ];

  const differentiators = [
    {
      icon: Target,
      title: 'نهج استشاري شامل',
      description:
        'لا نقدم حلولاً جاهزة، بل نصمم استراتيجيات مخصصة تتماشى مع أهدافك المؤسسية وتحدياتك الفريدة',
    },
    {
      icon: BarChart3,
      title: 'شفافية كاملة في الأداء',
      description:
        'تقارير دورية مفصلة مع مؤشرات أداء واضحة وقابلة للقياس لضمان تحقيق الأهداف المتفق عليها',
    },
    {
      icon: Award,
      title: 'دعم متواصل وتطوير مستمر',
      description:
        'لا تنتهي علاقتنا بالتنفيذ، بل نستمر في الدعم والتطوير والتحسين المستمر لضمان نجاحك الدائم',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(30, 58, 95, 0.08) 0%, transparent 70%)',
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
                backgroundColor: 'rgba(90, 147, 103, 0.08)',
                borderColor: 'rgba(90, 147, 103, 0.3)',
              }}
            >
              <Award size={18} style={{ color: '#5a9367' }} />
              <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                قيمة مضافة حقيقية
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-6 font-bold"
              style={{ color: '#1e3a5f' }}
            >
              لماذا المنافذ الذكية؟
            </h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#4a5568' }}>
              نحن لا نقدم خدمات فحسب، بل نبني شراكات استراتيجية طويلة الأمد تُحقق نتائج ملموسة
              وقابلة للقياس
            </p>
          </motion.div>
        </div>

        {/* Value Propositions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border"
                style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: 'rgba(212, 165, 116, 0.12)' }}
                  >
                    <Icon size={32} style={{ color: '#d4a574' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3" style={{ color: '#1e3a5f' }}>
                      {prop.title}
                    </h3>
                    <p className="leading-relaxed mb-4" style={{ color: '#4a5568' }}>
                      {prop.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pl-[88px]">
                  {prop.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="mt-1 flex-shrink-0"
                        style={{ color: '#5a9367' }}
                      />
                      <span className="text-sm" style={{ color: '#2d3748' }}>
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-3xl p-10 md:p-12"
        >
          <h3
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            style={{ color: '#1e3a5f' }}
          >
            ما يُميزنا حقاً
          </h3>
          <p className="text-center mb-12 text-lg max-w-3xl mx-auto" style={{ color: '#4a5568' }}>
            نجمع بين الخبرة الإقليمية العميقة والمنهجيات العالمية المُثبتة لتقديم قيمة استثنائية
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.map((diff, index) => {
              const Icon = diff.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(30, 58, 95, 0.08)' }}
                  >
                    <Icon size={28} style={{ color: '#1e3a5f' }} />
                  </div>
                  <h4 className="text-xl font-bold mb-3" style={{ color: '#1e3a5f' }}>
                    {diff.title}
                  </h4>
                  <p className="leading-relaxed" style={{ color: '#4a5568' }}>
                    {diff.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg border"
          style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#d4a574' }}>
                15+
              </div>
              <div className="font-medium mb-1" style={{ color: '#1e3a5f' }}>
                عاماً من الخبرة
              </div>
              <div className="text-sm" style={{ color: '#6b7c93' }}>
                في السوق الخليجي
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#d4a574' }}>
                500+
              </div>
              <div className="font-medium mb-1" style={{ color: '#1e3a5f' }}>
                مشروع ناجح
              </div>
              <div className="text-sm" style={{ color: '#6b7c93' }}>
                تم تنفيذه بتميز
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#d4a574' }}>
                98%
              </div>
              <div className="font-medium mb-1" style={{ color: '#1e3a5f' }}>
                رضا العملاء
              </div>
              <div className="text-sm" style={{ color: '#6b7c93' }}>
                معدل التجديد السنوي
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#d4a574' }}>
                40%
              </div>
              <div className="font-medium mb-1" style={{ color: '#1e3a5f' }}>
                خفض التكاليف
              </div>
              <div className="text-sm" style={{ color: '#6b7c93' }}>
                متوسط الوفورات
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
