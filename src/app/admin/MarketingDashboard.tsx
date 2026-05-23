import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Target, DollarSign, Eye, ArrowUpRight, ArrowDownRight, Send } from 'lucide-react';
import AdminLayout from './AdminLayout';
import {
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function MarketingDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Mock data - replace with real API calls
  const marketingStats = {
    totalVisitors: 45230,
    conversionRate: 3.8,
    emailSubscribers: 12450,
    activecampaigns: 8,
    roi: 285,
    avgEngagement: 4.2,
    socialReach: 125000,
    leadGeneration: 890,
  };

  const trafficData = [
    { name: 'الأحد', visitors: 4200, conversions: 168 },
    { name: 'الاثنين', visitors: 5800, conversions: 232 },
    { name: 'الثلاثاء', visitors: 4900, conversions: 196 },
    { name: 'الأربعاء', visitors: 6300, conversions: 252 },
    { name: 'الخميس', visitors: 5200, conversions: 208 },
    { name: 'الجمعة', visitors: 3100, conversions: 124 },
    { name: 'السبت', visitors: 2800, conversions: 112 },
  ];

  const channelData = [
    { name: 'البحث العضوي', value: 35, color: '#C5A572' },
    { name: 'وسائل التواصل', value: 28, color: '#0A1F44' },
    { name: 'مباشر', value: 20, color: '#2C5F8D' },
    { name: 'البريد', value: 12, color: '#8B7355' },
    { name: 'أخرى', value: 5, color: '#4A5568' },
  ];

  const campaigns = [
    {
      id: 1,
      name: 'حملة الحلول اللوجستية المتقدمة',
      status: 'نشطة',
      budget: '50,000 ريال',
      spent: '32,500 ريال',
      leads: 234,
      roi: 320,
      platform: 'متعددة',
    },
    {
      id: 2,
      name: 'ترويج الطاقة الشمسية للمستودعات',
      status: 'نشطة',
      budget: '35,000 ريال',
      spent: '28,900 ريال',
      leads: 156,
      roi: 280,
      platform: 'لينكد إن',
    },
    {
      id: 3,
      name: 'عروض النقل والشحن الخاصة',
      status: 'مجدولة',
      budget: '25,000 ريال',
      spent: '0 ريال',
      leads: 0,
      roi: 0,
      platform: 'إنستغرام',
    },
  ];

  const regionalPerformance = [
    { region: 'الرياض', leads: 340, conversions: 89, revenue: '450,000' },
    { region: 'جدة', leads: 280, conversions: 72, revenue: '380,000' },
    { region: 'مسقط', leads: 195, conversions: 51, revenue: '260,000' },
    { region: 'الدمام', leads: 165, conversions: 43, revenue: '220,000' },
    { region: 'مكة', leads: 142, conversions: 37, revenue: '195,000' },
  ];

  const StatCard = ({ icon: Icon, label, value, change, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all"
      style={{ borderColor: '#E5E7EB' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {change > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="text-3xl mb-1" style={{ color: '#0A1F44' }}>
        {value}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
  );

  return (
    <AdminLayout currentPage="marketing">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2" style={{ color: '#0A1F44' }}>
              لوحة التسويق والحملات
            </h1>
            <p className="text-gray-600">إدارة وتحليل جميع الحملات التسويقية والأداء الرقمي</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedPeriod === 'week' ? 'text-white' : 'bg-gray-100 text-gray-700'
              }`}
              style={selectedPeriod === 'week' ? { backgroundColor: '#C5A572' } : {}}
            >
              أسبوعي
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedPeriod === 'month' ? 'text-white' : 'bg-gray-100 text-gray-700'
              }`}
              style={selectedPeriod === 'month' ? { backgroundColor: '#C5A572' } : {}}
            >
              شهري
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedPeriod === 'year' ? 'text-white' : 'bg-gray-100 text-gray-700'
              }`}
              style={selectedPeriod === 'year' ? { backgroundColor: '#C5A572' } : {}}
            >
              سنوي
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Eye}
            label="إجمالي الزوار"
            value={marketingStats.totalVisitors.toLocaleString('ar-SA')}
            change={12.5}
            color="#0A1F44"
          />
          <StatCard
            icon={Target}
            label="معدل التحويل"
            value={`${marketingStats.conversionRate}%`}
            change={8.3}
            color="#C5A572"
          />
          <StatCard
            icon={Mail}
            label="المشتركين بالبريد"
            value={marketingStats.emailSubscribers.toLocaleString('ar-SA')}
            change={15.7}
            color="#2C5F8D"
          />
          <StatCard
            icon={DollarSign}
            label="العائد على الاستثمار"
            value={`${marketingStats.roi}%`}
            change={22.1}
            color="#8B7355"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Chart */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border"
            style={{ borderColor: '#E5E7EB' }}
          >
            <h3 className="text-xl mb-4" style={{ color: '#0A1F44' }}>
              حركة الزوار والتحويلات
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#0A1F44"
                  strokeWidth={2}
                  name="الزوار"
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="#C5A572"
                  strokeWidth={2}
                  name="التحويلات"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Channel Distribution */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border"
            style={{ borderColor: '#E5E7EB' }}
          >
            <h3 className="text-xl mb-4" style={{ color: '#0A1F44' }}>
              توزيع مصادر الزيارات
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-xl shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <div className="p-6 border-b" style={{ borderColor: '#E5E7EB' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl" style={{ color: '#0A1F44' }}>
                الحملات التسويقية النشطة
              </h3>
              <button
                className="px-4 py-2 rounded-lg text-white flex items-center gap-2"
                style={{ backgroundColor: '#C5A572' }}
              >
                <Send size={18} />
                حملة جديدة
              </button>
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: '#E5E7EB' }}>
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-6 hover:bg-gray-50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg" style={{ color: '#0A1F44' }}>
                        {campaign.name}
                      </h4>
                      <span
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: campaign.status === 'نشطة' ? '#C5A57220' : '#4A556810',
                          color: campaign.status === 'نشطة' ? '#C5A572' : '#4A5568',
                        }}
                      >
                        {campaign.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">المنصة: {campaign.platform}</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">الميزانية</div>
                        <div className="text-sm" style={{ color: '#0A1F44' }}>
                          {campaign.budget}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">المصروف</div>
                        <div className="text-sm" style={{ color: '#C5A572' }}>
                          {campaign.spent}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">العملاء المحتملين</div>
                        <div className="text-sm" style={{ color: '#2C5F8D' }}>
                          {campaign.leads}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">العائد</div>
                        <div className="text-sm" style={{ color: '#10B981' }}>
                          {campaign.roi}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Performance */}
        <div className="bg-white rounded-xl shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <div className="p-6 border-b" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="text-xl" style={{ color: '#0A1F44' }}>
              الأداء حسب المنطقة - السوق الخليجي
            </h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
                    <th className="text-right pb-3 text-gray-600">المنطقة</th>
                    <th className="text-right pb-3 text-gray-600">العملاء المحتملين</th>
                    <th className="text-right pb-3 text-gray-600">التحويلات</th>
                    <th className="text-right pb-3 text-gray-600">الإيرادات</th>
                    <th className="text-right pb-3 text-gray-600">معدل التحويل</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalPerformance.map((region, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-all"
                      style={{ borderColor: '#E5E7EB' }}
                    >
                      <td className="py-4" style={{ color: '#0A1F44' }}>
                        {region.region}
                      </td>
                      <td className="py-4 text-gray-700">{region.leads}</td>
                      <td className="py-4 text-gray-700">{region.conversions}</td>
                      <td className="py-4" style={{ color: '#C5A572' }}>
                        {region.revenue} ريال
                      </td>
                      <td className="py-4" style={{ color: '#10B981' }}>
                        {((region.conversions / region.leads) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
