import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import TestimonialForm from '@/components/admin/TestimonialForm';

export default async function EditTestimonialPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: testimonial } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">Edit Testimonial</h1>
      <TestimonialForm initialTestimonial={testimonial} />
    </div>
  );
}
