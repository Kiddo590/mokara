'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Star, Users, MapPin } from 'lucide-react';

const stats = [
  { icon: MapPin, value: '5+', label: 'Destinations' },
  { icon: Users, value: '500+', label: 'Happy Travelers' },
  { icon: Star, value: '4.9', label: 'Average Rating' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=85"
        alt="Kenya safari landscape with elephants and acacia trees at sunset"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block px-4 py-1.5 bg-mokara-orange/90 text-white text-sm font-semibold rounded-full mb-6 tracking-wide">
            ✦ All-Inclusive Kenya & Beyond
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Explore Kenya &{' '}
            <span className="text-mokara-orange">Beyond</span>
            <br />
            with Mokara
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Curated, all-inclusive travel packages to Kenya&apos;s most stunning destinations.
            Transport, accommodation, and unforgettable experiences — all handled for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/destinations"
              className="px-8 py-4 bg-mokara-orange hover:bg-mokara-orange-dark text-white font-semibold rounded-full text-lg transition-all duration-200 shadow-xl hover:shadow-mokara-orange/40 hover:scale-105"
            >
              Explore Packages
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-full text-lg transition-all duration-200 border border-white/30 backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mokara-orange/20 border border-mokara-orange/40 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5 text-mokara-orange" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-300">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
}
