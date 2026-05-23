# المنافذ الذكية | Smart Ports Co. Ltd

موقع شركة المنافذ الذكية المحدودة - رواد الحلول اللوجستية الذكية في المملكة العربية السعودية

> **الحالة:** ✅ جاهز للإطلاق الفوري (مايو 2026)

## 🎯 نظرة عامة

منصة مؤسسية متكاملة تجمع بين:

- **موقع تسويقي احترافي** - عرض الخدمات والحلول مع نموذج دفع آمن
- **نظام إدارة طلبات** - CRM مبسط مع تحويل سريع للمواعيد
- **لوحة تحكم إدارية** - متابعة وإدارة العملاء بسهولة
- **بوابة دفع آمنة** - Stripe للعربون والدفعات

### الخدمات المعروضة:

- إدارة المستودعات الذكية
- حلول النقل واللوجستيات
- إدارة سلاسل الإمداد
- أنظمة الطاقة الشمسية
- المقاولات العامة

## ⚡ المميزات الرئيسية

### الموقع الرئيسي:

✅ تصميم عصري متوافق مع معايير UI/UX 2026
✅ تجاوب كامل (Mobile-First Design)
✅ تحسين SEO مع Structured Data
✅ أنيميشن سلس باستخدام Motion/React
✅ خط Readex Pro للعربية
✅ ألوان الهوية: #BFFF00 + #0A1F44
✅ صور احترافية عالية الجودة
✅ نموذج تواصل تفاعلي متصل بـ API
✅ قسم قصص النجاح والمشاريع المنفذة
✅ قسم الأسئلة الشائعة التفاعلي
✅ قسم منهجية العمل والمبادئ
✅ آراء العملاء مع التقييمات

### لوحة التحكم الإدارية:

🎛️ داشبورد بإحصائيات حية
📊 نظام إدارة الطلبات الكامل
🔔 إشعارات فورية
📅 نظام المواعيد
👥 مصادقة آمنة بـ Supabase Auth
🔒 حماية جميع الـ endpoints
📝 إضافة ملاحظات وتتبع الحالات
🎨 واجهة احترافية سهلة الاستخدام

## 🛠️ التقنيات المستخدمة

### Frontend:

- React 18.3.1 + TypeScript
- Tailwind CSS v4
- Motion/React (Framer Motion)
- Lucide Icons

### Backend:

- Supabase (Database + Auth + Edge Functions)
- Hono (Edge Runtime Framework)
- KV Store للبيانات

### أدوات أخرى:

- Vite (Build Tool)
- pnpm (Package Manager)

## 📋 بنية المشروع

```
/src
├── /app
│   ├── /admin              # لوحة التحكم الإدارية
│   │   ├── AdminLogin.tsx
│   │   ├── AdminLayout.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── AdminRequests.tsx
│   ├── /components         # مكونات الموقع الرئيسي
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SolutionsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ConsultingSection.tsx
│   │   ├── WhyUsSection.tsx
│   │   ├── MethodologySection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── CaseStudiesSection.tsx
│   │   ├── TrustSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── App.tsx            # التطبيق الرئيسي
├── /utils
│   ├── api.ts             # API Client
│   └── /supabase
│       └── info.tsx       # معلومات Supabase
├── /styles
│   ├── theme.css
│   └── fonts.css
└── /supabase/functions/server
    └── index.tsx          # Edge Functions (API)
```

## 🚀 البدء السريع

### 1. إنشاء حساب إداري

استخدم Edge Function:

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-88c8b05a/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@smartportsco.com",
    "password": "SecurePassword123",
    "fullName": "مدير النظام"
  }'
