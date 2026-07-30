'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PackageCard from '@/components/PackageCard';

export default function DestinationsGrid({ packages, categories }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? packages
      : packages.filter((p) => p.category === activeCategory);

  return (
    <>
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
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </>
  );
}
