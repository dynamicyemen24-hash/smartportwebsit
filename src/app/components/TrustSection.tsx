import { Award, Users, Clock, Target, Globe, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  {
    icon: Clock,
    value: '+15',
    label: 'سنة خبرة',
    description: 'في مجال اللوجستيات',
  },
  {
    icon: Award,
    value: '+300',
    label: 'مشروع منجز',
    description: 'بجودة ومهنية عالية',
  },
  {
    icon: Users,
    value: '+150',
    label: 'عميل راضٍ',
    description: 'يثقون بخدماتنا',
  },
  {
    icon: Target,
    value: '100%',
    label: 'الالتزام',
    description: 'بالمواعيد والجودة',
  },
  {
    icon: Globe,
    value: '+50',
    label: 'مدينة',
    description: 'نغطيها بخدماتنا',
  },
  {
    icon: Leaf,
    value: '5MW+',
    label: 'طاقة نظيفة',
    description: 'مشاريع طاقة متجددة',
  },
];

export default function TrustSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-lime-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-white/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 backdrop-blur-sm"
              style={{ borderColor: '#d4a574', backgroundColor: 'rgba(191, 255, 0, 0.1)' }}
            >
              <span className="text-sm" style={{ color: '#d4a574' }}>
                أرقامنا تتحدث
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white">إنجازات نفخر بها</h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              أرقام حقيقية تعكس التزامنا بالتميز والجودة في كل ما نقدمه
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
                  <div
                    className="w-16 h-16 rounded-xl mx-auto mb-6 flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <Icon size={32} style={{ color: '#1e3a5f' }} />
                  </div>
                  <div className="text-4xl md:text-5xl mb-2 text-white">{stat.value}</div>
                  <div className="text-xl mb-2" style={{ color: '#d4a574' }}>
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-300">{stat.description}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-white">🏆</span>
            <span className="text-white">معتمدون من هيئة النقل السعودية</span>
            <span className="text-white">•</span>
            <span className="text-white">شهادة ISO 9001</span>
            <span className="text-white">•</span>
            <span className="text-white">عضو اتحاد النقل الدولي</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
