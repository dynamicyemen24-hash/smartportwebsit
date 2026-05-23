## إعداد بيئة التطوير المحلية — SmartPorts Website

خطوات سريعة لإعداد المشروع محلياً وتشغيله داخل VS Code.

1. تثبيت `pnpm` (مطلوب):

PowerShell (Windows):

```powershell
npm install -g pnpm
# أو دون صلاحيات أدمن:
corepack enable
corepack prepare pnpm@latest --activate
```

Unix / macOS:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
# أو عبر corepack
corepack enable
corepack prepare pnpm@latest --activate
```

2. استيراد المتغيرات البيئية

- انسخ `.env.example` إلى `.env` واملأ القيم الحقيقية: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `FIGMA_TOKEN`, `FIGMA_FILE_KEY`, `VERCEL_TOKEN`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`، الخ.

3. تثبيت الحزم:

```bash
pnpm install
```

4. تشغيل سيرفر التطوير (أو استخدم Debug في VS Code):

```bash
pnpm dev
# أو لبناء ومعاينة إنتاجية
pnpm build
pnpm preview --host 0.0.0.0
```

5. تشغيل من داخل VS Code

- افتح `Run and Debug` ثم اختر التكوين `Dev: Launch Chrome + Vite` (سيشغّل `pnpm dev` ثم يفتح المتصفح على `http://localhost:5173`).

6. نشر الدوال (Supabase Functions)

- تأكد من إعداد `SUPABASE_SERVICE_ROLE_KEY` و `SUPABASE_URL` في بيئة السيرفر. اتبع ملف `supabase/functions` لديك لنشر الدالة `make-server-88c8b05a` في مشروع Supabase.

7. مهام CI/CD

- هذا المشروع يحتوي على workflows في `.github/workflows/` (مثل `ci.yml`, `vercel-deploy.yml`, `supabase-deploy.yml`). اضبط مفاتيح Vercel وSupabase في Secrets للمستودع لإتمام النشر.

إذا ترغب، أضيف سكربت نشر آلي (GitHub Action) أو أكمّل إعدادات الـ CI/CD وفق بوابة الدفع أو بيئة الاستضافة التي تفضّلها.

---

## CI/CD وملفات النشر الآلي

قمت بإضافة workflows جاهزة داخل المجلد `.github/workflows/` لتسهيل الدمج والنشر المحترف:

- `ci.yml` — يشتغل على كل PR أو دفع إلى `main`، ويقوم بتثبيت الحزم، بناء المشروع، وملف TypeScript typecheck.
- `vercel-deploy.yml` — يبني المشروع ثم ينشره إلى Vercel عند الدفع إلى `main` (يستخدم `VERCEL_TOKEN`).
- `supabase-deploy.yml` — ينشر دوال Supabase عندما تتغير الملفات ضمن مجلد `supabase/` أو عند التشغيل اليدوي.

### أسرار GitHub المطلوبة

لجعل النشر يعمل بشكل آمن، أضف هذه القيم في `Settings -> Secrets and variables -> Actions`:

- `VERCEL_TOKEN` — توكن نشر Vercel (مطلوب)
- `VERCEL_PROJECT_ID` — معرف المشروع في Vercel (مستحسن)
- `VERCEL_ORG_ID` — معرف المنظمة في Vercel (مستحسن)
- `SUPABASE_ACCESS_TOKEN` — توكن لنشر عبر Supabase CLI (مطلوب لنشر الدوال)
- `SUPABASE_PROJECT_ID` — project ref (مثل `tnzlusiymgdvsqfufmme`)
- `STRIPE_SECRET_KEY` — مفتاح Stripe السري الخاص بالبيئة الإنتاجية أو التجريبية
- `STRIPE_PUBLISHABLE_KEY` — مفتاح Stripe العام للواجهة

ملاحظات أمنية: لا تحفظ أي مفاتيح أو أسرار في المستودع مباشرة؛ استخدم GitHub Secrets أو بيئة الاستضافة لإدارة القيم الإنتاجية.

### تشغيل يدوي من CI

يمكنك أيضًا تشغيل أي من الـ workflows يدوياً من واجهة GitHub (Actions -> اسم الـ workflow -> Run workflow) وتحديد الفرع أو المتغيرات المطلوبة.

إذا أحببت، أستطيع الآن:

- إضافة اختبار بسيط لواجهة المستخدم، أو
- إضافة ملف `README-deploy.md` مفصّل بخطوات إضافة Secrets وربط Vercel وSupabase.
