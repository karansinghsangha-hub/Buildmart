"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Finish = "standard" | "premium" | "luxury";
type ProjectType = "residential" | "commercial" | "industrial";

const finishRates: Record<Finish, number> = { standard: 1750, premium: 2400, luxury: 3400 };
const typeMultiplier: Record<ProjectType, number> = { residential: 1, commercial: 1.18, industrial: 1.3 };

const fmtINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export function Estimator() {
  const [area, setArea] = useState(1800);
  const [floors, setFloors] = useState(2);
  const [finish, setFinish] = useState<Finish>("premium");
  const [type, setType] = useState<ProjectType>("residential");

  const { total, low, high } = useMemo(() => {
    const rate = finishRates[finish];
    const mult = typeMultiplier[type];
    const base = area * rate * mult;
    const floorFactor = 1 + (floors - 1) * 0.06;
    const t = base * floorFactor;
    return { total: t, low: t * 0.92, high: t * 1.1 };
  }, [area, floors, finish, type]);

  return (
    <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 shadow-lg lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
      <div>
        <Field label="Built-up Area" value={`${area.toLocaleString("en-IN")} sq.ft`}>
          <input
            type="range"
            min={500}
            max={10000}
            step={100}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="gp-range"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>500 sq.ft</span>
            <span>10,000 sq.ft</span>
          </div>
        </Field>

        <Field label="Number of Floors" value={`${floors} ${floors === 1 ? "floor" : "floors"}`}>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={floors}
            onChange={(e) => setFloors(Number(e.target.value))}
            className="gp-range"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Ground</span>
            <span>G+5</span>
          </div>
        </Field>

        <Field label="Finish Grade">
          <ChipRow>
            {(["standard", "premium", "luxury"] as const).map((f) => (
              <Chip key={f} active={finish === f} onClick={() => setFinish(f)}>
                {f[0].toUpperCase() + f.slice(1)}
              </Chip>
            ))}
          </ChipRow>
        </Field>

        <Field label="Project Type" last>
          <ChipRow>
            {(["residential", "commercial", "industrial"] as const).map((t) => (
              <Chip key={t} active={type === t} onClick={() => setType(t)}>
                {t[0].toUpperCase() + t.slice(1)}
              </Chip>
            ))}
          </ChipRow>
        </Field>
      </div>

      <div className="flex flex-col rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 p-8 text-[#faf7f0]">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
          Ballpark Estimate
        </span>
        <div className="my-2 font-display text-4xl font-semibold text-brass-300">{fmtINR(total)}</div>
        <div className="mb-6 text-sm text-[#faf7f0]/55">
          {fmtINR(low)} – {fmtINR(high)} estimated range
        </div>

        <ul className="mb-7 flex-1 space-y-0.5">
          <Row label="Built-up area" value={`${area.toLocaleString("en-IN")} sq.ft`} />
          <Row label="Finish grade" value={`${finish[0].toUpperCase() + finish.slice(1)} (₹${finishRates[finish]}/sqft)`} />
          <Row label="Project type" value={type[0].toUpperCase() + type.slice(1)} />
          <Row label="Floor configuration" value={`${floors} × G+${floors - 1}`} />
        </ul>

        <Link
          href="/contact"
          className="rounded-[4px] bg-[#a9803f] px-6 py-3 text-center text-sm font-semibold text-[#241a08] transition-transform hover:-translate-y-0.5"
        >
          Get a Formal Quotation
        </Link>
      </div>

      <style>{`
        .gp-range { -webkit-appearance: none; width: 100%; height: 4px; background: var(--color-border); border-radius: 4px; outline: none; }
        .gp-range::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--color-primary); border: 3px solid var(--color-brass-300); cursor: pointer; box-shadow: 0 2px 8px rgba(16,20,28,.3); }
        .gp-range::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: var(--color-primary); border: 3px solid var(--color-brass-300); cursor: pointer; }
      `}</style>
    </div>
  );
}

function Field({
  label,
  value,
  last,
  children,
}: {
  label: string;
  value?: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mb-8", last && "mb-0")}>
      <div className="mb-3 flex items-baseline justify-between text-sm font-semibold text-primary">
        <span>{label}</span>
        {value && <span className="font-display text-base text-accent">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function ChipRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors",
        active && "border-primary bg-primary text-primary-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between border-b border-white/10 py-2.5 text-sm text-[#faf7f0]/75">
      <span>{label}</span>
      <span className="font-semibold text-[#faf7f0]">{value}</span>
    </li>
  );
}

export default Estimator;
