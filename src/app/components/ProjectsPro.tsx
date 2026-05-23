import {
  Building,
  Factory,
  Store,
  Zap,
  MapPin,
  Calendar,
  Users,
  Target,
  CheckCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const projects = [
  {
    title: 'مستودع مركزي للتوزيع الإقليمي',
    client: 'شركة لوجستية كبرى',
    clientType: 'خاص',
    description:
      'تصميم وتنفيذ مستودع ذكي متطور بمساحة 50,000 متر مربع مع أنظمة إدارة متكاملة WMS وRFID',
    fullDescription:
      'مشروع استراتيجي شامل لبناء مستودع مركزي حديث يخدم 5 مناطق إدارية. يشمل تصميم البنية التحتية، تركيب أنظمة الأمان والسلامة، أتمتة العمليات بالكامل، وتدريب أكثر من 200 موظف على الأنظمة الجديدة.',
    type: 'لوجستي',
    sector: 'اللوجستيات والتوزيع',
    icon: Building,
    location: 'الرياض، المملكة العربية السعودية',
    duration: '12 شهر',
    year: '2024-2025',
    stats: {
      area: '50,000 م²',
      capacity: '+10,000 وحدة/يوم',
      automation: '95% أتمتة',
      efficiency: '+48% كفاءة',
    },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    achievements: [
      'تحسين سرعة التسليم بنسبة 40%',
      'خفض التكاليف التشغيلية بنسبة 35%',
      'دقة المخزون وصلت إلى 99.7%',
      'تقليل استهلاك الطاقة بنسبة 30%',
    ],
    technologies: ['WMS Enterprise', 'RFID Tracking', 'IoT Sensors', 'AI Analytics'],
    teamSize: '45 متخصص',
    budget: '65 مليون ريال',
  },
  {
    title: 'محطة طاقة شمسية صناعية',
    client: 'مجمع صناعي متكامل',
    clientType: 'حكومي',
    description: 'تصميم وتنفيذ محطة طاقة شمسية بقدرة 5 ميجاوات مع أنظمة تخزين وإدارة ذكية للطاقة',
    fullDescription:
      'مشروع رائد في الطاقة المتجددة يوفر الكهرباء لمجمع صناعي كامل. يتضمن دراسة جدوى شاملة، تصميم هندسي متقدم، تركيب 12,000 لوح شمسي، أنظمة تخزين بطاريات بسعة 2MWh، ونظام مراقبة وإدارة ذكي يعمل 24/7.',
    type: 'طاقة',
    sector: 'الطاقة المتجددة',
    icon: Zap,
    location: 'الجبيل الصناعية',
    duration: '8 أشهر',
    year: '2024',
    stats: {
      capacity: '5 MW',
      saving: '65% توفير طاقة',
      panels: '12,000 لوح',
      co2: '-1,200 طن CO₂',
    },
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    achievements: [
      'توفير 65% من فاتورة الكهرباء السنوية',
      'خفض انبعاثات الكربون بمقدار 1,200 طن سنوياً',
      'عائد استثماري ROI في 4.5 سنوات',
      'ضمان أداء 25 سنة مع صيانة شاملة',
    ],
    technologies: [
      'Bifacial Solar Panels',
      'Battery Storage 2MWh',
      'Smart Grid Integration',
      'AI Monitoring',
    ],
    teamSize: '32 مهندس',
    budget: '48 مليون ريال',
  },
  {
    title: 'مركز توزيع تجزئة ذكي',
    client: 'سلسلة تجزئة وطنية رائدة',
    clientType: 'خاص',
    description: 'إنشاء مركز توزيع متطور بأنظمة آلية متقدمة للفرز والتخزين والتوزيع',
    fullDescription:
      'مشروع تحول رقمي كامل لعمليات التوزيع. يتضمن بناء مركز توزيع بمواصفات عالمية، تركيب أنظمة نقل آلية، روبوتات فرز ذكية، نظام إدارة مخزون فوري، وتكامل كامل مع منصات التجارة الإلكترونية.',
    type: 'لوجستي',
    sector: 'التجزئة والتجارة',
    icon: Store,
    location: 'جدة',
    duration: '10 أشهر',
    year: '2023-2024',
    stats: {
      throughput: '8,000 طلب/يوم',
      automation: '85% آلي',
      efficiency: '+52% كفاءة',
      accuracy: '99.8% دقة',
    },
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
    achievements: [
      'معالجة 8,000 طلب يومياً بكفاءة عالية',
      'تقليل وقت التجهيز من 4 ساعات إلى 45 دقيقة',
      'دقة تنفيذ الطلبات 99.8%',
      'تحسين تجربة العميل ورضاه بنسبة 92%',
    ],
    technologies: ['AutoStore System', 'AGV Robots', 'Voice Picking', 'Real-time WMS'],
    teamSize: '38 متخصص',
    budget: '72 مليون ريال',
  },
  {
    title: 'مجمع صناعي متكامل',
    client: 'مؤسسة التصنيع الوطنية',
    clientType: 'حكومي',
    description: 'تنفيذ بنية تحتية كاملة لمجمع صناعي شامل بمعايير عالمية',
    fullDescription:
      'مشروع ضخم لبناء مجمع صناعي متكامل يضم 15 منشأة متخصصة. يشمل البنية التحتية الكاملة (طرق، كهرباء، مياه، صرف)، مستودعات تخزين متخصصة، مراكز صيانة، مكاتب إدارية، ومرافق للموظفين. المشروع يدعم رؤية 2030 ويوفر أكثر من 500 وظيفة.',
    type: 'إنشاءات',
    sector: 'البناء والتشييد',
    icon: Factory,
    location: 'ينبع الصناعية',
    duration: '18 شهر',
    year: '2022-2024',
    stats: {
      area: '120,000 م²',
      facilities: '15 منشأة',
      jobs: '+650 وظيفة',
      investment: '450M SAR',
    },
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    achievements: [
      'إنجاز المشروع قبل الموعد بـ 3 أشهر',
      'حصول على شهادة LEED الفضية للاستدامة',
      'توفير 650+ وظيفة مباشرة وغير مباشرة',
      'جذب استثمارات بقيمة 450 مليون ريال',
    ],
    technologies: [
      'BIM Modeling',
      'Smart Building Systems',
      'Renewable Energy Integration',
      'Automated Security',
    ],
    teamSize: '120 مهندس وفني',
    budget: '280 مليون ريال',
  },
  {
    title: 'نظام ERP متكامل متعدد الفروع',
    client: 'مجموعة الأعمال الخليجية',
    clientType: 'خاص',
    description: 'تطبيق نظام تخطيط موارد مؤسسي SAP لتوحيد عمليات 12 فرع إقليمي',
    fullDescription:
      'مشروع تحول رقمي استراتيجي لتوحيد عمليات مجموعة إقليمية كبرى. يشمل تطبيق SAP S/4HANA عبر 12 فرع في 4 دول، إعادة هندسة العمليات، ترحيل البيانات التاريخية، تدريب 800+ مستخدم، والدعم الفني لمدة 3 سنوات.',
    type: 'استشاري',
    sector: 'الخدمات المؤسسية',
    icon: Building,
    location: 'الرياض (المقر) + 11 فرع',
    duration: '14 شهر',
    year: '2023-2024',
    stats: {
      branches: '12 فرع',
      users: '800+ مستخدم',
      modules: '8 وحدات',
      integration: '100%',
    },
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    achievements: [
      'توحيد 100% من عمليات المجموعة',
      'تحسين الإنتاجية بنسبة 42%',
      'تقليل دورة إغلاق الشهر من 15 يوم إلى 3 أيام',
      'رؤية فورية ومباشرة لجميع العمليات 24/7',
    ],
    technologies: ['SAP S/4HANA', 'SAP Fiori', 'Business Intelligence', 'Cloud Integration'],
    teamSize: '28 استشاري',
    budget: '38 مليون ريال',
  },
  {
    title: 'نظام نقل وشحن ذكي',
    client: 'شركة الشحن السريع',
    clientType: 'خاص',
    description: 'بناء منظومة متكاملة لإدارة الأسطول والتتبع الفوري والتوزيع الذكي',
    fullDescription:
      'حل لوجستي متقدم يجمع بين التتبع الفوري، تحسين المسارات بالذكاء الاصطناعي، إدارة الأسطول، وتطبيقات موبايل للسائقين والعملاء. النظام يخدم 200+ شاحنة ويغطي جميع مناطق المملكة مع تكامل كامل مع منصات التجارة الإلكترونية.',
    type: 'لوجستي',
    sector: 'النقل والشحن',
    icon: Building,
    location: 'جميع مناطق المملكة',
    duration: '9 أشهر',
    year: '2024',
    stats: {
      fleet: '200+ شاحنة',
      routes: '150 مسار',
      efficiency: '+45% تحسين',
      tracking: '99.9% دقة',
    },
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800',
    achievements: [
      'خفض تكاليف الوقود بنسبة 28%',
      'تحسين وقت التسليم بنسبة 45%',
      'رضا العملاء ارتفع إلى 94%',
      'تقليل الانبعاثات الكربونية بنسبة 32%',
    ],
    technologies: ['GPS Tracking', 'AI Route Optimization', 'IoT Fleet Management', 'Mobile Apps'],
    teamSize: '25 متخصص',
    budget: '22 مليون ريال',
  },
];

export default function ProjectsPro() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%)',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border"
              style={{
                backgroundColor: 'rgba(212, 165, 116, 0.08)',
                borderColor: 'rgba(212, 165, 116, 0.3)',
              }}
            >
              <Target size={18} style={{ color: '#d4a574' }} />
              <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>
                مشاريعنا الرائدة
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-6 font-bold"
              style={{ color: '#1e3a5f' }}
            >
              إنجازات نفخر بها وشركاء يثقون بنا
            </h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#4a5568' }}>
              نماذج من مشاريعنا الاستراتيجية التي حققت نتائج استثنائية وتأثيراً حقيقياً في مختلف
              القطاعات
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => setSelectedProject(project)}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border cursor-pointer"
                style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
              >
                {/* Image Header */}
                <div
                  className="relative h-48 overflow-hidden bg-gradient-to-br"
                  style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-2xl"
                      style={{ backgroundColor: '#d4a574' }}
                    >
                      <Icon size={40} style={{ color: '#1e3a5f' }} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium text-white border border-white/30 backdrop-blur-sm bg-white/20">
                      {project.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
                    >
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="text-lg font-bold leading-tight flex-1"
                      style={{ color: '#1e3a5f' }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div
                    className="text-xs mb-3 px-3 py-1.5 rounded-lg inline-block"
                    style={{ backgroundColor: 'rgba(107, 124, 147, 0.08)', color: '#6b7c93' }}
                  >
                    <MapPin size={12} className="inline mr-1" />
                    {project.location}
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {Object.entries(project.stats)
                      .slice(0, 4)
                      .map(([key, value], idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 text-center border"
                          style={{ borderColor: 'rgba(107, 124, 147, 0.06)' }}
                        >
                          <div className="text-base font-bold mb-1" style={{ color: '#1e3a5f' }}>
                            {value}
                          </div>
                          <div className="text-xs capitalize" style={{ color: '#6b7c93' }}>
                            {key}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center justify-between pt-4 border-t"
                    style={{ borderColor: 'rgba(107, 124, 147, 0.1)' }}
                  >
                    <span className="text-xs font-medium" style={{ color: '#6b7c93' }}>
                      {project.client}
                    </span>
                    <button
                      className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                      style={{ color: '#d4a574' }}
                    >
                      المزيد
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Project Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-10 text-white shadow-2xl"
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg text-white/90">مشروع ناجح</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-lg text-white/90">عاماً من الخبرة</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-lg text-white/90">رضا العملاء</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2.5B+</div>
              <div className="text-lg text-white/90">قيمة المشاريع (ريال)</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header with Image */}
              <div
                className="relative h-64 bg-gradient-to-br"
                style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50"
                  style={{ backgroundImage: `url(${selectedProject.image})` }}
                ></div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 right-6 left-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="px-4 py-1.5 rounded-full text-sm font-medium"
                      style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
                    >
                      {selectedProject.type}
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                      {selectedProject.clientType}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <p className="text-white/90 text-lg">{selectedProject.client}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Project Info Grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} style={{ color: '#d4a574' }} className="mt-1" />
                    <div>
                      <div className="text-xs mb-1" style={{ color: '#6b7c93' }}>
                        الموقع
                      </div>
                      <div className="font-medium" style={{ color: '#1e3a5f' }}>
                        {selectedProject.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={20} style={{ color: '#d4a574' }} className="mt-1" />
                    <div>
                      <div className="text-xs mb-1" style={{ color: '#6b7c93' }}>
                        المدة
                      </div>
                      <div className="font-medium" style={{ color: '#1e3a5f' }}>
                        {selectedProject.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users size={20} style={{ color: '#d4a574' }} className="mt-1" />
                    <div>
                      <div className="text-xs mb-1" style={{ color: '#6b7c93' }}>
                        حجم الفريق
                      </div>
                      <div className="font-medium" style={{ color: '#1e3a5f' }}>
                        {selectedProject.teamSize}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#1e3a5f' }}>
                    نظرة عامة
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProject.fullDescription}</p>
                </div>

                {/* Stats */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#1e3a5f' }}>
                    الأرقام الرئيسية
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value], idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 text-center border shadow-sm"
                        style={{ borderColor: 'rgba(107, 124, 147, 0.08)' }}
                      >
                        <div className="text-2xl font-bold mb-1" style={{ color: '#1e3a5f' }}>
                          {value}
                        </div>
                        <div className="text-xs capitalize" style={{ color: '#6b7c93' }}>
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#1e3a5f' }}>
                    الإنجازات والنتائج
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{ backgroundColor: '#f8f9fb' }}
                      >
                        <CheckCircle
                          size={20}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: '#5a9367' }}
                        />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#1e3a5f' }}>
                    التقنيات والأدوات المستخدمة
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-lg text-sm font-medium border"
                        style={{
                          backgroundColor: 'rgba(212, 165, 116, 0.08)',
                          borderColor: 'rgba(212, 165, 116, 0.2)',
                          color: '#1e3a5f',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 text-center text-white">
                  <h4 className="text-xl font-bold mb-2">هل لديكم مشروع مشابه؟</h4>
                  <p className="text-white/90 mb-4">نحن مستعدون لمساعدتكم في تحقيق أهدافكم</p>
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="inline-block px-6 py-3 rounded-xl font-medium transition-all hover:shadow-xl"
                    style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
                  >
                    تواصل معنا الآن
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
