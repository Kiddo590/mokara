'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const emptyTestimonial = {
  name: '',
  location: '',
  avatar: '',
  rating: 5,
  package_title: '',
  text: '',
  sort_order: 0,
};

function inputClass() {
  return 'w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange';
}

function labelClass() {
  return 'block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide';
}

export default function TestimonialForm({ initialTestimonial }) {
  const router = useRouter();
  const isEdit = Boolean(initialTestimonial);
  const [form, setForm] = useState(() => ({ ...emptyTestimonial, ...initialTestimonial }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const { id, created_at, ...rest } = form;
    const payload = { ...rest, rating: Number(form.rating) || 5, sort_order: Number(form.sort_order) || 0 };

    const supabase = createClient();
    const { error: saveError } = isEdit
      ? await supabase.from('testimonials').update(payload).eq('id', initialTestimonial.id)
      : await supabase.from('testimonials').insert(payload);

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.push('/admin/testimonials');
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm('Delete this testimonial?')) return;
    const supabase = createClient();
    await supabase.from('testimonials').delete().eq('id', initialTestimonial.id);
    router.push('/admin/testimonials');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      {error && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg px-4 py-2">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass()}>Name</label>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass()} />
        </div>
        <div>
          <label className={labelClass()}>Location</label>
          <input value={form.location} onChange={(e) => set('location', e.target.value)} className={inputClass()} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass()}>Avatar initials</label>
          <input
            value={form.avatar}
            onChange={(e) => set('avatar', e.target.value)}
            placeholder="e.g. AW"
            maxLength={3}
            className={inputClass()}
          />
        </div>
        <div>
          <label className={labelClass()}>Package mentioned</label>
          <input
            value={form.package_title}
            onChange={(e) => set('package_title', e.target.value)}
            className={inputClass()}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass()}>Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={form.rating}
            onChange={(e) => set('rating', e.target.value)}
            className={inputClass()}
          />
        </div>
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

      <div>
        <label className={labelClass()}>Review text</label>
        <textarea
          required
          value={form.text}
          onChange={(e) => set('text', e.target.value)}
          rows={4}
          className={`${inputClass()} resize-none`}
        />
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-mokara-orange hover:bg-mokara-orange-dark disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving…' : 'Save Testimonial'}
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
