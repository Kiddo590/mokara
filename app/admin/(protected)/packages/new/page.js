import PackageForm from '@/components/admin/PackageForm';

export default function NewPackagePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">New Package</h1>
      <PackageForm />
    </div>
  );
}
