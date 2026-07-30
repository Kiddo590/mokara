import Link from 'next/link';
import { Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) return [];
  return data;
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-mokara-dark dark:text-white">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-mokara-orange hover:bg-mokara-orange-dark text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> New Testimonial
        </Link>
      </div>

      <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-mokara-dark text-left text-xs text-gray-400 uppercase tracking-wide">
            <tr>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Location</th>
              <th className="px-5 py-3 font-semibold">Package</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="border-t border-gray-100 dark:border-white/10">
                <td className="px-5 py-3 font-semibold text-mokara-dark dark:text-white">{t.name}</td>
                <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{t.location}</td>
                <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{t.package_title}</td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/testimonials/${t.id}`}
                    className="text-mokara-orange font-semibold hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-gray-400">
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
