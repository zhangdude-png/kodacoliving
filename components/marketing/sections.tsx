import { ArrowRight, BadgeCheck, Bot, CalendarClock, MessageCircle, Receipt, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";
import { KodaMark } from "@/components/logo";
import { BookConsultation } from "@/components/marketing/consultation-dialog";
import { ConsolePreview } from "@/components/marketing/console-preview";
import { WhatsAppIcon } from "@/components/marketing/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { stFrancis } from "@/lib/case-study";
import { sgd } from "@/lib/format";
import { audiencePath, type Audience, type Locale } from "@/lib/i18n";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getMessages, type MarketingMessages } from "@/messages";

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
    <p className="inline-flex items-center gap-2 rounded-full bg-[#e5f4f3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-text">
      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
      {children}
    </p>
  );
}

const featureIcons = [Bot, MessageCircle, Receipt, BadgeCheck, Wrench, CalendarClock];

export function Hero({
  audience,
  copy,
}: {
  audience: Audience;
  copy: MarketingMessages;
}) {
  const landlord = audience === "landlords";
  const hero = landlord ? copy.hero.landlords : copy.hero.operators;
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
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/85 sm:text-lg">
            {hero.body}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            {hero.chips.map((item) => (
              <li key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {landlord ? (
              <>
                <BookConsultation size="lg" copy={copy.consultation}>{hero.primary}</BookConsultation>
                <Button variant="light" size="lg" asChild>
                  <a href="#case-study">{hero.secondary}</a>
                </Button>
              </>
            ) : (
              <>
                <BookConsultation size="lg" copy={copy.consultation}>{hero.primary}</BookConsultation>
                <Button variant="light" size="lg" asChild>
                  <a href="#pricing">{hero.secondary}</a>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-12 max-w-5xl">
          <ConsolePreview copy={copy.console} />
          {landlord ? (
            <p className="mt-3 text-center text-xs text-white/60">{copy.hero.landlords.previewNote}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Process({ copy }: { copy: MarketingMessages }) {
  return (
    <section id="fit-out" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <SectionLabel>{copy.process.label}</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">{copy.process.title}</h2>
          <p className="mt-3 text-ink/70">{copy.process.body}</p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.process.steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-line bg-[#faf9fc] p-5">
              <p className="font-heading text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-heading text-lg font-bold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CaseStudy({ copy }: { copy: MarketingMessages }) {
  const study = copy.caseStudy;
  const before = stFrancis.before;
  const after = stFrancis.after;
  return (
    <section id="case-study" className="scroll-mt-24 bg-[#f7f6fb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>{study.label}</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {study.name}
          </h2>
          <p className="mt-3 text-ink/70">{study.subtitle}</p>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {stFrancis.rooms.map((room, index) => {
            const text = study.rooms[index];
            return (
            <li key={room.key} className="overflow-hidden rounded-3xl border border-line bg-white">
              <div className="relative aspect-[16/10]">
                <Image
                  src={room.image}
                  alt={text.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading font-bold text-primary">{text.title}</h3>
                  <p className="shrink-0 text-sm font-semibold text-primary">{text.price}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/70">{text.body}</p>
              </div>
            </li>
          );
          })}
        </ul>
        {/*
          One shared row grid from the lg breakpoint up, so the annual gross
          lines and the leasing dividers sit on the same tracks. The Koda-only
          waterfall is the last row of the dark card, so the light card ends
          at its leasing note instead of stretching empty beside those rows.
        */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-0">
          <article className="rounded-3xl border border-line bg-white p-6 lg:contents">
            <div aria-hidden="true" className="hidden lg:col-start-1 lg:row-span-8 lg:row-start-1 lg:block lg:rounded-3xl lg:border lg:border-line lg:bg-white" />
            <div className="flex items-center justify-between gap-3 lg:col-start-1 lg:row-start-1 lg:px-6 lg:pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">{study.beforeKicker}</p>
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">{study.beforeBadge}</span>
            </div>
            <h3 className="mt-3 font-heading text-2xl font-bold text-primary lg:col-start-1 lg:row-start-2 lg:mt-0 lg:px-6 lg:pt-3">{study.beforeTitle}</h3>
            <p className="mt-1 text-sm text-ink/60 lg:col-start-1 lg:row-start-3 lg:mt-0 lg:px-6 lg:pt-1">{study.beforeSummary}</p>
            <MoneyRow
              tone="light"
              label={study.monthlyGross}
              value={`${sgd(before.monthlyGross)} ${study.perMonth}`}
              className="mt-6 lg:col-start-1 lg:row-start-4 lg:mt-0 lg:px-6 lg:pt-5"
            />
            <MoneyRow
              tone="light"
              label={study.annualGross}
              value={`${sgd(before.annualGross)} ${study.perYear}`}
              className="lg:col-start-1 lg:row-start-5 lg:px-6"
            />
            <div className="mt-4 lg:col-start-1 lg:row-start-6 lg:mt-0 lg:px-6 lg:pt-4">
              <p className="border-t border-dashed border-line pt-4 text-xs font-semibold uppercase tracking-wide text-ink/45">
                {study.beforeLeasing}
              </p>
            </div>
            <p className="mt-2 flex items-baseline justify-between gap-3 text-sm lg:col-start-1 lg:row-start-7 lg:mt-0 lg:px-6 lg:pt-2">
              <span>{study.agentFee}</span>
              <span className="shrink-0 whitespace-nowrap font-semibold text-bad">{sgd(-before.agentFee)} {study.perYear}</span>
            </p>
            <p className="mt-1 text-xs text-ink/55 lg:col-start-1 lg:row-start-8 lg:mt-0 lg:px-6 lg:pt-1 lg:pb-6">{study.agentFeeNote}</p>
          </article>
          <article className="rounded-3xl bg-[linear-gradient(180deg,#3a1768,#241038)] p-6 text-white lg:contents">
            <div aria-hidden="true" className="hidden lg:col-start-2 lg:row-span-9 lg:row-start-1 lg:block lg:rounded-3xl lg:bg-[linear-gradient(180deg,#3a1768,#241038)]" />
            <div className="flex items-center justify-between gap-3 lg:col-start-2 lg:row-start-1 lg:px-6 lg:pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">{study.afterKicker}</p>
              <span className="shrink-0 rounded-full bg-[#12b76a] px-2.5 py-1 text-xs font-semibold text-white">{study.afterBadge}</span>
            </div>
            <h3 className="mt-3 font-heading text-2xl font-bold lg:col-start-2 lg:row-start-2 lg:mt-0 lg:px-6 lg:pt-3">{study.afterTitle}</h3>
            <p className="mt-1 text-sm text-white/70 lg:col-start-2 lg:row-start-3 lg:mt-0 lg:px-6 lg:pt-1">{study.afterSummary}</p>
            <MoneyRow
              tone="dark"
              label={study.monthlyGross}
              value={`${sgd(after.monthlyGross)} ${study.perMonth}`}
              className="mt-6 lg:col-start-2 lg:row-start-4 lg:mt-0 lg:px-6 lg:pt-5"
            />
            <MoneyRow
              tone="dark"
              label={study.annualGross}
              value={`${sgd(after.annualGross)} ${study.perYear}`}
              className="lg:col-start-2 lg:row-start-5 lg:px-6"
            />
            <div className="mt-4 lg:col-start-2 lg:row-start-6 lg:mt-0 lg:px-6 lg:pt-4">
              <p className="border-t border-dashed border-white/20 pt-4 text-xs font-semibold uppercase tracking-wide text-white/55">
                {study.afterLeasing}
              </p>
            </div>
            <p className="mt-2 flex items-baseline justify-between gap-3 text-sm lg:col-start-2 lg:row-start-7 lg:mt-0 lg:px-6 lg:pt-2">
              <span>{study.leasingCost}</span>
              <span className="shrink-0 whitespace-nowrap font-semibold">{sgd(-after.leasingCost)} {study.perYear}</span>
            </p>
            <p className="mt-1 text-xs text-white/65 lg:col-start-2 lg:row-start-8 lg:mt-0 lg:px-6 lg:pt-1 lg:pb-6">{study.leasingNote}</p>
            <div className="lg:col-start-2 lg:row-start-9 lg:px-6 lg:pb-6">
              <p className="mt-3 rounded-2xl bg-white/10 px-3 py-2 text-sm font-semibold text-[#b6f3d4] lg:mt-0">
                {study.save}
              </p>
              <dl className="mt-4">
                <MoneyRow tone="dark" label={study.runningCosts} value={`${sgd(-after.runningCosts)} ${study.perMonth}`} note={study.runningNote} valueClassName="text-[#ffb4b4]" />
                <MoneyRow tone="dark" label={study.netMonthly} value={`${sgd(after.netMonthly)} ${study.perMonth}`} valueClassName="text-[#8ef0c0]" />
                <MoneyRow tone="dark" label={study.setup} value={sgd(after.setup)} note={study.setupNote} />
                <MoneyRow tone="dark" label={study.payback} value={study.paybackValue} />
                <MoneyRow tone="dark" label={study.annualNetUplift} value={`+${sgd(after.annualNetUplift)} ${study.perYear}`} valueClassName="text-[#8ef0c0]" />
              </dl>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function MoneyRow({
  label,
  value,
  note,
  tone,
  valueClassName = "",
  className = "",
}: {
  label: string;
  value: string;
  note?: string;
  tone: "light" | "dark";
  valueClassName?: string;
  className?: string;
}) {
  const border = tone === "dark" ? "border-white/10" : "border-line";
  const noteColor = tone === "dark" ? "text-white/50" : "text-ink/55";
  return (
    <div className={className}>
      <div className={`flex items-start justify-between gap-4 border-b py-2.5 text-sm ${border}`}>
        <p>
          {label}
          {note ? <span className={`mt-0.5 block text-xs font-normal ${noteColor}`}>{note}</span> : null}
        </p>
        <p className={`shrink-0 whitespace-nowrap font-semibold tabular-nums ${valueClassName}`}>{value}</p>
      </div>
    </div>
  );
}

export function Features({
  audience,
  copy,
}: {
  audience: Audience;
  copy: MarketingMessages;
}) {
  return (
    <section id={audience === "operators" ? "product" : "operations"} className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <SectionLabel>{copy.features.label}</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {audience === "landlords" ? copy.features.landlordsTitle : copy.features.operatorsTitle}
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {copy.features.items.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <li key={feature.title} className="rounded-3xl border border-line bg-white p-5 shadow-[0_1px_0_rgba(27,20,48,0.03)]">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{feature.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function AgentBand({ copy }: { copy: MarketingMessages }) {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[32px] bg-[linear-gradient(160deg,#2c124c,#14091f)] px-6 py-10 text-white md:grid-cols-2 md:px-10">
          <KodaMark
            tone="onDark"
            className="pointer-events-none absolute -bottom-10 -left-8 h-40 w-40 opacity-20"
          />
          <div className="relative">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9ad4d2]">
              <KodaMark tone="onDark" className="h-5 w-5" />
              {copy.agent.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">{copy.agent.title}</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">{copy.agent.body}</p>
            <Button className="mt-6 bg-white text-ink hover:bg-white/90" asChild>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {copy.agent.cta}
              </a>
            </Button>
          </div>
          <dl className="grid gap-3">
            {copy.agent.facts.map((fact) => (
              <div key={fact.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="font-heading text-2xl font-bold text-[#9ad4d2]">{fact.title}</dt>
                <dd className="mt-1 text-sm text-white/70">{fact.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Comparison({ copy }: { copy: MarketingMessages }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">{copy.comparison.title}</h2>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">{copy.comparison.caption}</caption>
            <thead className="bg-[#faf9fc] text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3 font-semibold">{copy.comparison.work}</th>
                <th className="px-4 py-3 font-semibold">{copy.comparison.traditional}</th>
                <th className="px-4 py-3 font-semibold text-primary">{copy.comparison.koda}</th>
              </tr>
            </thead>
            <tbody>
              {copy.comparison.rows.map((row) => (
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
  title,
  id = "faq",
}: {
  items: { question: string; answer: string }[];
  title: string;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 bg-[#f7f6fb] py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-primary">{title}</h2>
        <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-white">
          {items.map((item) => (
            <details key={item.question} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-semibold text-primary">
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

export function CtaBand({
  audience,
  copy,
}: {
  audience: Audience;
  copy: MarketingMessages;
}) {
  const landlord = audience === "landlords";
  return (
    <section className="bg-white pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[32px] bg-[linear-gradient(160deg,#4a2270,#1a0d2c)] px-6 py-14 text-center text-white sm:px-10">
          <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            {landlord ? copy.cta.landlordsTitle : copy.cta.operatorsTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            {landlord ? copy.cta.landlordsBody : copy.cta.operatorsBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <BookConsultation size="lg" variant="default" copy={copy.consultation}>
              {landlord ? copy.cta.landlordsPrimary : copy.cta.operatorsPrimary}
            </BookConsultation>
            <Button variant="light" size="lg" asChild>
              {landlord ? (
                <a href="#calculator">
                  {copy.cta.landlordsSecondary} <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> {copy.cta.operatorsSecondary}
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

export function operatorJsonLd(locale: Locale) {
  const copy = getMessages(locale);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Koda Coliving.AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: copy.meta.operators.description,
    areaServed: "SG",
    inLanguage: locale === "zh-Hans" ? "zh-Hans" : "en",
    offers: {
      "@type": "Offer",
      price: "15",
      priceCurrency: "SGD",
      description: copy.jsonLd.offerDescription,
    },
    url: absoluteUrl(audiencePath(locale, "operators")),
  };
}

export function landlordJsonLd(locale: Locale) {
  const copy = getMessages(locale);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: copy.jsonLd.serviceName,
      provider: { "@type": "Organization", name: "Koda Coliving.AI", url: siteConfig.url },
      areaServed: "Singapore",
      inLanguage: locale === "zh-Hans" ? "zh-Hans" : "en",
      description: copy.jsonLd.serviceDescription,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.landlords.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
}
