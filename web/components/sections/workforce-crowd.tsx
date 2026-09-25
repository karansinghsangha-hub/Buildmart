"use client";

import { CrowdCanvas } from "@/components/ui/skiper39";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * WorkforceCrowd — BuildMart's site-workforce showcase.
 *
 * Wraps the Skiper39 CrowdCanvas primitive (components/ui/skiper39.tsx) in
 * BuildMart's navy/brass design language. The canvas keeps the exact
 * animation engine from the source component; only the surrounding
 * presentation (copy, palette, layout) is ours.
 */

export function WorkforceCrowd() {
  // rows/cols must stay 15×7 always — that's the source sprite sheet's
  // actual grid, and slicing it any other way corrupts the artwork rather
  // than showing fewer, cleanly-cropped people. What actually reads as
  // "crowded" on a ~390px phone is the full 105-person headcount packed
  // into that width, so cut the headcount itself via maxConcurrent
  // (a BuildMart addition to CrowdCanvas — see skiper39.tsx) instead.
  const narrow = useMediaQuery("(max-width: 639px)");
  const maxConcurrent = narrow ? 20 : undefined;

  return (
    <section className="relative h-[720px] w-full overflow-hidden bg-navy-950 text-[#faf7f0]">
      {/* subtle blueprint grid, consistent with the rest of the BuildMart site */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(216,185,120,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,120,.5) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 50% 0%, rgba(169,128,63,.16), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-4 px-6 pt-20 text-center sm:pt-24">
        {/* On narrow screens the crowd sits closer behind this text (fewer,
            larger-relative figures), so give it a soft scrim to guarantee
            the heading stays legible; desktop doesn't need it. */}
        <div className="mx-auto -mx-4 rounded-2xl bg-navy-950/55 px-4 py-3 backdrop-blur-[2px] sm:mx-auto sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
          <span className="mx-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-300 before:h-px before:w-6 before:bg-brass-300 after:h-px after:w-6 after:bg-brass-300">
            On Every Site, Every Day
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#faf7f0] sm:mt-0 sm:text-5xl">
            The hands behind every handover.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-balance text-sm text-[#faf7f0]/65 sm:mt-0 sm:text-base">
            Engineers, site supervisors and skilled craftsmen — over{" "}
            <span className="font-semibold text-brass-300">1,200 people</span>{" "}
            working across BuildMart&apos;s 42+ active sites right now.
          </p>
        </div>
      </div>

      {/* the actual crowd-canvas primitive, full width along the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-full w-full">
        <CrowdCanvas
          key={narrow ? "mobile" : "desktop"}
          src="https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png"
          rows={15}
          cols={7}
          maxConcurrent={maxConcurrent}
        />
      </div>

      {/* soft ground shadow so the walking crowd reads as standing on a floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            "linear-gradient(0deg, rgba(12,20,32,.9), transparent)",
        }}
      />
    </section>
  );
}

export default WorkforceCrowd;
