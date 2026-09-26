import type { Metadata } from "next";
import { Eye, Target, ShieldCheck, Zap, MapPin, Cpu, Award } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About BuildMart",
  description: "Why BuildMart exists: bringing modern marketplace technology and structured procurement to construction.",
};

const values = [
  { icon: ShieldCheck, title: "Transparency", copy: "Make costs and terms easier to understand." },
  { icon: Zap, title: "Efficiency", copy: "Reduce unnecessary procurement friction." },
  { icon: MapPin, title: "Locality", copy: "Use proximity intelligently — distance affects real economics." },
  { icon: Award, title: "Trust", copy: "Build supplier reputation through verification and transaction history." },
  { icon: Cpu, title: "Technology", copy: "Turn fragmented procurement data into useful intelligence." },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />

      <main>
        <section className="bg-gradient-to-b from-navy-950 to-navy-900 px-6 py-16 text-[#faf7f0]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex gap-2 text-sm text-[#faf7f0]/55">
              <span>Home</span> <span>/</span> <span>About</span>
            </div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">Why BuildMart exists.</h1>
            <p className="mt-2 max-w-2xl text-[#faf7f0]/65">
              Construction is one of the world&apos;s largest industries, but procurement remains fragmented.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-muted-foreground">
              A contractor buying materials for a project typically juggles a dozen suppliers by phone and WhatsApp,
              with no easy way to compare the <em>true delivered cost</em> — material price plus freight — across
              them. Prices vary block by block, quantity discovery happens one call at a time, and there&apos;s
              rarely a structured record of what was ordered or from whom.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              BuildMart was created to bring modern marketplace technology, location intelligence and structured
              procurement into construction — starting with the materials themselves.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Founded in 2025 by <strong className="text-primary">Karan Singh Sangha</strong>, Founder &amp; CEO,
              and headquartered in Hyderabad, Telangana.
            </p>

            <div className="mt-12 rounded-2xl border border-accent/30 bg-brass-100/40 p-6 text-sm text-primary">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <Award className="h-4 w-4 text-accent" />
                Recognition
              </div>
              BuildMart was selected in the Top 100 of over 1,00,000 participating teams at Youth Ideathon 2025, and
              presented live at IIT Delhi to a panel of industry mentors and investors.
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <Target className="mb-4 h-7 w-7 text-accent" />
              <h2 className="mb-2 font-display text-xl font-semibold text-primary">Mission</h2>
              <p className="text-muted-foreground">
                Make construction procurement more transparent, competitive and efficient.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <Eye className="mb-4 h-7 w-7 text-accent" />
              <h2 className="mb-2 font-display text-xl font-semibold text-primary">Vision</h2>
              <p className="text-muted-foreground">
                Build the digital infrastructure connecting construction demand, suppliers and logistics — so a
                contractor can manage the material procurement process from one platform.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">What Guides Us</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">Our values.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {values.map((v) => (
                <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-brass-300">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-primary">{v.title}</h3>
                  <p className="text-xs text-muted-foreground">{v.copy}</p>
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
