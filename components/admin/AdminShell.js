'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';

export default function AdminShell({ email, role, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-mokara-sand/10 dark:bg-mokara-dark">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-mokara-dark-soft p-5 flex-col justify-between">
        <div>
          <p className="text-lg font-bold text-mokara-dark dark:text-white mb-1">Moucara Admin</p>
          <p className="text-xs text-gray-400 mb-6 truncate">{email}</p>
          <AdminNav role={role} />
        </div>
        <LogoutButton />
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-mokara-dark-soft">
          <p className="font-bold text-mokara-dark dark:text-white">Moucara Admin</p>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="p-2 -mr-2 text-mokara-dark dark:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">{children}</main>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative w-72 max-w-[85vw] h-full bg-white dark:bg-mokara-dark-soft p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-lg font-bold text-mokara-dark dark:text-white">Moucara Admin</p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-6 truncate">{email}</p>
              <AdminNav role={role} onNavigate={() => setOpen(false)} />
            </div>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
