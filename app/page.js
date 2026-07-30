import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import WhyMokara from '@/components/WhyMokara';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import PhotoGallery from '@/components/PhotoGallery';
import PartnersBar from '@/components/PartnersBar';
import { getFeaturedPackages } from '@/lib/packages';
import { getApprovedTestimonials } from '@/lib/testimonials';
import { createClient } from '@/lib/supabase/public';

async function getGalleryPhotos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getGalleryPhotos error', error);
    return [];
  }
  return data.map((row) => ({
    id: row.id,
    src: row.src,
    alt: row.alt,
    label: row.label,
    featured: row.featured,
  }));
}

export default async function HomePage() {
  const [featuredPackages, testimonials, photos] = await Promise.all([
    getFeaturedPackages(),
    getApprovedTestimonials(),
    getGalleryPhotos(),
  ]);

  return (
    <>
      <HeroSection />
      <PartnersBar />
      <FeaturedSection packages={featuredPackages} />
      <WhyMokara />
      <PhotoGallery photos={photos} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
