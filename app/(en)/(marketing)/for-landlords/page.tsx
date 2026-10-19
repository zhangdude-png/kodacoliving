import type { Metadata } from "next";
import { MarketingLanding } from "@/components/marketing/landing";
import { marketingMetadata } from "@/lib/i18n";

export const metadata: Metadata = marketingMetadata("en", "landlords");

export default function LandlordsPage() {
  return <MarketingLanding locale="en" audience="landlords" />;
}
