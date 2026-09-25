export const CATEGORIES = [
  "Cement",
  "Steel",
  "Bricks & Blocks",
  "Sand & Aggregates",
  "Ready-Mix Concrete",
  "Electrical",
  "Plumbing",
  "Tiles",
  "Paints",
  "Construction Chemicals",
  "Hardware",
  "Windows & Doors",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_UNITS: Record<string, string> = {
  Cement: "bag",
  Steel: "tonne",
  "Bricks & Blocks": "1000 units",
  "Sand & Aggregates": "cu.m",
  "Ready-Mix Concrete": "cu.m",
  Electrical: "lot",
  Plumbing: "lot",
  Tiles: "sq.ft",
  Paints: "litre",
  "Construction Chemicals": "kg",
  Hardware: "lot",
  "Windows & Doors": "unit",
};
