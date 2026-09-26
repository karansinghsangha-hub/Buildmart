"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, Clock, Check, Loader2, Ban } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { useStore, createRequest, acceptQuote, cancelRequest } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { CATEGORIES, CATEGORY_UNITS } from "@/lib/categories";
import { fmtINR, fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";

function RequestsContent() {
  const user = useCurrentUser()!;
  const store = useStore();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const myProjects = store.projects.filter((p) => p.contractorId === user.id);
  const myRequests = store.requests
    .filter((r) => r.contractorId === user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const selected = myRequests.find((r) => r.id === selectedId) ?? myRequests[0] ?? null;
  const selectedQuotes = selected
    ? store.quotes.filter((q) => q.requestId === selected.id).sort((a, b) => a.unitPrice * selected.quantity + a.freight - (b.unitPrice * selected.quantity + b.freight))
    : [];

  // ---------------------------------------------------------------- form
  const [projectId, setProjectId] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [material, setMaterial] = useState("");
  const [specification, setSpecification] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [requiredBy, setRequiredBy] = useState("");
  const [paymentPreference, setPaymentPreference] = useState("Bank transfer");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!projectId || !material || !quantity || !deliveryLocation || !requiredBy) return;
    const req = createRequest({
      projectId,
      category,
      material,
      specification,
      quantity: Number(quantity),
      unit: CATEGORY_UNITS[category] ?? "unit",
      deliveryLocation,
      requiredBy,
      paymentPreference,
    });
    setMaterial("");
    setSpecification("");
    setQuantity("");
    setDeliveryLocation("");
    setRequiredBy("");
    setShowForm(false);
    setSelectedId(req.id);
  };

  const handleAccept = (quoteId: string) => {
    const order = acceptQuote(quoteId);
    router.push(`/dashboard/contractor/orders?highlight=${order.id}`);
  };

  return (
    <>
      <DashboardPageHeader
        title="Procurement Requests"
        description="Publish what you need once — matched suppliers respond with competitive quotes."
        action={
          myProjects.length > 0 && (
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="flex items-center gap-2 rounded-[4px] bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              <Plus className="h-4 w-4" />
              New Request
            </button>
          )
        }
      />

      {myProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          Create a project first — procurement requests are posted against a project.
        </div>
      ) : (
        <>
          {showForm && (
            <form onSubmit={submit} className="mb-8 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-primary">Project</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  required
                  className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
                >
                  <option value="">Select project</option>
                  {myProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-primary">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-primary">Material</label>
                <input
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="TMT Steel"
                  required
                  className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-primary">Specification</label>
                <input
                  value={specification}
                  onChange={(e) => setSpecification(e.target.value)}
                  placeholder="Fe 500D, 12mm"
                  className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-primary">
                  Quantity ({CATEGORY_UNITS[category] ?? "unit"})
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="25"
                  required
                  className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-primary">Delivery Location</label>
                <input
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="Hyderabad"
                  required
                  className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-primary">Required By</label>
                <input
                  type="date"
                  value={requiredBy}
                  onChange={(e) => setRequiredBy(e.target.value)}
                  required
                  className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-primary">Payment Preference</label>
                <select
                  value={paymentPreference}
                  onChange={(e) => setPaymentPreference(e.target.value)}
                  className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm"
                >
                  <option>Bank transfer</option>
                  <option>Cheque</option>
                  <option>Credit terms (15 days)</option>
                  <option>Credit terms (30 days)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="rounded-[4px] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                  Publish Request
                </button>
              </div>
            </form>
          )}

          {myRequests.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No procurement requests yet.
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              <div className="space-y-2">
                {myRequests.map((r) => {
                  const count = store.quotes.filter((q) => q.requestId === r.id).length;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedId(r.id)}
                      className={cn(
                        "w-full rounded-xl border border-border bg-card p-4 text-left text-sm transition-colors",
                        selected?.id === r.id && "border-accent bg-secondary/60",
                      )}
                    >
                      <div className="font-semibold text-primary">{r.material}</div>
                      <div className="text-xs text-muted-foreground">
                        {r.quantity} {r.unit} · {r.deliveryLocation}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase",
                            r.status === "open" && "bg-brass-100 text-brass-600",
                            r.status === "awarded" && "bg-green-100 text-green-700",
                            r.status === "cancelled" && "bg-secondary text-muted-foreground",
                          )}
                        >
                          {r.status}
                        </span>
                        <span className="text-xs text-muted-foreground">{count} quotes</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selected && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-border pb-5">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-primary">
                        {selected.material} {selected.specification && `— ${selected.specification}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selected.quantity} {selected.unit} · Delivered to {selected.deliveryLocation} · Required by{" "}
                        {fmtDate(selected.requiredBy)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold uppercase",
                          selected.status === "open" && "bg-brass-100 text-brass-600",
                          selected.status === "awarded" && "bg-green-100 text-green-700",
                          selected.status === "cancelled" && "bg-secondary text-muted-foreground",
                        )}
                      >
                        {selected.status}
                      </span>
                      {selected.status === "open" && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm("Cancel this procurement request? Suppliers will no longer be able to quote on it.")) {
                              cancelRequest(selected.id);
                            }
                          }}
                          className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground hover:border-destructive hover:text-destructive"
                        >
                          <Ban className="h-3 w-3" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {selected.status === "cancelled" ? (
                    <div className="rounded-lg bg-secondary/60 p-5 text-sm text-muted-foreground">
                      This request was cancelled — suppliers can no longer quote on it.
                    </div>
                  ) : selectedQuotes.length === 0 ? (
                    <div className="flex items-center gap-2.5 rounded-lg bg-secondary/60 p-5 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Waiting for matched suppliers to respond — quotes typically arrive within moments.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                            <th className="pb-3 pr-4">Supplier</th>
                            <th className="pb-3 pr-4">Unit Price</th>
                            <th className="pb-3 pr-4">Freight</th>
                            <th className="pb-3 pr-4">Total Delivered</th>
                            <th className="pb-3 pr-4">ETA</th>
                            <th className="pb-3 pr-4">Terms</th>
                            <th className="pb-3" />
                          </tr>
                        </thead>
                        <tbody>
                          {selectedQuotes.map((q, i) => {
                            const supplier = store.users.find((u) => u.id === q.supplierId);
                            const total = q.unitPrice * selected.quantity + q.freight;
                            return (
                              <tr key={q.id} className="border-b border-border last:border-0">
                                <td className="py-3 pr-4">
                                  <div className="font-medium text-primary">{supplier?.company ?? "Supplier"}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {q.isSimulated ? "Example listing" : "Live quote"} · {q.stockNote}
                                  </div>
                                </td>
                                <td className="py-3 pr-4">{fmtINR(q.unitPrice)}</td>
                                <td className="py-3 pr-4">{fmtINR(q.freight)}</td>
                                <td className="py-3 pr-4 font-semibold text-primary">
                                  {fmtINR(total)}
                                  {i === 0 && (
                                    <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-[0.65rem] font-semibold text-green-700">
                                      Lowest
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 pr-4 flex items-center gap-1.5 text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5" />
                                  {q.etaDays}d
                                </td>
                                <td className="py-3 pr-4 text-muted-foreground">{q.paymentTerms}</td>
                                <td className="py-3">
                                  {selected.status === "open" ? (
                                    <button
                                      onClick={() => handleAccept(q.id)}
                                      className="flex items-center gap-1.5 rounded-[4px] bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                      Accept
                                    </button>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">—</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default function RequestsPage() {
  return (
    <DashboardShell requiredRole="contractor">
      <RequestsContent />
    </DashboardShell>
  );
}
