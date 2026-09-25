"use client";

import Link from "next/link";
import { FolderKanban, FileText, PackageCheck, ArrowRight } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { useStore } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { fmtINR } from "@/lib/format";

// Only ever rendered as DashboardShell's child, once it has confirmed a
// signed-in contractor exists — safe to assume `user` is non-null here.
function ContractorOverviewContent() {
  const user = useCurrentUser()!;
  const store = useStore();

  const myProjects = store.projects.filter((p) => p.contractorId === user.id);
  const myRequests = store.requests.filter((r) => r.contractorId === user.id);
  const myOrders = store.orders.filter((o) => o.contractorId === user.id);
  const openRequests = myRequests.filter((r) => r.status === "open");
  const totalSpend = myOrders.reduce((sum, o) => sum + o.totalInr, 0);

  return (
    <>
      <DashboardPageHeader
        title={`Welcome back, ${user.name.split(" ")[0]}.`}
        description="Your procurement activity across every project."
        action={
          <Link
            href="/dashboard/contractor/requests"
            className="rounded-[4px] bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            Post a Procurement Request
          </Link>
        }
      />

      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Projects" value={String(myProjects.length)} icon={<FolderKanban className="h-5 w-5" />} />
        <StatCard label="Open Requests" value={String(openRequests.length)} icon={<FileText className="h-5 w-5" />} />
        <StatCard label="Orders Placed" value={String(myOrders.length)} icon={<PackageCheck className="h-5 w-5" />} />
        <StatCard label="Total Procured" value={fmtINR(totalSpend)} icon={<PackageCheck className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-primary">My Projects</h3>
            <Link href="/dashboard/contractor/projects" className="text-sm font-semibold text-accent">
              View all
            </Link>
          </div>
          {myProjects.length === 0 ? (
            <EmptyState text="No projects yet." href="/dashboard/contractor/projects" cta="Create your first project" />
          ) : (
            <ul className="space-y-3">
              {myProjects.slice(0, 4).map((p) => (
                <li key={p.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm">
                  <div>
                    <div className="font-medium text-primary">{p.name}</div>
                    <div className="text-muted-foreground">{p.location}</div>
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold capitalize text-muted-foreground">
                    {p.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-primary">Recent Requests</h3>
            <Link href="/dashboard/contractor/requests" className="text-sm font-semibold text-accent">
              View all
            </Link>
          </div>
          {myRequests.length === 0 ? (
            <EmptyState text="No procurement requests yet." href="/dashboard/contractor/requests" cta="Post your first request" />
          ) : (
            <ul className="space-y-3">
              {myRequests.slice(0, 4).map((r) => {
                const quoteCount = store.quotes.filter((q) => q.requestId === r.id).length;
                return (
                  <li key={r.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm">
                    <div>
                      <div className="font-medium text-primary">
                        {r.material} · {r.quantity} {r.unit}
                      </div>
                      <div className="text-muted-foreground">
                        {quoteCount} quote{quoteCount === 1 ? "" : "s"} received
                      </div>
                    </div>
                    <Link href="/dashboard/contractor/requests" className="text-accent">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
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

function EmptyState({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border p-6 text-center">
      <p className="mb-3 text-sm text-muted-foreground">{text}</p>
      <Link href={href} className="text-sm font-semibold text-accent">
        {cta} →
      </Link>
    </div>
  );
}

export default function ContractorDashboardPage() {
  return (
    <DashboardShell requiredRole="contractor">
      <ContractorOverviewContent />
    </DashboardShell>
  );
}
