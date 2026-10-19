"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/marketing/whatsapp-icon";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { sgd } from "@/lib/format";
import {
  BASIC_ANNUAL_PER_ROOM_SGD,
  BASIC_MONTHLY_PER_ROOM_SGD,
  PREMIUM_PRICE_IS_TBD,
  PREMIUM_PRICE_PER_ROOM_SGD,
} from "@/lib/pricing";
import { siteConfig } from "@/lib/site";
import { getMessages } from "@/messages";

export function Pricing({ locale = "en" }: { locale?: Locale }) {
  const copy = getMessages(locale).pricing;
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");
  const basic = billing === "annual" ? BASIC_ANNUAL_PER_ROOM_SGD : BASIC_MONTHLY_PER_ROOM_SGD;

  return (
    <section id="pricing" className="scroll-mt-24 bg-[#f7f6fb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-text">{copy.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-primary sm:text-5xl">{copy.title}</h2>
          <p className="mt-3 text-ink/70">{copy.subtitle}</p>
          <div className="mt-6 inline-flex rounded-full border border-line bg-white p-1 text-sm font-semibold">
            <button
              type="button"
              className={`rounded-full px-4 py-2 ${billing === "annual" ? "bg-secondary-strong text-white" : "text-ink/70"}`}
              onClick={() => setBilling("annual")}
              aria-pressed={billing === "annual"}
            >
              {copy.annual}
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-2 ${billing === "monthly" ? "bg-secondary-strong text-white" : "text-ink/70"}`}
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
            >
              {copy.monthly}
            </button>
          </div>
        </div>
        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] border border-line bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">{copy.coreFleet}</p>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">{copy.boutique}</span>
            </div>
            <h3 className="mt-3 font-heading text-3xl font-bold text-primary">{copy.basicName}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">{copy.basicBody}</p>
            <p className="mt-6 font-heading text-5xl font-extrabold tracking-tight text-primary">
              {sgd(basic)}
              <span className="ml-1 text-base font-semibold text-ink/50">{copy.perRoomMonth}</span>
            </p>
            <p className="mt-2 text-sm text-ink/55">{billing === "annual" ? copy.annualNote : copy.monthlyNote}</p>
            <div className="mt-5 rounded-2xl border border-primary/15 bg-soft p-4 text-sm">
              <p className="font-semibold text-primary">{copy.addonTitle}</p>
              <p className="mt-1 text-ink/70">{copy.addonBody}</p>
            </div>
            <ul className="mt-5 grid gap-2 text-sm">
              {copy.basicFeatures.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-good" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="dark" className="mt-6 w-full" asChild>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> {copy.enquire}
              </a>
            </Button>
          </article>
          <article className="relative rounded-[28px] bg-[linear-gradient(180deg,#3b1768,#1c0d30)] p-6 text-white sm:p-8">
            <div className="absolute -top-3 right-6 rounded-full bg-[#efe4ff] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
              {copy.popular}
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{copy.enterprise}</p>
              {PREMIUM_PRICE_IS_TBD ? (
                <span className="rounded-full bg-[#12b76a] px-2.5 py-1 text-xs font-semibold">{copy.priceTbd}</span>
              ) : null}
            </div>
            <h3 className="mt-3 font-heading text-3xl font-bold">{copy.premiumName}</h3>
            <p className="mt-2 text-sm leading-6 text-white/75">{copy.premiumBody}</p>
            <p className="mt-6 font-heading text-5xl font-extrabold tracking-tight">
              {sgd(PREMIUM_PRICE_PER_ROOM_SGD)}
              <span className="ml-1 text-base font-semibold text-white/60">{copy.perRoomMonth}</span>
            </p>
            <p className="mt-2 text-sm text-white/65">{copy.premiumBilled}</p>
            <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm">
              <p className="font-semibold text-[#b6f3d4]">{copy.creditsTitle}</p>
              <p className="mt-1 text-white/70">{copy.creditsBody}</p>
            </div>
            <ul className="mt-5 grid gap-2 text-sm">
              {copy.premiumFeatures.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#8ef0c0]" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full bg-[#7c4dcc] hover:bg-[#6a3db8]" asChild>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> {copy.enquire}
              </a>
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}
