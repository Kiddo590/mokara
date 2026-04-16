import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-mokara-dark px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-mokara-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-10 h-10 text-mokara-orange" />
        </div>
        <h1 className="text-6xl font-bold text-mokara-orange mb-4">404</h1>
        <h2 className="text-2xl font-bold text-mokara-dark dark:text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          Looks like you&apos;ve wandered off the map. Let us guide you back to your next adventure.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-mokara-orange text-white font-semibold rounded-full hover:bg-mokara-orange-dark transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/destinations"
            className="px-6 py-3 border-2 border-mokara-orange text-mokara-orange font-semibold rounded-full hover:bg-mokara-orange hover:text-white transition-colors"
          >
            Browse Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
