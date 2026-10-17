import Link from "next/link";
import { portfolioStats, revenueSeries } from "@/lib/demo-data";
import { pct, sgd, sgdSigned } from "@/lib/format";

export function Dashboard() {
  const stats = portfolioStats();
  const max = Math.max(...revenueSeries.map((point) => point.revenue));
  const mom = ((38400 - 34160) / 34160) * 100;

  return (
    <div className="grid gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-ink">
            Singapore cluster · Live portfolio · Demo snapshot
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold">Executive Business Dashboard</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink/65">
            Sample financials, occupancy, and operations for a master-leased fleet. Snapshot window: Jan 2024 – Jun 2024.
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="rounded-xl border border-line bg-white px-3 py-2 font-medium">
            {stats.units} units · {stats.roomCount} rooms
          </span>
          <span className="rounded-xl border border-line bg-white px-3 py-2 font-medium">Demo statement</span>
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <Kpi
          label="Monthly sublease"
          value={sgd(stats.sublease)}
          note={`+${mom.toFixed(1)}% vs May · master lease ${sgd(stats.master)}`}
        />
        <Kpi
          label="Portfolio occupancy"
          value={pct(stats.occupancy * 100)}
          note={`${stats.occupied} of ${stats.roomCount} occupied · ${stats.reserved} reserved · ${stats.vacant} available`}
        />
        <Kpi
          label="Autonomous ops"
          value="96.4%"
          note="416 sample tickets closed · 1.4s median reply in the demo log"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_0.8fr]">
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Month-over-month revenue</h2>
          <p className="text-sm text-ink/55">Sublease gross, Jan–Jun 2024 demo series. June is the live total.</p>
          <div className="mt-6 flex h-52 items-end gap-3">
            {revenueSeries.map((point) => (
              <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end">
                  <div
                    className="w-full rounded-t-xl bg-primary"
                    style={{ height: `${(point.revenue / max) * 100}%` }}
                    title={sgd(point.revenue)}
                  />
                </div>
                <span className="text-xs text-ink/55">{point.month}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink/50">
            June net spread {sgd(stats.net)} after the master lease. Bars are sublease gross, not margin.
          </p>
        </article>
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Capacity and status</h2>
          <div className="mt-4 flex items-center gap-4">
            <Donut occupied={stats.occupied} reserved={stats.reserved} vacant={stats.vacant} total={stats.roomCount} />
            <ul className="grid gap-2 text-sm">
              <li><span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />Occupied {stats.occupied}</li>
              <li><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#c4b5fd]" />Reserved {stats.reserved}</li>
              <li><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d9d6e2]" />Available {stats.vacant}</li>
            </ul>
          </div>
          <p className="mt-4 text-sm text-ink/60">
            One room reserved at Opal Crescent. One room available for viewing at St Francis Court.
          </p>
        </article>
      </section>

      <section className="overflow-x-auto rounded-3xl border border-line bg-white">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="font-heading text-lg font-bold">Property performance</h2>
          <span className="text-xs font-semibold text-ink/45">Demo seed</span>
        </div>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-ink/45">
            <tr>
              <th className="px-5 py-2 font-semibold">Property</th>
              <th className="px-3 py-2 font-semibold">Rooms</th>
              <th className="px-3 py-2 font-semibold">Occupancy</th>
              <th className="px-3 py-2 font-semibold">Master rent</th>
              <th className="px-3 py-2 font-semibold">Sublease</th>
              <th className="px-3 py-2 font-semibold">Net spread</th>
              <th className="px-5 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {stats.perUnit.map((row) => (
              <tr key={row.unit.slug} className="border-t border-line">
                <td className="px-5 py-3">
                  <Link href={`/app/units/${row.unit.slug}`} className="font-semibold hover:text-primary">
                    {row.unit.name}
                  </Link>
                  <p className="text-xs text-ink/50">{row.unit.address}</p>
                </td>
                <td className="px-3 py-3">{row.rooms}</td>
                <td className="px-3 py-3">{pct(row.occupancy * 100)}</td>
                <td className="px-3 py-3">{sgd(row.unit.masterRent)}</td>
                <td className="px-3 py-3">{sgd(row.sublease)}</td>
                <td className="px-3 py-3 font-semibold text-good">{sgdSigned(row.net)}</td>
                <td className="px-5 py-3">
                  {row.reserved ? "1 reserved" : row.vacant ? "1 available" : "Healthy"}
                </td>
              </tr>
            ))}
            <tr className="border-t border-line bg-[#faf9fc] font-semibold">
              <td className="px-5 py-3">Portfolio</td>
              <td className="px-3 py-3">{stats.roomCount}</td>
              <td className="px-3 py-3">{pct(stats.occupancy * 100)}</td>
              <td className="px-3 py-3">{sgd(stats.master)}</td>
              <td className="px-3 py-3">{sgd(stats.sublease)}</td>
              <td className="px-3 py-3 text-good">{sgdSigned(stats.net)}</td>
              <td className="px-5 py-3">Demo total</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Tenancy watch</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="rounded-2xl bg-[#faf9fc] p-3">
              <p className="font-semibold">Room B-01 · Opal Crescent</p>
              <p className="text-ink/60">Tenancy review flagged inside 18 days in this snapshot. On track.</p>
            </li>
            <li className="rounded-2xl bg-[#faf9fc] p-3">
              <p className="font-semibold">Room CR1 · St Francis Court</p>
              <p className="text-ink/60">Work pass verified. Document number is not shown.</p>
            </li>
            <li className="rounded-2xl bg-[#faf9fc] p-3">
              <p className="font-semibold">June rent collection</p>
              <p className="text-ink/60">Demo ledger marks occupied-room invoices settled via PayNow GIRO.</p>
            </li>
          </ul>
        </article>
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">AI autonomous operations</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="rounded-2xl bg-[#f3fbf7] p-3">
              <p className="font-semibold">Aircon servicing</p>
              <p className="text-ink/65">Quarterly visits grouped for St Francis Court. Demo note shows an 18% gap versus ad-hoc callouts.</p>
            </li>
            <li className="rounded-2xl bg-[#f3fbf7] p-3">
              <p className="font-semibold">Handyman dispatch · CR1</p>
              <p className="text-ink/65">Drainage inspection scheduled for the next day, 2:00–3:00 PM. Ticket #AC-002.</p>
            </li>
            <li className="rounded-2xl bg-primary p-4 text-white">
              <p className="font-heading text-lg font-bold">Illustrative: 30 hours of thread-work</p>
              <p className="mt-1 text-sm text-white/80">
                Covered in this demo snapshot by drafted replies, work orders, and GIRO receipts. Not a measured customer result.
              </p>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}

