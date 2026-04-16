'use client';

import { useState } from 'react';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';
import { buildBookingWhatsAppMessage, buildWhatsAppLink } from '@/lib/utils';

export default function BookingForm({ packageTitle = '' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    travelers: '2',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = buildBookingWhatsAppMessage({ ...form, packageTitle });
    const link = buildWhatsAppLink(msg);
    window.open(link, '_blank');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-8 text-center shadow-lg">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-mokara-dark dark:text-white mb-2">
          WhatsApp Opened!
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Your enquiry has been pre-filled in WhatsApp. Send it to connect with our team instantly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-mokara-orange hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-white/10">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-mokara-orange" />
        <h3 className="text-lg font-bold text-mokara-dark dark:text-white">
          Book This Package
        </h3>
      </div>

      {packageTitle && (
        <div className="mb-4 px-4 py-3 bg-mokara-orange/10 rounded-xl text-sm text-mokara-orange font-medium">
          {packageTitle}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="John Kamau"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+254 700 000 000"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Travel Date *
            </label>
            <input
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Travelers
            </label>
            <select
              name="travelers"
              value={form.travelers}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
            Message (Optional)
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder="Any special requests or questions?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-4 bg-mokara-orange hover:bg-mokara-orange-dark text-white font-bold rounded-xl transition-colors text-sm shadow-lg"
        >
          <Send className="w-4 h-4" />
          Send via WhatsApp
        </button>

        <p className="text-center text-xs text-gray-400">
          Your enquiry opens in WhatsApp for instant response from our team.
        </p>
      </form>
    </div>
  );
}
