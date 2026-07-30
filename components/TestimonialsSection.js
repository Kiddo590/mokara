'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function TestimonialsSection({ testimonials = [] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-white dark:bg-mokara-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Traveler Stories"
          title="What Our Guests Say"
          subtitle="Real experiences from real travelers who explored with Moucara Adventures Limited."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-mokara-sand/30 dark:bg-mokara-dark-soft rounded-2xl p-6 relative"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-mokara-orange/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                <div className="w-10 h-10 rounded-full bg-mokara-orange flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-mokara-dark dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
                <span className="ml-auto text-xs bg-mokara-orange/10 text-mokara-orange font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                  {t.package}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
