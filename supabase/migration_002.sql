-- Moucara Adventures — migration 002
-- Adds roles/multi-admin, moderated customer reviews, and package date-blocking.
-- Run this once in the Supabase SQL editor, AFTER schema.sql, on the already-live project.

-- ── admin_profiles (roles) ──────────────────────────────────
create table if not exists admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'staff' check (role in ('owner', 'staff')),
  created_at timestamptz default now()
);

alter table admin_profiles enable row level security;

-- Seed the existing owner account created earlier — without this row the
-- owner would be locked out the moment the policies below go live.
insert into admin_profiles (id, email, role)
values ('9a52a586-447f-4698-8570-13053785f170', 'moucara.adventuresltd@gmail.com', 'owner')
on conflict (id) do update set role = 'owner';

-- security definer: bypasses RLS internally so these checks don't recurse
-- into admin_profiles' own select policy.
create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (select 1 from admin_profiles where id = auth.uid());
$$;

create or replace function is_owner()
returns boolean
language sql
security definer
stable
as $$
  select exists (select 1 from admin_profiles where id = auth.uid() and role = 'owner');
$$;

create policy "admin_profiles_select" on admin_profiles for select using (is_admin());
-- No insert/update/delete policy: those only ever happen server-side via the
-- service-role client in the /api/admin/users routes, never from the browser.

-- ── tighten packages: staff can edit, only owner can create/delete ──
drop policy if exists "packages_auth_write" on packages;

create policy "packages_admin_update" on packages for update
  using (is_admin()) with check (is_admin());
create policy "packages_owner_insert" on packages for insert
  with check (is_owner());
create policy "packages_owner_delete" on packages for delete
  using (is_owner());

-- ── tighten testimonials/gallery_images/bookings to is_admin() ──
drop policy if exists "testimonials_auth_write" on testimonials;
create policy "testimonials_admin_write" on testimonials for all
  using (is_admin()) with check (is_admin());

drop policy if exists "gallery_images_auth_write" on gallery_images;
create policy "gallery_images_admin_write" on gallery_images for all
  using (is_admin()) with check (is_admin());

drop policy if exists "bookings_auth_select" on bookings;
drop policy if exists "bookings_auth_update" on bookings;
drop policy if exists "bookings_auth_delete" on bookings;
create policy "bookings_admin_select" on bookings for select using (is_admin());
create policy "bookings_admin_update" on bookings for update using (is_admin());
create policy "bookings_owner_delete" on bookings for delete using (is_owner());

-- ── customer reviews: moderation status on testimonials ──
alter table testimonials
  add column if not exists status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected'));

-- Existing seeded testimonials were owner-curated; keep them visible.
update testimonials set status = 'approved';

drop policy if exists "testimonials_public_select" on testimonials;
create policy "testimonials_public_select" on testimonials for select
  using (status = 'approved');
create policy "testimonials_public_insert" on testimonials for insert
  with check (status = 'pending');

-- ── package availability / date blocking ──
create table if not exists package_unavailable_dates (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  date date not null,
  reason text,
  created_at timestamptz default now(),
  unique (package_id, date)
);

alter table package_unavailable_dates enable row level security;

create policy "package_unavailable_dates_public_select" on package_unavailable_dates
  for select using (true);
create policy "package_unavailable_dates_admin_write" on package_unavailable_dates
  for all using (is_admin()) with check (is_admin());
