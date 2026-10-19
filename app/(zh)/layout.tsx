import type { Metadata, Viewport } from "next";
import { Montserrat, Noto_Sans_SC } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Koda Coliving.AI — 自主运营共享居住空间",
    template: "%s · Koda Coliving.AI",
  },
  description:
    "面向新加坡的共享居住空间：代理式 AI 租客服务、已核实看房、收租，以及 S$15,000 起的一站式装修与拎包入住。",
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "zh_Hans_SG",
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

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans" className={`${montserrat.variable} ${notoSansSC.variable} h-full`}>
      <body className="min-h-full bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
