import {
  PREMIUM_PRICE_PER_ROOM_SGD,
  VIEWING_CREDIT_SGD,
  VIEWING_TO_LEASE_CONVERSION,
  basicRate,
} from "@/lib/pricing";

export type Billing = "annual" | "monthly";
export type Plan = "basic" | "premium";

export type LandlordInput = {
  currentMonthly: number;
  rooms: number;
  colivingGross: number;
  runningCosts: number;
  setup: number;
};

export type LandlordResult = {
  netMonthly: number;
  traditionalAnnual: number;
  agentFee: number;
  netAnnual: number;
  uplift: number;
  paybackMonths: number | null;
  viewings: number;
  leasingCost: number;
  saveVsAgent: number;
  cheaperPct: number | null;
};

export function calculateLandlord(input: LandlordInput): LandlordResult {
  const rooms = Math.max(0, input.rooms);
  const netMonthly = input.colivingGross - input.runningCosts;
  const traditionalAnnual = input.currentMonthly * 12;
  const agentFee = input.currentMonthly / 2;
  const netAnnual = netMonthly * 12;
  const uplift = netAnnual - traditionalAnnual;
  const extraMonthly = netMonthly - input.currentMonthly;
  const paybackMonths =
    input.setup > 0 && extraMonthly > 0 ? input.setup / extraMonthly : null;
  const viewings =
    VIEWING_TO_LEASE_CONVERSION > 0 ? rooms / VIEWING_TO_LEASE_CONVERSION : 0;
  const leasingCost = viewings * VIEWING_CREDIT_SGD;
  const saveVsAgent = agentFee - leasingCost;
  const cheaperPct = agentFee > 0 ? (saveVsAgent / agentFee) * 100 : null;

  return {
    netMonthly,
    traditionalAnnual,
    agentFee,
    netAnnual,
    uplift,
    paybackMonths,
    viewings,
    leasingCost,
    saveVsAgent,
    cheaperPct,
  };
}

export type FleetInput = {
  rooms: number;
  occupancyPct: number;
  averageRent: number;
  masterLease: number;
  plan: Plan;
  billing: Billing;
};

export type FleetResult = {
  occupiedRooms: number;
  gross: number;
  feePerRoom: number;
  kodaFee: number;
  retained: number;
  retainedAnnual: number;
};

export function calculateFleet(input: FleetInput): FleetResult {
  const rooms = Math.max(0, input.rooms);
  const occupancy = Math.min(100, Math.max(0, input.occupancyPct)) / 100;
  const occupiedRooms = rooms * occupancy;
  const gross = occupiedRooms * input.averageRent;
  const feePerRoom =
    input.plan === "premium"
      ? PREMIUM_PRICE_PER_ROOM_SGD
      : basicRate(input.billing);
  const kodaFee = rooms * feePerRoom;
  const retained = gross - input.masterLease - kodaFee;
  return {
    occupiedRooms,
    gross,
    feePerRoom,
    kodaFee,
    retained,
    retainedAnnual: retained * 12,
  };
}
