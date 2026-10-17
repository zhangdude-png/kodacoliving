export type RoomStatus = "occupied" | "vacant" | "reserved";
export type PhotoKey = "mbr" | "cr" | "dining";

export type Activity = {
  id: string;
  title: string;
  detail: string;
  at: string;
  tag: "Marketing" | "Finance" | "Maintenance" | "Tenancy";
  state: string;
};

export type ChatMessage = {
  id: string;
  role: "resident" | "agent" | "operator" | "system";
  body: string;
  time: string;
};

export type Unit = {
  slug: string;
  name: string;
  code: string;
  address: string;
  neighbourhood: string;
  masterRent: number;
  photo: PhotoKey;
  leaseStart: string;
  leaseEnd: string;
  leaseProgress: number;
  leaseNote: string;
};

export type Room = {
  id: string;
  unitSlug: string;
  code: string;
  name: string;
  rent: number;
  status: RoomStatus;
  photo: PhotoKey;
  amenities: string[];
  deposit?: number;
  leaseStart?: string;
  leaseEnd?: string;
  leaseNote?: string;
  furnishing: string;
  passVerified?: boolean;
};

export const DEMO_AS_OF = "30 June 2024";
export const DEMO_OPERATOR = "Demo Operator Pte. Ltd.";
export const DEMO_CONTACT_ROLE = "Portfolio manager";
export const DEMO_EMAIL = "ops@koda.demo";

export const photos: Record<PhotoKey, { src: string; alt: string }> = {
  mbr: {
    src: "/images/st-francis-mbr1.jpg",
    alt: "Furnished master bedroom with a king bed and work desk",
  },
  cr: {
    src: "/images/st-francis-cr2.jpg",
    alt: "Furnished common bedroom with a queen bed and wardrobe",
  },
  dining: {
    src: "/images/st-francis-dining.jpg",
    alt: "Shared living and dining room with a table and plants",
  },
};

export const units: Unit[] = [
  {
    slug: "st-francis-court",
    name: "St Francis Court",
    code: "SFC-0902",
    address: "90 St Francis Road, #09-02, Singapore 328071",
    neighbourhood: "Boon Keng",
    masterRent: 6800,
    photo: "mbr",
    leaseStart: "1 Aug 2023",
    leaseEnd: "31 Jul 2025",
    leaseProgress: 46,
    leaseNote: "Demo snapshot as of 30 Jun 2024 · about 13 months remaining",
  },
  {
    slug: "versailles-marine-parade",
    name: "Versailles Marine Parade",
    code: "VMP-0401",
    address: "124 Tanjong Katong Road, #04-01, Singapore 436968",
    neighbourhood: "East Coast",
    masterRent: 8200,
    photo: "dining",
    leaseStart: "1 Jan 2024",
    leaseEnd: "31 Dec 2025",
    leaseProgress: 25,
    leaseNote: "Demo snapshot as of 30 Jun 2024 · about 18 months remaining",
  },
  {
    slug: "opal-crescent",
    name: "24A–26A Opal Crescent",
    code: "OCR-24A",
    address: "24A–26A Opal Crescent, Potong Pasir, Singapore 348144",
    neighbourhood: "Potong Pasir",
    masterRent: 5500,
    photo: "dining",
    leaseStart: "1 Jul 2023",
    leaseEnd: "30 Jun 2025",
    leaseProgress: 50,
    leaseNote: "Demo snapshot as of 30 Jun 2024 · 365 days remaining on the master lease",
  },
  {
    slug: "ruby-court",
    name: "Ruby Court",
    code: "RBC-0102",
    address: "12 Ruby Lane, #01-02, Singapore 328238",
    neighbourhood: "Central",
    masterRent: 4900,
    photo: "cr",
    leaseStart: "1 Mar 2024",
    leaseEnd: "28 Feb 2026",
    leaseProgress: 20,
    leaseNote: "Demo snapshot as of 30 Jun 2024 · about 20 months remaining",
  },
];

