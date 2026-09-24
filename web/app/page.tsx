import Link from "next/link";
import { WorkforceCrowd } from "@/components/sections/workforce-crowd";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#workforce", label: "Our Workforce" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      {/* ---------------------------------------------------------- header */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Link href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-navy-900 to-navy-950 font-display text-lg font-bold text-brass-300">
              B
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold text-primary">
                Build<span className="text-accent">Mart</span>
              </span>
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Construction &amp; Design-Build
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-[4px] bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Request a Quote
          </a>
        </div>
      </header>

      <main>
        {/* -------------------------------------------------------- hero */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 px-6 py-24 text-[#faf7f0]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 900px 500px at 82% -10%, rgba(169,128,63,.14), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-300 before:h-px before:w-6 before:bg-brass-300 after:h-px after:w-6 after:bg-brass-300">
              Est. 2019 · Built on Trust
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              We build spaces that <em className="text-brass-300 not-italic italic">outlast</em> the
              blueprint.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-balance text-base text-[#faf7f0]/70">
              A React + TypeScript rebuild of the BuildMart landing experience —
              styled with Tailwind and shadcn/ui conventions, powered by the
              Skiper39 GSAP crowd-canvas component below.
            </p>
          </div>
        </section>

        {/* ------------------------------------------- workforce crowd -- */}
        <div id="workforce">
          <WorkforceCrowd />
        </div>

        {/* -------------------------------------------------- about strip */}
        <section
          id="services"
          className="mx-auto max-w-6xl px-6 py-20 text-center"
        >
          <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
            One crowd, every discipline.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Residential, commercial and industrial builds — every project is
            staffed by BuildMart&apos;s own engineers and site teams, the same
            people animated above.
          </p>
        </section>
      </main>

      {/* ---------------------------------------------------------- footer */}
      <footer
        id="contact"
        className="mt-auto border-t border-border bg-navy-950 px-6 py-10 text-center text-sm text-[#faf7f0]/60"
      >
        © 2026 BuildMart Constructions Pvt. Ltd. All rights reserved.
      </footer>
    </div>
  );
}
