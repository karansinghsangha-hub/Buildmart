// Example supplier directory that seeds a fresh BuildMart instance (see
// store.ts for why this is client-only). These are clearly-labeled example
// listings, not real businesses — the marketplace and "For Suppliers"
// pages both say so. They exist so the marketplace/search/reverse-bidding
// UI has something real to browse and compare before real suppliers sign up.

import type { Product, UserAccount } from "./types";

const cities = ["Gurugram", "Hyderabad", "Pune", "Bengaluru", "Chennai", "Nagpur", "Surat"];

export const SEED_SUPPLIERS: UserAccount[] = [
  { id: "seed-sup-1", role: "supplier", name: "Ramesh Aggarwal", company: "Shakti Cement & Building Materials", email: "seed1@example.buildmart", phone: "+91 98100 00001", city: "Gurugram", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seed-sup-2", role: "supplier", name: "Priya Menon", company: "Southern Steel Traders", email: "seed2@example.buildmart", phone: "+91 98100 00002", city: "Hyderabad", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seed-sup-3", role: "supplier", name: "Arvind Kulkarni", company: "Deccan Bricks & Blocks", email: "seed3@example.buildmart", phone: "+91 98100 00003", city: "Pune", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seed-sup-4", role: "supplier", name: "Lakshmi Narayan", company: "Bengaluru Sand & Aggregates Co.", email: "seed4@example.buildmart", phone: "+91 98100 00004", city: "Bengaluru", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seed-sup-5", role: "supplier", name: "Suresh Pillai", company: "Chennai RMC Suppliers", email: "seed5@example.buildmart", phone: "+91 98100 00005", city: "Chennai", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seed-sup-6", role: "supplier", name: "Anita Deshmukh", company: "Nagpur Electricals & Hardware", email: "seed6@example.buildmart", phone: "+91 98100 00006", city: "Nagpur", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seed-sup-7", role: "supplier", name: "Karan Shah", company: "Surat Tiles & Sanitaryware", email: "seed7@example.buildmart", phone: "+91 98100 00007", city: "Surat", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seed-sup-8", role: "supplier", name: "Deepak Verma", company: "Gurugram Paints & Chemicals", email: "seed8@example.buildmart", phone: "+91 98100 00008", city: "Gurugram", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seed-sup-9", role: "supplier", name: "Meera Iyer", company: "Hyderabad Cement Depot", email: "seed9@example.buildmart", phone: "+91 98100 00009", city: "Hyderabad", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seed-sup-10", role: "supplier", name: "Vikas Rathore", company: "Pune Steel & TMT", email: "seed10@example.buildmart", phone: "+91 98100 00010", city: "Pune", createdAt: "2026-01-01T00:00:00.000Z" },
];

const catalogue: { supplierId: string; category: string; name: string; unit: string; price: number; stock: number | null }[] = [
  { supplierId: "seed-sup-1", category: "Cement", name: "OPC 43 Grade Cement", unit: "bag", price: 392, stock: 3200 },
  { supplierId: "seed-sup-9", category: "Cement", name: "PPC Cement", unit: "bag", price: 378, stock: 5400 },
  { supplierId: "seed-sup-8", category: "Cement", name: "OPC 53 Grade Cement", unit: "bag", price: 405, stock: 1800 },
  { supplierId: "seed-sup-2", category: "Steel", name: "TMT Steel Fe 500D", unit: "tonne", price: 61500, stock: 40 },
  { supplierId: "seed-sup-10", category: "Steel", name: "TMT Steel Fe 500", unit: "tonne", price: 59800, stock: 65 },
  { supplierId: "seed-sup-3", category: "Bricks & Blocks", name: "AAC Blocks 600x200x100", unit: "1000 units", price: 42000, stock: 12 },
  { supplierId: "seed-sup-3", category: "Bricks & Blocks", name: "Red Clay Bricks", unit: "1000 units", price: 6800, stock: 40 },
  { supplierId: "seed-sup-4", category: "Sand & Aggregates", name: "River Sand", unit: "cu.m", price: 2100, stock: 200 },
  { supplierId: "seed-sup-4", category: "Sand & Aggregates", name: "20mm Aggregate", unit: "cu.m", price: 1650, stock: 180 },
  { supplierId: "seed-sup-5", category: "Ready-Mix Concrete", name: "M25 RMC", unit: "cu.m", price: 5800, stock: null },
  { supplierId: "seed-sup-6", category: "Electrical", name: "Copper Wiring & Fittings Lot", unit: "lot", price: 18500, stock: null },
  { supplierId: "seed-sup-6", category: "Hardware", name: "General Hardware Lot", unit: "lot", price: 9200, stock: null },
  { supplierId: "seed-sup-7", category: "Tiles", name: "Vitrified Floor Tiles 600x600", unit: "sq.ft", price: 62, stock: 15000 },
  { supplierId: "seed-sup-7", category: "Plumbing", name: "CPVC Plumbing Lot", unit: "lot", price: 14500, stock: null },
  { supplierId: "seed-sup-8", category: "Paints", name: "Exterior Emulsion Paint", unit: "litre", price: 285, stock: 900 },
  { supplierId: "seed-sup-8", category: "Construction Chemicals", name: "Waterproofing Compound", unit: "kg", price: 145, stock: 600 },
];

export const SEED_PRODUCTS: Product[] = catalogue.map((c, i) => ({
  id: `seed-prod-${i + 1}`,
  supplierId: c.supplierId,
  category: c.category,
  name: c.name,
  unit: c.unit,
  pricePerUnit: c.price,
  stockQty: c.stock,
}));

export { cities as SEED_CITIES };
