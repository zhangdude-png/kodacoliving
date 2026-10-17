import type { Metadata } from "next";
import { SiteFooter } from "@/components/marketing/footer";
import { SiteHeader } from "@/components/marketing/header";
import { Calculator } from "@/components/marketing/calculator";
import { Pricing } from "@/components/marketing/pricing";
import {
  AgentBand,
  Comparison,
  CtaBand,
  Faq,
  Features,
  Hero,
  JsonLd,
  operatorJsonLd,
} from "@/components/marketing/sections";
import { operatorFaqs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Koda Coliving.AI — Run 5 to 100 coliving rooms autonomously",
  },
  description:
    "Agentic AI for Singapore coliving operators. WhatsApp tenant service, verified viewings at S$50, rent collection, and vendor dispatch. Basic is S$15 per room per month.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Koda Coliving.AI — Run 5 to 100 coliving rooms autonomously",
    description:
      "One autonomous crew for WhatsApp, viewings, rent, and maintenance across a Singapore coliving fleet.",
    url: absoluteUrl("/"),
  },
};

export default function OperatorsPage() {
  return (
    <>
      <JsonLd data={operatorJsonLd()} />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <SiteHeader audience="operators" />
      <main id="main">
        <Hero audience="operators" />
        <Features audience="operators" />
        <AgentBand />
        <Pricing />
        <Calculator variant="fleet" />
        <Comparison />
        <Faq items={operatorFaqs} />
        <CtaBand audience="operators" />
      </main>
      <SiteFooter />
    </>
  );
}
