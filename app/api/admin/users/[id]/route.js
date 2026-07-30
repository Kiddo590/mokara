import { NextResponse } from 'next/server';
import { getCurrentAdminRole } from '@/lib/adminAuth';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function DELETE(request, { params }) {
  const { id } = await params;

  const role = await getCurrentAdminRole();
  if (role !== 'owner') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user.id === id) {
    return NextResponse.json({ error: "You can't remove your own account." }, { status: 400 });
  }

  const adminClient = createAdminClient();

  const { data: target } = await adminClient
    .from('admin_profiles')
    .select('role')
    .eq('id', id)
    .maybeSingle();

  if (target?.role === 'owner') {
    const { count } = await adminClient
      .from('admin_profiles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'owner');

    if ((count ?? 0) <= 1) {
      return NextResponse.json({ error: "Can't remove the last owner." }, { status: 400 });
    }
  }

  const { error } = await adminClient.auth.admin.deleteUser(id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
