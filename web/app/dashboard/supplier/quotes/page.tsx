"use client";

import Link from "next/link";
import { History, Trophy, XCircle, Loader2, Ban } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { useStore } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { fmtINR, fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";

type HistoryStatus = "won" | "lost" | "pending" | "cancelled";

const STATUS_META: Record<HistoryStatus, { label: string; className: string; icon: React.ReactNode }> = {
  won: { label: "Won", className: "bg-green-100 text-green-700", icon: <Trophy className="h-3 w-3" /> },
  lost: { label: "Lost", className: "bg-secondary text-muted-foreground", icon: <XCircle className="h-3 w-3" /> },
  pending: { label: "Pending", className: "bg-brass-100 text-brass-600", icon: <Loader2 className="h-3 w-3" /> },
  cancelled: { label: "Request Cancelled", className: "bg-secondary text-muted-foreground", icon: <Ban className="h-3 w-3" /> },
};

function QuoteHistoryContent() {
  const user = useCurrentUser()!;
  const store = useStore();

  const myQuotes = store.quotes
    .filter((q) => q.supplierId === user.id && !q.isSimulated)
    .map((q) => {
      const request = store.requests.find((r) => r.id === q.requestId);
      const order = store.orders.find((o) => o.quoteId === q.id);
      let status: HistoryStatus = "pending";
      if (order) status = "won";
      else if (request?.status === "cancelled") status = "cancelled";
      else if (request?.status === "awarded") status = "lost";
      const total = request ? q.unitPrice * request.quantity + q.freight : q.unitPrice;
      return { q, request, order, status, total };
    })
    .sort((a, b) => b.q.createdAt.localeCompare(a.q.createdAt));

  const wonCount = myQuotes.filter((m) => m.status === "won").length;
  const pendingCount = myQuotes.filter((m) => m.status === "pending").length;

  return (
    <>
      <DashboardPageHeader
        title="Quote History"
        description="Every bid you've ever submitted — won, lost, or still live."
        icon={<History className="h-5 w-5 text-accent" />}
      />

      <div className="mb-8 grid grid-cols-3 gap-4">
        <Stat label="Total Quotes" value={String(myQuotes.length)} />
        <Stat label="Won" value={String(wonCount)} accent />
        <Stat label="Still Pending" value={String(pendingCount)} />
      </div>

      {myQuotes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          You haven&apos;t submitted a quote yet.{" "}
          <Link href="/dashboard/supplier/auctions" className="font-semibold text-accent">
            Check Live Auctions →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Request</th>
                <th className="px-4 py-3">Your Bid</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {myQuotes.map(({ q, request, status, total }) => {
                const meta = STATUS_META[status];
                return (
                  <tr key={q.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <div className="font-medium text-primary">{request?.material ?? "Request removed"}</div>
                      {request && (
                        <div className="text-xs text-muted-foreground">
                          {request.quantity} {request.unit} &middot; {request.deliveryLocation}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-primary">{fmtINR(total)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{fmtDate(q.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                          meta.className,
                        )}
                      >
                        {meta.icon}
                        {meta.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-5 text-center", accent ? "border-green-600/50 bg-green-600/5" : "border-border bg-card")}>
      <div className={cn("font-display text-2xl font-semibold", accent ? "text-green-700" : "text-primary")}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export default function QuoteHistoryPage() {
  return (
    <DashboardShell requiredRole="supplier">
      <QuoteHistoryContent />
    </DashboardShell>
  );
}
