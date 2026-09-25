import { howItWorks } from "@/lib/site-data";

export function HowItWorks() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {howItWorks.map((step) => (
        <div key={step.no} className="pt-2">
          <span className="mb-2 block font-display text-4xl font-bold text-transparent [-webkit-text-stroke:1px_var(--color-brass-300)]">
            {step.no}
          </span>
          <h4 className="mb-1.5 text-base font-semibold text-primary">{step.title}</h4>
          <p className="text-sm text-muted-foreground">{step.copy}</p>
        </div>
      ))}
    </div>
  );
}

export default HowItWorks;
