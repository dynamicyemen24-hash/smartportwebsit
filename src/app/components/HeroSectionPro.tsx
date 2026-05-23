import { ArrowLeft, Award, TrendingUp, Shield, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function HeroSectionPro() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-lime-400 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-lime-400/20 to-lime-500/20 border border-lime-400/30 mb-8 backdrop-blur-sm"
            >
              <Award size={20} style={{ color: '#d4a574' }} />
              <span className="text-sm text-white">شريكك الاستراتيجي في التحول اللوجستي</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.1]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="block text-white mb-3"
              >
                نُعيد تعريف
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="block bg-gradient-to-l from-lime-400 to-lime-300 bg-clip-text text-transparent mb-3"
              >
                التميّز اللوجستي
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="block text-white"
              >
                في المملكة
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl mb-6 leading-relaxed text-gray-300"
            >
              حلول لوجستية متكاملة مدعومة بالتقنيات المتقدمة
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg mb-10 leading-relaxed text-gray-400 max-w-xl"
            >
              نُمكّن المؤسسات الرائدة من تحقيق الكفاءة التشغيلية القصوى وخفض التكاليف بنسبة تصل إلى
              40% من خلال حلول مبتكرة ومنهجيات عالمية مُثبتة
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#contact"
                className="group relative px-8 py-4 rounded-xl flex items-center gap-3 text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-lime-500/30"
                style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
              >
                <span className="relative z-10 font-semibold">احجز استشارتك الآن</span>
                <ArrowLeft
                  size={20}
                  className="relative z-10 group-hover:-translate-x-1 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-lime-300 to-lime-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>

              <a
                href="#solutions"
                className="group px-8 py-4 rounded-xl border-2 flex items-center gap-3 text-lg bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-xl"
                style={{ borderColor: 'rgba(191, 255, 0, 0.3)', color: '#ffffff' }}
              >
                <span>اكتشف حلولنا</span>
                <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-4xl font-bold bg-gradient-to-l from-lime-400 to-lime-300 bg-clip-text text-transparent">
                    +15
                  </div>
                </div>
                <div className="text-sm text-gray-400">عاماً من الريادة</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-4xl font-bold bg-gradient-to-l from-lime-400 to-lime-300 bg-clip-text text-transparent">
                    +500
                  </div>
                </div>
                <div className="text-sm text-gray-400">مشروع استراتيجي</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-4xl font-bold bg-gradient-to-l from-lime-400 to-lime-300 bg-clip-text text-transparent">
                    98%
                  </div>
                </div>
                <div className="text-sm text-gray-400">معدل رضا العملاء</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Image Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
              <div className="relative aspect-[4/5]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="مستودعات ذكية متطورة بأنظمة أوتوماتيكية"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                {/* Floating Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#d4a574' }}
                    >
                      <TrendingUp size={24} style={{ color: '#1e3a5f' }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-lg font-semibold mb-1">
                        تحسين الكفاءة التشغيلية
                      </div>
                      <div className="text-gray-300 text-sm">
                        نتائج مقاسة وموثقة في تقليل التكاليف وتسريع العمليات
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Badge - Top Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl p-6 shadow-2xl"
            >
              <Shield size={32} style={{ color: '#1e3a5f' }} />
              <div className="mt-2 text-sm font-bold" style={{ color: '#1e3a5f' }}>
                ISO 9001:2015
              </div>
            </motion.div>

            {/* Secondary Images Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group"
              >
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1775756789951-3f2ef4307258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="خدمات النقل المتطورة"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 left-4">
                    <div className="text-white text-sm font-semibold">النقل الذكي</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group"
              >
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1716191300038-28ba994616a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="سلاسل الإمداد المتكاملة"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 left-4">
                    <div className="text-white text-sm font-semibold">سلاسل الإمداد</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-lime-400/20 to-transparent rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs">تعرف على المزيد</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={24} />
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
