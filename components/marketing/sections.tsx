import { ArrowRight, BadgeCheck, Bot, CalendarClock, MessageCircle, Receipt, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";
import { BookConsultation } from "@/components/marketing/consultation-dialog";
import { ConsolePreview } from "@/components/marketing/console-preview";
import { WhatsAppIcon } from "@/components/marketing/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { stFrancis } from "@/lib/case-study";
import { comparisonRows, type FaqItem } from "@/lib/content";
import { sgd } from "@/lib/format";
import {
  FIT_OUT_FROM_SGD,
  MIN_STAY_MONTHS,
  PREMIUM_VIEWING_CREDITS_PER_ROOM_PER_YEAR,
  VIEWING_CREDIT_SGD,
} from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-[#9ee0df]" />
      {children}
    </p>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
      {children}
    </p>
  );
}

export function Hero({ audience }: { audience: "operators" | "landlords" }) {
  const landlord = audience === "landlords";
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/st-francis-mbr1.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,8,32,0.82),rgba(48,22,82,0.78)_42%,rgba(16,8,28,0.92))]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>
            {landlord
              ? "One-stop turnkey partner for Singapore landlords · Fitting from S$15,000"
              : "Autonomous operations for Singapore coliving fleets"}
          </Eyebrow>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            {landlord
              ? "Convert & Maximize Your Rental Yield with Turnkey Coliving + AI Management."
              : "Run 5 to 100 coliving rooms with a single autonomous AI crew."}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/85 sm:text-lg">
            {landlord
              ? "Koda Coliving is your end-to-end partner. From full architectural conversion, contractor fitting, and styling (from S$15,000) to autonomous AI tenant and property operations."
              : "WhatsApp tenant service, verified viewings, tenancy onboarding, rent collection, and vendor dispatch — run by agents, with a takeover switch when you want the thread."}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            {(landlord
              ? ["Fit-out from S$15,000", "+72% Net Uplift (St Francis)", "Zero landlord overhead"]
              : ["5 to 100 rooms", "Per-room pricing", "Take over any thread"]
            ).map((item) => (
              <li key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {landlord ? (
              <>
                <BookConsultation size="lg">Book Free Unit Audit</BookConsultation>
                <Button variant="light" size="lg" asChild>
                  <a href="#case-study">St Francis Case Study</a>
                </Button>
              </>
            ) : (
              <>
                <BookConsultation size="lg">Book Consultation</BookConsultation>
                <Button variant="light" size="lg" asChild>
                  <a href="#pricing">See pricing</a>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-12 max-w-5xl">
          <ConsolePreview />
          {landlord ? (
            <p className="mt-3 text-center text-xs text-white/60">
              Product preview using demo room CR1 at S$1,650. Published St Francis rents are in the case study.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    title: "Unit audit",
    body: "Floor plan, current lease, and a room-by-room rent map. The audit is free.",
  },
  {
    n: "02",
    title: "Turnkey fit-out",
    body: `Architectural conversion, contractor fitting, and styling. Projects from ${sgd(FIT_OUT_FROM_SGD)}.`,
  },
  {
    n: "03",
    title: "Furnish and list",
    body: "Rooms styled, photographed, and handed to the AI Property Agent.",
  },
  {
    n: "04",
    title: "Autonomous operations",
    body: `Concierge, collection, viewings, and vendors. Minimum stay of ${MIN_STAY_MONTHS} months. Passes verified before move-in.`,
  },
];

export function Process() {
  return (
    <section id="fit-out" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <SectionLabel>Turnkey fit-out</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            From a whole-unit rental to a coliving home.
          </h2>
          <p className="mt-3 text-ink/70">
            You approve the plan and the fit-out. After handover, the crew runs the rooms.
          </p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n} className="rounded-3xl border border-line bg-[#faf9fc] p-5">
              <p className="font-heading text-sm font-bold text-primary">{step.n}</p>
              <h3 className="mt-3 font-heading text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CaseStudy() {
  const before = stFrancis.before;
  const after = stFrancis.after;
  return (
    <section id="case-study" className="scroll-mt-24 bg-[#f7f6fb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Real landlord performance case study</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {stFrancis.name}
          </h2>
          <p className="mt-3 text-ink/70">{stFrancis.subtitle}</p>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {stFrancis.rooms.map((room) => (
            <li key={room.key} className="overflow-hidden rounded-3xl border border-line bg-white">
              <div className="relative aspect-[16/10]">
                <Image
                  src={room.image}
                  alt={room.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading font-bold">{room.title}</h3>
                  <p className="shrink-0 text-sm font-semibold text-primary">{room.price}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/70">{room.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-3xl border border-line bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">{before.kicker}</p>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">{before.badge}</span>
            </div>
            <h3 className="mt-3 font-heading text-2xl font-bold">{before.title}</h3>
            <p className="mt-1 text-sm text-ink/60">{before.summary}</p>
            <dl className="mt-6 grid gap-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-line py-2">
                <dt>Monthly gross rent</dt>
                <dd className="font-semibold">{sgd(before.monthlyGross)} / mo</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line py-2">
                <dt>Annual gross income</dt>
                <dd className="font-semibold">{sgd(before.annualGross)} / yr</dd>
              </div>
            </dl>
            <div className="mt-4 border-t border-dashed border-line pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{before.leasingLabel}</p>
              <p className="mt-2 flex items-baseline justify-between gap-3">
                <span>Agent fee</span>
                <span className="font-semibold text-bad">{sgd(-before.agentFee)} / yr</span>
              </p>
              <p className="mt-1 text-xs text-ink/55">{before.agentFeeNote}</p>
            </div>
          </article>
          <article className="rounded-3xl bg-[linear-gradient(180deg,#3a1768,#241038)] p-6 text-white">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">{after.kicker}</p>
              <span className="rounded-full bg-[#12b76a] px-2.5 py-1 text-xs font-semibold text-white">{after.badge}</span>
            </div>
            <h3 className="mt-3 font-heading text-2xl font-bold">{after.title}</h3>
            <p className="mt-1 text-sm text-white/70">{after.summary}</p>
            <dl className="mt-6 grid gap-3 text-sm">
              <Row label="Monthly gross rent" value={`${sgd(after.monthlyGross)} / mo`} />
              <Row label="Running costs" value={`${sgd(-after.runningCosts)} / mo`} note={after.runningNote} negative />
              <Row label="Net monthly income" value={`${sgd(after.netMonthly)} / mo`} positive />
              <Row label="Setup cost (1-off)" value={sgd(after.setup)} note={after.setupNote} />
              <Row label="Payback period" value={`~${after.paybackMonths} months`} />
              <Row label="Annual net uplift" value={`+${sgd(after.annualNetUplift)} / yr`} positive />
            </dl>
            <div className="mt-4 border-t border-dashed border-white/20 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/55">{after.leasingLabel}</p>
              <p className="mt-2 flex items-baseline justify-between gap-3 text-sm">
                <span>Leasing cost</span>
                <span className="font-semibold">{sgd(-after.leasingCost)} / yr</span>
              </p>
              <p className="mt-1 text-xs text-white/65">{after.leasingNote}</p>
              <p className="mt-3 rounded-2xl bg-white/10 px-3 py-2 text-sm font-semibold text-[#b6f3d4]">
                Save {sgd(after.savePerYear)} / yr ({after.cheaperPct}% cheaper than a traditional agent)
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  note,
  positive,
  negative,
}: {
  label: string;
  value: string;
  note?: string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-2">
      <dt>
        {label}
        {note ? <span className="mt-0.5 block text-xs font-normal text-white/50">{note}</span> : null}
      </dt>
      <dd className={positive ? "font-semibold text-[#8ef0c0]" : negative ? "font-semibold text-[#ffb4b4]" : "font-semibold"}>
        {value}
      </dd>
    </div>
  );
}

const features = [
  {
    icon: Bot,
    title: "AI Property Agent",
    body: `Syndication and verified viewings at ${sgd(VIEWING_CREDIT_SGD)} each. You pay when a pre-qualified viewing is arranged.`,
  },
  {
    icon: MessageCircle,
    title: "24/7 WhatsApp concierge",
    body: "Tenant questions, work orders, and viewing chats. Take over the thread whenever you want it.",
  },
  {
    icon: Receipt,
    title: "Rent collection",
    body: "Monthly invoices with PayNow and GIRO tracking, and a ledger on every room.",
  },
  {
    icon: BadgeCheck,
    title: "Tenancy and onboarding",
    body: `Digital agreements and a minimum stay of ${MIN_STAY_MONTHS} months. Work passes are verified before keys are released.`,
  },
  {
    icon: Wrench,
    title: "Vendor dispatch",
    body: "Aircon, plumbing, and cleaning triaged onto your vendor list, with the timeline kept on the room.",
  },
  {
    icon: CalendarClock,
    title: "Portfolio monitor",
    body: "Occupancy, master lease, and sublease spread for every unit, without a weekend spreadsheet.",
  },
];

export function Features({ audience }: { audience: "operators" | "landlords" }) {
  return (
    <section id={audience === "operators" ? "product" : "operations"} className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <SectionLabel>AI operations</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {audience === "landlords"
              ? "Everything coliving landlords spend the week doing, automated."
              : "Everything coliving operators spend the week doing, automated."}
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title} className="rounded-3xl border border-line bg-white p-5 shadow-[0_1px_0_rgba(27,20,48,0.03)]">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-soft text-primary">
                <feature.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AgentBand() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 rounded-[32px] bg-[linear-gradient(160deg,#2c124c,#14091f)] px-6 py-10 text-white md:grid-cols-2 md:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c9b0ea]">AI Property Agent</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Fill vacant rooms 3× faster with our AI Property Agent.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              The agent lists rooms and arranges verified viewings. Basic charges {sgd(VIEWING_CREDIT_SGD)} when a
              viewing is booked. Premium includes {PREMIUM_VIEWING_CREDITS_PER_ROOM_PER_YEAR} credits per room per year,
              then the same {sgd(VIEWING_CREDIT_SGD)} rate.
            </p>
            <Button className="mt-6 bg-white text-ink hover:bg-white/90" asChild>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Enquire via WhatsApp
              </a>
            </Button>
          </div>
          <dl className="grid gap-3">
            {[
              ["S$50", "Per verified viewing. Not a monthly portal retainer."],
              ["5 credits", "Included per room, per year, on Premium."],
              [`${MIN_STAY_MONTHS} months`, "Minimum stay on every tenancy. Passes checked before move-in."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="font-heading text-2xl font-bold text-[#b6f3d4]">{title}</dt>
                <dd className="mt-1 text-sm text-white/70">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Comparison() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Why operators switch to autonomous management
        </h2>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">
              Traditional coliving operations compared with Koda Coliving.AI
            </caption>
            <thead className="bg-[#faf9fc] text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3 font-semibold">Work</th>
                <th className="px-4 py-3 font-semibold">Traditional</th>
                <th className="px-4 py-3 font-semibold text-primary">Koda Coliving.AI</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.work} className="border-t border-line">
                  <th className="px-4 py-4 font-heading font-semibold">{row.work}</th>
                  <td className="px-4 py-4 text-ink/70">{row.traditional}</td>
                  <td className="bg-soft/60 px-4 py-4 font-medium">{row.koda}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Faq({
  items,
  id = "faq",
}: {
  items: FaqItem[];
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 bg-[#f7f6fb] py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight">Frequently asked questions</h2>
        <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-white">
          {items.map((item) => (
            <details key={item.question} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-semibold">
                {item.question}
                <span className="text-primary transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-ink/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ audience }: { audience: "operators" | "landlords" }) {
  const landlord = audience === "landlords";
  return (
    <section className="bg-white pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[32px] bg-[linear-gradient(160deg,#4a2270,#1a0d2c)] px-6 py-14 text-center text-white sm:px-10">
          <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            {landlord
              ? "Ready to see what coliving could earn from your property?"
              : "Automate your entire coliving fleet today."}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            {landlord
              ? "Bring a floor plan. We’ll map fit-out, room rents, and the handoff to operations."
              : "Start with the rooms you already run. Basic is S$15 per room per month, billed annually."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <BookConsultation size="lg" variant="default">
              {landlord ? "Book Free Unit Audit" : "Book Consultation"}
            </BookConsultation>
            <Button variant="light" size="lg" asChild>
              {landlord ? (
                <a href="#calculator">
                  Calculate yield <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Enquire via WhatsApp
                </a>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function operatorJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Koda Coliving.AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    areaServed: "SG",
    offers: {
      "@type": "Offer",
      price: "15",
      priceCurrency: "SGD",
      description: "Basic plan per room per month, billed annually",
    },
    url: siteConfig.url,
  };
}

export function landlordJsonLd(faqs: FaqItem[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Turnkey coliving conversion and AI operations",
      provider: { "@type": "Organization", name: "Koda Coliving.AI", url: siteConfig.url },
      areaServed: "Singapore",
      description:
        "Architectural conversion, fit-out from S$15,000, and autonomous tenant operations for Singapore landlords.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
}
