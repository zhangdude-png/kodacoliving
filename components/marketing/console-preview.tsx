import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { photos } from "@/lib/demo-data";
import type { MarketingMessages } from "@/messages";

export function ConsolePreview({ copy }: { copy: MarketingMessages["console"] }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/40 bg-white text-ink shadow-[0_30px_80px_-36px_rgba(20,8,40,0.7)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3 text-sm">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="font-medium">{copy.title}</span>
        </div>
        <Badge tone="good">{copy.agentActive}</Badge>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-[0.9fr_1.2fr] sm:p-5">
        <div className="grid gap-3">
          <article className="rounded-2xl border border-line p-3">
            <div className="flex gap-3">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image src={photos.cr.src} alt={copy.roomPhotoAlt} fill className="object-cover" sizes="80px" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-wide text-ink/50">{copy.roomCode}</p>
                  <Badge tone="good">{copy.occupied}</Badge>
                </div>
                <p className="font-heading font-bold">{copy.property}</p>
                <p className="text-xs text-ink/60">{copy.roomDetail}</p>
                <p className="mt-1 text-sm font-semibold">
                  {copy.rent} <span className="font-normal text-ink/50">{copy.perMonth}</span>
                  <span className="ml-2 text-primary">{copy.giro}</span>
                </p>
              </div>
            </div>
          </article>
          <article className="rounded-2xl border border-line p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-ink/50">{copy.residentLabel}</p>
                <p className="mt-1 font-heading font-bold">{copy.residentName}</p>
                <p className="text-xs text-ink/60">{copy.residentDetail}</p>
              </div>
              <Badge tone="good">{copy.passVerified}</Badge>
            </div>
          </article>
          <article className="rounded-2xl border border-line p-3">
            <p className="text-xs font-semibold tracking-wide text-ink/50">{copy.vendorLabel}</p>
            <ul className="mt-2 grid gap-2 text-sm">
              <li className="flex items-center justify-between gap-3">
                <span>{copy.aircon}</span>
                <Badge tone="good">{copy.completed}</Badge>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span>{copy.cleaning}</span>
                <span className="text-ink/60">{copy.cleaningTime}</span>
              </li>
            </ul>
          </article>
        </div>
        <article className="rounded-2xl border border-line p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-heading text-lg font-bold">{copy.chatTitle}</h3>
              <p className="text-xs text-ink/60">{copy.chatNote}</p>
            </div>
            <div className="text-right text-xs">
              <Badge tone="teal">{copy.agentBadge}</Badge>
              <p className="mt-1 text-ink/50">{copy.response}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            <div className="max-w-[90%] rounded-2xl bg-muted px-3 py-2 text-sm">
              <p className="text-[11px] font-semibold text-ink/50">{copy.residentMessageLabel}</p>
              <p className="mt-1">{copy.residentMessage}</p>
            </div>
            <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-secondary-strong px-3 py-2 text-sm text-white">
              <p className="text-[11px] font-semibold text-white/70">{copy.agentMessageLabel}</p>
              <p className="mt-1">{copy.agentMessage}</p>
              <p className="mt-2 text-xs text-white/80">{copy.dispatched}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-ink/50">{copy.confirmed}</p>
          <div className="mt-3 flex gap-2">
            <div className="flex h-11 flex-1 items-center rounded-xl border border-line px-3 text-sm text-ink/40">
              {copy.takeoverPlaceholder}
            </div>
            <span className="grid h-11 place-items-center rounded-xl bg-muted px-3 text-sm font-semibold text-ink/50">
              {copy.takeover}
            </span>
          </div>
        </article>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-ink/70 sm:px-5">
        <p>{copy.portfolio}</p>
        <p>{copy.spread}</p>
        <p className="text-good">{copy.healthy}</p>
      </div>
    </div>
  );
}
