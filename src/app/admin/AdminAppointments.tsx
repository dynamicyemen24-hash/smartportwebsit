import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { api, Appointment } from '../../utils/api';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const result = await api.getAppointments();
        setAppointments(result.appointments);
      } catch (err: any) {
        setError(err?.message || 'فشل في تحميل المواعيد');
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  return (
    <AdminLayout currentPage="appointments">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">المواعيد وجدول العمل</h1>
          <p className="mt-2 text-sm text-slate-600">
            هنا يمكنك مراجعة جميع المواعيد المجدولة، مع تفاصيل كل مهمة وربطها بطلبات العملاء.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm text-slate-700">
            جاري تحميل المواعيد...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
            {error}
          </div>
        ) : appointments.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm text-slate-700">
            لا توجد مواعيد مجدولة حالياً.
          </div>
        ) : (
          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{appointment.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.description || 'لا يوجد وصف إضافي'}
                    </p>
                  </div>
                  <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                    {appointment.status === 'completed'
                      ? 'مكتمل'
                      : appointment.status === 'cancelled'
                        ? 'ملغى'
                        : 'مجدول'}
                  </span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">التاريخ</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {appointment.scheduledDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">الوقت</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {appointment.scheduledTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">المدة</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {appointment.duration} دقيقة
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">موظف المسؤول</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {appointment.assignedTo || 'غير محدد'}
                    </p>
                  </div>
                </div>
                {appointment.contactRequestId && (
                  <div className="mt-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                    <span className="font-semibold">طلب العميل مرتبط:</span>{' '}
                    {appointment.contactRequestId}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
