import Link from "next/link";

export default function ConsoleNotFound() {
  return (
    <div className="rounded-3xl border border-line bg-white p-8">
      <h1 className="font-heading text-2xl font-bold">That record is not in the demo portfolio</h1>
      <p className="mt-2 text-sm text-ink/70">
        The seed data has four units and 24 rooms. Try the inventory, or go back to the dashboard.
      </p>
      <div className="mt-5 flex gap-3">
        <Link href="/app" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
          Dashboard
        </Link>
        <Link href="/app/rooms" className="rounded-xl border border-line px-4 py-2 text-sm font-semibold">
          Rooms
        </Link>
      </div>
    </div>
  );
}
