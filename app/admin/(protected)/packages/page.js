import Link from 'next/link';
import { Plus, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import { getCurrentAdminRole } from '@/lib/adminAuth';
import BackLink from '@/components/admin/BackLink';

async function getPackages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return data;
}

export default async function AdminPackagesPage() {
  const [packages, role] = await Promise.all([getPackages(), getCurrentAdminRole()]);

  return (
    <div>
      <BackLink href="/admin" label="Back to Dashboard" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-mokara-dark dark:text-white">Packages</h1>
        {role === 'owner' && (
          <Link
            href="/admin/packages/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-mokara-orange hover:bg-mokara-orange-dark text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> New Package
          </Link>
        )}
      </div>

      <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-mokara-dark text-left text-xs text-gray-400 uppercase tracking-wide">
            <tr>
              <th className="px-5 py-3 font-semibold">Title</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Price</th>
              <th className="px-5 py-3 font-semibold">Featured</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-t border-gray-100 dark:border-white/10">
                <td className="px-5 py-3 font-semibold text-mokara-dark dark:text-white">
                  {pkg.title}
                </td>
                <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{pkg.category}</td>
                <td className="px-5 py-3 text-gray-500 dark:text-gray-400">
                  {formatPrice(pkg.price)}
                </td>
                <td className="px-5 py-3">
                  {pkg.featured && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/packages/${pkg.id}`}
                    className="text-mokara-orange font-semibold hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-gray-400">
                  No packages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
