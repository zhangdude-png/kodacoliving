"use client";

import { useMemo, useState } from "react";
import { calculateFleet, calculateLandlord } from "@/lib/calculator";
import { landlordPreset, stFrancis } from "@/lib/case-study";
import { pct, sgd, sgdSigned } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { getMessages, type MarketingMessages } from "@/messages";

type LandlordFields = {
  currentMonthly: number;
  rooms: number;
  colivingGross: number;
  runningCosts: number;
  setup: number;
};

const preset: LandlordFields = { ...landlordPreset };

export function Calculator({
  variant,
  locale = "en",
}: {
  variant: "landlord" | "fleet";
  locale?: Locale;
}) {
  const copy = getMessages(locale).calculator;
  if (variant === "landlord") return <LandlordCalculator copy={copy.landlord} />;
  return <FleetCalculator copy={copy.fleet} />;
}

function LandlordCalculator({ copy }: { copy: MarketingMessages["calculator"]["landlord"] }) {
  const [fields, setFields] = useState<LandlordFields>(preset);
  const [usePublished, setUsePublished] = useState(true);
  const computed = useMemo(() => calculateLandlord(fields), [fields]);

  function update(key: keyof LandlordFields, value: string) {
    setUsePublished(false);
    setFields((current) => ({ ...current, [key]: Number(value) }));
  }

  const published = stFrancis.after;
  const before = stFrancis.before;
  const cheaperPct = usePublished
    ? `${published.cheaperPct}% ${copy.cheaper}`
    : computed.cheaperPct !== null
      ? `${Math.round(computed.cheaperPct)}% ${copy.cheaper}`
      : "";

  return (
    <section id="calculator" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-text">{copy.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">{copy.title}</h2>
          <p className="mt-3 text-ink/70">{copy.body}</p>
        </div>
        <div className="mt-8 grid gap-6 rounded-[28px] border border-line bg-[#faf9fc] p-4 md:grid-cols-[1fr_0.9fr] md:p-6">
          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <NumberField label={copy.currentRent} value={fields.currentMonthly} onChange={(value) => update("currentMonthly", value)} />
            <NumberField label={copy.rooms} value={fields.rooms} step={1} onChange={(value) => update("rooms", value)} />
            <NumberField label={copy.gross} value={fields.colivingGross} onChange={(value) => update("colivingGross", value)} />
            <NumberField label={copy.running} value={fields.runningCosts} onChange={(value) => update("runningCosts", value)} />
            <NumberField label={copy.setup} value={fields.setup} onChange={(value) => update("setup", value)} />
            <button
              type="button"
              className="justify-self-start text-sm font-semibold text-secondary-text"
              onClick={() => {
                setFields(preset);
                setUsePublished(true);
              }}
            >
              {copy.reset}
            </button>
          </form>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">
              {usePublished ? copy.published : copy.custom}
            </p>
            <p className="mt-2 font-heading text-4xl font-extrabold text-primary">
              {usePublished ? `+${sgd(published.annualNetUplift)}` : sgdSigned(Math.round(computed.uplift))}
              <span className="ml-1 text-base font-semibold text-ink/50">{copy.perYearNet}</span>
            </p>
            <dl className="mt-5 grid gap-2 text-sm">
              <Result
                label={copy.netMonthly}
                value={
                  usePublished
                    ? `${sgd(published.netMonthly)} ${copy.perMonth}`
                    : `${sgd(Math.round(computed.netMonthly))} ${copy.perMonth}`
                }
              />
              <Result
                label={copy.payback}
                value={
                  usePublished
                    ? `~${published.paybackMonths} ${copy.months}`
                    : computed.paybackMonths
                      ? `~${computed.paybackMonths.toFixed(1)} ${copy.months}`
                      : "—"
                }
              />
              <Result
                label={copy.agentFee}
                value={`${sgd(-Math.round(usePublished ? before.agentFee : computed.agentFee))} ${copy.perYear}`}
              />
              <Result
                label={copy.kodaLeasing}
                value={`${sgd(-Math.round(usePublished ? published.leasingCost : computed.leasingCost))} ${copy.perYear}`}
              />
              <Result
                label={copy.saving}
                value={
                  usePublished
                    ? `${sgd(published.savePerYear)} ${copy.perYear} (${cheaperPct})`
                    : `${sgd(Math.round(computed.saveVsAgent))} ${copy.perYear}${cheaperPct ? ` (${cheaperPct})` : ""}`
                }
              />
            </dl>
            <p className="mt-4 text-xs leading-5 text-ink/50">{usePublished ? copy.publishedNote : copy.customNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FleetCalculator({ copy }: { copy: MarketingMessages["calculator"]["fleet"] }) {
  const [rooms, setRooms] = useState(24);
  const [occupancy, setOccupancy] = useState(91.7);
  const [averageRent, setAverageRent] = useState(1745);
  const [master, setMaster] = useState(25400);
  const [plan, setPlan] = useState<"basic" | "premium">("basic");
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");
  const result = useMemo(
    () =>
      calculateFleet({
        rooms,
        occupancyPct: occupancy,
        averageRent,
        masterLease: master,
        plan,
        billing,
      }),
    [rooms, occupancy, averageRent, master, plan, billing],
  );

  return (
    <section id="calculator" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-text">{copy.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">{copy.title}</h2>
          <p className="mt-3 text-ink/70">{copy.body}</p>
        </div>
        <div className="mt-8 grid gap-6 rounded-[28px] border border-line bg-[#faf9fc] p-4 md:grid-cols-[1fr_0.9fr] md:p-6">
          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <NumberField label={copy.rooms} value={rooms} step={1} onChange={(value) => setRooms(Number(value))} />
            <NumberField label={copy.occupancy} value={occupancy} step={0.1} onChange={(value) => setOccupancy(Number(value))} />
            <NumberField label={copy.averageRent} value={averageRent} onChange={(value) => setAverageRent(Number(value))} />
            <NumberField label={copy.master} value={master} onChange={(value) => setMaster(Number(value))} />
            <fieldset className="grid gap-2">
              <legend className="text-sm font-medium">{copy.plan}</legend>
              <div className="flex flex-wrap gap-2">
                {(["basic", "premium"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={plan === item}
                    onClick={() => setPlan(item)}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold ${plan === item ? "bg-secondary-strong text-white" : "bg-white text-ink"}`}
                  >
                    {item === "basic" ? copy.basic : copy.premium}
                  </button>
                ))}
                {(["annual", "monthly"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={billing === item}
                    onClick={() => setBilling(item)}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold ${billing === item ? "bg-secondary-strong text-white" : "bg-white text-ink"}`}
                  >
                    {item === "annual" ? copy.annual : copy.monthly}
                  </button>
                ))}
              </div>
            </fieldset>
          </form>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{copy.retain}</p>
            <p className="mt-2 font-heading text-4xl font-extrabold text-primary">
              {sgd(Math.round(result.retained))}
              <span className="ml-1 text-base font-semibold text-ink/50">{copy.perMonth}</span>
            </p>
            <dl className="mt-5 grid gap-2 text-sm">
              <Result label={copy.gross} value={`${sgd(Math.round(result.gross))} ${copy.perMonth}`} />
              <Result label={copy.occupied} value={result.occupiedRooms.toFixed(1)} />
              <Result
                label={copy.fee}
                value={`${sgd(Math.round(result.kodaFee))} ${copy.perMonth} · ${sgd(result.feePerRoom)} ${copy.perRoom}`}
              />
              <Result label={copy.retainedYear} value={`${sgd(Math.round(result.retainedAnnual))} ${copy.perYear}`} />
              <Result label={copy.modelOccupancy} value={pct(occupancy)} />
            </dl>
            <p className="mt-4 text-xs leading-5 text-ink/50">{copy.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
  step?: number;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      <input
        type="number"
        inputMode="decimal"
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-xl border border-line bg-white px-3 font-normal"
      />
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line py-2">
      <dt className="text-ink/65">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
