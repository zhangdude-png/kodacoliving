"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { BookConsultation } from "@/components/marketing/consultation-dialog";
import { Button } from "@/components/ui/button";

const landlordLinks = [
  { href: "/for-landlords#fit-out", label: "Turnkey Fit-Out" },
  { href: "/for-landlords#case-study", label: "Case Study" },
  { href: "/for-landlords#calculator", label: "Yield Calculator" },
  { href: "/for-landlords#operations", label: "AI Operations" },
  { href: "/for-landlords#faq", label: "Landlord FAQ" },
];

const operatorLinks = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/app", label: "Console" },
];

export function SiteHeader({
  audience,
}: {
  audience: "operators" | "landlords";
}) {
  const links = audience === "landlords" ? landlordLinks : operatorLinks;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/75 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="soft" asChild>
            <Link href="/for-landlords">For Landlords</Link>
          </Button>
          <BookConsultation>Book Consultation</BookConsultation>
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-line lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-white px-4 py-4 lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/for-landlords"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              For Landlords
            </Link>
            <div className="pt-2">
              <BookConsultation>Book Consultation</BookConsultation>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function AnnouncementBar() {
  return (
    <div className="bg-[#e5f4f3] text-secondary-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            For property landlords
          </span>
          <span>
            Turnkey Coliving Conversion &amp; Fit-Out (from S$15,000) + 100%
            autonomous AI tenant operations across Singapore.
          </span>
        </p>
        <a href="#calculator" className="shrink-0 font-semibold hover:underline">
          Calculate your yield uplift →
        </a>
      </div>
    </div>
  );
}
