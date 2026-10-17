"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  chatFor,
  getUnit,
  photos,
  timelineFor,
  type Activity,
  type ChatMessage,
  type Room,
} from "@/lib/demo-data";
import { sgd } from "@/lib/format";

export function RoomManagement({ room }: { room: Room }) {
  const unit = getUnit(room.unitSlug);
  const photo = photos[room.photo];
  const [filter, setFilter] = useState<"All" | Activity["tag"]>("All");
  const timeline = timelineFor(room.id, room);
  const visible = timeline.filter((item) => filter === "All" || item.tag === filter);
  const [messages, setMessages] = useState<ChatMessage[]>(() => chatFor(room));
  const [takeover, setTakeover] = useState(false);
  const [draft, setDraft] = useState("");

  function send() {
    const body = draft.trim();
    if (!body || !takeover) return;
    setMessages((current) => [
      ...current,
      { id: `op-${current.length}`, role: "operator", body, time: "Now" },
    ]);
    setDraft("");
  }

  return (
    <div className="grid gap-5">
      <header className="relative overflow-hidden rounded-3xl">
        <div className="relative h-64">
          <Image src={photo.src} alt={photo.alt} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12081f]/80 to-[#12081f]/20" />
          <div className="absolute bottom-0 p-6 text-white">
            <Badge tone="dark">{room.status}</Badge>
            <h1 className="mt-2 font-heading text-4xl font-bold">{room.code}</h1>
            <p className="text-sm text-white/80">
              {unit?.name} · {room.name} · {unit?.neighbourhood}
            </p>
          </div>
        </div>
      </header>
      <p className="text-sm text-ink/55">
        <Link href={`/app/units/${room.unitSlug}`} className="font-semibold text-primary">{unit?.name}</Link>
        {" · "}
        {room.furnishing}
      </p>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-line bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Current tenancy</p>
              <h2 className="mt-1 font-heading text-2xl font-bold">
                {room.status === "occupied" ? `Resident · ${room.code}` : room.status === "reserved" ? "Contract pending" : "No resident"}
              </h2>
              <p className="text-sm text-ink/60">
                {room.passVerified
                  ? "Work pass verified. Name and document number are not shown in this demo."
                  : "No pass is on file because there is no active tenancy."}
              </p>
            </div>
            {room.passVerified ? <Badge tone="good">Pass verified</Badge> : <Badge>Demo</Badge>}
          </div>
          <p className="mt-4 text-sm text-ink/60">{unit?.neighbourhood} · {unit?.address}</p>
        </article>
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Rental terms</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-ink/45">Monthly rate</dt>
              <dd className="font-heading text-2xl font-extrabold">{sgd(room.rent)}</dd>
            </div>
            <div>
              <dt className="text-ink/45">Security deposit</dt>
              <dd className="font-semibold">{room.deposit ? sgd(room.deposit) : "Not collected"}</dd>
            </div>
            <div>
              <dt className="text-ink/45">Lease start</dt>
              <dd className="font-semibold">{room.leaseStart ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-ink/45">Lease end</dt>
              <dd className="font-semibold">{room.leaseEnd ?? "—"}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-ink/60">{room.leaseNote ?? "Terms shown are demo seed, not a live agreement."}</p>
          {room.status === "occupied" ? <Badge tone="good" className="mt-3">Digital agreement signed</Badge> : null}
        </article>
      </section>

      <section className="rounded-3xl border border-line bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-bold">Activity timeline</h2>
          <div className="flex flex-wrap gap-1">
            {(["All", "Finance", "Maintenance", "Marketing", "Tenancy"] as const).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${filter === tag ? "bg-primary text-white" : "bg-muted"}`}
                aria-pressed={filter === tag}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        {visible.length === 0 ? (
          <p className="mt-4 text-sm text-ink/60">No {filter.toLowerCase()} events on this room in the demo log.</p>
        ) : (
          <ol className="mt-4 grid gap-3">
            {visible.map((item) => (
              <li key={item.id} className="grid gap-1 rounded-2xl border border-line p-3 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-ink/65">{item.detail}</p>
                </div>
                <div className="text-right text-xs text-ink/50">
                  <p>{item.at}</p>
                  <p className="font-semibold text-primary">{item.state}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="rounded-3xl border border-line bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold">Autonomous chat</h2>
            <p className="text-sm text-ink/60">
              {takeover
                ? "You are in the thread. The agent is paused for this demo session."
                : "Agent active. Take over to reply as the operator."}
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            Takeover
            <Switch
              checked={takeover}
              onCheckedChange={(checked) => {
                setTakeover(checked);
                setMessages((current) => [
                  ...current,
                  {
                    id: `sys-${current.length}`,
                    role: "system",
                    body: checked
                      ? "Operator takeover on. The agent will not reply until you hand the thread back."
                      : "Takeover off. The agent is monitoring again.",
                    time: "Now",
                  },
                ]);
              }}
              aria-label="Toggle operator takeover"
            />
          </label>
        </div>
        <div className="mt-4 grid max-h-[420px] gap-3 overflow-y-auto pr-1">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <label className="sr-only" htmlFor="reply">Reply</label>
          <input
            id="reply"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            disabled={!takeover}
            placeholder={takeover ? "Reply as the operator" : "Turn takeover on to reply"}
            className="h-11 flex-1 rounded-xl border border-line px-3 text-sm disabled:bg-muted"
          />
          <button
            type="submit"
            disabled={!takeover || !draft.trim()}
            className="rounded-xl bg-primary px-4 text-sm font-semibold text-white disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "system") {
    return <p className="rounded-2xl bg-[#f3fbf7] px-3 py-2 text-sm text-secondary-ink">{message.body}</p>;
  }
  const mine = message.role === "agent" || message.role === "operator";
  return (
    <div className={mine ? "ml-auto max-w-[85%] rounded-2xl bg-primary px-3 py-2 text-sm text-white" : "max-w-[85%] rounded-2xl bg-muted px-3 py-2 text-sm"}>
      <p className={`text-[11px] font-semibold ${mine ? "text-white/70" : "text-ink/45"}`}>
        {message.role === "resident" ? "Resident" : message.role === "operator" ? "Operator" : "Koda agent"} · {message.time}
      </p>
      <p className="mt-1">{message.body}</p>
    </div>
  );
}
