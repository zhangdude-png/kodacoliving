"use client";

import {
  BedDouble,
  Bell,
  Building2,
  CircleHelp,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { rooms, units } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/rooms", label: "View by Rooms", icon: BedDouble },
  { href: "/app/units", label: "View by Units", icon: Building2 },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function ConsoleChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f2f6] text-ink">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-white px-3 py-4 transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-2">
          <Logo href="/app" className="h-10" />
          <button type="button" className="lg:hidden" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mx-2 mt-4 rounded-full bg-[#e7f6f4] px-3 py-1 text-[11px] font-semibold text-secondary-ink">
          Singapore cluster · Live portfolio
        </p>
        <nav className="mt-4 grid gap-1" aria-label="Console">
          {nav.map((item) => {
            const active = item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium",
                  active ? "bg-primary text-white" : "text-ink/75 hover:bg-muted",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl border border-line p-3">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-soft text-xs font-bold text-primary">OL</span>
            <div>
              <p className="text-sm font-semibold">Ops Lead</p>
              <p className="text-xs text-ink/50">ops@koda.demo</p>
            </div>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-good">Stub session · demo data</p>
        </div>
      </aside>
      {open ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-30 bg-[#1b1430]/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <SearchBox />
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1 rounded-full border border-line px-2 py-1 text-xs text-ink/60 sm:inline-flex" title="Notifications are not connected">
              <Bell className="h-4 w-4" />
            </span>
            <Link href="/app/settings" className="hidden items-center gap-1 rounded-full border border-line px-2 py-1 text-xs text-ink/60 sm:inline-flex" aria-label="Help and settings">
              <CircleHelp className="h-4 w-4" />
            </Link>
            <span className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-primary">Ops Lead</span>
          </div>
        </header>
        <p className="bg-[#fff6e8] px-4 py-2 text-xs text-tertiary sm:px-6">
          Demo data · sample portfolio frozen at 30 June 2024 · Supabase Auth is not connected. These figures are not the St Francis case study.
        </p>
        <main className="px-4 py-6 sm:px-6">{children}</main>
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-4 text-xs text-ink/50 sm:px-6">
          <p>© 2026 Koda Coliving.AI · Demo build · v0.1</p>
          <p className="text-good">All figures on this screen are sample data</p>
          <nav className="flex gap-3">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}

function SearchBox() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    const unitHits = units
      .filter((unit) => `${unit.name} ${unit.code} ${unit.address}`.toLowerCase().includes(q))
      .map((unit) => ({ href: `/app/units/${unit.slug}`, label: unit.name, meta: unit.code }));
    const roomHits = rooms
      .filter((room) => `${room.code} ${room.name} ${room.id}`.toLowerCase().includes(q))
      .map((room) => ({ href: `/app/rooms/${room.id}`, label: room.code, meta: room.name }));
    return [...unitHits, ...roomHits].slice(0, 8);
  }, [query]);

  return (
    <div className="relative min-w-0 flex-1 max-w-xl">
      <label className="relative block">
        <span className="sr-only">Search unit, room, or code</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search unit, room, or code"
          className="h-10 w-full rounded-xl border border-line bg-[#faf9fc] pl-9 pr-3 text-sm outline-none focus-visible:border-primary"
        />
      </label>
      {query.trim() ? (
        <ul className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-line bg-white shadow-lg">
          {results.length === 0 ? (
            <li className="px-3 py-2 text-sm text-ink/60">No match in the demo portfolio.</li>
          ) : (
            results.map((result) => (
              <li key={result.href}>
                <Link
                  href={result.href}
                  onClick={() => setQuery("")}
                  className="flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-muted"
                >
                  <span className="font-medium">{result.label}</span>
                  <span className="text-ink/50">{result.meta}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
