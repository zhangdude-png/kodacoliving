"use client";

import { Check, ChevronDown, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { BookConsultation } from "@/components/marketing/consultation-dialog";
import { audiencePath, type Audience, type Locale } from "@/lib/i18n";
import { persistAudience, persistLocale } from "@/lib/preferences";
import { getMessages, type MarketingMessages } from "@/messages";
import { cn } from "@/lib/utils";

const operatorHashes = ["#product", "#pricing", "#faq"];
const landlordHashes = ["#fit-out", "#case-study", "#calculator"];

export function SiteHeader({
  audience,
  locale = "en",
  showLanguageSwitch = false,
}: {
  audience: Audience;
  locale?: Locale;
  showLanguageSwitch?: boolean;
}) {
  const copy = getMessages(locale);
  const links = (audience === "landlords" ? landlordHashes : operatorHashes).map((href, index) => ({
    href: href.startsWith("/") ? href : `${audiencePath(locale, audience)}${href}`,
    label: (audience === "landlords" ? copy.header.landlordNav : copy.header.operatorNav)[index],
  }));
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-16 items-center justify-between gap-3">
          <Logo href={audiencePath(locale, "operators")} className="h-11" />
          <nav className="hidden items-center gap-5 lg:flex" aria-label={copy.header.primary}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-secondary-text hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <AudienceLink locale={locale} audience={audience} copy={copy} />
            {showLanguageSwitch ? (
              <LanguageMenu locale={locale} audience={audience} copy={copy} />
            ) : null}
            <BookConsultation copy={copy.consultation}>{copy.header.book}</BookConsultation>
          </div>
          <button
            type="button"
            className="ml-auto grid h-10 w-10 place-items-center rounded-xl border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? copy.header.closeMenu : copy.header.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-white px-4 py-4 lg:hidden">
          <nav className="grid gap-1" aria-label={copy.header.mobile}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-secondary-text hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 grid gap-2">
            <AudienceLink
              locale={locale}
              audience={audience}
              copy={copy}
              className="w-full justify-center"
              onNavigate={() => setOpen(false)}
            />
            {showLanguageSwitch ? (
              <LanguageMenu locale={locale} audience={audience} copy={copy} onNavigate={() => setOpen(false)} />
            ) : null}
            <div className="[&_button]:w-full">
              <BookConsultation copy={copy.consultation}>{copy.header.book}</BookConsultation>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function AudienceLink({
  locale,
  audience,
  copy,
  className,
  onNavigate,
}: {
  locale: Locale;
  audience: Audience;
  copy: MarketingMessages;
  className?: string;
  onNavigate?: () => void;
}) {
  const toLandlords = audience === "operators";
  return (
    <Link
      href={audiencePath(locale, toLandlords ? "landlords" : "operators")}
      onClick={() => {
        persistAudience(toLandlords ? "landlord" : "operator");
        onNavigate?.();
      }}
      className={cn(
        "inline-flex h-9 items-center rounded-full border border-line px-3 text-[13px] font-medium text-ink/70 hover:bg-muted hover:text-ink",
        className,
      )}
    >
      {toLandlords ? copy.header.forLandlords : copy.header.forOperators}
    </Link>
  );
}

const languageOptions = [
  { locale: "en" as const, nameKey: "languageEnglish" as const },
  { locale: "zh-Hans" as const, nameKey: "chinese" as const },
];

function LanguageMenu({
  locale,
  audience,
  copy,
  onNavigate,
}: {
  locale: Locale;
  audience: Audience;
  copy: MarketingMessages;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const menuId = useId();
  const currentIndex = languageOptions.findIndex((option) => option.locale === locale);
  const code = locale === "zh-Hans" ? copy.header.chineseShort : copy.header.english;
  const currentName = copy.header[languageOptions[currentIndex]?.nameKey ?? "languageEnglish"];

  useEffect(() => {
    if (!open) return;
    const index = currentIndex >= 0 ? currentIndex : 0;
    itemsRef.current[index]?.focus();
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, currentIndex]);

  function move(next: number) {
    const count = languageOptions.length;
    const index = (next + count) % count;
    itemsRef.current[index]?.focus();
  }

  return (
    <div ref={rootRef} className="relative w-fit">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-[13px] font-medium text-ink/70 hover:bg-muted hover:text-ink"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${copy.header.languageLabel}, ${currentName}`}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span>{code}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={copy.header.languageLabel}
          className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-line bg-white p-1 shadow-lg"
          onKeyDown={(event) => {
            const index = itemsRef.current.findIndex((item) => item === document.activeElement);
            if (event.key === "ArrowDown") {
              event.preventDefault();
              move(index + 1);
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              move(index - 1);
            } else if (event.key === "Home") {
              event.preventDefault();
              move(0);
            } else if (event.key === "End") {
              event.preventDefault();
              move(languageOptions.length - 1);
            } else if (event.key === "Tab") {
              setOpen(false);
            }
          }}
        >
          {languageOptions.map((option, index) => {
            const selected = option.locale === locale;
            const label = copy.header[option.nameKey];
            return (
              <Link
                key={option.locale}
                ref={(node) => {
                  itemsRef.current[index] = node;
                }}
                href={audiencePath(option.locale, audience)}
                role="menuitemradio"
                aria-checked={selected}
                hrefLang={option.locale}
                lang={option.locale === "zh-Hans" ? "zh-Hans" : "en"}
                tabIndex={-1}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-ink hover:bg-muted focus:bg-muted focus:outline-none"
                onClick={() => {
                  persistLocale(option.locale);
                  setOpen(false);
                  onNavigate?.();
                }}
                onKeyDown={(event) => {
                  if (event.key === " ") {
                    event.preventDefault();
                    event.currentTarget.click();
                  }
                }}
              >
                <span>{label}</span>
                {selected ? <Check className="h-4 w-4 text-secondary-text" aria-hidden="true" /> : <span className="h-4 w-4" />}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function AnnouncementBar({ locale = "en" }: { locale?: Locale }) {
  const copy = getMessages(locale).announcement;
  return (
    <div className="bg-[#e5f4f3] text-secondary-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary-strong px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            {copy.badge}
          </span>
          <span>{copy.body}</span>
        </p>
        <a href="#calculator" className="shrink-0 font-semibold hover:underline">
          {copy.cta}
        </a>
      </div>
    </div>
  );
}
