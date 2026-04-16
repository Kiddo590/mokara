import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://mokara.co.ke'),
  title: {
    default: 'Mokara Tours & Travel | Kenya & Zanzibar Travel Packages',
    template: '%s | Mokara Tours & Travel',
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
    'Mokara tours',
  ],
  authors: [{ name: 'Mokara Tours & Travel' }],
  creator: 'Mokara Tours & Travel',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://mokara.co.ke',
    siteName: 'Mokara Tours & Travel',
    title: 'Mokara Tours & Travel | Kenya & Zanzibar Travel Packages',
    description:
      'All-inclusive travel packages to Mombasa, Kisumu, Zanzibar, Maasai Mara and Nairobi. Transport, accommodation and experiences covered.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Mokara Tours & Travel — Kenya Safari',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mokara Tours & Travel | Kenya & Zanzibar Travel Packages',
    description:
      'All-inclusive travel packages across Kenya and beyond. Mombasa, Kisumu, Zanzibar, Maasai Mara.',
    images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
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
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
