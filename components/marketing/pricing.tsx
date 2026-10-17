"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/marketing/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { sgd } from "@/lib/format";
import {
  BASIC_ANNUAL_PER_ROOM_SGD,
  BASIC_MONTHLY_PER_ROOM_SGD,
  PREMIUM_PRICE_CANDIDATES_SGD,
  PREMIUM_PRICE_IS_TBD,
  PREMIUM_PRICE_PER_ROOM_SGD,
  PREMIUM_VIEWING_CREDITS_PER_ROOM_PER_YEAR,
  VIEWING_CREDIT_SGD,
  premiumAnnualPerRoom,
} from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

const basicFeatures = [
  "24/7 AI WhatsApp tenant concierge",
  "Automated maintenance and work-order scheduling",
  "Automated rent collection and invoicing",
  "Digital pass and work-pass verification",
  "Unified room and unit operational monitor",
];

const premiumFeatures = [
  "Everything in Basic",
  "AI Property Agent across Singapore's major property platforms",
  "Automated inquiry triage and viewing scheduling",
  "Priority Singapore vendor dispatch (aircon and plumbing)",
  "Dedicated Singapore account director and SLA",
];

export function Pricing() {
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");
  const basic = billing === "annual" ? BASIC_ANNUAL_PER_ROOM_SGD : BASIC_MONTHLY_PER_ROOM_SGD;

  return (
    <section id="pricing" className="scroll-mt-24 bg-[#f7f6fb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Transparent per-room pricing
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            Simple per-room pricing. Zero hidden fees.
          </h2>
          <p className="mt-3 text-ink/70">
            Scale from a 5-room home to a 100-room coliving fleet.
          </p>
          <div className="mt-6 inline-flex rounded-full border border-line bg-white p-1 text-sm font-semibold">
            <button
              type="button"
              className={`rounded-full px-4 py-2 ${billing === "annual" ? "bg-primary text-white" : "text-ink/70"}`}
              onClick={() => setBilling("annual")}
              aria-pressed={billing === "annual"}
            >
              Annual · save 25%
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-2 ${billing === "monthly" ? "bg-primary text-white" : "text-ink/70"}`}
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
            >
              Monthly
            </button>
          </div>
        </div>
        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] border border-line bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">Core fleet</p>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">Boutique operators</span>
            </div>
            <h3 className="mt-3 font-heading text-3xl font-bold">Basic Plan</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              Core autonomous tenant operations for coliving hosts, priced per room from the first handful through a 100-room fleet.
            </p>
            <p className="mt-6 font-heading text-5xl font-extrabold tracking-tight">
              {sgd(basic)}
              <span className="ml-1 text-base font-semibold text-ink/50">/ room / month</span>
            </p>
            <p className="mt-2 text-sm text-ink/55">
              {billing === "annual"
                ? `Billed annually (save 25%) · or ${sgd(BASIC_MONTHLY_PER_ROOM_SGD)}/room billed monthly`
                : `Billed monthly · ${sgd(BASIC_ANNUAL_PER_ROOM_SGD)}/room if you pay annually`}
            </p>
            <div className="mt-5 rounded-2xl border border-primary/15 bg-soft p-4 text-sm">
              <p className="font-semibold text-primary">AI Property Agent add-on · available</p>
              <p className="mt-1 text-ink/70">
                Autonomous syndication across the major portals. Incurs a viewing credit ({sgd(VIEWING_CREDIT_SGD)}/credit) only when a verified, pre-qualified tenant viewing is arranged.
              </p>
            </div>
            <ul className="mt-5 grid gap-2 text-sm">
              {basicFeatures.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-good" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="dark" className="mt-6 w-full" asChild>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Enquire via WhatsApp
              </a>
            </Button>
          </article>
          <article className="relative rounded-[28px] bg-[linear-gradient(180deg,#3b1768,#1c0d30)] p-6 text-white sm:p-8">
            <div className="absolute -top-3 right-6 rounded-full bg-[#efe4ff] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
              Most popular · all-inclusive tier
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Enterprise scale</p>
              {PREMIUM_PRICE_IS_TBD ? (
                <span className="rounded-full bg-[#12b76a] px-2.5 py-1 text-xs font-semibold">Price TBD</span>
              ) : null}
            </div>
            <h3 className="mt-3 font-heading text-3xl font-bold">Premium Plan</h3>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Full autonomous suite with cross-portal syndication and hands-off tenant viewing scheduling.
            </p>
            <p className="mt-6 font-heading text-5xl font-extrabold tracking-tight">
              {sgd(PREMIUM_PRICE_PER_ROOM_SGD)}
              <span className="ml-1 text-base font-semibold text-white/60">/ room / month</span>
            </p>
            <p className="mt-2 text-sm text-white/65">
              Billed annually ({sgd(premiumAnnualPerRoom())} / room / yr). Price TBD — candidates are{" "}
              {PREMIUM_PRICE_CANDIDATES_SGD.map((price) => sgd(price)).join(", ")}.
            </p>
            <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm">
              <p className="font-semibold text-[#b6f3d4]">
                Includes {PREMIUM_VIEWING_CREDITS_PER_ROOM_PER_YEAR} pre-qualified viewing credits / room / year
              </p>
              <p className="mt-1 text-white/70">
                1 viewing credit = 1 pre-qualified tenant viewing arranged directly with the operator. Additional top-ups at {sgd(VIEWING_CREDIT_SGD)} each.
              </p>
            </div>
            <ul className="mt-5 grid gap-2 text-sm">
              {premiumFeatures.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#8ef0c0]" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full bg-[#7c4dcc] hover:bg-[#6a3db8]" asChild>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Enquire via WhatsApp
              </a>
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}
