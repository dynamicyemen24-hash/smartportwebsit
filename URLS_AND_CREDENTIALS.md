# الروابط والبيانات الاعتمادية — Smart Ports Website

**⚠️ محتوى سري - تم إنشاؤه للإشارة فقط**

---

## 🌐 روابط الموقع

### الموقع الرئيسي

| الوصف                | الرابط                                        | الحالة           |
| -------------------- | --------------------------------------------- | ---------------- |
| **الموقع المخصص**    | https://smartportsco.com                      | ⏳ قيد الإعداد\* |
| **الموقع الافتراضي** | https://smartports-website.vercel.app         | ✅ جاهز للنشر    |
| **معاينة Vercel**    | https://smartports-website-preview.vercel.app | ✅ متاح          |

\*يتطلب تحديث DNS و ربط النطاق

### لوحة التحكم الإدارية

| الوصف           | الرابط                                       | الملاحظات                   |
| --------------- | -------------------------------------------- | --------------------------- |
| **الدخول**      | https://smartportsco.com/#admin              | استخدم بيانات Supabase Auth |
| **لوحة التحكم** | https://smartportsco.com/#admin              | بعد تسجيل الدخول            |
| **الطلبات**     | https://smartportsco.com/#admin/requests     | عرض جميع طلبات العملاء      |
| **المواعيد**    | https://smartportsco.com/#admin/appointments | عرض المواعيد المجدولة       |

### منصات التطوير

| المنصة       | الرابط                                           | البيانات       |
| ------------ | ------------------------------------------------ | -------------- |
| **Vercel**   | https://vercel.com/dashboard                     | (معرف الحساب)  |
| **GitHub**   | https://github.com/smartports/smartports-website | (معرف الحساب)  |
| **Supabase** | https://app.supabase.com                         | (معرف المشروع) |

---

## 🔐 بيانات Supabase

> **⚠️ سري جداً - لا تشارك علناً**

```
Project ID: tnzlusiymgdvsqfufmme
Project URL: https://tznlusiymgdvsqfuftme.supabase.co
```

### المفاتيح (Keys)

| النوع                | القيمة                    | الاستخدام      |
| -------------------- | ------------------------- | -------------- |
| **Anon Key**         | `eyJhbGciOiJIUzI1NiIs...` | Frontend (عام) |
| **Service Role Key** | `eyJhbGciOiJIUzI1NiIs...` | Backend (سري)  |

### بيانات اعتماد Supabase Auth

```
البريد: admin@smartportsco.com
الكلمة المرورية: (يتم إعدادها عند الإنشاء الأول)
```

---

## 💳 بيانات Stripe

> **⚠️ سري جداً - لا تشارك علناً**

### بيئة الاختبار (Testing)

| النوع               | القيمة             |
| ------------------- | ------------------ |
| **Publishable Key** | pk_test_XXXXXXXXXX |
| **Secret Key**      | sk_test_XXXXXXXXXX |
| **Webhook Secret**  | whsec_XXXXXXXXXX   |

### بطاقات الاختبار

```
رقم الكامل:   4242 4242 4242 4242
اسم:          أي اسم
انتهاء الصلاحية: 12/25 (أي شهر مستقبلي)
CVC:          123 (أي 3 أرقام)
```

### الحسابات الاختبارية الأخرى

| الحالة                    | الرقم               |
| ------------------------- | ------------------- |
| **بطاقة مرفوضة**          | 4000 0000 0000 0002 |
| **بطاقة منتهية الصلاحية** | 4000 0000 0000 0069 |
| **بطاقة بدون أموال**      | 4000 0000 0000 9995 |

---

## 🔑 بيانات GitHub

| البيان            | القيمة                        |
| ----------------- | ----------------------------- |
| **المستودع**      | smartports/smartports-website |
| **الفرع الرئيسي** | main                          |
| **الفرع التطوير** | develop (اختياري)             |

### GitHub Secrets (للـ CI/CD)

```
VERCEL_TOKEN=vcp_XXXXXXXXXX
VERCEL_ORG_ID=smartport-website
VERCEL_PROJECT_ID=prj_BScfSBgsbIwRv8siL1fDTWnG1qNm

SUPABASE_ACCESS_TOKEN=sbpat_XXXXXXXXXX
SUPABASE_PROJECT_ID=tnzlusiymgdvsqfufmme
```

---