export const rooms: Room[] = [
  room("sfc-mbr1", "st-francis-court", "MBR1", "Master room, ensuite", 2150, "occupied", "mbr", ["Ensuite", "King bed", "Workstation"], "Fully furnished · ensuite, king bed, workstation"),
  room("sfc-cr1", "st-francis-court", "CR1", "Common queen bedroom", 1650, "occupied", "cr", ["Queen bed", "High floor", "Boon Keng"], "Fully furnished · queen bed, work desk, wardrobe", { deposit: 3300, leaseStart: "12 Jan 2024", leaseEnd: "11 Jan 2025", leaseNote: "Active in the June 2024 demo snapshot", passVerified: true }),
  room("sfc-cr2", "st-francis-court", "CR2", "Common room", 1750, "occupied", "cr", ["Queen bed", "Wardrobe", "Wi-Fi"], "Fully furnished · queen bed and wardrobe"),
  room("sfc-cr3", "st-francis-court", "CR3", "Common room", 1600, "occupied", "cr", ["Queen bed", "Workstation"], "Fully furnished · queen bed and desk"),
  room("sfc-cr4", "st-francis-court", "CR4", "Common room", 1550, "occupied", "cr", ["Queen bed", "Wardrobe"], "Fully furnished · queen bed and wardrobe"),
  room("sfc-cr5", "st-francis-court", "CR5", "Common room", 1550, "occupied", "cr", ["Single bed", "Workstation"], "Fully furnished · bed and desk"),
  room("sfc-cr6", "st-francis-court", "CR6", "Common room", 1480, "vacant", "cr", ["Queen bed", "Ready to list"], "Fully furnished · ready to list"),
  room("vmp-mr", "versailles-marine-parade", "MR", "Master room", 2250, "occupied", "mbr", ["East Coast", "Pool access"], "Fully furnished · master with private bath"),
  room("vmp-02", "versailles-marine-parade", "R2", "Common room", 1850, "occupied", "cr", ["Queen bed", "Wardrobe"], "Fully furnished"),
  room("vmp-03", "versailles-marine-parade", "R3", "Common room", 1750, "occupied", "cr", ["Queen bed"], "Fully furnished"),
  room("vmp-04", "versailles-marine-parade", "R4", "Common room", 1700, "occupied", "dining", ["Queen bed", "Bright"], "Fully furnished"),
  room("vmp-05", "versailles-marine-parade", "R5", "Common room", 1650, "occupied", "cr", ["Queen bed"], "Fully furnished"),
  room("vmp-06", "versailles-marine-parade", "R6", "Common room", 1600, "occupied", "cr", ["Single bed", "Workstation"], "Fully furnished"),
  room("vmp-07", "versailles-marine-parade", "R7", "Common room", 1600, "occupied", "mbr", ["Queen bed"], "Fully furnished"),
  room("ocr-a01", "opal-crescent", "A-01", "Master suite with balcony", 1650, "occupied", "mbr", ["Balcony", "Workstation", "Profile"], "Master suite · balcony and workstation"),
  room("ocr-a02", "opal-crescent", "A-02", "Deluxe queen studio", 1200, "reserved", "cr", ["Kitchenette", "Queen bed"], "Deluxe queen studio · contract pending"),
  room("ocr-b01", "opal-crescent", "B-01", "Premium common bedroom", 1100, "occupied", "cr", ["Workstation", "Potong Pasir"], "Premium common bedroom"),
  room("ocr-b02", "opal-crescent", "B-02", "Common room", 1900, "occupied", "dining", ["Queen bed"], "Fully furnished"),
  room("ocr-c01", "opal-crescent", "C-01", "Common room", 1850, "occupied", "cr", ["Queen bed", "Wardrobe"], "Fully furnished"),
  room("ocr-c02", "opal-crescent", "C-02", "Common room", 1850, "occupied", "mbr", ["Queen bed"], "Fully furnished"),
  room("rbc-01", "ruby-court", "RB-01", "Studio A", 2000, "occupied", "mbr", ["Studio", "Private bath"], "Studio · private bath"),
  room("rbc-02", "ruby-court", "RB-02", "Studio B", 1900, "occupied", "cr", ["Studio", "Balcony"], "Studio · balcony"),
  room("rbc-03", "ruby-court", "RB-03", "Room 03", 1800, "occupied", "dining", ["Queen bed"], "Fully furnished"),
  room("rbc-04", "ruby-court", "RB-04", "Room 04", 1700, "occupied", "cr", ["Queen bed", "Workstation"], "Fully furnished"),
];

