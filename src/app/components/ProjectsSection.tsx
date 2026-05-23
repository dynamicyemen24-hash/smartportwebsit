import { Building, Factory, Store, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const projects = [
  {
    title: 'مستودع مركزي للتوزيع',
    client: 'شركة لوجستية كبرى',
    description: 'تصميم وتنفيذ مستودع بمساحة 50,000 متر مربع بأنظمة إدارة ذكية',
    type: 'لوجستي',
    icon: Building,
    stats: { area: '50,000 م²', duration: '12 شهر', capacity: '+10,000 وحدة' },
  },
  {
    title: 'نظام طاقة شمسية صناعي',
    client: 'مصنع للإنتاج',
    description: 'تركيب محطة طاقة شمسية بقدرة 2 ميجاوات لتوفير الطاقة النظيفة',
    type: 'طاقة',
    icon: Zap,
    stats: { capacity: '2 MW', saving: '60% توفير', impact: '-800 طن CO₂' },
  },
  {
    title: 'مركز توزيع إقليمي',
    client: 'سلسلة تجزئة وطنية',
    description: 'إنشاء مركز توزيع متطور بأنظمة آلية للفرز والتخزين',
    type: 'لوجستي',
    icon: Store,
    stats: { throughput: '5000 طلب/يوم', automation: '80%', efficiency: '+45%' },
  },
  {
    title: 'مجمع صناعي متكامل',
    client: 'شركة تصنيع',
    description: 'تنفيذ بنية تحتية كاملة لمجمع صناعي شامل',
    type: 'إنشاءات',
    icon: Factory,
    stats: { area: '100,000 م²', facilities: '15 منشأة', jobs: '+500 وظيفة' },
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-white to-gray-50">
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
                إنجازاتنا
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              مشاريع رائدة نفخر بها
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نماذج من مشاريعنا الناجحة التي حققت نتائج استثنائية لعملائنا
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className="relative h-48 bg-gradient-to-br overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ backgroundColor: '#d4a574' }}
                    >
                      <Icon size={48} style={{ color: '#1e3a5f' }} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs text-white border border-white/30 backdrop-blur-sm bg-white/10">
                      {project.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl mb-2" style={{ color: '#1e3a5f' }}>
                    {project.title}
                  </h3>
                  <p
                    className="text-sm mb-3 px-3 py-1 rounded inline-block"
                    style={{ backgroundColor: '#d4a57420', color: '#1e3a5f' }}
                  >
                    {project.client}
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg mb-1" style={{ color: '#1e3a5f' }}>
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600"
          >
            وأكثر من{' '}
            <span
              className="px-2 py-1 rounded"
              style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
            >
              300+ مشروع ناجح
            </span>{' '}
            في مختلف القطاعات
          </motion.p>
        </div>
      </div>
    </section>
  );
}
