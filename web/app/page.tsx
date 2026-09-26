import Link from "next/link";
import { ArrowRight, Users, HardHat } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeHero } from "@/components/sections/home-hero";
import { Solution } from "@/components/sections/solution";
import { SearchBar } from "@/components/sections/search-bar";
import { MarketplacePreview } from "@/components/sections/marketplace-preview";
import { CostIntelligence } from "@/components/sections/cost-intelligence";
import { ProjectDashboardPreview } from "@/components/sections/project-dashboard-preview";
import { HowItWorks } from "@/components/how-it-works";
import { RangeFinder } from "@/components/sections/range-finder";
import { SiteCrowd } from "@/components/sections/site-crowd";
import { problems, contractorBenefits, supplierBenefits, trustPoints } from "@/lib/site-data";
import { CATEGORIES } from "@/lib/categories";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />

      <main>
        {/* Scroll-driven zoom hero, flows straight into the navy Solution section */}
        <HomeHero />
        <Solution />

        {/* ------------------------------------------------------- search */}
        <section className="px-6 py-16">
          <SearchBar />
        </section>

        {/* ------------------------------------------------------- problem */}
        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                Construction procurement shouldn&apos;t be this fragmented.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {problems.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-2 font-semibold text-primary">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- how it works */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">How It Works</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">
                From project to purchase order.
              </h2>
            </div>
            <HowItWorks />
          </div>
        </section>

        {/* -------------------------------------------------- range finder / map */}
        <section id="find-near-you" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Across India</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">
                Find suppliers and contractors near you.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Set a city and a range — BuildMart plots every supplier and contractor on the platform
                within it, live.
              </p>
            </div>
            <RangeFinder />
          </div>
        </section>

        {/* ----------------------------------------------- marketplace preview */}
        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Marketplace</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">
                Example listings on BuildMart.
              </h2>
            </div>
            <MarketplacePreview />
          </div>
        </section>

        {/* --------------------------------------------------- reverse bidding */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 to-navy-900 p-10 text-center text-[#faf7f0] sm:p-14">
            <h2 className="mb-3 font-display text-2xl font-semibold sm:text-3xl">
              Let suppliers compete for your order.
            </h2>
            <p className="mx-auto mb-7 max-w-xl text-[#faf7f0]/70">
              Post your requirement once. Receive multiple competitive quotes instead of calling suppliers one by
              one.
            </p>
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 rounded-[4px] bg-[#a9803f] px-7 py-3 text-sm font-semibold text-[#241a08]"
            >
              Create Procurement Request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* -------------------------------------------------- cost intelligence */}
        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Delivered Cost</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">
                Don&apos;t compare prices. Compare delivered costs.
              </h2>
            </div>
            <CostIntelligence />
          </div>
        </section>

        {/* ------------------------------------------------ dashboard preview */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Procurement Dashboard</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">
                One record for every project.
              </h2>
            </div>
            <ProjectDashboardPreview />
          </div>
        </section>

        {/* -------------------------------------------------------- categories */}
        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                Popular construction categories.
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  href="/marketplace"
                  className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-primary hover:border-accent"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------- contractor / supplier */}
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <HardHat className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-display text-xl font-semibold text-primary">Built for people who build.</h3>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                {contractorBenefits.slice(0, 4).map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
              <Link href="/for-contractors" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Explore for Contractors
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <Users className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-display text-xl font-semibold text-primary">
                Turn your inventory into new business.
              </h3>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                {supplierBenefits.slice(0, 4).map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
              <Link href="/for-suppliers" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Explore for Suppliers
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- trust */}
        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 font-display text-2xl font-semibold text-primary sm:text-3xl">
              Built around transparent transactions.
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {trustPoints.map((t) => (
                <span key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-primary">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- site crowd */}
        <SiteCrowd />

        {/* ------------------------------------------------------------- CTA */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 to-navy-900 p-10 sm:p-14">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div>
                <h3 className="mb-2 font-display text-2xl font-semibold text-[#faf7f0] sm:text-3xl">
                  Ready to procure smarter?
                </h3>
                <p className="text-[#faf7f0]/70">Post your first requirement and discover suppliers around your project.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/signin"
                  className="rounded-[4px] bg-[#a9803f] px-6 py-3 text-sm font-semibold text-[#241a08] transition-transform hover:-translate-y-0.5"
                >
                  Start Procuring
                </Link>
                <Link
                  href="/for-suppliers"
                  className="rounded-[4px] border border-white/20 px-6 py-3 text-sm font-semibold text-[#faf7f0] hover:border-brass-300 hover:text-brass-300"
                >
                  Join as Supplier
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
