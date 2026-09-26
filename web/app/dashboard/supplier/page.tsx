"use client";

import Link from "next/link";
import { Package, Inbox, PackageCheck, TrendingUp, Send, Trophy } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { useStore } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { fmtINR } from "@/lib/format";

function SupplierOverviewContent() {
  const user = useCurrentUser()!;
  const store = useStore();
  const profile = store.supplierProfiles.find((p) => p.userId === user.id);
  const myProducts = store.products.filter((p) => p.supplierId === user.id);
  const myQuotes = store.quotes.filter((q) => q.supplierId === user.id && !q.isSimulated);
  const myOrders = store.orders.filter((o) => o.supplierId === user.id);
  const revenue = myOrders.reduce((sum, o) => sum + o.totalInr, 0);

  const openMatchingRequests = store.requests.filter(
    (r) => r.status === "open" && profile?.categories.includes(r.category),
  );

  const leadingCount = openMatchingRequests.filter((r) => {
    const ranked = store.quotes
      .filter((q) => q.requestId === r.id)
      .map((q) => ({ q, total: q.unitPrice * r.quantity + q.freight }))
      .sort((a, b) => a.total - b.total);
    return ranked[0]?.q.supplierId === user.id && !ranked[0]?.q.isSimulated;
  }).length;

  return (
    <>
      <DashboardPageHeader
        title={`Welcome back, ${user.name.split(" ")[0]}.`}
        description="Your BuildMart supplier account."
        action={
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase ${
              profile?.verification === "unverified"
                ? "bg-secondary text-muted-foreground"
                : "bg-green-100 text-green-700"
            }`}
          >
            {profile?.verification === "unverified" ? "Not yet verified" : `${profile?.verification} verified`}
          </span>
        }
      />

      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        <StatCard label="Products Listed" value={String(myProducts.length)} icon={<Package className="h-5 w-5" />} />
        <StatCard label="Live Auctions" value={String(openMatchingRequests.length)} icon={<Inbox className="h-5 w-5" />} />
        <StatCard label="Leading Bids" value={String(leadingCount)} icon={<Trophy className="h-5 w-5" />} accent={leadingCount > 0} />
        <StatCard label="Quotes Sent" value={String(myQuotes.length)} icon={<Send className="h-5 w-5" />} />
        <StatCard label="Orders Won" value={String(myOrders.length)} icon={<PackageCheck className="h-5 w-5" />} />
        <StatCard label="Revenue" value={fmtINR(revenue)} icon={<TrendingUp className="h-5 w-5" />} />
      </div>

      {myProducts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="mb-3 text-sm text-muted-foreground">
            Add products to your catalogue so BuildMart can match you to procurement requests.
          </p>
          <Link href="/dashboard/supplier/products" className="text-sm font-semibold text-accent">
            Add your first product →
          </Link>
        </div>
      )}

      {openMatchingRequests.length > 0 && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-primary">Live Auctions Matching Your Products</h3>
            <Link href="/dashboard/supplier/auctions" className="text-sm font-semibold text-accent">
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {openMatchingRequests.slice(0, 5).map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm">
                <div>
                  <div className="font-medium text-primary">
                    {r.material} · {r.quantity} {r.unit}
                  </div>
                  <div className="text-muted-foreground">{r.deliveryLocation}</div>
                </div>
                <Link href="/dashboard/supplier/auctions" className="text-sm font-semibold text-accent">
                  Bid →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-6 ${accent ? "border-green-600/50 bg-green-600/5" : "border-border bg-card"}`}>
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${
          accent ? "bg-green-600 text-white" : "bg-primary text-brass-300"
        }`}
      >
        {icon}
      </div>
      <div className={`font-display text-2xl font-semibold ${accent ? "text-green-700" : "text-primary"}`}>{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function SupplierDashboardPage() {
  return (
    <DashboardShell requiredRole="supplier">
      <SupplierOverviewContent />
    </DashboardShell>
  );
}
