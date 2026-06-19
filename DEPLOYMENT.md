# 🚀 Full Guide: Database → Run Locally → GitHub → Vercel → Live

This walks you through everything from zero to a live website. Follow the parts in order.
Total time: ~30–40 minutes the first time.

---

## Part 1 — Set up the database (Supabase)

Supabase gives you a free Postgres database + login system + file storage.

### 1.1 Create the project
1. Go to <https://supabase.com> and sign up (use Google/GitHub for speed).
2. Click **New project**.
3. Fill in:
   - **Name:** `global-medadmit` (anything)
   - **Database Password:** click *Generate*, then **copy & save it somewhere** (you may need it later).
   - **Region:** pick the one closest to your users (e.g. *Mumbai* / *Singapore* for India).
4. Click **Create new project** and wait ~2 minutes while it provisions.

### 1.2 Run the database setup script
1. In the left sidebar, click **SQL Editor**.
2. Click **+ New query**.
3. Open the file [`supabase-schema.sql`](./supabase-schema.sql) from this project, copy **everything**, and paste it into the editor.
4. Click **Run** (or press Ctrl+Enter). You should see **“Success. No rows returned.”**

This creates your tables (`profiles`, `leads`, `gallery`, `events`), the photo storage bucket, and all the security rules.

### 1.3 Copy your API keys
1. In the sidebar go to **Project Settings** (gear icon) → **API**.
2. Keep this tab open — you'll copy two values in the next part:
   - **Project URL** (looks like `https://abcdxyz.supabase.co`)
   - **Project API keys → `anon` `public`** (a long string starting with `eyJ...`)

---

## Part 2 — Run it on your computer

### 2.1 Install Node.js (one time only)
If you don't have it: download the **LTS** version from <https://nodejs.org> and install it.
Verify in a terminal:
```bash
node -v    # should print v20.x or higher
```

### 2.2 Install the project
Open a terminal **in the project folder** (`d:\websitem\Consulting`) and run:
```bash
npm install
```

### 2.3 Add your environment variables
1. Make a copy of the example file and name it `.env.local`:
   ```bash
   # Windows PowerShell
   Copy-Item .env.local.example .env.local
   ```
2. Open `.env.local` and paste the two values from **Part 1.3**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdxyz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi....(your long anon key)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   *(Leave the Resend email lines blank for now — they're optional, covered in Part 5.)*

### 2.4 Start the site
```bash
npm run dev
```
Open <http://localhost:3000> in your browser. 🎉 The site is running.

### 2.5 Make yourself the admin
1. On the site, click **Login → Sign Up** and create an account with your email.
2. Go back to Supabase → **SQL Editor → New query**, paste this (use **your** email), and **Run**:
   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'you@example.com');
   ```
3. Refresh the website. An **Admin** button now appears in the header → visit `/admin` to manage
   queries, gallery and events.

---

## Part 3 — Put the code on GitHub

### 3.1 Create a GitHub account & repo
1. Sign up / log in at <https://github.com>.
2. Click **+ (top right) → New repository**.
3. Name it `global-medadmit`, keep it **Private** (or Public), **do NOT** tick “Add a README”.
4. Click **Create repository**. Leave the page open — it shows commands.

### 3.2 Push your code
In a terminal in the project folder, run these one by one (replace `YOUR-USERNAME`):
```bash
git init
git add .
git commit -m "Initial commit: Global MedAdmit website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/global-medadmit.git
git push -u origin main
```
> If git asks you to log in, follow the browser prompt. The `.gitignore` already prevents your
> secret `.env.local` and `node_modules` from being uploaded — good.

Refresh your GitHub repo page; your files should appear.

---

## Part 4 — Deploy to Vercel (go live)

Vercel hosts Next.js sites for free and connects directly to GitHub.

### 4.1 Import the project
1. Go to <https://vercel.com> and **Sign up with GitHub**.
2. Click **Add New… → Project**.
3. Find `global-medadmit` in the list and click **Import**.

### 4.2 Add your environment variables
Before deploying, expand **Environment Variables** and add these three (copy values from your `.env.local`):

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://abcdxyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` *(you can update this after the first deploy)* |

*(If you set up email in Part 5, also add `RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL`, `RESEND_FROM_EMAIL`.)*

