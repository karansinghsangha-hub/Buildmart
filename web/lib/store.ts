"use client";

/**
 * BuildMart's data layer.
 *
 * This is a static, exported site with no server and no database — GitHub
 * Pages serves plain files. There is nowhere for a real signup, a real
 * cross-user marketplace, or a real order to live. So "functional" here
 * means: every flow (signup, post a request, receive quotes, accept one,
 * get a PO, watch it move through delivery statuses) genuinely runs and
 * persists — in *your own browser's* localStorage. It is not shared
 * between people, not secured, and not a backend. Two different browsers
 * (or the same browser in a private window) each get their own empty
 * BuildMart. That's an honest description of what a client-only build can
 * be, not a limitation hidden from the person using it.
 *
 * Supplier "quotes" on a freshly posted request are simulated from the
 * seeded example-supplier directory below (clearly marked isSimulated) so
 * the reverse-bidding loop has something to compare and accept without a
 * second person acting as a supplier. A real supplier account can also
 * submit a real quote on any open request alongside those.
 */

import { useSyncExternalStore } from "react";
import {
  ORDER_STEPS as ORDER_STEPS_LIST,
  type Order,
  type OrderStatusStep,
  type ProcurementRequest,
  type Product,
  type Project,
  type Quote,
  type Role,
  type StoreData,
  type SupplierProfile,
  type UserAccount,
} from "./types";
import { CATEGORIES } from "./categories";
import { SEED_SUPPLIERS, SEED_PRODUCTS } from "./seed-suppliers";

const STORAGE_KEY = "buildmart:v1";

function emptyData(): StoreData {
  return {
    users: [...SEED_SUPPLIERS],
    supplierProfiles: SEED_SUPPLIERS.map((u) => ({
      userId: u.id,
      categories: SEED_PRODUCTS.filter((p) => p.supplierId === u.id).map((p) => p.category),
      deliveryRadiusKm: 25 + Math.round(Math.random() * 50),
      verification: "business" as const,
      paymentTerms: ["Bank transfer", "Cheque"],
    })),
    products: [...SEED_PRODUCTS],
    projects: [],
    requests: [],
    quotes: [],
    orders: [],
    currentUserId: null,
  };
}

let cache: StoreData | null = null;
const listeners = new Set<() => void>();

function load(): StoreData {
  if (cache) return cache;
  if (typeof window === "undefined") return emptyData();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as StoreData) : emptyData();
  } catch {
    cache = emptyData();
  }
  return cache;
}

function persist() {
  if (!cache || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Storage full or blocked (private mode) — state still works for this
    // page view via the in-memory cache, it just won't survive a reload.
  }
  listeners.forEach((l) => l());
}

