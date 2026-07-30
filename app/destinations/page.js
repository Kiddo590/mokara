import DestinationsGrid from '@/components/DestinationsGrid';
import { getAllPackages, getCategories } from '@/lib/packages';
import { MapPin } from 'lucide-react';

export default async function DestinationsPage() {
  const [packages, categories] = await Promise.all([getAllPackages(), getCategories()]);

  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mokara-dark via-mokara-dark to-mokara-earth/60 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mokara-orange/20 border border-mokara-orange/40 rounded-full text-mokara-orange text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4" />
            All Packages
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our Destinations
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Choose from our curated collection of all-inclusive travel packages across Kenya and the
            Indian Ocean. Every trip is fully managed from start to finish.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 bg-white dark:bg-mokara-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DestinationsGrid packages={packages} categories={categories} />
        </div>
      </section>
    </>
  );
}
