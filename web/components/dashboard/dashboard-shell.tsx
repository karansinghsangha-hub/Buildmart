"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useCurrentUser } from "@/lib/use-current-user";
import { signOut, useHasHydrated } from "@/lib/store";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

const navByRole: Record<Role | "admin", { href: string; label: string }[]> = {
  contractor: [
    { href: "/dashboard/contractor", label: "Dashboard" },
    { href: "/dashboard/contractor/projects", label: "My Projects" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/dashboard/contractor/requests", label: "Procurement Requests" },
    { href: "/dashboard/contractor/saved", label: "Saved Suppliers" },
    { href: "/dashboard/contractor/orders", label: "Orders" },
  ],
  supplier: [
    { href: "/dashboard/supplier", label: "Dashboard" },
    { href: "/dashboard/supplier/products", label: "Products" },
    { href: "/dashboard/supplier/requests", label: "Incoming Requests" },
    { href: "/dashboard/supplier/auctions", label: "Live Auctions" },
    { href: "/dashboard/supplier/quotes", label: "Quote History" },
    { href: "/dashboard/supplier/orders", label: "Orders" },
  ],
  admin: [{ href: "/dashboard/admin", label: "Admin Overview" }],
};

/**
 * Wraps every dashboard page. Redirects to /signin if nobody is signed in
 * (or the signed-in account is the wrong role for this section).
 *
 * On a direct/full-page load of a dashboard URL, the very first client
 * render has to match the statically-exported HTML, which was built with
 * no user (there's no server to read *your* localStorage at build time).
 * useStore() corrects itself to the real signed-in user shortly after, but
 * only on a later render — so the redirect check below waits for one
 * mount effect ("hasHydrated") before trusting `user`. Without that gate,
 * a real signed-in visitor gets bounced to /signin by the stale first
 * render before the store catches up.
 */
export function DashboardShell({
  requiredRole,
  children,
}: {
  requiredRole?: Role | "admin";
  children: React.ReactNode;
}) {
  const user = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();
  const hasHydrated = useHasHydrated();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!user) {
      router.replace("/signin");
      return;
    }
    if (requiredRole && requiredRole !== "admin" && user.role !== requiredRole) {
      router.replace(`/dashboard/${user.role}`);
    }
  }, [hasHydrated, user, requiredRole, router]);

  if (!hasHydrated || !user || (requiredRole && requiredRole !== "admin" && user.role !== requiredRole)) {
    return (
      <div className="grid h-svh place-items-center text-sm text-muted-foreground">Redirecting…</div>
    );
  }

  const nav = navByRole[requiredRole === "admin" ? "admin" : user.role];

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-gradient-to-br from-navy-900 to-navy-950 font-display text-sm font-bold text-brass-300">
                B
              </span>
              <span className="font-display text-base font-semibold text-primary">
                Build<span className="text-accent">Mart</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary",
                    pathname === item.href && "bg-secondary text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.company} <span className="text-muted-foreground/60">·</span>{" "}
              <span className="capitalize">{user.role}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-primary hover:border-primary"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground",
                pathname === item.href && "bg-secondary text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}

export function DashboardPageHeader({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          {icon ?? <LayoutDashboard className="h-5 w-5 text-accent" />}
          <h1 className="font-display text-2xl font-semibold text-primary">{title}</h1>
        </div>
        {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
