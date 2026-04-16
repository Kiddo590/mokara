'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const partners = [
  { name: 'Kenya Airways', category: 'Official Airline' },
  { name: 'Sarova Hotels', category: 'Accommodation' },
  { name: 'Serena Hotels', category: 'Luxury Stays' },
  { name: 'Kenya Wildlife Service', category: 'Conservation' },
  { name: 'Kenya Tourism Board', category: 'Tourism Authority' },
  { name: 'Mara Conservancy', category: 'Wildlife Protection' },
  { name: 'Zanzibar Tourism', category: 'Island Experiences' },
  { name: 'Equity Bank', category: 'Financial Partner' },
];

export default function PartnersBar() {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white dark:bg-mokara-dark border-y border-gray-100 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
          {t.partners.label}
        </p>

        {/* Scrolling strip */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused] w-max">
            {/* Duplicate list for seamless loop */}
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-gray-50 dark:bg-mokara-dark-soft border border-gray-100 dark:border-white/10 min-w-[160px] hover:border-mokara-orange/40 hover:bg-mokara-orange/5 transition-colors cursor-default"
              >
                <span className="text-sm font-bold text-mokara-dark dark:text-white whitespace-nowrap">
                  {p.name}
                </span>
                <span className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">{p.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
