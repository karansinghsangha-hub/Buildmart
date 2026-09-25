"use client";

// The actual Leaflet map. Kept in its own file and always loaded via
// next/dynamic({ ssr: false }) from range-finder.tsx — Leaflet touches
// `window`/`document` on import, which doesn't exist during the static
// export's build-time render.
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { INDIA_CENTER, type IndiaCity } from "@/lib/india-cities";
import { fmtINR } from "@/lib/format";
import type { SupplierProfile, UserAccount } from "@/lib/types";

export interface MapPoint {
  user: UserAccount;
  lat: number;
  lng: number;
  profile?: SupplierProfile;
  productCount?: number;
  revenue?: number;
}

function pinIcon(kind: "supplier" | "contractor" | "center") {
  const color = kind === "supplier" ? "#a9803f" : kind === "contractor" ? "#101a29" : "#d8b978";
  const size = kind === "center" ? 22 : 16;
  const ring = kind === "center" ? "0 0 0 6px rgba(216,185,120,0.25)" : "0 1px 4px rgba(0,0,0,0.4)";
  return L.divIcon({
    className: "bm-marker",
    html: `<span style="
      display:block;
      width:${size}px;height:${size}px;
      background:${color};
      border:2px solid #faf7f0;
      border-radius:${kind === "contractor" ? "6px" : "50%"};
      box-shadow:${ring};
      transform:rotate(${kind === "contractor" ? "45deg" : "0deg"});
    "></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const supplierIcon = pinIcon("supplier");
const contractorIcon = pinIcon("contractor");
const centerIcon = pinIcon("center");

function FlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.1 });
  }, [map, center, zoom]);
  return null;
}

export default function LeafletRangeMap({
  selected,
  rangeKm,
  suppliers,
  contractors,
}: {
  selected: IndiaCity | null;
  rangeKm: number;
  suppliers: MapPoint[];
  contractors: MapPoint[];
}) {
  const center: [number, number] = selected ? [selected.lat, selected.lng] : [INDIA_CENTER.lat, INDIA_CENTER.lng];
  const zoom = useMemo(() => {
    if (!selected) return 5;
    if (rangeKm <= 25) return 10;
    if (rangeKm <= 50) return 9;
    if (rangeKm <= 100) return 8;
    if (rangeKm <= 200) return 7;
    if (rangeKm <= 400) return 6;
    return 5;
  }, [selected, rangeKm]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      className="h-full w-full"
      style={{ background: "#0c1420" }}
    >
      <FlyTo center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {selected && (
        <>
          <Circle
            center={[selected.lat, selected.lng]}
            radius={rangeKm * 1000}
            pathOptions={{ color: "#d8b978", fillColor: "#d8b978", fillOpacity: 0.08, weight: 1.5 }}
          />
          <Marker position={[selected.lat, selected.lng]} icon={centerIcon}>
            <Popup>
              <strong>{selected.name}</strong>
              <br />
              Search center &middot; {rangeKm} km range
            </Popup>
          </Marker>
        </>
      )}

      {suppliers.map((p) => (
        <Marker key={p.user.id} position={[p.lat, p.lng]} icon={supplierIcon}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong>{p.user.company}</strong>
              <div style={{ fontSize: 12, color: "#6b6355", margin: "2px 0 6px" }}>
                Supplier &middot; {p.user.city}
              </div>
              {p.profile && (
                <>
                  <div style={{ fontSize: 12 }}>{p.profile.categories.join(", ") || "No categories listed"}</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    Delivers within {p.profile.deliveryRadiusKm} km &middot;{" "}
                    <span style={{ textTransform: "capitalize" }}>{p.profile.verification}</span>
                  </div>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {contractors.map((p) => (
        <Marker key={p.user.id} position={[p.lat, p.lng]} icon={contractorIcon}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong>{p.user.company}</strong>
              <div style={{ fontSize: 12, color: "#6b6355", margin: "2px 0 6px" }}>
                Contractor &middot; {p.user.city}
              </div>
              {typeof p.revenue === "number" && p.revenue > 0 && (
                <div style={{ fontSize: 12 }}>Procured to date: {fmtINR(p.revenue)}</div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
