'use client';

import { Plus, X } from 'lucide-react';

export default function StringListField({ label, values, onChange, placeholder }) {
  function updateAt(i, val) {
    const next = [...values];
    next[i] = val;
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
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={v}
              onChange={(e) => updateAt(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange"
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="px-2 text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 flex items-center gap-1 text-xs font-semibold text-mokara-orange hover:underline"
      >
        <Plus className="w-3.5 h-3.5" /> Add item
      </button>
    </div>
  );
}
