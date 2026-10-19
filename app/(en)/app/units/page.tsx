import type { Metadata } from "next";
import { UnitsView } from "@/components/console/units-view";

export const metadata: Metadata = { title: "Unit inventory" };

export default function UnitsPage() {
  return <UnitsView />;
}
