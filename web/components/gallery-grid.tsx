"use client";

import { useState } from "react";
import { gallery } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const categories = ["All", "Residential", "Commercial", "Industrial"] as const;

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors",
              filter === cat && "border-primary bg-primary text-primary-foreground",
            )}
          >
            {cat === "All" ? "All Projects" : cat}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="group relative aspect-[4/3.1] overflow-hidden rounded-2xl border border-border"
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br", item.tone)} />
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-950/95 via-navy-950/10 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="mb-2 inline-block w-fit rounded-full border border-brass-300/40 px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-brass-300">
                {item.category}
              </span>
              <h4 className="text-base font-semibold text-[#faf7f0]">{item.name}</h4>
              <span className="text-sm text-[#faf7f0]/60">{item.place}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryGrid;
