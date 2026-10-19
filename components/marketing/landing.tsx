import { Suspense } from "react";
import { AudienceChooser } from "@/components/marketing/audience-chooser";
import { Calculator } from "@/components/marketing/calculator";
import { SiteFooter } from "@/components/marketing/footer";
import { AnnouncementBar, SiteHeader } from "@/components/marketing/header";
import { LocaleSuggestion } from "@/components/marketing/locale-suggestion";
import { Pricing } from "@/components/marketing/pricing";
import {
  AgentBand,
  CaseStudy,
  Comparison,
  CtaBand,
  Faq,
  Features,
  Hero,
  JsonLd,
  Process,
  landlordJsonLd,
  operatorJsonLd,
} from "@/components/marketing/sections";
import type { Audience, Locale } from "@/lib/i18n";
import { getMessages } from "@/messages";

export function MarketingLanding({
  locale,
  audience,
}: {
  locale: Locale;
  audience: Audience;
}) {
  const copy = getMessages(locale);
  const landlord = audience === "landlords";
  return (
    <>
      <JsonLd data={landlord ? landlordJsonLd(locale) : operatorJsonLd(locale)} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        {copy.skip}
      </a>
      <LocaleSuggestion locale={locale} audience={audience} />
      {landlord ? <AnnouncementBar locale={locale} /> : null}
      <SiteHeader audience={audience} locale={locale} showLanguageSwitch />
      <main id="main">
        <Hero audience={audience} copy={copy} />
        {landlord ? <Process copy={copy} /> : null}
        {landlord ? <CaseStudy copy={copy} /> : null}
        <Features audience={audience} copy={copy} />
        <AgentBand copy={copy} />
        <Pricing locale={locale} />
        <Calculator variant={landlord ? "landlord" : "fleet"} locale={locale} />
        <Comparison copy={copy} />
        <Faq
          title={copy.faq.title}
          items={landlord ? copy.faq.landlords : copy.faq.operators}
        />
        <CtaBand audience={audience} copy={copy} />
      </main>
      <SiteFooter locale={locale} />
      <Suspense fallback={null}>
        <AudienceChooser locale={locale} audience={audience} />
      </Suspense>
    </>
  );
}
