import Link from 'next/link';
import { Package, MessageSquareQuote, Images, Inbox } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

async function getCounts() {
  const supabase = await createClient();
  const [packages, testimonials, gallery, bookings] = await Promise.all([
    supabase.from('packages').select('id', { count: 'exact', head: true }),
    supabase.from('testimonials').select('id', { count: 'exact', head: true }),
    supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
    supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'new'),
  ]);

  return {
    packages: packages.count ?? 0,
    testimonials: testimonials.count ?? 0,
    gallery: gallery.count ?? 0,
    newBookings: bookings.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    { label: 'Packages', value: counts.packages, href: '/admin/packages', icon: Package },
    { label: 'Testimonials', value: counts.testimonials, href: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'Gallery Photos', value: counts.gallery, href: '/admin/gallery', icon: Images },
    { label: 'New Enquiries', value: counts.newBookings, href: '/admin/bookings', icon: Inbox },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-shadow"
          >
            <Icon className="w-6 h-6 text-mokara-orange mb-3" />
            <p className="text-3xl font-bold text-mokara-dark dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
