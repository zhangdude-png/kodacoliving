import type { Metadata } from "next";
import { SettingsView } from "@/components/console/settings-view";

export const metadata: Metadata = { title: "Settings and subscription" };

export default function SettingsPage() {
  return <SettingsView />;
}
