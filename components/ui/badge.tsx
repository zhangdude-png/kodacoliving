import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-muted text-ink",
  good: "bg-[#e7f6ee] text-good",
  bad: "bg-[#fdecec] text-bad",
  purple: "bg-soft text-primary",
  warn: "bg-[#fff6e5] text-tertiary",
  dark: "bg-white/10 text-white",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
