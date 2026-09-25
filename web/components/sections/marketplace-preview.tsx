"use client";

import Link from "next/link";
import { ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { fmtINR } from "@/lib/format";

export function MarketplacePreview() {
  const store = useStore();
  const sample = store.products.slice(0, 3).map((p) => ({
    product: p,
    supplier: store.users.find((u) => u.id === p.supplierId),
    profile: store.supplierProfiles.find((s) => s.userId === p.supplierId),
  }));

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        {sample.map(({ product, supplier, profile }) => (
          <div key={product.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-semibold uppercase text-muted-foreground">
                {product.category}
              </span>
              {profile && profile.verification !== "unverified" && (
                <ShieldCheck className="h-4 w-4 text-green-700" />
              )}
            </div>
            <h3 className="mb-1 font-semibold text-primary">{product.name}</h3>
            <p className="mb-1 text-sm text-muted-foreground">{supplier?.company}</p>
            <div className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {supplier?.city}
            </div>
            <div className="font-display text-lg font-semibold text-primary">
              {fmtINR(product.pricePerUnit)}
              <span className="ml-1 font-sans text-xs font-normal text-muted-foreground">/ {product.unit}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
          View full marketplace
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default MarketplacePreview;
