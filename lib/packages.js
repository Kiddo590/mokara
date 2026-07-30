import { createClient } from '@/lib/supabase/public';

function mapPackage(row) {
  if (!row) return null;
  return {
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    image: row.image,
    gallery: row.gallery || [],
    price: row.price,
    duration: row.duration,
    category: row.category,
    destination: row.destination,
    rating: row.rating,
    reviews: row.reviews,
    featured: row.featured,
    highlights: row.highlights || [],
    description: row.description,
    itinerary: row.itinerary || [],
    included: row.included || [],
    notIncluded: row.not_included || [],
  };
}

export async function getAllPackages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('getAllPackages error', error);
    return [];
  }
  return data.map(mapPackage);
}

export async function getFeaturedPackages() {
  const packages = await getAllPackages();
  return packages.filter((p) => p.featured);
}

export async function getCategories() {
  const packages = await getAllPackages();
  const unique = Array.from(new Set(packages.map((p) => p.category).filter(Boolean)));
  return ['All', ...unique];
}

export async function getPackageBySlug(slug) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapPackage(data);
}

export async function getAllSlugs() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('packages').select('slug');
  if (error) return [];
  return data.map((p) => ({ slug: p.slug }));
}
