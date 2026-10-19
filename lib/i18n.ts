import type { Metadata } from "next";
import { getMessages, type Locale } from "@/messages";
import { absoluteUrl } from "@/lib/site";

export type { Locale };
export type Audience = "operators" | "landlords";

export function audiencePath(locale: Locale, audience: Audience) {
  if (locale === "zh-Hans") {
    return audience === "landlords" ? "/zh/for-landlords" : "/zh";
  }
  return audience === "landlords" ? "/for-landlords" : "/";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "zh-Hans" : "en";
}

export function htmlLang(locale: Locale) {
  return locale === "zh-Hans" ? "zh-Hans" : "en";
}

export function marketingMetadata(locale: Locale, audience: Audience): Metadata {
  const copy = getMessages(locale).meta[audience];
  const path = audiencePath(locale, audience);
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        en: absoluteUrl(audiencePath("en", audience)),
        "zh-Hans": absoluteUrl(audiencePath("zh-Hans", audience)),
        "x-default": absoluteUrl(audiencePath("en", audience)),
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.ogDescription,
      url: absoluteUrl(path),
      locale: locale === "zh-Hans" ? "zh_Hans_SG" : "en_SG",
    },
  };
}
