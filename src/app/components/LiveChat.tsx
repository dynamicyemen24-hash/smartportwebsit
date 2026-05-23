import { Clock, Mail, MessageCircle, Phone, Send, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

// بيانات ثابتة خارج المكون
const RESPONSES = [
  'شكراً لتواصلك معنا. سيقوم أحد فريقنا بالرد عليك قريباً.',
  'نقدر اهتمامك بخدماتنا. هل تود حجز استشارة مجانية؟',
  'يمكنك أيضاً التواصل معنا عبر الهاتف: +966 66 777 0832',
  'فريقنا متاح من الأحد إلى الخميس، 8 صباحاً - 5 مساءً.',
];

const QUICK_ACTIONS = ['احجز استشارة', 'استفسار عن خدمة', 'تواصل هاتفي'];

// دالة مساعدة لتوليد معرف فريد (تعمل في جميع البيئات)
const generateId = (): string => {
  // محاولة استخدام crypto.randomUUID إذا كانت متوفرة وفي بيئة آمنة
  if (typeof crypto !== 'undefined' && crypto.randomUUID && globalThis.crypto?.randomUUID) {
    try {
      return crypto.randomUUID();
    } catch {
      // في حالة حدوث خطأ (مثل بيئة HTTP غير آمنة)، ننتقل إلى fallback
    }
  }
  // Fallback آمن لجميع البيئات
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${Math.random().toString(36).substring(2, 6)}`;
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      text: 'مرحباً بك في المنافذ الذكية! كيف يمكننا مساعدتك اليوم؟',
      sender: 'support',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // استخدام ReturnType<typeof setTimeout> بدلاً من NodeJS.Timeout
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // تنظيف التايمر وعلامة التحميل عند إلغاء تحميل المكون
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // دالة التمرير السلس إلى أسفل
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // التركيز على حقل الإدخال عند فتح النافذة
      inputRef.current?.focus();
    }
  }, [messages, isOpen, scrollToBottom]);

  // إغلاق النافذة عند الضغط على Escape (استخدام globalThis بدلاً من window)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // دالة إرسال الرسائل مع تحسين الأداء ومنع السباق
  const handleSend = useCallback(
    (textToSend?: string) => {
      const finalInput = textToSend || inputValue;
      if (!finalInput.trim() || isTyping) return;

      // إلغاء أي تايمر سابق
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // إضافة رسالة المستخدم
      const userMessage: Message = {
        id: generateId(),
        text: finalInput.trim(),
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      if (!textToSend) setInputValue('');
      setIsTyping(true);

      // محاكاة رد الدعم بعد تأخير
      timeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;

        // ضمان أن randomResponse هي string دائماً (مع fallback آمن)
        const randomIndex = Math.floor(Math.random() * RESPONSES.length);
        const randomResponse =
          RESPONSES[randomIndex] ?? RESPONSES[0] ?? 'شكراً لتواصلك. سنرد عليك قريباً.';

        const supportMessage: Message = {
          id: generateId(),
          text: randomResponse,
          sender: 'support',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, supportMessage]);
        setIsTyping(false);
        timeoutRef.current = null;
      }, 1100);
    },
    [inputValue, isTyping],
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isTyping) {
      e.preventDefault();
      handleSend();
    }
  };

  // تهيئة مسبقة لعرض الوقت المحلي
  const timeFormatter = useMemo(
    () => new Intl.DateTimeFormat('ar-SA', { hour: '2-digit', minute: '2-digit' }),
    [],
  );

  return (
    <>
      {/* زر فتح/إغلاق الدردشة */}
      <motion.button
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 left-6 z-[90] w-14 h-14 rounded-full shadow-xl flex items-center justify-center border border-white/10 select-none cursor-pointer"
        style={{ backgroundColor: '#1e3a5f' }}
        aria-label={isOpen ? 'إغلاق الدردشة' : 'فتح الدردشة'}
        type="button"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* إشعار جديد */}
        {!isOpen && (
          <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center ring-4 ring-white animate-pulse">
            <span className="text-white text-[10px] font-black">1</span>
          </span>
        )}
      </motion.button>

      {/* نافذة الدردشة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed bottom-24 left-6 z-[90] w-[380px] sm:w-96 bg-white rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[80vh]"
            style={{ borderColor: 'rgba(107, 124, 147, 0.15)', direction: 'rtl' }}
            role="dialog"
            aria-label="نافذة الدردشة"
          >
            {/* الهيدر */}
            <div
              className="p-4 flex items-center justify-between shadow-sm select-none"
              style={{ backgroundColor: '#1e3a5f' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-md">
                    <User size={20} className="text-white" />
                  </div>
                  <span className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#1e3a5f]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm tracking-wide">فريق الدعم</h3>
                  <p className="text-white/70 text-xs">متصل الآن • يرد خلال دقائق</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-white/80 hover:text-white"
                aria-label="إغلاق النافذة"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            {/* منطقة الرسائل */}
            <div
              className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-slate-50/70 scrollbar-thin"
              aria-live="polite"
            >
              {messages.map((message) => {
                const isUser = message.sender === 'user';
                return (
                  <div
                    key={message.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] px-4 py-2.5 rounded-2xl shadow-sm border ${
                        isUser
                          ? 'rounded-bl-none text-white border-transparent'
                          : 'rounded-br-none text-slate-800 bg-white border-slate-100'
                      }`}
                      style={{ backgroundColor: isUser ? '#1e3a5f' : undefined }}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line break-words">
                        {message.text}
                      </p>
                      <p
                        className={`text-[10px] mt-1 font-medium text-left ${isUser ? 'text-white/60' : 'text-slate-400'}`}
                      >
                        {timeFormatter.format(message.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* مؤشر الكتابة */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-br-none flex gap-1.5 items-center shadow-sm">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* الأزرار السريعة */}
            <div className="px-4 py-2 bg-white border-t border-slate-100 select-none">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleSend(action)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200/50"
                    type="button"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* حقل الإدخال والإرسال */}
            <div className="p-3 bg-white border-t border-slate-100">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="اكتب رسالتك هنا..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1e3a5f] focus:bg-white focus:ring-4 focus:ring-[#1e3a5f]/5 text-sm transition-all text-slate-800 disabled:opacity-50"
                  aria-label="رسالة الدردشة"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2.5 rounded-xl transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer hover:shadow-lg active:scale-95"
                  style={{ backgroundColor: '#1e3a5f' }}
                  aria-label="إرسال الرسالة"
                  type="button"
                >
                  <Send size={16} className="text-white transform rotate-180" />
                </button>
              </div>
            </div>

            {/* معلومات الاتصال السفلية */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 select-none">
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                <a
                  href="tel:+966667780832"
                  className="flex items-center gap-1 hover:text-[#1e3a5f] transition-colors"
                >
                  <Phone size={12} />
                  <span>اتصل بنا</span>
                </a>
                <span>•</span>
                <a
                  href="mailto:info@smartportsco.com"
                  className="flex items-center gap-1 hover:text-[#1e3a5f] transition-colors"
                >
                  <Mail size={12} />
                  <span>البريد</span>
                </a>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>8 ص - 5 م</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
