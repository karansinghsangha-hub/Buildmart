import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeHero } from "@/components/sections/home-hero";
import { Achievements } from "@/components/sections/achievements";
import { WorkforceCrowd } from "@/components/sections/workforce-crowd";
import { ServicesGrid } from "@/components/services-grid";
import { ProcessSteps } from "@/components/process-steps";
import { GalleryGrid } from "@/components/gallery-grid";
import { TestimonialsGrid } from "@/components/testimonials-grid";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />

      <main>
        {/* Scroll-driven zoom hero: scroll to zoom through "BUILDMART" into
            the navy achievements section right below it. */}
        <HomeHero />
        <Achievements />

        {/* ----------------------------------------------------- services */}
        <section className="bg-secondary/40 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  What We Do
                </span>
                <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
                  Construction services, engineered end to end.
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-[4px] border border-border px-5 py-2.5 text-sm font-semibold text-primary hover:border-primary"
              >
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ServicesGrid />
          </div>
        </section>

        {/* -------------------------------------------------------- process */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                How We Work
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
                A formal, four-stage process.
              </h2>
            </div>
            <ProcessSteps />
          </div>
        </section>

        {/* ---------------------------------------------------- workforce -- */}
        <WorkforceCrowd />

        {/* -------------------------------------------------------- portfolio */}
        <section className="bg-secondary/40 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Portfolio
                </span>
                <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
                  Selected work across India.
                </h2>
              </div>
            </div>
            <GalleryGrid />
          </div>
        </section>

        {/* ----------------------------------------------------- testimonials */}
        <section className="bg-navy-950 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
                Client Word
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-[#faf7f0] sm:text-4xl">
                Trusted by families and enterprises alike.
              </h2>
            </div>
            <TestimonialsGrid />
          </div>
        </section>

        {/* ------------------------------------------------------------- CTA */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 to-navy-900 p-10 sm:p-14">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div>
                <h3 className="mb-2 font-display text-2xl font-semibold text-[#faf7f0] sm:text-3xl">
                  Ready to break ground?
                </h3>
                <p className="text-[#faf7f0]/70">
                  Book a free, no-obligation site consultation with our engineering team this week.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-[4px] bg-[#a9803f] px-6 py-3 text-sm font-semibold text-[#241a08] transition-transform hover:-translate-y-0.5"
                >
                  Book Consultation
                </Link>
                <Link
                  href="/signin"
                  className="rounded-[4px] border border-white/20 px-6 py-3 text-sm font-semibold text-[#faf7f0] hover:border-brass-300 hover:text-brass-300"
                >
                  Create Account
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
