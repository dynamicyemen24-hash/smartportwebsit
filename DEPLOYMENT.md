# دليل النشر الشامل — Smart Ports Website

نشر الموقع على Vercel مع Supabase Functions والدعم الكامل.

---

## 📋 المتطلبات

✅ Node.js 18+ و pnpm 8+
✅ حساب Vercel
✅ حساب Supabase مع مشروع نشط
✅ حساب Stripe (اختياري - للدفع)
✅ مستودع GitHub عام

---

## 🚀 خطوات النشر على Vercel

### 1. نسخ المستودع على GitHub

```bash
# إذا كنت لم تنسخ بعد:
git init
git remote add origin https://github.com/YOUR_USERNAME/smartports-website.git
git branch -M main
git add .
git commit -m "Initial commit: Smart Ports Website"
git push -u origin main
```

### 2. ربط Vercel بـ GitHub

1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. انقر على **Add New... > Project**
3. اختر **Import Git Repository**
4. ابحث عن `smartports-website` واختره
5. انقر **Import**

### 3. إعداد متغيرات البيئة في Vercel

في صفحة **Project Settings > Environment Variables**، أضف:

```
VITE_SUPABASE_PROJECT_ID=tnzlusiymgdvsqfufmme
VITE_SUPABASE_URL=https://tznlusiymgdvsqfuftme.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuemx1c2l5bWdkdnNxZnVmbW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNDM5MTgsImV4cCI6MjA5MzcxOTkxOH0.cFK0ewweyiP63-h4v1cJgZaNhBkcK37bU8mptfggNNw

VITE_APP_SITE_URL=https://smartportsco.vercel.app

STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

> **ملاحظة أمنية**: استخدم مفاتيح Stripe الفعلية من حسابك الإنتاجي أو التجريبي.

### 4. نشر Supabase Functions

```bash
# ثبت Supabase CLI
npm i -g supabase

# سجل الدخول
supabase login

# انشر الدوال
cd supabase/functions
supabase functions deploy make-server-88c8b05a --project-ref tnzlusiymgdvsqfufmme
```

### 5. اختبار العملية المحلية

```bash
pnpm install
pnpm build
pnpm preview --host 0.0.0.0
```

ثم افتح `http://localhost:4173` في المتصفح.

---

## 🔗 المجالات والـ DNS

### إذا كنت تملك domain مخصص:

1. في Vercel Project Settings، اختر **Domains**
2. أضف مجالك (مثل `smartportsco.com`)
3. اتبع تعليمات DNS في منصة استضافة النطاق

### مثال لـ DNS Records:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com.
TTL: 3600

Type: A
Name: @ (أو smartportsco.com)
Value: 76.76.19.165
```

---

## 📊 المتابعة والاختبار

### اختبر الموقع بعد النشر:

```bash
# اختبر URL بـ curl
curl https://smartportsco.vercel.app

# اختبر الـ health check
curl https://smartportsco.vercel.app/api/health

# اختبر نموذج التواصل
curl -X POST https://smartportsco.vercel.app/api/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+966501234567",
    "service": "استشارة",
    "message": "رسالة اختبار"
  }'
```

---

## 🔐 أمان الإنتاج

### قبل النشر النهائي:

✅ تحديث كل مفاتيح البيئة بالقيم الحقيقية
✅ تفعيل CORS بشكل صحيح (للنطاق الخاص فقط)
✅ تفعيل HTTPS (تلقائيًا في Vercel)
✅ إعداد firewall وحماية DDoS
✅ إعداد نسخ احتياطية في Supabase
✅ اختبار الدوال الحساسة مع بيانات وهمية

### GitHub Secrets (للـ CI/CD)

في GitHub Repository > Settings > Secrets and variables > Actions:

```
VERCEL_TOKEN=<your_token>
VERCEL_ORG_ID=<your_org_id>
VERCEL_PROJECT_ID=<your_project_id>
SUPABASE_ACCESS_TOKEN=<your_token>
SUPABASE_PROJECT_ID=tnzlusiymgdvsqfufmme
```

---

## 🌍 الرابط النهائي

بعد النشر الناجح على Vercel، ستحصل على URL واحد من الآتي:

### الخيار 1: النطاق الافتراضي من Vercel

```
https://smartports-website.vercel.app
```

### الخيار 2: نطاق مخصص

```
https://smartportsco.com
```

---

## 🆘 استكشاف الأخطاء

### الموقع لا يحمّل:

```bash
# تحقق من البناء
vercel logs

# أعد النشر
vercel --prod
```

### نموذج التواصل لا يعمل:

```bash
# تحقق من الدالة
supabase functions list

# اختبر الدالة محليًا
supabase functions serve
```

### المتغيرات البيئية غير محدثة:

```bash
# تحدث البيئة في Vercel dashboard
# ثم أعد النشر
vercel --prod --force
```

---

## 📞 دعم العملاء

### البيانات المطلوبة لمشاركة الموقع:

```
🌐 رابط الموقع الرئيسي:
https://smartportsco.com

🔐 رابط لوحة التحكم الإدارية:
https://smartportsco.com/#admin

📧 بريد تواصل المشروع:
admin@smartportsco.com

📱 رقم الدعم:
+966 50 123 4567
```

---

## ✅ قائمة التحقق النهائية

- [ ] تم نسخ المشروع على GitHub
- [ ] تم ربط Vercel بـ GitHub
- [ ] تم إضافة جميع متغيرات البيئة
- [ ] تم نشر Supabase Functions
- [ ] تم اختبار الموقع محليًا
- [ ] تم التحقق من الروابط والنماذج
- [ ] تم تأمين الـ API وإضافة CORS
- [ ] تم إعداد النطاق المخصص (اختياري)
- [ ] تم إعداد GitHub Secrets للـ CI/CD
- [ ] تم توثيق الرابط النهائي للعميل

---

**آخر تحديث:** مايو 2026
**الحالة:** جاهز للنشر الإنتاجي ✅
