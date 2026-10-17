"use client";

import { useMemo, useState } from "react";
import { calculateFleet, calculateLandlord } from "@/lib/calculator";
import { landlordPreset, stFrancis } from "@/lib/case-study";
import { pct, sgd, sgdSigned } from "@/lib/format";
import { PREMIUM_PRICE_PER_ROOM_SGD, VIEWING_CREDIT_SGD } from "@/lib/pricing";

type LandlordFields = {
  currentMonthly: number;
  rooms: number;
  colivingGross: number;
  runningCosts: number;
  setup: number;
};

const preset: LandlordFields = { ...landlordPreset };

export function Calculator({ variant }: { variant: "landlord" | "fleet" }) {
  if (variant === "landlord") return <LandlordCalculator />;
  return <FleetCalculator />;
}

function LandlordCalculator() {
  const [fields, setFields] = useState<LandlordFields>(preset);
  const [usePublished, setUsePublished] = useState(true);
  const computed = useMemo(() => calculateLandlord(fields), [fields]);

  function update(key: keyof LandlordFields, value: string) {
    setUsePublished(false);
    setFields((current) => ({ ...current, [key]: Number(value) }));
  }

  const published = stFrancis.after;
  const before = stFrancis.before;

  return (
    <section id="calculator" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Yield calculator</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Calculate your coliving conversion
          </h2>
          <p className="mt-3 text-ink/70">
            Defaults match the published St Francis case study. Change any input to run your own numbers. Leasing uses {sgd(VIEWING_CREDIT_SGD)} per verified viewing and a 25% viewing-to-lease conversion.
          </p>
        </div>
        <div className="mt-8 grid gap-6 rounded-[28px] border border-line bg-[#faf9fc] p-4 md:grid-cols-[1fr_0.9fr] md:p-6">
          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <NumberField label="Current whole-unit rent (S$ / mo)" value={fields.currentMonthly} onChange={(value) => update("currentMonthly", value)} />
            <NumberField label="Rooms after conversion" value={fields.rooms} step={1} onChange={(value) => update("rooms", value)} />
            <NumberField label="Coliving monthly gross (S$)" value={fields.colivingGross} onChange={(value) => update("colivingGross", value)} />
            <NumberField label="Monthly running costs (S$)" value={fields.runningCosts} onChange={(value) => update("runningCosts", value)} />
            <NumberField label="One-off setup cost (S$)" value={fields.setup} onChange={(value) => update("setup", value)} />
            <button
              type="button"
              className="justify-self-start text-sm font-semibold text-primary"
              onClick={() => {
                setFields(preset);
                setUsePublished(true);
              }}
            >
              Reset to St Francis figures
            </button>
          </form>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">
              {usePublished ? "Published St Francis result" : "Calculated from your inputs"}
            </p>
            <p className="mt-2 font-heading text-4xl font-extrabold text-primary">
              {usePublished ? `+${sgd(published.annualNetUplift)}` : sgdSigned(Math.round(computed.uplift))}
              <span className="ml-1 text-base font-semibold text-ink/50">/ yr net</span>
            </p>
            <dl className="mt-5 grid gap-2 text-sm">
              <Result label="Net monthly income" value={usePublished ? `${sgd(published.netMonthly)} / mo` : `${sgd(Math.round(computed.netMonthly))} / mo`} />
              <Result label="Payback" value={usePublished ? `~${published.paybackMonths} months` : computed.paybackMonths ? `~${computed.paybackMonths.toFixed(1)} months` : "—"} />
              <Result label="Traditional agent fee" value={`${sgd(-Math.round(usePublished ? before.agentFee : computed.agentFee))} / yr`} />
              <Result label="Koda leasing cost" value={`${sgd(-Math.round(usePublished ? published.leasingCost : computed.leasingCost))} / yr`} />
              <Result
                label="Saving versus a traditional agent"
                value={
                  usePublished
                    ? `${sgd(published.savePerYear)} / yr (${published.cheaperPct}% cheaper)`
                    : `${sgd(Math.round(computed.saveVsAgent))} / yr${computed.cheaperPct !== null ? ` (${Math.round(computed.cheaperPct)}% cheaper)` : ""}`
                }
              />
            </dl>
            <p className="mt-4 text-xs leading-5 text-ink/50">
              {usePublished
                ? "These are the published case study figures, including annual net uplift of S$45,009."
                : "Uplift is coliving net × 12, minus today’s whole-unit annual gross. Agent fee is half a month of current rent (one month per two-year lease). Viewings = rooms ÷ 25%."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FleetCalculator() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Fleet calculator</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Calculate your fleet profit retention
          </h2>
          <p className="mt-3 text-ink/70">
            Sublease gross, minus the master lease, minus the Koda per-room fee. Premium uses the TBD rate of {sgd(PREMIUM_PRICE_PER_ROOM_SGD)} per room.
          </p>
        </div>
        <div className="mt-8 grid gap-6 rounded-[28px] border border-line bg-[#faf9fc] p-4 md:grid-cols-[1fr_0.9fr] md:p-6">
          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <NumberField label="Rooms" value={rooms} step={1} onChange={(value) => setRooms(Number(value))} />
            <NumberField label="Occupancy (%)" value={occupancy} step={0.1} onChange={(value) => setOccupancy(Number(value))} />
            <NumberField label="Average rent of an occupied room (S$)" value={averageRent} onChange={(value) => setAverageRent(Number(value))} />
            <NumberField label="Master lease total (S$ / mo)" value={master} onChange={(value) => setMaster(Number(value))} />
            <fieldset className="grid gap-2">
              <legend className="text-sm font-medium">Plan</legend>
              <div className="flex flex-wrap gap-2">
                {(["basic", "premium"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={plan === item}
                    onClick={() => setPlan(item)}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold ${plan === item ? "bg-primary text-white" : "bg-white text-ink"}`}
                  >
                    {item === "basic" ? "Basic" : "Premium (TBD)"}
                  </button>
                ))}
                {(["annual", "monthly"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={billing === item}
                    onClick={() => setBilling(item)}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold ${billing === item ? "bg-ink text-white" : "bg-white text-ink"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          </form>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">You retain</p>
            <p className="mt-2 font-heading text-4xl font-extrabold text-primary">
              {sgd(Math.round(result.retained))}
              <span className="ml-1 text-base font-semibold text-ink/50">/ mo</span>
            </p>
            <dl className="mt-5 grid gap-2 text-sm">
              <Result label="Sublease gross" value={`${sgd(Math.round(result.gross))} / mo`} />
              <Result label="Occupied rooms (weighted)" value={result.occupiedRooms.toFixed(1)} />
              <Result label="Koda fee" value={`${sgd(Math.round(result.kodaFee))} / mo · ${sgd(result.feePerRoom)} / room`} />
              <Result label="Retained over a year" value={`${sgd(Math.round(result.retainedAnnual))} / yr`} />
              <Result label="Model occupancy" value={pct(occupancy)} />
            </dl>
            <p className="mt-4 text-xs leading-5 text-ink/50">
              Fee is rooms × the plan rate, including vacant rooms. Gross uses occupied rooms only. Running costs other than the master lease are not deducted.
            </p>
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
