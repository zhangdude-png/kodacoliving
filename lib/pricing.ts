/**
 * Commercial constants for Koda Coliving.AI.
 *
 * Premium is a single source of truth. The owner is still choosing
 * S$25, S$30, or S$35 per room per month. Change only this number.
 * Every Premium price on the site and in the operator console reads it.
 */
export const PREMIUM_PRICE_PER_ROOM_SGD = 30;
export const PREMIUM_PRICE_IS_TBD = true;
export const PREMIUM_PRICE_CANDIDATES_SGD = [25, 30, 35] as const;

/** Basic, billed annually (25% below the month-to-month rate). */
export const BASIC_ANNUAL_PER_ROOM_SGD = 15;
/** Basic, billed month to month. */
export const BASIC_MONTHLY_PER_ROOM_SGD = 20;

/** Pay-per-result viewing. Never surface a S$100 viewing credit. */
export const VIEWING_CREDIT_SGD = 50;
export const PREMIUM_VIEWING_CREDITS_PER_ROOM_PER_YEAR = 5;

/** Landlord turnkey fit-out starting point. */
export const FIT_OUT_FROM_SGD = 15_000;

export const VIEWING_TO_LEASE_CONVERSION = 0.25;
export const MIN_STAY_MONTHS = 3;

export function premiumAnnualPerRoom() {
  return PREMIUM_PRICE_PER_ROOM_SGD * 12;
}

export function basicRate(billing: "annual" | "monthly") {
  return billing === "annual"
    ? BASIC_ANNUAL_PER_ROOM_SGD
    : BASIC_MONTHLY_PER_ROOM_SGD;
}
