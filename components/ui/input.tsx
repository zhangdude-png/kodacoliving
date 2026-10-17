import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-ink/40 focus-visible:border-primary",
        className,
      )}
      {...props}
    />
  );
}
