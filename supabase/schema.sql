-- =====================================================================
-- BrandoraX — Supabase Schema & Auto-Sync
-- Run this once in: Supabase Dashboard → SQL Editor → New query → Run
-- =====================================================================

-- ---------- 1. Tables ----------
create table if not exists public.admins (
  email       text primary key,
  role        text not null default 'admin',
  created_at  timestamptz not null default now()
);

-- Seed root administrator (You can add any other admin emails anytime!)
insert into public.admins (email, role)
values ('okikeenterprises@gmail.com', 'admin')
on conflict (email) do nothing;

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null default '',
  email       text not null default '',
  phone       text default '',
  country     text default 'Nigeria',
  role        text not null default 'student' check (role in ('student','admin','tutor')),
  avatar_url  text default '',
  created_at  timestamptz not null default now()
);

-- Backwards compatibility migrations
alter table public.profiles add column if not exists avatar_url text default '';
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('student','admin','tutor'));

create table if not exists public.enrollments (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  track_id        text not null,
  cohort          text not null default 'Cohort 1 (Alpha)',
  payment_plan    text not null default 'upfront' check (payment_plan in ('upfront','installment')),
  payment_status  text not null default 'pending' check (payment_status in ('pending','awaiting_confirmation','partial','paid')),
  amount_paid     numeric not null default 0,
  telegram_joined boolean not null default false,
  status          text not null default 'active' check (status in ('active','paused','completed')),
  created_at      timestamptz not null default now()
);

create table if not exists public.sessions (
  id          uuid primary key default gen_random_uuid(),
  track_id    text,                       -- null = open to all tracks
  title       text not null,
  description text default '',
  starts_at   timestamptz not null,
  meet_url    text default 'https://meet.google.com',
  created_at  timestamptz not null default now()
);

create table if not exists public.submissions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  track_id     text not null,
  sprint_index int  not null,
  title        text not null default '',
  url          text not null,
  note         text default '',
  status       text not null default 'submitted' check (status in ('submitted','approved','changes_requested')),
  feedback     text default '',
  created_at   timestamptz not null default now(),
  unique (user_id, track_id, sprint_index)
);

create table if not exists public.announcements (
  id         uuid primary key default gen_random_uuid(),
  track_id   text,                        -- null = everyone
  title      text not null,
  body       text not null,
  created_at timestamptz not null default now()
);

-- Bank details shown to students (managed by admin in dashboard)
create table if not exists public.payment_settings (
  id             int primary key default 1 check (id = 1),
  bank_name      text default '',
  account_name   text default '',
  account_number text default '',
  instructions   text default 'Transfer the tuition amount, then click "I have paid" on your dashboard. An admin will confirm within 24 hours.',
  updated_at     timestamptz not null default now()
);
insert into public.payment_settings (id) values (1) on conflict do nothing;

-- ---------- 2. Helper: Is Current User An Admin? ----------
-- Dynamic: Checks public.admins table by email (No RLS recursion!)
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ---------- 3. Admin Management RPC Functions ----------
-- Allows any existing administrator to promote/demote other users
create or replace function public.promote_user_to_admin(target_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Unauthorized: Only administrators can grant admin privileges.';
  end if;

  insert into public.admins (email, role)
  values (lower(trim(target_email)), 'admin')
  on conflict (email) do update set role = 'admin';

  update public.profiles
  set role = 'admin'
  where lower(email) = lower(trim(target_email));
end;
$$;

create or replace function public.demote_user_to_student(target_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Unauthorized: Only administrators can revoke admin privileges.';
  end if;

  if lower(trim(target_email)) = 'okikeenterprises@gmail.com' then
    raise exception 'Root administrator okikeenterprises@gmail.com cannot be removed.';
  end if;

  delete from public.admins where lower(email) = lower(trim(target_email));

  update public.profiles
  set role = 'student'
  where lower(email) = lower(trim(target_email));
end;
$$;

-- ---------- 4. Auto-create Profile + Enrollment on Signup ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_track text;
  v_plan text;
begin
  -- Check if user was pre-registered as an admin
  if exists (select 1 from public.admins where lower(email) = lower(new.email)) then
    v_role := 'admin';
  else
    v_role := 'student';
  end if;

  v_track := coalesce(new.raw_user_meta_data->>'track_id', 'web-dev');
  v_plan  := coalesce(new.raw_user_meta_data->>'payment_plan', 'upfront');

  insert into public.profiles (id, full_name, email, phone, country, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'country', 'Nigeria'),
    v_role
  )
  on conflict (id) do update set
    full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name),
    email     = coalesce(nullif(excluded.email, ''), public.profiles.email),
    phone     = coalesce(nullif(excluded.phone, ''), public.profiles.phone),
    country   = coalesce(nullif(excluded.country, ''), public.profiles.country);

  -- Always create enrollment for students
  insert into public.enrollments (user_id, track_id, payment_plan, cohort, payment_status, amount_paid, status)
  values (
    new.id,
    v_track,
    v_plan,
    'Cohort 1 (Alpha)',
    'pending',
    0,
    'active'
  )
  on conflict do nothing;

  return new;
