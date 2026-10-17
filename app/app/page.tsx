import type { Metadata } from "next";
import { Dashboard } from "@/components/console/dashboard";

export const metadata: Metadata = { title: "Executive dashboard" };

export default function DashboardPage() {
  return <Dashboard />;
}
