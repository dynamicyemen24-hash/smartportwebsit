import { Target, Eye, Award, Users2 } from 'lucide-react';
import { motion } from 'motion/react';

const values = [
  {
    icon: Target,
    title: 'الجودة أولاً',
    description: 'نلتزم بأعلى معايير الجودة في كل مشروع نقوم به',
  },
  {
    icon: Eye,
    title: 'الشفافية',
    description: 'نؤمن بالتواصل الواضح والصريح مع عملائنا وشركائنا',
  },
  {
    icon: Award,
    title: 'التميز',
    description: 'نسعى دائماً لتقديم حلول مبتكرة ومتفوقة',
  },
  {
    icon: Users2,
    title: 'الشراكة',
    description: 'نبني علاقات طويلة الأمد مبنية على الثقة والنجاح المشترك',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-50 border mb-4"
              style={{ borderColor: '#d4a574' }}
            >
              <span className="text-sm" style={{ color: '#1e3a5f' }}>
                من نحن
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6" style={{ color: '#1e3a5f' }}>
              المنافذ الذكية
            </h2>
            <h3 className="text-xl md:text-2xl mb-6 text-gray-700">
              رواد الحلول اللوجستية والاستشارات المؤسسية في المملكة
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                شركة <strong style={{ color: '#1e3a5f' }}>المنافذ الذكية المحدودة</strong> هي إحدى
                الشركات الرائدة في مجال الحلول اللوجستية المتكاملة والاستشارات المؤسسية في المملكة
                العربية السعودية. مع أكثر من <strong>15 عاماً من الخبرة</strong>، نقدم خدمات متميزة
                تشمل إدارة المستودعات، النقل والشحن، التحول الرقمي، الاستشارات الإدارية (ERP)، وحلول
                الطاقة المتجددة.
              </p>
              <p>
                نفخر بتقديم حلول مبتكرة تساهم في تحسين كفاءة سلاسل الإمداد وتقليل التكاليف التشغيلية
                لعملائنا. فريقنا المتخصص من المهندسين والخبراء اللوجستيين يعمل بلا كلل لضمان تحقيق
                أعلى معايير الجودة والأداء.
              </p>
              <p>
                نؤمن بأن النجاح الحقيقي يكمن في بناء شراكات استراتيجية طويلة الأمد مع عملائنا، ونسعى
                دائماً لتجاوز توقعاتهم من خلال الابتكار المستمر والالتزام بالتميز.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="aspect-[4/3] bg-gradient-to-br flex items-center justify-center p-12"
                style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
              >
                <div className="text-center">
                  <div
                    className="w-32 h-32 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <path
                        d="M40 10L20 20V40C20 52.5 30 60 40 70C50 60 60 52.5 60 40V20L40 10Z"
                        stroke="#1e3a5f"
                        strokeWidth="3"
                        fill="none"
                      />
                      <path
                        d="M40 30V50M30 40H50"
                        stroke="#1e3a5f"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="text-white text-3xl font-bold mb-2">المنافذ الذكية</div>
                  <div className="text-gray-300">شريكك في النجاح</div>
                </div>
              </div>
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-50"
              style={{ backgroundColor: '#d4a574' }}
            ></div>
          </motion.div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl mb-4" style={{ color: '#1e3a5f' }}>
              قيمنا المؤسسية
            </h3>
            <p className="text-gray-600">المبادئ التي نلتزم بها في كل ما نقوم به</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all hover:scale-105"
                >
                  <div
                    className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <Icon size={32} style={{ color: '#1e3a5f' }} />
                  </div>
                  <h4 className="text-lg mb-2" style={{ color: '#1e3a5f' }}>
                    {value.title}
                  </h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br p-12 rounded-2xl shadow-xl text-center"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
        >
          <h3 className="text-2xl md:text-3xl mb-4 text-white">رؤيتنا المستقبلية</h3>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            أن نكون الخيار الأول والأكثر ثقة في المملكة لحلول اللوجستيات الذكية والبنية التحتية
            المتطورة، مع التوسع إقليمياً ودعم رؤية المملكة 2030
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div
              className="px-6 py-3 rounded-lg"
              style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
            >
              🏆 التميز في الخدمة
            </div>
            <div
              className="px-6 py-3 rounded-lg"
              style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
            >
              🌱 الاستدامة البيئية
            </div>
            <div
              className="px-6 py-3 rounded-lg"
              style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
            >
              💡 الابتكار المستمر
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
