"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { invoices, portfolioStats } from "@/lib/demo-data";
import { sgd } from "@/lib/format";
import {
  BASIC_ANNUAL_PER_ROOM_SGD,
  BASIC_MONTHLY_PER_ROOM_SGD,
  PREMIUM_PRICE_PER_ROOM_SGD,
  PREMIUM_VIEWING_CREDITS_PER_ROOM_PER_YEAR,
  VIEWING_CREDIT_SGD,
  basicRate,
  premiumAnnualPerRoom,
} from "@/lib/pricing";

export function SettingsView() {
  const stats = portfolioStats();
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");
  const [plan, setPlan] = useState<"basic" | "premium">("basic");
  const [syndication, setSyndication] = useState(true);
  const [credits, setCredits] = useState(12);
  const [extraInvoices, setExtraInvoices] = useState<
    { date: string; id: string; amount: number; note: string }[]
  >([]);
  const [notice, setNotice] = useState<string | null>(null);

  const rate = plan === "premium" ? PREMIUM_PRICE_PER_ROOM_SGD : basicRate(billing);
  const fleet = stats.roomCount * rate;

  return (
    <div className="grid gap-5">
      <header>
        <h1 className="font-heading text-3xl font-bold">Settings & Subscription</h1>
        <p className="mt-1 text-sm text-ink/65">
          Demo subscription for the sample fleet. Stripe is not connected, so changes stay in this browser session.
        </p>
      </header>

      {notice ? (
        <p className="rounded-2xl bg-soft px-4 py-3 text-sm text-primary">{notice}</p>
      ) : null}

      <section className="grid gap-3 rounded-3xl border border-line bg-white p-5 md:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Managed inventory</p>
          <p className="mt-1 font-heading text-2xl font-bold">{stats.roomCount} rooms</p>
          <p className="text-sm text-ink/60">
            {stats.units} coliving units · {plan === "basic" ? "Basic" : "Premium"} plan {plan === "basic" ? "active" : "selected in this demo"}
            {syndication ? " · syndication add-on on" : ""}
          </p>
        </div>
        <div className="rounded-2xl bg-[#faf9fc] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Monthly plan rate</p>
          <p className="font-heading text-3xl font-extrabold">{sgd(fleet)}</p>
          <p className="text-sm text-ink/55">
            {stats.roomCount} rooms × {sgd(rate)}/mo
            {plan === "premium" ? " · Premium price TBD" : billing === "annual" ? " · billed annually" : " · billed monthly"}
          </p>
        </div>
      </section>

      <div className="flex justify-end">
        <div className="inline-flex rounded-full border border-line bg-white p-1 text-sm font-semibold">
          <button type="button" className={`rounded-full px-4 py-2 ${billing === "monthly" ? "bg-ink text-white" : ""}`} onClick={() => setBilling("monthly")} aria-pressed={billing === "monthly"}>Monthly</button>
          <button type="button" className={`rounded-full px-4 py-2 ${billing === "annual" ? "bg-primary text-white" : ""}`} onClick={() => setBilling("annual")} aria-pressed={billing === "annual"}>Annual · save 25%</button>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className={`rounded-3xl border p-5 ${plan === "basic" ? "border-primary bg-white" : "border-line bg-white"}`}>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Basic Plan</h2>
            {plan === "basic" ? <Badge tone="purple">Current in this demo</Badge> : null}
          </div>
          <p className="mt-3 font-heading text-4xl font-extrabold">
            {sgd(billing === "annual" ? BASIC_ANNUAL_PER_ROOM_SGD : BASIC_MONTHLY_PER_ROOM_SGD)}
            <span className="text-base font-semibold text-ink/50"> / room / month</span>
          </p>
          <p className="mt-1 text-sm text-ink/55">
            {sgd(BASIC_ANNUAL_PER_ROOM_SGD)} billed annually · {sgd(BASIC_MONTHLY_PER_ROOM_SGD)} month to month
          </p>
          <ul className="mt-4 grid gap-1 text-sm text-ink/75">
            <li>24/7 WhatsApp tenant concierge</li>
            <li>Maintenance scheduling and rent collection</li>
            <li>Work-pass verification before move-in</li>
          </ul>
          {plan !== "basic" ? (
            <Button className="mt-4" variant="outline" onClick={() => { setPlan("basic"); setNotice("Switched this demo session back to Basic. Stripe was not called."); }}>
              Use Basic
            </Button>
          ) : null}
        </article>
        <article className="rounded-3xl bg-[linear-gradient(180deg,#3b1768,#1c0d30)] p-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Premium Plan</h2>
            <Badge tone="good">Price TBD</Badge>
          </div>
          <p className="mt-3 font-heading text-4xl font-extrabold">
            {sgd(PREMIUM_PRICE_PER_ROOM_SGD)}
            <span className="text-base font-semibold text-white/60"> / room / month</span>
          </p>
          <p className="mt-1 text-sm text-white/65">
            {sgd(premiumAnnualPerRoom())} / room / year if billed annually. Candidates remain S$25, S$30, and S$35.
          </p>
          <p className="mt-3 text-sm text-[#b6f3d4]">
            Includes {PREMIUM_VIEWING_CREDITS_PER_ROOM_PER_YEAR} viewing credits per room per year.
          </p>
          <Button
            className="mt-4 bg-white text-ink hover:bg-white/90"
            onClick={() => {
              setPlan("premium");
              setNotice(`Premium selected in this demo at ${sgd(PREMIUM_PRICE_PER_ROOM_SGD)} per room (TBD). Stripe was not called.`);
            }}
          >
            {plan === "premium" ? "Premium selected" : "Upgrade to Premium"}
          </Button>
        </article>
      </section>

      <section className="rounded-3xl border border-line bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold">Autonomous syndication add-on</h2>
            <p className="text-sm text-ink/65">
              Pay per result at {sgd(VIEWING_CREDIT_SGD)} per verified viewing. Included credits apply only on Premium.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            {syndication ? "On" : "Off"}
            <Switch checked={syndication} onCheckedChange={setSyndication} aria-label="Toggle syndication add-on" />
          </label>
        </div>
        {!syndication ? (
          <p className="mt-3 text-sm text-tertiary">Viewings will not be arranged automatically while this demo toggle is off.</p>
        ) : null}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Viewing credits</h2>
          <p className="mt-2 font-heading text-4xl font-extrabold">{credits}</p>
          <p className="text-sm text-ink/60">Credits available in this demo balance.</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => {
              setCredits((value) => value + 1);
              setExtraInvoices((current) => [
                {
                  date: "Demo",
                  id: `TOPUP-${current.length + 1}`,
                  amount: VIEWING_CREDIT_SGD,
                  note: `1 viewing credit × ${sgd(VIEWING_CREDIT_SGD)} · not charged`,
                },
                ...current,
              ]);
              setNotice(`Added 1 demo credit at ${sgd(VIEWING_CREDIT_SGD)}. No payment was taken.`);
            }}
          >
            Top up credits ({sgd(VIEWING_CREDIT_SGD)} each)
          </Button>
        </article>
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Payment method</h2>
          <p className="mt-2 text-sm">PayNow GIRO · Visa Business · •••• 8831 · exp 09/27</p>
          <p className="text-xs text-ink/50">Sample card. Auto-debit is not live.</p>
          <dl className="mt-4 grid gap-1 text-sm">
            <div className="flex justify-between"><dt>Billing entity</dt><dd>Koda Coliving Ops (demo)</dd></div>
            <div className="flex justify-between"><dt>UEN</dt><dd>DEMO00000A</dd></div>
            <div className="flex justify-between"><dt>Fleet charge</dt><dd>{sgd(fleet)} / month</dd></div>
          </dl>
        </article>
      </section>

      <section className="overflow-x-auto rounded-3xl border border-line bg-white">
        <h2 className="px-5 pt-5 font-heading text-lg font-bold">Recent invoices</h2>
        <table className="mt-3 w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-ink/45">
            <tr>
              <th className="px-5 py-2 font-semibold">Date</th>
              <th className="px-3 py-2 font-semibold">Invoice</th>
              <th className="px-3 py-2 font-semibold">Amount</th>
              <th className="px-3 py-2 font-semibold">Status</th>
              <th className="px-5 py-2 font-semibold">Note</th>
            </tr>
          </thead>
          <tbody>
            {extraInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-t border-line">
                <td className="px-5 py-3">{invoice.date}</td>
                <td className="px-3 py-3">{invoice.id}</td>
                <td className="px-3 py-3">{sgd(invoice.amount)}</td>
                <td className="px-3 py-3">Pending demo</td>
                <td className="px-5 py-3">{invoice.note}</td>
              </tr>
            ))}
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t border-line">
                <td className="px-5 py-3">{invoice.date}</td>
                <td className="px-3 py-3">{invoice.id}</td>
                <td className="px-3 py-3">{sgd(invoice.amount)}</td>
                <td className="px-3 py-3 text-good">{invoice.status}</td>
                <td className="px-5 py-3">{invoice.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
