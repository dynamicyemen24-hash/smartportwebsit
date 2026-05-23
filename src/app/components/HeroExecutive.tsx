import {
  ArrowLeft,
  CheckCircle,
  Building2,
  Award,
  Briefcase,
  Cog,
  BarChart3,
  Play,
  Star,
  ChevronDown,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function HeroExecutive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats = [
    { value: '+15', label: 'عاماً من الخبرة', sublabel: 'في السوق الخليجي' },
    { value: '+500', label: 'مشروع استراتيجي', sublabel: 'تم تنفيذه بنجاح' },
    { value: '98%', label: 'رضا العملاء', sublabel: 'معدل التجديد السنوي' },
    { value: 'ISO', label: 'شهادات دولية', sublabel: '9001:2015 معتمد' },
  ];

  const services = [
    { icon: Building2, title: 'الحلول اللوجستية', desc: 'مستودعات ذكية ونقل متطور' },
    { icon: Briefcase, title: 'الاستشارات المؤسسية', desc: 'ERP والتطوير التنظيمي' },
    { icon: BarChart3, title: 'التحول الرقمي', desc: 'تقنيات وحلول مبتكرة' },
    { icon: Cog, title: 'البنية التحتية', desc: 'طاقة متجددة ومقاولات' },
  ];

  const features = [
    'حلول لوجستية ومؤسسية مصممة خصيصاً لأهدافك',
    'فريق استشاري متخصص مع خبرة إقليمية عميقة',
    'تقنيات متقدمة ومنهجيات عالمية مُثبتة',
    'التزام بالجودة والمواعيد وتحقيق النتائج',
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#f8f9fb' }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%)',
            y: useTransform(scrollYProgress, [0, 1], [0, -50]),
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(30, 58, 95, 0.08) 0%, transparent 70%)',
            y: useTransform(scrollYProgress, [0, 1], [0, -80]),
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-12 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            style={{ opacity, y }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border cursor-pointer hover:shadow-md transition-shadow"
              style={{
                backgroundColor: 'rgba(212, 165, 116, 0.08)',
                borderColor: 'rgba(212, 165, 116, 0.3)',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Award size={18} style={{ color: '#d4a574' }} />
              </motion.div>
              <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                رواد الحلول اللوجستية والاستشارات المؤسسية المتكاملة
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl mb-6 leading-tight" style={{ color: '#1e3a5f' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="block font-bold">شريكك الاستراتيجي</span>
                <span className="block mt-2">في التميّز اللوجستي والمؤسسي</span>
              </motion.div>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl leading-relaxed mb-8"
              style={{ color: '#4a5568' }}
            >
              نُمكّن المؤسسات الرائدة من تحقيق الكفاءة التشغيلية القصوى من خلال حلول لوجستية متكاملة
              واستشارات مؤسسية استراتيجية بمنهجيات عالمية مُثبتة
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-3 mb-10"
            >
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: '#5a9367' }}
                  />
                  <span style={{ color: '#2d3748' }}>{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium transition-all hover:shadow-xl"
                style={{ backgroundColor: '#1e3a5f' }}
              >
                <span>احجز استشارتك الآن</span>
                <ArrowLeft size={20} />
              </motion.a>

              <motion.a
                href="#solutions"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium border-2 transition-all hover:shadow-lg"
                style={{ borderColor: '#d4a574', color: '#1e3a5f', backgroundColor: 'white' }}
              >
                <Play size={18} className="fill-current" />
                <span>شاهد فيديو تعريفي</span>
              </motion.a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"
                    style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})` }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <strong>4.9/5</strong> من +200 عميل راضٍ
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Overview Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.6 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all"
                  style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
                >
                  <div className="text-4xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium mb-1" style={{ color: '#2d3748' }}>
                    {stat.label}
                  </div>
                  <div className="text-xs" style={{ color: '#6b7c93' }}>
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Services Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border"
              style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: '#1e3a5f' }}>
                خدماتنا المتكاملة
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <div key={idx} className="group cursor-pointer">
                      <div
                        className="flex flex-col items-center text-center p-4 rounded-xl transition-all hover:shadow-md"
                        style={{ backgroundColor: '#f8f9fb' }}
                      >
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110"
                          style={{ backgroundColor: 'rgba(212, 165, 116, 0.12)' }}
                        >
                          <Icon size={28} style={{ color: '#d4a574' }} />
                        </div>
                        <div className="font-semibold text-sm mb-1" style={{ color: '#1e3a5f' }}>
                          {service.title}
                        </div>
                        <div className="text-xs" style={{ color: '#6b7c93' }}>
                          {service.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border flex items-center gap-4"
              style={{ borderColor: 'rgba(212, 165, 116, 0.2)' }}
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(90, 147, 103, 0.12)' }}
              >
                <Award size={32} style={{ color: '#5a9367' }} />
              </div>
              <div>
                <div className="font-bold mb-1" style={{ color: '#1e3a5f' }}>
                  معتمدون دولياً
                </div>
                <div className="text-sm" style={{ color: '#6b7c93' }}>
                  ISO 9001:2015 | FIATA | LEED Certified
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Key Differentiators Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-20 bg-white rounded-2xl p-8 shadow-lg border"
          style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#d4a574' }}>
                40%
              </div>
              <div className="font-semibold mb-1" style={{ color: '#1e3a5f' }}>
                خفض التكاليف
              </div>
              <div className="text-sm" style={{ color: '#6b7c93' }}>
                متوسط الوفورات المحققة
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#d4a574' }}>
                24/7
              </div>
              <div className="font-semibold mb-1" style={{ color: '#1e3a5f' }}>
                الدعم والمتابعة
              </div>
              <div className="text-sm" style={{ color: '#6b7c93' }}>
                فريق متاح على مدار الساعة
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#d4a574' }}>
                100%
              </div>
              <div className="font-semibold mb-1" style={{ color: '#1e3a5f' }}>
                الالتزام بالمواعيد
              </div>
              <div className="text-sm" style={{ color: '#6b7c93' }}>
                سجل حافل بالتسليم في الوقت
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2" style={{ color: '#6b7c93' }}>
          <span className="text-xs">المزيد من التفاصيل</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
