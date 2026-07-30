import { NextResponse } from 'next/server';
import { getCurrentAdminRole } from '@/lib/adminAuth';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request) {
  const role = await getCurrentAdminRole();
  if (role !== 'owner') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const adminClient = createAdminClient();

  const [{ data: authData, error: authError }, { data: profiles, error: profilesError }] =
    await Promise.all([
      adminClient.auth.admin.listUsers({ perPage: 200 }),
      adminClient.from('admin_profiles').select('id, role'),
    ]);

  if (authError || profilesError) {
    return NextResponse.json({ error: 'Failed to load users' }, { status: 500 });
  }

  const roleById = Object.fromEntries(profiles.map((p) => [p.id, p.role]));
  const users = authData.users
    .filter((u) => roleById[u.id])
    .map((u) => ({
      id: u.id,
      email: u.email,
      role: roleById[u.id],
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
    }));

  return NextResponse.json({ users });
}

export async function POST(request) {
  const role = await getCurrentAdminRole();
  if (role !== 'owner') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { email } = await request.json();
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const adminClient = createAdminClient();
  const origin = new URL(request.url).origin;

  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${origin}/admin/set-password`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { error: profileError } = await adminClient
    .from('admin_profiles')
    .insert({ id: data.user.id, email, role: 'staff' });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.user.id, email, role: 'staff' });
}
