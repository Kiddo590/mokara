'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (signInError) {
      setError('Invalid email or password.');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mokara-sand/20 dark:bg-mokara-dark px-4">
      <div className="w-full max-w-sm bg-white dark:bg-mokara-dark-soft rounded-2xl shadow-lg p-8">
        <h1 className="text-xl font-bold text-mokara-dark dark:text-white mb-1">Owner Login</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Sign in to manage Moucara Adventures content.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-mokara-dark text-mokara-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-mokara-orange text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-mokara-orange hover:bg-mokara-orange-dark disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
