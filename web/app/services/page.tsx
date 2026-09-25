import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Percent } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServicesGrid } from "@/components/services-grid";
import { FaqAccordion } from "@/components/faq-accordion";
import { futureServices } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Procurement Services — BuildMart",
  description: "BuildMart's core procurement services — supplier discovery, bulk procurement, competitive bidding, and cost intelligence.",
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
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">Procurement services.</h1>
            <p className="mt-2 max-w-2xl text-[#faf7f0]/65">
              The core of BuildMart is procurement — everything else is built to support that loop.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <ServicesGrid />
          </div>
        </section>

        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">How Pricing Works</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">
                Free to browse. A small commission on completed orders.
              </h2>
            </div>
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-brass-300">
                <Percent className="h-6 w-6" />
              </div>
              <p className="text-muted-foreground">
                Posting requirements and browsing the marketplace is free for contractors. BuildMart earns a
                transaction commission — roughly <strong className="text-primary">1–3%</strong>, depending on
                category — only when an order is actually placed through the platform. Supplier subscriptions and
                other revenue lines may be added as the marketplace grows.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Looking Ahead</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">Future expansion.</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                These aren&apos;t live services yet — they&apos;re the directions BuildMart can grow into once the
                procurement marketplace is established.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {futureServices.map((s) => (
                <div key={s.title} className="rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center">
                  <span className="mb-3 inline-block rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-semibold uppercase text-muted-foreground">
                    Future
                  </span>
                  <h3 className="mb-1.5 font-semibold text-primary">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Questions</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary sm:text-3xl">Frequently asked.</h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 to-navy-900 p-10 sm:p-14">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div>
                <h3 className="mb-2 font-display text-2xl font-semibold text-[#faf7f0] sm:text-3xl">
                  Estimate your material costs.
                </h3>
                <p className="text-[#faf7f0]/70">Use the estimator, then source those materials on BuildMart.</p>
              </div>
              <Link
                href="/estimator"
                className="flex items-center gap-2 rounded-[4px] bg-[#a9803f] px-6 py-3 text-sm font-semibold text-[#241a08] transition-transform hover:-translate-y-0.5"
              >
                Open Estimator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
