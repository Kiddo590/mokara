'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const testimonials = [
  {
    name: 'Amina Wanjiru',
    location: 'Nairobi, Kenya',
    avatar: 'AW',
    rating: 5,
    package: 'Zanzibar Luxury Retreat',
    text: "Zanzibar was absolutely magical! Mokara took care of everything — from the moment we landed to the farewell transfer. The private sandbank picnic was the highlight of my life. I've already booked the Mombasa trip for next year!",
  },
  {
    name: 'James Omondi',
    location: 'Kampala, Uganda',
    avatar: 'JO',
    rating: 5,
    package: 'Maasai Mara Safari',
    text: "The Maasai Mara safari was beyond anything I imagined. We saw all of the Big Five on day one! Our guide Daniel was knowledgeable, passionate, and made the whole experience unforgettable. Worth every shilling.",
  },
  {
    name: 'Grace Mutua',
    location: 'Mombasa, Kenya',
    avatar: 'GM',
    rating: 5,
    package: 'Kisumu Lake Experience',
    text: "I never thought Kisumu could be so beautiful. The boat ride at sunrise, the hippos at sunset, the tilapia by the lake — it was all perfect. Mokara's attention to detail is unmatched. Highly recommend!",
  },
  {
    name: 'David Kariuki',
    location: 'Nairobi, Kenya',
    avatar: 'DK',
    rating: 5,
    package: 'Mombasa Beach Escape',
    text: "Booked the Mombasa package for our anniversary and it was flawless. The hotel was stunning, the Old Town tour was fascinating, and the food was incredible. Mokara made it so stress-free and special.",
  },
  {
    name: 'Sarah Achieng',
    location: 'Kisumu, Kenya',
    avatar: 'SA',
    rating: 5,
    package: 'Nairobi City Explorer',
    text: "Even as a Kenyan, I discovered so much about my own country with Mokara. The Giraffe Centre and elephant orphanage were incredible. I highly recommend this for anyone who wants to see Nairobi properly!",
  },
  {
    name: 'Michael Njuguna',
    location: 'Nakuru, Kenya',
    avatar: 'MN',
    rating: 5,
    package: 'Zanzibar Luxury Retreat',
    text: "Five stars doesn't cover it. The Zanzibar retreat was pure luxury from start to finish. Stone Town, the spice farms, the sunset dhow — every single moment was curated to perfection. Mokara, you've spoiled us!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white dark:bg-mokara-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Traveler Stories"
          title="What Our Guests Say"
          subtitle="Real experiences from real travelers who explored with Mokara."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
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
