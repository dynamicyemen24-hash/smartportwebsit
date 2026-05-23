import { motion } from 'motion/react';

const partners = [
  { name: 'المنافذ الذكية', abbr: 'SP', color: '#d4a574' },
  { name: 'ديناميك', abbr: 'DS', color: '#1e3a5f' },
  { name: 'GsERP', abbr: 'GS', color: '#6b7c93' },
];

export default function PartnershipsSection() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl mb-2" style={{ color: '#1e3a5f' }}>
              شراكة استراتيجية متكاملة
            </h3>
            <p className="text-gray-600">قوة التعاون بين الخبرة اللوجستية والتميز التقني</p>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center group"
            >
              <div
                className="w-24 h-24 rounded-2xl mx-auto mb-3 flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                style={{
                  backgroundColor:
                    partner.color === '#d4a574' ? partner.color : `${partner.color}15`,
                  borderColor: partner.color,
                }}
              >
                <span
                  className="text-3xl"
                  style={{ color: partner.color === '#d4a574' ? '#1e3a5f' : partner.color }}
                >
                  {partner.abbr}
                </span>
              </div>
              <div className="text-sm" style={{ color: '#1e3a5f' }}>
                {partner.name}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            شراكة استراتيجية تجمع بين خبرة{' '}
            <span
              style={{ color: '#d4a574', backgroundColor: '#1e3a5f' }}
              className="px-2 py-0.5 rounded"
            >
              المنافذ الذكية
            </span>{' '}
            في الخدمات اللوجستية وتميز{' '}
            <span
              style={{ color: '#1e3a5f', backgroundColor: '#d4a574' }}
              className="px-2 py-0.5 rounded"
            >
              ديناميك
            </span>{' '}
            في تطوير أنظمة GsERP
          </motion.p>
        </div>
      </div>
    </section>
  );
}
