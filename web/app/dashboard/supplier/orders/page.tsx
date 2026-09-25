"use client";

import { useState } from "react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { OrderDetail } from "@/components/dashboard/order-detail";
import { useStore } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { ORDER_STEPS } from "@/lib/types";
import { cn } from "@/lib/utils";

function SupplierOrdersContent() {
  const user = useCurrentUser()!;
  const store = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const myOrders = store.orders
    .filter((o) => o.supplierId === user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const selected = myOrders.find((o) => o.id === selectedId) ?? myOrders[0] ?? null;

  return (
    <>
      <DashboardPageHeader title="Orders" description="Orders won through BuildMart — update status as you fulfil them." />

      {myOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No orders yet — submit quotes on incoming requests to win your first order.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-2">
            {myOrders.map((o) => {
              const contractor = store.users.find((u) => u.id === o.contractorId);
              return (
                <button
                  key={o.id}
                  onClick={() => setSelectedId(o.id)}
                  className={cn(
                    "w-full rounded-xl border border-border bg-card p-4 text-left text-sm",
                    selected?.id === o.id && "border-accent bg-secondary/60",
                  )}
                >
                  <div className="font-semibold text-primary">{o.poNumber}</div>
                  <div className="text-xs text-muted-foreground">
                    {o.material} · {contractor?.company}
                  </div>
                  <div className="mt-2 text-xs font-medium capitalize text-accent">
                    {ORDER_STEPS.find((s) => s.key === o.status)?.label}
                  </div>
                </button>
              );
            })}
          </div>

          {selected && <OrderDetail orderId={selected.id} viewerRole="supplier" />}
        </div>
      )}
    </>
  );
}

export default function SupplierOrdersPage() {
  return (
    <DashboardShell requiredRole="supplier">
      <SupplierOrdersContent />
    </DashboardShell>
  );
}
