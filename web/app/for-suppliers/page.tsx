import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { supplierBenefits } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "For Suppliers — BuildMart",
  description: "Grow your construction materials business with BuildMart. Receive procurement requests, submit digital quotes and win bulk orders.",
};

const steps = [
  "Register your business",
  "Submit business information",
  "Complete verification",
  "Add your products and pricing",
  "Set your delivery radius",
  "Receive matched procurement requests",
  "Submit quotes",
  "Win orders",
];

export default function ForSuppliersPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />
      <main>
        <section className="bg-gradient-to-b from-navy-950 to-navy-900 px-6 py-20 text-[#faf7f0]">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">For Suppliers</span>
            <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Turn your inventory into new business.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[#faf7f0]/65">
              Reach contractors actively purchasing for real projects, and submit structured digital quotes instead
              of chasing leads by phone.
            </p>
            <Link
              href="/signin"
              className="mt-7 inline-flex items-center gap-2 rounded-[4px] bg-[#a9803f] px-7 py-3 text-sm font-semibold text-[#241a08]"
            >
              Join as Supplier
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                Grow your construction business with BuildMart.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {supplierBenefits.map((b) => (
                <div key={b} className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
                  <Check className="h-4 w-4 flex-none text-green-700" />
                  <span className="text-sm font-medium text-primary">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-display text-2xl font-semibold text-primary sm:text-3xl">The onboarding process.</h2>
            <ol className="grid gap-3 sm:grid-cols-2">
              {steps.map((s, i) => (
                <li key={s} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm text-primary">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 to-navy-900 p-10 text-center sm:p-14">
            <h3 className="mb-3 font-display text-2xl font-semibold text-[#faf7f0] sm:text-3xl">
              Get in front of active demand.
            </h3>
            <p className="mx-auto mb-7 max-w-xl text-[#faf7f0]/70">
              List your products and start receiving matched procurement requests.
            </p>
            <Link href="/signin" className="inline-flex items-center gap-2 rounded-[4px] bg-[#a9803f] px-7 py-3 text-sm font-semibold text-[#241a08]">
              Join as Supplier
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
