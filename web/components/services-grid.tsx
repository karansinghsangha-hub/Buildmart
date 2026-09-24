import Link from "next/link";
import { ArrowRight, Home, Building2, Factory, Ruler, Hammer, ClipboardList } from "lucide-react";
import { services } from "@/lib/site-data";

const icons = [Home, Building2, Factory, Ruler, Hammer, ClipboardList];

export function ServicesGrid({ limit }: { limit?: number }) {
  const items = limit ? services.slice(0, limit) : services;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div
            key={service.title}
            className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1.5 hover:border-brass-300 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-brass-300">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-primary">{service.title}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{service.copy}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
            >
              Request a quote
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="mt-4 border-t border-dashed border-border pt-4 text-sm text-muted-foreground">
              Starting from <strong className="font-display text-base text-primary">{service.price}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ServicesGrid;
