import Link from "next/link";
import { ArrowRight, Award, Landmark, HandCoins } from "lucide-react";

/**
 * Sits directly beneath <HomeHero>, sharing its navy background so the
 * scroll continues seamlessly from the hero's final (fully navy) frame
 * into this section — no visible seam, no opacity/reveal timing needed.
 */
export function Achievements() {
  return (
    <section className="bg-navy-950 px-6 py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14">
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
    </section>
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

export default Achievements;
