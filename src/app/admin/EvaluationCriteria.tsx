import { AlertCircle, ArrowRight, CheckCircle2, Edit2, Plus, Save, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Criterion {
  id: string;
  name: string;
  category: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean';
  options?: string[];
  required: boolean;
  order: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

const categories = [
  { value: 'client_info', label: 'معلومات العميل' },
  { value: 'organization', label: 'معلومات المؤسسة' },
  { value: 'location', label: 'الموقع والعنوان' },
  { value: 'services', label: 'الخدمات المطلوبة' },
  { value: 'project', label: 'تفاصيل المشروع' },
  { value: 'evaluation', label: 'معايير التقييم' },
];

const fieldTypes = [
  { value: 'text', label: 'نص حر' },
  { value: 'number', label: 'رقم' },
  { value: 'select', label: 'اختيار واحد' },
  { value: 'multiselect', label: 'اختيار متعدد' },
  { value: 'boolean', label: 'نعم/لا' },
];

export default function EvaluationCriteria() {
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Criterion>>({
    name: '',
    category: 'evaluation',
    type: 'text',
    options: [],
    required: false,
    active: true,
    order: 0,
  });

  useEffect(() => {
    fetchCriteria();
  }, []);

  const fetchCriteria = async () => {
    try {
      setLoading(true);
      // This would be replaced with actual API call
      // const response = await api.get('/evaluation-criteria');
      // setCriteria(response.data);

      // Mock data for now
      const mockCriteria: Criterion[] = [
        {
          id: '1',
          name: 'حجم المؤسسة',
          category: 'organization',
          type: 'select',
          options: ['صغيرة (1-10)', 'متوسطة (11-50)', 'كبيرة (51-200)', 'مؤسسة (200+)'],
          required: true,
          order: 1,
          active: true,
        },
        {
          id: '2',
          name: 'القطاع',
          category: 'organization',
          type: 'select',
          options: ['لوجستيات', 'تصنيع', 'تجزئة', 'تجارة إلكترونية', 'إنشاءات'],
          required: true,
          order: 2,
          active: true,
        },
        {
          id: '3',
          name: 'الميزانية التقديرية',
          category: 'project',
          type: 'select',
          options: ['أقل من 50 ألف', '50-100 ألف', '100-250 ألف', '250-500 ألف', 'أكثر من 500 ألف'],
          required: false,
          order: 3,
          active: true,
        },
      ];
      setCriteria(mockCriteria);
    } catch (err: any) {
      setError(err.message || 'فشل في تحميل معايير التقييم');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.name || !formData.category || !formData.type) {
        setError('يرجى ملء جميع الحقول المطلوبة');
        return;
      }

      if (editingId) {
        // Update existing
        setCriteria((prev) =>
          prev.map((c) => (c.id === editingId ? ({ ...c, ...formData } as Criterion) : c)),
        );
        setSuccess('تم تحديث المعيار بنجاح');
      } else {
        // Add new
        const newCriterion: Criterion = {
          id: Date.now().toString(),
          name: formData.name || '',
          category: formData.category || 'evaluation',
          type: formData.type || 'text',
          options: formData.options || [],
          required: formData.required || false,
          active: formData.active ?? true,
          order: formData.order || 0,
        };
        setCriteria((prev) => [...prev, newCriterion]);
        setSuccess('تم إضافة المعيار بنجاح');
      }

      resetForm();
    } catch (err: any) {
      setError(err.message || 'فشل في حفظ المعيار');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المعيار؟')) return;

    try {
      setCriteria((prev) => prev.filter((c) => c.id !== id));
      setSuccess('تم حذف المعيار بنجاح');
    } catch (err: any) {
      setError(err.message || 'فشل في حذف المعيار');
    }
  };

  const handleEdit = (criterion: Criterion) => {
    setFormData(criterion);
    setEditingId(criterion.id);
    setIsAddingNew(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'evaluation',
      type: 'text',
      options: [],
      required: false,
      active: true,
      order: 0,
    });
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleBack = () => {
    window.location.hash = '#admin';
  };

  const groupedCriteria = criteria.reduce(
    (acc, criterion) => {
      const category = criterion.category;
      const current = acc[category] ?? [];
      current.push(criterion);
      acc[category] = current;
      return acc;
    },
    {} as Record<string, Criterion[]>,
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowRight size={24} style={{ color: '#0A1F44' }} />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl" style={{ color: '#0A1F44' }}>
                  إدارة معايير التقييم
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  إضافة وتعديل معايير تقييم الطلبات والعملاء
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-white shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: '#C5A572' }}
            >
              <Plus size={20} />
              <span>إضافة معيار جديد</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle size={20} className="text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                <X size={18} />
              </button>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
            >
              <CheckCircle2 size={20} className="text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-green-800">{success}</p>
              </div>
              <button
                onClick={() => setSuccess(null)}
                className="text-green-400 hover:text-green-600"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <AnimatePresence>
            {isAddingNew && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl" style={{ color: '#0A1F44' }}>
                      {editingId ? 'تعديل المعيار' : 'معيار جديد'}
                    </h2>
                    <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#0A1F44' }}>
                        اسم المعيار *
                      </label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A572] focus:ring-offset-0"
                        placeholder="مثال: حجم المؤسسة"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#0A1F44' }}>
                        التصنيف *
                      </label>
                      <select
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A572] focus:ring-offset-0"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Type */}
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#0A1F44' }}>
                        نوع الحقل *
                      </label>
                      <select
                        value={formData.type || 'text'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A572] focus:ring-offset-0"
                      >
                        {fieldTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Options (for select/multiselect) */}
                    {(formData.type === 'select' || formData.type === 'multiselect') && (
                      <div>
                        <label className="block text-sm mb-2" style={{ color: '#0A1F44' }}>
                          الخيارات (سطر لكل خيار)
                        </label>
                        <textarea
                          value={(formData.options || []).join('\n')}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              options: e.target.value.split('\n').filter((o) => o.trim()),
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A572] focus:ring-offset-0"
                          rows={4}
                          placeholder="خيار 1&#10;خيار 2&#10;خيار 3"
                        />
                      </div>
                    )}

                    {/* Order */}
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#0A1F44' }}>
                        الترتيب
                      </label>
                      <input
                        type="number"
                        value={formData.order || 0}
                        onChange={(e) =>
                          setFormData({ ...formData, order: parseInt(e.target.value) })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A572] focus:ring-offset-0"
                      />
                    </div>

                    {/* Required */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="required"
                        checked={formData.required || false}
                        onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                        className="w-5 h-5 rounded"
                        style={{ accentColor: '#C5A572' }}
                      />
                      <label htmlFor="required" className="text-sm" style={{ color: '#0A1F44' }}>
                        حقل إلزامي
                      </label>
                    </div>

                    {/* Active */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="active"
                        checked={formData.active !== false}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="w-5 h-5 rounded"
                        style={{ accentColor: '#C5A572' }}
                      />
                      <label htmlFor="active" className="text-sm" style={{ color: '#0A1F44' }}>
                        مفعّل
                      </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white"
                        style={{ backgroundColor: '#C5A572' }}
                      >
                        <Save size={18} />
                        <span>حفظ</span>
                      </button>
                      <button
                        onClick={resetForm}
                        className="px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-600"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Criteria List */}
          <div className={isAddingNew ? 'lg:col-span-2' : 'lg:col-span-3'}>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">جاري التحميل...</p>
              </div>
            ) : criteria.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl mb-2" style={{ color: '#0A1F44' }}>
                  لا توجد معايير تقييم
                </h3>
                <p className="text-gray-600 mb-6">
                  ابدأ بإضافة معايير التقييم لتصنيف وتقييم طلبات العملاء
                </p>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white"
                  style={{ backgroundColor: '#C5A572' }}
                >
                  <Plus size={20} />
                  <span>إضافة أول معيار</span>
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedCriteria).map(([category, items]) => {
                  const categoryLabel =
                    categories.find((c) => c.value === category)?.label || category;
                  return (
                    <div key={category}>
                      <h3 className="text-xl mb-4" style={{ color: '#0A1F44' }}>
                        {categoryLabel}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {items
                          .sort((a, b) => a.order - b.order)
                          .map((criterion) => (
                            <motion.div
                              key={criterion.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h4 className="text-lg mb-1" style={{ color: '#0A1F44' }}>
                                    {criterion.name}
                                    {criterion.required && (
                                      <span className="text-red-500 mr-1">*</span>
                                    )}
                                  </h4>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                                      {fieldTypes.find((t) => t.value === criterion.type)?.label}
                                    </span>
                                    {!criterion.active && (
                                      <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-600">
                                        غير مفعّل
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEdit(criterion)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="تعديل"
                                  >
                                    <Edit2 size={18} style={{ color: '#C5A572' }} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(criterion.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    title="حذف"
                                  >
                                    <Trash2 size={18} className="text-red-500" />
                                  </button>
                                </div>
                              </div>

                              {criterion.options && criterion.options.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                  <p className="text-xs text-gray-500 mb-2">الخيارات المتاحة:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {criterion.options.slice(0, 3).map((option, i) => (
                                      <span
                                        key={i}
                                        className="text-xs px-2 py-1 rounded-full bg-lime-50 text-gray-700"
                                      >
                                        {option}
                                      </span>
                                    ))}
                                    {criterion.options.length > 3 && (
                                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                        +{criterion.options.length - 3} المزيد
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
