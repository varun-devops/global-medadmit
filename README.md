# Global MedAdmit Consultants — Medical Study-Abroad Consulting Website

A full-stack, multilingual (English / Russian / Hindi) consulting website for a medical
education firm. Students get free counseling for MBBS abroad (Uzbekistan, Kyrgyzstan,
Georgia, Russia, Kazakhstan…) plus sponsored work-visa assistance for Europe.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design system in `globals.css`)
- **Supabase** — Postgres DB, Auth, Storage (free tier)
- **Framer Motion** — animations
- **lucide-react** — icons
- **react-hot-toast** — notifications

## Features

- 🏥 High-conversion landing page (hero + quick lead form, services, why-us, countries, universities, work-visa, testimonials, CTA)
- 🌐 Language switcher (EN / RU / HI) with instant client-side switching, persisted in `localStorage`
- 💬 Floating WhatsApp button with pre-filled message
- 📝 Lead / counseling inquiry form (saves to Supabase, works for anonymous visitors)
- 🔐 Auth: signup / login + student dashboard (track your inquiries)
- 🛠️ Admin panel: overview stats, manage queries (status + delete + WhatsApp/call), manage gallery (upload to Storage)
- 🖼️ Public gallery (DB-driven, with fallback images)
- 📅 Events & Seminars (DB-driven, upcoming/past split, admin-managed)
- 📄 Brochure download with email capture (lead saved before download)
- 📧 Optional email notifications to admin on every new inquiry (via Resend)
- 🔎 SEO: metadata, OpenGraph, JSON-LD, sitemap.xml, robots.txt
- 📱 Fully responsive (mobile / tablet / desktop)

## Setup

### 1. Install

```bash
npm install
```

### 2. Create a Supabase project (free)

1. Go to <https://supabase.com> → **New project**.
2. Once created, open **Project Settings → API** and copy:
   - **Project URL**
   - **anon / public** key

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Create the database schema

In the Supabase dashboard → **SQL Editor → New query**, paste the entire contents of
[`supabase-schema.sql`](./supabase-schema.sql) and click **Run**. This creates:

- `profiles` (with `student` / `admin` roles + auto-creation trigger)
- `leads` (counseling queries)
- `gallery` (+ a public `gallery` storage bucket)
- Row-Level Security policies for all tables.

### 5. Run

```bash
npm run dev
```

Open <http://localhost:3000>.

### 6. Make yourself an admin

1. Sign up on the site at `/signup`.
2. In Supabase **SQL Editor**, run (use your email):

   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'you@example.com');
   ```

3. Reload — an **Admin** link appears in the header. Visit `/admin`.

## Customize

- **Brand / phone / email / address:** `src/lib/data.ts` (`contactInfo`)
- **WhatsApp number:** `src/lib/data.ts` (`contactInfo.whatsapp`)
- **Countries / universities / testimonials:** `src/lib/data.ts`
- **All translatable text:** `src/lib/i18n/dictionaries.ts`
- **Colors / design tokens:** `src/app/globals.css` (`@theme`)

## Deploy

Deploy to **Vercel**: import the repo, add the same env vars in the project settings, and
set `NEXT_PUBLIC_SITE_URL` to your production domain. Supabase runs as-is (free tier).

> **Disclaimer:** University NMC/WHO recognitions in the sample data are indicative —
> verify against current official listings before publishing.
