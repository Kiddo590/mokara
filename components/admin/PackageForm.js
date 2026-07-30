'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Trash2, Wand2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/slugify';
import ImageUploader from '@/components/admin/ImageUploader';
import GalleryArrayField from '@/components/admin/GalleryArrayField';
import StringListField from '@/components/admin/StringListField';
import ItineraryField from '@/components/admin/ItineraryField';

const emptyPackage = {
  slug: '',
  title: '',
  tagline: '',
  image: '',
  gallery: [],
  price: '',
  duration: '',
  category: '',
  destination: '',
  rating: 5,
  reviews: 0,
  featured: false,
  highlights: [],
  description: '',
  itinerary: [],
  included: [],
  not_included: [],
};

function inputClass() {
  return 'w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange';
}

function labelClass() {
  return 'block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide';
}

export default function PackageForm({ initialPackage, role }) {
  const router = useRouter();
  const isEdit = Boolean(initialPackage);
  const [form, setForm] = useState(() => ({ ...emptyPackage, ...initialPackage }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const { id, created_at, updated_at, ...rest } = form;
    const payload = {
      ...rest,
      price: Number(form.price) || 0,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
      gallery: form.gallery.filter(Boolean),
    };

    const supabase = createClient();
    const { error: saveError } = isEdit
      ? await supabase
          .from('packages')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', initialPackage.id)
      : await supabase.from('packages').insert(payload);

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.push('/admin/packages');
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm('Delete this package? This cannot be undone.')) return;
    const supabase = createClient();
    await supabase.from('packages').delete().eq('id', initialPackage.id);
    router.push('/admin/packages');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8 pb-16">
      {error && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg px-4 py-2">{error}</p>
      )}

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-mokara-dark dark:text-white uppercase tracking-wide">
          Basics
        </h2>

        <div>
          <label className={labelClass()}>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            className={inputClass()}
          />
        </div>

        <div>
          <label className={labelClass()}>Slug (used in the URL)</label>
          <div className="flex gap-2">
            <input
              required
              value={form.slug}
              onChange={(e) => set('slug', e.target.value)}
              className={inputClass()}
            />
            <button
              type="button"
              onClick={() => set('slug', slugify(form.title))}
              className="shrink-0 flex items-center gap-1.5 px-3 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-semibold text-mokara-orange hover:bg-mokara-orange/10"
            >
              <Wand2 className="w-3.5 h-3.5" /> Generate
            </button>
          </div>
        </div>

        <div>
          <label className={labelClass()}>Tagline</label>
          <input
            value={form.tagline}
            onChange={(e) => set('tagline', e.target.value)}
            className={inputClass()}
          />
        </div>

        <div>
          <label className={labelClass()}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={4}
            className={`${inputClass()} resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass()}>Category</label>
            <input
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              placeholder="Beach, Safari, City…"
              className={inputClass()}
            />
          </div>
          <div>
            <label className={labelClass()}>Destination</label>
            <input
              value={form.destination}
              onChange={(e) => set('destination', e.target.value)}
              className={inputClass()}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass()}>Price (KES)</label>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => set('price', e.target.value)}
              className={inputClass()}
            />
          </div>
          <div>
            <label className={labelClass()}>Duration</label>
            <input
              value={form.duration}
              onChange={(e) => set('duration', e.target.value)}
              placeholder="4 Days / 3 Nights"
              className={inputClass()}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass()}>Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={(e) => set('rating', e.target.value)}
              className={inputClass()}
            />
          </div>
          <div>
            <label className={labelClass()}>Reviews count</label>
            <input
              type="number"
              min="0"
              value={form.reviews}
              onChange={(e) => set('reviews', e.target.value)}
              className={inputClass()}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-mokara-dark dark:text-white">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set('featured', e.target.checked)}
            className="w-4 h-4 accent-mokara-orange"
          />
          Featured on homepage
        </label>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-mokara-dark dark:text-white uppercase tracking-wide">
          Images
        </h2>
        <div>
          <label className={labelClass()}>Main image</label>
          <ImageUploader value={form.image} onChange={(url) => set('image', url)} folder="packages" />
        </div>
        <GalleryArrayField
          values={form.gallery}
          onChange={(v) => set('gallery', v)}
          folder="packages"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-mokara-dark dark:text-white uppercase tracking-wide">
          Trip Details
        </h2>
        <StringListField
          label="Highlights"
          values={form.highlights}
          onChange={(v) => set('highlights', v)}
          placeholder="e.g. Diani Beach sunset walk"
        />
        <ItineraryField values={form.itinerary} onChange={(v) => set('itinerary', v)} />
        <StringListField
          label="Included"
          values={form.included}
          onChange={(v) => set('included', v)}
          placeholder="e.g. All meals"
        />
        <StringListField
          label="Not Included"
          values={form.not_included}
          onChange={(v) => set('not_included', v)}
          placeholder="e.g. Travel insurance"
        />
      </section>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-mokara-orange hover:bg-mokara-orange-dark disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving…' : 'Save Package'}
        </button>

        {isEdit && role === 'owner' && (
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
