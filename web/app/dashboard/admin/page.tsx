"use client";

import { Users, ShieldCheck, FileText, PackageCheck } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { useStore, setVerification } from "@/lib/store";
import { fmtINR } from "@/lib/format";
import type { SupplierProfile } from "@/lib/types";

const LEVELS: SupplierProfile["verification"][] = ["unverified", "basic", "business", "buildmart"];

function AdminContent() {
  const store = useStore();
  const contractors = store.users.filter((u) => u.role === "contractor");
  const suppliers = store.users.filter((u) => u.role === "supplier");
  const gmv = store.orders.reduce((sum, o) => sum + o.totalInr, 0);

  return (
    <>
      <DashboardPageHeader
        title="Admin Overview"
        description="Platform-wide view across this browser's BuildMart instance."
      />

      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Contractors" value={String(contractors.length)} icon={<Users className="h-5 w-5" />} />
        <StatCard label="Suppliers" value={String(suppliers.length)} icon={<ShieldCheck className="h-5 w-5" />} />
        <StatCard label="Open Requests" value={String(store.requests.filter((r) => r.status === "open").length)} icon={<FileText className="h-5 w-5" />} />
        <StatCard label="GMV (this instance)" value={fmtINR(gmv)} icon={<PackageCheck className="h-5 w-5" />} />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 font-semibold text-primary">Supplier Verification</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 pr-4">Supplier</th>
                <th className="pb-3 pr-4">City</th>
                <th className="pb-3 pr-4">Categories</th>
                <th className="pb-3">Verification</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => {
                const profile = store.supplierProfiles.find((p) => p.userId === s.id);
                return (
                  <tr key={s.id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4 font-medium text-primary">{s.company}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{s.city}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{profile?.categories.join(", ") || "—"}</td>
                    <td className="py-3">
                      <select
                        value={profile?.verification ?? "unverified"}
                        onChange={(e) => setVerification(s.id, e.target.value as SupplierProfile["verification"])}
                        className="rounded-[4px] border border-border bg-background p-1.5 text-xs capitalize"
                      >
                        {LEVELS.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
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

export default function AdminPage() {
  return (
    <DashboardShell requiredRole="admin">
      <AdminContent />
    </DashboardShell>
  );
}
