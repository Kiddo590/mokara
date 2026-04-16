import Image from 'next/image';
import Link from 'next/link';
import { Clock, Star, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const categoryColors = {
  Beach: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Safari: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Nature: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  City: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Island: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
};

export default function PackageCard({ pkg }) {
  const { slug, title, tagline, image, price, duration, category, rating, reviews, highlights } = pkg;

  return (
    <article className="group bg-white dark:bg-mokara-dark-soft rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category badge */}
        <span
          className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${
            categoryColors[category] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {category}
        </span>
        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>{rating}</span>
          <span className="text-gray-300">({reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>{duration}</span>
        </div>

        <h3 className="text-lg font-bold text-mokara-dark dark:text-white mb-1 group-hover:text-mokara-orange transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{tagline}</p>

        {/* Highlights */}
        <ul className="space-y-1 mb-5 flex-1">
          {highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-mokara-orange shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
          <div>
            <p className="text-xs text-gray-400">From</p>
            <p className="text-xl font-bold text-mokara-orange">{formatPrice(price)}</p>
            <p className="text-xs text-gray-400">per person</p>
          </div>
          <Link
            href={`/packages/${slug}`}
            className="inline-flex items-center gap-1 px-4 py-2.5 bg-mokara-orange hover:bg-mokara-orange-dark text-white text-sm font-semibold rounded-full transition-colors"
          >
            View Package
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
