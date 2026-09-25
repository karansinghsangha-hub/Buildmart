"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * HomeHero — a scroll-driven zoom into "BUILDMART".
 *
 * This replaces an earlier version built on the third-party GlyphPortal
 * component (components/ui/glyph-portal.tsx, still in the repo but no
 * longer used here). That component's own font-availability check could
 * silently and permanently disable its animation for a whole page view,
 * and its letter-picker + "skip" escape hatch added UI nobody asked for.
 * This version is a plain scroll listener driving CSS transform/opacity —
 * no font-load race, no hidden disable switch, no letter picker, nothing
 * to click that skips it.
 *
 * prefers-reduced-motion renders a completely separate, static component
 * (StaticHero below) rather than sharing state with the animated one. An
 * earlier version tried to reuse one code path for both by forcing the
 * scroll "progress" value to 1 for reduced-motion users — intending to
 * show the settled end frame, but 1 is this component's *fully zoomed in*
 * state, where the word has faded out and only the navy field is left.
 * That showed a blank navy panel with no word, permanently, for anyone
 * with reduced motion on (a common Windows setting, not a rare one) —
 * indistinguishable from the whole hero being broken. Splitting the two
 * modes into separate components means neither can leak the other's
 * numeric state into the wrong visual frame again.
 */

const PIN_HEIGHTS = 2.2; // scroll travel, in viewport heights

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function OpeningCopy({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="absolute inset-x-0 top-0 flex flex-col items-center gap-3 px-6 pt-16 text-center sm:pt-24"
      style={style}
    >
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a9803f] before:h-px before:w-6 before:bg-[#a9803f] after:h-px after:w-6 after:bg-[#a9803f]">
        Est. 2019 · Built on Trust
      </span>
      <h1 className="max-w-2xl text-balance font-display text-2xl font-semibold tracking-tight text-[#171b20] sm:text-4xl">
        We build spaces that outlast the blueprint.
      </h1>
      <p className="mx-auto hidden max-w-md text-sm text-[#171b20]/65 sm:block">
        Scroll down to step inside BuildMart.
      </p>
    </div>
  );
}

function TheWord({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
      <span
        className="select-none whitespace-nowrap font-display font-bold text-navy-950"
        style={{ fontSize: "clamp(2.75rem, 11vw, 8.5rem)", willChange: "transform, opacity", ...style }}
      >
        BUILDMART
      </span>
    </div>
  );
}

/** No scroll-jacking, no transform/opacity animation — a plain static hero. */
function StaticHero() {
  return (
    <section className="relative flex h-svh flex-col items-center justify-center overflow-hidden bg-[#faf7f0] px-4">
      <OpeningCopy />
      <TheWord />
    </section>
  );
}

function AnimatedHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      // A degenerate/zero travel distance safely means "show the opening
      // frame" (0), never "show the fully zoomed frame" (1) — landing on 1
      // by default is what made an earlier version of this look identical
      // to a broken/blank hero whenever this math went sideways.
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      setProgress(Number.isFinite(p) ? p : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Re-measure once more shortly after mount: web fonts finishing their
    // swap can reflow the page and shift this section, which the resize
    // listener alone won't catch since window size itself didn't change.
    const settleTimer = window.setTimeout(measure, 400);
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(settleTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const p = progress;
  const scale = 1 + p * 15;
  const wordOpacity = 1 - smoothstep(0.3, 0.55, p);
  const navyOpacity = smoothstep(0.1, 0.48, p);
  const gridOpacity = smoothstep(0.25, 0.6, p) * 0.8;
  const frontOpacity = 1 - smoothstep(0.02, 0.15, p);
  const frontShift = smoothstep(0, 0.2, p) * -18;

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${PIN_HEIGHTS * 100}vh` }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-[#faf7f0]">
        {/* navy fill, grows in behind the word as you scroll */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-950"
          style={{ opacity: navyOpacity }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            opacity: gridOpacity,
            backgroundImage:
              "linear-gradient(rgba(216,185,120,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,120,.5) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <OpeningCopy style={{ opacity: frontOpacity, transform: `translateY(${frontShift}px)` }} />
        <TheWord style={{ transform: `scale(${scale})`, opacity: wordOpacity }} />

        {/* scroll cue — a hint, not a button; nothing here skips the animation */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#171b20]/45"
          style={{ opacity: frontOpacity }}
        >
          Scroll
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export function HomeHero() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return reducedMotion ? <StaticHero /> : <AnimatedHero />;
}

export default HomeHero;
