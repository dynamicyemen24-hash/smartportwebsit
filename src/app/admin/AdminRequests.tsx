import { Filter, Search } from 'lucide-react';
import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { api, ContactRequest } from '../../utils/api';
import AdminLayout from './AdminLayout';

export default function AdminRequests() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [noteText, setNoteText] = useState('');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [taskMessage, setTaskMessage] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const filterData = useCallback(() => {
    let filtered = [...requests];

    if (searchTerm) {
      const normalizedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(normalizedSearch) ||
          r.email.toLowerCase().includes(normalizedSearch) ||
          r.phone.includes(normalizedSearch) ||
          r.country?.toLowerCase().includes(normalizedSearch) ||
          r.city?.toLowerCase().includes(normalizedSearch) ||
          r.region?.toLowerCase().includes(normalizedSearch),
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((r) => r.status === filterStatus);
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, filterStatus]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const loadRequests = async () => {
    try {
      const data = await api.getContactRequests();
      setRequests(data.requests);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.updateContactRequest(id, { status });
      loadRequests();
      if (selectedRequest?.id === id) {
        const updated = await api.getContactRequest(id);
        setSelectedRequest(updated.request);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleAddNote = async () => {
    if (!selectedRequest || !noteText.trim()) return;

    try {
      await api.updateContactRequest(selectedRequest.id, { note: noteText });
      setNoteText('');
      loadRequests();
      const updated = await api.getContactRequest(selectedRequest.id);
      setSelectedRequest(updated.request);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

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

  const formatRequestLocation = (request: ContactRequest) => {
    const locationParts: string[] = [];
    if (request.country) locationParts.push(request.country);
    if (request.city) locationParts.push(request.city);
    if (request.region) locationParts.push(request.region);
    if (request.fullAddress) locationParts.push(request.fullAddress);
    return locationParts.length ? locationParts.join(' / ') : 'غير محدد';
  };

  if (isLoading) {
    return (
      <AdminLayout currentPage="requests">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-lg text-gray-700">جارٍ تحميل الطلبات...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="requests">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2" style={{ color: '#0A1F44' }}>
              إدارة الطلبات
            </h1>
            <p className="text-gray-600">عرض ومتابعة جميع طلبات التواصل الواردة</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث بالاسم، البريد أو الهاتف..."
                className="w-full pr-10 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#BFFF00' } as CSSProperties}
              />
            </div>

            <div className="relative">
              <Filter
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pr-10 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#BFFF00' } as CSSProperties}
              >
                <option value="all">جميع الحالات</option>
                <option value="new">جديد</option>
                <option value="in_progress">قيد المعالجة</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="font-bold" style={{ color: '#0A1F44' }}>
                الطلبات ({filteredRequests.length})
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-all ${
                    selectedRequest?.id === request.id ? 'bg-lime-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium" style={{ color: '#0A1F44' }}>
                      {request.name}
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{request.email}</div>
                  <div className="text-sm text-gray-500">
                    {request.service} • {new Date(request.createdAt).toLocaleDateString('ar-SA')}
                  </div>
                  <div className="text-xs text-gray-400">{formatRequestLocation(request)}</div>
                </div>
              ))}

              {filteredRequests.length === 0 && (
                <div className="p-12 text-center text-gray-500">لا توجد طلبات تطابق البحث</div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {selectedRequest ? (
              <div>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2" style={{ color: '#0A1F44' }}>
                        {selectedRequest.name}
                      </h3>
                      {getStatusBadge(selectedRequest.status)}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <strong>البريد:</strong> {selectedRequest.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <strong>الهاتف:</strong> {selectedRequest.phone}
                    </div>
                    {selectedRequest.company && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <strong>الشركة:</strong> {selectedRequest.company}
                      </div>
                    )}
                    {selectedRequest.country && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <strong>الدولة:</strong> {selectedRequest.country}
                      </div>
                    )}
                    {selectedRequest.city && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <strong>المدينة:</strong> {selectedRequest.city}
                      </div>
                    )}
                    {selectedRequest.region && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <strong>المنطقة / الحي:</strong> {selectedRequest.region}
                      </div>
                    )}
                    {selectedRequest.fullAddress && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <strong>العنوان الكامل:</strong> {selectedRequest.fullAddress}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <strong>الخدمة:</strong> {selectedRequest.service}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <strong>التاريخ:</strong>{' '}
                      {new Date(selectedRequest.createdAt).toLocaleString('ar-SA')}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">تحويل إلى مهمة / متابعة</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={async () => {
                          if (!selectedRequest) return;
                          setIsCreatingTask(true);
                          setTaskMessage(null);
                          try {
                            const title = `متابعة: ${selectedRequest.service} - ${selectedRequest.name}`;
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            const scheduledDate = tomorrow.toISOString().slice(0, 10);
                            const scheduledTime = '09:00';
                            await api.createAppointment({
                              contactRequestId: selectedRequest.id,
                              title,
                              scheduledDate,
                              scheduledTime,
                              duration: 60,
                            });
                            // Mark request as in_progress
                            await api.updateContactRequest(selectedRequest.id, {
                              status: 'in_progress',
                            });
                            await loadRequests();
                            setTaskMessage('تم تحويل الطلب إلى مهمة بنجاح');
                          } catch (err) {
                            console.error('Failed to create task:', err);
                            setTaskMessage(
                              'فشل إنشاء المهمة: ' + ((err as any)?.message || String(err)),
                            );
                          } finally {
                            setIsCreatingTask(false);
                          }
                        }}
                        className="px-4 py-2 rounded-lg text-sm"
                        style={{ backgroundColor: '#d4a574', color: 'white' }}
                        disabled={isCreatingTask}
                      >
                        {isCreatingTask ? 'جاري الإنشاء...' : 'تحويل إلى مهمة'}
                      </button>
                    </div>
                  </div>
                  {taskMessage && <div className="mt-3 text-sm text-gray-700">{taskMessage}</div>}
                </div>

                {selectedRequest.message && (
                  <div className="p-6 border-b border-gray-200">
                    <div className="font-bold mb-2" style={{ color: '#0A1F44' }}>
                      الرسالة:
                    </div>
                    <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                      {selectedRequest.message}
                    </div>
                  </div>
                )}

                <div className="p-6 border-b border-gray-200">
                  <div className="font-bold mb-3" style={{ color: '#0A1F44' }}>
                    تغيير الحالة:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['new', 'in_progress', 'completed', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(selectedRequest.id, status)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedRequest.status === status
                            ? 'opacity-100'
                            : 'opacity-50 hover:opacity-75'
                        }`}
                        style={{
                          backgroundColor:
                            status === 'new'
                              ? '#BFFF0020'
                              : status === 'in_progress'
                                ? '#4A556810'
                                : status === 'completed'
                                  ? '#10B98110'
                                  : '#EF444410',
                          color:
                            status === 'new'
                              ? '#BFFF00'
                              : status === 'in_progress'
                                ? '#4A5568'
                                : status === 'completed'
                                  ? '#10B981'
                                  : '#EF4444',
                        }}
                      >
                        {status === 'new'
                          ? 'جديد'
                          : status === 'in_progress'
                            ? 'قيد المعالجة'
                            : status === 'completed'
                              ? 'مكتمل'
                              : 'ملغي'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="p-6">
                  <div className="font-bold mb-3" style={{ color: '#0A1F44' }}>
                    الملاحظات:
                  </div>

                  {selectedRequest.notes && selectedRequest.notes.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {selectedRequest.notes.map((note, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg text-sm">
                          <div className="text-gray-700">{note.text}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(note.createdAt).toLocaleString('ar-SA')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="أضف ملاحظة..."
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': '#BFFF00' } as CSSProperties}
                    />
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-2 rounded-lg"
                      style={{ backgroundColor: '#BFFF00', color: '#0A1F44' }}
                    >
                      إضافة
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">اختر طلباً لعرض التفاصيل</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
