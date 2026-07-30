import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function BackLink({ href, label }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-mokara-orange transition-colors mb-4"
    >
      <ChevronLeft className="w-4 h-4" />
      {label}
    </Link>
  );
}
