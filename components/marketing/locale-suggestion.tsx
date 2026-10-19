"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { audiencePath, type Audience, type Locale } from "@/lib/i18n";
import {
  dismissLocaleSuggestion,
  isBotUserAgent,
  localeSuggestionDismissed,
  persistLocale,
  readLocale,
} from "@/lib/preferences";
import { getMessages } from "@/messages";

export function LocaleSuggestion({
  locale,
  audience,
}: {
  locale: Locale;
  audience: Audience;
}) {
  const copy = getMessages(locale).suggest;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (locale !== "en") return;
    if (typeof navigator !== "undefined" && isBotUserAgent(navigator.userAgent)) return;
    if (readLocale() || localeSuggestionDismissed()) return;
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const wantsChinese = languages.some((language) => language.toLowerCase().startsWith("zh"));
    if (wantsChinese) setShow(true);
  }, [locale]);

  if (!show) return null;

  return (
    <div className="border-b border-primary/10 bg-soft text-sm text-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <p>{copy.body}</p>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={audiencePath("zh-Hans", audience)}
            onClick={() => persistLocale("zh-Hans")}
            className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white"
          >
            {copy.action}
          </Link>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:bg-white"
            aria-label={copy.dismiss}
            onClick={() => {
              dismissLocaleSuggestion();
              setShow(false);
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
