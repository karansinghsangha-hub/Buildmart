import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact BuildMart",
  description: "Get in touch with BuildMart — questions about the marketplace, supplier onboarding, or partnerships.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />

      <main>
        <section className="bg-gradient-to-b from-navy-950 to-navy-900 px-6 py-16 text-[#faf7f0]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex gap-2 text-sm text-[#faf7f0]/55">
              <span>Home</span> <span>/</span> <span>Contact</span>
            </div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">Get in touch.</h1>
            <p className="mt-2 max-w-2xl text-[#faf7f0]/65">
              Questions about the marketplace, supplier onboarding, or partnerships — reach out directly.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-border shadow-lg lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-card p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Send a Message</span>
              <h2 className="mb-7 mt-2 font-display text-xl font-semibold text-primary">How can we help?</h2>
              <ContactForm />
            </div>

            <div className="flex flex-col gap-6 bg-navy-950 p-10 text-[#faf7f0]">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">Reach Us Directly</span>

              <InfoLine icon={<MapPin className="h-[19px] w-[19px]" />} title="Based in">
                Hyderabad, Telangana
              </InfoLine>
              <InfoLine icon={<Phone className="h-[19px] w-[19px]" />} title="Call Us">
                +91 95509 05558
              </InfoLine>
              <InfoLine icon={<Mail className="h-[19px] w-[19px]" />} title="Email Us">
                hello@buildmart.co.in
              </InfoLine>

              <p className="mt-2 rounded-lg bg-white/5 p-4 text-sm text-[#faf7f0]/60">
                BuildMart is an early-stage marketplace, founded in 2025 by Karan Singh Sangha, currently
                onboarding contractors and suppliers. If you&apos;re a supplier interested in joining, mention
                your product categories and city.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function InfoLine({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-brass-300/30 bg-brass-300/10 text-brass-300">
        {icon}
      </div>
      <div>
        <strong className="mb-1 block text-sm text-[#faf7f0]">{title}</strong>
        <span className="text-sm text-[#faf7f0]/65">{children}</span>
      </div>
    </div>
  );
}
