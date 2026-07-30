'use client';

import { Plus, X } from 'lucide-react';

export default function ItineraryField({ values, onChange }) {
  function updateAt(i, key, val) {
    onChange(values.map((item, idx) => (idx === i ? { ...item, [key]: val } : item)));
  }
  function removeAt(i) {
    onChange(values.filter((_, idx) => idx !== i).map((item, idx) => ({ ...item, day: idx + 1 })));
  }
  function add() {
    onChange([...values, { day: values.length + 1, title: '', description: '' }]);
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
        Itinerary
      </label>
      <div className="space-y-3">
        {values.map((item, i) => (
          <div key={i} className="p-3 rounded-xl border border-gray-200 dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-mokara-orange">Day {item.day}</span>
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              value={item.title}
              onChange={(e) => updateAt(i, 'title', e.target.value)}
              placeholder="Day title"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange"
            />
            <textarea
              value={item.description}
              onChange={(e) => updateAt(i, 'description', e.target.value)}
              rows={2}
              placeholder="Day description"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange resize-none"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 flex items-center gap-1 text-xs font-semibold text-mokara-orange hover:underline"
      >
        <Plus className="w-3.5 h-3.5" /> Add day
      </button>
    </div>
  );
}
