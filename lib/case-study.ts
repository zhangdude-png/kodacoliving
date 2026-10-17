/**
 * Published St Francis Court figures. These override any number in the
 * Stitch screenshots. Do not round or "improve" them.
 */
export const stFrancis = {
  name: "St Francis Court (#09-02, 90 St Francis Rd)",
  subtitle:
    "How Koda Coliving converted a whole-unit rental into a 7-room coliving home, fully let in under 4 weeks.",
  rooms: [
    {
      key: "mbr",
      image: "/images/st-francis-mbr1.jpg",
      imageAlt:
        "Master bedroom at St Francis Court with a king bed, ensuite doorway, and a work desk",
      title: "Master Room (MBR1)",
      price: "S$1,950 / mo",
      body: "Private ensuite bathroom, king-bed layout, acoustic drywall, workstation.",
    },
    {
      key: "cr",
      image: "/images/st-francis-cr2.jpg",
      imageAlt:
        "Common room at St Francis Court with a queen bed, wardrobe, and a window desk",
      title: "Common Rooms (CR2–CR6)",
      price: "S$1,200–S$1,480 / mo",
      body: "Designer wardrobe, queen bed, high-speed Wi-Fi, keyless digital entry.",
    },
    {
      key: "dining",
      image: "/images/st-francis-dining.jpg",
      imageAlt:
        "Shared living and dining room at St Francis Court with a dining table and plants",
      title: "Common Living & Dining",
      price: "Shared amenity",
      body: "High-end Nordic furnishings, curated dining set. Integrated washer/dryer.",
    },
  ],
  before: {
    kicker: "Before Koda conversion",
    title: "Traditional Whole-Unit Rental",
    badge: "Conventional whole unit",
    summary: "Entire unit let to a single tenant",
    monthlyGross: 5200,
    annualGross: 62400,
    leasingLabel: "Leasing · Traditional agent",
    agentFee: 2600,
    agentFeeNote: "1 month's rent per 2-year lease",
  },
  after: {
    kicker: "After Koda turnkey conversion",
    title: "Koda Turnkey Coliving (7 Rooms)",
    badge: "+72% Net Uplift",
    summary: "Reconfigured into 1 master room and 6 common rooms",
    monthlyGross: 9830,
    /** Published figure: 9,830 × 12. */
    annualGross: 117_960,
    runningCosts: 879,
    runningNote: "electricity, cleaning, aircon servicing",
    netMonthly: 8951,
    setup: 34513,
    setupNote: "renovation, fit-out, furniture and appliances",
    paybackMonths: 9.2,
    annualNetUplift: 45009,
    leasingLabel: "Leasing · Koda AI Property Agent",
    leasingCost: 1400,
    leasingNote:
      "S$50 per viewing, 25% viewing-to-lease conversion, 7 rooms",
    savePerYear: 1200,
    cheaperPct: 46,
  },
} as const;

export const landlordPreset = {
  currentMonthly: stFrancis.before.monthlyGross,
  rooms: 7,
  colivingGross: stFrancis.after.monthlyGross,
  runningCosts: stFrancis.after.runningCosts,
  setup: stFrancis.after.setup,
};
