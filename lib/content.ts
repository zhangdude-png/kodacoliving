import { MIN_STAY_MONTHS, VIEWING_CREDIT_SGD } from "@/lib/pricing";

export type FaqItem = { question: string; answer: string };

export const operatorFaqs: FaqItem[] = [
  {
    question: "Who is the operator product for?",
    answer:
      "Coliving operators running about 5 to 100 rooms in Singapore. The console is built around units, rooms, tenancies, and a per-room subscription.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Basic is S$15 per room per month when billed annually, or S$20 per room billed monthly. Premium is shown at S$30 per room per month while the price is TBD (the choice is S$25, S$30, or S$35). Premium includes 5 viewing credits per room per year.",
  },
  {
    question: "What is a viewing credit?",
    answer: `One credit is one verified, pre-qualified tenant viewing. On Basic you pay S$${VIEWING_CREDIT_SGD} when that viewing is arranged. Further credits after the Premium allowance are S$${VIEWING_CREDIT_SGD} each.`,
  },
  {
    question: "Can we keep our own vendors?",
    answer:
      "Yes. The agent dispatches aircon, plumbing, and cleaning to the vendor list on the account. Premium adds a priority Singapore dispatch network and a named account director.",
  },
  {
    question: "What tenancy rules does Koda apply?",
    answer: `Every tenancy has a minimum stay of ${MIN_STAY_MONTHS} months. Tenant passes are verified before move-in.`,
  },
  {
    question: "Can an operator step into a chat?",
    answer:
      "Yes. Every resident thread has a takeover control. While it is on, the agent pauses and the operator sends the next messages.",
  },
];

export const landlordFaqs: FaqItem[] = [
  {
    question: "What does turnkey fit-out include?",
    answer:
      "Architectural conversion, contractor fitting, and styling. Projects start from S$15,000, depending on the unit. Furniture and appliances are quoted in the same plan.",
  },
  {
    question: "What happened at St Francis Court?",
    answer:
      "Unit #09-02 at 90 St Francis Rd was a whole-unit rental at S$5,200 a month (S$62,400 a year). After conversion it is a 7-room coliving home: S$9,830 gross, S$879 of running costs, S$8,951 net per month. Setup was S$34,513, payback about 9.2 months, and the published annual net uplift is S$45,009. It was fully let in under 4 weeks.",
  },
  {
    question: "How does leasing cost compare with an agent?",
    answer:
      "A traditional agent on that unit was S$2,600 a year (one month's rent per two-year lease). Koda's AI Property Agent is S$50 per verified viewing. At a 25% viewing-to-lease conversion across 7 rooms, leasing cost is S$1,400 a year — a save of S$1,200 a year, 46% cheaper.",
  },
  {
    question: "What is the minimum stay?",
    answer: `Each tenancy has a minimum stay of ${MIN_STAY_MONTHS} months. We verify tenant passes before move-in.`,
  },
  {
    question: "Do I still deal with tenants?",
    answer:
      "Day to day, no. The concierge handles WhatsApp tenant service, invoices, and vendor times. You can take over any conversation, and a landlord takeover control is always on the room.",
  },
  {
    question: "How do I start?",
    answer:
      "Book a free unit audit, or message the team on WhatsApp. Bring a floor plan and the current rent. The audit maps fit-out, room rents, and the handoff to operations.",
  },
];

export const comparisonRows = [
  {
    work: "Leasing",
    traditional: "About one month's rent to an agent, often once each lease.",
    koda: "S$50 per verified viewing. Premium includes 5 credits per room each year.",
  },
  {
    work: "Tenant messages",
    traditional: "Staff answering WhatsApp after hours.",
    koda: "24/7 concierge, with takeover when a person should reply.",
  },
  {
    work: "Rent",
    traditional: "Manual invoices and chasing.",
    koda: "Invoices plus PayNow and GIRO tracking on the room.",
  },
  {
    work: "Maintenance",
    traditional: "Phone tags and tickets that go missing.",
    koda: "Vendor dispatch with the timeline kept on the room.",
  },
  {
    work: "Reporting",
    traditional: "A spreadsheet someone has to update.",
    koda: "Occupancy, master lease, and sublease in one console.",
  },
  {
    work: "Software price",
    traditional: "A retainer, plus commissions on the side.",
    koda: "Per room, per month. The rate is on the pricing cards.",
  },
];
