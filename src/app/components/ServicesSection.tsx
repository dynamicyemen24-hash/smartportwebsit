import {
  Sun,
  Building2,
  Cog,
  Users,
  TrendingUp,
  Shield,
  FileText,
  UserCheck,
  BarChart3,
  Laptop,
  Calculator,
  Briefcase,
} from 'lucide-react';
import { motion } from 'motion/react';

const serviceCategories = [
  {
    category: 'الخدمات اللوجستية المتخصصة',
    description: 'حلول استراتيجية متكاملة لإدارة وتحسين سلاسل الإمداد بكفاءة قصوى',
    color: '#1e3a5f',
    services: [
      {
        icon: Building2,
        title: 'إدارة المستودعات الذكية',
        description:
          'تصميم وتشغيل مستودعات متطورة بتقنيات WMS وأنظمة RFID مع أتمتة كاملة لعمليات المخزون والتتبع الفوري',
      },
      {
        icon: TrendingUp,
        title: 'تحسين سلاسل الإمداد',
        description:
          'استشارات استراتيجية لإعادة هندسة العمليات اللوجستية وتحقيق وفورات تصل إلى 35% من خلال تحليل البيانات المتقدم',
      },
      {
        icon: Shield,
        title: 'حلول التخزين المتخصص',
        description:
          'خدمات تخزين متوافقة مع المعايير الدولية للمواد الحساسة والخطرة (Hazmat) بأنظمة أمان ومراقبة متقدمة 24/7',
      },
    ],
  },
  {
    category: 'الاستشارات المؤسسية والإدارية',
    description: 'حلول استشارية استراتيجية لتحقيق التحول المؤسسي الشامل',
    color: '#6b7c93',
    services: [
      {
        icon: Briefcase,
        title: 'تخطيط موارد المؤسسات (ERP)',
        description:
          'تصميم وتطبيق حلول ERP متكاملة (SAP, Oracle, Microsoft Dynamics) مع إدارة كامل دورة الحياة من التحليل إلى التشغيل',
      },
      {
        icon: Users,
        title: 'الهندسة المؤسسية والتطوير',
        description:
          'إعادة هيكلة شاملة للكيانات المؤسسية وتطوير أطر الحوكمة والامتثال وفق أفضل الممارسات العالمية',
      },
      {
        icon: UserCheck,
        title: 'إدارة رأس المال البشري',
        description:
          'بناء منظومة متكاملة لإدارة المواهب: التوصيف الوظيفي، هياكل التعويضات التنافسية، خطط الإحلال والتطوير القيادي',
      },
    ],
  },
  {
    category: 'الاستشارات التقنية والمحاسبية',
    description: 'حلول تقنية ومالية متقدمة تدعم الأداء والنمو المستدام',
    color: '#d4a574',
    services: [
      {
        icon: BarChart3,
        title: 'إدارة الأداء والتميز المؤسسي',
        description:
          'تصميم منظومات قياس الأداء الاستراتيجي (Balanced Scorecard, OKRs) مع لوحات معلومات تنفيذية ذكية لدعم اتخاذ القرار',
      },
      {
        icon: Laptop,
        title: 'التحول الرقمي والابتكار',
        description:
          'قيادة التحول الرقمي الشامل: Cloud Migration, AI/ML Integration, Cybersecurity Frameworks, وحلول IoT للعمليات اللوجستية',
      },
      {
        icon: Calculator,
        title: 'الاستشارات المالية والضريبية',
        description:
          'تصميم أنظمة محاسبية متوافقة مع IFRS وSOCPA، التخطيط الضريبي، إعداد نماذج التقييم المالي، وإدارة المخاطر المالية',
      },
    ],
  },
  {
    category: 'المقاولات والبنية التحتية',
    description: 'تنفيذ مشاريع البنية التحتية والطاقة المتجددة بمعايير عالمية',
    color: '#5a9367',
    services: [
      {
        icon: Sun,
        title: 'حلول الطاقة المتجددة',
        description:
          'تصميم وتنفيذ محطات شمسية بقدرات تصل إلى 50MW مع أنظمة تخزين الطاقة وإدارة الشبكات الذكية، متوافقة مع رؤية السعودية 2030',
      },
      {
        icon: Cog,
        title: 'المقاولات الصناعية المتخصصة',
        description:
          'تنفيذ مشاريع البنية التحتية للمستودعات ومراكز التوزيع ومحطات النقل بمعايير ISO وشهادات LEED الخضراء',
      },
      {
        icon: FileText,
        title: 'الهندسة الاستشارية المتكاملة',
        description:
          'خدمات هندسية شاملة: دراسات الجدوى، التصميم التفصيلي، الإشراف على التنفيذ، وإدارة المشاريع (PMO) وفق منهجيات PMP',
      },
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white">
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
                خدماتنا
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              خدمات متكاملة للأعمال
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات اللوجستية والهندسية لدعم نمو أعمالك
            </p>
          </motion.div>
        </div>

        <div className="space-y-20">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={category.category}>
              <motion.div
                initial={{ opacity: 0, x: categoryIndex === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="h-1 w-16 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <h3 className="text-2xl md:text-3xl" style={{ color: '#1e3a5f' }}>
                    {category.category}
                  </h3>
                </div>
                <p className="text-gray-600 mr-20">{category.description}</p>
              </motion.div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {category.services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105"
                    >
                      <div
                        className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all group-hover:scale-110"
                        style={{
                          backgroundColor:
                            category.color === '#d4a574' ? category.color : `${category.color}15`,
                          border: `2px solid ${category.color}`,
                        }}
                      >
                        <Icon
                          size={32}
                          style={{
                            color: category.color === '#d4a574' ? '#1e3a5f' : category.color,
                          }}
                        />
                      </div>
                      <h4 className="text-xl mb-3 text-center" style={{ color: '#1e3a5f' }}>
                        {service.title}
                      </h4>
                      <p className="text-gray-600 text-center leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br p-12 rounded-2xl shadow-xl"
            style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
          >
            <h3 className="text-2xl md:text-3xl mb-4 text-white">هل لديك مشروع خاص؟</h3>
            <p className="text-gray-200 mb-6 text-lg max-w-2xl mx-auto">
              نحن مستعدون لتقديم حلول مخصصة تلبي احتياجاتك الفريدة
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 rounded-lg text-lg transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
            >
              تواصل معنا الآن
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
