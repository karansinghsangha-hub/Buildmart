import Link from "next/link";
import { ArrowRight, Search, ArrowLeftRight, Gavel, ClipboardCheck, Truck } from "lucide-react";
import { solutionSteps } from "@/lib/site-data";

const icons = [Search, ArrowLeftRight, Gavel, ClipboardCheck, Truck];

/**
 * Sits directly beneath <HomeHero>, sharing its navy background so the
 * scroll continues seamlessly from the hero's final (fully navy) frame
 * into this section — the same seamless-continuation trick the previous
 * (now-removed) achievements section used.
 */
export function Solution() {
  return (
    <section className="bg-navy-950 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-300 before:h-px before:w-6 before:bg-brass-300 after:h-px after:w-6 after:bg-brass-300">
            The Loop
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-[#faf7f0] sm:text-3xl">
            One platform for the entire procurement cycle.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {solutionSteps.map((s, i) => {
            const Icon = icons[i];
            return (
              <div key={s.step} className="rounded-2xl border border-brass-300/25 bg-gradient-to-br from-navy-900 to-navy-950 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-brass-300/60 text-brass-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-display text-base font-semibold text-[#faf7f0]">{s.step}</h3>
                <p className="text-sm text-[#faf7f0]/65">{s.copy}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 rounded-[4px] bg-[#a9803f] px-7 py-3 text-sm font-semibold text-[#241a08] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Explore the Marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Solution;
