"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useStore } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { CATEGORIES } from "@/lib/categories";
import { fmtINR } from "@/lib/format";
import { cn } from "@/lib/utils";

const verificationLabel: Record<string, string> = {
  unverified: "Unverified",
  basic: "Basic Verified",
  business: "Business Verified",
  buildmart: "BuildMart Verified",
};

function MarketplaceContent() {
  const store = useStore();
  const user = useCurrentUser();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<"price" | "name">("price");

  const listings = useMemo(() => {
    let items = store.products.map((p) => {
      const supplier = store.users.find((u) => u.id === p.supplierId);
      const profile = store.supplierProfiles.find((s) => s.userId === p.supplierId);
      return { product: p, supplier, profile };
    });
    if (category !== "All") items = items.filter((i) => i.product.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (i) =>
          i.product.name.toLowerCase().includes(q) ||
          i.product.category.toLowerCase().includes(q) ||
          i.supplier?.company.toLowerCase().includes(q),
      );
    }
    items.sort((a, b) =>
      sort === "price" ? a.product.pricePerUnit - b.product.pricePerUnit : a.product.name.localeCompare(b.product.name),
    );
    return items;
  }, [store, category, query, sort]);

  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />
      <main>
        <section className="bg-gradient-to-b from-navy-950 to-navy-900 px-6 py-16 text-[#faf7f0]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex gap-2 text-sm text-[#faf7f0]/55">
              <span>Home</span> <span>/</span> <span>Marketplace</span>
            </div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
              Construction materials, sourced around your project.
            </h1>
            <p className="mt-2 max-w-2xl text-[#faf7f0]/65">
              Browse example listings below to see how the marketplace works — real suppliers are onboarding now.
            </p>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search material or supplier…"
                  className="w-full rounded-[4px] border border-border bg-card py-3 pl-10 pr-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-[4px] border border-border bg-card px-4 py-3 text-sm"
              >
                <option>All</option>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "price" | "name")}
                className="rounded-[4px] border border-border bg-card px-4 py-3 text-sm"
              >
                <option value="price">Sort: Price</option>
                <option value="name">Sort: Name</option>
              </select>
            </div>

            {listings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
                No listings match that search.
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map(({ product, supplier, profile }) => (
                  <div key={product.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-semibold uppercase text-muted-foreground">
                        {product.category}
                      </span>
                      {profile && profile.verification !== "unverified" && (
                        <span className="flex items-center gap-1 text-[0.65rem] font-semibold text-green-700">
                          <ShieldCheck className="h-3 w-3" />
                          {verificationLabel[profile.verification]}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-1 font-semibold text-primary">{product.name}</h3>
                    <p className="mb-1 text-sm text-muted-foreground">{supplier?.company}</p>
                    <div className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {supplier?.city}
                      {profile && <span>· delivers within {profile.deliveryRadiusKm} km</span>}
                    </div>
                    <div className="mt-auto flex items-end justify-between border-t border-dashed border-border pt-4">
                      <div>
                        <div className="font-display text-lg font-semibold text-primary">{fmtINR(product.pricePerUnit)}</div>
                        <div className="text-xs text-muted-foreground">per {product.unit}</div>
                      </div>
                      <Link
                        href={user?.role === "contractor" ? "/dashboard/contractor/requests" : "/signin"}
                        className="flex items-center gap-1 text-sm font-semibold text-accent"
                      >
                        Request Quote
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-secondary/40 px-6 py-16">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="mb-3 font-display text-2xl font-semibold text-primary sm:text-3xl">
              Don&apos;t see your material listed?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              Post a procurement request instead — matched suppliers respond with quotes, even for materials not yet
              listed individually.
            </p>
            <Link
              href={user?.role === "contractor" ? "/dashboard/contractor/requests" : "/signin"}
              className={cn(
                "inline-flex items-center gap-2 rounded-[4px] bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground",
              )}
            >
              Post a Procurement Request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={null}>
      <MarketplaceContent />
    </Suspense>
  );
}
