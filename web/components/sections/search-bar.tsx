"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight } from "lucide-react";

const examples = ["Cement", "TMT steel", "Bricks", "Sand", "AAC blocks", "Ready-mix concrete"];

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    router.push(`/marketplace${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={submit} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg sm:flex-row">
        <div className="relative flex-[2]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you need for your project?"
            className="w-full rounded-[4px] border border-transparent bg-transparent py-3 pl-10 pr-3 text-sm focus:border-accent focus:outline-none"
          />
        </div>
        <div className="relative flex-1 border-t border-border pt-3 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:left-6" />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Project location"
            className="w-full rounded-[4px] border border-transparent bg-transparent py-3 pl-10 pr-3 text-sm focus:border-accent focus:outline-none sm:pl-9"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-[4px] bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
        >
          Find Suppliers
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
        {examples.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setQuery(e)}
            className="rounded-full border border-border px-3 py-1 hover:border-accent hover:text-primary"
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
