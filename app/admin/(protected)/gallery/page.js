import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

async function getGalleryImages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) return [];
  return data;
}

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-mokara-dark dark:text-white">Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-mokara-orange hover:bg-mokara-orange-dark text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> New Photo
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <Link
            key={img.id}
            href={`/admin/gallery/${img.id}`}
            className="group relative rounded-2xl overflow-hidden h-40 bg-gray-100 dark:bg-mokara-dark-soft border border-gray-100 dark:border-white/10"
          >
            <Image src={img.src} alt={img.alt || ''} fill unoptimized className="object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-semibold transition-opacity">
                Edit
              </span>
            </div>
            {img.label && (
              <span className="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded-full">
                {img.label}
              </span>
            )}
          </Link>
        ))}
        {images.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-10">No gallery photos yet.</p>
        )}
      </div>
    </div>
  );
}
