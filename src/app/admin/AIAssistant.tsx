import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  Sparkles,
  MessageSquare,
  FileText,
  Image,
  BarChart3,
  Lightbulb,
  Target,
  TrendingUp,
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Wand2,
} from 'lucide-react';
import AdminLayout from './AdminLayout';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'مرحباً! أنا مساعدك الذكي المتخصص في الحلول اللوجستية. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedTool, setSelectedTool] = useState<'chat' | 'content' | 'analytics' | 'insights'>(
    'chat',
  );

  const aiTools = [
    {
      id: 'chat',
      name: 'محادثة ذكية',
      icon: MessageSquare,
      color: '#C5A572',
      description: 'محادثة مباشرة مع المساعد الذكي',
    },
    {
      id: 'content',
      name: 'إنشاء محتوى',
      icon: FileText,
      color: '#0A1F44',
      description: 'إنشاء محتوى تسويقي ومنشورات',
    },
    {
      id: 'analytics',
      name: 'تحليل البيانات',
      icon: BarChart3,
      color: '#2C5F8D',
      description: 'تحليل أداء الحملات والمبيعات',
    },
    {
      id: 'insights',
      name: 'رؤى وتوصيات',
      icon: Lightbulb,
      color: '#8B7355',
      description: 'توصيات ذكية لتحسين الأداء',
    },
  ];

  const quickPrompts = [
    'اقترح حملة تسويقية لخدمة النقل والشحن',
    'اكتب منشور لإنستغرام عن حلولنا اللوجستية',
    'حلل أداء الحملات التسويقية الأخيرة',
    'اقترح استراتيجية لزيادة المتابعين',
    'اكتب بريد إلكتروني للعملاء المحتملين',
    'ما هي أفضل الأوقات للنشر على وسائل التواصل؟',
  ];

  const aiInsights = [
    {
      icon: TrendingUp,
      title: 'فرصة نمو',
      content: 'ملاحظة زيادة 35% في الاهتمام بخدمات الطاقة الشمسية في منطقة مسقط',
      action: 'إنشاء حملة',
      color: '#10B981',
    },
    {
      icon: Target,
      title: 'توصية تسويقية',
      content: 'معدل التفاعل على LinkedIn أعلى بـ 2.5x من المنصات الأخرى للمحتوى B2B',
      action: 'تحسين المحتوى',
      color: '#C5A572',
    },
    {
      icon: Sparkles,
      title: 'محتوى مقترح',
      content: 'موضوع رائج: "التحول الرقمي في اللوجستيات" - معدل بحث عالي',
      action: 'كتابة مقال',
      color: '#0A1F44',
    },
  ];

  const contentTemplates = [
    {
      title: 'منشور إنستغرام',
      description: 'محتوى جذاب مع هاشتاجات',
      icon: Image,
    },
    {
      title: 'بريد إلكتروني',
      description: 'رسالة احترافية للعملاء',
      icon: FileText,
    },
    {
      title: 'مقال مدونة',
      description: 'محتوى SEO محسّن',
      icon: FileText,
    },
    {
      title: 'نص إعلاني',
      description: 'إعلانات Google و Facebook',
      icon: Target,
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user' as const,
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant' as const,
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (prompt: string): string => {
    if (prompt.includes('حملة') || prompt.includes('تسويق')) {
      return `بناءً على تحليل السوق الخليجي، إليك اقتراح لحملة تسويقية متكاملة:

**الهدف**: زيادة الوعي بخدمات النقل والشحن في منطقة الرياض وجدة

**المنصات المقترحة**:
- LinkedIn (للشركات B2B)
- Instagram (للمحتوى البصري)
- WhatsApp Business (للتواصل المباشر)

**استراتيجية المحتوى**:
1. فيديوهات قصيرة عن عملية الشحن
2. دراسات حالة للعملاء الناجحين
3. عروض خاصة لشهر رمضان

**الميزانية المقترحة**: 45,000 ريال
**المدة**: 4 أسابيع
**العائد المتوقع**: 280%`;
    }

    if (prompt.includes('منشور') || prompt.includes('إنستغرام')) {
      return `هذا منشور مقترح لإنستغرام:

🚛✨ المنافذ الذكية - شريكك الموثوق في النقل والشحن

نفخر بتقديم أفضل الحلول اللوجستية في السوق الخليجي 🌟

✅ تتبع الشحنات لحظياً
✅ تسليم سريع وآمن
✅ أسعار تنافسية
✅ دعم 24/7

اطلب عرض سعر مخصص الآن! 📲

#المنافذ_الذكية #لوجستيات #شحن #نقل #السعودية #عمان #SmartPorts`;
    }

    if (prompt.includes('تحليل') || prompt.includes('أداء')) {
      return `**تحليل الأداء التسويقي - آخر 30 يوم**

📊 **المقاييس الرئيسية**:
- الوصول: 145,000 شخص (+22%)
- التفاعل: 8,945 تفاعل (+18%)
- التحويلات: 234 عميل محتمل (+31%)

🎯 **أفضل المنصات أداءً**:
1. LinkedIn - معدل تحويل 5.6%
2. Instagram - معدل تفاعل 4.8%
3. WhatsApp - معدل رد 94%

💡 **التوصيات**:
- زيادة الاستثمار في LinkedIn بنسبة 40%
- نشر محتوى فيديو على Instagram (3x تفاعل أعلى)
- تفعيل الردود الآلية على WhatsApp`;
    }

    return 'شكراً لسؤالك! كيف يمكنني مساعدتك بشكل أفضل؟ يمكنك استخدام الاقتراحات السريعة أدناه.';
  };

  return (
    <AdminLayout currentPage="ai">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#C5A57220' }}
              >
                <Bot size={28} style={{ color: '#C5A572' }} />
              </div>
              <h1 className="text-3xl" style={{ color: '#0A1F44' }}>
                المساعد الذكي
              </h1>
            </div>
            <p className="text-gray-600">مساعد ذكي متخصص في التسويق والمحتوى والتحليلات</p>
          </div>
        </div>

        {/* AI Tools */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = selectedTool === tool.id;
            return (
              <motion.button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id as any)}
                className={`p-4 rounded-xl text-right transition-all ${
                  isActive ? 'shadow-md' : 'bg-white border hover:shadow-sm'
                }`}
                style={
                  isActive
                    ? { backgroundColor: `${tool.color}15`, borderColor: tool.color }
                    : { borderColor: '#E5E7EB' }
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon
                  size={24}
                  className="mb-2"
                  style={{ color: isActive ? tool.color : '#6B7280' }}
                />
                <div className="text-sm mb-1" style={{ color: isActive ? tool.color : '#0A1F44' }}>
                  {tool.name}
                </div>
                <div className="text-xs text-gray-500">{tool.description}</div>
              </motion.button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="p-6 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl" style={{ color: '#0A1F44' }}>
                  المحادثة
                </h3>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                  <RefreshCw size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="p-6 space-y-4"
              style={{ minHeight: '400px', maxHeight: '500px', overflowY: 'auto' }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-4 ${
                      message.role === 'user' ? 'text-white' : 'bg-gray-50'
                    }`}
                    style={message.role === 'user' ? { backgroundColor: '#C5A572' } : {}}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                        <button className="p-1 rounded hover:bg-gray-200 transition-all">
                          <Copy size={14} className="text-gray-600" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-200 transition-all">
                          <ThumbsUp size={14} className="text-gray-600" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-200 transition-all">
                          <ThumbsDown size={14} className="text-gray-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.slice(0, 3).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(prompt)}
                    className="text-xs px-3 py-2 rounded-lg border hover:border-gray-400 transition-all"
                    style={{ borderColor: '#E5E7EB', color: '#6B7280' }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-6 border-t" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اكتب سؤالك أو طلبك هنا..."
                  className="flex-1 px-4 py-3 rounded-lg border"
                  style={{ borderColor: '#E5E7EB' }}
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-3 rounded-lg text-white flex items-center gap-2"
                  style={{ backgroundColor: '#C5A572' }}
                >
                  <Send size={18} />
                  إرسال
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Insights & Templates */}
          <div className="space-y-6">
            {/* AI Insights */}
            <div
              className="bg-white rounded-xl shadow-sm border"
              style={{ borderColor: '#E5E7EB' }}
            >
              <div className="p-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                <div className="flex items-center gap-2">
                  <Sparkles size={18} style={{ color: '#C5A572' }} />
                  <h4 className="text-sm" style={{ color: '#0A1F44' }}>
                    رؤى ذكية
                  </h4>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {aiInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <div
                      key={index}
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: '#F9FAFB' }}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Icon size={16} style={{ color: insight.color }} />
                        <div className="text-xs" style={{ color: insight.color }}>
                          {insight.title}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{insight.content}</p>
                      <button
                        className="text-xs px-3 py-1 rounded text-white"
                        style={{ backgroundColor: insight.color }}
                      >
                        {insight.action}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content Templates */}
            <div
              className="bg-white rounded-xl shadow-sm border"
              style={{ borderColor: '#E5E7EB' }}
            >
              <div className="p-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                <div className="flex items-center gap-2">
                  <Wand2 size={18} style={{ color: '#C5A572' }} />
                  <h4 className="text-sm" style={{ color: '#0A1F44' }}>
                    قوالب المحتوى
                  </h4>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {contentTemplates.map((template, index) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={index}
                      className="w-full p-3 rounded-lg text-right hover:bg-gray-50 transition-all border"
                      style={{ borderColor: '#E5E7EB' }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} style={{ color: '#C5A572' }} />
                        <div className="flex-1">
                          <div className="text-xs mb-0.5" style={{ color: '#0A1F44' }}>
                            {template.title}
                          </div>
                          <div className="text-xs text-gray-500">{template.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
