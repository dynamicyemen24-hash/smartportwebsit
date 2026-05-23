import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all hover:scale-110"
        style={{ backgroundColor: '#1e3a5f' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={28} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-28 left-8 bg-white rounded-2xl shadow-2xl p-6 z-50 border border-gray-200 w-80"
          >
            <h3 className="text-xl mb-3 font-bold" style={{ color: '#1e3a5f' }}>
              كيف يمكننا مساعدتك؟
            </h3>
            <p className="mb-4 text-sm" style={{ color: '#6b7c93' }}>
              اختر الخدمة التي تهمك وسنتواصل معك فوراً
            </p>
            <div className="space-y-2">
              <a
                href="#contact"
                className="block w-full text-right px-4 py-3 rounded-xl border border-gray-200 hover:border-[#d4a574] transition-all text-sm font-medium"
                style={{ color: '#1e3a5f' }}
              >
                🎯 احجز استشارتك المتخصصة
              </a>
              <a
                href="#solutions"
                className="block w-full text-right px-4 py-3 rounded-xl border border-gray-200 hover:border-[#d4a574] transition-all text-sm font-medium"
                style={{ color: '#1e3a5f' }}
              >
                📦 حلول لوجستية متكاملة
              </a>
              <a
                href="tel:+966667780832"
                className="block w-full text-right px-4 py-3 rounded-xl border border-gray-200 hover:border-[#d4a574] transition-all text-sm font-medium"
                style={{ color: '#1e3a5f' }}
              >
                📞 اتصل بنا مباشرة
              </a>
              <a
                href="#projects"
                className="block w-full text-right px-4 py-3 rounded-xl border border-gray-200 hover:border-[#d4a574] transition-all text-sm font-medium"
                style={{ color: '#1e3a5f' }}
              >
                🏆 شاهد مشاريعنا
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
