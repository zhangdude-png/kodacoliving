import type { Metadata } from "next";
import { SiteFooter } from "@/components/marketing/footer";
import { SiteHeader } from "@/components/marketing/header";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the Koda Coliving.AI demo handles information.",
  alternates: { canonical: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader audience="operators" />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-heading text-4xl font-bold text-primary">Privacy</h1>
        <div className="mt-6 grid gap-4 text-sm leading-7 text-ink/75">
          <p>
            This deployment is a product demo. The operator console uses labelled seed data stored in the app. It does not create accounts, and the consultation form does not transmit what you type.
          </p>
          <p>
            When Supabase is connected, operator records are intended to live in Postgres with row-level security so one operator cannot read another operator&apos;s units, rooms, tenancies, messages, or invoices. Resident document numbers are not shown in this demo.
          </p>
          <p>
            When Stripe is connected, card data is collected by Stripe, not stored in the Koda database. The schema keeps a Stripe customer id on the operator row.
          </p>
          <p>
            The WhatsApp button uses a placeholder link until a real number is set in NEXT_PUBLIC_WHATSAPP_URL.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
