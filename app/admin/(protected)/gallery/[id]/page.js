import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import GalleryImageForm from '@/components/admin/GalleryImageForm';

export default async function EditGalleryImagePage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: image } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (!image) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">Edit Gallery Photo</h1>
      <GalleryImageForm initialImage={image} />
    </div>
  );
}
