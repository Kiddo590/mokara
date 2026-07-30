'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ImageUploader from '@/components/admin/ImageUploader';

const emptyImage = {
  src: '',
  alt: '',
  label: '',
  featured: false,
  sort_order: 0,
};

function inputClass() {
  return 'w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange';
}

function labelClass() {
  return 'block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide';
}

export default function GalleryImageForm({ initialImage }) {
  const router = useRouter();
  const isEdit = Boolean(initialImage);
  const [form, setForm] = useState(() => ({ ...emptyImage, ...initialImage }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.src) {
      setError('Please upload an image first.');
      return;
    }

    setSaving(true);
    setError('');

    const { id, created_at, ...rest } = form;
    const payload = { ...rest, sort_order: Number(form.sort_order) || 0 };

    const supabase = createClient();
    const { error: saveError } = isEdit
      ? await supabase.from('gallery_images').update(payload).eq('id', initialImage.id)
      : await supabase.from('gallery_images').insert(payload);

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.push('/admin/gallery');
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm('Delete this photo?')) return;
    const supabase = createClient();
    await supabase.from('gallery_images').delete().eq('id', initialImage.id);
    router.push('/admin/gallery');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      {error && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg px-4 py-2">{error}</p>
      )}

      <div>
        <label className={labelClass()}>Photo</label>
        <ImageUploader value={form.src} onChange={(url) => set('src', url)} folder="gallery" />
      </div>

      <div>
        <label className={labelClass()}>Label (shown on hover)</label>
        <input value={form.label} onChange={(e) => set('label', e.target.value)} className={inputClass()} />
      </div>

      <div>
        <label className={labelClass()}>Alt text</label>
        <input value={form.alt} onChange={(e) => set('alt', e.target.value)} className={inputClass()} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2 text-sm text-mokara-dark dark:text-white">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set('featured', e.target.checked)}
            className="w-4 h-4 accent-mokara-orange"
          />
          Featured (large tile)
        </label>
        <div>
          <label className={labelClass()}>Sort order</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => set('sort_order', e.target.value)}
            className={inputClass()}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-mokara-orange hover:bg-mokara-orange-dark disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving…' : 'Save Photo'}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold rounded-xl transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
