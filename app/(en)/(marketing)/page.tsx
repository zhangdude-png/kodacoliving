import type { Metadata } from "next";
import { MarketingLanding } from "@/components/marketing/landing";
import { marketingMetadata } from "@/lib/i18n";

export const metadata: Metadata = marketingMetadata("en", "operators");

export default function OperatorsPage() {
  return <MarketingLanding locale="en" audience="operators" />;
}
