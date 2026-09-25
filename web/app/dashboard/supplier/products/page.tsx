"use client";

import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { useStore, addProduct, setSupplierRadius } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { CATEGORIES, CATEGORY_UNITS } from "@/lib/categories";
import { fmtINR } from "@/lib/format";

function ProductsContent() {
  const user = useCurrentUser()!;
  const store = useStore();
  const profile = store.supplierProfiles.find((p) => p.userId === user.id)!;
  const myProducts = store.products.filter((p) => p.supplierId === user.id);
  const [showForm, setShowForm] = useState(false);

  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    addProduct({
      category,
      name,
      unit: CATEGORY_UNITS[category] ?? "unit",
      pricePerUnit: Number(price),
      stockQty: stockQty ? Number(stockQty) : null,
    });
    setName("");
    setPrice("");
    setStockQty("");
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
            className="w-full max-w-xs"
          />
          <span className="font-display text-lg text-accent">{profile.deliveryRadiusKm} km</span>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          BuildMart uses this to match you to procurement requests near your delivery range.
        </p>
      </div>

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
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Availability</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-primary">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">
                    {fmtINR(p.pricePerUnit)} / {p.unit}
                  </td>
                  <td className="px-4 py-3">
                    {p.stockQty == null ? (
                      <span className="text-muted-foreground">Availability needs confirmation</span>
                    ) : p.stockQty > 0 ? (
                      <span className="text-green-700">In stock · {p.stockQty}</span>
                    ) : (
                      <span className="text-destructive">Out of stock</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default function ProductsPage() {
  return (
    <DashboardShell requiredRole="supplier">
      <ProductsContent />
    </DashboardShell>
  );
}
