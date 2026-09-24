import type { Metadata } from "next";
import { ShieldCheck, Clock, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { timeline, stats, team } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About BuildMart — Our Story, Team & Milestones",
  description:
    "From a founder-led site office in 2019 to a Youth Ideathon 2025 Top 100 finalist showcased at IIT Delhi — the BuildMart story.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Fixed-Price Honesty",
    copy: "The quote you sign is the quote you pay — cost overruns are on us, not you.",
  },
  {
    icon: Clock,
    title: "Timelines We Keep",
    copy: "A 98% on-time record across 187+ handovers, backed by weekly progress reporting.",
  },
  {
    icon: Users,
    title: "Engineers, Not Just Contractors",
    copy: "Every site is led by a qualified civil engineer — not a subcontracted middleman.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />

      <main>
        {/* --------------------------------------------------------- hero */}
        <section className="bg-gradient-to-b from-navy-950 to-navy-900 px-6 py-16 text-[#faf7f0]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex gap-2 text-sm text-[#faf7f0]/55">
              <span>Home</span> <span>/</span> <span>About</span>
            </div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
              Six years. One discipline: build it right.
            </h1>
            <p className="mt-2 max-w-2xl text-[#faf7f0]/65">
              BuildMart began as a two-person site office in 2019. Today we&apos;re a
              recognised design-build studio — validated on a national stage in 2025.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- story */}
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Our Story
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">
                Formality is not a formality to us.
              </h2>
              <p className="mt-5 text-muted-foreground">
                We were founded on a simple frustration: construction in India is
                rarely delivered the way it&apos;s promised. BuildMart was built to
                change that — formal contracts, fixed-price transparency, and
                engineers who answer the phone.
              </p>
              <p className="mt-4 text-muted-foreground">
                In 2025, that discipline was recognised well beyond the job site.
                BuildMart was selected in the <strong className="text-primary">Top 100</strong> of
                more than <strong className="text-primary">1,00,000 participating teams</strong> at
                the <strong className="text-primary">Youth Ideathon 2025</strong> national
                competition. As part of the finale cohort, our founders travelled
                to <strong className="text-primary">IIT Delhi</strong> to pitch the BuildMart
                model directly to a panel of industry mentors and investors — a
                showcase that opened conversations with{" "}
                <strong className="text-primary">multiple investors</strong> now
                exploring backing the company&apos;s next phase of growth.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-7">
                  <strong className="block font-display text-3xl text-primary">{s.value}</strong>
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ timeline */}
        <section id="timeline" className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Milestones
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">
                The journey so far.
              </h2>
            </div>
            <div className="relative pl-9">
              <div className="absolute left-[7px] top-1.5 bottom-1.5 w-0.5 bg-gradient-to-b from-brass-300 to-border" />
              {timeline.map((item, i) => (
                <div key={item.year} className={i !== timeline.length - 1 ? "relative pb-11" : "relative"}>
                  <div className="absolute -left-9 top-1 h-4 w-4 rounded-full border-[3px] border-accent bg-background" />
                  <div className="font-display text-lg font-bold text-accent">{item.year}</div>
                  <h4 className="mb-1.5 mt-1 text-base font-semibold text-primary">{item.title}</h4>
                  <p className="max-w-[58ch] text-sm text-muted-foreground">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- values */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                What Guides Us
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">
                Three principles, no exceptions.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="rounded-2xl border border-border bg-card p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-brass-300">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-primary">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- team */}
        <section id="team" className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Leadership
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">
                The people behind the blueprint.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="mb-4 aspect-square rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950" />
                  <h4 className="text-base font-semibold text-primary">{member.name}</h4>
                  <span className="text-sm font-semibold text-accent">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
