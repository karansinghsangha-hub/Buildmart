// Shared types for BuildMart's client-side data layer (lib/store.ts).
// See store.ts for why this is localStorage-backed rather than a real API.

export type Role = "contractor" | "supplier";

export interface UserAccount {
  id: string;
  role: Role;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  createdAt: string;
}

export interface SupplierProfile {
  userId: string;
  categories: string[]; // material categories this supplier deals in
  deliveryRadiusKm: number;
  verification: "unverified" | "basic" | "business" | "buildmart";
  minOrderNote?: string;
  paymentTerms: string[];
  description?: string; // short business bio shown on the marketplace
}

export interface Product {
  id: string;
  supplierId: string; // UserAccount.id
  category: string;
  name: string;
  unit: string; // "bag" | "tonne" | "piece" | "cu.m" etc.
  pricePerUnit: number;
  stockQty: number | null; // null = "availability needs confirmation"
  description?: string;
  featured?: boolean; // supplier can pin this to the top of their catalogue / marketplace results
}

export interface Project {
  id: string;
  contractorId: string;
  name: string;
  location: string;
  valueInr: number;
  status: "planning" | "construction" | "finishing" | "completed";
  createdAt: string;
}

export interface ProcurementRequest {
  id: string;
  contractorId: string;
  projectId: string;
  category: string;
  material: string;
  specification: string;
  quantity: number;
  unit: string;
  deliveryLocation: string;
  requiredBy: string; // ISO date
  paymentPreference: string;
  notes?: string;
  status: "open" | "awarded" | "cancelled";
  createdAt: string;
}

export interface Quote {
  id: string;
  requestId: string;
  supplierId: string;
  unitPrice: number;
  freight: number;
  etaDays: number;
  paymentTerms: string;
  stockNote: string;
  validUntil: string; // ISO date
  createdAt: string;
  updatedAt?: string; // set when a supplier revises a live bid
  isSimulated: boolean; // true = auto-generated demo quote, not a real supplier
}

export type OrderStatusStep =
  | "quote_accepted"
  | "po_generated"
  | "supplier_confirmed"
  | "prepared"
  | "dispatched"
  | "in_transit"
  | "delivered"
  | "completed";

export const ORDER_STEPS: { key: OrderStatusStep; label: string }[] = [
  { key: "quote_accepted", label: "Quote accepted" },
  { key: "po_generated", label: "PO generated" },
  { key: "supplier_confirmed", label: "Supplier confirmed" },
  { key: "prepared", label: "Material prepared" },
  { key: "dispatched", label: "Dispatched" },
  { key: "in_transit", label: "In transit" },
  { key: "delivered", label: "Delivered" },
  { key: "completed", label: "Completed" },
];

export interface Order {
  id: string;
  poNumber: string;
  requestId: string;
  contractorId: string;
  supplierId: string;
  quoteId: string;
  material: string;
  specification: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  freight: number;
  totalInr: number;
  status: OrderStatusStep;
  projectId: string;
  deliveryLocation: string;
  createdAt: string;
}

export interface SavedSupplier {
  contractorId: string;
  supplierId: string;
  savedAt: string;
}

export interface StoreData {
  users: UserAccount[];
  supplierProfiles: SupplierProfile[];
  products: Product[];
  projects: Project[];
  requests: ProcurementRequest[];
  quotes: Quote[];
  orders: Order[];
  savedSuppliers: SavedSupplier[];
  currentUserId: string | null;
}
