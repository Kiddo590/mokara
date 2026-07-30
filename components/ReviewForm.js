'use client';

import { useState } from 'react';
import { Star, CheckCircle, Send } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ReviewForm({ packageTitle }) {
  const [form, setForm] = useState({ name: '', location: '', rating: 5, text: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const supabase = createClient();
    const { error: saveError } = await supabase.from('testimonials').insert({
      name: form.name,
      location: form.location || null,
      avatar: form.name.slice(0, 2).toUpperCase(),
      rating: form.rating,
      package_title: packageTitle,
      text: form.text,
    });

    setSaving(false);

    if (saveError) {
      setError('Something went wrong. Please try again.');
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-mokara-sand/30 dark:bg-mokara-dark-soft rounded-2xl p-6 text-center">
        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
        <p className="font-semibold text-mokara-dark dark:text-white mb-1">Thank you!</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your review has been submitted and is pending approval before it appears here.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-mokara-sand/30 dark:bg-mokara-dark-soft rounded-2xl p-6 space-y-4"
    >
      <h3 className="font-bold text-mokara-dark dark:text-white">Share Your Experience</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
            Name *
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
            Location
          </label>
          <input
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
            placeholder="Nairobi, Kenya"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => set('rating', n)}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              className="p-0.5"
            >
              <Star
                className={`w-6 h-6 ${
                  n <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
          Your Review *
        </label>
        <textarea
          required
          value={form.text}
          onChange={(e) => set('text', e.target.value)}
          rows={3}
          placeholder="Tell other travelers about your experience..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 px-5 py-2.5 bg-mokara-orange hover:bg-mokara-orange-dark disabled:opacity-60 text-white font-semibold rounded-full transition-colors text-sm"
      >
        <Send className="w-4 h-4" />
        {saving ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  );
}
