'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Star, Headphones } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useLanguage } from '@/contexts/LanguageContext';

const icons = [Shield, Star, Users, Headphones];
const styles = [
  { color: 'text-mokara-orange', bg: 'bg-mokara-orange/10' },
  { color: 'text-mokara-ocean', bg: 'bg-mokara-ocean/10' },
  { color: 'text-mokara-earth', bg: 'bg-mokara-earth/10' },
  { color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function WhyMokara() {
  const { t } = useLanguage();
  const w = t.why;

  return (
    <section className="py-20 bg-mokara-sand/30 dark:bg-mokara-dark-soft/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle} />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {w.features.map(({ title, description }, i) => {
            const Icon = icons[i];
            const { color, bg } = styles[i];
            return (
              <motion.div
                key={title}
                variants={item}
                className="bg-white dark:bg-mokara-dark rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-lg font-bold text-mokara-dark dark:text-white mb-3">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
