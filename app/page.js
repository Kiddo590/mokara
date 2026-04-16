import HeroSection from '@/components/HeroSection';
import PackageCard from '@/components/PackageCard';
import WhyMokara from '@/components/WhyMokara';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import SectionHeader from '@/components/ui/SectionHeader';
import { featuredPackages } from '@/data/packages';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Mokara Tours & Travel | Kenya & Zanzibar All-Inclusive Packages',
  description:
    'Explore Kenya and beyond with Mokara — curated all-inclusive travel packages to Mombasa, Kisumu, Zanzibar, Maasai Mara, and Nairobi. Transport, accommodation, and unforgettable experiences included.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Featured Destinations */}
      <section className="py-20 bg-white dark:bg-mokara-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <SectionHeader
              eyebrow="Top Picks"
              title="Featured Destinations"
              subtitle="Our most-loved travel experiences, handpicked by our experts."
              centered={false}
            />
            <Link
              href="/destinations"
              className="hidden md:inline-flex items-center gap-2 text-mokara-orange font-semibold hover:gap-3 transition-all"
            >
              View All Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-mokara-orange text-white font-semibold rounded-full"
            >
              View All Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <WhyMokara />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
