# البدء السريع — Smart Ports Website

## 🚀 ابدأ في دقائق معدودة

### الخطوة 1️⃣: التثبيت (دقيقة واحدة)

```bash
# 1. انتقل للمجلد
cd smartportwebsit

# 2. ثبت الحزم
pnpm install

# 3. انسخ .env.example
cp .env.example .env
```

### الخطوة 2️⃣: التطوير المحلي (30 ثانية)

```bash
# ابدأ خادم التطوير
pnpm dev

# سيفتح تلقائيًا http://localhost:5173
```

### الخطوة 3️⃣: البناء للإنتاج (2 دقيقة)

```bash
# بناء النسخة الإنتاجية
pnpm build

# معاينة النسخة المبنية
pnpm preview --host 0.0.0.0
```

---

## 📝 المتغيرات البيئية الأساسية

في ملف `.env`، عدّل:

```env
# الموقع النهائي
VITE_APP_SITE_URL=https://smartportsco.com

# Stripe (اختياري الآن)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

> الباقي مضبوط بالفعل مع Supabase

---

## 🎯 الاستخدامات الشائعة

### 🌐 تصفح الموقع الرئيسي

```
http://localhost:5173
```

شاهد الصفحة الرئيسية، الخدمات، المشاريع، المراجعات، الاتصال

### 🔐 تسجيل الدخول للإدارة

```
http://localhost:5173/#admin
```

بيانات اعتماد اختبار:

- البريد: `test@example.com`
- الكلمة المرورية: `test123456` (اطلب من المدير الفعلي)

### 📬 اختبار نموذج التواصل

1. اذهب إلى قسم "التواصل"
2. ملء البيانات (الاسم، البريد، الرسالة)
3. اضغط "إرسال"
4. تحقق من لوحة التحكم (Admin > الطلبات)

### 💳 اختبار الدفع (Stripe)

1. اذهب إلى قسم "الدفع"
2. أدخل:
   - الاسم: أي اسم
   - البريد: أي بريد صحيح
   - المبلغ: 2500 SAR مثلاً
3. اضغط "ابدأ الدفع الآمن"
4. استخدم بطاقة اختبار Stripe:
   - الرقم: `4242 4242 4242 4242`
   - انتهاء الصلاحية: `12/25`
   - CVC: `123`

---

## 📊 الملفات المهمة

| الملف                        | الغرض                    |
| ---------------------------- | ------------------------ |
| `src/app/App.tsx`            | التطبيق الرئيسي والراوتر |
| `src/app/components/`        | مكونات الموقع            |
| `src/app/admin/`             | صفحات الإدارة            |
| `src/utils/api.ts`           | API client               |
| `supabase/functions/server/` | Backend (API)            |
| `vercel.json`                | إعدادات Vercel           |
| `.env`                       | متغيرات البيئة           |

---

## 🐛 استكشاف الأخطاء

### المشكلة: "Cannot find module"

```bash
# الحل:
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### المشكلة: "VITE_SUPABASE_URL is required"

```bash
# الحل: تأكد من .env يحتوي على:
VITE_SUPABASE_URL=https://tznlusiymgdvsqfuftme.supabase.co
```

### المشكلة: نموذج التواصل لا يعمل

```bash
# تحقق من Supabase Functions:
1. افتح https://app.supabase.com
2. اذهب إلى Functions
3. اختر make-server-88c8b05a
4. تحقق من السجلات (Logs)
```

---

## 📱 أجهزة الاختبار

### Desktop:

- Chrome/Firefox/Safari (آخر إصدار)
- اختبر responsive design

### Mobile:

- استخدم DevTools (F12 > Toggle device toolbar)
- اختبر الأزرار والنماذج

---

## 🔍 التحقق من الجودة

```bash
# تحقق من lint (تحذيرات + أخطاء)
pnpm lint

# تحقق من TypeScript
pnpm typecheck

# تنسيق الكود
pnpm format
```

---

## 🌍 الخطوة التالية: الإطلاق

عندما تكون مستعدًا للإطلاق:

```bash
# ادفع التغييرات إلى GitHub
git add .
git commit -m "chore: ready for production"
git push origin main

# تتبع الـ deployment على:
# https://vercel.com/dashboard
```

---

## 💡 نصائح سريعة

- ✅ جميع الملفات `.tsx` و `.ts` موجودة وتعمل
- ✅ قاعدة البيانات Supabase متصلة ومعدة
- ✅ الأيقونات من Lucide مضمنة
- ✅ الألوان تتبع هوية العلامة التجارية
- ✅ RTL كامل للعربية معطل

---

**ملاحظة:** إذا واجهت مشكلة، اطلب من الدعم التقني!

وقت البدء: **أقل من 5 دقائق** ⚡
