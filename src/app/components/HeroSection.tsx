import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/5 via-transparent to-lime-50/30"></div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-lime-400 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 border border-blue-900 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-right"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-50 border mb-6"
              style={{ borderColor: '#d4a574' }}
            >
              <Sparkles size={16} style={{ color: '#d4a574' }} />
              <span className="text-sm" style={{ color: '#1e3a5f' }}>
                رواد الحلول اللوجستية الذكية
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
              style={{ color: '#1e3a5f' }}
            >
              <span className="block">نُصمّم مستقبل</span>
              <span className="block mt-2">سلاسل الإمداد</span>
              <span
                className="block mt-2"
                style={{ color: '#d4a574', WebkitTextStroke: '1px #1e3a5f' }}
              >
                الذكية
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-700">
              حلول لوجستية متكاملة تُحقق التميّز التشغيلي وتُعظّم العائد على الاستثمار
            </p>

            <p className="text-lg mb-8 leading-relaxed text-gray-600">
              نُقدم استشارات متخصصة وحلولاً مبتكرة تُمكّن المؤسسات من تحقيق الكفاءة القصوى في
              عملياتها اللوجستية، مع التركيز على التحسين المستمر وخفض التكاليف التشغيلية
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg flex items-center gap-2 text-lg shadow-lg"
                style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
              >
                <span>احجز استشارتك الآن</span>
                <ArrowLeft size={20} />
              </motion.a>

              <motion.a
                href="#solutions"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg border-2 flex items-center gap-2 text-lg bg-white"
                style={{ borderColor: '#1e3a5f', color: '#1e3a5f' }}
              >
                <span>استكشف حلولنا</span>
              </motion.a>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl mb-1" style={{ color: '#1e3a5f' }}>
                  +15
                </div>
                <div className="text-sm text-gray-600">عاماً من الخبرة</div>
              </div>
              <div>
                <div className="text-3xl mb-1" style={{ color: '#1e3a5f' }}>
                  +300
                </div>
                <div className="text-sm text-gray-600">مشروع ناجح</div>
              </div>
              <div>
                <div className="text-3xl mb-1" style={{ color: '#1e3a5f' }}>
                  100%
                </div>
                <div className="text-sm text-gray-600">رضا العملاء</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[16/10]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="مستودعات ذكية بأنظمة أوتوماتيكية متطورة"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-transparent"></div>

                  <div className="absolute bottom-6 right-6 left-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                      <h3 className="text-white text-xl mb-2">إدارة المستودعات الذكية</h3>
                      <p className="text-white/80 text-sm">
                        أنظمة أوتوماتيكية متطورة لتحسين كفاءة المخزون
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary images */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1775756789951-3f2ef4307258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="خدمات النقل واللوجستيات"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 left-4">
                    <div
                      className="w-10 h-10 rounded-lg mb-2 flex items-center justify-center"
                      style={{ backgroundColor: '#d4a574' }}
                    >
                      <span className="text-xl">🚛</span>
                    </div>
                    <div className="text-white text-sm font-bold">نقل وشحن</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1769283431582-efdb02caf94d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="الموانئ والخدمات اللوجستية البحرية"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 left-4">
                    <div
                      className="w-10 h-10 rounded-lg mb-2 flex items-center justify-center"
                      style={{ backgroundColor: '#d4a574' }}
                    >
                      <span className="text-xl">⚓</span>
                    </div>
                    <div className="text-white text-sm font-bold">حلول بحرية</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-3xl opacity-50"
              style={{ backgroundColor: '#d4a574' }}
            ></div>
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: '#1e3a5f' }}
            ></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
