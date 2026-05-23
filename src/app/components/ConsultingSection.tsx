import {
  Briefcase,
  Users,
  UserCheck,
  BarChart3,
  Laptop,
  Calculator,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

const consultingServices = [
  {
    icon: Briefcase,
    title: 'تخطيط موارد المؤسسات (ERP)',
    description: 'استشارات متكاملة لاختيار وتطبيق حلول ERP بما يتوافق مع استراتيجيتك المؤسسية',
    features: [
      'تحليل متطلبات الأعمال وتقييم الجاهزية',
      'اختيار النظام الأمثل (SAP, Oracle, Microsoft)',
      'التخطيط الاستراتيجي للتطبيق والتكامل',
      'إدارة التغيير والتدريب المتخصص',
    ],
  },
  {
    icon: Users,
    title: 'البناء والتطوير المؤسسي',
    description: 'إعادة هيكلة الكيانات المؤسسية وتطوير القدرات التنظيمية بمنهجيات عالمية',
    features: [
      'تصميم الهياكل التنظيمية والمصفوفات الوظيفية',
      'بناء منظومة السياسات والإجراءات',
      'تطوير أطر الحوكمة والامتثال',
      'قيادة التحول وإدارة التغيير الاستراتيجي',
    ],
  },
  {
    icon: UserCheck,
    title: 'الموارد البشرية الاستراتيجية',
    description: 'تصميم أنظمة إدارة الموارد البشرية المتكاملة وبناء كفاءات المؤسسة',
    features: [
      'بطاقات التوصيف الوظيفي والكفاءات',
      'تصميم مسارات التطور والإحلال الوظيفي',
      'أنظمة التعويضات والمزايا التنافسية',
      'استراتيجيات استقطاب وتطوير المواهب',
    ],
  },
  {
    icon: BarChart3,
    title: 'إدارة الأداء والتميز المؤسسي',
    description: 'بناء منظومة متكاملة لقياس وتحسين الأداء المؤسسي باستخدام أفضل الأطر العالمية',
    features: [
      'تصميم مؤشرات الأداء الاستراتيجية (KPIs)',
      'بطاقات الأداء المتوازن (BSC) ونماذج OKR',
      'أنظمة تقييم الأداء الفردي والجماعي',
      'لوحات المعلومات التنفيذية والتقارير الذكية',
    ],
  },
  {
    icon: Laptop,
    title: 'التحول الرقمي والابتكار التقني',
    description: 'قيادة التحول الرقمي الشامل وبناء البنية التحتية التقنية المتقدمة',
    features: [
      'وضع استراتيجيات التحول الرقمي المتكاملة',
      'تصميم البنية التحتية السحابية والهجينة',
      'حلول الأمن السيبراني وحماية البيانات',
      'تطبيقات الذكاء الاصطناعي والأتمتة الذكية',
    ],
  },
  {
    icon: Calculator,
    title: 'الاستشارات المالية والمحاسبية',
    description: 'تصميم الأنظمة المالية والمحاسبية المتوافقة مع المعايير الدولية IFRS',
    features: [
      'بناء أنظمة محاسبية متكاملة ومؤتمتة',
      'التخطيط المالي وإعداد الموازنات التشغيلية',
      'الامتثال للمعايير IFRS وSOCPA',
      'التدقيق الداخلي وإدارة المخاطر المالية',
    ],
  },
];

export default function ConsultingSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
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
                الاستشارات الإدارية والتقنية
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              استشارات استراتيجية لتمكين التحول المؤسسي
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نُصمّم حلولاً استشارية متكاملة تُحقق التحول الشامل في العمليات والهياكل المؤسسية، مع
              التركيز على الكفاءة والاستدامة
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultingServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105"
              >
                <div
                  className="w-16 h-16 rounded-xl mx-auto mb-6 flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ backgroundColor: '#d4a57420', border: '2px solid #d4a574' }}
                >
                  <Icon size={32} style={{ color: '#1e3a5f' }} />
                </div>

                <h3 className="text-xl mb-3 text-center" style={{ color: '#1e3a5f' }}>
                  {service.title}
                </h3>

                <p className="text-gray-600 text-center mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: '#d4a574' }}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="w-full py-3 rounded-lg border-2 transition-all hover:shadow-md flex items-center justify-center gap-2 group-hover:bg-opacity-10"
                  style={{ borderColor: '#1e3a5f', color: '#1e3a5f' }}
                >
                  <span>اطلب استشارة</span>
                  <ArrowRight size={18} />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100"
        >
          <h3 className="text-2xl md:text-3xl mb-4" style={{ color: '#1e3a5f' }}>
            لماذا تختار خدماتنا الاستشارية؟
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            نجمع بين الخبرة الإقليمية العميقة والمنهجيات العالمية لتقديم استشارات تُحدث فرقاً
            حقيقياً
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl mb-3">🎯</div>
              <div className="font-bold mb-2" style={{ color: '#1e3a5f' }}>
                خبرة إقليمية متعمقة
              </div>
              <div className="text-sm text-gray-600">
                أكثر من 15 عاماً في تقديم الاستشارات الاستراتيجية للمؤسسات الخليجية الرائدة
              </div>
            </div>
            <div>
              <div className="text-4xl mb-3">⚡</div>
              <div className="font-bold mb-2" style={{ color: '#1e3a5f' }}>
                منهجيات مثبتة النجاح
              </div>
              <div className="text-sm text-gray-600">
                حلول عملية قائمة على أفضل الممارسات العالمية مع نتائج قابلة للقياس
              </div>
            </div>
            <div>
              <div className="text-4xl mb-3">🤝</div>
              <div className="font-bold mb-2" style={{ color: '#1e3a5f' }}>
                التزام بالنجاح المستدام
              </div>
              <div className="text-sm text-gray-600">
                مرافقة شاملة من التخطيط إلى التنفيذ والتحسين المستمر
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
