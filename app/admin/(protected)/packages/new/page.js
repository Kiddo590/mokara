import { redirect } from 'next/navigation';
import { getCurrentAdminRole } from '@/lib/adminAuth';
import PackageForm from '@/components/admin/PackageForm';

export default async function NewPackagePage() {
  const role = await getCurrentAdminRole();
  if (role !== 'owner') redirect('/admin/packages');

  return (
    <div>
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">New Package</h1>
      <PackageForm />
    </div>
  );
}
