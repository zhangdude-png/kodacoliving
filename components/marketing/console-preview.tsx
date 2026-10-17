import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { photos } from "@/lib/demo-data";

export function ConsolePreview() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/40 bg-white text-ink shadow-[0_30px_80px_-36px_rgba(20,8,40,0.7)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3 text-sm">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="font-medium">
            Koda Coliving Console · 90 St Francis Rd (Unit #09-02 · CR1)
          </span>
        </div>
        <Badge tone="good">AI agent active · autonomous mode</Badge>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-[0.9fr_1.2fr] sm:p-5">
        <div className="grid gap-3">
          <article className="rounded-2xl border border-line p-3">
            <div className="flex gap-3">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={photos.cr.src}
                  alt={photos.cr.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-wide text-ink/50">ROOM CR1</p>
                  <Badge tone="good">Occupied</Badge>
                </div>
                <p className="font-heading font-bold">90 St Francis Court</p>
                <p className="text-xs text-ink/60">Common queen bedroom · aircon serviced</p>
                <p className="mt-1 text-sm font-semibold">
                  S$1,650 <span className="font-normal text-ink/50">/ mo</span>
                  <span className="ml-2 text-primary">GIRO auto-paid</span>
                </p>
              </div>
            </div>
          </article>
          <article className="rounded-2xl border border-line p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-ink/50">VERIFIED RESIDENT</p>
                <p className="mt-1 font-heading font-bold">Resident · CR1</p>
                <p className="text-xs text-ink/60">Work pass on file · name withheld in this preview</p>
              </div>
              <Badge tone="good">Pass verified</Badge>
            </div>
          </article>
          <article className="rounded-2xl border border-line p-3">
            <p className="text-xs font-semibold tracking-wide text-ink/50">AUTONOMOUS VENDOR DISPATCHES</p>
            <ul className="mt-2 grid gap-2 text-sm">
              <li className="flex items-center justify-between gap-3">
                <span>Aircon servicing (quarterly)</span>
                <Badge tone="good">Completed</Badge>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span>Weekly common cleaning</span>
                <span className="text-ink/60">Fri, 10:00 AM</span>
              </li>
            </ul>
          </article>
        </div>
        <article className="rounded-2xl border border-line p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-heading text-lg font-bold">Autonomous WhatsApp Concierge</h3>
              <p className="text-xs text-ink/60">
                Zero landlord intervention required in this preview · auto-resolves the sample ticket
              </p>
            </div>
            <div className="text-right text-xs">
              <Badge tone="purple">24/7 AI agent</Badge>
              <p className="mt-1 text-ink/50">Response time · 1.4s</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            <div className="max-w-[90%] rounded-2xl bg-muted px-3 py-2 text-sm">
              <p className="text-[11px] font-semibold text-ink/50">Resident (CR1) · 08:54</p>
              <p className="mt-1">
                Hi Koda, the aircon in CR1 started dripping this morning. Could we get this checked?
              </p>
            </div>
            <div className="ml-auto max-w-[92%] rounded-2xl bg-primary px-3 py-2 text-sm text-white">
              <p className="text-[11px] font-semibold text-white/70">Koda autonomous concierge · 08:54</p>
              <p className="mt-1">
                I&apos;ve logged ticket #AC-002. Quarterly servicing is already on Thursday, and I&apos;ve
                brought a drainage inspection forward to tomorrow, 2:00–3:00 PM.
              </p>
              <p className="mt-2 text-xs text-white/80">Work order dispatched · auto-confirmed</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-ink/50">
            Resident confirmed the appointment. Calendar note sent to the operator and the technician.
          </p>
          <div className="mt-3 flex gap-2">
            <div className="flex h-11 flex-1 items-center rounded-xl border border-line px-3 text-sm text-ink/40">
              Landlord takeover is available on the live room screen
            </div>
            <span className="grid h-11 place-items-center rounded-xl bg-muted px-3 text-sm font-semibold text-ink/50">
              Takeover
            </span>
          </div>
        </article>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-ink/70 sm:px-5">
        <p>Portfolio status · 24 rooms · 91.7% occupancy · demo snapshot</p>
        <p>Net spread S$13,000 / mo versus master lease</p>
        <p className="text-good">Sample agents shown healthy</p>
      </div>
    </div>
  );
}
