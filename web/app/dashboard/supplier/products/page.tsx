"use client";

import { useState, type FormEvent } from "react";
import { Plus, Star, Pencil, Trash2, X, Check, Minus } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import {
  useStore,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleProductFeatured,
  adjustProductStock,
  setSupplierRadius,
  updateSupplierProfile,
} from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { CATEGORIES, CATEGORY_UNITS } from "@/lib/categories";
import { fmtINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

const PAYMENT_TERMS = ["Bank transfer", "Cheque", "Credit terms (15 days)", "Credit terms (30 days)"];

function ProductsContent() {
  const user = useCurrentUser()!;
  const store = useStore();
  const profile = store.supplierProfiles.find((p) => p.userId === user.id)!;
  const myProducts = [...store.products.filter((p) => p.supplierId === user.id)].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    addProduct({
      category,
      name,
      unit: CATEGORY_UNITS[category] ?? "unit",
      pricePerUnit: Number(price),
      stockQty: stockQty ? Number(stockQty) : null,
      description: description || undefined,
    });
    setName("");
    setPrice("");
    setStockQty("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <>
      <DashboardPageHeader
        title="Products"
        description="Materials BuildMart can match you to procurement requests for."
        action={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 rounded-[4px] bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        }
      />

      <div className="mb-8 rounded-2xl border border-border bg-card p-6">
        <label className="mb-1.5 block text-sm font-semibold text-primary">Delivery Radius</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={5}
            max={200}
            value={profile.deliveryRadiusKm}
            onChange={(e) => setSupplierRadius(Number(e.target.value))}
            className="w-full max-w-xs accent-accent"
          />
          <span className="font-display text-lg text-accent">{profile.deliveryRadiusKm} km</span>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          BuildMart uses this to match you to procurement requests near your delivery range.
        </p>
      </div>

      <BusinessProfileCard profile={profile} />

      {showForm && (
        <form onSubmit={submit} className="mb-8 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="OPC 43 Grade Cement"
              required
              className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">
              Price per {CATEGORY_UNITS[category] ?? "unit"} (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="392"
              required
              className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">Stock Quantity (optional)</label>
            <input
              type="number"
              value={stockQty}
              onChange={(e) => setStockQty(e.target.value)}
              placeholder="Leave blank if availability needs confirmation"
              className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-primary">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Brand, grade, packaging — anything a contractor comparing listings would want to know."
              className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="rounded-[4px] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Add Product
            </button>
          </div>
        </form>
      )}

      {myProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No products yet.
        </div>
      ) : (
        <div className="space-y-3">
          {myProducts.map((p) =>
            editingId === p.id ? (
              <ProductEditRow key={p.id} product={p} onDone={() => setEditingId(null)} />
            ) : (
              <ProductRow key={p.id} product={p} onEdit={() => setEditingId(p.id)} />
            ),
          )}
        </div>
      )}
    </>
  );
}

function ProductRow({ product: p, onEdit }: { product: Product; onEdit: () => void }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 rounded-2xl border bg-card p-4",
        p.featured ? "border-accent/60 bg-brass-100/10" : "border-border",
      )}
    >
      <button
        type="button"
        onClick={() => toggleProductFeatured(p.id)}
        title={p.featured ? "Unfeature this product" : "Feature this product"}
        className={cn(
          "flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-colors",
          p.featured ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-accent hover:text-accent",
        )}
      >
        <Star className={cn("h-4 w-4", p.featured && "fill-current")} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-primary">{p.name}</span>
          {p.featured && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[0.65rem] font-semibold uppercase text-accent-foreground">
              Featured
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground">{p.category}</div>
        {p.description && <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>}
      </div>

      <div className="text-right text-sm">
        <div className="font-semibold text-primary">
          {fmtINR(p.pricePerUnit)} <span className="font-normal text-muted-foreground">/ {p.unit}</span>
        </div>
        <div className="flex items-center justify-end gap-1.5 text-xs">
          {p.stockQty == null ? (
            <span className="text-muted-foreground">Availability needs confirmation</span>
          ) : (
            <>
              <button
                type="button"
                onClick={() => adjustProductStock(p.id, -1)}
                className="flex h-5 w-5 items-center justify-center rounded border border-border text-muted-foreground hover:border-accent hover:text-accent"
              >
                <Minus className="h-2.5 w-2.5" />
              </button>
              {p.stockQty > 0 ? (
                <span className="text-green-700">In stock · {p.stockQty}</span>
              ) : (
                <span className="text-destructive">Out of stock</span>
              )}
              <button
                type="button"
                onClick={() => adjustProductStock(p.id, 1)}
                className="flex h-5 w-5 items-center justify-center rounded border border-border text-muted-foreground hover:border-accent hover:text-accent"
              >
                <Plus className="h-2.5 w-2.5" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-none items-center gap-1.5">
        <button
          type="button"
          onClick={onEdit}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-accent hover:text-accent"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Remove "${p.name}" from your catalogue?`)) deleteProduct(p.id);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-destructive hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function ProductEditRow({ product: p, onDone }: { product: Product; onDone: () => void }) {
  const [name, setName] = useState(p.name);
  const [price, setPrice] = useState(String(p.pricePerUnit));
  const [stockQty, setStockQty] = useState(p.stockQty == null ? "" : String(p.stockQty));
  const [description, setDescription] = useState(p.description ?? "");

  const save = (e: FormEvent) => {
    e.preventDefault();
    updateProduct(p.id, {
      name,
      pricePerUnit: Number(price) || p.pricePerUnit,
      stockQty: stockQty ? Number(stockQty) : null,
      description: description || undefined,
    });
    onDone();
  };

  return (
    <form onSubmit={save} className="grid gap-3 rounded-2xl border border-accent bg-card p-4 sm:grid-cols-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-[4px] border border-border bg-background p-2 text-sm sm:col-span-2"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="rounded-[4px] border border-border bg-background p-2 text-sm"
      />
      <input
        type="number"
        value={stockQty}
        onChange={(e) => setStockQty(e.target.value)}
        placeholder="Stock quantity"
        className="rounded-[4px] border border-border bg-background p-2 text-sm"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        placeholder="Description"
        className="rounded-[4px] border border-border bg-background p-2 text-sm sm:col-span-2"
      />
      <div className="flex gap-2 sm:col-span-2">
        <button type="submit" className="flex items-center gap-1.5 rounded-[4px] bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
          <Check className="h-3.5 w-3.5" />
          Save
        </button>
        <button
          type="button"
          onClick={onDone}
          className="flex items-center gap-1.5 rounded-[4px] border border-border px-4 py-2 text-xs font-semibold text-muted-foreground"
        >
          <X className="h-3.5 w-3.5" />
          Cancel
        </button>
      </div>
    </form>
  );
}

function BusinessProfileCard({
  profile,
}: {
  profile: { categories: string[]; paymentTerms: string[]; minOrderNote?: string; description?: string };
}) {
  const [categories, setCategories] = useState<string[]>(profile.categories);
  const [paymentTerms, setPaymentTerms] = useState<string[]>(profile.paymentTerms);
  const [minOrderNote, setMinOrderNote] = useState(profile.minOrderNote ?? "");
  const [description, setDescription] = useState(profile.description ?? "");
  const [saved, setSaved] = useState(false);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setSaved(false);
  };

  const save = () => {
    updateSupplierProfile({ categories, paymentTerms, minOrderNote: minOrderNote || undefined, description: description || undefined });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mb-8 rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-1 font-semibold text-primary">Business Profile</h3>
      <p className="mb-5 text-xs text-muted-foreground">
        Shown to contractors on the marketplace and used to match you to procurement requests, even for
        categories you haven&apos;t listed a product in yet.
      </p>

      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-semibold text-primary">Business Description</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setSaved(false);
          }}
          rows={2}
          placeholder="Tell contractors what makes your business a good fit — years in trade, bulk capacity, brands you carry…"
          className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-semibold text-primary">Categories You Deal In</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggle(categories, setCategories, c)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                categories.includes(c)
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-semibold text-primary">Payment Terms You Accept</label>
        <div className="flex flex-wrap gap-2">
          {PAYMENT_TERMS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggle(paymentTerms, setPaymentTerms, t)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                paymentTerms.includes(t)
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-semibold text-primary">Minimum Order Note (optional)</label>
        <input
          value={minOrderNote}
          onChange={(e) => {
            setMinOrderNote(e.target.value);
            setSaved(false);
          }}
          placeholder="e.g. Minimum 5 tonnes per order"
          className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
        />
      </div>

      <button
        type="button"
        onClick={save}
        className="rounded-[4px] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        {saved ? "Saved ✓" : "Save Business Profile"}
      </button>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <DashboardShell requiredRole="supplier">
      <ProductsContent />
    </DashboardShell>
  );
}
