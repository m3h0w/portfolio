# PageSpeed Insights Fix Plan (Jan 29, 2026)

Target: https://www.michalgacka.com/ (mobile emulation, Lighthouse 13)

## Snapshot (from the report)

- **Performance:** 60 (FCP 6.3s, LCP 9.2s, SI 6.4s, TBT 0ms, CLS 0)
- **Accessibility:** 91
- **Best Practices:** 100
- **SEO:** 100

## Goals / Acceptance Criteria

- Mobile **Performance ≥ 90** on PSI / Lighthouse (Slow 4G, Moto G Power profile).
- LCP **≤ 3.0s** (or at least a major reduction from 9.2s).
- Keep CLS at **0**.
- Accessibility **≥ 98** with all current failures resolved.

## Workstreams (ordered by impact / confidence)

### 1) Remove the Devicon CDN dependency (biggest “easy win”)

Why: PSI flags Devicon assets for **cache lifetime**, **unused CSS**, and **font display**; the font payload is huge (≈777 KiB transfer for `devicon.ttf`).

Current usage:

- Devicon stylesheet is injected globally in
  - src/app/layout.js (link tag to `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css`)
- Devicon classes are used by
  - src/components/LanguageIcon.js

Plan:

1. Replace Devicon font icons with inline SVG icons.
   - Option A (recommended): use `simple-icons` (already a dependency) and render inline SVG (no external CSS/font).
   - Option B: self-host a tiny, subsetted icon set (only the few languages you actually render) and serve it from `public/`.
2. Remove the global `<link rel="stylesheet" …devicon.min.css>` from the document head.
3. Update `LanguageIcon` to return an SVG (or a small local sprite) instead of `<i class="devicon-…"/>`.

Expected PSI items fixed/impacted:

- **Use efficient cache lifetimes** (removes external Devicon font/css requests)
- **Reduce unused CSS** (removes `devicon.min.css`)
- **Font display** (removes the Devicon font-face entirely)

### 2) Reduce render-blocking CSS + critical request chaining

Why: PSI reports **render blocking requests** (two CSS chunks) and a **network dependency chain** with ~913ms critical path latency. Even if Next manages CSS correctly, shrinking CSS and moving non-critical rules out of the critical path is the practical lever.

Plan:

1. Reduce global CSS to the minimum required for first paint.
   - Keep `src/app/globals.css` lightweight (it currently imports Tailwind and has some global rules).
   - Move page-specific or component-specific styling into CSS modules so it code-splits.
2. If any third-party CSS remains (after Devicon removal), load it non-blocking:
   - Prefer removing it.
   - Otherwise, consider a `preload` + `onload` swap pattern (only if the CSS is not required for initial above-the-fold content).
3. Re-run Lighthouse to see whether the two CSS chunks shrink and whether LCP improves.

Expected PSI items fixed/impacted:

- **Render blocking requests**
- **Network dependency tree** / **Avoid chaining critical requests**

### 3) Reduce unused JavaScript and “legacy JavaScript”

Why: PSI flags both **Reduce unused JavaScript** and **Legacy JavaScript** (wasted bytes due to polyfills for Baseline features such as `Array.prototype.at`, `Array.prototype.flat`, `Object.fromEntries`, etc.).

Plan:

1. Identify the biggest JS contributors on the landing page.
   - Suspects in this repo: `framer-motion` (used in nav + modals + expanders), and any large client components on the home page.
2. Reduce unused JS by splitting and deferring.
   - Lazy-load animation-heavy UI and modals (e.g., the preview modals) via dynamic import so they don’t ship on initial page load.
   - Keep the initial landing content as server-rendered as possible.
3. Investigate why legacy polyfills are shipped.
   - Confirm there is no custom Babel config forcing downleveling.
   - Check whether Next’s target/browserslist configuration can be made more modern.
   - If the current target must remain broad, accept this as a trade-off; otherwise tighten the supported browser baseline.

Expected PSI items fixed/impacted:

- **Reduce unused JavaScript**
- **Legacy JavaScript**

### 4) Fix forced reflow / layout thrash

Why: PSI reports **Forced reflow** (~43ms) attributed to the main bundle. In this repo there is at least one layout read (`getBoundingClientRect`) in the navigation.

Current likely hotspot:

- src/components/SidebarNav.js uses `event.currentTarget.getBoundingClientRect()` (layout read).

Plan:

1. Audit interactions that read layout and then write styles/DOM in the same frame.
2. When layout reads are necessary, separate reads and writes:
   - Read in one phase, write in `requestAnimationFrame` (or vice-versa), and avoid repeated reads.
3. Prefer pure-CSS layout for highlight/indicator effects (no runtime measuring) where possible.

Expected PSI items fixed/impacted:

- **Forced reflow**

### 5) Make animations composited (and reduce animation cost)

Why: PSI reports **Avoid non-composited animations** (18 animated elements). Non-composited animations often come from animating properties like `height`, `top/left`, `box-shadow`, `filter`, `backdrop-filter`, etc.

Plan:

