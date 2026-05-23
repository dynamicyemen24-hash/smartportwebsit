import { BookOpen, FileText, Video, Download } from 'lucide-react';
import { motion } from 'motion/react';

const resources = [
  {
    icon: BookOpen,
    title: 'دليل التحول الرقمي',
    description: 'خارطة طريق شاملة للمؤسسات الراغبة في بدء رحلة التحول الرقمي',
    type: 'PDF',
    size: '2.4 MB',
  },
  {
    icon: FileText,
    title: 'هندسة العمليات الحديثة',
    description: 'منهجيات وأدوات إعادة تصميم العمليات لتحقيق الكفاءة القصوى',
    type: 'PDF',
    size: '1.8 MB',
  },
  {
    icon: Video,
    title: 'نظرة عامة على GsERP',
    description: 'فيديو تعريفي شامل يشرح مميزات وقدرات منظومة GsERP',
    type: 'VIDEO',
    size: '15 دقيقة',
  },
  {
    icon: FileText,
    title: 'دراسات حالة ناجحة',
    description: 'قصص نجاح حقيقية لمؤسسات حققت نتائج استثنائية مع حلولنا',
    type: 'PDF',
    size: '3.1 MB',
  },
];

export default function KnowledgeSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              مركز المعرفة
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              موارد قيمة لفهم أفضل ممارسات التحول الرقمي وهندسة العمليات المؤسسية
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <Icon size={24} style={{ color: '#1e3a5f' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl" style={{ color: '#1e3a5f' }}>
                        {resource.title}
                      </h3>
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: '#1e3a5f15', color: '#1e3a5f' }}
                      >
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{resource.size}</span>
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-80"
                        style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
                      >
                        <Download size={16} />
                        <span className="text-sm">تحميل</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="text-4xl mb-3">💡</div>
            <h4 className="text-lg mb-2" style={{ color: '#1e3a5f' }}>
              لماذا التحول الرقمي؟
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              المؤسسات التي تتبنى التحول الرقمي تحقق زيادة في الإنتاجية بنسبة تصل إلى 40% وتخفيض في
              التكاليف التشغيلية بنسبة 30%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="text-4xl mb-3">⚙️</div>
            <h4 className="text-lg mb-2" style={{ color: '#1e3a5f' }}>
              هندسة العمليات
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              إعادة تصميم العمليات التشغيلية باستخدام منهجيات علمية مثبتة يضمن تحسين الأداء وإزالة
              الهدر وتحقيق الكفاءة
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="text-lg mb-2" style={{ color: '#1e3a5f' }}>
              نهجنا المتكامل
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              نجمع بين الاستشارات الاستراتيجية والحلول التقنية المتقدمة والدعم المستمر لضمان تحقيق
              أهدافك بنجاح
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
