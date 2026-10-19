import type { Metadata } from "next";
import { SiteFooter } from "@/components/marketing/footer";
import { SiteHeader } from "@/components/marketing/header";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for the Koda Coliving.AI demo.",
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader audience="operators" />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-heading text-4xl font-bold text-primary">Terms</h1>
        <div className="mt-6 grid gap-4 text-sm leading-7 text-ink/75">
          <p>
            Koda Coliving.AI is shown here as a first version. Basic is S$15 per room per month billed annually, or S$20 billed monthly. Premium is displayed at S$30 per room per month and is marked TBD while S$25, S$30, and S$35 are under review.
          </p>
          <p>
            Verified viewings are S$50 each. Premium includes 5 viewing credits per room per year. A tenancy has a minimum stay of 3 months, and tenant passes are verified before move-in.
          </p>
          <p>
            The St Francis Court figures on the landlord page are the published case study. Numbers inside the operator console are demo seed data and are not that case study.
          </p>
          <p>
            Nothing in this demo is an offer of a specific unit, a guarantee of yield, or a statement about occupancy limits.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
