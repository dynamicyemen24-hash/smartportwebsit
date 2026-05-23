# 🚀 تعليمات النشر الفوري

## الطريقة 1: النشر عبر Vercel Dashboard (موصى به)

### الخطوة 1: اذهب إلى Vercel
1. افتح https://vercel.com/new
2. سجّل الدخول بحسابك

### الخطوة 2: استيراد المشروع
1. اضغط "Import Git Repository"
2. اختر المستودع من GitHub/GitLab/Bitbucket
3. أو قم بسحب وإفلات مجلد المشروع

### الخطوة 3: الإعداد
1. **Framework Preset:** اختر "Vite"
2. **Build Command:** `pnpm build` أو `npm run build`
3. **Output Directory:** `dist`
4. **Install Command:** `pnpm install` أو `npm install`

### الخطوة 4: متغيرات البيئة
أضف المتغيرات التالية في Vercel Dashboard:

```
# Supabase
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Analytics (اختياري)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# reCAPTCHA (اختياري)
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key

# Site URL
VITE_APP_SITE_URL=https://smartportsco.com
```

### الخطوة 5: النشر
1. اضغط "Deploy"
2. انتظر حتى يكتمل البناء (~2-3 دقائق)
3. ستحصل على رابط النشر: `https://your-project.vercel.app`

### الخطوة 6: ربط النطاق (اختياري)
1. اذهب إلى Settings → Domains
2. أضف `smartportsco.com`
3. اتبع تعليمات DNS

---

## الطريقة 2: النشر عبر Vercel CLI

```bash
# 1. تثبيت Vercel CLI
npm install -g vercel

# 2. تسجيل الدخول
vercel login

# 3. الانتقال لمجلد المشروع
cd g:\App25\smartportwebsit

# 4. النشر
vercel --prod
```

---

## الطريقة 3: النشر على استضافات أخرى

### Netlify
1. اذهب إلى https://app.netlify.com/drop
2. اسحب وأفلت مجلد `dist`
3. سيتم النشر فوراً

### Cloudflare Pages
1. اذهب إلى https://pages.cloudflare.com
2. Connect to Git أو ارفع مجلد dist
3. Build command: `pnpm build`
4. Build output: `dist`

---

## 📊 بعد النشر

### تحقق من:
- [ ] الموقع يعمل على الرابط
- [ ] جميع الصفحات تظهر
- [ ] نموذج الاتصال يعمل
- [ ] Live Chat يظهر
- [ ] الأداء جيد

### أدوات التحقق:
- **PageSpeed:** https://pagespeed.web.dev/
- **Meta Tags:** https://metatags.io/
- **Structured Data:** https://search.google.com/structured-data/testing-tool

---

## 🔗 الروابط المفيدة

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com
- **reCAPTCHA Admin:** https://www.google.com/recaptcha/admin

---

**ملاحظة:** بعد النشر الناجح، ستحصل على رابط مشابه لـ:
`https://smartportsco-xxxx.vercel.app`

أو بعد ربط النطاق:
`https://smartportsco.com`