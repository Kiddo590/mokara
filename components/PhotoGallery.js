'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
    alt: 'Elephants roaming the Maasai Mara at sunset',
    label: 'Maasai Mara',
    featured: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
    alt: 'Lion resting on a rock in the savanna',
    label: 'Safari Life',
  },
  {
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    alt: 'Crystal turquoise waters of Zanzibar',
    label: 'Zanzibar',
  },
  {
    src: 'https://images.unsplash.com/photo-1612786979424-71a9aeee82df?w=800&q=80',
    alt: 'Giraffe in the wild',
    label: 'Wildlife',
  },
  {
    src: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
    alt: 'White sand beach on the Kenyan coast',
    label: 'Mombasa Coast',
  },
  {
    src: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80',
    alt: 'Cheetah on the Maasai Mara plains',
    label: 'Big Cats',
  },
  {
    src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    alt: 'Hippo Point sunset at Lake Victoria, Kisumu',
    label: 'Lake Victoria',
  },
  {
    src: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    alt: 'Traditional dhow sailing the Indian Ocean',
    label: 'Island Life',
  },
];

export default function PhotoGallery() {
  const { t } = useLanguage();
  const g = t.gallery;

  return (
    <section className="py-20 bg-mokara-sand/20 dark:bg-mokara-dark-soft/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-mokara-orange mb-3">
            {g.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-mokara-dark dark:text-white">
            {g.title}
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {g.subtitle}
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Featured large photo — spans 2×2 on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden group cursor-pointer h-64 md:h-auto"
          >
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <span className="text-white font-bold text-xl">{photos[0].label}</span>
            </div>
          </motion.div>

          {/* Right column — 2 stacked */}
          {photos.slice(1, 3).map((photo, i) => (
            <motion.div
              key={photo.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer h-40 md:h-full"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">{photo.label}</span>
              </div>
            </motion.div>
          ))}

          {/* Bottom row — 3 equal photos */}
          {photos.slice(3, 6).map((photo, i) => (
            <motion.div
              key={photo.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer h-40 md:h-56"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">{photo.label}</span>
              </div>
            </motion.div>
          ))}

          {/* Extra row — 2 wide + 1 */}
          {photos.slice(6, 8).map((photo, i) => (
            <motion.div
              key={photo.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer h-40 md:h-48 ${
                i === 0 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">{photo.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
