"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Radar, Users, Package, RotateCcw } from "lucide-react";
import { useStore } from "@/lib/store";
import { INDIA_CITIES, findCity, distanceKm, type IndiaCity } from "@/lib/india-cities";
import type { MapPoint } from "@/components/map/leaflet-range-map";

const LeafletRangeMap = dynamic(() => import("@/components/map/leaflet-range-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-navy-950 text-sm text-[#faf7f0]/50">
      Loading map…
    </div>
  ),
});

const RANGE_PRESETS = [25, 50, 100, 200, 400];

const SORTED_CITIES = [...INDIA_CITIES].sort((a, b) => a.name.localeCompare(b.name));

export function RangeFinder() {
  const store = useStore();
  const [cityName, setCityName] = useState<string>("Gurugram");
  const [rangeKm, setRangeKm] = useState(100);

  const selected: IndiaCity | null = useMemo(() => findCity(cityName), [cityName]);

  const { suppliers, contractors } = useMemo(() => {
    const allSuppliers: MapPoint[] = [];
    const allContractors: MapPoint[] = [];

    for (const u of store.users) {
      const city = findCity(u.city);
      if (!city) continue;

      if (u.role === "supplier") {
        const profile = store.supplierProfiles.find((p) => p.userId === u.id);
        const productCount = store.products.filter((p) => p.supplierId === u.id).length;
        allSuppliers.push({ user: u, lat: city.lat, lng: city.lng, profile, productCount });
      } else {
        const revenue = store.orders
          .filter((o) => o.contractorId === u.id)
          .reduce((sum, o) => sum + o.totalInr, 0);
        allContractors.push({ user: u, lat: city.lat, lng: city.lng, revenue });
      }
    }

    if (!selected) return { suppliers: allSuppliers, contractors: allContractors };

    const within = (p: MapPoint) => distanceKm(selected, { lat: p.lat, lng: p.lng }) <= rangeKm;
    return {
      suppliers: allSuppliers.filter(within),
      contractors: allContractors.filter(within),
    };
  }, [store, selected, rangeKm]);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
      <div className="grid lg:grid-cols-[340px_1fr]">
        {/* ---------------------------------------------------------- controls */}
        <div className="flex flex-col gap-6 border-b border-border p-6 lg:border-b-0 lg:border-r">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              <Radar className="h-3.5 w-3.5" />
              Range Finder
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">
              Who&apos;s building near you?
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Pick a city and a range — the map centers there and shows every supplier and contractor on
              BuildMart within it.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">City</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                className="w-full appearance-none rounded-[4px] border border-border bg-background py-2.5 pl-9 pr-3 text-sm focus:border-accent focus:outline-none"
              >
                {SORTED_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}, {c.state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-semibold text-primary">Range</label>
              <span className="font-display text-lg text-accent">{rangeKm} km</span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={rangeKm}
              onChange={(e) => setRangeKm(Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {RANGE_PRESETS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRangeKm(r)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                    rangeKm === r
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-accent"
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1.5 text-accent">
                <Package className="h-3.5 w-3.5" />
              </div>
              <div className="font-display text-xl font-semibold text-primary">{suppliers.length}</div>
              <div className="text-[0.7rem] text-muted-foreground">Suppliers in range</div>
            </div>
            <div className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1.5 text-primary">
                <Users className="h-3.5 w-3.5" />
              </div>
              <div className="font-display text-xl font-semibold text-primary">{contractors.length}</div>
              <div className="text-[0.7rem] text-muted-foreground">Contractors in range</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setCityName("Gurugram");
              setRangeKm(100);
            }}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-border pt-4 text-[0.7rem] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-[#faf7f0]" style={{ background: "#a9803f" }} />
              Supplier
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rotate-45 border border-[#faf7f0]" style={{ background: "#101a29" }} />
              Contractor
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full border border-[#faf7f0]" style={{ background: "#d8b978" }} />
              Search center
            </span>
          </div>
        </div>

        {/* --------------------------------------------------------------- map */}
        <div className="h-[420px] lg:h-[560px]">
          <LeafletRangeMap selected={selected} rangeKm={rangeKm} suppliers={suppliers} contractors={contractors} />
        </div>
      </div>
    </div>
  );
}

export default RangeFinder;
