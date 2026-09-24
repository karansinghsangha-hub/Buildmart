import { Fraunces, Inter } from "next/font/google";

// Shared font instances — layout.tsx applies them site-wide via .variable,
// and home-hero.tsx imports `fraunces` directly to get its exact resolved
// font-family string (see the comment in home-hero.tsx for why).
export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