### 4.3 Deploy
1. Click **Deploy** and wait ~2 minutes.
2. When it finishes you'll get a live URL like `https://global-medadmit.vercel.app`. **That's your live site!** 🌍

### 4.4 Finishing touches
1. Copy your real live URL, go to Vercel → **Settings → Environment Variables**, update
   `NEXT_PUBLIC_SITE_URL` to it, then **Redeploy** (Deployments tab → … → Redeploy). This makes SEO/sitemap use the correct domain.
2. **Allow your domain in Supabase:** Supabase → **Authentication → URL Configuration** →
   set **Site URL** to your Vercel URL and add it under **Redirect URLs**. This keeps login working in production.

### 4.5 Automatic updates
From now on, every time you push to GitHub:
```bash
git add .
git commit -m "describe your change"
git push
```
Vercel automatically rebuilds and updates the live site. No manual steps.

---

## Part 4.6 — Admin login & admin subdomain

### Admin account (already created)
An admin account is ready to use:

| Field | Value |
|-------|-------|
| Email | `admin@gmail.com` |
| Password | `admin1234` |

Log in at `/login`, then open `/admin` to manage everything (queries, gallery, events).
**Change this password soon:** Supabase → **Authentication → Users** → click the user → reset password.

> Why not `1234`? Supabase enforces a 6-character minimum, so `admin1234` is used.

### Make `admin.yourdomain.com` open the admin panel
The code already routes any **`admin.`** subdomain straight to the admin panel. To enable it you
need a custom domain (the free `*.vercel.app` URL can't have custom subdomains):

1. Buy a domain (e.g. from Namecheap/GoDaddy) — or use one you own.
2. In Vercel → your project → **Settings → Domains**, add **both**:
   - `yourdomain.com` (the main site)
   - `admin.yourdomain.com` (the admin entrance)
   Vercel shows the DNS records to add at your domain registrar. Add them and wait for verification.
3. Done. `https://admin.yourdomain.com` now lands on the admin login → panel, while
   `https://yourdomain.com` shows the normal website.

**Test it locally:** the same logic works at <http://admin.localhost:3000> (most browsers resolve
`*.localhost` automatically) while the public site stays at <http://localhost:3000>.

---

## Part 5 — (Optional) Email notifications for new inquiries

Get an email whenever a student submits a query or downloads the brochure.

1. Sign up free at <https://resend.com>.
2. **API Keys → Create API Key**, copy it.
3. Add these env vars in **both** `.env.local` (local) **and** Vercel (production):
   ```
   RESEND_API_KEY=re_xxxxxxxx
   ADMIN_NOTIFICATION_EMAIL=where-you-want-emails@gmail.com
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```
   - `onboarding@resend.dev` works immediately for testing.
   - To send from your own domain (e.g. `info@yourdomain.com`), verify the domain in Resend
     (**Domains → Add Domain** and add the DNS records it shows), then put that address here.
4. Redeploy on Vercel. Done — inquiries still save to the database even if email is off.

---

## Part 6 — Customize before launch

| What | Where |
|------|-------|
| Phone, WhatsApp number, email, address | `src/lib/data.ts` → `contactInfo` |
| Countries / universities / testimonials | `src/lib/data.ts` |
| All text (EN/RU/HI) | `src/lib/i18n/dictionaries.ts` |
| Brand colors | `src/app/globals.css` (the `@theme` block) |
| Brochure PDF | replace `public/brochure.pdf` with your own (keep the same filename) |
| Logo | currently a stethoscope icon in `src/components/Header.tsx` |

> ⚠️ Verify the NMC/WHO recognitions in the sample university data against current official
> listings before publishing — they are placeholders.

---

## Troubleshooting

| Problem | Fix |
|--------|-----|
| Login/signup does nothing | Check the two `NEXT_PUBLIC_SUPABASE_*` values are correct and you ran the SQL script. |
| “Admin access required” | Run the `update ... set role = 'admin'` SQL from Part 2.5, then reload. |
| Gallery/events upload fails | Make sure you ran the **full** `supabase-schema.sql` (it creates the storage bucket + policies). |
| Build fails on Vercel | Confirm all env vars are added in Vercel project settings, then redeploy. |
| Images don't load | External images use `images.unsplash.com` / `*.supabase.co`, already allowed in `next.config.ts`. |
