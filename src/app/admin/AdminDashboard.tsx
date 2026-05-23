import { useEffect, useState } from 'react';
import {
  FileText,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  CheckCircle,
  Share2,
  Bot,
  MessageSquare,
  Target,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { api, Stats, ContactRequest } from '../../utils/api';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentRequests, setRecentRequests] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverHealth, setServerHealth] = useState<'ok' | 'down' | 'unknown'>('unknown');

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [statsData, requestsData, healthData] = await Promise.all([
        api.getStats(),
        api.getContactRequests(),
        api.healthCheck().catch(() => ({ status: 'down' })),
      ]);
      setStats(statsData.stats);
      setRecentRequests(requestsData.requests.slice(0, 5));
      setServerHealth(healthData?.status === 'ok' ? 'ok' : 'down');
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setServerHealth('down');
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = stats
    ? [
        {
          icon: FileText,
          label: 'إجمالي الطلبات',
          value: stats.totalRequests,
          color: '#0A1F44',
          bgColor: '#0A1F4410',
        },
        {
          icon: Clock,
          label: 'طلبات جديدة',
          value: stats.newRequests,
          color: '#BFFF00',
          bgColor: '#BFFF0020',
        },
        {
          icon: TrendingUp,
          label: 'قيد المعالجة',
          value: stats.inProgressRequests,
          color: '#4A5568',
          bgColor: '#4A556810',
        },
        {
          icon: CheckCircle,
          label: 'مكتملة',
          value: stats.completedRequests,
          color: '#10B981',
          bgColor: '#10B98110',
        },
        {
          icon: Calendar,
          label: 'المواعيد',
          value: stats.totalAppointments,
          color: '#6366F1',
          bgColor: '#6366F110',
        },
        {
          icon: Users,
          label: 'إشعارات جديدة',
          value: stats.unreadNotifications,
          color: '#EF4444',
          bgColor: '#EF444410',
        },
      ]
    : [];

  const getStatusBadge = (status: string) => {
    const badges = {
      new: { label: 'جديد', color: '#BFFF00', bg: '#BFFF0020' },
      in_progress: { label: 'قيد المعالجة', color: '#4A5568', bg: '#4A556810' },
      completed: { label: 'مكتمل', color: '#10B981', bg: '#10B98110' },
      cancelled: { label: 'ملغي', color: '#EF4444', bg: '#EF444410' },
    };
    const badge = badges[status as keyof typeof badges] || badges.new;
    return (
      <span
        className="px-3 py-1 rounded-full text-xs"
        style={{ color: badge.color, backgroundColor: badge.bg }}
      >
        {badge.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      low: { label: 'منخفضة', color: '#6B7280' },
      medium: { label: 'متوسطة', color: '#4A5568' },
      high: { label: 'عالية', color: '#F59E0B' },
      urgent: { label: 'عاجلة', color: '#EF4444' },
    };
    const badge = badges[priority as keyof typeof badges] || badges.medium;
    return <span style={{ color: badge.color }}>●</span>;
  };

  if (isLoading) {
    return (
      <AdminLayout currentPage="dashboard">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 animate-pulse"
              style={{ backgroundColor: '#BFFF00' }}
            ></div>
            <div style={{ color: '#0A1F44' }}>جاري التحميل...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2" style={{ color: '#0A1F44' }}>
              لوحة التحكم
            </h1>
            <p className="text-gray-600">مرحباً بك في لوحة التحكم المتقدمة - المنافذ الذكية</p>
          </div>
          <div className="text-left">
            <div className="text-sm text-gray-500">التاريخ</div>
            <div className="text-lg" style={{ color: '#C5A572' }}>
              {new Date().toLocaleDateString('ar-SA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="mt-2 text-sm">
              حالة الخادم:{' '}
              {serverHealth === 'ok' ? (
                <span className="text-green-600">متصل</span>
              ) : serverHealth === 'down' ? (
                <span className="text-red-600">غير متصل</span>
              ) : (
                <span className="text-gray-500">غير مؤكد</span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <Icon size={24} style={{ color: card.color }} />
                  </div>
                </div>
                <div className="text-3xl mb-1" style={{ color: card.color }}>
                  {card.value}
                </div>
                <div className="text-sm text-gray-600">{card.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <a
            href="#admin/marketing"
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border hover:shadow-md transition-all group"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#C5A57215' }}
              >
                <Target size={24} style={{ color: '#C5A572' }} />
              </div>
              <ArrowRight
                size={20}
                className="text-gray-400 group-hover:text-gray-600 transition-all"
              />
            </div>
            <div className="text-lg mb-1" style={{ color: '#0A1F44' }}>
              التسويق والحملات
            </div>
            <div className="text-sm text-gray-600">إدارة الحملات وتحليل الأداء</div>
          </a>

          <a
            href="#admin/social"
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border hover:shadow-md transition-all group"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#2C5F8D15' }}
              >
                <Share2 size={24} style={{ color: '#2C5F8D' }} />
              </div>
              <ArrowRight
                size={20}
                className="text-gray-400 group-hover:text-gray-600 transition-all"
              />
            </div>
            <div className="text-lg mb-1" style={{ color: '#0A1F44' }}>
              وسائل التواصل
            </div>
            <div className="text-sm text-gray-600">إدارة المنشورات والتفاعل</div>
          </a>

          <a
            href="#admin/ai"
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border hover:shadow-md transition-all group"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#8B735515' }}
              >
                <Bot size={24} style={{ color: '#8B7355' }} />
              </div>
              <ArrowRight
                size={20}
                className="text-gray-400 group-hover:text-gray-600 transition-all"
              />
            </div>
            <div className="text-lg mb-1" style={{ color: '#0A1F44' }}>
              المساعد الذكي
            </div>
            <div className="text-sm text-gray-600">محتوى وتحليلات بالذكاء الاصطناعي</div>
          </a>

          <a
            href="#admin/messages"
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border hover:shadow-md transition-all group"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#10B98115' }}
              >
                <MessageSquare size={24} style={{ color: '#10B981' }} />
              </div>
              <ArrowRight
                size={20}
                className="text-gray-400 group-hover:text-gray-600 transition-all"
              />
            </div>
            <div className="text-lg mb-1" style={{ color: '#0A1F44' }}>
              مركز الرسائل
            </div>
            <div className="text-sm text-gray-600">التواصل مع العملاء</div>
          </a>

          <a
            href="#admin/evaluation"
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border hover:shadow-md transition-all group"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#C5A57215' }}
              >
                <ClipboardCheck size={24} style={{ color: '#C5A572' }} />
              </div>
              <ArrowRight
                size={20}
                className="text-gray-400 group-hover:text-gray-600 transition-all"
              />
            </div>
            <div className="text-lg mb-1" style={{ color: '#0A1F44' }}>
              معايير التقييم
            </div>
            <div className="text-sm text-gray-600">إدارة حقول تقييم الطلبات</div>
          </a>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl" style={{ color: '#0A1F44' }}>
                أحدث الطلبات
              </h2>
              <a
                href="#admin/requests"
                className="text-sm px-4 py-2 rounded-lg"
                style={{ color: '#0A1F44', backgroundColor: '#BFFF0020' }}
              >
                عرض الكل
              </a>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {recentRequests.length > 0 ? (
              recentRequests.map((request) => (
                <div key={request.id} className="p-6 hover:bg-gray-50 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-lg" style={{ color: '#0A1F44' }}>
                          {request.name}
                        </div>
                        {getPriorityBadge(request.priority)}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {request.email} • {request.phone}
                      </div>
                      <div className="text-sm text-gray-500">الخدمة: {request.service}</div>
                    </div>
                    <div className="text-left">
                      {getStatusBadge(request.status)}
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(request.createdAt).toLocaleDateString('ar-SA')}
                      </div>
                    </div>
                  </div>
                  {request.message && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {request.message}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">لا توجد طلبات حالياً</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
