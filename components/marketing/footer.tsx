import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo inverted subline="Autonomous ops" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
            Agentic coliving operations for Singapore. Fit-out for landlords.
            A per-room console for operators running 5 to 100 rooms.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Product</h2>
          <ul className="mt-3 grid gap-2 text-sm text-white/70">
            <li><Link href="/#pricing">Pricing</Link></li>
            <li><Link href="/#calculator">Fleet calculator</Link></li>
            <li><Link href="/app">Operator console</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Landlords</h2>
          <ul className="mt-3 grid gap-2 text-sm text-white/70">
            <li><Link href="/for-landlords">For landlords</Link></li>
            <li><Link href="/for-landlords#case-study">St Francis case study</Link></li>
            <li><Link href="/for-landlords#calculator">Yield calculator</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Company</h2>
          <ul className="mt-3 grid gap-2 text-sm text-white/70">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/50 sm:px-6">
          © 2026 Koda Coliving.AI · Singapore · Demo build.
          Premium software price is TBD.
        </p>
      </div>
    </footer>
  );
}
