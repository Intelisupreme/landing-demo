# Implementation Plan — Intelisupreme Landing Page

**Spec:** `docs/superpowers/specs/2026-07-01-intelisupreme-landing-design.md`
**Branch:** main (working directly per user)
**Approach:** ordered phases, each ends in a verifiable checkpoint

---

## Phase 0 — Project scaffold

**Tasks:**
0.1 `package.json` (deps: next 16.2, react 19.2, motion 12, @phosphor-icons/react 2, tailwindcss 4.3, @tailwindcss/postcss 4.3, typescript 6, eslint 10, eslint-config-next 16)
0.2 `next.config.mjs` — `output: 'export'`, `images.unoptimized`, `trailingSlash`
0.3 `tsconfig.json` (strict, paths `@/*`), `next-env.d.ts`
0.4 `postcss.config.mjs` — `@tailwindcss/postcss` plugin only
0.5 `.gitignore`, `.env.example`
0.6 `app/favicon.ico` (omit; optional)
0.7 `npm install`

**Checkpoint:** `npx next info` runs; `tsc --noEmit` passes on empty `app/`.

---

## Phase 1 — Design tokens & base styles

**Tasks:**
1.1 `app/globals.css`:
   - `@import "tailwindcss";`
   - `@theme` block mapping DESIGN.md tokens (colors, radii, shadows, fonts, breakpoints)
   - `:root` (light) + `[data-theme="dark"]` variable definitions for `--bg`, `--surface`, `--text-primary`, `--text-secondary`, `--border`
   - Base element styles (`html`, `body`, headings, `::selection`, focus rings)
   - `@media (prefers-reduced-motion: reduce)` override disabling transitions
1.2 Verify Tailwind v4 picks up tokens via `@theme`.

**Checkpoint:** Dev server renders a plain `<h1>` styled with Outfit + brand color via `text-brand-blue`.

---

## Phase 2 — Root layout, fonts, theme infrastructure

**Tasks:**
2.1 `app/layout.tsx`:
   - `next/font` Outfit (display) + Inter (body), apply CSS vars `--font-display`, `--font-sans`
   - `<html lang="en" suppressHydrationWarning>` + inline no-FOUC `<script>` reading `localStorage.theme`, falling back to `prefers-color-scheme`, setting `data-theme` attribute before paint
   - Metadata: title, description, OpenGraph, viewport
2.2 `components/ThemeToggle.tsx`:
   - `'use client'`; reads current `data-theme` on mount; toggles; persists `localStorage.theme`
   - Phosphor `Sun` / `Moon` icons
2.3 `components/Logo.tsx`:
   - SVG monogram "IS" inside soft rounded shape per DESIGN.md (no sharp angles), gradient fill
   - Optional wordmark alongside

**Checkpoint:** Launch `npm run dev`, toggle works, no FOUC on refresh.

---

## Phase 3 — LeadForm + HubSpot lib

**Tasks:**
3.1 `lib/hubspot.ts`:
   - Build payload: `fields[]` `{name, value}`, `context.pageUri/pageName`
   - `submitLead(payload): Promise<{ok: boolean}>` POSTs to `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`
   - Throws on non-2xx
3.2 `components/LeadForm.tsx`:
   - `'use client'`; local state `status: 'idle' | 'submitting' | 'success' | 'error'`
   - Fields per spec §8; honeypot `fax`
   - Label-above-input pattern, gap-2
   - On submit: validate → POST → set status
   - Success: inline confirmation card replacing form
   - Error: inline red text, retry button
   - Helper text variants per field (optional)
3.3 `.env.example` updated with both HubSpot vars + comment.

**Checkpoint:** Form posts to placeholder HubSpot URL, returns an error (404 expected for fake IDs) and renders error state cleanly.

---

## Phase 4 — Top of page: Nav + Hero

**Tasks:**
4.1 `components/sections/Nav.tsx`:
   - Sticky top, max-w container, bg surface/80 + `backdrop-blur` + border-bottom on scroll
   - Logo left, anchor links center, ThemeToggle + primary CTA "Book a demo" right
   - Mobile: hamburger → simple slide-down menu
   - Single-line at `lg`
4.2 `components/sections/Hero.tsx`:
   - Split 50/50 layout (grid-cols-1 md:grid-cols-2)
   - Left: headline (≤2 lines, text-4xl md:text-5xl lg:text-6xl, tracking-tight), subtext ≤20 words (max-w-[60ch], text-secondary), 2 CTAs
   - Primary CTA: `bg-brand-gradient`, `rounded-full`, white text, hover `-translate-y-[1px]` + accent shadow
   - Secondary: ghost button "See the platform"
   - Right: abstract AI visual (CSS-driven gradient mesh + grid lines + animated nodes via Motion, all transforms/opacity only)
   - `min-h-[100dvh]` section, `pt-24` desktop max
   - Mobile: single column, visual below text

**Checkpoint:** Hero renders above fold on desktop + mobile; both CTAs visible without scroll; no overflow.

---

## Phase 5 — Trusted by + Services + How it works

**Tasks:**
5.1 `components/sections/TrustedBy.tsx`:
   - Logo strip under hero, `border-y`, subtle grayscale → color on hover
   - 4–6 partner SVG marks (inline SVGs — simple geometric monograms where real brands unavailable, since this is a demo without real client logos)
   - No labels under logos
