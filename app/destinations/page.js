'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PackageCard from '@/components/PackageCard';
import { packages, categories } from '@/data/packages';
import { MapPin } from 'lucide-react';

export default function DestinationsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? packages
      : packages.filter((p) => p.category === activeCategory);

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
          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-mokara-orange text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-mokara-dark-soft text-gray-600 dark:text-gray-300 hover:bg-mokara-orange/10 hover:text-mokara-orange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Showing{' '}
            <span className="font-semibold text-mokara-dark dark:text-white">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'package' : 'packages'}
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((pkg) => (
                <motion.div
                  key={pkg.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <PackageCard pkg={pkg} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No packages found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
