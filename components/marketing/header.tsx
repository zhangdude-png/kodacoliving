"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { BookConsultation } from "@/components/marketing/consultation-dialog";
import { audiencePath, type Audience, type Locale } from "@/lib/i18n";
import { persistAudience, persistLocale } from "@/lib/preferences";
import { getMessages, type MarketingMessages } from "@/messages";
import { cn } from "@/lib/utils";

const operatorHashes = ["#product", "#how-it-works", "#pricing", "#faq", "/app"];
const landlordHashes = ["#fit-out", "#case-study", "#calculator", "#operations", "#faq"];

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
          <nav className="hidden items-center gap-5 xl:flex" aria-label={copy.header.primary}>
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
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <AudienceSwitch locale={locale} audience={audience} copy={copy} />
              {showLanguageSwitch ? <LanguageSwitch locale={locale} audience={audience} copy={copy} /> : null}
            </div>
            <div className="hidden lg:block">
              <BookConsultation copy={copy.consultation}>{copy.header.book}</BookConsultation>
            </div>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-line xl:hidden"
              aria-expanded={open}
              aria-label={open ? copy.header.closeMenu : copy.header.openMenu}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 pb-3 md:hidden">
          <AudienceSwitch locale={locale} audience={audience} copy={copy} className="min-w-0 flex-1" />
          {showLanguageSwitch ? <LanguageSwitch locale={locale} audience={audience} copy={copy} compact /> : null}
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-white px-4 py-4 xl:hidden">
          <div className="grid gap-3">
            <AudienceSwitch locale={locale} audience={audience} copy={copy} />
            {showLanguageSwitch ? (
              <LanguageSwitch locale={locale} audience={audience} copy={copy} />
            ) : null}
          </div>
          <nav className="mt-3 grid gap-1" aria-label={copy.header.mobile}>
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
            <div className="pt-2 lg:hidden">
              <BookConsultation copy={copy.consultation}>{copy.header.book}</BookConsultation>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function AudienceSwitch({
  locale,
  audience,
  copy,
  className,
}: {
  locale: Locale;
  audience: Audience;
  copy: MarketingMessages;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={copy.header.audienceLabel}
      className={cn("inline-flex rounded-full border border-line bg-soft p-0.5 text-[13px] font-semibold", className)}
    >
      <SwitchLink
        href={audiencePath(locale, "operators")}
        active={audience === "operators"}
        onClick={() => persistAudience("operator")}
      >
        {copy.header.operators}
      </SwitchLink>
      <SwitchLink
        href={audiencePath(locale, "landlords")}
        active={audience === "landlords"}
        onClick={() => persistAudience("landlord")}
      >
        {copy.header.landlords}
      </SwitchLink>
    </div>
  );
}

function LanguageSwitch({
  locale,
  audience,
  copy,
  compact = false,
  className,
}: {
  locale: Locale;
  audience: Audience;
  copy: MarketingMessages;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={copy.header.languageLabel}
      className={cn("inline-flex rounded-full border border-line bg-white p-0.5 text-[13px] font-semibold", className)}
    >
      <SwitchLink
        href={audiencePath("en", audience)}
        active={locale === "en"}
        onClick={() => persistLocale("en")}
      >
        {copy.header.english}
      </SwitchLink>
      <SwitchLink
        href={audiencePath("zh-Hans", audience)}
        active={locale === "zh-Hans"}
        onClick={() => persistLocale("zh-Hans")}
      >
        <span className={compact ? "sm:hidden" : "hidden"}>{copy.header.chineseShort}</span>
        <span className={compact ? "hidden sm:inline" : "inline"}>{copy.header.chinese}</span>
      </SwitchLink>
    </div>
  );
}

function SwitchLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      hrefLang={href.startsWith("/zh") ? "zh-Hans" : "en"}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 flex-1 items-center justify-center rounded-full px-3 py-1.5 text-center transition",
        active ? "bg-secondary-strong text-white shadow-sm" : "text-ink/70 hover:bg-white hover:text-ink",
      )}
    >
      {children}
    </Link>
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
