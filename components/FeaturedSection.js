'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import PackageCard from '@/components/PackageCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FeaturedSection({ packages = [] }) {
  const { t } = useLanguage();
  const f = t.featured;

  if (packages.length === 0) return null;

  return (
    <section className="py-20 bg-white dark:bg-mokara-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeader eyebrow={f.eyebrow} title={f.title} subtitle={f.subtitle} centered={false} />
          <Link
            href="/destinations"
            className="hidden md:inline-flex items-center gap-2 text-mokara-orange font-semibold hover:gap-3 transition-all"
          >
            {f.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-mokara-orange text-white font-semibold rounded-full"
          >
            {f.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
