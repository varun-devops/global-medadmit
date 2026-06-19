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

-- Auto-create a profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

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
-- AFTER you create your own account via the website /signup page,
-- promote yourself to admin by running (replace the email):
--
--   update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'you@example.com');
-- =====================================================================
