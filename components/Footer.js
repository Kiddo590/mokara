import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

const company = [
  { label: 'About Moucara Adventures Limited', href: '/about' },
  { label: 'All Destinations', href: '/destinations' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer({ packages = [] }) {
  const whatsappLink = buildWhatsAppLink(
    "Hello Moucara Adventures Limited! I'd like to enquire about your tours."
  );

  return (
    <footer className="bg-mokara-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/logo.jpg"
                alt="Moucara Adventures Limited"
                width={160}
                height={48}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              All-inclusive travel experiences across Kenya and beyond. We handle
              everything — you just show up and explore.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/MoucaraAdventures"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-mokara-orange flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/MoucaraAdventures"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-mokara-orange flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@MoucaraAdventures"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-mokara-orange flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-white font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              {packages.map((pkg) => (
                <li key={pkg.slug}>
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="text-sm text-gray-400 hover:text-mokara-orange transition-colors"
                  >
                    {pkg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm text-gray-400 hover:text-mokara-orange transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-mokara-orange mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">
                  Westlands Business Park, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-mokara-orange shrink-0" />
                <a
                  href="tel:+254759313266"
                  className="text-sm text-gray-400 hover:text-mokara-orange transition-colors"
                >
                  +254 759 313 266
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-mokara-orange shrink-0" />
                <a
                  href="mailto:moucaraadventures@gmail.com"
                  className="text-sm text-gray-400 hover:text-mokara-orange transition-colors"
                >
                  moucaraadventures@gmail.com
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-full transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Moucara Adventures Limited. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Made with ♥ in Nairobi, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
