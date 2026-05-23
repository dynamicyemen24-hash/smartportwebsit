import { ReactNode, useEffect, useState } from 'react';
import {
  Bell,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Calendar,
  Settings,
  TrendingUp,
  Share2,
  Bot,
  MessageSquare,
} from 'lucide-react';
import { api, Notification } from '../../utils/api';
import Logo from '../components/Logo';

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: string;
}

export default function AdminLayout({ children, currentPage }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await api.getNotifications();
      setNotifications(data.notifications.slice(0, 5));
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  const handleLogout = () => {
    api.clearToken();
    window.location.href = '/';
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, href: '#admin' },
    { id: 'requests', label: 'الطلبات', icon: FileText, href: '#admin/requests' },
    { id: 'marketing', label: 'التسويق والحملات', icon: TrendingUp, href: '#admin/marketing' },
    { id: 'social', label: 'وسائل التواصل', icon: Share2, href: '#admin/social' },
    { id: 'messages', label: 'مركز الرسائل', icon: MessageSquare, href: '#admin/messages' },
    { id: 'ai', label: 'المساعد الذكي', icon: Bot, href: '#admin/ai' },
    { id: 'appointments', label: 'المواعيد', icon: Calendar, href: '#admin/appointments' },
    { id: 'settings', label: 'الإعدادات', icon: Settings, href: '#admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#C5A572' }}
            >
              <Logo size={20} />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold" style={{ color: '#0A1F44' }}>
                لوحة التحكم
              </div>
              <div className="text-xs text-gray-500">مسار الإدارة الاحترافي</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm">
            <div className="w-9 h-9 rounded-full grid place-items-center bg-[#BFFF00] text-[#0A1F44] font-bold">
              م
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold" style={{ color: '#0A1F44' }}>
                مدير النظام
              </div>
              <div className="text-xs text-gray-500">صلاحية كاملة</div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              <Bell size={20} style={{ color: '#0A1F44' }} />
              {unreadCount > 0 && (
                <span
                  className="absolute top-0 right-0 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: '#0A1F44' }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <div className="font-bold" style={{ color: '#0A1F44' }}>
                    الإشعارات
                  </div>
                </div>
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${!notif.isRead ? 'bg-lime-50' : ''}`}
                        onClick={async () => {
                          await api.markNotificationAsRead(notif.id);
                          loadNotifications();
                        }}
                      >
                        <div className="text-sm font-medium mb-1" style={{ color: '#0A1F44' }}>
                          {notif.title}
                        </div>
                        <div className="text-xs text-gray-600 mb-1">{notif.message}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(notif.createdAt).toLocaleString('ar-SA')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 text-sm">لا توجد إشعارات جديدة</div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-gray-50"
            style={{ color: '#0A1F44' }}
          >
            <LogOut size={18} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-64 bg-white border-l border-gray-200 transition-transform duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive ? 'text-white' : 'hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: '#C5A572' } : { color: '#0A1F44' }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'mr-64' : 'mr-0'}`}>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
