import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-start justify-center px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">404</p>
      <h1 className="mt-2 font-heading text-4xl font-bold">That page is not on this site.</h1>
      <p className="mt-3 text-sm text-ink/70">
        The marketing pages and the demo operator console are linked below.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
          Operators
        </Link>
        <Link href="/for-landlords" className="rounded-xl border border-line px-4 py-2 text-sm font-semibold">
          For landlords
        </Link>
      </div>
    </main>
  );
}
