import { createClient } from '@/lib/supabase/server';
import BookingsTable from '@/components/admin/BookingsTable';
import BackLink from '@/components/admin/BackLink';

async function getBookings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return data;
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div>
      <BackLink href="/admin" label="Back to Dashboard" />
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white mb-6">Booking Enquiries</h1>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
