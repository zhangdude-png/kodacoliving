import type { Metadata } from "next";
import { Calculator } from "@/components/marketing/calculator";
import { SiteFooter } from "@/components/marketing/footer";
import { AnnouncementBar, SiteHeader } from "@/components/marketing/header";
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
} from "@/components/marketing/sections";
import { landlordFaqs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Turnkey Coliving for Singapore Landlords · Koda Coliving.AI",
  },
  description:
    "Convert a Singapore rental into coliving. Turnkey fit-out from S$15,000 and autonomous operations. St Francis Court: +72% net uplift, fully let in under 4 weeks.",
  alternates: { canonical: absoluteUrl("/for-landlords") },
  openGraph: {
    title: "Turnkey Coliving for Singapore Landlords",
    description:
      "Fit-out from S$15,000 and AI tenant operations. St Francis Court case study: +S$45,009 annual net uplift.",
    url: absoluteUrl("/for-landlords"),
  },
};

export default function LandlordsPage() {
  return (
    <>
      <JsonLd data={landlordJsonLd(landlordFaqs)} />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <AnnouncementBar />
      <SiteHeader audience="landlords" />
      <main id="main">
        <Hero audience="landlords" />
        <Process />
        <CaseStudy />
        <Features audience="landlords" />
        <AgentBand />
        <Pricing />
        <Calculator variant="landlord" />
        <Comparison />
        <Faq items={landlordFaqs} />
        <CtaBand audience="landlords" />
      </main>
      <SiteFooter />
    </>
  );
}
