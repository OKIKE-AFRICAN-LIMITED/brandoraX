-- =====================================================================
-- BrandoraX — Supabase schema
-- Run this once in: Supabase Dashboard → SQL Editor → New query → Run
-- =====================================================================

-- ---------- Tables ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null default '',
  email       text not null default '',
  phone       text default '',
  country     text default 'Nigeria',
  role        text not null default 'student' check (role in ('student','admin')),
  created_at  timestamptz not null default now()
);

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

-- Single-row table: bank details shown to students (managed by admin)
create table if not exists public.payment_settings (
  id             int primary key default 1 check (id = 1),
  bank_name      text default '',
  account_name   text default '',
  account_number text default '',
  instructions   text default 'Transfer the tuition amount, then click "I have paid" on your dashboard. An admin will confirm within 24 hours.',
  updated_at     timestamptz not null default now()
);
insert into public.payment_settings (id) values (1) on conflict do nothing;

-- ---------- Helper: is current user an admin? ----------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- ---------- Auto-create profile + enrollment when a user signs up ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, phone, country)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name',''),
    coalesce(new.email,''),
    coalesce(new.raw_user_meta_data->>'phone',''),
    coalesce(new.raw_user_meta_data->>'country','Nigeria')
  );

  if new.raw_user_meta_data ? 'track_id' then
    insert into public.enrollments (user_id, track_id, payment_plan)
    values (
      new.id,
      new.raw_user_meta_data->>'track_id',
      coalesce(new.raw_user_meta_data->>'payment_plan','upfront')
    );
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Row Level Security ----------
alter table public.profiles         enable row level security;
alter table public.enrollments      enable row level security;
alter table public.sessions         enable row level security;
alter table public.submissions      enable row level security;
alter table public.announcements    enable row level security;
alter table public.payment_settings enable row level security;

-- profiles
drop policy if exists "profiles read own or admin"  on public.profiles;
drop policy if exists "profiles update own"         on public.profiles;
drop policy if exists "profiles admin update"       on public.profiles;
create policy "profiles read own or admin" on public.profiles for select
  using (id = auth.uid() or public.is_admin());
-- students can edit their own details but never change their role
create policy "profiles update own" on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));
create policy "profiles admin update" on public.profiles for update
  using (public.is_admin());

-- enrollments
drop policy if exists "enrollments read own or admin" on public.enrollments;
drop policy if exists "enrollments update own"        on public.enrollments;
drop policy if exists "enrollments admin all"         on public.enrollments;
create policy "enrollments read own or admin" on public.enrollments for select
  using (user_id = auth.uid() or public.is_admin());
-- students may only flag "awaiting_confirmation" and Telegram; admins do the rest
create policy "enrollments update own" on public.enrollments for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and payment_status in ('pending','awaiting_confirmation')
              and amount_paid = (select amount_paid from public.enrollments e where e.id = enrollments.id));
create policy "enrollments admin all" on public.enrollments for all
  using (public.is_admin()) with check (public.is_admin());

-- sessions & announcements: any signed-in user reads, admin writes
drop policy if exists "sessions read"  on public.sessions;
drop policy if exists "sessions admin" on public.sessions;
create policy "sessions read"  on public.sessions for select using (auth.uid() is not null);
create policy "sessions admin" on public.sessions for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "announcements read"  on public.announcements;
drop policy if exists "announcements admin" on public.announcements;
create policy "announcements read"  on public.announcements for select using (auth.uid() is not null);
create policy "announcements admin" on public.announcements for all using (public.is_admin()) with check (public.is_admin());

-- submissions
drop policy if exists "submissions read own or admin" on public.submissions;
drop policy if exists "submissions insert own"        on public.submissions;
drop policy if exists "submissions update own"        on public.submissions;
drop policy if exists "submissions admin all"         on public.submissions;
create policy "submissions read own or admin" on public.submissions for select
  using (user_id = auth.uid() or public.is_admin());
create policy "submissions insert own" on public.submissions for insert
  with check (user_id = auth.uid() and status = 'submitted');
create policy "submissions update own" on public.submissions for update
  using (user_id = auth.uid()) with check (user_id = auth.uid() and status = 'submitted');
create policy "submissions admin all" on public.submissions for all
  using (public.is_admin()) with check (public.is_admin());

-- payment settings: signed-in users read, admin writes
drop policy if exists "payment_settings read"  on public.payment_settings;
drop policy if exists "payment_settings admin" on public.payment_settings;
create policy "payment_settings read"  on public.payment_settings for select using (auth.uid() is not null);
create policy "payment_settings admin" on public.payment_settings for all using (public.is_admin()) with check (public.is_admin());

-- =====================================================================
-- MAKE YOUR FIRST ADMIN
-- 1) Sign up normally on the site (or Authentication → Users → Add user).
-- 2) Then run this, replacing the email:
--
--   update public.profiles set role = 'admin' where email = 'you@example.com';
-- =====================================================================
