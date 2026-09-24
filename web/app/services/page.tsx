import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServicesGrid } from "@/components/services-grid";
import { Estimator } from "@/components/estimator";
import { FaqAccordion } from "@/components/faq-accordion";
import { plans } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services & Cost Estimator — BuildMart",
  description:
    "Explore BuildMart's construction services and use our live range-slider estimator to plan your residential, commercial or industrial project budget.",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />

      <main>
        <section className="bg-gradient-to-b from-navy-950 to-navy-900 px-6 py-16 text-[#faf7f0]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex gap-2 text-sm text-[#faf7f0]/55">
              <span>Home</span> <span>/</span> <span>Services</span>
            </div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
              Every service. One formal contract.
            </h1>
            <p className="mt-2 max-w-2xl text-[#faf7f0]/65">
              From foundation to fit-out — explore what BuildMart delivers, then
              use the estimator to plan your budget in real time.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <ServicesGrid />
          </div>
        </section>

        <section id="estimator" className="scroll-mt-24 bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Plan Your Budget
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
                Estimate your project cost, live.
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Move the range sliders and select your finish grade &amp; project
                type for an instant ballpark figure.
              </p>
            </div>
            <Estimator />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Engagement Models
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
                Three ways to work with us.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col rounded-2xl border border-border bg-card p-8",
                    plan.featured && "border-accent bg-gradient-to-b from-brass-300/10 to-card shadow-lg",
                  )}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-accent-foreground">
                      Most Chosen
                    </span>
                  )}
                  <div className="mb-2 text-sm font-bold uppercase tracking-wider text-accent">{plan.name}</div>
                  <div className="mb-1 font-display text-3xl text-primary">
                    {plan.price}
                    <span className="font-sans text-sm font-normal text-muted-foreground"> {plan.unit}</span>
                  </div>
                  <p className="mb-6 text-sm text-muted-foreground">{plan.copy}</p>
                  <ul className="mb-8 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-green-700" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={cn(
                      "rounded-[4px] py-3 text-center text-sm font-semibold",
                      plan.featured
                        ? "bg-accent text-accent-foreground"
                        : "border border-border text-primary hover:border-primary",
                    )}
                  >
                    Choose {plan.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Questions
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
                Frequently asked.
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 to-navy-900 p-10 sm:p-14">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div>
                <h3 className="mb-2 font-display text-2xl font-semibold text-[#faf7f0] sm:text-3xl">
                  Still deciding?
                </h3>
                <p className="text-[#faf7f0]/70">
                  Talk to a BuildMart engineer — no sales pitch, just a straight answer on cost and timeline.
                </p>
              </div>
              <Link
                href="/contact"
                className="rounded-[4px] bg-[#a9803f] px-6 py-3 text-sm font-semibold text-[#241a08] transition-transform hover:-translate-y-0.5"
              >
                Talk to an Engineer
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