## 📧 بيانات الاتصال

### البريد الإلكتروني

```
البريد الرئيسي:    admin@smartportsco.com
بريد الدعم:       support@smartportsco.com
بريد المبيعات:    sales@smartportsco.com
```

### الهاتف والجوال

```
الهاتف الرئيسي:   +966 50 123 4567
الهاتف الثاني:    +966 56 123 4567
WhatsApp:         +966 50 123 4567
```

### وسائل التواصل الاجتماعي

```
Facebook:  https://facebook.com/smartportsco
Twitter:   https://twitter.com/smartportsco
LinkedIn:  https://linkedin.com/company/smartportsco
```

---

## 🛠️ بيانات التطوير المحلية

### البيئة

```bash
Node.js:  v18+
pnpm:     v8+
npm:      v9+
```

### ملف .env المحلي

```env
# Supabase
VITE_SUPABASE_PROJECT_ID=tnzlusiymgdvsqfufmme
VITE_SUPABASE_URL=https://tznlusiymgdvsqfuftme.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# Stripe
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXX

# الموقع
VITE_APP_SITE_URL=https://smartportsco.com
```

### أوامر التطوير

```bash
# البدء
pnpm install
pnpm dev

# البناء
pnpm build
pnpm preview

# الاختبار
pnpm lint
pnpm typecheck
pnpm format
```

---

## 🚀 بيانات الإنتاج

### Vercel Project

| البيان             | القيمة                           |
| ------------------ | -------------------------------- |
| **معرف المشروع**   | prj_BScfSBgsbIwRv8siL1fDTWnG1qNm |
| **معرف المنظمة**   | smartport-website                |
| **النطاق الأساسي** | smartports-website.vercel.app    |
| **النطاق المخصص**  | smartportsco.com (قيد الإعداد)   |

### Supabase Project

| البيان           | القيمة               |
| ---------------- | -------------------- |
| **معرف المشروع** | tnzlusiymgdvsqfufmme |
| **منطقة الخادم** | (اختر من الخيارات)   |
| **Database**     | PostgreSQL           |

---

## 📱 اختبار الموقع

### روابط الاختبار المحلية

```
الموقع:        http://localhost:5173
الإدارة:       http://localhost:5173/#admin
المعاينة:      http://localhost:4173
```

### بيانات العميل الاختبارية

```
الاسم:        العميل التجريبي
البريد:       test@example.com
الهاتف:       +966501234567
الشركة:       شركة اختبار
الخدمة:       استشارة
الرسالة:      هذه رسالة اختبار
```

---

## 🔔 الإشعارات والسجلات

### روابط المراقبة

```
Vercel Logs:    https://vercel.com/dashboard/PROJECT_ID/logs
Supabase Logs:  https://app.supabase.com/project/PROJECT_ID/logs
GitHub Actions: https://github.com/smartports/smartports-website/actions
```

### رموز السجلات

```
[INFO]   معلومات عامة
[WARN]   تحذير
[ERROR]  خطأ
[DEBUG]  معلومات تصحيح
```

---

## 🔐 أمان البيانات

### نقاط مهمة:

- ✅ لا تشارك المفاتيح السرية في الكود
- ✅ استخدم GitHub Secrets للـ CI/CD
- ✅ استخدم بيانات اختبار Stripe عند التطوير
- ✅ حدث كلمات المرور بانتظام
- ✅ فعّل المصادقة متعددة العوامل (2FA)
- ✅ احفظ نسخة آمنة من المفاتيح

---

## 📋 قائمة المراجعة

- [ ] تسجيل الدخول لـ Vercel بنجاح
- [ ] تسجيل الدخول لـ Supabase بنجاح
- [ ] تسجيل الدخول لـ Stripe Dashboard
- [ ] اختبار الموقع محليًا
- [ ] اختبار لوحة الإدارة
- [ ] اختبار نموذج التواصل
- [ ] اختبار جلسة الدفع
- [ ] التحقق من السجلات
- [ ] إعداد النطاق المخصص
- [ ] إطلاق الموقع

---

**معلومات الملف:**

- تاريخ الإنشاء: مايو 2026
- آخر تحديث: مايو 2026
- مستوى الأمان: عالي جداً
- الحالة: نشط وآمن ✅

⚠️ **تذكير:** احفظ هذا الملف بأمان ولا تشارك المفاتيح مع أي شخص!
