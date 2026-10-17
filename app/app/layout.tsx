import type { Metadata } from "next";
import { ConsoleChrome } from "@/components/console/chrome";

export const metadata: Metadata = {
  title: "Operator console",
  robots: { index: false, follow: false },
};

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  return <ConsoleChrome>{children}</ConsoleChrome>;
}
