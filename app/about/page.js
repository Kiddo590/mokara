import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/CTASection';
import { Heart, Globe, Shield, Leaf, Users, MapPin, Star, Award } from 'lucide-react';

export const metadata = {
  title: 'About Mokara — Our Story & Mission',
  description:
    'Learn about Mokara Tours & Travel — a Nairobi-based travel company founded to make authentic, all-inclusive Kenyan travel accessible to everyone. Our mission, vision, and values.',
  openGraph: {
    title: 'About Mokara Tours & Travel',
    description:
      'Our story, mission, and commitment to delivering unforgettable travel experiences across Kenya and beyond.',
  },
};

const stats = [
  { icon: Users, value: '500+', label: 'Happy Travelers' },
  { icon: MapPin, value: '5+', label: 'Destinations' },
  { icon: Star, value: '4.9', label: 'Average Rating' },
  { icon: Award, value: '3+', label: 'Years of Excellence' },
];

const values = [
  {
    icon: Heart,
    title: 'Passion for Travel',
    description:
      'We are travelers ourselves. Every package is built from genuine love for Kenya\'s landscapes, cultures, and people.',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description:
      'No hidden costs, no surprises. What you see is what you get — full pricing, clear inclusions, honest communication.',
  },
  {
    icon: Globe,
    title: 'Local Expertise',
    description:
      'Our team is Kenyan, and we know these destinations deeply. We connect you with authentic experiences that tourists miss.',
  },
  {
    icon: Leaf,
    title: 'Responsible Tourism',
    description:
      'We partner with local communities, support conservation efforts, and strive to leave every destination better than we found it.',
  },
];

const team = [
  {
    name: 'Amara Njoroge',
    role: 'Founder & CEO',
    avatar: 'AN',
    bio: 'Born and raised in Nairobi, Amara has explored every corner of Kenya and dreamed of sharing it with the world.',
  },
  {
    name: 'Daniel Ochieng',
    role: 'Head of Operations',
    avatar: 'DO',
    bio: 'Daniel ensures every trip runs flawlessly — coordinating guides, hotels, and transport with military precision.',
  },
  {
    name: 'Fatuma Hassan',
    role: 'Lead Travel Curator',
    avatar: 'FH',
    bio: 'From Zanzibar to Mombasa, Fatuma designs itineraries that blend adventure, culture, and luxury in perfect harmony.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
            alt="Kenya landscape"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-mokara-orange/90 text-white text-sm font-semibold rounded-full mb-6">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Born in Kenya,<br />Built for Explorers
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Mokara was founded with a simple belief: Kenya is one of the most extraordinary places on
            Earth, and everyone deserves to experience it without stress.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-mokara-orange">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold mb-1">{value}</p>
                <p className="text-sm text-white/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-mokara-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-mokara-orange mb-3 block">
                How It Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-mokara-dark dark:text-white mb-6">
                From a Nairobi Dream to East Africa&apos;s Most Trusted Tour Company
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Mokara was founded in 2021 by Amara Njoroge, a Nairobi-born traveler who grew
                  frustrated watching her friends struggle to plan trips across Kenya. Transport
                  hassles, unreliable accommodation, and tourist traps were robbing people of the
                  magic that Kenya truly offers.
                </p>
                <p>
                  She started small — a WhatsApp group, a handwritten itinerary for a Mombasa trip,
                  and a passion for getting the details right. Word spread quickly. By the end of the
                  first year, Mokara had sent over 50 travellers on unforgettable journeys.
                </p>
                <p>
                  Today, Mokara is a full-service travel company handling everything from road
                  transfers to luxury resort bookings, safari guides to spice farm tours. We&apos;ve
                  helped over 500 travelers explore Kenya, and we&apos;re just getting started.
                </p>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80"
                alt="Maasai Mara savanna"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-mokara-sand/30 dark:bg-mokara-dark-soft/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-mokara-dark rounded-3xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-mokara-orange/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-mokara-orange" />
              </div>
              <h3 className="text-xl font-bold text-mokara-dark dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To make authentic, stress-free travel across Kenya and East Africa accessible to
                everyone — by providing fully-managed, all-inclusive experiences that celebrate local
                culture, nature, and community.
              </p>
            </div>
            <div className="bg-mokara-orange rounded-3xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/90 leading-relaxed">
                To be East Africa&apos;s most trusted travel brand — known for transforming first-time
                visitors into lifelong Kenya lovers, and for setting the standard in curated,
                community-centered tourism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white dark:bg-mokara-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Our Core Values"
            subtitle="The principles that guide everything we do at Mokara."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-mokara-orange/40 transition-colors"
              >
                <div className="w-10 h-10 bg-mokara-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-mokara-orange" />
                </div>
                <h3 className="font-bold text-mokara-dark dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-mokara-sand/30 dark:bg-mokara-dark-soft/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The People Behind Mokara"
            title="Meet Our Team"
            subtitle="Passionate travelers and local experts dedicated to crafting your perfect trip."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-mokara-dark rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-mokara-orange rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-mokara-dark dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm text-mokara-orange font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
