"use client";

import Link from "next/link";
import { Package, Inbox, PackageCheck, TrendingUp, Send } from "lucide-react";
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

      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Products Listed" value={String(myProducts.length)} icon={<Package className="h-5 w-5" />} />
        <StatCard label="Matching Requests" value={String(openMatchingRequests.length)} icon={<Inbox className="h-5 w-5" />} />
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
            <h3 className="font-semibold text-primary">Requests Matching Your Products</h3>
            <Link href="/dashboard/supplier/requests" className="text-sm font-semibold text-accent">
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
                <Link href="/dashboard/supplier/requests" className="text-sm font-semibold text-accent">
                  Quote →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-brass-300">{icon}</div>
      <div className="font-display text-2xl font-semibold text-primary">{value}</div>
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
