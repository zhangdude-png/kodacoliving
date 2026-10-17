"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getUnit, photos, rooms, type RoomStatus } from "@/lib/demo-data";
import { pct, sgd } from "@/lib/format";

const PAGE_SIZE = 8;

export function RoomsView() {
  const [status, setStatus] = useState<"all" | RoomStatus>("all");
  const [sort, setSort] = useState<"vacant" | "rent-desc" | "rent-asc" | "code">("vacant");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const list = rooms.filter((room) => status === "all" || room.status === status);
    const rank = { vacant: 0, reserved: 1, occupied: 2 };
    return [...list].sort((a, b) => {
      if (sort === "rent-desc") return b.rent - a.rent;
      if (sort === "rent-asc") return a.rent - b.rent;
      if (sort === "code") return a.code.localeCompare(b.code);
      return rank[a.status] - rank[b.status] || a.code.localeCompare(b.code);
    });
  }, [status, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const occupied = rooms.filter((room) => room.status === "occupied").length;

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-ink">
            Singapore cluster · Live portfolio
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold">Room Inventory</h1>
          <p className="mt-1 text-sm text-ink/65">{rooms.length} active rooms · Singapore portfolio · demo seed</p>
        </div>
        <Link href="/app/units" className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-semibold">
          Switch to Unit View
        </Link>
      </header>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium">
          Status
          <select
            className="ml-2 h-10 rounded-xl border border-line bg-white px-3"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as typeof status);
              setPage(1);
            }}
          >
            <option value="all">All statuses ({rooms.length})</option>
            <option value="occupied">Occupied</option>
            <option value="vacant">Vacant</option>
            <option value="reserved">Reserved</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Sort
          <select
            className="ml-2 h-10 rounded-xl border border-line bg-white px-3"
            value={sort}
            onChange={(event) => setSort(event.target.value as typeof sort)}
          >
            <option value="vacant">Vacant first</option>
            <option value="rent-desc">Rent high to low</option>
            <option value="rent-asc">Rent low to high</option>
            <option value="code">Room code</option>
          </select>
        </label>
        <p className="ml-auto text-sm text-ink/60">
          Total revenue {sgd(rooms.filter((room) => room.status === "occupied").reduce((sum, room) => sum + room.rent, 0))}/mo · Occupancy {pct((occupied / rooms.length) * 100)} ({occupied}/{rooms.length})
        </p>
      </div>
      {slice.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-white p-10 text-center">
          <h2 className="font-heading text-xl font-bold">No rooms match this filter</h2>
          <p className="mt-2 text-sm text-ink/60">Clear the status filter to see the full demo portfolio.</p>
        </div>
      ) : (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {slice.map((room) => {
            const unit = getUnit(room.unitSlug);
            const photo = photos[room.photo];
            return (
              <li key={room.id} className="overflow-hidden rounded-3xl border border-line bg-white">
                <div className="relative aspect-[16/10]">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(min-width: 1280px) 25vw, 50vw" />
                  <span className={`absolute left-3 top-3 rounded-full px-2 py-1 text-[11px] font-bold uppercase ${badgeClass(room.status)}`}>
                    {room.status}
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="font-heading text-lg font-bold leading-tight">
                    {unit?.name} <span className="text-primary">{sgd(room.rent)}</span>
                  </h2>
                  <p className="text-sm text-ink/60">{room.code} · {room.name}</p>
                  <ul className="mt-2 flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((item) => (
                      <li key={item} className="rounded-full bg-muted px-2 py-0.5 text-[11px]">{item}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-ink/60">
                      {room.status === "occupied" ? "Resident on file" : room.status === "reserved" ? "Contract pending" : "Unoccupied · ready"}
                    </span>
                    <Link href={`/app/rooms/${room.id}`} className="font-semibold text-primary">
                      {room.status === "occupied" ? "Lease info" : "View details"}
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-ink/55">
          {filtered.length === 0
            ? "Showing 0 rooms"
            : `Showing ${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filtered.length)} of ${filtered.length} rooms · Demo operational readiness`}
        </p>
        <div className="flex gap-1">
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              className={`h-9 w-9 rounded-xl font-semibold ${number === safePage ? "bg-primary text-white" : "bg-white border border-line"}`}
              aria-current={number === safePage ? "page" : undefined}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function badgeClass(status: RoomStatus) {
  if (status === "occupied") return "bg-[#e7f6ee] text-good";
  if (status === "reserved") return "bg-[#fff6e5] text-tertiary";
  return "bg-white text-primary";
}
