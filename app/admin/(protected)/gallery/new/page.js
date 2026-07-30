import GalleryImageForm from '@/components/admin/GalleryImageForm';
import BackLink from '@/components/admin/BackLink';

export default function NewGalleryImagePage() {
  return (
    <div>
      <BackLink href="/admin/gallery" label="Back to Gallery" />
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">New Gallery Photo</h1>
      <GalleryImageForm />
    </div>
  );
}
