import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Service-role client — bypasses RLS entirely. Server-only: never import this
// from a Client Component or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
// Only used by the /api/admin/users routes, and only after those routes have
// verified the caller is the owner via lib/adminAuth.js.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
