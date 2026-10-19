"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Bot, Home, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Logo } from "@/components/logo";
import { audiencePath, type Audience, type Locale } from "@/lib/i18n";
import { isBotUserAgent, persistAudience, readAudience } from "@/lib/preferences";
import { getMessages } from "@/messages";
import { cn } from "@/lib/utils";

export function AudienceChooser({
  locale,
  audience,
}: {
  locale: Locale;
  audience: Audience;
}) {
  const copy = getMessages(locale).audience;
  const params = useSearchParams();
  const view = params.get("view");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const decided = useRef(false);
  const operatorRef = useRef<HTMLButtonElement>(null);
  const landlordRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined" && isBotUserAgent(navigator.userAgent)) return;
    if (view === "operator" || view === "landlord") {
      persistAudience(view);
      setOpen(false);
      return;
    }
    if (readAudience()) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }, [view]);

  function dismiss() {
    if (!decided.current) persistAudience("dismissed");
    setOpen(false);
  }

  function choose(choice: "operator" | "landlord") {
    decided.current = true;
    persistAudience(choice);
    setOpen(false);
    const target = audiencePath(locale, choice === "landlord" ? "landlords" : "operators");
    const current = audiencePath(locale, audience);
    if (target !== current) router.push(target);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (
      event.key !== "ArrowDown" &&
      event.key !== "ArrowUp" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight"
    ) {
      return;
    }
    event.preventDefault();
    const active = document.activeElement;
    const next = active === landlordRef.current ? operatorRef.current : landlordRef.current;
    next?.focus();
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss();
        else setOpen(true);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="audience-overlay fixed inset-0 z-50 bg-[#1b1430]/45 backdrop-blur-md" />
        <Dialog.Content
          className="audience-dialog fixed left-1/2 top-1/2 z-50 max-h-[min(92vh,760px)] w-[min(100%-1.25rem,44rem)] overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8"
          aria-describedby="audience-description"
          onKeyDown={onKeyDown}
        >
          <div className="mb-5 flex justify-center">
            <Logo variant="horizontal" decorative className="h-14 sm:h-16" />
          </div>
          <Dialog.Title
            id="audience-title"
            className="px-10 text-center font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl"
          >
            {copy.title}
          </Dialog.Title>
          <Dialog.Description id="audience-description" className="mt-2 text-center text-sm leading-6 text-ink/70">
            {copy.description}
          </Dialog.Description>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              ref={operatorRef}
              type="button"
              onClick={() => choose("operator")}
              className={cn(
                "flex h-full flex-col rounded-3xl border-2 border-line bg-white p-4 text-left transition",
                "hover:border-primary hover:bg-soft focus-visible:border-primary focus-visible:bg-soft",
              )}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                <Bot className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mt-4 font-heading text-lg font-bold text-ink">{copy.operatorTitle}</span>
              <span className="mt-1 text-sm leading-6 text-ink/70">{copy.operatorBody}</span>
            </button>
            <button
              ref={landlordRef}
              type="button"
              onClick={() => choose("landlord")}
              className={cn(
                "flex h-full flex-col rounded-3xl border-2 border-line bg-white p-4 text-left transition",
                "hover:border-secondary hover:bg-[#e5f4f3] focus-visible:border-secondary focus-visible:bg-[#e5f4f3]",
              )}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-white">
                <Home className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mt-4 font-heading text-lg font-bold text-ink">{copy.landlordTitle}</span>
              <span className="mt-1 text-sm leading-6 text-ink/70">{copy.landlordBody}</span>
            </button>
          </div>
          <Dialog.Close
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl text-ink/60 hover:bg-muted"
            aria-label={copy.close}
          >
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
