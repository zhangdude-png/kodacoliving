import Link from "next/link";
import { horizontalLockup, markPaths, stackedLockup } from "@/components/brand/paths";
import { cn } from "@/lib/utils";

export type LogoTone = "color" | "reversed" | "onDark";
export type LogoVariant = "horizontal" | "stacked" | "mark";

function palette(tone: LogoTone) {
  if (tone === "reversed") {
    return { stem: "#FFFFFF", arm: "#FFFFFF", bubble: "#FFFFFF", word: "#FFFFFF", tag: "#FFFFFF" };
  }
  if (tone === "onDark") {
    return { stem: "#FFFFFF", arm: "#FFFFFF", bubble: "#44898C", word: "#FFFFFF", tag: "#44898C" };
  }
  return { stem: "#60308D", arm: "#60308D", bubble: "#44898C", word: "#60308D", tag: "#44898C" };
}

function MarkShapes({ tone }: { tone: LogoTone }) {
  const c = palette(tone);
  const [x, y, width, height, radius] = markPaths.stem;
  return (
    <g>
      <path
        d={markPaths.bubble}
        fill="none"
        stroke={c.bubble}
        strokeWidth={15}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={markPaths.arm}
        fill="none"
        stroke={c.arm}
        strokeWidth={15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={x} y={y} width={width} height={height} rx={radius} fill={c.stem} />
      <path d={markPaths.leg} fill="none" stroke={c.arm} strokeWidth={17} strokeLinecap="round" />
    </g>
  );
}

export function KodaMark({
  tone = "color",
  className,
}: {
  tone?: LogoTone;
  className?: string;
}) {
  const [x, y, width, height] = markPaths.viewBox;
  return (
    <svg viewBox={`${x} ${y} ${width} ${height}`} className={className} aria-hidden="true">
      <MarkShapes tone={tone} />
    </svg>
  );
}

function Lockup({ variant, tone, className }: { variant: Exclude<LogoVariant, "mark">; tone: LogoTone; className?: string }) {
  const lock = variant === "stacked" ? stackedLockup : horizontalLockup;
  const c = palette(tone);
  const [x, y, width, height] = lock.viewBox;
  return (
    <svg viewBox={`${x} ${y} ${width} ${height}`} className={cn("h-10 w-auto", className)} aria-hidden="true">
      <g transform={lock.mark || undefined}>
        <MarkShapes tone={tone} />
      </g>
      <path d={lock.koda} transform={lock.kodaAt} fill={c.word} />
      <path d={lock.tag} transform={lock.tagAt} fill={c.tag} />
    </svg>
  );
}

export function Logo({
  variant = "horizontal",
  tone = "color",
  href,
  className,
  label = "Koda Coliving.AI",
  decorative = false,
}: {
  variant?: LogoVariant;
  tone?: LogoTone;
  href?: string;
  className?: string;
  label?: string;
  decorative?: boolean;
}) {
  const graphic =
    variant === "mark" ? (
      <KodaMark tone={tone} className={cn("h-10 w-auto", className)} />
    ) : (
      <Lockup variant={variant} tone={tone} className={className} />
    );
  if (href) {
    return (
      <Link href={href} aria-label={label} className="inline-flex shrink-0 items-center">
        {graphic}
      </Link>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center" aria-hidden={decorative || undefined} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : label}>
      {graphic}
    </span>
  );
}
