import { redirect } from 'next/navigation';
import { getCurrentAdminRole } from '@/lib/adminAuth';
import TeamManager from '@/components/admin/TeamManager';
import BackLink from '@/components/admin/BackLink';

export default async function AdminTeamPage() {
  const role = await getCurrentAdminRole();
  if (role !== 'owner') redirect('/admin');

  return (
    <div>
      <BackLink href="/admin" label="Back to Dashboard" />
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-2">Team</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Invite staff to help manage bookings, testimonials, gallery, and package availability. Staff
        can&apos;t create or delete packages, or manage other admins.
      </p>
      <TeamManager />
    </div>
  );
}
