"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/lib/use-current-user";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/estimator", label: "Estimator" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const user = useCurrentUser();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-navy-900 to-navy-950 font-display text-lg font-bold text-brass-300">
            B
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-primary">
              Build<span className="text-accent">Mart</span>
            </span>
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Procurement Marketplace
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 transition-colors hover:text-primary",
                isActive(link.href) && "font-semibold text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          {user ? (
            <Link
              href={`/dashboard/${user.role}`}
              className="rounded-[4px] bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-[4px] border border-border px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-primary"
              >
                Sign In
              </Link>
              <Link
                href="/signin"
                className="rounded-[4px] bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Start Procuring
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 pb-5 pt-2 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "border-b border-border py-3 text-sm font-medium text-muted-foreground",
                isActive(link.href) && "font-semibold text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={user ? `/dashboard/${user.role}` : "/signin"}
            onClick={() => setOpen(false)}
            className="mt-3 rounded-[4px] bg-accent py-2.5 text-center text-sm font-semibold text-accent-foreground"
          >
            {user ? "Dashboard" : "Sign In"}
          </Link>
        </nav>
      )}
    </header>
  );
}

export default SiteHeader;
