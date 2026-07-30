import { createClient } from '@/lib/supabase/server';
import BackLink from '@/components/admin/BackLink';

const STATUS_LABELS = { new: 'New', contacted: 'Contacted', booked: 'Booked', cancelled: 'Cancelled' };
// Same mapping used in BookingsTable.js, reused here so status identity stays
// visually consistent across the admin panel.
const STATUS_COLORS = {
  new: '#3b82f6',
  contacted: '#d97706',
  booked: '#16a34a',
  cancelled: '#9ca3af',
};
const ORANGE = '#E8692A';

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7; // days since Monday
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function getAnalytics() {
  const supabase = await createClient();
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('package_title, status, created_at');

  if (error || !bookings) {
    console.error('getAnalytics error', error);
    return null;
  }

  const total = bookings.length;

  const statusCounts = { new: 0, contacted: 0, booked: 0, cancelled: 0 };
  for (const b of bookings) {
    if (statusCounts[b.status] !== undefined) statusCounts[b.status] += 1;
  }
  const conversionRate = total > 0 ? Math.round((statusCounts.booked / total) * 100) : 0;

  const byPackage = {};
  for (const b of bookings) {
    const key = b.package_title || 'Not specified';
    byPackage[key] = (byPackage[key] || 0) + 1;
  }
  const topPackages = Object.entries(byPackage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const weeks = [];
  const now = new Date();
  for (let i = 7; i >= 0; i--) {
    const weekStart = startOfWeek(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const count = bookings.filter((b) => {
      const created = new Date(b.created_at);
      return created >= weekStart && created < weekEnd;
    }).length;
    weeks.push({
      label: weekStart.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' }),
      count,
    });
  }

  return { total, statusCounts, conversionRate, topPackages, weeks };
}

function BarRow({ label, value, max, color }) {
  const pct = max > 0 ? Math.max((value / max) * 100, value > 0 ? 4 : 0) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 shrink-0 text-sm text-gray-500 dark:text-gray-400 truncate">{label}</span>
      <div className="flex-1 h-6 bg-gray-100 dark:bg-mokara-dark rounded-full overflow-hidden">
        <div
          className="h-full rounded-full flex items-center justify-end px-2 transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        >
          {value > 0 && <span className="text-xs font-semibold text-white">{value}</span>}
        </div>
      </div>
    </div>
  );
}

export default async function AdminAnalyticsPage() {
  const data = await getAnalytics();

  if (!data) {
    return <p className="text-gray-400">Couldn&apos;t load analytics right now.</p>;
  }

  const { total, statusCounts, conversionRate, topPackages, weeks } = data;
  const maxPackageCount = Math.max(...topPackages.map(([, count]) => count), 1);
  const maxWeekCount = Math.max(...weeks.map((w) => w.count), 1);

  return (
    <div className="space-y-8 max-w-4xl">
      <BackLink href="/admin" label="Back to Dashboard" />
      <h1 className="text-2xl font-bold text-mokara-dark dark:text-white">Analytics</h1>

      {/* Top stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/10">
          <p className="text-3xl font-bold text-mokara-dark dark:text-white">{total}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Enquiries</p>
        </div>
        <div className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/10">
          <p className="text-3xl font-bold text-mokara-dark dark:text-white">{conversionRate}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Booked Conversion</p>
        </div>
      </div>

      {/* Status breakdown */}
      <section className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
        <h2 className="text-sm font-bold text-mokara-dark dark:text-white uppercase tracking-wide mb-5">
          Enquiries by Status
        </h2>
        <div className="space-y-3">
          {Object.entries(statusCounts).map(([status, count]) => (
            <BarRow
              key={status}
              label={STATUS_LABELS[status]}
              value={count}
              max={total}
              color={STATUS_COLORS[status]}
            />
          ))}
        </div>
      </section>

      {/* Top packages */}
      <section className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
        <h2 className="text-sm font-bold text-mokara-dark dark:text-white uppercase tracking-wide mb-5">
          Top Packages by Enquiries
        </h2>
        {topPackages.length === 0 ? (
          <p className="text-sm text-gray-400">No enquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {topPackages.map(([title, count]) => (
              <BarRow key={title} label={title} value={count} max={maxPackageCount} color={ORANGE} />
            ))}
          </div>
        )}
      </section>

      {/* Weekly trend */}
      <section className="bg-white dark:bg-mokara-dark-soft rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
        <h2 className="text-sm font-bold text-mokara-dark dark:text-white uppercase tracking-wide mb-5">
          Enquiries — Last 8 Weeks
        </h2>
        <div className="flex items-end gap-2 h-32">
          {weeks.map((w) => (
            <div key={w.label} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs font-semibold text-mokara-dark dark:text-white">{w.count}</span>
              <div
                className="w-full rounded-t-md"
                style={{
                  height: `${Math.max((w.count / maxWeekCount) * 100, w.count > 0 ? 6 : 2)}%`,
                  backgroundColor: ORANGE,
                  minHeight: '2px',
                }}
              />
              <span className="text-[10px] text-gray-400 whitespace-nowrap">{w.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
