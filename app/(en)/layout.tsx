import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Koda Coliving.AI — Autonomous coliving operations",
    template: "%s · Koda Coliving.AI",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#60308D",
  width: "device-width",
  initialScale: 1,
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full`}>
      <body className="min-h-full bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
