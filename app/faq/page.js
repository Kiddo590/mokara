import { HelpCircle } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about booking, payment, custom itineraries, group bookings, and travel dates with Moucara Adventures Limited.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ | Moucara Adventures Limited',
    description: 'Common questions about booking a trip with Moucara Adventures Limited.',
  },
};

const faqs = [
  {
    question: "What's included in a Moucara Adventures package?",
    answer:
      "Our packages are all-inclusive by design — transport, accommodation, meals, and a professional guide are covered in most trips. Exact inclusions vary by package, so check the \"What's Included\" section on each package page for the full breakdown.",
  },
  {
    question: 'How do I book a trip?',
    answer:
      'Message us on WhatsApp or fill in the contact form on our Contact page. Our team typically responds within a few hours — often within 30 minutes on WhatsApp — with availability and next steps.',
  },
  {
    question: 'Can I request a custom itinerary?',
    answer:
      'Yes. Reach out via the contact form and select "Custom Trip Planning" as your topic, or mention it directly on WhatsApp, and our team will help design a trip around what you have in mind.',
  },
  {
    question: 'Do you handle group bookings?',
    answer:
      'Yes. Select "Group Booking" on the contact form, or let us know your group size on WhatsApp, and we\'ll help coordinate accommodation and transport for everyone.',
  },
  {
    question: 'What destinations do you cover?',
    answer:
      'Mombasa, Kisumu, Zanzibar, Maasai Mara, Nairobi, and more. Browse all current packages on the Destinations page.',
  },
  {
    question: "What's the typical group size for a tour?",
    answer: 'Most packages accommodate 1–12 travelers per group.',
  },
  {
    question: 'What are your business hours?',
    answer:
      "We're available Monday–Saturday, 8am–6pm EAT. WhatsApp enquiries are often answered outside those hours too, since responses tend to be fast.",
  },
  {
    question: 'How do I know if my travel dates are available?',
    answer:
      "Each package page lists any dates that are currently unavailable for that trip. If the date you want isn't listed, go ahead and send an enquiry.",
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <section className="pt-32 pb-20 bg-white dark:bg-mokara-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData).replace(/</g, '\\u003c'),
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Need to know more?"
          title="Frequently Asked Questions"
          subtitle="Common questions from travelers planning a trip with us."
        />

        <div className="space-y-6 mt-10">
          {faqs.map((f) => (
            <div
              key={f.question}
              className="p-6 bg-mokara-sand/30 dark:bg-mokara-dark-soft rounded-2xl"
            >
              <h2 className="flex items-start gap-2 font-bold text-mokara-dark dark:text-white mb-2">
                <HelpCircle className="w-5 h-5 text-mokara-orange shrink-0 mt-0.5" />
                {f.question}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-7">
                {f.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
