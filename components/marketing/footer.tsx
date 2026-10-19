import Link from "next/link";
import { Logo } from "@/components/logo";
import { audiencePath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { getMessages } from "@/messages";

export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const copy = getMessages(locale);
  const home = audiencePath(locale, "operators");
  const landlords = audiencePath(locale, "landlords");
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="onDark" href={home} className="h-11" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">{copy.footer.blurb}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{copy.footer.product}</h2>
          <ul className="mt-3 grid gap-2 text-sm text-secondary [&_a]:hover:text-white">
            <li><Link href={`${home}#pricing`}>{copy.footer.pricing}</Link></li>
            <li><Link href={`${home}#calculator`}>{copy.footer.fleetCalculator}</Link></li>
            <li><Link href="/app">{copy.footer.console}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{copy.footer.landlords}</h2>
          <ul className="mt-3 grid gap-2 text-sm text-secondary [&_a]:hover:text-white">
            <li><Link href={landlords}>{copy.footer.forLandlords}</Link></li>
            <li><Link href={`${landlords}#case-study`}>{copy.footer.caseStudy}</Link></li>
            <li><Link href={`${landlords}#calculator`}>{copy.footer.yieldCalculator}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{copy.footer.company}</h2>
          <ul className="mt-3 grid gap-2 text-sm text-secondary [&_a]:hover:text-white">
            <li><Link href="/privacy">{copy.footer.privacy}</Link></li>
            <li><Link href="/terms">{copy.footer.terms}</Link></li>
            <li>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                {copy.footer.whatsapp}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/50 sm:px-6">{copy.footer.legal}</p>
      </div>
    </footer>
  );
}
