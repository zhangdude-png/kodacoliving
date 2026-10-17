import Image from "next/image";
import Link from "next/link";
import { DemoFileButton } from "@/components/console/demo-file-button";
import {
  DEMO_CONTACT_ROLE,
  DEMO_EMAIL,
  DEMO_OPERATOR,
  photos,
  recentActivity,
  roomsForUnit,
  unitStats,
  type Unit,
} from "@/lib/demo-data";
import { pct, sgd, sgdSigned } from "@/lib/format";

export function PropertyView({ unit }: { unit: Unit }) {
  const stats = unitStats(unit);
  const photo = photos[unit.photo];
  const list = roomsForUnit(unit.slug);

  return (
    <div className="grid gap-5">
      <header className="relative overflow-hidden rounded-3xl">
        <div className="relative h-56">
          <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14091f] via-[#14091f]/40 to-transparent" />
          <div className="absolute bottom-0 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Active master lease · {unit.code}</p>
            <h1 className="mt-1 font-heading text-3xl font-bold sm:text-4xl">{unit.name}</h1>
            <p className="text-sm text-white/80">{unit.address}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Operator details</h2>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink/40">Management entity</p>
          <p className="font-semibold">{DEMO_OPERATOR}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink/40">Primary contact</p>
          <p className="font-semibold">{DEMO_CONTACT_ROLE}</p>
          <p className="text-sm text-ink/55">Stub session · no personal name stored</p>
          <div className="mt-4 flex gap-2">
            <a href={`mailto:${DEMO_EMAIL}`} className="rounded-xl border border-line px-3 py-2 text-sm font-semibold">Email</a>
            <a href="tel:+6500000000" className="rounded-xl border border-line px-3 py-2 text-sm font-semibold">Call office</a>
          </div>
        </article>
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Lease information</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-ink/45">Start</dt>
              <dd className="font-semibold">{unit.leaseStart}</dd>
            </div>
            <div>
              <dt className="text-ink/45">End</dt>
              <dd className="font-semibold">{unit.leaseEnd}</dd>
            </div>
          </dl>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary" style={{ width: `${unit.leaseProgress}%` }} />
          </div>
          <p className="mt-2 text-sm text-ink/60">{unit.leaseProgress}% of the master lease elapsed. {unit.leaseNote}</p>
        </article>
        <article className="overflow-hidden rounded-3xl border border-line bg-white">
          <div className="relative h-28">
            <Image src={photos.dining.src} alt={photos.dining.alt} fill className="object-cover" sizes="400px" />
          </div>
          <div className="p-4">
            <h2 className="font-heading font-bold">Surroundings</h2>
            <p className="mt-1 text-sm text-ink/60">{unit.neighbourhood}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-muted px-2 py-1">Neighbourhood amenities</span>
              <span className="rounded-full bg-muted px-2 py-1">Transit nearby</span>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Property documents</h2>
          <ul className="mt-4 grid gap-3">
            <li className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line p-3">
              <div>
                <p className="font-semibold">Master tenancy agreement</p>
                <p className="text-xs text-ink/50">Sample record · not a stored PDF</p>
              </div>
              <DemoFileButton label="Retrieve agreement" detail="Master tenancy agreement for this demo unit." />
            </li>
            <li className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line p-3">
              <div>
                <p className="font-semibold">Insurance policy</p>
                <p className="text-xs text-ink/50">Sample record</p>
              </div>
              <DemoFileButton label="Open" detail="Insurance policy placeholder." />
            </li>
            <li className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line p-3">
              <div>
                <p className="font-semibold">Floor plans</p>
                <p className="text-xs text-ink/50">Sample record</p>
              </div>
              <DemoFileButton label="Open" detail="Floor plan placeholder." />
            </li>
          </ul>
        </article>
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Performance</h2>
          <p className="mt-1 text-xs text-ink/45">Demo snapshot · June 2024</p>
          <p className="mt-3 font-heading text-3xl font-extrabold">{sgd(stats.sublease)}</p>
          <p className="text-sm text-good">Sublease gross · net spread {sgdSigned(stats.net)}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-[#faf9fc] p-3">
              <dt className="text-ink/50">Occupancy</dt>
              <dd className="font-semibold">{pct(stats.occupancy * 100)}</dd>
            </div>
            <div className="rounded-2xl bg-[#faf9fc] p-3">
              <dt className="text-ink/50">Master rent</dt>
              <dd className="font-semibold">{sgd(unit.masterRent)}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr]">
        <article className="rounded-3xl border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold">Rooms</h2>
            <Link href="/app/rooms" className="text-sm font-semibold text-primary">All rooms</Link>
          </div>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {list.map((room) => {
              const image = photos[room.photo];
              return (
                <li key={room.id} className="overflow-hidden rounded-2xl border border-line">
                  <div className="flex gap-3 p-3">
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                      <Image src={image.src} alt="" fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase text-ink/45">{room.status}</p>
                      <p className="font-semibold">{room.code} · {sgd(room.rent)}</p>
                      <p className="truncate text-sm text-ink/60">{room.name}</p>
                      <Link href={`/app/rooms/${room.id}`} className="text-sm font-semibold text-primary">
                        Details
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Recent activity</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {recentActivity.map((item) => (
              <li key={item.title} className="border-b border-line pb-3">
                <p className="font-semibold">{item.title}</p>
                <p className="text-ink/60">{item.detail}</p>
                <p className="text-xs text-ink/40">{item.time}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
