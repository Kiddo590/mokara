'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, MapPin, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const { t, lang, toggleLang } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.destinations, href: '/destinations' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.contact, href: '/contact' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function toggleDark() {
    const html = document.documentElement;
    if (dark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDark(true);
    }
  }

  const isHome = pathname === '/';
  const textClass =
    scrolled || !isHome ? 'text-mokara-dark dark:text-gray-200' : 'text-white';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white/95 dark:bg-mokara-dark/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-mokara-orange rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${textClass}`}>
              Mokara
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-base font-medium transition-colors hover:text-mokara-orange ${
                    pathname === link.href ? 'text-mokara-orange' : textClass
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              title={lang === 'en' ? 'Switch to Swahili' : 'Switch to English'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                scrolled || !isHome
                  ? 'border-gray-200 dark:border-white/20 text-mokara-dark dark:text-gray-200 hover:border-mokara-orange hover:text-mokara-orange'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              {lang === 'en' ? 'SW' : 'EN'}
            </button>

            {/* Dark mode */}
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className={`p-2 rounded-full transition-colors hover:bg-white/10 ${textClass}`}
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-mokara-orange hover:bg-mokara-orange-dark text-white text-sm font-semibold rounded-full transition-colors shadow-lg"
            >
              {t.nav.bookNow}
            </Link>

            <button
              className={`md:hidden p-2 rounded-full transition-colors hover:bg-white/10 ${textClass}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-white dark:bg-mokara-dark border-t border-gray-100 dark:border-white/10 px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium transition-colors hover:text-mokara-orange ${
                pathname === link.href
                  ? 'text-mokara-orange'
                  : 'text-mokara-dark dark:text-gray-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="inline-flex justify-center items-center px-6 py-3 bg-mokara-orange text-white font-semibold rounded-full mt-2"
          >
            {t.nav.bookNow}
          </Link>
        </div>
      </div>
    </header>
  );
}
