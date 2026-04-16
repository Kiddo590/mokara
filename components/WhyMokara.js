'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Star, Headphones } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const features = [
  {
    icon: Shield,
    title: 'Truly All-Inclusive',
    description:
      'Transport, accommodation, meals, activities, and a dedicated guide — everything is covered. No hidden costs, no surprises.',
    color: 'text-mokara-orange',
    bg: 'bg-mokara-orange/10',
  },
  {
    icon: Star,
    title: 'Curated Experiences',
    description:
      'Every itinerary is handcrafted by our local experts to give you authentic, off-the-beaten-path experiences beyond the tourist brochure.',
    color: 'text-mokara-ocean',
    bg: 'bg-mokara-ocean/10',
  },
  {
    icon: Users,
    title: 'Trusted by 500+ Travelers',
    description:
      'From solo adventurers to family groups, over 500 satisfied travelers have explored Kenya & beyond with Mokara.',
    color: 'text-mokara-earth',
    bg: 'bg-mokara-earth/10',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Our team is always a WhatsApp message away — before, during, and after your trip. Your peace of mind is our priority.',
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
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
  return (
    <section className="py-20 bg-mokara-sand/30 dark:bg-mokara-dark-soft/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Travel With Us"
          title="The Mokara Difference"
          subtitle="We don't just book trips. We craft memories that last a lifetime."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <motion.div
              key={title}
              variants={item}
              className="bg-white dark:bg-mokara-dark rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-5`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="text-lg font-bold text-mokara-dark dark:text-white mb-3">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
