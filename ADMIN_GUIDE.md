# دليل لوحة التحكم الإدارية - المنافذ الذكية

## 🎯 نظرة عامة

تم تطوير نظام إدارة متكامل لموقع المنافذ الذكية يشمل:

### ✅ الميزات الرئيسية

1. **نظام إدارة الطلبات**
   - استقبال طلبات التواصل من العملاء
   - تتبع حالة كل طلب (جديد، قيد المعالجة، مكتمل، ملغي)
   - إضافة ملاحظات وتعليقات
   - تحديد الأولويات

2. **لوحة التحكم Dashboard**
   - إحصائيات شاملة في الوقت الفعلي
   - عرض الطلبات الأخيرة
   - متابعة المؤشرات الرئيسية

3. **نظام الإشعارات**
   - إشعارات فورية عند ورود طلبات جديدة
   - تنبيهات للطلبات المهمة
   - نظام قراءة/غير مقروء

4. **نظام المواعيد**
   - جدولة مواعيد مع العملاء
   - ربط المواعيد بطلبات التواصل
   - تقويم تفاعلي

## 🚀 كيفية الاستخدام

### 1. إعداد حساب المدير

لإنشاء حساب مدير، استخدم Supabase Dashboard:

```sql
-- في SQL Editor الخاص بـ Supabase
-- استخدم Edge Function signup endpoint
```

أو استخدم الطريقة البرمجية:

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-88c8b05a/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@smartportsco.com",
    "password": "YourSecurePassword123",
    "fullName": "مدير النظام"
  }'
```

### 2. تسجيل الدخول

- افتح الموقع واضغط على "الإدارة" في الهيدر
- أدخل البريد الإلكتروني وكلمة المرور
- سيتم توجيهك إلى لوحة التحكم

### 3. إدارة الطلبات

**عرض الطلبات:**
- انتقل إلى "الطلبات" من القائمة الجانبية
- استخدم البحث للعثور على طلبات محددة
- استخدم الفلاتر لتصفية حسب الحالة

**تحديث حالة الطلب:**
1. اختر الطلب من القائمة
2. في صفحة التفاصيل، اضغط على الحالة المطلوبة
3. سيتم تحديث الحالة فوراً

**إضافة ملاحظات:**
1. افتح تفاصيل الطلب
2. اكتب ملاحظتك في الحقل المخصص
3. اضغط "إضافة"

## 📊 API Endpoints

### المصادقة

```typescript
POST /make-server-88c8b05a/auth/login
Body: { email, password }
Response: { success, session, user }
```

```typescript
POST /make-server-88c8b05a/auth/signup
Body: { email, password, fullName }
Response: { success, user }
```

### طلبات التواصل

```typescript
// Get all requests (Admin only)
GET /make-server-88c8b05a/contact-requests
Headers: Authorization: Bearer <token>
Response: { requests: ContactRequest[], total: number }
```

```typescript
// Submit new request (Public)
POST /make-server-88c8b05a/contact-requests
Body: { name, email, phone, company?, service, message? }
Response: { success, requestId, message }
```

```typescript
// Update request (Admin only)
PUT /make-server-88c8b05a/contact-requests/:id
Headers: Authorization: Bearer <token>
Body: { status?, priority?, assignedTo?, note? }
Response: { success, request }
```

### الإحصائيات

```typescript
GET /make-server-88c8b05a/stats
Headers: Authorization: Bearer <token>
Response: {
  stats: {
    totalRequests,
    newRequests,
    inProgressRequests,
    completedRequests,
    totalAppointments,
    unreadNotifications
  }
}
```

## 🔒 الأمان

- ✅ مصادقة باستخدام Supabase Auth
- ✅ توكنات JWT للجلسات
- ✅ حماية جميع endpoints الإدارية
- ✅ تشفير البيانات الحساسة

## 📝 البيانات المخزنة

يستخدم النظام KV Store في Supabase لتخزين:

- `contact_request:{id}` - تفاصيل الطلب
- `contact_requests:index` - قائمة معرفات الطلبات
- `appointment:{id}` - تفاصيل الموعد  
- `appointments:index` - قائمة معرفات المواعيد
- `notification:{id}` - تفاصيل الإشعار
- `notifications:index` - قائمة معرفات الإشعارات

## 🎨 واجهة المستخدم

### الألوان
- الأخضر الليموني: `#BFFF00` - للعناصر التفاعلية
- الأزرق العميق: `#0A1F44` - للنصوص الرئيسية
- الرمادي التقني: `#4A5568` - للعناصر الثانوية

### الحالات والألوان
- **جديد**: أخضر ليموني
- **قيد المعالجة**: رمادي
- **مكتمل**: أخضر
- **ملغي**: أحمر

## 🔄 التحديثات المستقبلية

للترقية إلى نظام ERP/CRM كامل:

1. قم بتنفيذ schema الكامل في Supabase SQL Editor
2. استخدم الملف المرفق: `erp-crm-schema.txt`
3. فعّل Row Level Security (RLS)
4. أضف المزيد من الوحدات النمطية

## 📞 الدعم

للمساعدة أو الاستفسارات:
- البريد: info@smartportsco.com
- الهاتف: +966 66 777 0832

---

© 2026 المنافذ الذكية المحدودة - جميع الحقوق محفوظة
