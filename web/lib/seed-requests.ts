// Example procurement activity that seeds a fresh BuildMart instance, so a
// supplier who just signed up (and listed a matching product) has a live
// auction to actually bid on immediately — without needing a second,
// real contractor account in the same browser to post one first. Same
// honesty rule as seed-suppliers.ts: this is a clearly-labeled example
// contractor, not a real business, and every quote on these requests is
// flagged isSimulated so it reads as "Example listing" in the UI, not a
// real competing supplier.

import type { ProcurementRequest, Project, Quote, UserAccount } from "./types";

export const SEED_CONTRACTOR: UserAccount = {
  id: "seed-con-1",
  role: "contractor",
  name: "Demo Contractor",
  company: "Example Builders Co.",
  email: "seedcon1@example.buildmart",
  phone: "+91 98200 00001",
  city: "Gurugram",
  createdAt: "2026-01-01T00:00:00.000Z",
};

export const SEED_PROJECT: Project = {
  id: "seed-proj-1",
  contractorId: "seed-con-1",
  name: "Example Project — Riverside Towers",
  location: "Gurugram, Haryana",
  valueInr: 8000000,
  status: "construction",
  createdAt: "2026-01-01T00:00:00.000Z",
};

const now = () => Date.now();
const daysFromNow = (n: number) => new Date(now() + n * 86400000).toISOString();
const hoursAgo = (n: number) => new Date(now() - n * 3600000).toISOString();

interface SeedRequestSpec {
  id: string;
  category: string;
  material: string;
  specification: string;
  quantity: number;
  unit: string;
  deliveryLocation: string;
  postedHoursAgo: number;
  closesInDays: number;
  quotes: { supplierId: string; unitPrice: number; freight: number; etaDays: number; stockNote: string }[];
}

const specs: SeedRequestSpec[] = [
  {
    id: "seed-req-cement",
    category: "Cement",
    material: "OPC Cement",
    specification: "43/53 Grade",
    quantity: 800,
    unit: "bag",
    deliveryLocation: "Gurugram",
    postedHoursAgo: 14,
    closesInDays: 12,
    quotes: [
      { supplierId: "seed-sup-1", unitPrice: 392, freight: 4200, etaDays: 4, stockNote: "In stock" },
      { supplierId: "seed-sup-9", unitPrice: 378, freight: 6800, etaDays: 6, stockNote: "In stock" },
      { supplierId: "seed-sup-8", unitPrice: 405, freight: 3100, etaDays: 3, stockNote: "In stock" },
    ],
  },
  {
    id: "seed-req-steel",
    category: "Steel",
    material: "TMT Steel",
    specification: "Fe 500 / Fe 500D",
    quantity: 20,
    unit: "tonne",
    deliveryLocation: "Hyderabad",
    postedHoursAgo: 30,
    closesInDays: 18,
    quotes: [
      { supplierId: "seed-sup-2", unitPrice: 61500, freight: 9000, etaDays: 5, stockNote: "In stock" },
      { supplierId: "seed-sup-10", unitPrice: 59800, freight: 15500, etaDays: 7, stockNote: "In stock" },
    ],
  },
  {
    id: "seed-req-tiles",
    category: "Tiles",
    material: "Vitrified Floor Tiles",
    specification: "600x600mm",
    quantity: 5000,
    unit: "sq.ft",
    deliveryLocation: "Surat",
    postedHoursAgo: 6,
    closesInDays: 9,
    quotes: [{ supplierId: "seed-sup-7", unitPrice: 62, freight: 5200, etaDays: 6, stockNote: "In stock" }],
  },
  {
    id: "seed-req-sand",
    category: "Sand & Aggregates",
    material: "River Sand",
    specification: "Washed, construction grade",
    quantity: 150,
    unit: "cu.m",
    deliveryLocation: "Bengaluru",
    postedHoursAgo: 20,
    closesInDays: 7,
    quotes: [{ supplierId: "seed-sup-4", unitPrice: 2100, freight: 7400, etaDays: 4, stockNote: "In stock" }],
  },
  {
    id: "seed-req-electrical",
    category: "Electrical",
    material: "Copper Wiring & Fittings",
    specification: "Site electrical lot",
    quantity: 1,
    unit: "lot",
    deliveryLocation: "Nagpur",
    postedHoursAgo: 40,
    closesInDays: 15,
    quotes: [{ supplierId: "seed-sup-6", unitPrice: 18500, freight: 2200, etaDays: 5, stockNote: "In stock" }],
  },
];

export const SEED_REQUESTS: ProcurementRequest[] = specs.map((s) => ({
  id: s.id,
  contractorId: SEED_CONTRACTOR.id,
  projectId: SEED_PROJECT.id,
  category: s.category,
  material: s.material,
  specification: s.specification,
  quantity: s.quantity,
  unit: s.unit,
  deliveryLocation: s.deliveryLocation,
  requiredBy: daysFromNow(s.closesInDays),
  paymentPreference: "Bank transfer",
  status: "open",
  createdAt: hoursAgo(s.postedHoursAgo),
}));

export const SEED_QUOTES: Quote[] = specs.flatMap((s) =>
  s.quotes.map((q, i) => ({
    id: `${s.id}-quote-${i + 1}`,
    requestId: s.id,
    supplierId: q.supplierId,
    unitPrice: q.unitPrice,
    freight: q.freight,
    etaDays: q.etaDays,
    paymentTerms: "Bank transfer",
    stockNote: q.stockNote,
    validUntil: daysFromNow(3),
    createdAt: hoursAgo(s.postedHoursAgo - 1),
    isSimulated: true,
  })),
);
