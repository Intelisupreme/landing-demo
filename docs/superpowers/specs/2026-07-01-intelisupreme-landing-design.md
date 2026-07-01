# Intelisupreme Landing Page — Design Spec

**Date:** 2026-07-01
**Status:** Approved (pending user review of written spec)
**Owner:** Intelisupreme (Portugal) — SaaS development & AI business automation

## 1. Goal

A single-page marketing landing site (English language) that communicates Intelisupreme's offering — SaaS development and AI business automation — to technical B2B buyers, captures leads via an embedded form, and can be built into a fully static deployable site (`out/` directory).

## 2. Requirements (from user)

1. Ability to generate a **static version** of the site (deployable anywhere, no server runtime).
2. **Lead form** integrated with a **free CRM** for collecting leads.
3. Site content in **English**.
4. Follow the design system defined in `DESIGN.md`.

## 3. Decisions

| Concern | Decision | Rationale |
| :--- | :--- | :--- |
| Stack | **Next.js 15** (App Router) with `output: 'export'` | Full static build; React component reuse; Motion animations; ecosystem fit for design system |
| Styling | **Tailwind v4** via `@tailwindcss/postcss` | Utility-first; maps cleanly to DESIGN.md tokens |
| Fonts | `next/font` self-hosted — **Outfit** (headings) + **Inter** (body) | Per DESIGN.md §3 |
| Theme | **Light + Dark**, default `prefers-color-scheme`, manual toggle persisted to `localStorage`; no-FOUC inline script | DESIGN.md specs both modes fully |
| CRM | **HubSpot Free CRM** via Forms public API (`https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formId`) | CORS-enabled client-side POST; works with static export; no backend |
| CRM config | `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`, `NEXT_PUBLIC_HUBSPOT_FORM_ID` env vars baked into static build | |
| Animation | `motion/react` — scroll reveals (`whileInView`), hover physics on CTAs; `useReducedMotion` honored | Restraint over flair |
| Icons | `@phosphor-icons/react`, unified `weight="duotone"` for accents | |

## 4. Design Dials (per design-taste-frontend skill)

- **DESIGN_VARIANCE: 7** — asymmetric hero, bento grid, occasional off-grid bleeds; collapses to strict single-column on `< 768px`.
- **MOTION_INTENSITY: 6** — `whileInView` reveals, CTA hover micro-physics, gradient sheen on hero asset. No scroll-hijack, no marquee spam.
- **VISUAL_DENSITY: 4** — `py-16` to `py-24` section rhythm; airy B2B SaaS feel.

## 5. Brand Tokens (from DESIGN.md §2)

```css
--brand-blue: #299EBD;
--brand-green: #38A98E;
--brand-gradient: linear-gradient(135deg, #299EBD 0%, #38A98E 100%);

/* Light */
--bg: #F8FAFC; --surface: #FFFFFF; --text-primary: #0F172A;
--text-secondary: #64748B; --border: #E2E8F0;

/* Dark */
--bg: #0B1120; --surface: #1E293B; --text-primary: #F8FAFC;
--text-secondary: #94A3B8; --border: #334155;

/* Radii */
--radius-sm: 6px; --radius-md: 12px; --radius-lg: 24px; --radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 2px 4px rgba(15,23,42,.05);
--shadow-md: 0 4px 6px -1px rgba(15,23,42,.08);
--shadow-lg-accent: 0 10px 20px -3px rgba(41,158,189,.15);
```

Typography scale (DESIGN.md §3): H1 64/4rem 700, H2 48/3rem 600, H3 32/2rem 600, H4 24/1.5rem 500, BodyL 18/1.125rem 400, Body 16/1rem 400, Caption 14/0.875rem 400.

Grid (DESIGN.md §4): 12-col desktop (960–1280 max-width), 8-col tablet, 4-col mobile. Spacing on 8pt grid (DESIGN.md §5).

## 6. Page Structure (sections, top → bottom)

