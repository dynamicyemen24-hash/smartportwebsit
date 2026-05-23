import {
  Calendar,
  CheckCircle2,
  Clock,
  Facebook,
  Heart,
  Image,
  Instagram,
  Linkedin,
  MessageCircle,
  MessageSquare,
  Send,
  TrendingUp,
  Twitter,
  Users,
  Video,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import AdminLayout from './AdminLayout';

export default function SocialMediaHub() {
  const [selectedPlatform, setSelectedPlatform] = useState<
    'all' | 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'whatsapp'
  >('all');

  type SocialPlatform = 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'whatsapp';
  const [postContent, setPostContent] = useState('');

  const socialAccounts: Array<{
    platform: SocialPlatform;
    name: string;
    icon: typeof Instagram;
    color: string;
    followers: string;
    engagement: string;
    posts: number;
    connected: boolean;
  }> = [
    {
      platform: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      followers: '24.5K',
      engagement: '4.8%',
      posts: 342,
      connected: true,
    },
    {
      platform: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      followers: '18.2K',
      engagement: '3.2%',
      posts: 289,
      connected: true,
    },
    {
      platform: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      followers: '12.8K',
      engagement: '5.6%',
      posts: 156,
      connected: true,
    },
    {
      platform: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: '#1DA1F2',
      followers: '8.9K',
      engagement: '2.9%',
      posts: 423,
      connected: true,
    },
    {
      platform: 'whatsapp',
      name: 'WhatsApp Business',
      icon: MessageCircle,
      color: '#25D366',
      followers: '3.2K',
      engagement: '12.3%',
      posts: 0,
      connected: true,
    },
  ];

  const scheduledPosts = [
    {
      id: 1,
      content: 'اكتشف حلولنا اللوجستية المبتكرة التي تخدم السوق الخليجي بأحدث التقنيات 🚛✨',
      platforms: ['instagram', 'facebook', 'linkedin'],
      scheduledTime: '2026-05-08T10:00:00',
      status: 'scheduled',
      media: ['image1.jpg', 'image2.jpg'],
    },
    {
      id: 2,
      content: 'الطاقة الشمسية للمستودعات - خفض التكاليف وحماية البيئة 🌞♻️',
      platforms: ['linkedin', 'twitter'],
      scheduledTime: '2026-05-08T14:00:00',
      status: 'scheduled',
      media: ['solar-infographic.jpg'],
    },
    {
      id: 3,
      content: 'عروض خاصة على خدمات النقل والشحن - تواصل معنا الآن 📦',
      platforms: ['whatsapp', 'instagram'],
      scheduledTime: '2026-05-09T09:00:00',
      status: 'scheduled',
      media: [],
    },
  ];

  const filteredSocialAccounts =
    selectedPlatform === 'all'
      ? socialAccounts
      : socialAccounts.filter((account) => account.platform === selectedPlatform);

  const filteredScheduledPosts =
    selectedPlatform === 'all'
      ? scheduledPosts
      : scheduledPosts.filter((post) => post.platforms.includes(selectedPlatform));

  const recentActivity = [
    {
      platform: 'instagram',
      type: 'comment',
      user: 'أحمد المالكي',
      content: 'خدمة ممتازة، شكراً للفريق المحترف',
      time: '5 دقائق',
      responded: false,
    },
    {
      platform: 'facebook',
      type: 'message',
      user: 'شركة النقل السريع',
      content: 'نود الاستفسار عن خدمات إدارة المستودعات',
      time: '12 دقيقة',
      responded: false,
    },
    {
      platform: 'linkedin',
      type: 'comment',
      user: 'سارة الزهراني',
      content: 'هل لديكم فروع في مسقط؟',
      time: '25 دقيقة',
      responded: true,
    },
    {
      platform: 'whatsapp',
      type: 'message',
      user: '+966 50 123 4567',
      content: 'متى يمكنكم زيارة موقعنا للمعاينة؟',
      time: 'ساعة واحدة',
      responded: false,
    },
  ];

  const analytics = {
    totalReach: 145230,
    totalEngagement: 8945,
    newFollowers: 1234,
    messageRate: 94,
  };

  const getPlatformIcon = (platform: string) => {
    const account = socialAccounts.find((acc) => acc.platform === platform);
    if (!account) return MessageCircle;
    return account.icon;
  };

  const getPlatformColor = (platform: string) => {
    const account = socialAccounts.find((acc) => acc.platform === platform);
    return account?.color || '#6B7280';
  };

  return (
    <AdminLayout currentPage="social">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl mb-2" style={{ color: '#0A1F44' }}>
            مركز وسائل التواصل الاجتماعي
          </h1>
          <p className="text-gray-600">
            إدارة جميع حساباتك على وسائل التواصل الاجتماعي من مكان واحد
          </p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#C5A57215' }}
              >
                <Users size={20} style={{ color: '#C5A572' }} />
              </div>
              <div className="text-2xl" style={{ color: '#0A1F44' }}>
                {analytics.totalReach.toLocaleString('ar-SA')}
              </div>
            </div>
            <div className="text-sm text-gray-600">إجمالي الوصول</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#0A1F4415' }}
              >
                <Heart size={20} style={{ color: '#0A1F44' }} />
              </div>
              <div className="text-2xl" style={{ color: '#0A1F44' }}>
                {analytics.totalEngagement.toLocaleString('ar-SA')}
              </div>
            </div>
            <div className="text-sm text-gray-600">إجمالي التفاعل</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#2C5F8D15' }}
              >
                <TrendingUp size={20} style={{ color: '#2C5F8D' }} />
              </div>
              <div className="text-2xl" style={{ color: '#0A1F44' }}>
                +{analytics.newFollowers.toLocaleString('ar-SA')}
              </div>
            </div>
            <div className="text-sm text-gray-600">متابعين جدد</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
            style={{ borderColor: '#E5E7EB' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#10B98115' }}
              >
                <MessageSquare size={20} style={{ color: '#10B981' }} />
              </div>
              <div className="text-2xl" style={{ color: '#0A1F44' }}>
                {analytics.messageRate}%
              </div>
            </div>
            <div className="text-sm text-gray-600">معدل الرد</div>
          </motion.div>
        </div>

        {/* Social Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSocialAccounts.map((account, index) => {
            const Icon = account.icon;
            return (
              <motion.div
                key={account.platform}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all cursor-pointer"
                style={{ borderColor: '#E5E7EB' }}
                onClick={() => setSelectedPlatform(account.platform)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${account.color}15` }}
                  >
                    <Icon size={24} style={{ color: account.color }} />
                  </div>
                  {account.connected && (
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <CheckCircle2 size={14} />
                      <span>متصل</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg mb-3" style={{ color: '#0A1F44' }}>
                  {account.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">المتابعين</div>
                    <div className="text-sm" style={{ color: account.color }}>
                      {account.followers}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">التفاعل</div>
                    <div className="text-sm" style={{ color: account.color }}>
                      {account.engagement}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Post Composer */}
        <div className="bg-white rounded-xl shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <div className="p-6 border-b" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="text-xl" style={{ color: '#0A1F44' }}>
              إنشاء منشور جديد
            </h3>
          </div>
          <div className="p-6">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="ماذا تريد أن تشارك؟"
              className="w-full p-4 rounded-lg border resize-none mb-4"
              style={{ borderColor: '#E5E7EB', minHeight: '120px' }}
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                  <Image size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                  <Calendar size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg border transition-all"
                  style={{ borderColor: '#E5E7EB', color: '#0A1F44' }}
                >
                  حفظ كمسودة
                </button>
                <button
                  className="px-6 py-2 rounded-lg text-white flex items-center gap-2"
                  style={{ backgroundColor: '#C5A572' }}
                >
                  <Send size={18} />
                  نشر الآن
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Posts & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scheduled Posts */}
          <div className="bg-white rounded-xl shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <div className="p-6 border-b" style={{ borderColor: '#E5E7EB' }}>
              <h3 className="text-xl" style={{ color: '#0A1F44' }}>
                المنشورات المجدولة
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: '#E5E7EB' }}>
              {filteredScheduledPosts.map((post) => (
                <div key={post.id} className="p-4 hover:bg-gray-50 transition-all">
                  <div className="mb-3">
                    <p className="text-sm mb-2" style={{ color: '#0A1F44' }}>
                      {post.content}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={14} />
                      {new Date(post.scheduledTime).toLocaleString('ar-SA')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.platforms.map((platform) => {
                      const Icon = getPlatformIcon(platform);
                      return (
                        <div
                          key={platform}
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${getPlatformColor(platform)}15` }}
                        >
                          <Icon size={16} style={{ color: getPlatformColor(platform) }} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <div className="p-6 border-b" style={{ borderColor: '#E5E7EB' }}>
              <h3 className="text-xl" style={{ color: '#0A1F44' }}>
                النشاطات الأخيرة
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: '#E5E7EB' }}>
              {recentActivity.map((activity, index) => {
                const Icon = getPlatformIcon(activity.platform);
                return (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-all">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${getPlatformColor(activity.platform)}15` }}
                      >
                        <Icon size={18} style={{ color: getPlatformColor(activity.platform) }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="text-sm" style={{ color: '#0A1F44' }}>
                            {activity.user}
                          </div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.content}</p>
                        {!activity.responded && (
                          <button
                            className="text-xs px-3 py-1 rounded-lg text-white"
                            style={{ backgroundColor: '#C5A572' }}
                          >
                            الرد
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
