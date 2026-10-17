-- Koda Coliving.AI
-- Operator data is isolated with row-level security.
-- Every tenant-owned row carries operator_id.
-- The running app does not connect to this database yet; it uses lib/demo-data.ts.
-- Apply in the Supabase SQL editor, or with `supabase db push` once the CLI is linked.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Operators and people
-- ---------------------------------------------------------------------------

create table public.operators (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  uen text,
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

comment on table public.operators is
  'A coliving operator (the tenant). Stripe customer id lives here; card data does not.';

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  operator_id uuid not null references public.operators (id) on delete restrict,
  role text not null check (role in ('owner', 'manager', 'staff')),
  display_name text not null,
  created_at timestamptz not null default now()
);

comment on table public.profiles is
  'Maps an auth user to exactly one operator. RLS uses this row.';

-- ---------------------------------------------------------------------------
-- Portfolio
-- ---------------------------------------------------------------------------

create table public.units (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators (id) on delete cascade,
  slug text not null,
  name text not null,
  code text not null,
  address text not null,
  neighbourhood text,
  master_rent_cents integer not null check (master_rent_cents >= 0),
  lease_start date,
  lease_end date,
  created_at timestamptz not null default now(),
  unique (operator_id, slug)
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators (id) on delete cascade,
  unit_id uuid not null references public.units (id) on delete cascade,
  code text not null,
  name text not null,
  asking_rent_cents integer not null check (asking_rent_cents >= 0),
  status text not null check (status in ('occupied', 'vacant', 'reserved')),
  furnishing text,
  created_at timestamptz not null default now(),
  unique (unit_id, code)
);

create table public.tenancies (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators (id) on delete cascade,
  room_id uuid not null references public.rooms (id) on delete cascade,
  -- Display label only. Do not put a resident legal name in analytics views.
  resident_label text not null,
  start_date date not null,
  end_date date not null,
  monthly_rent_cents integer not null check (monthly_rent_cents >= 0),
  deposit_cents integer not null default 0 check (deposit_cents >= 0),
  pass_verified boolean not null default false,
  agreement_signed boolean not null default false,
  created_at timestamptz not null default now(),
  check (end_date > start_date)
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators (id) on delete cascade,
  room_id uuid references public.rooms (id) on delete cascade,
  tag text not null check (tag in ('Marketing', 'Finance', 'Maintenance', 'Tenancy')),
  title text not null,
  detail text not null,
  state text not null,
  occurred_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators (id) on delete cascade,
  room_id uuid not null references public.rooms (id) on delete cascade,
  role text not null check (role in ('resident', 'agent', 'operator', 'system')),
  body text not null,
  takeover boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Billing (Stripe). Quantity on the subscription should equal active rooms.
-- ---------------------------------------------------------------------------

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators (id) on delete cascade,
  plan text not null check (plan in ('basic', 'premium')),
  billing text not null check (billing in ('annual', 'monthly')),
  price_per_room_cents integer not null check (price_per_room_cents >= 0),
  room_quantity integer not null check (room_quantity >= 0),
  stripe_subscription_id text,
  stripe_price_id text,
  status text not null default 'trialing'
    check (status in ('trialing', 'active', 'past_due', 'canceled', 'incomplete')),
  created_at timestamptz not null default now()
);

comment on column public.subscriptions.price_per_room_cents is
  'Premium is TBD. Do not hard-code 5000 (S$50) here; the app constant is the source of truth until a Stripe price exists.';

create table public.viewing_credits (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators (id) on delete cascade,
  delta integer not null,
  reason text not null,
  amount_cents integer,
  created_at timestamptz not null default now()
);

comment on table public.viewing_credits is
  'Ledger. A verified viewing is S$50 (5000 cents). Premium includes 5 credits per room per year.';

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.operators (id) on delete cascade,
  external_id text not null,
  issued_on date not null,
  amount_cents integer not null check (amount_cents >= 0),
  status text not null check (status in ('paid', 'open', 'void', 'uncollectible')),
  note text,
  stripe_invoice_id text,
  unique (operator_id, external_id)
);

create index units_operator_idx on public.units (operator_id);
create index rooms_operator_idx on public.rooms (operator_id);
create index rooms_unit_idx on public.rooms (unit_id);
create index tenancies_operator_idx on public.tenancies (operator_id);
create index tenancies_room_idx on public.tenancies (room_id);
create index activities_operator_idx on public.activities (operator_id);
create index messages_room_idx on public.messages (room_id, created_at);
create index subscriptions_operator_idx on public.subscriptions (operator_id);
create index invoices_operator_idx on public.invoices (operator_id);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

create or replace function public.current_operator_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select operator_id
  from public.profiles
  where id = auth.uid()
$$;

revoke all on function public.current_operator_id() from public;
grant execute on function public.current_operator_id() to authenticated;

alter table public.operators enable row level security;
alter table public.profiles enable row level security;
alter table public.units enable row level security;
alter table public.rooms enable row level security;
alter table public.tenancies enable row level security;
alter table public.activities enable row level security;
alter table public.messages enable row level security;
alter table public.subscriptions enable row level security;
alter table public.viewing_credits enable row level security;
alter table public.invoices enable row level security;

-- Operators can see their own company row, not edit billing ids.
create policy operators_select on public.operators
  for select to authenticated
  using (id = public.current_operator_id());

create policy profiles_select on public.profiles
  for select to authenticated
  using (operator_id = public.current_operator_id());

create policy profiles_update on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and operator_id = public.current_operator_id());

-- Generic tenant isolation. Inserts must stamp the caller's operator.
do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'units', 'rooms', 'tenancies', 'activities', 'messages',
    'subscriptions', 'viewing_credits', 'invoices'
  ]
  loop
    execute format(
      'create policy %I on public.%I for select to authenticated using (operator_id = public.current_operator_id())',
      tbl || '_select', tbl
    );
    execute format(
      'create policy %I on public.%I for insert to authenticated with check (operator_id = public.current_operator_id())',
      tbl || '_insert', tbl
    );
    execute format(
      'create policy %I on public.%I for update to authenticated using (operator_id = public.current_operator_id()) with check (operator_id = public.current_operator_id())',
      tbl || '_update', tbl
    );
    execute format(
      'create policy %I on public.%I for delete to authenticated using (operator_id = public.current_operator_id())',
      tbl || '_delete', tbl
    );
  end loop;
end $$;

-- Anon has no grants on operator data. The marketing site does not read it.
revoke all on
  public.operators,
  public.profiles,
  public.units,
  public.rooms,
  public.tenancies,
  public.activities,
  public.messages,
  public.subscriptions,
  public.viewing_credits,
  public.invoices
from anon;

grant select, insert, update, delete on
  public.operators,
  public.profiles,
  public.units,
  public.rooms,
  public.tenancies,
  public.activities,
  public.messages,
  public.subscriptions,
  public.viewing_credits,
  public.invoices
to authenticated;