function room(
  id: string,
  unitSlug: string,
  code: string,
  name: string,
  rent: number,
  status: RoomStatus,
  photo: PhotoKey,
  amenities: string[],
  furnishing: string,
  extra?: Partial<Room>,
): Room {
  return {
    id,
    unitSlug,
    code,
    name,
    rent,
    status,
    photo,
    amenities,
    furnishing,
    passVerified: status === "occupied",
    ...extra,
  };
}

export const revenueSeries = [
  { month: "Jan", revenue: 28600 },
  { month: "Feb", revenue: 30200 },
  { month: "Mar", revenue: 31800 },
  { month: "Apr", revenue: 32900 },
  { month: "May", revenue: 34160 },
  { month: "Jun", revenue: 38400 },
];

export const invoices = [
  {
    date: "15 Jun 2024",
    id: "INV-2024-006",
    amount: 360,
    status: "Paid" as const,
    note: "Basic plan · 24 rooms × S$15",
  },
  {
    date: "2 Jun 2024",
    id: "INV-2024-005-CR",
    amount: 800,
    status: "Paid" as const,
    note: "16 verified viewings × S$50",
  },
  {
    date: "15 May 2024",
    id: "INV-2024-004",
    amount: 360,
    status: "Paid" as const,
    note: "Basic plan · 24 rooms × S$15",
  },
];

const cr1Timeline: Activity[] = [
  {
    id: "cr1-list",
    title: "Syndicated and listed",
    detail: "Ref PG-CR1-0902 · portal listing drafted by the property agent.",
    at: "12 Sep 2024",
    tag: "Marketing",
    state: "Active",
  },
  {
    id: "cr1-inv",
    title: "September rental invoice",
    detail: "INV-2024-09-CR1 · S$1,650 · settled via PayNow.",
    at: "1 Sep 2024",
    tag: "Finance",
    state: "Paid",
  },
  {
    id: "cr1-bump",
    title: "Listing refreshed",
    detail: "Bump refreshed on the secondary board · 9 chats in the demo log.",
    at: "28 Aug 2024",
    tag: "Marketing",
    state: "Active",
  },
  {
    id: "cr1-ac",
    title: "Aircon ticket #AC-002",
    detail: "Drainage inspection brought forward to the next day, 2:00–3:00 PM.",
    at: "Today, 08:54",
    tag: "Maintenance",
    state: "Dispatched",
  },
];

const cr1Chat: ChatMessage[] = [
  {
    id: "m1",
    role: "resident",
    body: "Hi Koda, the aircon in CR1 started dripping this morning. Could we get this checked?",
    time: "08:54",
  },
  {
    id: "m2",
    role: "agent",
    body: "I've logged ticket #AC-002. Quarterly servicing is already on Thursday, and I've brought a drainage inspection forward to tomorrow, 2:00–3:00 PM.",
    time: "08:54",
  },
  {
    id: "m3",
    role: "system",
    body: "Work order dispatched to the vendor · Auto-confirmed. Resident confirmed the window. A calendar note was sent to the operator and the technician.",
    time: "08:54",
  },
];

export function getUnit(slug: string) {
  return units.find((unit) => unit.slug === slug);
}

export function getRoom(id: string) {
  return rooms.find((room) => room.id === id);
}

export function roomsForUnit(slug: string) {
  return rooms.filter((room) => room.unitSlug === slug);
}

export function unitStats(unit: Unit) {
  const list = roomsForUnit(unit.slug);
  const occupied = list.filter((room) => room.status === "occupied");
  const sublease = occupied.reduce((sum, room) => sum + room.rent, 0);
  return {
    rooms: list.length,
    occupied: occupied.length,
    vacant: list.filter((room) => room.status === "vacant").length,
    reserved: list.filter((room) => room.status === "reserved").length,
    sublease,
    net: sublease - unit.masterRent,
    occupancy: list.length ? occupied.length / list.length : 0,
  };
}