function Kpi({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <article className="rounded-3xl border border-line bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-secondary-ink">{label}</p>
      <p className="mt-2 font-heading text-3xl font-extrabold">{value}</p>
      <p className="mt-2 text-sm text-ink/60">{note}</p>
    </article>
  );
}

function Donut({
  occupied,
  reserved,
  vacant,
  total,
}: {
  occupied: number;
  reserved: number;
  vacant: number;
  total: number;
}) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const parts = [
    { value: occupied, color: "#60308D" },
    { value: reserved, color: "#c4b5fd" },
    { value: vacant, color: "#d9d6e2" },
  ];
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-32" role="img" aria-label={`${occupied} of ${total} rooms occupied`}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="#f3f2f6" strokeWidth="12" />
      {parts.map((part) => {
        const length = (part.value / total) * c;
        const dash = `${length} ${c - length}`;
        const el = (
          <circle
            key={part.color}
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={part.color}
            strokeWidth="12"
            strokeDasharray={dash}
            strokeDashoffset={-offset}
            transform="rotate(-90 60 60)"
          />
        );
        offset += length;
        return el;
      })}
      <text x="60" y="58" textAnchor="middle" className="fill-ink" fontSize="16" fontWeight="700">
        {occupied}/{total}
      </text>
      <text x="60" y="74" textAnchor="middle" fontSize="8" className="fill-ink/50">
        rooms
      </text>
    </svg>
  );
}
