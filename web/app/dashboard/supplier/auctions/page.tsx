"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Gavel, Trophy, TrendingDown, Clock, X, Tag } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { useStore, submitQuote, reviseQuote, withdrawQuote } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { fmtINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ProcurementRequest, Quote } from "@/lib/types";

function daysLeft(requiredBy: string): number {
  return Math.ceil((new Date(requiredBy).getTime() - Date.now()) / 86400000);
}

function AuctionsContent() {
  const user = useCurrentUser()!;
  const store = useStore();
  const profile = store.supplierProfiles.find((p) => p.userId === user.id);

  const auctions = useMemo(() => {
    const matching = store.requests.filter((r) => r.status === "open" && profile?.categories.includes(r.category));
    return matching
      .map((r) => {
        const quotes = store.quotes
          .filter((q) => q.requestId === r.id)
          .map((q) => ({ q, total: q.unitPrice * r.quantity + q.freight }))
          .sort((a, b) => a.total - b.total);
        const myEntry = quotes.find(({ q }) => q.supplierId === user.id && !q.isSimulated);
        const myRank = myEntry ? quotes.findIndex(({ q }) => q.id === myEntry.q.id) + 1 : null;
        return { request: r, quotes, myEntry, myRank, totalBids: quotes.length };
      })
      .sort((a, b) => daysLeft(a.request.requiredBy) - daysLeft(b.request.requiredBy));
  }, [store, profile, user.id]);

  return (
    <>
      <DashboardPageHeader
        title="Live Auctions"
        description="Every open request you can bid on, ranked live — revise your bid as often as you like until a contractor accepts one."
        icon={<Gavel className="h-5 w-5 text-accent" />}
      />

      {auctions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          {!profile?.categories.length ? (
            <>
              <Tag className="mx-auto mb-3 h-6 w-6 text-accent" />
              <p className="mb-3">
                You haven&apos;t set any product categories yet, so nothing can match you — auctions are filtered to
                categories you actually deal in.
              </p>
              <Link href="/dashboard/supplier/products" className="text-sm font-semibold text-accent">
                Add a product or pick categories in your Business Profile →
              </Link>
            </>
          ) : (
            <>
              No open requests in your categories ({profile.categories.join(", ")}) right now — check back soon, or{" "}
              <Link href="/dashboard/supplier/products" className="font-semibold text-accent">
                widen your categories
              </Link>
              .
            </>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          {auctions.map((a) => (
            <AuctionCard key={a.request.id} {...a} />
          ))}
        </div>
      )}
    </>
  );
}

function AuctionCard({
  request,
  quotes,
  myEntry,
  myRank,
  totalBids,
}: {
  request: ProcurementRequest;
  quotes: { q: Quote; total: number }[];
  myEntry?: { q: Quote; total: number };
  myRank: number | null;
  totalBids: number;
}) {
  const [bidding, setBidding] = useState(false);
  const left = daysLeft(request.requiredBy);
  const leading = myRank === 1;
  const bestTotal = quotes[0]?.total;

  return (
    <div className={cn("rounded-2xl border bg-card p-6", leading ? "border-green-600/50" : "border-border")}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-primary">
            {request.material} {request.specification && `— ${request.specification}`}
          </h3>
          <p className="text-sm text-muted-foreground">
            {request.quantity} {request.unit} &middot; Delivered to {request.deliveryLocation}
          </p>
        </div>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
            left <= 1
              ? "bg-destructive/10 text-destructive"
              : left <= 3
                ? "bg-brass-100 text-brass-600"
                : "bg-secondary text-muted-foreground",
          )}
        >
          <Clock className="h-3 w-3" />
          {left <= 0 ? "Closes today" : `Closes in ${left}d`}
        </span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total bids" value={String(totalBids)} />
        <Stat label="Best delivered cost" value={bestTotal != null ? fmtINR(bestTotal) : "—"} />
        <Stat
          label="Your rank"
          value={myRank ? `#${myRank} of ${totalBids}` : "Not bidding"}
          accent={leading}
        />
        <Stat
          label="Gap to lead"
          value={myEntry && bestTotal != null && !leading ? fmtINR(myEntry.total - bestTotal) : leading ? "You lead" : "—"}
          accent={leading}
        />
      </div>

      {leading && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-600/10 px-3 py-2 text-sm font-semibold text-green-700">
          <Trophy className="h-4 w-4" />
          You currently have the lowest delivered cost on this request.
        </div>
      )}

      {!bidding ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setBidding(true)}
            className="flex items-center gap-1.5 rounded-[4px] bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
          >
            <TrendingDown className="h-3.5 w-3.5" />
            {myEntry ? "Revise Bid" : "Place Bid"}
          </button>
          {myEntry && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Withdraw your bid from this auction?")) withdrawQuote(myEntry.q.id);
              }}
              className="flex items-center gap-1.5 rounded-[4px] border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-destructive hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" />
              Withdraw
            </button>
          )}
        </div>
      ) : (
        <BidForm
          requestId={request.id}
          quantity={request.quantity}
          existing={myEntry?.q}
          onDone={() => setBidding(false)}
        />
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
      <div className={cn("font-display text-lg font-semibold", accent ? "text-green-700" : "text-primary")}>{value}</div>
      <div className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

function BidForm({
  requestId,
  quantity,
  existing,
  onDone,
}: {
  requestId: string;
  quantity: number;
  existing?: Quote;
  onDone: () => void;
}) {
  const [unitPrice, setUnitPrice] = useState(existing ? String(existing.unitPrice) : "");
  const [freight, setFreight] = useState(existing ? String(existing.freight) : "");
  const [etaDays, setEtaDays] = useState(existing ? String(existing.etaDays) : "3");
  const [paymentTerms, setPaymentTerms] = useState(existing?.paymentTerms ?? "Bank transfer");
  const [stockNote, setStockNote] = useState(existing?.stockNote ?? "In stock");

  const total = unitPrice ? Number(unitPrice) * quantity + (Number(freight) || 0) : null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!unitPrice) return;
    const input = {
      unitPrice: Number(unitPrice),
      freight: Number(freight) || 0,
      etaDays: Number(etaDays) || 1,
      paymentTerms,
      stockNote,
    };
    if (existing) {
      reviseQuote(existing.id, input);
    } else {
      submitQuote({ requestId, ...input });
    }
    onDone();
  };

  return (
    <form onSubmit={submit} className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-primary">Unit Price (₹)</label>
        <input
          type="number"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          required
          autoFocus
          className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-primary">Freight / Delivery (₹)</label>
        <input
          type="number"
          value={freight}
          onChange={(e) => setFreight(e.target.value)}
          className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-primary">ETA (days)</label>
        <input
          type="number"
          value={etaDays}
          onChange={(e) => setEtaDays(e.target.value)}
          className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-primary">Payment Terms</label>
        <select
          value={paymentTerms}
          onChange={(e) => setPaymentTerms(e.target.value)}
          className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
        >
          <option>Bank transfer</option>
          <option>Cheque</option>
          <option>Credit terms (15 days)</option>
          <option>Credit terms (30 days)</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm font-semibold text-primary">Stock Note</label>
        <select
          value={stockNote}
          onChange={(e) => setStockNote(e.target.value)}
          className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
        >
          <option>In stock</option>
          <option>Limited stock</option>
          <option>Availability needs confirmation</option>
        </select>
      </div>
      {total != null && (
        <div className="sm:col-span-2 rounded-lg bg-secondary/50 px-3 py-2 text-sm">
          Delivered total: <span className="font-semibold text-primary">{fmtINR(total)}</span>
        </div>
      )}
      <div className="flex gap-2 sm:col-span-2">
        <button type="submit" className="rounded-[4px] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          {existing ? "Update Bid" : "Submit Bid"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-[4px] border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AuctionsPage() {
  return (
    <DashboardShell requiredRole="supplier">
      <AuctionsContent />
    </DashboardShell>
  );
}