```

### 2. الوصول للوحة التحكم

1. افتح الموقع
2. اضغط على "الإدارة" في الهيدر

## 🚀 نشر الموقع

### التحضير

- تأكد من إعداد اسم المجال `smartportsco.com` في الاستضافة.
- تأكد من أن ملف `public/robots.txt` و `public/sitemap.xml` يعملان بشكل صحيح.
- إذا كنت تستخدم Supabase، اجعل متغيرات البيئة مهيأة في لوحة التحكم الخاصة بك.

### بناء الإنتاج

```bash
npm install
npm run build
```

> إذا كنت تستخدم `pnpm` فالأوامر:
> `pnpm install && pnpm run build`

### رفع على الاستضافة

- على Netlify أو Vercel: حدد مجلد الإخراج `dist` بعد تشغيل البناء.
- على Cloudflare Pages: اربط الريبو وشغل `npm run build`.
- على استضافة ثابتة أخرى: ارفع محتوى `dist`.

### نشر على Vercel

1. ادخل إلى https://vercel.com وسجّل الدخول.
2. اربط المستودع الخاص بالمشروع.
3. عند إعداد المشروع:
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Framework Preset: `Other`
4. أضف متغيرات البيئة التالية في Vercel:
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `FIGMA_TOKEN`
   - `FIGMA_FILE_KEY`
   - `VERCEL_TOKEN`
   - `VERCEL_PROJECT_ID`
   - `VERCEL_ORG_ID`
   - `VITE_APP_SITE_URL`
5. اضغط Deploy.
6. بعد النشر يمكن ربط المجال `smartportsco.com` من إعدادات Vercel.
7. لتفعيل نشر معاينات PR وتأكيد البناء التلقائي، اربط GitHub وفعّل workflow `/.github/workflows/ci.yml`.

### مزامنة تصميم Figma

- أضف متغيري البيئة `FIGMA_TOKEN` و`FIGMA_FILE_KEY` إلى Vercel وGitHub Secrets.
- ثم شغّل محليًا:

```bash
pnpm figma:sync
```

- سيولّد هذا الأمر تلقائيًا:
  - `src/styles/figma-tokens.css`
  - `figma/figma-file.json`

- لتحديث التصميم أوتوماتيكياً، فعّل workflow `/.github/workflows/figma-sync.yml`.

### GitHub Actions CI

يحتوي المشروع الآن على إعداد نشر CI جاهز في `/.github/workflows/ci.yml`.

- البناء يتم تلقائياً على كل `push` و`pull_request`
- معاينات Vercel تُنشر لكل PR
- النشر النهائي يتم تلقائياً عند الدمج إلى الفرع الرئيسي

### التحقق النهائي

- تأكد أن الصفحة الرئيسية تعمل على `https://smartportsco.com`
- تحقق من عرض البيانات التعريفية (`og:title`, `meta description`) في مصدر الصفحة
- تأكد أن `robots.txt` يعيد `Allow: /` و `Sitemap` صحيح
- تأكد أن النموذج في قسم الاتصال يعمل ويرسل الطلبات بشكل صحيح

3. سجّل الدخول بالبريد وكلمة المرور
4. ستُنقل إلى لوحة التحكم

### 3. استقبال الطلبات

- العملاء يملؤون نموذج التواصل في الموقع
- تُخزن الطلبات في قاعدة البيانات
- تظهر إشعارات فورية في لوحة التحكم
- يمكنك متابعة وإدارة كل طلب

## 📊 API Endpoints

جميع الـ endpoints محمية بـ Authorization header (ما عدا إرسال الطلبات):

```
POST   /auth/login                    # تسجيل دخول
POST   /auth/signup                   # إنشاء مدير
POST   /contact-requests              # إرسال طلب (عام)
GET    /contact-requests              # جلب الطلبات (إداري)
GET    /contact-requests/:id          # تفاصيل طلب (إداري)
PUT    /contact-requests/:id          # تحديث طلب (إداري)
POST   /appointments                  # إنشاء موعد (إداري)
GET    /appointments                  # جلب المواعيد (إداري)
GET    /notifications                 # جلب الإشعارات (إداري)
PUT    /notifications/:id/read        # تحديد كمقروء (إداري)
GET    /stats                         # الإحصائيات (إداري)
```

راجع `ADMIN_GUIDE.md` للتفاصيل الكاملة.

## 🔐 الأمان

- ✅ Supabase Authentication (JWT)
- ✅ Row Level Security (RLS)
- ✅ CORS محدود
- ✅ Validation للمدخلات
- ✅ حماية جميع الـ endpoints الإدارية

## 📱 معلومات الاتصال

📞 **الهاتف:** +966 66 777 0832  
📧 **البريد:** info@smartportsco.com  
🌐 **الموقع:** smartportsco.com  
📍 **الموقع:** الرياض، المملكة العربية السعودية

## 📚 الوثائق

- `README.md` - هذا الملف
- `ADMIN_GUIDE.md` - دليل لوحة التحكم الكامل
- `erp-crm-schema.txt` - Schema للترقية لنظام ERP/CRM

## 🔄 التحديثات المستقبلية

للترقية إلى نظام ERP/CRM كامل:

1. نفّذ Schema الموجود في `erp-crm-schema.txt`
2. فعّل الـ Realtime في Supabase
3. أضف وحدات المخزون والفواتير
4. قم بتطوير تطبيق موبايل

## 📄 الترخيص

© 2026 المنافذ الذكية المحدودة. جميع الحقوق محفوظة.
