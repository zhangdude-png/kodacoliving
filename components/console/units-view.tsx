"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { photos, units, unitStats, portfolioStats } from "@/lib/demo-data";
import { pct, sgd } from "@/lib/format";

export function UnitsView() {
  const [sort, setSort] = useState<"rooms" | "occupancy" | "revenue">("rooms");
  const portfolio = portfolioStats();
  const rows = units
    .map((unit) => ({ unit, ...unitStats(unit) }))
    .sort((a, b) => {
      if (sort === "occupancy") return b.occupancy - a.occupancy;
      if (sort === "revenue") return b.sublease - a.sublease;
      return b.rooms - a.rooms;
    });

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-ink">
            Singapore cluster · Live portfolio
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold">Unit Inventory</h1>
          <p className="mt-1 text-sm text-ink/65">
            {portfolio.units} active units · {portfolio.roomCount} rooms · {pct(portfolio.occupancy * 100)} average occupancy
          </p>
        </div>
        <Link href="/app/rooms" className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-semibold">
          Switch to Room View
        </Link>
      </header>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <label className="text-sm font-medium">
          Sort
          <select
            className="ml-2 h-10 rounded-xl border border-line bg-white px-3"
            value={sort}
            onChange={(event) => setSort(event.target.value as typeof sort)}
          >
            <option value="rooms">Rooms</option>
            <option value="occupancy">Occupancy</option>
            <option value="revenue">Sublease revenue</option>
          </select>
        </label>
        <p className="text-sm text-ink/60">
          Total sublease {sgd(portfolio.sublease)}/mo · Avg occupancy {pct(portfolio.occupancy * 100)}
        </p>
      </div>
      <ul className="mt-5 grid gap-4 lg:grid-cols-2">
        {rows.map((row) => {
          const photo = photos[row.unit.photo];
          return (
            <li key={row.unit.slug} className="overflow-hidden rounded-3xl border border-line bg-white">
              <div className="relative h-44">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold">
                  {pct(row.occupancy * 100, 0)} occupied
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-heading text-xl font-bold">{row.unit.name}</h2>
                    <p className="text-sm text-ink/55">{row.unit.address}</p>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-1 text-xs font-semibold">{row.unit.code}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-semibold">{row.rooms} rooms</span>
                  <span>
                    {row.occupied} occupied ({pct(row.occupancy * 100, 0)})
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-secondary" style={{ width: `${row.occupancy * 100}%` }} />
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[#faf9fc] p-3">
                    <dt className="text-ink/50">Master rent</dt>
                    <dd className="font-semibold">{sgd(row.unit.masterRent)}/mo</dd>
                  </div>
                  <div className="rounded-2xl bg-[#faf9fc] p-3">
                    <dt className="text-ink/50">Sublease revenue</dt>
                    <dd className="font-semibold">{sgd(row.sublease)}/mo</dd>
                  </div>
                </dl>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-ink/55">Managed by Koda Coliving · Active monitoring</span>
                  <Link href={`/app/units/${row.unit.slug}`} className="font-semibold text-primary">
                    View {row.rooms} rooms →
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-sm text-ink/50">Showing 1–{rows.length} of {rows.length} units · Demo operational readiness</p>
    </div>
  );
}
