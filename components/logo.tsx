import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  inverted = false,
  subline = "Autonomous ops",
  href = "/",
}: {
  inverted?: boolean;
  subline?: string;
  href?: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5.2v-5.2H10.2V21H5a1 1 0 0 1-1-1v-9.5Z"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "flex items-center gap-1.5 font-heading text-[15px] font-bold tracking-tight",
            inverted ? "text-white" : "text-ink",
          )}
        >
          Koda Coliving
          <span className="rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
            AI
          </span>
        </span>
        <span
          className={cn(
            "block text-[10px] font-semibold uppercase tracking-[0.16em]",
            inverted ? "text-white/70" : "text-ink/50",
          )}
        >
          {subline}
        </span>
      </span>
    </Link>
  );
}
