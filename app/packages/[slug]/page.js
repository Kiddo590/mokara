import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPackageBySlug, getAllSlugs, formatPrice } from '@/lib/utils';
import BookingForm from '@/components/BookingForm';
import { Clock, Star, CheckCircle, XCircle, ChevronLeft, Calendar, Users } from 'lucide-react';

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};

  return {
    title: `${pkg.title} — ${pkg.duration}`,
    description: pkg.description.slice(0, 160),
    keywords: [
      pkg.destination,
      `${pkg.destination} travel package`,
      `${pkg.destination} tour Kenya`,
      pkg.category,
      'Kenya tours',
      'all-inclusive travel',
    ],
    openGraph: {
      title: `${pkg.title} | Mokara Tours`,
      description: pkg.tagline,
      images: [{ url: pkg.image, width: 1200, height: 630, alt: pkg.title }],
    },
  };
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const {
    title,
    tagline,
    image,
    price,
    duration,
    category,
    rating,
    reviews,
    description,
    highlights,
    itinerary,
    included,
    notIncluded,
  } = pkg;

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-7xl mx-auto">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            All Packages
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-mokara-orange text-white text-xs font-bold rounded-full">
              {category}
            </span>
            <div className="flex items-center gap-1.5 text-white text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{rating}</span>
              <span className="text-gray-300">({reviews} reviews)</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-200 text-lg">{tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Meta bar */}
            <div className="flex flex-wrap gap-6 p-5 bg-mokara-sand/40 dark:bg-mokara-dark-soft rounded-2xl">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-mokara-orange" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="font-semibold text-mokara-dark dark:text-white text-sm">{duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-mokara-orange" />
                <div>
                  <p className="text-xs text-gray-500">Best Time</p>
                  <p className="font-semibold text-mokara-dark dark:text-white text-sm">Year-round</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-mokara-orange" />
                <div>
                  <p className="text-xs text-gray-500">Group Size</p>
                  <p className="font-semibold text-mokara-dark dark:text-white text-sm">1–12 people</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-mokara-dark dark:text-white mb-4">Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">{description}</p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-bold text-mokara-dark dark:text-white mb-4">
                Trip Highlights
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-mokara-orange shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">
                Day-by-Day Itinerary
              </h2>
              <div className="space-y-4">
                {itinerary.map((day, i) => (
                  <div
                    key={day.day}
                    className="flex gap-4 p-5 bg-white dark:bg-mokara-dark-soft rounded-2xl shadow-sm border border-gray-100 dark:border-white/10"
                  >
                    <div className="shrink-0 w-10 h-10 bg-mokara-orange text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {day.day}
                    </div>
                    <div>
                      <h3 className="font-bold text-mokara-dark dark:text-white mb-1">
                        Day {day.day}: {day.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {day.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Included / Not Included */}
            <section>
              <h2 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-green-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Included
                  </h3>
                  <ul className="space-y-2">
                    {included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-red-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Not Included
                  </h3>
                  <ul className="space-y-2">
                    {notIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Price card */}
              <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-white/10 text-center mb-2">
                <p className="text-sm text-gray-400 mb-1">From</p>
                <p className="text-4xl font-bold text-mokara-orange">{formatPrice(price)}</p>
                <p className="text-xs text-gray-400 mt-1">per person · all-inclusive</p>
              </div>
              <BookingForm packageTitle={title} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
