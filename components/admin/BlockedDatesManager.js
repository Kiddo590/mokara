'use client';

import { useState } from 'react';
import { CalendarOff, Plus, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function datesInRange(start, end) {
  const dates = [];
  const cur = new Date(start);
  const last = new Date(end);
  while (cur <= last) {
    dates.push(cur.toISOString().split('T')[0]);
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

export default function BlockedDatesManager({ packageId, initialDates }) {
  const [dates, setDates] = useState(initialDates);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleAdd(e) {
    e.preventDefault();
    if (!start) return;

    setSaving(true);
    setError('');

    const range = datesInRange(start, end || start);
    const rows = range.map((date) => ({ package_id: packageId, date, reason: reason || null }));

    const supabase = createClient();
    const { data, error: saveError } = await supabase
      .from('package_unavailable_dates')
      .upsert(rows, { onConflict: 'package_id,date' })
      .select('id, date, reason');

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    const merged = [...dates.filter((d) => !range.includes(d.date)), ...data];
    setDates(merged.sort((a, b) => a.date.localeCompare(b.date)));
    setStart('');
    setEnd('');
    setReason('');
  }

  async function handleRemove(id) {
    const supabase = createClient();
    await supabase.from('package_unavailable_dates').delete().eq('id', id);
    setDates((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <section className="mt-10 max-w-3xl">
      <h2 className="text-sm font-bold text-mokara-dark dark:text-white uppercase tracking-wide mb-4 flex items-center gap-2">
        <CalendarOff className="w-4 h-4 text-mokara-orange" />
        Blocked Dates
      </h2>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg px-4 py-2 mb-3">{error}</p>
      )}

      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-3 mb-5">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
            From
          </label>
          <input
            type="date"
            required
            min={todayISO()}
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
            To (optional)
          </label>
          <input
            type="date"
            min={start || todayISO()}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange"
          />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
            Reason (optional)
          </label>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Sold out"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 bg-mokara-orange hover:bg-mokara-orange-dark disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          {saving ? 'Adding…' : 'Add'}
        </button>
      </form>

      {dates.length === 0 ? (
        <p className="text-sm text-gray-400">No blocked dates — this package is bookable any time.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {dates.map((d) => (
            <li
              key={d.id}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-mokara-dark-soft rounded-full text-xs text-gray-600 dark:text-gray-300"
            >
              {d.date}
              {d.reason && <span className="text-gray-400">— {d.reason}</span>}
              <button
                type="button"
                onClick={() => handleRemove(d.id)}
                aria-label={`Remove blocked date ${d.date}`}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
