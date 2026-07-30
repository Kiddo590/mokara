'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, MessageSquareQuote, Images, Inbox } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/bookings', label: 'Bookings', icon: Inbox },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              active
                ? 'bg-mokara-orange text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-mokara-orange/10 hover:text-mokara-orange'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