1. Inventory animations:
   - `framer-motion` usage in:
     - src/components/SidebarNav.js
     - src/app/_components/ImagePreviewModal.js
     - src/app/_components/AtAGlanceLinks.js
     - src/app/_components/LivePreviewModal.js
     - src/app/_components/PdfPreviewModal.js
   - CSS animations in:
     - src/app/globals.css (`text-shadow` glow)
     - page-specific CSS modules (e.g. detail enter animations)
2. For animations visible on initial load:
   - Prefer animating only `transform` and `opacity`.
   - Avoid animating `height: auto` (use transform-based expand/collapse or a simpler instant layout change).
3. Add `prefers-reduced-motion` handling so Lighthouse and real users can avoid heavy animations.

Expected PSI items fixed/impacted:

- **Avoid non-composited animations**
- (Secondary) improves LCP/FCP consistency

### 6) Accessibility fixes (to reach 98–100)

#### 6.1) Dialogs must have accessible names

PSI finding: elements with `role="dialog"` / `role="alertdialog"` do not have accessible names.

Observed issue:

- src/components/SidebarNav.js: the mobile drawer wrapper has `role="dialog"` + `aria-modal="true"` but no `aria-label` or `aria-labelledby`.

Plan:

1. Give the dialog an accessible name:
   - Add `aria-label="Navigation"` (or localized equivalent), OR
   - Add a visually-hidden heading inside the dialog and reference it via `aria-labelledby`.

#### 6.2) Touch targets too small / too close

PSI finding: **Touch targets do not have sufficient size or spacing**.

Likely sources:

- src/app/_components/HomeClient.js
  - Category filter buttons (`aria-label="Filter by category: …"`)
  - Project cards using `<article role="link" tabIndex="0">`

Plan:

1. Ensure minimum touch target size of ~44×44 CSS px for primary interactive controls.
2. Increase padding / line-height on filter chips and ensure spacing between adjacent chips.
3. For the card-as-link pattern:
   - Prefer a real `<a>` element covering the card (or a single explicit clickable control) rather than multiple small targets.
   - Ensure focus ring and keyboard behavior remain correct.

#### 6.3) Heading hierarchy (no skipped levels)

PSI finding: headings are not in a sequentially-descending order.

Observed failing element example:

- Home card title in src/app/_components/HomeClient.js uses an `h3` (`className` includes `card-title`).

Plan:

1. Review heading structure of the home page:
   - Ensure there is an `h1` for the page.
   - Ensure section headings are `h2`.
   - Ensure card titles follow the appropriate level (`h2` or `h3`) based on their section nesting.
2. If cards are in a list under an `h2` section heading, `h3` is fine; otherwise change the card title element to the correct level.

## Implementation Order (suggested)

1. Remove Devicon global CSS + replace `LanguageIcon` (fast, high impact).
2. Reduce JS shipped to home page (lazy-load modals and heavy animation code).
3. Accessibility: dialog naming, touch target sizing, headings.
4. Animation compositing audit (transform/opacity only + reduced motion).
5. Forced reflow audit (remove layout reads or isolate them).
6. CSS cleanup/splitting (reduce global CSS, push page-specific styles into modules).

## Verification Checklist (must do after each batch)

1. `pnpm build` and confirm output is stable.
2. Run Lighthouse (mobile) against a production build (`pnpm start`) and compare:
   - LCP, FCP, SI
   - Render-blocking CSS audit
   - Unused JS/CSS audits
3. Re-run PSI and confirm these issues are gone:
   - cache lifetimes (Devicon)
   - font display (Devicon)
   - unused CSS (Devicon)
   - dialog accessible name
   - touch target size/spacing
   - heading order

## Coverage Map (every item from the pasted report)

### Performance / Diagnostics

- [ ] Use efficient cache lifetimes (Devicon CDN `devicon.ttf` + `devicon.min.css`)
- [ ] Legacy JavaScript (polyfills: `Array.prototype.at`, `flat`, `flatMap`, `Object.fromEntries`, `Object.hasOwn`, `String.prototype.trimStart/trimEnd`)
- [ ] Render blocking requests (CSS chunks)
- [ ] Font display (Devicon font-face)
- [ ] Forced reflow (layout thrash in runtime JS)
- [ ] Network dependency tree / avoid chaining critical requests
- [ ] Preconnected origins (note: PSI currently says no good candidates; re-evaluate after removing 3p assets)
- [ ] Reduce unused JavaScript
- [ ] Reduce unused CSS (Devicon CSS)
- [ ] Avoid non-composited animations (18 animated elements)

### Accessibility

- [ ] ARIA: dialogs without accessible names
- [ ] Touch targets do not have sufficient size or spacing
- [ ] Headings are not in a sequentially-descending order

### Best Practices / Trust & Safety (not failing, but worth tracking)

- [ ] Ensure CSP is effective against XSS attacks
- [ ] Use a strong HSTS policy
- [ ] Ensure proper origin isolation with COOP
- [ ] Mitigate clickjacking with XFO or CSP
- [ ] Mitigate DOM-based XSS with Trusted Types
