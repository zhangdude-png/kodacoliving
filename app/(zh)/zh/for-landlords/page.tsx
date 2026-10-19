import type { Metadata } from "next";
import { MarketingLanding } from "@/components/marketing/landing";
import { marketingMetadata } from "@/lib/i18n";

export const metadata: Metadata = marketingMetadata("zh-Hans", "landlords");

export default function ChineseLandlordsPage() {
  return <MarketingLanding locale="zh-Hans" audience="landlords" />;
}
