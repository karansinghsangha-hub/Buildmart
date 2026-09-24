"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Landmark, HandCoins } from "lucide-react";
import GlyphPortal, { type GlyphPortalStyle } from "@/components/ui/glyph-portal";
import { fraunces } from "@/lib/fonts";

// GlyphPortal checks whether its requested font is already downloaded the
// instant it mounts — if not, it permanently disables the scroll animation
// for that page view (its own comment: "A pending requested face may also
// hold WebKit's render loop. Keep that mount static."). On a fresh visit,
// Fraunces is very often still downloading at that exact moment, so the
// component must not mount until the font is confirmed ready — the same
// gating the reference demo does with its own FontFace() + timeout.
const FRAUNCES_BOLD = `700 100px ${fraunces.style.fontFamily}`;
const SAFE_FALLBACK_FONT = '"Arial Black", Arial, sans-serif';

// BuildMart's own palette for the portal, in place of the component's default
// green: the field you zoom into is the same deep navy used for the hero and
// testimonials sections elsewhere on the site, with brass/cream ink — so the
// portal reads as one continuous brand instead of a borrowed demo color.
const portalStyle: GlyphPortalStyle = {
  "--gp-paper": "#faf7f0",
  "--gp-ink": "#171b20",
  "--gp-field": "#0c1420",
  "--gp-foreground": "#faf7f0",
};

// The component's built-in default fill is a hardcoded green gradient — it
// doesn't read --gp-field, so it has to be replaced explicitly to get the
// navy portal. Same radial-highlight construction as the default, re-toned.
const navyField = (
  <div
    aria-hidden
    className="absolute inset-0"
    style={{
      transform: "scale(var(--gp-field-scale,1))",
      background:
        "radial-gradient(circle at 18% 8%, rgba(169,128,63,.35), transparent 34%), radial-gradient(circle at 82% 20%, rgba(216,185,120,.14), transparent 28%), radial-gradient(circle at 48% 78%, rgba(16,26,41,.6), transparent 44%), linear-gradient(135deg,#0c1420 0%,#16243a 48%,#0a1119 100%)",
    }}
  />
);

export function HomeHero() {
  // null = still waiting; otherwise the confirmed-available family to hand
  // to GlyphPortal — Fraunces on success, a safe system stack on timeout,
  // so a slow/blocked font degrades gracefully instead of freezing the
  // animation (mirrors the reference demo's finish(family)/finish("Arial…")).
  const [portalFont, setPortalFont] = useState<string | null>(null);

  useEffect(() => {
    let settled = false;
    const finish = (family: string) => {
      if (!settled) {
        settled = true;
        setPortalFont(family);
      }
    };
    const timeout = window.setTimeout(() => finish(SAFE_FALLBACK_FONT), 1600);
    document.fonts.load(FRAUNCES_BOLD).then(
      () => finish(fraunces.style.fontFamily),
      () => finish(SAFE_FALLBACK_FONT),
    );
    return () => {
      settled = true;
      clearTimeout(timeout);
    };
  }, []);

  if (!portalFont) {
    return (
      <div
        role="status"
        className="grid h-svh place-items-center bg-navy-950 text-sm text-[#faf7f0]/50"
      >
        Loading…
      </div>
    );
  }

  return (
    <GlyphPortal
      word="BUILDMART"
      interactive
      annotations={false}
      scrollLength={2.2}
      fontFamily={portalFont}
      fontWeight={700}
      enterLabel="Enter BuildMart"
      style={portalStyle}
      background={navyField}
      front={
        <div className="flex h-full flex-col items-center justify-start px-6 pt-16 text-center sm:pt-24">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a9803f] before:h-px before:w-6 before:bg-[#a9803f] after:h-px after:w-6 after:bg-[#a9803f]">
            Est. 2019 · Built on Trust
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight text-[#171b20] sm:text-4xl">
            We build spaces that outlast the blueprint.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-balance text-sm text-[#171b20]/65">
            Scroll to step through the &ldquo;M&rdquo; — or pick any letter below — and
            into BuildMart&apos;s story.
          </p>
        </div>
      }
    >
      {/* Revealed once the scroll finishes entering the portal — real content
          with real navigation, not a dead-end landing screen. */}
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 py-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-300 before:h-px before:w-6 before:bg-brass-300 after:h-px after:w-6 after:bg-brass-300">
            Recognition
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-[#faf7f0] sm:text-3xl">
            A young company, already validated.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <AchievementCard
            icon={<Award className="h-5 w-5" />}
            title="Top 100 of 1,00,000+ Teams"
            copy="Selected in the Top 100 at Youth Ideathon 2025, shortlisted from over one lakh participating teams nationwide."
            tag="Youth Ideathon · 2025"
          />
          <AchievementCard
            icon={<Landmark className="h-5 w-5" />}
            title="Pitched Live at IIT Delhi"
            copy="Presented BuildMart's model on-campus at IIT Delhi to a panel of investors and industry mentors."
            tag="IIT Delhi · National Finale"
          />
          <AchievementCard
            icon={<HandCoins className="h-5 w-5" />}
            title="Investor Interest Secured"
            copy="Multiple investors expressed formal interest in backing BuildMart following the IIT Delhi showcase."
            tag="Early-stage Backing · 2025"
          />
        </div>

        <div className="grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
          <QuickLink href="/about" label="Our Story" copy="Six years, one discipline: build it right." />
          <QuickLink href="/services#estimator" label="Estimate a Project" copy="Live range-slider cost calculator." />
          <QuickLink href="/contact" label="Book a Consultation" copy="Talk to an engineer, free of charge." />
        </div>

        <div className="flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-[4px] bg-[#a9803f] px-7 py-3 text-sm font-semibold text-[#241a08] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Explore All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </GlyphPortal>
  );
}

function AchievementCard({
  icon,
  title,
  copy,
  tag,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  tag: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-brass-300/25 bg-gradient-to-br from-navy-900 to-navy-950 p-7">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-brass-300/60 text-brass-300">
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold text-[#faf7f0]">{title}</h3>
      <p className="text-sm text-[#faf7f0]/65">{copy}</p>
      <span className="mt-4 inline-block rounded-full border border-brass-300/40 px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-brass-300">
        {tag}
      </span>
    </div>
  );
}

function QuickLink({ href, label, copy }: { href: string; label: string; copy: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-xl border border-white/10 p-5 transition-colors hover:border-brass-300/50"
    >
      <div>
        <span className="text-sm font-semibold text-[#faf7f0]">{label}</span>
        <p className="mt-1.5 text-sm text-[#faf7f0]/60">{copy}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brass-300">
        Go
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export default HomeHero;
