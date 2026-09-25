"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { useStore, submitQuote } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { fmtDate } from "@/lib/format";

function IncomingRequestsContent() {
  const user = useCurrentUser()!;
  const store = useStore();
  const profile = store.supplierProfiles.find((p) => p.userId === user.id);
  const [quotingId, setQuotingId] = useState<string | null>(null);

  const matching = store.requests
    .filter((r) => r.status === "open" && profile?.categories.includes(r.category))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <DashboardPageHeader
        title="Incoming Requests"
        description="Open procurement requests matching the categories in your product catalogue."
      />

      {matching.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No matching requests right now. Add more product categories to widen your matches.
        </div>
      ) : (
        <div className="space-y-4">
          {matching.map((r) => {
            const contractor = store.users.find((u) => u.id === r.contractorId);
            const alreadyQuoted = store.quotes.some((q) => q.requestId === r.id && q.supplierId === user.id);
            return (
              <div key={r.id} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-primary">
                      {r.material} {r.specification && `— ${r.specification}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {r.quantity} {r.unit} · {r.deliveryLocation} · Required by {fmtDate(r.requiredBy)} · Posted by{" "}
                      {contractor?.company}
                    </p>
                  </div>
                  {alreadyQuoted && (
                    <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Quote submitted
                    </span>
                  )}
                </div>

                {!alreadyQuoted &&
                  (quotingId === r.id ? (
                    <QuoteForm requestId={r.id} onDone={() => setQuotingId(null)} />
                  ) : (
                    <button
                      onClick={() => setQuotingId(r.id)}
                      className="flex items-center gap-2 rounded-[4px] bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Submit Quote
                    </button>
                  ))}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function QuoteForm({ requestId, onDone }: { requestId: string; onDone: () => void }) {
  const [unitPrice, setUnitPrice] = useState("");
  const [freight, setFreight] = useState("");
  const [etaDays, setEtaDays] = useState("3");
  const [paymentTerms, setPaymentTerms] = useState("Bank transfer");
  const [stockNote, setStockNote] = useState("In stock");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!unitPrice) return;
    submitQuote({
      requestId,
      unitPrice: Number(unitPrice),
      freight: Number(freight) || 0,
      etaDays: Number(etaDays) || 1,
      paymentTerms,
      stockNote,
    });
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
      <div className="sm:col-span-2">
        <button type="submit" className="rounded-[4px] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Submit Quote
        </button>
      </div>
    </form>
  );
}

export default function SupplierRequestsPage() {
  return (
    <DashboardShell requiredRole="supplier">
      <IncomingRequestsContent />
    </DashboardShell>
  );
}
