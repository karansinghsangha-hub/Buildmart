import { Plus, Equal } from "lucide-react";

export function CostIntelligence() {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 sm:flex-nowrap">
      <CostTile label="Supplier Price" value="₹48,000" sub="Material only" />
      <Plus className="h-5 w-5 flex-none text-muted-foreground" />
      <CostTile label="Freight" value="₹8,000" sub="Transport to site" />
      <Equal className="h-5 w-5 flex-none text-muted-foreground" />
      <CostTile label="Actual Procurement Cost" value="₹56,000" sub="What you actually pay" featured />
    </div>
  );
}

function CostTile({ label, value, sub, featured }: { label: string; value: string; sub: string; featured?: boolean }) {
  return (
    <div
      className={
        featured
          ? "flex-1 rounded-2xl border border-accent bg-gradient-to-br from-brass-300/15 to-card p-6 text-center shadow-md"
          : "flex-1 rounded-2xl border border-border bg-card p-6 text-center"
      }
    >
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={featured ? "font-display text-2xl font-semibold text-accent" : "font-display text-2xl font-semibold text-primary"}>
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

export default CostIntelligence;
