import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { offices } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact BuildMart — Book a Site Consultation",
  description:
    "Get in touch with BuildMart. Book a free site consultation, find our office locations on the map, or request a formal quotation.",
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
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
              Let&apos;s talk about your site.
            </h1>
            <p className="mt-2 max-w-2xl text-[#faf7f0]/65">
              Book a free consultation, or reach out directly — a BuildMart engineer
              responds within one business day.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-border shadow-lg lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-card p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Send a Message
              </span>
              <h2 className="mb-7 mt-2 font-display text-xl font-semibold text-primary">
                Request a formal quotation
              </h2>
              <ContactForm />
            </div>

            <div className="flex flex-col gap-6 bg-navy-950 p-10 text-[#faf7f0]">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
                Reach Us Directly
              </span>

              <InfoLine icon={<MapPin className="h-[19px] w-[19px]" />} title="Head Office">
                4th Floor, Vertex Tower, Sector 44, Gurugram, Haryana 122003
              </InfoLine>
              <InfoLine icon={<Phone className="h-[19px] w-[19px]" />} title="Call Us">
                +91 98100 45672 · +91 11 4567 8901
              </InfoLine>
              <InfoLine icon={<Mail className="h-[19px] w-[19px]" />} title="Email Us">
                hello@buildmart.co.in
              </InfoLine>
              <InfoLine icon={<Clock className="h-[19px] w-[19px]" />} title="Working Hours">
                Monday – Saturday, 9:00 AM – 7:00 PM IST
              </InfoLine>

              <div className="mt-2 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  src="https://maps.google.com/maps?q=Sector%2044%2C%20Gurugram%2C%20Haryana&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BuildMart Head Office Map"
                  className="h-[300px] w-full border-0 grayscale-[25%] contrast-[1.05]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Regional Offices
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
                Serving 42+ cities across India.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {offices.map((office) => (
                <div key={office.city} className="rounded-2xl border border-border bg-card p-6">
                  <h4 className="mb-1 text-base font-semibold text-primary">{office.city}</h4>
                  <p className="text-sm text-muted-foreground">{office.address}</p>
                  <p className="text-sm text-muted-foreground">{office.phone}</p>
                  <span className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-700" />
                    Open now
                  </span>
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
