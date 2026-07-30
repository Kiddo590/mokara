'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}
