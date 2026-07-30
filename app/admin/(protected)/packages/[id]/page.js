import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminRole } from '@/lib/adminAuth';
import PackageForm from '@/components/admin/PackageForm';
import BlockedDatesManager from '@/components/admin/BlockedDatesManager';

export default async function EditPackagePage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: pkg }, role] = await Promise.all([
    supabase.from('packages').select('*').eq('id', id).maybeSingle(),
    getCurrentAdminRole(),
  ]);

  if (!pkg) notFound();

  const { data: blockedDates } = await supabase
    .from('package_unavailable_dates')
    .select('id, date, reason')
    .eq('package_id', id)
    .order('date', { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">Edit Package</h1>
      <PackageForm initialPackage={pkg} role={role} />
      <BlockedDatesManager packageId={id} initialDates={blockedDates || []} />
    </div>
  );
}
