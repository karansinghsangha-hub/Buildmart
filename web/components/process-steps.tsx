const steps = [
  { no: "01", title: "Consultation & Survey", copy: "Site visit, soil testing and requirement mapping with our architects." },
  { no: "02", title: "Design & Approval", copy: "3D drawings, structural plans and municipal approvals handled in-house." },
  { no: "03", title: "Execution", copy: "Dedicated site engineer, weekly reporting and quality checkpoints." },
  { no: "04", title: "Handover", copy: "Final inspection, documentation and a 5-year structural warranty." },
];

export function ProcessSteps() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
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

export default ProcessSteps;
