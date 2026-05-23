import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'م. خالد المطيري',
    position: 'مدير العمليات',
    company: 'شركة التصنيع المتقدم',
    rating: 5,
    text: 'تعاملنا مع المنافذ الذكية في مشروع إدارة المستودعات كان تجربة استثنائية. النظام الذي قدموه حسّن كفاءة عملياتنا بنسبة 45% وقلل من الأخطاء بشكل ملحوظ. فريقهم محترف ويفهم احتياجات الصناعة بعمق.',
    project: 'نظام إدارة مستودعات بمساحة 30,000 متر مربع',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
  },
  {
    name: 'أ. فهد العتيبي',
    position: 'الرئيس التنفيذي',
    company: 'مجموعة التوزيع الوطنية',
    rating: 5,
    text: 'الاستشارات المؤسسية التي قدمتها المنافذ الذكية ساعدتنا في إعادة هيكلة عملياتنا بالكامل. التوصيف الوظيفي ونظام تقييم الأداء الذي طوروه أصبح جزءاً أساسياً من نجاحنا. نوصي بهم بشدة.',
    project: 'مشروع البناء المؤسسي وتقييم الأداء',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
  },
  {
    name: 'م. سارة الدوسري',
    position: 'مديرة المشاريع',
    company: 'شركة الطاقة المستدامة',
    rating: 5,
    text: 'نفذت المنافذ الذكية لنا محطة طاقة شمسية بقدرة 1.5 ميجاوات. الجودة والالتزام بالمواعيد كانا على أعلى مستوى. وفرنا 55% من تكاليف الطاقة في السنة الأولى. شركة موثوقة ومتميزة.',
    project: 'محطة طاقة شمسية 1.5MW',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
  },
  {
    name: 'أ. محمد القحطاني',
    position: 'مدير سلسلة الإمداد',
    company: 'شركة اللوجستيات الشاملة',
    rating: 5,
    text: 'الحلول اللوجستية المتكاملة من المنافذ الذكية غيرت طريقة عملنا بالكامل. نظام التتبع وإدارة الأسطول جعل عملياتنا أكثر شفافية وكفاءة. خدمة ما بعد البيع ممتازة والدعم الفني متواصل.',
    project: 'حلول لوجستية متكاملة + نظام تتبع',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
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
                آراء العملاء
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ color: '#1e3a5f' }}>
              ماذا يقول عملاؤنا
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نفخر بثقة عملائنا ونجاحهم هو نجاحنا
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 relative border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-6 right-6 opacity-10">
                <Quote size={80} style={{ color: '#d4a574' }} />
              </div>

              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#d4a574" stroke="#d4a574" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Project */}
                <div className="bg-white p-3 rounded-lg mb-6 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">المشروع:</div>
                  <div className="text-sm" style={{ color: '#1e3a5f' }}>
                    {testimonial.project}
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full bg-gradient-to-br overflow-hidden border-2"
                    style={{
                      borderColor: '#d4a574',
                      background: 'linear-gradient(135deg, #1e3a5f 0%, #1a3a6b 100%)',
                    }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: '#1e3a5f' }}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-4 rounded-full bg-lime-50 border"
            style={{ borderColor: '#d4a574' }}
          >
            <div className="flex items-center gap-2">
              <Star size={20} fill="#d4a574" stroke="#d4a574" />
              <span className="text-sm" style={{ color: '#1e3a5f' }}>
                <strong>4.9/5.0</strong> متوسط التقييم
              </span>
            </div>
            <div className="text-sm text-gray-600">•</div>
            <div className="text-sm" style={{ color: '#1e3a5f' }}>
              <strong>+150</strong> عميل راضٍ
            </div>
            <div className="text-sm text-gray-600">•</div>
            <div className="text-sm" style={{ color: '#1e3a5f' }}>
              <strong>98%</strong> معدل التوصية
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
