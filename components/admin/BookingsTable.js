'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const statuses = ['new', 'contacted', 'booked', 'cancelled'];

const statusColors = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  contacted: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  booked: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  cancelled: 'bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400',
};

export default function BookingsTable({ bookings: initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings);

  async function updateStatus(id, status) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    const supabase = createClient();
    await supabase.from('bookings').update({ status }).eq('id', id);
  }

  return (
    <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-mokara-dark text-left text-xs text-gray-400 uppercase tracking-wide">
          <tr>
            <th className="px-5 py-3 font-semibold">Name</th>
            <th className="px-5 py-3 font-semibold">Contact</th>
            <th className="px-5 py-3 font-semibold">Package</th>
            <th className="px-5 py-3 font-semibold">Travel Date</th>
            <th className="px-5 py-3 font-semibold">Travelers</th>
            <th className="px-5 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-t border-gray-100 dark:border-white/10 align-top">
              <td className="px-5 py-3 font-semibold text-mokara-dark dark:text-white whitespace-nowrap">
                {b.name}
              </td>
              <td className="px-5 py-3 text-gray-500 dark:text-gray-400">
                <p>{b.email}</p>
                <p>{b.phone}</p>
              </td>
              <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{b.package_title || '—'}</td>
              <td className="px-5 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {b.travel_date || '—'}
              </td>
              <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{b.travelers}</td>
              <td className="px-5 py-3">
                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                  className={`text-xs font-semibold rounded-full px-3 py-1.5 border-0 focus:outline-none focus:ring-2 focus:ring-mokara-orange ${statusColors[b.status] || ''}`}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                No enquiries yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
