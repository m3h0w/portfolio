# CV variants architecture (cv_source)

## What you asked for
You want a single “source of truth” for CV rendering that:

- Pulls together data currently living in:
  - `src/data/siteContent.js`
  - `src/data/cv.js`
  - `src/data/portfolio/items/*`
- Lets you **override any field** (not just the ones that were previously sourced from those files)
- Supports composing multiple CV variants (e.g. `cv_source.js`, `cv_source_b.js`) to tailor:
  - headline/title
  - skills (selection/reordering)
  - experience (select jobs/roles, rewrite highlights, select subset of bullets)
  - projects (select subset, rewrite descriptions)
- Keeps the existing website functional; only `/cv` and the PDF CV need to be adapted.

## Current state (what I observed)
- `/cv` page (`src/app/_components/LocalizedCvPage.js`) currently reads:
  - site copy from `getSiteContent(locale)`
  - CV data from `getCv()` (`src/data/cv.js`)
  - project cards from `portfolioItems` (`src/data/portfolio.js` → `src/data/portfolio/items/*`)
- PDF route (`src/app/api/cv-pdf/route.js`) reads CV data from `getCv()` and renders `src/app/_pdf/CvPdfDocument.js`.
- PDF projects section is driven by `cv.projects.selected` / `cv.projects.recentNonProfit`.

So, today there is **no single bundle** that drives both HTML CV and PDF CV.

## Design goals
1. **Default CV stays identical** (no visual/content change unless explicitly overridden).
2. Add a composable CV “source layer” to generate **a CV bundle** for both:
   - HTML CV page
   - PDF CV
3. Make variants easy:
   - `default` (current CV)
   - `jobA` (tailored)
   - `jobB` (tailored)

## Proposed architecture

### 1) Introduce a CV bundle API
Add a module that returns a single structure used by `/cv` and PDF:

- `getCvBundle({ locale, variant })` →
  - `site`: localized site content used by CV (name, intro/about/contact strings, etc.)
  - `cv`: the CV object (experience, skills, etc.) in the same shape as today
  - `portfolioItems`: an array of portfolio items (in today’s shape) already selected/ordered for this CV variant

This bundle becomes the only input that `/cv` and the PDF need.

### 2) Add “cv_source” definitions + a composer
Create:

- `src/data/cv_source.js` (default)
  - references `getCv()` + `getSiteContent()` + `portfolioItems`
  - provides optional overrides and selection rules
- `src/data/cv_source_<variant>.js` (tailored)
  - imports the default source and overrides/filters

And a small engine:

- `src/data/cvBundles.js` (or similar)
  - applies:
    - deep overrides (override ANY field)
    - selectors/filters (choose experience entries, choose bullets)
    - portfolio selection (choose which portfolio items show up on `/cv`)

### 3) Override semantics
Support two complementary mechanisms:

#### A) “Full override” via deep-merge
A variant can override any nested field:

- `person.headline`
- `skills.highlight`
- `experience[company].roles[role].highlights`

This is the “power tool” for rewriting content.

#### B) “Selectors” for safe composition
Selectors make variants less brittle than hardcoding full objects:

- `experience.selectCompanies: ["SoilSense", "Kvalifik"]`
- `experience.selectRoles: [{ company: "SoilSense", title: "Lead Software Engineer" }]`
- `experience.highlightRules: { maxBulletsPerRole: 3 }`
- `projects.selectPortfolioSlugs: ["soilsense", "commons", "talkling"]`

Selectors run first to build a base variant, then deep-merge overrides apply last.

### 4) Keep the rest of the website unchanged
- Do not change existing consumers of `src/data/siteContent.js`, `src/data/cv.js`, `src/data/portfolio.js`.
- Only update:
  - `src/app/_components/LocalizedCvPage.js`
  - `src/app/api/cv-pdf/route.js`
  - (and any helpers they use)

Optionally, keep `getCv()` as-is for backward compatibility; `/cv` and PDF stop calling it directly.

## Variant routing strategy
Add a query parameter for variants without changing canonical URLs:

- `/cv?variant=default`
- `/cv?variant=ml`
- `/pl/cv?variant=ml`
- `/api/cv-pdf?lang=en&variant=ml`

Rules:
- If `variant` is missing: default.
- Canonical URLs remain `/cv` and `/pl/cv`.
- The variant is “non-canonical” and should not be indexed.

## Additional improvements to bake in
1. Add stable identifiers (`id`) for `experience` entries and `roles` to make selectors resilient.
2. Add a normalization step in `getCvBundle()` to ensure arrays exist, sort experience consistently, and compute derived fields.
3. Define a deterministic merge strategy for arrays (default replace; optional merge-by-id for structured arrays).
4. Explicitly map portfolio selection into `cv.projects` so PDF and HTML stay in sync.
5. Optional lightweight dev validation for required fields to avoid breakage in variants.

## Minimal implementation steps (plan)
1. Add a `getCvBundle({ locale, variant })` API.
2. Implement the default source so it reproduces today’s `/cv` and PDF data.
3. Add `id` fields for `experience` and `roles` (non-breaking, internal only).
4. Implement normalization + deterministic merge strategy.
5. Update `/cv` page to use `getCvBundle` (site + cv + portfolioItems from bundle).
6. Update `/api/cv-pdf` to use `getCvBundle`.
7. Add a sample variant file (e.g. `cv_source_ml.js`) demonstrating:
   - headline override
   - skills selection
   - experience bullet selection
   - portfolio project selection
8. Optional dev validation helper for bundle shape.
9. Quick verification: `pnpm lint` and `pnpm build`.

## Notes / open questions
- HTML CV currently renders portfolio projects from `portfolioItems`, while PDF renders from `cv.projects.*`.
  - Recommendation: for variants, drive both from the bundle’s `portfolioItems` and derive `cv.projects` for PDF from that selection, OR update PDF to render directly from `portfolioItems` as well.
  - To minimize change risk, the first iteration can keep PDF using `cv.projects.*` while the bundle simply sets those values.

