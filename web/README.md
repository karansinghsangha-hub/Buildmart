# BuildMart — web (React/Next.js)

This is a **new** React + TypeScript + Tailwind + shadcn/ui app, added alongside
the original static `index.html` / `about.html` / etc. at the repo root. The
static site is untouched and still works as-is; this `web/` app is where React
component work (like the one below) lives.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** (strict mode, on by default from `create-next-app`)
- **Tailwind CSS v4** (CSS-first config — see `app/globals.css`, no `tailwind.config.js` needed)
- **shadcn/ui** project structure (`components.json`, `lib/utils.ts`, `components/ui/`)

## shadcn setup notes

`npx shadcn@latest init` couldn't reach `ui.shadcn.com` from this sandbox
(network policy blocks that host), so the shadcn scaffolding was created by
hand instead of via the CLI:

- `components.json` — the standard shadcn config (style `new-york`, RSC on,
  path aliases below).
- `lib/utils.ts` — the `cn()` helper (`clsx` + `tailwind-merge`), which every
  shadcn component expects to import from `@/lib/utils`.
- `components/ui/` — **the default shadcn path for primitives.** Kept as the
  default on purpose: shadcn's own generator, every published shadcn
  component/registry snippet, and this task's instructions all assume
  `@/components/ui/*`. Renaming or nesting it elsewhere means hand-patching
  every future `npx shadcn add …` output and every copy-pasted registry
  snippet's imports — not worth the drift.
- Path alias `@/*` → project root, already set in `tsconfig.json` by
  `create-next-app` (`@/components/...`, `@/lib/...`).
- CSS variables for the design system live in `app/globals.css` under
  `:root` / `.dark`, mapped through Tailwind v4's `@theme inline` block —
  same mechanism shadcn's CLI would have written, just re-skinned with
  BuildMart's navy/brass palette instead of the default neutral one.

If you later get access to `ui.shadcn.com` (e.g. running outside this
sandbox), `npx shadcn@latest add <component>` will drop straight into
`components/ui/` and pick up these same tokens — nothing else needs to
change.

## What's here

- `app/page.tsx` — a condensed BuildMart landing page (header, hero, the
  workforce/crowd section, footer) rebuilt in React to host the component
  below.
- `app/skiper-39-demo/page.tsx` — the literal demo page as supplied, so the
  component can be viewed in isolation at `/skiper-39-demo`.
- `components/ui/skiper39.tsx` — **Skiper39 / CrowdCanvas**, copied verbatim
  (GSAP-driven canvas crowd animation, `"use client"`).
- `components/sections/workforce-crowd.tsx` — BuildMart's own presentational
  wrapper around the `CrowdCanvas` primitive: navy background, brass accents,
  copy about the on-site workforce, matching the rest of the site's design
  language. This is the piece actually rendered on `/`.

## Dependencies installed

```bash
npm install clsx tailwind-merge class-variance-authority lucide-react tw-animate-css gsap
```

- `clsx` + `tailwind-merge` → the shadcn `cn()` utility.
- `class-variance-authority`, `lucide-react`, `tw-animate-css` → standard
  shadcn/ui peer dependencies (variants, icons, animation utilities), added
  up front so any future `shadcn add` component works without extra installs.
- `gsap` → required by `CrowdCanvas` for the walk timelines and ticker.

## Image asset

`CrowdCanvas` needs a **sprite sheet**, not an arbitrary photo: it slices one
image into a `rows × cols` grid of walk-cycle frames. That rules out swapping
in a generic Unsplash photo (per the task's usual "use Unsplash stock images"
guidance) — an ordinary photo has no frame grid to slice, and the animation
would show scrambled crops instead of walking figures. The component keeps
the original `src` (the Skiper UI–hosted "peeps" sprite sheet by
[Open Peeps](https://www.openpeeps.com/)), which is the correct kind of
asset for this component. If you want BuildMart-branded figures (hard hats,
hi-vis vests, etc.), commission or generate a matching sprite sheet in the
same grid layout and swap the `src` — the slicing math adapts automatically
from the image's natural size and the `rows`/`cols` props.

## Verifying the component

This sandbox's network policy blocks the sprite's CDN host
(`cdn.21st.dev`), so the canvas renders empty here — confirmed via
`curl`/browser console (`ERR_TUNNEL_CONNECTION_FAILED`), not a code bug. The
animation engine itself (sprite slicing, GSAP walk timelines, layering,
resize handling) was verified by pointing `CrowdCanvas` at a locally
generated placeholder sprite sheet and screenshotting the result — walking,
mirrored, depth-sorted figures rendered correctly with zero console errors.
It will render the real crowd as soon as this runs somewhere with normal
internet access (e.g. Vercel, or your own machine).

## Running it

```bash
cd web
npm install   # first time only
npm run dev   # http://localhost:3000
```

`npm run build` has been verified to pass (typecheck + production build,
all 3 routes prerendered as static content).
