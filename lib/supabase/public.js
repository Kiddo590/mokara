import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Plain anon-key client for publicly readable content (packages, testimonials, gallery).
// Safe to call anywhere — including generateStaticParams/sitemap at build time — since it
// never touches request cookies, unlike lib/supabase/server.js which is for admin session checks.
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
