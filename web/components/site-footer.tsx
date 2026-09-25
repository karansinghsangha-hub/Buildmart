import Link from "next/link";
import { Phone, Mail } from "lucide-react";

// lucide-react dropped brand/social marks (trademark policy), so the three
// socials below use minimal inline glyphs instead of a Lucide import.
const socialIcons = [
  {
    label: "LinkedIn",
    path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.84-2.05 3.78-2.05C19.9 8 22 10.2 22 14.15V23h-4v-7.87c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.17V23h-4V8z",
  },
  {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.9 5.9 0 00-2.14 1.39A5.9 5.9 0 00.6 4.15c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91a5.9 5.9 0 001.39 2.14 5.9 5.9 0 002.14 1.39c.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 002.14-1.39 5.9 5.9 0 001.39-2.14c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 00-1.39-2.14A5.9 5.9 0 0019.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0z",
  },
  {
    label: "X",
    path: "M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.5-7-6.3 7H1.2l8.1-9.3L1 2h7.3l5 6.5L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z",
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-navy-950 pt-20 text-[#faf7f0]/62">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-navy-900 to-navy-950 font-display text-lg font-bold text-brass-300">
                B
              </span>
              <span className="font-display text-lg font-semibold text-[#faf7f0]">
                Build<span className="text-brass-300">Mart</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm">
              A construction procurement marketplace connecting contractors with verified local suppliers. Top 100
              at Youth Ideathon 2025, showcased at IIT Delhi.
            </p>
            <div className="mt-5 flex gap-3">
              {socialIcons.map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  aria-label={icon.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-brass-300 hover:bg-brass-300 hover:text-navy-950"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#faf7f0]">Company</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-brass-300">About</Link></li>
              <li><Link href="/services" className="hover:text-brass-300">Services</Link></li>
              <li><Link href="/estimator" className="hover:text-brass-300">Cost Estimator</Link></li>
              <li><Link href="/contact" className="hover:text-brass-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#faf7f0]">Marketplace</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="/marketplace" className="hover:text-brass-300">Browse Suppliers</Link></li>
              <li><Link href="/for-contractors" className="hover:text-brass-300">For Contractors</Link></li>
              <li><Link href="/for-suppliers" className="hover:text-brass-300">For Suppliers</Link></li>
              <li><Link href="/signin" className="hover:text-brass-300">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#faf7f0]">Contact</h5>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-brass-300" />
                <span>+91 98100 45672</span>
              </div>
              <div className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 flex-none text-brass-300" />
                <span>hello@buildmart.co.in</span>
              </div>
              <div className="text-[#faf7f0]/50">Gurugram, India</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-6 text-sm">
          <span>© 2026 BuildMart. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brass-300">Privacy Policy</a>
            <a href="#" className="hover:text-brass-300">Terms of Service</a>
            <Link href="/contact" className="hover:text-brass-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
