import { createClient } from '@/lib/supabase/server';

// Server-only helper: returns the logged-in admin's own role ('owner' | 'staff'),
// or null if not logged in / not an admin. Relies on admin_profiles' self-select
// RLS policy (using (is_admin())), so callers only ever see their own row here.
export async function getCurrentAdminRole() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from('admin_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  return data?.role ?? null;
}
