import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PackageForm from '@/components/admin/PackageForm';

export default async function EditPackagePage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: pkg } = await supabase.from('packages').select('*').eq('id', id).maybeSingle();

  if (!pkg) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">Edit Package</h1>
      <PackageForm initialPackage={pkg} />
    </div>
  );
}