function mutate(fn: (d: StoreData) => void) {
  const d = load();
  fn(d);
  // Reassign to a new top-level reference so useSyncExternalStore's
  // Object.is comparison actually notices the change. Mutating `d` in
  // place and returning the same `cache` reference from getSnapshot()
  // would make every update invisible to components that aren't also
  // re-rendering for an unrelated reason (e.g. simulated quotes arriving
  // on a setTimeout with nobody else calling setState at the same time).
  cache = { ...d };
  persist();
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getSnapshot(): StoreData {
  return load();
}

export function getServerSnapshot(): StoreData {
  return emptyData();
}

/** Subscribes a component to the whole store. Re-renders on any mutation. */
export function useStore(): StoreData {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribeNever() {
  return () => {};
}

/**
 * True only once the client has hydrated past the statically-exported
 * markup. Built on useSyncExternalStore (server snapshot false, client
 * snapshot true) rather than a `useEffect` + `setState`, so it resolves
 * through the exact same render-correction pass React already runs for
 * useStore() above — a manual effect can commit one render behind and
 * read a stale value.
 */
export function useHasHydrated(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

function id(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// ---------------------------------------------------------------- auth
export function signUp(input: {
  role: Role;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
}): { ok: true; user: UserAccount } | { ok: false; error: string } {
  const d = load();
  if (d.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    return { ok: false, error: "An account with this email already exists. Try signing in instead." };
  }
  const user: UserAccount = {
    id: id("user"),
    role: input.role,
    name: input.name,
    company: input.company,
    email: input.email,
    phone: input.phone,
    city: input.city,
    createdAt: new Date().toISOString(),
  };
  mutate((d) => {
    d.users.push(user);
    if (input.role === "supplier") {
      const profile: SupplierProfile = {
        userId: user.id,
        categories: [],
        deliveryRadiusKm: 25,
        verification: "unverified",
        paymentTerms: ["Bank transfer"],
      };
      d.supplierProfiles.push(profile);
    }
    d.currentUserId = user.id;
  });
  return { ok: true, user };
}

export function signIn(email: string): { ok: true; user: UserAccount } | { ok: false; error: string } {
  const d = load();
  const user = d.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { ok: false, error: "No BuildMart account found with that email. Create one instead?" };
  mutate((d) => {
    d.currentUserId = user.id;
  });
  return { ok: true, user };
}

export function signOut() {
  mutate((d) => {
    d.currentUserId = null;
  });
}

export function currentUser(): UserAccount | null {
  const d = load();
  return d.users.find((u) => u.id === d.currentUserId) ?? null;
}

// ------------------------------------------------------------- projects
export function createProject(input: { name: string; location: string; valueInr: number }): Project {
  const d = load();
  const project: Project = {
    id: id("proj"),
    contractorId: d.currentUserId!,
    name: input.name,
    location: input.location,
    valueInr: input.valueInr,
    status: "planning",
    createdAt: new Date().toISOString(),
  };
  mutate((d) => d.projects.push(project));
  return project;
}

// ------------------------------------------------------------- requests
const RATE_VARIANCE = 0.12; // simulated quotes vary price by up to ±12%

function simulateQuotesFor(request: ProcurementRequest) {
  const d = load();
  const matching = d.supplierProfiles.filter((sp) => sp.categories.includes(request.category));
  const pool = matching.length ? matching : d.supplierProfiles.slice(0, 5);
  const chosen = pool.slice(0, Math.min(4, pool.length));

  const baseProduct = d.products.find(
    (p) => p.category === request.category && chosen.some((c) => c.userId === p.supplierId),
  );
  const basePrice = baseProduct?.pricePerUnit ?? 100;

  const newQuotes: Quote[] = chosen.map((sp, i) => {
    const variance = 1 + (Math.random() * 2 - 1) * RATE_VARIANCE;
    const unitPrice = Math.round(basePrice * variance);
    const freight = Math.round(500 + Math.random() * 4000);
    return {
      id: id("quote"),
      requestId: request.id,
      supplierId: sp.userId,
      unitPrice,
      freight,
      etaDays: 1 + Math.floor(Math.random() * 6) + i,
      paymentTerms: sp.paymentTerms[0] ?? "Bank transfer",
      stockNote: Math.random() > 0.3 ? "In stock" : "Availability needs confirmation",
      validUntil: new Date(Date.now() + 3 * 86400000).toISOString(),
      createdAt: new Date().toISOString(),
      isSimulated: true,
    };
  });

  mutate((d) => d.quotes.push(...newQuotes));
}

export function createRequest(input: {
  projectId: string;
  category: string;
  material: string;
  specification: string;
  quantity: number;
  unit: string;
  deliveryLocation: string;
  requiredBy: string;
  paymentPreference: string;
  notes?: string;
}): ProcurementRequest {
  const d = load();
  const request: ProcurementRequest = {
    id: id("req"),
    contractorId: d.currentUserId!,
    status: "open",
    createdAt: new Date().toISOString(),
    ...input,
  };
  mutate((d) => d.requests.push(request));
  // Simulate the reverse-bidding loop: matched example suppliers "respond"
  // shortly after the request is posted, exactly like the real flow would,
  // just compressed from hours to seconds and clearly flagged isSimulated.
  if (typeof window !== "undefined") {
    window.setTimeout(() => simulateQuotesFor(request), 1400);
  }
  return request;
}

// --------------------------------------------------------------- quotes
export function submitQuote(input: {
  requestId: string;
  unitPrice: number;
  freight: number;
  etaDays: number;
  paymentTerms: string;
  stockNote: string;
}): Quote {
  const d = load();
  const quote: Quote = {
    id: id("quote"),
    requestId: input.requestId,
    supplierId: d.currentUserId!,
    unitPrice: input.unitPrice,
    freight: input.freight,
    etaDays: input.etaDays,
    paymentTerms: input.paymentTerms,
    stockNote: input.stockNote,
    validUntil: new Date(Date.now() + 3 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    isSimulated: false,
  };
  mutate((d) => d.quotes.push(quote));
  return quote;
}

export function acceptQuote(quoteId: string): Order {
  const d = load();
  const quote = d.quotes.find((q) => q.id === quoteId)!;
  const request = d.requests.find((r) => r.id === quote.requestId)!;
  const total = quote.unitPrice * request.quantity + quote.freight;
  const order: Order = {
    id: id("order"),
    poNumber: `BM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    requestId: request.id,
    contractorId: request.contractorId,
    supplierId: quote.supplierId,
    quoteId: quote.id,
    material: request.material,
    specification: request.specification,
    quantity: request.quantity,
    unit: request.unit,
    unitPrice: quote.unitPrice,
    freight: quote.freight,
    totalInr: total,
    status: "quote_accepted",
    projectId: request.projectId,
    deliveryLocation: request.deliveryLocation,
    createdAt: new Date().toISOString(),
  };
  mutate((d) => {
    d.orders.push(order);
    const r = d.requests.find((r) => r.id === request.id);
    if (r) r.status = "awarded";
  });
  return order;
}

export function advanceOrderStatus(orderId: string) {
  const idx = ORDER_STEPS_LIST.findIndex((s) => s.key === load().orders.find((o) => o.id === orderId)?.status);
  const next = ORDER_STEPS_LIST[Math.min(idx + 1, ORDER_STEPS_LIST.length - 1)];
  mutate((d) => {
    const o = d.orders.find((o) => o.id === orderId);
    if (o) o.status = next.key as OrderStatusStep;
  });
}

// -------------------------------------------------------------- supplier
export function addProduct(input: {
  category: string;
  name: string;
  unit: string;
  pricePerUnit: number;
  stockQty: number | null;
}): Product {
  const d = load();
  const product: Product = { id: id("prod"), supplierId: d.currentUserId!, ...input };
  mutate((d) => {
    d.products.push(product);
    const sp = d.supplierProfiles.find((s) => s.userId === d.currentUserId);
    if (sp && !sp.categories.includes(input.category)) sp.categories.push(input.category);
  });
  return product;
}

export function setSupplierRadius(km: number) {
  mutate((d) => {
    const sp = d.supplierProfiles.find((s) => s.userId === d.currentUserId);
    if (sp) sp.deliveryRadiusKm = km;
  });
}

// ------------------------------------------------------------------ admin
export function setVerification(userId: string, level: SupplierProfile["verification"]) {
  mutate((d) => {
    const sp = d.supplierProfiles.find((s) => s.userId === userId);
    if (sp) sp.verification = level;
  });
}

export { CATEGORIES, ORDER_STEPS_LIST as ORDER_STEPS };
