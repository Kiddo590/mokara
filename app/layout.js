import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { getAllPackages } from '@/lib/packages';

export const metadata = {
  metadataBase: new URL('https://moucaraadventures.co.ke'),
  title: {
    default: 'Moucara Adventures Limited | Kenya & Zanzibar Travel Packages',
    template: '%s | Moucara Adventures Limited',
  },
  description:
    'Discover all-inclusive travel packages across Kenya and Zanzibar. Mombasa, Kisumu, Maasai Mara, Nairobi, and Zanzibar tours with transport, accommodation, and expert guides included.',
  keywords: [
    'Kenya tours',
    'Mombasa travel packages',
    'Zanzibar trips from Kenya',
    'Maasai Mara safari',
    'Kisumu tours',
    'all-inclusive Kenya holidays',
    'Kenya travel agency',
    'Moucara Adventures Limited tours',
  ],
  authors: [{ name: 'Moucara Adventures Limited' }],
  creator: 'Moucara Adventures Limited',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://moucaraadventures.co.ke',
    siteName: 'Moucara Adventures Limited',
    title: 'Moucara Adventures Limited | Kenya & Zanzibar Travel Packages',
    description:
      'All-inclusive travel packages to Mombasa, Kisumu, Zanzibar, Maasai Mara and Nairobi. Transport, accommodation and experiences covered.',
    images: [
      {
        url: '/images/photo-2.jpg',
        width: 1200,
        height: 630,
        alt: 'Moucara Adventures Limited — Kenya Safari',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moucara Adventures Limited | Kenya & Zanzibar Travel Packages',
    description:
      'All-inclusive travel packages across Kenya and beyond. Mombasa, Kisumu, Zanzibar, Maasai Mara.',
    images: ['/images/photo-2.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Moucara Adventures Limited',
  url: 'https://moucaraadventures.co.ke',
  logo: 'https://moucaraadventures.co.ke/images/logo.jpg',
  telephone: '+254759313266',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Westlands Business Park',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  sameAs: [
    'https://instagram.com/MoucaraAdventures',
    'https://facebook.com/MoucaraAdventures',
    'https://tiktok.com/@MoucaraAdventures',
  ],
};

export default async function RootLayout({ children }) {
  const packages = await getAllPackages();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer packages={packages.slice(0, 5)} />
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}
