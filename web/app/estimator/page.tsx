import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Estimator } from "@/components/estimator";

export const metadata: Metadata = {
  title: "Cost Estimator — BuildMart",
  description: "Estimate your project's construction cost and see an indicative material procurement breakdown.",
};

export default function EstimatorPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />
      <main>
        <section className="bg-gradient-to-b from-navy-950 to-navy-900 px-6 py-16 text-[#faf7f0]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex gap-2 text-sm text-[#faf7f0]/55">
              <span>Home</span> <span>/</span> <span>Estimator</span>
            </div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">Estimate your project cost.</h1>
            <p className="mt-2 max-w-2xl text-[#faf7f0]/65">
              Move the sliders for an indicative construction cost and a material-by-material procurement
              breakdown — then source the materials directly on BuildMart.
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <Estimator />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
