'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  const whatsappLink =
    'https://wa.me/254700000000?text=Hello%20Mokara!%20I%27d%20like%20to%20plan%20a%20trip.';

  return (
    <section className="py-20 bg-mokara-orange relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Start Your
            <br />
            Kenyan Adventure?
          </h2>
          <p className="text-lg text-white/85 mb-10 max-w-xl mx-auto">
            Talk to our travel experts today. We&apos;ll build your perfect trip — no stress, no
            hidden costs, just pure exploration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-mokara-orange font-bold rounded-full text-lg hover:bg-mokara-sand transition-colors shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-bold rounded-full text-lg border border-white/30 transition-colors"
            >
              Browse Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
