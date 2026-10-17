# Koda Coliving.AI

Agentic coliving-management software for operators and landlords in Singapore. This first version is a Next.js app that runs entirely on local demo data. Supabase (auth + Postgres, with row-level security) and Stripe (per-room subscriptions) are scaffolded and not required to start the app.

Brand: **Koda Coliving.AI**. Design system: Elevate Coliving — primary `#60308D`, secondary `#44898C`, tertiary `#5E4400`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4317](http://localhost:4317).

No API keys are required. Copy `.env.example` to `.env.local` only when you are ready to point the app at Supabase or Stripe.

```bash
npm run lint
npm run build
npm start
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Operator marketing site (5 to 100 rooms), server-rendered |
| `/for-landlords` | Landlord marketing site, including the St Francis case study |
| `/privacy`, `/terms` | Short legal pages for this demo |
| `/app` | Executive dashboard (demo seed) |
| `/app/units` | View by units |
| `/app/units/[slug]` | Property detail |
| `/app/rooms` | View by rooms, with status filter, sort, and pagination |
| `/app/rooms/[id]` | Room management: tenancy, timeline, AI chat, takeover |
| `/app/settings` | Subscription, viewing credits, invoices (demo, no Stripe charge) |
| `/sitemap.xml`, `/robots.txt` | Sitemap of marketing URLs. `/app` is disallowed |

Auth is a stub session labelled **Ops Lead** (`ops@koda.demo`). There is no login wall.

## Pricing source of truth

`lib/pricing.ts` is the only place Premium is defined.

- Basic: S$15 / room / month billed annually, or S$20 billed monthly.
- Premium: **S$30 / room / month, marked TBD** (candidates S$25, S$30, S$35). Includes 5 viewing credits per room per year.
- AI Property Agent: **S$50** per verified viewing.

Change `PREMIUM_PRICE_PER_ROOM_SGD` and the marketing page, calculator, and settings screen all follow.

## Content rules already applied

- St Francis Court figures on `/for-landlords` are the published case study (S$5,200 whole-unit rent, S$62,400 annual gross, S$9,830 coliving gross, S$117,960 coliving annual gross, S$8,951 net monthly, S$34,513 setup, ~9.2 month payback, +S$45,009 annual net uplift, leasing S$1,400 vs agent fee S$2,600).
- The three case-study photos are the supplied St Francis images.
- The operator console is a separate **demo portfolio** (4 units, 24 rooms, snapshot 30 June 2024). It is labelled as demo data and is not the case study.
- No S$100 viewing price. No 6-pax or compliance claims. No resident names or document numbers.

The yield calculator opens on the published St Francis result. Edit any input and it switches to a visible formula: net monthly × 12, minus the current whole-unit annual gross. That formula is S$3 away from the published +S$45,009 (8,951 × 12 − 62,400 = 45,012), so the untouched calculator keeps the published figure.

## Environment variables

See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, Open Graph. Defaults to `http://localhost:4317`. |
| `NEXT_PUBLIC_WHATSAPP_URL` | Enquiry links. Defaults to `https://wa.me/6500000000`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. Unused while blank. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser key. Unused while blank. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server key for later webhooks. Never expose to the client. |
| `STRIPE_SECRET_KEY` | Stripe secret. Unused while blank. |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe.js key, for a later checkout. |
| `STRIPE_PRICE_BASIC_ANNUAL` | Price id, per room, S$15. |
| `STRIPE_PRICE_BASIC_MONTHLY` | Price id, per room, S$20. |
| `STRIPE_PRICE_PREMIUM` | Price id once Premium is chosen. |
| `STRIPE_PRICE_VIEWING_CREDIT` | One-off price for a S$50 viewing credit. |

`lib/supabase.ts` reports whether the Supabase URL and anon key are present. No page imports a live client.

## Supabase

Migration: `supabase/migrations/20261017120000_init.sql`.

It creates operators, profiles (one auth user → one operator), units, rooms, tenancies, activities, messages, subscriptions, a viewing-credit ledger, and invoices. Row-level security is on for every table. `current_operator_id()` reads the signed-in user's profile, and each policy allows a row only when `operator_id` matches. `anon` has no table grants. The service role bypasses RLS and is the intended path for Stripe webhooks later.

Apply it from the Supabase SQL editor, or link the CLI and run `supabase db push`. Then create a user, insert an `operators` row, and insert a `profiles` row with that user's id. Until that is wired into the app, the console keeps using `lib/demo-data.ts`.

## Stripe

Subscriptions are per room. When billing is connected:

1. Create Products for Basic and Premium.
2. Add recurring prices at the rates above. Premium waits on the TBD decision.
3. Set the subscription **quantity** to the operator's active room count, and update quantity when rooms are added or removed.
4. Sell viewing credits as a one-off S$50 price, and append a row to `viewing_credits`.
5. Verify webhooks with `STRIPE_WEBHOOK_SECRET` and write `stripe_customer_id` / `stripe_subscription_id` with the service role.

The settings screen simulates plan changes, the syndication toggle, and a credit top-up in the browser only.

## Deploy on Vercel

1. Import the repository. Framework preset: Next.js. Build command `npm run build`. No install overrides.
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs and the sitemap match the domain.
3. Leave Supabase and Stripe variables empty until those projects exist. The demo still builds.
4. Add the remaining variables from `.env.example` when you connect them. Do not put `SUPABASE_SERVICE_ROLE_KEY` or `STRIPE_SECRET_KEY` in a `NEXT_PUBLIC_` variable.

Marketing pages are static server output (metadata, Open Graph image, sitemap, robots). `/app` is marked `noindex` and disallowed in `robots.txt`.

## Next steps

- Replace the stub session with Supabase Auth and read units, rooms, messages, and invoices through RLS. Prove isolation with two operator users.
- Create Stripe prices and set subscription quantity from the room count. Keep Premium on `PREMIUM_PRICE_PER_ROOM_SGD` until the owner picks 25, 30, or 35.
- Point WhatsApp CTAs at a real number.
- Store agreements and floor plans, instead of the demo file dialog.
- Connect portal syndication and the vendor list. The console already has the takeover control the agent should honour.
