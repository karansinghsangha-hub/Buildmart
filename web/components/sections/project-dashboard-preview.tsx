export function ProjectDashboardPreview() {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-3">
        <span className="text-sm font-semibold text-primary">Example Project — Green Residency</span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-semibold uppercase text-muted-foreground">
          Example / Demo Data
        </span>
      </div>
      <div className="grid gap-px bg-border sm:grid-cols-4">
        <Metric label="Procurement" value="₹42.5L / ₹50L" />
        <Metric label="Potential Savings Identified" value="₹2.1L" />
        <Metric label="Orders" value="28" />
        <Metric label="Open Requests" value="3" />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-6 text-center">
      <div className="font-display text-xl font-semibold text-primary">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export default ProjectDashboardPreview;
