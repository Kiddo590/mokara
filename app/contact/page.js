'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, Clock, Instagram, Facebook } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';


const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+254 700 000 000',
    href: 'tel:+254700000000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@mokara.co.ke',
    href: 'mailto:hello@mokara.co.ke',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Westlands Business Park, Nairobi, Kenya',
    href: null,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat: 8am – 6pm EAT',
    href: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = `Hello Mokara! I'd like to get in touch.

*Name:* ${form.name}
*Email:* ${form.email}
*Phone:* ${form.phone}
*Subject:* ${form.subject}
*Message:* ${form.message}`;
    window.open(buildWhatsAppLink(msg), '_blank');
    setSubmitted(true);
  }

  const whatsappLink =
    'https://wa.me/254700000000?text=Hello%20Mokara!%20I%27d%20like%20to%20enquire%20about%20your%20tours.';

  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mokara-dark to-mokara-ocean/40 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-mokara-orange/90 text-white text-sm font-semibold rounded-full mb-6">
            Let&apos;s Talk
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Ready to start planning your dream Kenya trip? We&apos;d love to hear from you. Our team
            responds within a few hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-mokara-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* WhatsApp CTA */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-2xl p-6">
                <MessageCircle className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-mokara-dark dark:text-white mb-2">
                  Fastest Response via WhatsApp
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Chat with our team directly on WhatsApp — most enquiries are answered within 30
                  minutes.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors text-sm w-full justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp Chat
                </a>
              </div>

              {/* Contact details */}
              <div className="bg-mokara-sand/30 dark:bg-mokara-dark-soft rounded-2xl p-6 space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-mokara-orange/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-mokara-orange" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-mokara-dark dark:text-white hover:text-mokara-orange transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-mokara-dark dark:text-white">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                <h3 className="font-bold text-mokara-dark dark:text-white mb-4 text-sm">
                  Follow Our Adventures
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity flex-1 justify-center"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors flex-1 justify-center"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-12 text-center shadow-lg border border-gray-100 dark:border-white/10">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-mokara-dark dark:text-white mb-2">
                    Message Sent via WhatsApp!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                    Your message has been pre-filled in WhatsApp. Our team will respond within a few
                    hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-mokara-orange hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-white/10">
                  <h2 className="text-xl font-bold text-mokara-dark dark:text-white mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                          Email *
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
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+254 700 000 000"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm"
                        >
                          <option value="">Select a topic</option>
                          <option>Package Enquiry</option>
                          <option>Custom Trip Planning</option>
                          <option>Group Booking</option>
                          <option>Pricing & Availability</option>
                          <option>General Question</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us where you'd like to go, when, and any special requests..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-4 bg-mokara-orange hover:bg-mokara-orange-dark text-white font-bold rounded-xl transition-colors shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      Send via WhatsApp
                    </button>
                    <p className="text-center text-xs text-gray-400">
                      Your message will open in WhatsApp for instant response from our team.
                    </p>
                  </form>
                </div>
              )}

              {/* Map embed */}
              <div className="mt-6 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/10 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.04219876025!2d36.80028!3d-1.26942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a6bf7445dc1%3A0x6f3fd6e0af8ee9b7!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mokara Tours Office — Westlands, Nairobi"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