export function portfolioStats() {
  const perUnit = units.map((unit) => ({ unit, ...unitStats(unit) }));
  const roomCount = perUnit.reduce((sum, row) => sum + row.rooms, 0);
  const occupied = perUnit.reduce((sum, row) => sum + row.occupied, 0);
  const reserved = perUnit.reduce((sum, row) => sum + row.reserved, 0);
  const vacant = perUnit.reduce((sum, row) => sum + row.vacant, 0);
  const sublease = perUnit.reduce((sum, row) => sum + row.sublease, 0);
  const master = perUnit.reduce((sum, row) => sum + row.unit.masterRent, 0);
  return {
    perUnit,
    units: units.length,
    roomCount,
    occupied,
    reserved,
    vacant,
    sublease,
    master,
    net: sublease - master,
    occupancy: roomCount ? occupied / roomCount : 0,
  };
}

export function timelineFor(roomId: string, room: Room): Activity[] {
  if (roomId === "sfc-cr1") return cr1Timeline;
  if (room.status === "vacant") {
    return [
      {
        id: `${room.id}-ready`,
        title: "Ready to list",
        detail: "Room is vacant in the demo snapshot. No tenancy is on file.",
        at: "Jun 2024",
        tag: "Marketing",
        state: "Open",
      },
    ];
  }
  if (room.status === "reserved") {
    return [
      {
        id: `${room.id}-hold`,
        title: "Contract pending",
        detail: "A viewing follow-up is on hold. No resident record is shown in this demo.",
        at: "Jun 2024",
        tag: "Tenancy",
        state: "Reserved",
      },
    ];
  }
  return [
    {
      id: `${room.id}-inv`,
      title: "June invoice settled",
      detail: `Demo ledger · ${room.code} marked paid via PayNow GIRO.`,
      at: "1 Jun 2024",
      tag: "Finance",
      state: "Paid",
    },
    {
      id: `${room.id}-pass`,
      title: "Work pass on file",
      detail: "Pass checked before move-in. The document number is not shown.",
      at: "Move-in",
      tag: "Tenancy",
      state: "Verified",
    },
  ];
}

export function chatFor(room: Room): ChatMessage[] {
  if (room.id === "sfc-cr1") return cr1Chat;
  if (room.status === "vacant") {
    return [
      {
        id: `${room.id}-q`,
        role: "resident",
        body: `Portal enquiry on ${room.code}: is this room available for a tenancy of at least 3 months?`,
        time: "09:10",
      },
      {
        id: `${room.id}-a`,
        role: "agent",
        body: "Yes. I can offer a verified viewing. On Basic that is one S$50 viewing credit when the viewing is arranged. Minimum stay is 3 months.",
        time: "09:10",
      },
    ];
  }
  if (room.status === "reserved") {
    return [
      {
        id: `${room.id}-s`,
        role: "system",
        body: "Contract pending. The agent is holding the follow-up. No resident name is stored in this demo.",
        time: "Jun 2024",
      },
    ];
  }
  return [
    {
      id: `${room.id}-hi`,
      role: "resident",
      body: `Checking in on ${room.code}. Is the common-area cleaning still on Friday morning?`,
      time: "11:02",
    },
    {
      id: `${room.id}-ok`,
      role: "agent",
      body: "Yes. Weekly common-area cleaning stays on Friday at 10:00 AM. I've left the calendar note on the room.",
      time: "11:02",
    },
  ];
}

export const recentActivity = [
  {
    title: "Tenancy pack filed",
    detail: "Unit B-01 · agreement marked signed in the demo ledger",
    time: "2 hours ago",
  },
  {
    title: "Aircon service completed",
    detail: "Unit A-03 · quarterly visit closed",
    time: "Yesterday",
  },
  {
    title: "Floor plan updated",
    detail: "Property-wide · file replaced in the demo document list",
    time: "5 days ago",
  },
];
