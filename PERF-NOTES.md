# Performance work — Wix Cycles (headless-challange)

Live site: https://headless-c-8725a605-maorz5.wix-site-host.com (Wix hosting, static export from `out/`).

## What was wrong (baseline)
Page weight ~24–31 MB. Three hero PNGs at 2816px / 6.4–6.7 MB **each** served raw (`images.unoptimized: true`), the three.js/R3F hero-model chunk (~1.3 MB) loaded on **every** device incl. mobile (which never renders the 3D), and a 39 MB `bicycle_m..glb` sat unused in `public/`. Baseline Lighthouse (local static serve): desktop perf 51 / LCP 13.5s, mobile LCP 81s.

## Changes shipped (commit aff8b66)
1. **Hero images → WebP.** Converted `hero-bike`, `wix-cycles-blue`, `wix-cycles-green` PNGs to 1600px WebP with `sharp` (q80, alpha preserved): **6.7 MB → ~66 KB each** (~100×). Old PNGs deleted; refs updated in `components/sections/hero.tsx` and `lib/data.ts`.
2. **three.js off mobile.** `components/sections/hero.tsx` no longer declares the model via module-scope `next/dynamic` (which emitted the chunk into `index.html` on all devices). It now `import("./hero-model")` inside an effect only when `wants3d` (desktop, no reduced-motion) is true. The ~1.3 MB three.js chunk is gone from `index.html`; mobile never fetches it.
3. **Removed dead weight.** Deleted unused `public/bicycle_m..glb` (39 MB).

## Results — live Wix CDN
| | Baseline | Live now |
|---|---|---|
| Desktop perf | 51 | **88** (LCP 1.0s, TBT 0ms) |
| Mobile perf | ~66 | **68** (LCP 5.9s, TBT 20ms) |
| Page weight (mobile) | ~24 MB | **2.8 MB** |
| A11y / SEO | 95 / 100 | 95 / 100 |

(Best-practices reads 96 on live vs 100 locally — attributable to the Wix hosting wrapper's injected scripts, not app code.)

## Remaining mobile opportunity (not yet done)
Mobile LCP is ~5.9s. The heaviest remaining requests are several Unsplash section images at 180–342 KB, requested at `w=1200&h=900` (oversized for a ~390px phone). Because the export uses `images.unoptimized`, `next/image` emits no responsive `srcset`. Options for a follow-up round: request device-appropriate Unsplash sizes (smaller `w=` for mobile / add a srcset via the Unsplash URL params), confirm the actual mobile LCP element, and ensure below-the-fold section images are lazy. Also optional: draco/meshopt-compress `hero-bike.glb` (5 MB, desktop-only, loads after LCP so low priority).