exception
  when others then
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- 5. Row Level Security Policies ----------
alter table public.admins           enable row level security;
alter table public.profiles         enable row level security;
alter table public.enrollments      enable row level security;
alter table public.sessions         enable row level security;
alter table public.submissions      enable row level security;
alter table public.announcements    enable row level security;
alter table public.payment_settings enable row level security;

-- Admins Table
drop policy if exists "admins read signed in" on public.admins;
drop policy if exists "admins modify admin"   on public.admins;
create policy "admins read signed in" on public.admins for select using (auth.uid() is not null);
create policy "admins modify admin"   on public.admins for all using (public.is_admin()) with check (public.is_admin());

-- Profiles
drop policy if exists "profiles read own or admin"  on public.profiles;
drop policy if exists "profiles insert own or admin" on public.profiles;
drop policy if exists "profiles update own"         on public.profiles;
drop policy if exists "profiles admin update"       on public.profiles;
create policy "profiles read own or admin" on public.profiles for select
  using (id = auth.uid() or public.is_admin());
create policy "profiles insert own or admin" on public.profiles for insert
  with check (id = auth.uid() or public.is_admin());
create policy "profiles update own" on public.profiles for update
  using (id = auth.uid());
create policy "profiles admin update" on public.profiles for update
  using (public.is_admin());

-- Enrollments
drop policy if exists "enrollments read own or admin" on public.enrollments;
drop policy if exists "enrollments insert own or admin" on public.enrollments;
drop policy if exists "enrollments update own"        on public.enrollments;
drop policy if exists "enrollments admin all"         on public.enrollments;
create policy "enrollments read own or admin" on public.enrollments for select
  using (user_id = auth.uid() or public.is_admin());
create policy "enrollments insert own or admin" on public.enrollments for insert
  with check (user_id = auth.uid() or public.is_admin());
create policy "enrollments update own" on public.enrollments for update
  using (user_id = auth.uid());
create policy "enrollments admin all" on public.enrollments for all
  using (public.is_admin()) with check (public.is_admin());

-- Sessions & Announcements
drop policy if exists "sessions read"  on public.sessions;
drop policy if exists "sessions admin" on public.sessions;
create policy "sessions read"  on public.sessions for select using (auth.uid() is not null);
create policy "sessions admin" on public.sessions for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "announcements read"  on public.announcements;
drop policy if exists "announcements admin" on public.announcements;
create policy "announcements read"  on public.announcements for select using (auth.uid() is not null);
create policy "announcements admin" on public.announcements for all using (public.is_admin()) with check (public.is_admin());

-- Submissions
drop policy if exists "submissions read own or admin" on public.submissions;
drop policy if exists "submissions insert own"        on public.submissions;
drop policy if exists "submissions update own"        on public.submissions;
drop policy if exists "submissions admin all"         on public.submissions;
create policy "submissions read own or admin" on public.submissions for select
  using (user_id = auth.uid() or public.is_admin());
create policy "submissions insert own" on public.submissions for insert
  with check (user_id = auth.uid());
create policy "submissions update own" on public.submissions for update
  using (user_id = auth.uid());
create policy "submissions admin all" on public.submissions for all
  using (public.is_admin()) with check (public.is_admin());

-- Payment Settings
drop policy if exists "payment_settings read"  on public.payment_settings;
drop policy if exists "payment_settings admin" on public.payment_settings;
create policy "payment_settings read"  on public.payment_settings for select using (auth.uid() is not null);
create policy "payment_settings admin" on public.payment_settings for all using (public.is_admin()) with check (public.is_admin());

-- ---------- 6. Automatic Backfill for Existing Users ----------
-- If students registered before running this schema, this brings them into profiles and enrollments instantly!
insert into public.profiles (id, full_name, email, phone, country, role)
select 
  u.id,
  coalesce(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)),
  coalesce(u.email, ''),
  coalesce(u.raw_user_meta_data->>'phone', ''),
  coalesce(u.raw_user_meta_data->>'country', 'Nigeria'),
  case 
    when exists (select 1 from public.admins a where lower(a.email) = lower(u.email)) then 'admin'
    else 'student'
  end
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id)
on conflict (id) do update set
  email = excluded.email;

insert into public.enrollments (user_id, track_id, payment_plan, cohort, payment_status, amount_paid, status)
select 
  u.id,
  coalesce(u.raw_user_meta_data->>'track_id', 'web-dev'),
  coalesce(u.raw_user_meta_data->>'payment_plan', 'upfront'),
  'Cohort 1 (Alpha)',
  'pending',
  0,
  'active'
from auth.users u
where not exists (select 1 from public.enrollments e where e.user_id = u.id)
on conflict do nothing;

-- ---------- 7. Storage Bucket & Policies for Avatars ----------
-- Creates public bucket for user profile avatars
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;

drop policy if exists "Avatars are publicly viewable" on storage.objects;
drop policy if exists "Users can upload their own avatar" on storage.objects;
drop policy if exists "Users can update their own avatar" on storage.objects;
drop policy if exists "Users can delete their own avatar" on storage.objects;

create policy "Avatars are publicly viewable"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update their own avatar"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own avatar"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
