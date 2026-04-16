import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function PackageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-mokara-dark px-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-mokara-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-8 h-8 text-mokara-orange" />
        </div>
        <h1 className="text-3xl font-bold text-mokara-dark dark:text-white mb-3">
          Package Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          We couldn&apos;t find the travel package you&apos;re looking for. Browse all our available
          destinations below.
        </p>
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 px-6 py-3 bg-mokara-orange text-white font-semibold rounded-full hover:bg-mokara-orange-dark transition-colors"
        >
          Browse All Packages
        </Link>
      </div>
    </div>
  );
}
