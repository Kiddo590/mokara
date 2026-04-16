'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/254700000000?text=Hello%20Mokara!%20I'd%20like%20to%20enquire%20about%20your%20tours."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl shadow-green-500/40 transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 180, damping: 14 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30 pointer-events-none" />

      <MessageCircle className="w-5 h-5 fill-white shrink-0" />
      <span className="text-sm font-semibold hidden sm:block whitespace-nowrap">
        Chat with us
      </span>
    </motion.a>
  );
}
