'use client';

import ImageUploader from '@/components/admin/ImageUploader';
import { Plus, X } from 'lucide-react';

export default function GalleryArrayField({ label = 'Extra Gallery Images', values, onChange, folder }) {
  function updateAt(i, url) {
    const next = [...values];
    next[i] = url;
    onChange(next);
  }
  function removeAt(i) {
    onChange(values.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...values, '']);
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {values.map((url, i) => (
          <div key={i} className="relative">
            <ImageUploader value={url} onChange={(u) => updateAt(i, u)} folder={folder} />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 flex items-center gap-1 text-xs font-semibold text-mokara-orange hover:underline"
      >
        <Plus className="w-3.5 h-3.5" /> Add image
      </button>
    </div>
  );
}
