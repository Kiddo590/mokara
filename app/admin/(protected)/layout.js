import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminProtectedLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  return (
    <div className="min-h-screen flex bg-mokara-sand/10 dark:bg-mokara-dark">
      <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-mokara-dark-soft p-5 flex flex-col justify-between">
        <div>
          <p className="text-lg font-bold text-mokara-dark dark:text-white mb-1">Moucara Admin</p>
          <p className="text-xs text-gray-400 mb-6 truncate">{user.email}</p>
          <AdminNav />
        </div>
        <LogoutButton />
      </aside>
      <main className="flex-1 p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
