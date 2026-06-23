-- =====================================================================
-- Global MedAdmit Consultants — Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- =====================================================================

-- 1) PROFILES -----------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'student' check (role in ('student','admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Each user can read & update their own profile
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Admins can read all profiles
drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all" on public.profiles
  for select using (public.is_admin());

-- The email that should automatically become an admin on sign-up.
-- Change this if you want a different default admin address.
--   Default admin login → email: admin@globera.com
-- (You choose the password when you create the user — see step at bottom.)

-- Auto-create a profile row when a new auth user signs up.
-- If the email matches the default admin address, grant the admin role.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    case when lower(new.email) = 'admin@globera.com' then 'admin' else 'student' end
  )
  on conflict (id) do update
    set role = case when lower(new.email) = 'admin@globera.com' then 'admin' else public.profiles.role end;
  return new;
end;
$$;

-- Promote the default admin email even if the account already exists.
update public.profiles set role = 'admin'
where id in (select id from auth.users where lower(email) = 'admin@globera.com');

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2) LEADS / QUERIES ----------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  interest text not null default 'study' check (interest in ('study','work')),
  message text,
  source text not null default 'website' check (source in ('website','brochure')),
  status text not null default 'new' check (status in ('new','contacted','in_progress','closed')),
  created_at timestamptz not null default now()
);

-- If upgrading an existing project, add the column safely:
alter table public.leads add column if not exists source text not null default 'website';

alter table public.leads enable row level security;

-- Anyone (even anonymous visitors) can submit a lead
drop policy if exists "leads_insert_public" on public.leads;
create policy "leads_insert_public" on public.leads
  for insert with check (true);

-- Logged-in users can see their own leads
drop policy if exists "leads_select_own" on public.leads;
create policy "leads_select_own" on public.leads
  for select using (auth.uid() = user_id);

-- Admins can read & manage all leads
drop policy if exists "leads_admin_select" on public.leads;
create policy "leads_admin_select" on public.leads
  for select using (public.is_admin());

drop policy if exists "leads_admin_update" on public.leads;
create policy "leads_admin_update" on public.leads
  for update using (public.is_admin());

drop policy if exists "leads_admin_delete" on public.leads;
create policy "leads_admin_delete" on public.leads
  for delete using (public.is_admin());


-- 3) GALLERY ------------------------------------------------------------
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  caption text,
  image_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery enable row level security;

-- Public can view gallery
drop policy if exists "gallery_select_public" on public.gallery;
create policy "gallery_select_public" on public.gallery
  for select using (true);

-- Admins manage gallery
drop policy if exists "gallery_admin_insert" on public.gallery;
create policy "gallery_admin_insert" on public.gallery
  for insert with check (public.is_admin());

drop policy if exists "gallery_admin_update" on public.gallery;
create policy "gallery_admin_update" on public.gallery
  for update using (public.is_admin());

drop policy if exists "gallery_admin_delete" on public.gallery;
create policy "gallery_admin_delete" on public.gallery
  for delete using (public.is_admin());


-- 4) EVENTS / SEMINARS --------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  event_date date not null,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

drop policy if exists "events_select_public" on public.events;
create policy "events_select_public" on public.events
  for select using (true);

drop policy if exists "events_admin_insert" on public.events;
create policy "events_admin_insert" on public.events
  for insert with check (public.is_admin());

drop policy if exists "events_admin_update" on public.events;
create policy "events_admin_update" on public.events
  for update using (public.is_admin());

drop policy if exists "events_admin_delete" on public.events;
create policy "events_admin_delete" on public.events
  for delete using (public.is_admin());


-- 4b) GLOBAL VISITOR COUNTER -------------------------------------------
-- A single-row counter shared by every visitor.
create table if not exists public.site_stats (
  id int primary key default 1,
  visits bigint not null default 0,
  constraint site_stats_singleton check (id = 1)
);

insert into public.site_stats (id, visits)
values (1, 0)
on conflict (id) do nothing;

alter table public.site_stats enable row level security;

-- Everyone can read the current count.
drop policy if exists "site_stats_select_public" on public.site_stats;
create policy "site_stats_select_public" on public.site_stats
  for select using (true);

-- Atomically increment the counter and return the new total.
-- SECURITY DEFINER so anonymous visitors can bump it without table-write rights.
create or replace function public.increment_visits()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_total bigint;
begin
  update public.site_stats
    set visits = visits + 1
    where id = 1
    returning visits into new_total;
  return new_total;
end;
$$;

grant execute on function public.increment_visits() to anon, authenticated;


-- 5) STORAGE BUCKET for gallery images ---------------------------------
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "gallery_storage_read" on storage.objects;
create policy "gallery_storage_read" on storage.objects
  for select using (bucket_id = 'gallery');

drop policy if exists "gallery_storage_write" on storage.objects;
create policy "gallery_storage_write" on storage.objects
  for insert with check (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "gallery_storage_delete" on storage.objects;
create policy "gallery_storage_delete" on storage.objects
  for delete using (bucket_id = 'gallery' and public.is_admin());


-- =====================================================================
-- DEFAULT ADMIN ACCOUNT — one-time setup
-- ---------------------------------------------------------------------
-- 1) In the Supabase Dashboard → Authentication → Users → "Add user"
--      Email:    admin@globera.com
--      Password: <choose a strong password>     ← this becomes your admin login
--      ✔ Auto Confirm User
--    (Email + password is the only secret; we never hardcode it in code.)
--
-- 2) Re-run this whole schema (or just the UPDATE above). The trigger and the
--    promote-statement set that account's role to 'admin' automatically.
--
-- 3) Log in at  /admin/login  with admin@globera.com and your password.
--
-- Students simply use /signup and /login — they get the 'student' role and
-- land on /dashboard. Only admin@globera.com (or anyone you later promote)
-- can open the /admin panel.
--
-- To promote any other existing user to admin later:
--   update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'you@example.com');
-- =====================================================================
