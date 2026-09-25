"use client";

import { Check, ArrowRight } from "lucide-react";
import { useStore, advanceOrderStatus } from "@/lib/store";
import { ORDER_STEPS } from "@/lib/types";
import { fmtINR, fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function OrderDetail({ orderId, viewerRole }: { orderId: string; viewerRole: "contractor" | "supplier" }) {
  const store = useStore();
  const order = store.orders.find((o) => o.id === orderId);
  if (!order) return null;
  const supplier = store.users.find((u) => u.id === order.supplierId);
  const contractor = store.users.find((u) => u.id === order.contractorId);
  const project = store.projects.find((p) => p.id === order.projectId);
  const currentIdx = ORDER_STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-border pb-5">
        <div>
          <h3 className="font-display text-lg font-semibold text-primary">{order.poNumber}</h3>
          <p className="text-sm text-muted-foreground">
            {order.material} {order.specification && `— ${order.specification}`} · {order.quantity} {order.unit}
          </p>
        </div>
        <span className="font-display text-xl font-semibold text-primary">{fmtINR(order.totalInr)}</span>
      </div>

      <ol className="mb-6 flex flex-wrap gap-y-4">
        {ORDER_STEPS.map((step, i) => (
          <li key={step.key} className="flex min-w-[110px] flex-1 items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 flex-none items-center justify-center rounded-full border text-[0.65rem] font-bold",
                i <= currentIdx ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground",
              )}
            >
              {i < currentIdx ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            <span className={cn("text-xs", i <= currentIdx ? "font-semibold text-primary" : "text-muted-foreground")}>
              {step.label}
            </span>
            {i < ORDER_STEPS.length - 1 && <ArrowRight className="h-3 w-3 flex-none text-border" />}
          </li>
        ))}
      </ol>

      {viewerRole === "supplier" && order.status !== "completed" && (
        <button
          onClick={() => advanceOrderStatus(order.id)}
          className="mb-6 rounded-[4px] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Advance to &ldquo;{ORDER_STEPS[currentIdx + 1]?.label}&rdquo;
        </button>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Purchase Order</h4>
          <dl className="space-y-1.5 text-sm">
            <Row label="Buyer" value={contractor?.company ?? "—"} />
            <Row label="Supplier" value={supplier?.company ?? "—"} />
            <Row label="Project" value={project?.name ?? "—"} />
            <Row label="Delivery" value={order.deliveryLocation} />
            <Row label="Unit Price" value={fmtINR(order.unitPrice)} />
            <Row label="Freight" value={fmtINR(order.freight)} />
            <Row label="Total" value={fmtINR(order.totalInr)} />
            <Row label="Order Date" value={fmtDate(order.createdAt)} />
          </dl>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-dashed border-border py-1.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-primary">{value}</dd>
    </div>
  );
}
