import type { Metadata } from "next";
import Link from "next/link";
import { AuthTabs } from "@/components/auth-tabs";

export const metadata: Metadata = {
  title: "Sign In or Create an Account — BuildMart",
  description:
    "Sign in to your BuildMart client account to track project progress, or create a new account to get started.",
};

const authPoints = ["Local supplier matching", "Reverse-bid procurement", "Delivered-cost comparison"];

export default function SignInPage() {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-2">
      {/* -------------------------------------------------------- visual */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-navy-900 to-navy-950 p-14 text-[#faf7f0] lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(216,185,120,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(216,185,120,.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-navy-800 to-navy-950 font-display text-lg font-bold text-brass-300">
            B
          </span>
          <span>
            <span className="font-display text-lg font-semibold text-[#faf7f0]">
              Build<span className="text-brass-300">Mart</span>
            </span>
            <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-[#faf7f0]/55">
              Procurement Marketplace
            </span>
          </span>
        </Link>

        <div className="relative z-10 my-auto max-w-[30ch]">
          <p className="font-display text-3xl italic leading-snug text-[#faf7f0]">
            &ldquo;Selected Top 100 of over 1,00,000 teams at Youth Ideathon 2025 —
            and pitched live to investors at IIT Delhi.&rdquo;
          </p>
          <div className="mt-5 text-sm text-brass-300">— BuildMart Founding Team, 2025</div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#faf7f0]/70">
          {authPoints.map((point) => (
            <span key={point} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-brass-300" />
              {point}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------- form */}
      <div className="flex items-center justify-center p-8 sm:p-12">
        <AuthTabs />
      </div>
    </div>
  );
}
