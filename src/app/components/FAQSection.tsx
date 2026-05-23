import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const faqs = [
  {
    category: 'عام',
    questions: [
      {
        q: 'ما هي المنافذ الذكية وما نطاق خدماتكم؟',
        a: 'المنافذ الذكية هي شركة رائدة في تقديم الحلول اللوجستية المتكاملة والاستشارات المؤسسية في المملكة العربية السعودية. نقدم خدمات إدارة المستودعات، النقل والشحن، إدارة سلاسل الإمداد، أنظمة الطاقة الشمسية، المقاولات العامة، بالإضافة إلى الاستشارات في تخطيط موارد المؤسسات والبناء المؤسسي.',
      },
      {
        q: 'في أي المناطق تقدمون خدماتكم؟',
        a: 'نقدم خدماتنا في جميع أنحاء المملكة العربية السعودية، مع مقرنا الرئيسي في الرياض. لدينا شبكة واسعة من الشركاء والفروع تغطي المناطق الرئيسية، ونعمل على مشاريع في مختلف المدن والمناطق الصناعية.',
      },
      {
        q: 'كم عدد سنوات خبرتكم في المجال؟',
        a: 'نمتلك أكثر من 15 عاماً من الخبرة في مجال الحلول اللوجستية والخدمات المؤسسية، ونفذنا أكثر من 300 مشروع ناجح لعملاء من مختلف القطاعات الصناعية والتجارية.',
      },
    ],
  },
  {
    category: 'الخدمات اللوجستية',
    questions: [
      {
        q: 'ما هي أنظمة إدارة المستودعات (WMS) التي تقدمونها؟',
        a: 'نقدم أنظمة إدارة مستودعات ذكية ومتطورة تشمل: تتبع المخزون في الوقت الفعلي، أنظمة RFID، أتمتة العمليات، تحسين استخدام المساحات، تقارير وتحليلات شاملة، والتكامل مع أنظمة ERP. يتم تخصيص كل نظام حسب احتياجات العميل وحجم العمليات.',
      },
      {
        q: 'هل تقدمون خدمات النقل والتوزيع؟',
        a: 'نعم، نقدم حلولاً متكاملة في النقل والتوزيع تشمل: إدارة أسطول النقل، تخطيط المسارات الأمثل، تتبع الشحنات GPS، خدمات الميل الأخير، والتكامل مع منصات الشحن المحلية والعالمية. نوفر أيضاً خدمات التعبئة والتغليف وإدارة المرتجعات.',
      },
      {
        q: 'كيف يمكنكم مساعدتنا في تحسين كفاءة سلسلة الإمداد؟',
        a: 'نتبع منهجية شاملة تبدأ بتحليل عملياتكم الحالية وتحديد نقاط الضعف والفرص. ثم نقوم بتصميم حلول مخصصة تشمل: تحسين التخطيط والتنبؤ، إدارة الموردين، تقليل المخزون الراكد، تسريع دورة التسليم، واستخدام التقنيات الحديثة مثل التحليلات التنبؤية والذكاء الاصطناعي.',
      },
    ],
  },
  {
    category: 'الطاقة المتجددة',
    questions: [
      {
        q: 'ما حجم محطات الطاقة الشمسية التي يمكنكم تنفيذها؟',
        a: 'نفذنا مشاريع طاقة شمسية بمختلف الأحجام من 100 كيلووات للمنشآت الصغيرة إلى أكثر من 5 ميجاوات للمصانع والمنشآت الكبيرة. نقدم دراسة جدوى مفصلة لكل مشروع تشمل حساب العائد على الاستثمار، فترة الاسترداد، والتوفير المتوقع.',
      },
      {
        q: 'ما هي مدة تنفيذ مشروع الطاقة الشمسية؟',
        a: 'تختلف المدة حسب حجم المشروع، ولكن في المتوسط: المشاريع الصغيرة (حتى 500 كيلووات) تستغرق 4-6 أسابيع، المشاريع المتوسطة (0.5-2 ميجاوات) تستغرق 2-3 أشهر، والمشاريع الكبيرة (+2 ميجاوات) تستغرق 3-6 أشهر. نلتزم بالجداول الزمنية المتفق عليها.',
      },
      {
        q: 'هل تقدمون خدمات الصيانة والدعم الفني؟',
        a: 'نعم، نقدم عقود صيانة شاملة تتضمن: الصيانة الدورية، المراقبة عن بعد، الإصلاحات العاجلة، تنظيف الألواح، وتحديثات النظام. كما نوفر دعماً فنياً على مدار الساعة وضماناً يصل إلى 25 عاماً على أداء المحطة.',
      },
    ],
  },
  {
    category: 'الاستشارات المؤسسية',
    questions: [
      {
        q: 'ما هي خدمات الاستشارات المؤسسية التي تقدمونها؟',
        a: 'نقدم استشارات متخصصة في: تخطيط موارد المؤسسات (ERP)، البناء المؤسسي وإعادة الهيكلة، الموارد البشرية والتوصيف الوظيفي، أنظمة تقييم الأداء، الاستشارات التقنية والحسابات. نعمل مع فريق من الخبراء المعتمدين لتطوير استراتيجيات مؤسسية فعالة.',
      },
      {
        q: 'كيف تساعدوننا في اختيار نظام ERP المناسب؟',
        a: 'نبدأ بتحليل شامل لاحتياجات مؤسستكم، عملياتكم الحالية، والأهداف المستقبلية. ثم نقيّم الأنظمة المتاحة في السوق ونقدم توصيات مبنية على معايير واضحة تشمل: التكلفة، سهولة الاستخدام، قابلية التوسع، الدعم الفني، والتكامل مع أنظمتكم الحالية. نرافقكم في كل مراحل التنفيذ والتدريب.',
      },
    ],
  },
  {
    category: 'الأسعار والتعاقد',
    questions: [
      {
        q: 'كيف يتم تسعير خدماتكم؟',
        a: 'نقدم تسعيراً مخصصاً لكل مشروع بناءً على: نطاق العمل، حجم المشروع، المدة الزمنية، والتقنيات المستخدمة. نوفر عروض أسعار تفصيلية وشفافة بعد الاجتماع التمهيدي وفهم احتياجاتكم. نلتزم بعدم وجود تكاليف مخفية ونقدم خيارات دفع مرنة.',
      },
      {
        q: 'كيف تتم عملية الاستشارة الأولية؟',
        a: 'نوفر جلسة استشارية تمهيدية متخصصة لفهم احتياجاتكم المؤسسية بدقة، حيث يقوم فريقنا الاستشاري بتحليل التحديات الحالية، تقييم البنية التحتية، وتقديم رؤية أولية للحلول المقترحة. يمكنكم حجز موعد من خلال نموذج التواصل أو الاتصال المباشر، وسنعمل على تقديم خطة عمل واضحة تتضمن الأهداف والنتائج المتوقعة.',
      },
      {
        q: 'ما هي مدة التعاقد النموذجية؟',
        a: 'تختلف مدة التعاقد حسب نوع الخدمة: المشاريع التنفيذية (مستودعات، طاقة شمسية) لها جدول زمني محدد، عقود الصيانة عادة سنوية قابلة للتجديد، والاستشارات المؤسسية تتراوح من 3-12 شهر حسب النطاق. نوفر مرونة في هيكلة العقود لتناسب احتياجاتكم.',
      },
    ],
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-gray-50">
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
                الأسئلة الشائعة
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              إجابات على أسئلتكم
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نجيب على الأسئلة الأكثر شيوعاً حول خدماتنا ومشاريعنا
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl mb-6 flex items-center gap-3" style={{ color: '#1e3a5f' }}>
                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: '#d4a574' }}></div>
                {category.category}
              </h3>

              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === key;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-6 py-5 flex items-start justify-between gap-4 text-right hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg font-bold flex-1" style={{ color: '#1e3a5f' }}>
                          {faq.q}
                        </span>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                          style={{
                            backgroundColor: isOpen ? '#d4a574' : '#f3f4f6',
                            color: isOpen ? '#1e3a5f' : '#6b7280',
                          }}
                        >
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-2">
                              <div
                                className="w-12 h-1 rounded-full mb-4"
                                style={{ backgroundColor: '#d4a574' }}
                              ></div>
                              <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div
            className="bg-gradient-to-br p-8 rounded-2xl max-w-2xl mx-auto"
            style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)' }}
          >
            <h3 className="text-2xl mb-3 text-white">لديك سؤال آخر؟</h3>
            <p className="text-gray-200 mb-6">فريقنا جاهز للإجابة على جميع استفساراتكم</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all hover:shadow-xl"
              style={{ backgroundColor: '#d4a574', color: '#1e3a5f' }}
            >
              تواصل معنا
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
