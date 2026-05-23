import { useState } from 'react';
import { motion } from 'motion/react';
import { Palette, Globe, Image, FileText, Target, CheckCircle2, Download, Eye } from 'lucide-react';
import AdminLayout from './AdminLayout';

export default function BrandingSettings() {
  const [selectedTab, setSelectedTab] = useState<'colors' | 'assets' | 'guidelines' | 'market'>(
    'market',
  );

  const gulfMarketBranding = {
    primaryMarkets: ['السعودية', 'عمان', 'الإمارات', 'الكويت', 'البحرين', 'قطر'],
    culturalElements: [
      'استخدام اللون الذهبي كرمز للثقة والجودة',
      'التركيز على القيم العائلية والتقاليد',
      'التواصل بلغة عربية فصحى راقية',
      'الاهتمام بالشهر الفضيل والمناسبات الدينية',
      'التركيز على الابتكار والحداثة مع احترام التراث',
    ],
    designGuidelines: [
      {
        title: 'الألوان الرئيسية',
        items: [
          'الذهبي (#C5A572) - يرمز للفخامة والثقة',
          'الأزرق الملكي (#2C5F8D) - يرمز للاحترافية والاستقرار',
          'الأزرق الداكن (#0A1F44) - يرمز للقوة والجدية',
        ],
      },
      {
        title: 'التصميم',
        items: [
          'استخدام خطوط عربية واضحة وأنيقة',
          'تصاميم نظيفة مع مساحات بيضاء كافية',
          'صور عالية الجودة تعكس البيئة الخليجية',
          'أيقونات بسيطة وواضحة',
        ],
      },
      {
        title: 'المحتوى',
        items: [
          'استخدام أمثلة ودراسات حالة من السوق الخليجي',
          'التركيز على القيم المشتركة: الثقة، الاحترافية، الابتكار',
          'ذكر المدن الخليجية الرئيسية في المحتوى',
          'استخدام عملة الريال السعودي والريال العماني',
        ],
      },
    ],
  };

  const colorPalette = [
    {
      name: 'الذهبي الخليجي',
      hex: '#C5A572',
      usage: 'الأزرار الرئيسية، الإبرازات، العناوين المهمة',
    },
    {
      name: 'الأزرق الملكي',
      hex: '#2C5F8D',
      usage: 'الروابط، العناصر التفاعلية الثانوية',
    },
    {
      name: 'الأزرق الداكن',
      hex: '#0A1F44',
      usage: 'النصوص الرئيسية، القوائم، الخلفيات الداكنة',
    },
    {
      name: 'البرونزي',
      hex: '#8B7355',
      usage: 'العناصر الثانوية، الحدود، الظلال',
    },
    {
      name: 'الأخضر الزمردي',
      hex: '#10B981',
      usage: 'النجاح، التأكيدات، الإحصائيات الإيجابية',
    },
  ];

  const brandAssets = [
    {
      type: 'شعار رئيسي',
      formats: ['SVG', 'PNG', 'PDF'],
      variations: ['ملون', 'أبيض', 'ذهبي', 'أسود'],
    },
    {
      type: 'شعار فرعي',
      formats: ['SVG', 'PNG'],
      variations: ['أفقي', 'عمودي'],
    },
    {
      type: 'قوالب العروض التقديمية',
      formats: ['PPTX', 'PDF'],
      variations: ['عربي', 'إنجليزي'],
    },
    {
      type: 'قوالب وسائل التواصل',
      formats: ['PSD', 'PNG'],
      variations: ['Instagram', 'LinkedIn', 'Twitter'],
    },
  ];

  const marketingMessages = [
    {
      market: 'السعودية',
      focus: 'رؤية 2030، التحول الرقمي، الابتكار اللوجستي',
      tone: 'طموح، تقدمي، وطني',
    },
    {
      market: 'عمان',
      focus: 'التنويع الاقتصادي، النمو المستدام، الجودة',
      tone: 'محترم، متوازن، موثوق',
    },
    {
      market: 'الإمارات',
      focus: 'الابتكار، التكنولوجيا، الكفاءة العالمية',
      tone: 'عصري، ديناميكي، عالمي',
    },
  ];

  return (
    <AdminLayout currentPage="settings">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl mb-2" style={{ color: '#0A1F44' }}>
            الهوية والعلامة التجارية
          </h1>
          <p className="text-gray-600">إدارة الهوية البصرية والتسويقية للسوق الخليجي</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b" style={{ borderColor: '#E5E7EB' }}>
          {[
            { id: 'market', label: 'استهداف السوق', icon: Target },
            { id: 'colors', label: 'الألوان', icon: Palette },
            { id: 'assets', label: 'الأصول', icon: Image },
            { id: 'guidelines', label: 'الإرشادات', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                  selectedTab === tab.id ? 'border-b-2' : 'border-transparent text-gray-600'
                }`}
                style={
                  selectedTab === tab.id ? { borderBottomColor: '#C5A572', color: '#C5A572' } : {}
                }
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Market Targeting Tab */}
        {selectedTab === 'market' && (
          <div className="space-y-6">
            {/* Primary Markets */}
            <div
              className="bg-white rounded-xl p-6 shadow-sm border"
              style={{ borderColor: '#E5E7EB' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#C5A57215' }}
                >
                  <Globe size={24} style={{ color: '#C5A572' }} />
                </div>
                <div>
                  <h3 className="text-xl" style={{ color: '#0A1F44' }}>
                    الأسواق المستهدفة
                  </h3>
                  <p className="text-sm text-gray-600">التركيز على دول مجلس التعاون الخليجي</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gulfMarketBranding.primaryMarkets.map((market, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border-2 text-center"
                    style={{ borderColor: '#C5A572', backgroundColor: '#C5A57205' }}
                  >
                    <div className="text-lg mb-1" style={{ color: '#C5A572' }}>
                      {market}
                    </div>
                    <div className="text-xs text-gray-600">سوق رئيسي</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cultural Elements */}
            <div
              className="bg-white rounded-xl p-6 shadow-sm border"
              style={{ borderColor: '#E5E7EB' }}
            >
              <h3 className="text-xl mb-4" style={{ color: '#0A1F44' }}>
                العناصر الثقافية المهمة
              </h3>
              <div className="space-y-3">
                {gulfMarketBranding.culturalElements.map((element, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <CheckCircle2
                      size={20}
                      style={{ color: '#C5A572' }}
                      className="flex-shrink-0 mt-0.5"
                    />
                    <div className="text-sm text-gray-700">{element}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Guidelines */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gulfMarketBranding.designGuidelines.map((guideline, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <h4 className="text-lg mb-4" style={{ color: '#C5A572' }}>
                    {guideline.title}
                  </h4>
                  <ul className="space-y-2">
                    {guideline.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 pr-4 relative">
                        <span
                          className="absolute right-0 top-2 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: '#C5A572' }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Market-Specific Messaging */}
            <div
              className="bg-white rounded-xl p-6 shadow-sm border"
              style={{ borderColor: '#E5E7EB' }}
            >
              <h3 className="text-xl mb-6" style={{ color: '#0A1F44' }}>
                الرسائل التسويقية حسب السوق
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {marketingMessages.map((msg, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl"
                    style={{ backgroundColor: '#C5A57208', border: '1px solid #C5A57230' }}
                  >
                    <div className="text-lg mb-3" style={{ color: '#C5A572' }}>
                      {msg.market}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">التركيز</div>
                        <div className="text-sm text-gray-700">{msg.focus}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">أسلوب التواصل</div>
                        <div className="text-sm text-gray-700">{msg.tone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {selectedTab === 'colors' && (
          <div
            className="bg-white rounded-xl p-6 shadow-sm border"
            style={{ borderColor: '#E5E7EB' }}
          >
            <h3 className="text-xl mb-6" style={{ color: '#0A1F44' }}>
              لوحة الألوان - السوق الخليجي
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colorPalette.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl overflow-hidden border"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <div className="h-32" style={{ backgroundColor: color.hex }} />
                  <div className="p-4">
                    <div className="text-lg mb-1" style={{ color: '#0A1F44' }}>
                      {color.name}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{color.hex}</div>
                    <div className="text-xs text-gray-500">{color.usage}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Assets Tab */}
        {selectedTab === 'assets' && (
          <div
            className="bg-white rounded-xl p-6 shadow-sm border"
            style={{ borderColor: '#E5E7EB' }}
          >
            <h3 className="text-xl mb-6" style={{ color: '#0A1F44' }}>
              أصول العلامة التجارية
            </h3>
            <div className="space-y-4">
              {brandAssets.map((asset, index) => (
                <div
                  key={index}
                  className="p-5 rounded-lg border hover:shadow-sm transition-all"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-lg mb-2" style={{ color: '#0A1F44' }}>
                        {asset.type}
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <div>
                          <span className="text-gray-500">التنسيقات: </span>
                          {asset.formats.join(', ')}
                        </div>
                        <div>
                          <span className="text-gray-500">الأنماط: </span>
                          {asset.variations.join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                        title="معاينة"
                      >
                        <Eye size={18} className="text-gray-600" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                        title="تحميل"
                      >
                        <Download size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
