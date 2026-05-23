import {
  Archive,
  CheckCheck,
  Clock,
  Mail,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Star,
  UserCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { api, Conversation, Message } from '../../utils/api';
import AdminLayout from './AdminLayout';

export default function MessagingCenter() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'important' | 'archived'>(
    'all',
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quickReplies = [
    'شكراً لتواصلكم معنا',
    'سنقوم بإرسال عرض السعر خلال 24 ساعة',
    'هل يمكنكم تحديد موعد للاجتماع؟',
    'سيتم التواصل معكم من قبل الفريق المختص',
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return Mail;
      case 'whatsapp':
        return MessageSquare;
      case 'phone':
        return Phone;
      default:
        return MessageSquare;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email':
        return '#0A1F44';
      case 'whatsapp':
        return '#25D366';
      case 'phone':
        return '#2C5F8D';
      case 'linkedin':
        return '#0A66C2';
      default:
        return '#6B7280';
    }
  };

  const loadConversations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await api.getConversations();
      const conversations = result.conversations ?? [];
      setConversations(conversations);
      const firstConversation = conversations[0];
      if (!selectedConversationId && firstConversation) {
        setSelectedConversationId(firstConversation.id);
      }
    } catch (err: any) {
      console.error('Failed to load conversations:', err);
      setError(err?.message || 'فشل في تحميل المحادثات');
    } finally {
      setIsLoading(false);
    }
  }, [selectedConversationId]);

  const loadConversation = useCallback(async (id: string) => {
    setError(null);
    try {
      const result = await api.getConversation(id);
      setCurrentConversation(result.conversation);
      await api.markConversationRead(id);
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === id
            ? {
                ...conversation,
                unread: 0,
                lastMessage: result.conversation.lastMessage,
                timestamp: result.conversation.timestamp,
              }
            : conversation,
        ),
      );
    } catch (err: any) {
      console.error('Failed to load conversation:', err);
      setError(err?.message || 'فشل في تحميل المحادثة');
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (selectedConversationId) {
      loadConversation(selectedConversationId);
    }
  }, [selectedConversationId, loadConversation]);

  const filteredConversations = useMemo(
    () =>
      conversations.filter((conv) => {
        if (filterStatus === 'unread' && conv.unread === 0) return false;
        if (filterStatus === 'important' && !conv.important) return false;
        if (filterStatus === 'archived' && conv.status !== 'archived') return false;
        if (searchQuery && !conv.name.toLowerCase().includes(searchQuery.toLowerCase()))
          return false;
        return true;
      }),
    [conversations, filterStatus, searchQuery],
  );

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
  };

  const handleSendMessage = async () => {
    if (!currentConversation || !messageInput.trim()) return;
    setIsSending(true);
    setError(null);

    try {
      const result = await api.sendConversationMessage(currentConversation.id, messageInput.trim());
      const updated = result.conversation;
      setMessageInput('');
      setCurrentConversation(updated);
      setConversations((prev) =>
        prev.map((conversation) => (conversation.id === updated.id ? updated : conversation)),
      );
    } catch (err: any) {
      console.error('Failed to send message:', err);
      setError(err?.message || 'فشل في إرسال الرسالة');
    } finally {
      setIsSending(false);
    }
  };

  const threadMessages: Message[] = currentConversation?.messages || [];

  return (
    <AdminLayout currentPage="messages">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2" style={{ color: '#0A1F44' }}>
            مركز الرسائل
          </h1>
          <p className="text-gray-600">إدارة جميع الرسائل والمحادثات مع العملاء من جميع القنوات</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <div className="p-4 border-b space-y-3" style={{ borderColor: '#E5E7EB' }}>
              <div className="relative">
                <Search
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="بحث في المحادثات..."
                  className="w-full pr-10 pl-4 py-2 rounded-lg border"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'الكل' },
                  { key: 'unread', label: 'غير مقروءة' },
                  { key: 'important', label: 'مهمة' },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterStatus(filter.key as any)}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs transition-all ${
                      filterStatus === filter.key ? 'text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    style={filterStatus === filter.key ? { backgroundColor: '#C5A572' } : {}}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="divide-y"
              style={{ borderColor: '#E5E7EB', maxHeight: '600px', overflowY: 'auto' }}
            >
              {isLoading && (
                <div className="p-6 text-center text-gray-600">جارٍ تحميل المحادثات...</div>
              )}
              {!isLoading && filteredConversations.length === 0 && (
                <div className="p-6 text-center text-gray-500">لا توجد محادثات مطابقة</div>
              )}
              {filteredConversations.map((conversation) => {
                const ChannelIcon = getChannelIcon(conversation.channel);
                return (
                  <motion.div
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation.id)}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedConversationId === conversation.id ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#C5A57220' }}
                        >
                          <UserCircle size={24} style={{ color: '#C5A572' }} />
                        </div>
                        <div
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: getChannelColor(conversation.channel) }}
                        >
                          <ChannelIcon size={12} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="text-sm truncate" style={{ color: '#0A1F44' }}>
                              {conversation.name}
                            </div>
                            {conversation.important && (
                              <Star size={14} style={{ color: '#C5A572', fill: '#C5A572' }} />
                            )}
                          </div>
                          <div className="text-xs text-gray-500 flex-shrink-0">
                            {new Date(conversation.timestamp).toLocaleString('ar-SA', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 truncate mb-2">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {conversation.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 rounded text-xs"
                                style={{ backgroundColor: '#C5A57215', color: '#C5A572' }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          {conversation.unread > 0 && (
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
                              style={{ backgroundColor: '#C5A572' }}
                            >
                              {conversation.unread}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border"
            style={{ borderColor: '#E5E7EB' }}
          >
            {currentConversation ? (
              <>
                <div
                  className="p-4 border-b flex items-center justify-between"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#C5A57220' }}
                    >
                      <UserCircle size={20} style={{ color: '#C5A572' }} />
                    </div>
                    <div>
                      <div className="text-sm" style={{ color: '#0A1F44' }}>
                        {currentConversation.name}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        آخر تحديث: {new Date(currentConversation.timestamp).toLocaleString('ar-SA')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                      <Star size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                      <Archive size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                      <MoreVertical size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4" style={{ height: '400px', overflowY: 'auto' }}>
                  {threadMessages.length === 0 && (
                    <div className="text-center text-gray-500">
                      لا توجد رسائل في هذه المحادثة بعد.
                    </div>
                  )}
                  {threadMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-xl p-4 ${
                          message.sender === 'admin' ? 'text-white' : 'bg-gray-50'
                        }`}
                        style={message.sender === 'admin' ? { backgroundColor: '#C5A572' } : {}}
                      >
                        <div className="text-sm mb-1">{message.content}</div>
                        <div
                          className={`text-xs flex items-center gap-1 ${
                            message.sender === 'admin' ? 'text-white/70' : 'text-gray-500'
                          }`}
                        >
                          <span>
                            {new Date(message.timestamp).toLocaleTimeString('ar-SA', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {message.sender === 'admin' && <CheckCheck size={14} />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="px-6 pb-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => setMessageInput(reply)}
                        className="text-xs px-3 py-2 rounded-lg border hover:border-gray-400 transition-all whitespace-nowrap flex-shrink-0"
                        style={{ borderColor: '#E5E7EB', color: '#6B7280' }}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                      <Paperclip size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                      <Smile size={20} className="text-gray-600" />
                    </button>
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="اكتب رسالتك..."
                      className="flex-1 px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#E5E7EB' }}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-2 rounded-lg text-white flex items-center gap-2"
                      style={{ backgroundColor: '#C5A572' }}
                      disabled={isSending}
                    >
                      <Send size={18} />
                      {isSending ? 'جارٍ الإرسال...' : 'إرسال'}
                    </button>
                  </div>
                  {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                  <div>اختر محادثة لبدء المراسلة</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
