import { createClient } from '@/lib/supabase/public';

function mapTestimonial(row) {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    avatar: row.avatar,
    rating: row.rating,
    package: row.package_title,
    text: row.text,
  };
}

export async function getApprovedTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'approved')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getApprovedTestimonials error', error);
    return [];
  }
  return data.map(mapTestimonial);
}

export async function getApprovedTestimonialsForPackage(packageTitle) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'approved')
    .eq('package_title', packageTitle)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getApprovedTestimonialsForPackage error', error);
    return [];
  }
  return data.map(mapTestimonial);
}
