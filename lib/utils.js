import { packages } from '@/data/packages';

export function getPackageBySlug(slug) {
  return packages.find((p) => p.slug === slug) || null;
}

export function getAllSlugs() {
  return packages.map((p) => ({ slug: p.slug }));
}

export function formatPrice(price) {
  return `KES ${price.toLocaleString('en-KE')}`;
}

export function getPackagesByCategory(category) {
  if (!category || category === 'All') return packages;
  return packages.filter((p) => p.category === category);
}

export const WHATSAPP_NUMBER = '254700000000'; // Replace with real number

export function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildBookingWhatsAppMessage({ name, email, phone, packageTitle, date, travelers, message }) {
  return `Hello Mokara! I'd like to book a tour.

*Package:* ${packageTitle || 'Not specified'}
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Travel Date:* ${date}
*Travelers:* ${travelers}
*Message:* ${message}

Please get back to me with availability and confirmation. Thank you!`;
}
