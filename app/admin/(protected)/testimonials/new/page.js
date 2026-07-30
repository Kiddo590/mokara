import TestimonialForm from '@/components/admin/TestimonialForm';
import BackLink from '@/components/admin/BackLink';

export default function NewTestimonialPage() {
  return (
    <div>
      <BackLink href="/admin/testimonials" label="Back to Testimonials" />
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">New Testimonial</h1>
      <TestimonialForm />
    </div>
  );
}