| # | Section | Layout family | Key content |
| :--- | :--- | :--- | :--- |
| 1 | Nav | Sticky bar, logo + links + toggle + CTA | Links: Services, Platform, Pricing, FAQ |
| 2 | Hero | **Split (50/50)** — no eyebrow, anti-center | Headline (≤2 lines), subtext (≤20 words), 2 CTAs ("Book a demo" primary + "See the platform" secondary), right: AI/abstract visual |
| 3 | Trusted by | **Logo strip** (below hero) | 4–6 partner/client brand SVG marks |
| 4 | Services | **2-col zigzag** (text+image alternating) | SaaS Development, AI Automation |
| 5 | How it works | **Full-width 3-step process** | Discover → Build → Deploy |
| 6 | AI Capabilities | **Bento grid** (mixed cell sizes, ≥2 tinted/visual) | 4–5 capabilities |
| 7 | Benefits / stats | **3–4 metric tiles** | Mock-flagged numbers (no fake-precise claims) |
| 8 | Pricing | **3 tiers, middle highlighted** (radius-lg + accent shadow) | Starter / Growth / Scale |
| 9 | Testimonials | **Quote cards** (2–3) | ≤3 line quotes, real quote marks, name + role |
| 10 | FAQ | **Native `<details>` accordion** (no extra dep) | 5–6 Q&A |
| 11 | Lead form CTA | **Form card on surface** (radius-lg) | Heading + HubSpot-integrated lead form |
| 12 | Footer | **3-col** | Logo, nav recap, contact email, socials, copyright |

**Layout families used (≥4):** split, logo-strip, zigzag, full-width-numbered, bento, tiles, cards, accordion, form-card, footer. ✓

## 7. Component Inventory

```
app/
  layout.tsx          fonts, metadata, no-FOUC theme script
  page.tsx            section composition
  globals.css         tokens, base styles, Tailwind import

components/
  ThemeToggle.tsx     localStorage-persisted toggle
  LeadForm.tsx         HubSpot Forms API POST, inline validation, success/error
  Logo.tsx             monogram SVG wordmark

  sections/
    Nav.tsx
    Hero.tsx
    TrustedBy.tsx
    Services.tsx
    HowItWorks.tsx
    AICapabilities.tsx
    Benefits.tsx
    Pricing.tsx
    Testimonials.tsx
    FAQ.tsx
    LeadCTA.tsx       contains <LeadForm/>
    Footer.tsx

lib/
  hubspot.ts          build submission payload, post to endpoint
```

## 8. Lead Form Contract

**Fields:**
- `firstname` (required, text)
- `email` (required, email)
- `company` (text)
- `service_of_interest` (select: SaaS Development / AI Automation / Both)
- `message` (textarea)

**Behavior:**
- Client-side validation (HTML5 + custom) before submit.
- POST JSON to HubSpot endpoint with `fields[]` + `context.pageUri/pageName`.
- Honeypot field `fax` (hidden, must remain empty).
- States: idle → submitting (skeleton, CTA label "Sending…") → success (inline confirmation) → error (inline, retry).
- Semantic labels above inputs; helper text below; error text below input.

**Env:**
```
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=***
NEXT_PUBLIC_HUBSPOT_FORM_ID=***
```

## 9. Discipline Enforced (design-taste-frontend)

- Hero fits initial viewport; max 4 text elements; ≤20-word subtext.
- **One CTA intent label** ("Book a demo") everywhere — nav, hero, pricing, form. No duplicates (`Get started`, `Contact us`, etc.).
- **Max 1 eyebrow per 3 sections** (≤3 across 12 sections).
- ≥4 distinct layout families across page. ✓ (see §6)
- Per-section explicit `< 768px` collapse (single column, `px-4`/`px-5`).
- All CTAs single-line at desktop; contrast WCAG AA min (button text vs bg, form labels vs section bg).
- No fake-precise numbers; metric stats flagged mock if not brand-supplied.
- Page theme locked — no light section inside dark page or vice versa.
- `prefers-reduced-motion` collapses all Motion animations to static.
- A11y: keyboard focus states, `<details>` accordion, labelled form fields, alt text.

## 10. Verify Before "Done"

- `npm run lint` and `npm run typecheck` pass.
- `npm run build` produces `out/` with `index.html`.
- Confirm `out/` serves standalone (no 500s).
- Manual: open in light + dark, mobile + desktop.
- Lighthouse: LCP < 2.5s, CLS < 0.1, INP < 200ms.

## 11. Deliverables

- Full Next.js project (App Router, TS).
- `next.config.mjs` with `output: 'export'`.
- `app/globals.css` mapping DESIGN.md tokens.
- HubSpot-integrated `LeadForm` with env-driven config.
- `.env.example` documenting HubSpot vars.
- `README.md` with run, build, static deploy, CRM setup instructions.
- All visual assets inline-rendered (SVG monogram, CSS-driven hero visual, real partner logos via `simpleicons` CDN or generated SVG marks).

## 12. Out of Scope

- No CMS, no dynamic routes, no server actions (static export only).
- No blog, case studies, About pages (single-page landing only).
- No i18n framework (English only).
- No payment integration (pricing is informational; leads captured via form).
- No analytics beyond optional manual integration later.
- HubSpot account/portal/form IDs are placeholders in `.env.example` — user supplies real values.