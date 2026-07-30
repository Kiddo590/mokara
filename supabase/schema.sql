-- Moucara Adventures — Supabase schema
-- Run this once in the Supabase SQL editor (SQL Editor > New query).

create extension if not exists "pgcrypto";

-- ── packages ────────────────────────────────────────────────
create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tagline text,
  image text,
  gallery text[] default '{}',
  price numeric not null default 0,
  duration text,
  category text,
  destination text,
  rating numeric default 5,
  reviews int default 0,
  featured boolean default false,
  highlights text[] default '{}',
  description text,
  itinerary jsonb default '[]',
  included text[] default '{}',
  not_included text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── testimonials ────────────────────────────────────────────
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  avatar text,
  rating int default 5,
  package_title text,
  text text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ── gallery_images ──────────────────────────────────────────
create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  alt text,
  label text,
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ── bookings ────────────────────────────────────────────────
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  package_title text,
  name text not null,
  email text not null,
  phone text not null,
  travel_date date,
  travelers text,
  message text,
  status text not null default 'new',
  created_at timestamptz default now()
);

-- ── Row Level Security ──────────────────────────────────────
alter table packages enable row level security;
alter table testimonials enable row level security;
alter table gallery_images enable row level security;
alter table bookings enable row level security;

-- Public read access for site content
create policy "packages_public_select" on packages for select using (true);
create policy "testimonials_public_select" on testimonials for select using (true);
create policy "gallery_images_public_select" on gallery_images for select using (true);

-- Only the logged-in owner can write site content
create policy "packages_auth_write" on packages for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "testimonials_auth_write" on testimonials for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "gallery_images_auth_write" on gallery_images for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Anyone can submit a booking enquiry, only the owner can read/manage them
create policy "bookings_public_insert" on bookings for insert with check (true);
create policy "bookings_auth_select" on bookings for select using (auth.role() = 'authenticated');
create policy "bookings_auth_update" on bookings for update using (auth.role() = 'authenticated');
create policy "bookings_auth_delete" on bookings for delete using (auth.role() = 'authenticated');

-- ── Storage ─────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media_public_read" on storage.objects for select
  using (bucket_id = 'media');
create policy "media_auth_write" on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "media_auth_update" on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "media_auth_delete" on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');
