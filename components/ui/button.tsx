import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark",
        dark: "bg-ink text-white hover:bg-[#100a1c]",
        outline: "border border-line bg-white text-ink hover:bg-muted",
        light:
          "border border-white/25 bg-white/15 text-white hover:bg-white/25",
        ghost: "bg-transparent text-ink hover:bg-muted",
        soft: "bg-soft text-primary hover:bg-[#eadcf8]",
      },
      size: {
        default: "h-11 px-4",
        lg: "h-12 px-5 text-[15px]",
        sm: "h-9 px-3 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
