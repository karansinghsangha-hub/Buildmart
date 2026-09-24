import type { NextConfig } from "next";

// GitHub Pages serves this app from https://karansinghsangha-hub.github.io/Buildmart/
// — a project subpath, not the domain root — so every asset/link/route needs
// that "/Buildmart" prefix baked in at build time. `NEXT_BASE_PATH` is set by
// the deploy-pages workflow (.github/workflows/deploy-pages.yml) for the
// production build only, so `npm run dev` / a plain local `npm run build`
// still behave like a normal root-hosted app.
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export: GitHub Pages only serves static files, it can't run
  // the Next.js server, so there is no SSR/ISR/route-handler runtime here.
  output: "export",

  // Every internal href/asset gets this prefix (next/link, next/font, css,
  // js chunks, the auto-generated favicon, etc.) — this is what makes
  // routing and assets resolve correctly under the /Buildmart/ subpath.
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,

  // `next/image`'s built-in optimizer needs a Node server, which GitHub
  // Pages doesn't provide. Not used by this app today, but set so adding
  // <Image> later doesn't silently break the export.
  images: {
    unoptimized: true,
  },

  // Emit `/about` as `/about/index.html` (not `/about.html`) so links like
  // `/about/` resolve without a rewrite rule — plain static file servers
  // such as GitHub Pages have no way to add one.
  trailingSlash: true,
};

export default nextConfig;
