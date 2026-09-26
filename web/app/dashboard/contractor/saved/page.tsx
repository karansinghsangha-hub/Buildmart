"use client";

import Link from "next/link";
import { Bookmark, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { useStore, toggleSaveSupplier } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";

const verificationLabel: Record<string, string> = {
  unverified: "Unverified",
  basic: "Basic Verified",
  business: "Business Verified",
  buildmart: "BuildMart Verified",
};

function SavedSuppliersContent() {
  const user = useCurrentUser()!;
  const store = useStore();

  const saved = store.savedSuppliers
    .filter((s) => s.contractorId === user.id)
    .map((s) => {
      const supplier = store.users.find((u) => u.id === s.supplierId);
      const profile = store.supplierProfiles.find((p) => p.userId === s.supplierId);
      const productCount = store.products.filter((p) => p.supplierId === s.supplierId).length;
      return { saved: s, supplier, profile, productCount };
    })
    .filter((s) => s.supplier)
    .sort((a, b) => b.saved.savedAt.localeCompare(a.saved.savedAt));

  return (
    <>
      <DashboardPageHeader
        title="Saved Suppliers"
        description="Suppliers you've bookmarked from the marketplace, for quick reference."
        icon={<Bookmark className="h-5 w-5 text-accent" />}
      />

      {saved.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No saved suppliers yet.{" "}
          <Link href="/marketplace" className="font-semibold text-accent">
            Browse the marketplace
          </Link>{" "}
          and tap the bookmark icon on any listing.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map(({ supplier, profile, productCount }) => (
            <div key={supplier!.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex items-start justify-between gap-2">
                {profile && profile.verification !== "unverified" && (
                  <span className="flex items-center gap-1 text-[0.65rem] font-semibold text-green-700">
                    <ShieldCheck className="h-3 w-3" />
                    {verificationLabel[profile.verification]}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => toggleSaveSupplier(supplier!.id)}
                  title="Remove from saved suppliers"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-accent text-accent-foreground"
                >
                  <Bookmark className="h-3 w-3 fill-current" />
                </button>
              </div>
              <h3 className="mb-1 font-semibold text-primary">{supplier!.company}</h3>
              <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {supplier!.city}
                {profile && <span>&middot; delivers within {profile.deliveryRadiusKm} km</span>}
              </div>
              {profile?.description && <p className="mb-3 text-xs text-muted-foreground">{profile.description}</p>}
              <div className="mt-auto flex items-center justify-between border-t border-dashed border-border pt-4 text-sm">
                <span className="text-muted-foreground">{productCount} product{productCount === 1 ? "" : "s"} listed</span>
                <Link
                  href={`/marketplace?q=${encodeURIComponent(supplier!.company)}`}
                  className="flex items-center gap-1 font-semibold text-accent"
                >
                  View listings
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function SavedSuppliersPage() {
  return (
    <DashboardShell requiredRole="contractor">
      <SavedSuppliersContent />
    </DashboardShell>
  );
}
