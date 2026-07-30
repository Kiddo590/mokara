'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import PackageCard from '@/components/PackageCard';

const PRICE_BANDS = [
  { value: 'any', label: 'Any price' },
  { value: 'under-20000', label: 'Under KES 20,000' },
  { value: '20000-50000', label: 'KES 20,000 – 50,000' },
  { value: '50000-100000', label: 'KES 50,000 – 100,000' },
  { value: 'over-100000', label: 'KES 100,000+' },
];

function matchesPriceBand(price, band) {
  switch (band) {
    case 'under-20000':
      return price < 20000;
    case '20000-50000':
      return price >= 20000 && price <= 50000;
    case '50000-100000':
      return price > 50000 && price <= 100000;
    case 'over-100000':
      return price > 100000;
    default:
      return true;
  }
}

export default function DestinationsGrid({ packages, categories }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [priceBand, setPriceBand] = useState('any');

  const query = search.trim().toLowerCase();

  const filtered = packages.filter((p) => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (!matchesPriceBand(p.price, priceBand)) return false;
    if (query) {
      const haystack = `${p.title} ${p.destination} ${p.tagline}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  const isFiltered = activeCategory !== 'All' || priceBand !== 'any' || query.length > 0;

  return (
    <>
      {/* Search + price filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or destination…"
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark-soft text-sm text-mokara-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mokara-orange"
          />
        </div>
        <select
          value={priceBand}
          onChange={(e) => setPriceBand(e.target.value)}
          className="px-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark-soft text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange"
        >
          {PRICE_BANDS.map((band) => (
            <option key={band.value} value={band.value}>
              {band.label}
            </option>
          ))}
        </select>
      </div>

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
          <p className="text-gray-400 text-lg">
            {isFiltered ? 'No packages match your search and filters.' : 'No packages found.'}
          </p>
        </div>
      )}
    </>
  );
}
