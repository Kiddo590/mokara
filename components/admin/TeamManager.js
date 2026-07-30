'use client';

import { useEffect, useState } from 'react';
import { UserPlus, Trash2, Shield, User } from 'lucide-react';

export default function TeamManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState('');

  async function loadUsers() {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleInvite(e) {
    e.preventDefault();
    setInviting(true);
    setError('');

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    setInviting(false);

    if (!res.ok) {
      setError(data.error || 'Failed to invite.');
      return;
    }

    setEmail('');
    loadUsers();
  }

  async function handleRemove(id) {
    if (!confirm('Remove this admin? They will lose access immediately.')) return;

    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Failed to remove.');
      return;
    }

    loadUsers();
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="staff@example.com"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-sm text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange"
        />
        <button
          type="submit"
          disabled={inviting}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-mokara-orange hover:bg-mokara-orange-dark disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4" />
          {inviting ? 'Inviting…' : 'Invite Staff'}
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg px-4 py-2 mb-4">{error}</p>
      )}

      {loading ? (
        <p className="text-sm text-gray-400">Loading team…</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex items-center justify-between gap-3 p-4 bg-white dark:bg-mokara-dark-soft rounded-xl border border-gray-100 dark:border-white/10"
            >
              <div className="flex items-center gap-3 min-w-0">
                {u.role === 'owner' ? (
                  <Shield className="w-4 h-4 text-mokara-orange shrink-0" />
                ) : (
                  <User className="w-4 h-4 text-gray-400 shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-mokara-dark dark:text-white truncate">
                    {u.email}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{u.role}</p>
                </div>
              </div>
              {u.role !== 'owner' && (
                <button
                  onClick={() => handleRemove(u.id)}
                  aria-label={`Remove ${u.email}`}
                  className="p-2 text-gray-400 hover:text-red-500 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