5.2 `components/sections/Services.tsx`:
   - `'use client'` (motion reveal)
   - 2 zigzag rows: row A (text left, visual right) = SaaS Development; row B (visual left, text right) = AI Automation
   - Each row: H3 + ≤25-word body + icon list (3 bullets with Phosphor icons) + small CTA link
   - Visual: tinted gradient panel with abstract icon
5.3 `components/sections/HowItWorks.tsx`:
   - Full-width 3-step process (Discover → Build → Deploy)
   - Horizontal connector line with numbered nodes (01/02/03)
   - Mobile: vertical stack with vertical connector

**Checkpoint:** 3 distinct layout families in a row (strip, zigzag, numbered-row).

---

## Phase 6 — AI Capabilities bento + Benefits + Pricing

**Tasks:**
6.1 `components/sections/AICapabilities.tsx`:
   - Bento grid: `md:grid-cols-6` with mixed spans (e.g. 1 cell spans 2 cols/2 rows, others 2x1)
   - 5 capabilities: Workflow Automation, LLM Integration, Data Pipelines, Agent Orchestration, Predictive Analytics
   - ≥2 cells tinted/visual (gradient background, icon-only large cell, no text)
   - Remaining cells: icon + H4 + ≤15-word body
6.2 `components/sections/Benefits.tsx`:
   - 4 metric tiles in a row (single column mobile)
   - Metrics flagged as mock via code comment (no fake-precise brand claims)
   - Large display number + label + ≤8-word supporting line
6.3 `components/sections/Pricing.tsx`:
   - 3 cards: Starter / Growth (highlighted) / Scale
   - Growth card: `--radius-lg`, `--shadow-lg-accent`, `scale-[1.02]`, "Most popular" pill
   - Price (one-line), 4 features each with Phosphor Check icon
   - Single CTA "Book a demo" per card — same label everywhere

**Checkpoint:** Bento has visual variety, no empty cell, no 3-identical-card feature row.

---

## Phase 7 — Testimonials + FAQ + Lead CTA + Footer

**Tasks:**
7.1 `components/sections/Testimonials.tsx`:
   - 3 quote cards (1 col mobile, 3 col desktop)
   - Real typographic quotes `“ ”` — no straight ASCII
   - Name + Role + Company attribution; no quote >3 lines
7.2 `components/sections/FAQ.tsx`:
   -Native `<details>` accordion (Style with marker arrow rotation)
   - 5–6 Q&A pairs
7.3 `components/sections/LeadCTA.tsx`:
   - Section heading + form card (`--surface`, `--radius-lg`, `--shadow-md`)
   - Contains `<LeadForm/>`
7.4 `components/sections/Footer.tsx`:
   - `border-top`, dark surface even in light mode ok? **No** — page theme lock. Use `--bg` with `border-t`.
   - 3 cols: logo+tagline / nav links / contact email + socials
   - Copyright row, "Made in Portugal" or microcopy

**Checkpoint:** Lead form reachable from nav CTA, hero CTA, and LeadCTA section anchor `#demo`.

---

## Phase 8 — Page composition

**Tasks:**
8.1 `app/page.tsx`:
   - Import and stack all sections in order
   - Wrap sections needing motion in their own `'use client'` boundaries
8.2 `app/layout.tsx` final metadata, JSON-LD Organization schema optional

**Checkpoint:** `npm run dev` shows full page in order; all anchors reachable.

---

## Phase 9 — Visual assets polish

**Tasks:**
9.1 Hero visual: Motion-animated gradient mesh with floating node dots (transform/opacity only), reduced-motion static fallback
9.2 Bento tinted cells: 2 gradient backgrounds using brand gradient at varying opacities
9.3 Services visual panels: abstract UI mock glyphs (SVG inline, simple)
9.4 TrustedBy: 4–6 inline SVG monograms (since no real clients yet — labeled clearly as mock logos)

**Checkpoint:** No section is text-only with a `<div>`-fake-screenshot. Every visual area has real SVG/CSS composition.

---

## Phase 10 — Verify & docs

**Tasks:**
10.1 `npm run lint` clean
10.2 `npm run typecheck` clean
10.3 `npm run build` → confirm `out/index.html` exists, no errors
10.4 `npx serve out` → manual clickthrough both themes, mobile + desktop
10.5 Lighthouse check (target: LCP < 2.5s, CLS < 0.1, INP < 200ms)
10.6 `README.md`:
   - Run/dev/build/serve
   - Static deploy (Vercel/Netlify/plain nginx on `out/`)
   - HubSpot setup (portal ID, form ID, env vars)
   - Design system reference to DESIGN.md
10.7 Commit

**Checkpoint:** Project passes lint, typecheck, build, and manual review.

---

## Risks / Notes

- **HubSpot CORS:** Forms public endpoint supports CORS for client-side submits — verified approach. If user's portal disallows from a custom domain, fallback is a proxy, but that breaks static export. Document this trade-off in README.
- **Stripe/i18n:** explicitly out of scope.
- **Real client logos:** none available → generate neutral geometric SVG marks labeled as placeholders.
- **No image-gen tool available** in this environment → use CSS/SVG-driven visuals (allowed last-resort path per design-taste-frontend §4.8, since all visuals are abstract/brand-aligned, not photographic).