import {
  Shield,
  Zap,
  ThumbsUp,
  HeartHandshake,
  Gauge,
  Award,
  BarChart3,
  Clock,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const advantages = [
  {
    icon: Shield,
    title: 'الموثوقية المؤسسية المعتمدة',
    description:
      'أنظمة إدارة متكاملة معتمدة دولياً (ISO 9001:2015، ISO 27001) مع ضمان التتبع الكامل لكل مرحلة من مراحل مشروعك عبر لوحات تحكم شفافة.',
    metric: '100%',
    metricLabel: 'التزام بالجداول الزمنية',
  },
  {
    icon: Zap,
    title: 'التميّز التشغيلي والذكاء العملياتي',
    description:
      'منهجيات LEAN و Six Sigma مع فرق متخصصة لضمان تسليم المشاريع بسرعة 35% أسرع من متوسط السوق مع خفض هدر الموارد.',
    metric: '35%',
    metricLabel: 'أسرع في التنفيذ',
  },
  {
    icon: ThumbsUp,
    title: 'الجودة المعتمدة والتحسين المستمر',
    description:
      'التزام صارم بمعايير الجودة العالمية وأفضل الممارسات في كافة العمليات التشغيلية، مع تدقيق داخلي دوري وشهادات من هيئات دولية.',
    metric: '98.7%',
    metricLabel: 'رضا العملاء',
  },
  {
    icon: HeartHandshake,
    title: 'شراكة استراتيجية استباقية',
    description:
      'فريق استشاري متاح 24/7 مع تقارير أداء أسبوعية وورش عمل لتحسين العمليات، نعمل كممتد لأقسامك اللوجستية لا كمورد خارجي.',
    metric: '24/7',
    metricLabel: 'الدعم الاستشاري',
  },
  {
    icon: Gauge,
    title: 'الابتكار التقني والأتمتة الذكية',
    description:
      'تطبيق حلول الذكاء الاصطناعي وإنترنت الأشياء وRPA لأتمتة المستودعات وإدارة الأسطول، مما يخفض التكاليف التشغيلية حتى 28%.',
    metric: '-28%',
    metricLabel: 'خفض التكاليف',
  },
  {
    icon: Award,
    title: 'خبرة إقليمية عميقة وشراكات حكومية',
    description:
      'أكثر من 15 عاماً من تنفيذ مشاريع معقدة للسوق الخليجي، شركاء مع هيئات النقل والجمارك، وامتلاك تراخيص التشغيل الأوسع في المنطقة.',
    metric: '+150',
    metricLabel: 'مشروع استراتيجي',
  },
];

const testimonials = [
  {
    name: 'عبدالله المطيري',
    position: 'مدير اللوجستيات، مجموعة الحكير',
    quote:
      'أظهرت الشركة فهماً استثنائياً لتعقيدات سلسلة التوريد لدينا. تمكنوا من خفض تكاليف النقل 22% في الربع الأول فقط مع تحسين أوقات التسليم.',
    rating: 5,
  },
  {
    name: 'د. ليلى السليمان',
    position: 'نائب الرئيس للعمليات، تحالف الرعاية الصحية',
    quote:
      'شراكة استراتيجية حقيقية. لولا مرونتهم واحترافيتهم خلال أزمة سلاسل الإمداد العالمية، لكان تأثرنا بشكل كبير. موصى بهم بشدة.',
    rating: 5,
  },
  {
    name: 'خالد الزهراني',
    position: 'CEO، شركة حلول الطاقة المتجددة',
    quote:
      'احترافية على كل المستويات: من التخطيط الاستراتيجي إلى التنفيذ التشغيلي. التقارير الشفافة والتحسين المستمر جعلاهم شريكاً لا يُستغنى عنه.',
    rating: 5,
  },
];

const methodologySteps = [
  {
    step: '01',
    title: 'تدقيق وتشخيص',
    desc: 'تحليل شامل لسلسلة التوريد الحالية وتحديد مكامن الهدر والتكلفة.',
  },
  {
    step: '02',
    title: 'تصميم الحل',
    desc: 'وضع نموذج تشغيلي مخصص يتوافق مع أهدافك الاستراتيجية ومؤشرات الأداء.',
  },
  {
    step: '03',
    title: 'تنفيذ ذكي',
    desc: 'نشر الحلول التقنية والعملياتية مع فرق مختلطة (عملاء + خبرائنا).',
  },
  {
    step: '04',
    title: 'تحسين مستمر',
    desc: 'مراجعة دورية للنتائج وتطبيق منهجيات Kaizen لرفع الكفاءة.',
  },
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white"
    >
      {/* Parallax background element */}
      <motion.div className="absolute inset-0 -z-10 opacity-30" style={{ y: backgroundY }}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-lime-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-50 rounded-full blur-3xl opacity-20" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-lime-50 border mb-6 shadow-sm"
            style={{ borderColor: '#d4a57480' }}
          >
            <span className="text-sm font-medium tracking-wide" style={{ color: '#1e3a5f' }}>
              الميزة التنافسية المستدامة
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight"
            style={{ color: '#1e3a5f' }}
          >
            شريكك الاستراتيجي في <br className="hidden md:block" />
            <span className="relative inline-block">
              التحول اللوجستي الذكي
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 4 Q 50 8, 100 4 T 200 4"
                  stroke="#d4a574"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            نُقدّم حلولاً متكاملة تُحقق قيمة مضافة مُقاسة من خلال تحسين الكفاءة التشغيلية وتقليل
            التكاليف بنسبة تصل إلى 28% وتعزيز رضا العملاء مع عائد استثماري مضمون.
          </p>
        </motion.div>

        {/* Stats Row - Added for deep credibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {[
            { value: '15+', label: 'سنوات من التميّز', icon: Clock },
            { value: '98.7%', label: 'عملاء متجددون', icon: Users },
            { value: '500+', label: 'مشروع ناجح', icon: CheckCircle2 },
            { value: '35%', label: 'تحسن في الكفاءة', icon: TrendingUp },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <stat.icon size={32} className="mx-auto mb-3" style={{ color: '#d4a574' }} />
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#1e3a5f' }}>
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Advantages Grid - Enhanced cards with metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl p-7 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100/80 hover:border-lime-200 relative overflow-hidden"
              >
                {/* Decorative gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-lime-50/0 via-transparent to-amber-50/0 group-hover:opacity-100 transition-opacity duration-500 opacity-0" />

                <div className="flex items-start gap-5 relative z-1">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    <Icon size={28} style={{ color: '#1e3a5f' }} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold mb-2 tracking-tight"
                      style={{ color: '#1e3a5f' }}
                    >
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {advantage.description}
                    </p>
                    <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-gray-100">
                      <span className="text-2xl font-black" style={{ color: '#d4a574' }}>
                        {advantage.metric}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {advantage.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Methodology Section (Consulting deep) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-28 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              منهجية عمل استباقية مبنية على البيانات
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              لا نقدم حلولاً جاهزة، بل نصمم مسار تحول فريداً يتناسب مع نضجك التشغيلي وأهدافك
              الاستراتيجية.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((step, idx) => (
              <div key={idx} className="text-center md:text-right">
                <div className="text-5xl font-black text-lime-400/30 mb-2">{step.step}</div>
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-gray-300 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-28"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3" style={{ color: '#1e3a5f' }}>
              ثقة قادة القطاع
            </h3>
            <p className="text-gray-600 text-lg">ما يقوله شركاؤنا عن تجربة التحول معنا</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold" style={{ color: '#1e3a5f' }}>
                    {t.name}
                  </p>
                  <p className="text-sm text-gray-500">{t.position}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications & CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1e3a5f' }}>
            الاعتمادات الدولية وشهادات التميز
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            نلتزم بأعلى معايير الجودة والأمان والاستدامة، وهو ما تثبتها شهاداتنا المعترف بها
            عالمياً.
          </p>
          <div className="flex flex-wrap justify-center gap-10 items-center mb-12">
            {[
              { name: 'ISO 9001:2015', detail: 'إدارة الجودة', icon: '🏅' },
              { name: 'ISO 27001', detail: 'أمن المعلومات', icon: '🔒' },
              { name: 'FIATA', detail: 'الاتحاد الدولي', icon: '🌍' },
              { name: 'LEED Certified', detail: 'الطاقة المستدامة', icon: '⚡' },
              { name: 'TAPA', detail: 'أمن سلسلة التوريد', icon: '🛡️' },
            ].map((cert, idx) => (
              <div key={idx} className="text-center group cursor-default">
                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <div className="text-base font-bold" style={{ color: '#1e3a5f' }}>
                  {cert.name}
                </div>
                <div className="text-xs text-gray-500">{cert.detail}</div>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-dashed">
            <button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
              style={{ backgroundColor: '#1e3a5f', color: 'white' }}
            >
              <span>تواصل مع مستشارنا الاستراتيجي</span>
              <ArrowLeft size={20} />
            </button>
            <p className="text-xs text-gray-400 mt-4">
              احصل على تقييم مجاني لنضج سلسلة التوريد لمؤسستك
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
