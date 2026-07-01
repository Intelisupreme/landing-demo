# Intelisupreme — Landing Page

Single-page marketing site for **Intelisupreme** (Portugal) — SaaS development &
AI business automation. English content. Statically exported. Leads captured via
HubSpot Free CRM.

Built to the design system in [`DESIGN.md`](./DESIGN.md).

## Stack

- **Next.js 16** (App Router) with `output: 'export'` → fully static `out/`
- **React 19**, **TypeScript 6**, strict
- **Tailwind v4** via `@tailwindcss/postcss` (CSS-first config, no `tailwind.config.js`)
- **motion** (`motion/react`) for scroll reveals + hover physics, `prefers-reduced-motion` aware
- **@phosphor-icons/react** (CSR for client components, `/ssr` subpath for server components)
- **next/font** self-hosted Outfit (display) + Inter (body)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Command             | Description                                              |
| :------------------ | :------------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                               |
| `npm run build`     | Production build → static site in `out/`                 |
| `npm run start`     | Run the build (requires non-export build; not used here) |
| `npm run serve`     | Serve the static `out/` directory locally on port 3000  |
| `npm run lint`      | ESLint (next/core-web-vitals + next/typescript)          |
| `npm run typecheck` | `tsc --noEmit`                                           |

## Static export

`next.config.mjs` sets `output: 'export'` and `images.unoptimized: true`, plus
`trailingSlash: true` for clean directory-based URLs.

```bash
npm run build      # produces ./out
npm run serve      # previews ./out at http://localhost:3000
```

Deploy `out/` to any static host:

- **Vercel** — set output directory to `out`
- **Netlify** — build command `npm run build`, publish directory `out`
- **nginx / Caddy** — point root at the `out/` folder

## HubSpot CRM — lead capture

The demo-request form (`components/LeadForm.tsx`) POSTs directly to the
HubSpot Forms public submission endpoint
(`https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formId`).
The endpoint is CORS-enabled, so it works from a statically exported site — no
backend required.

### Setup

1. Create a free CRM at https://www.hubspot.com/ (Marketing Hub Free includes forms).
2. Build a form at https://app.hubspot.com/forms with fields named exactly:
   - `firstname` (required)
   - `email` (required)
   - `company`
   - `service_of_interest` (single-line text or dropdown: `SaaS Development`, `AI Automation`, `Both`)
   - `message`
3. Note your **Portal ID** (visible in the HubSpot URL after `/portal/`) and the **Form ID** (from the form's embed/share dialog).
4. Copy `.env.example` to `.env.local` and fill in:

   ```
   NEXT_PUBLIC_HUBSPOT_PORTAL_ID=123456
   NEXT_PUBLIC_HUBSPOT_FORM_ID=abc-def-ghi-jkl
   ```

`NEXT_PUBLIC_*` env vars are baked into the static build at `next build` time, so
re-run the build after changing them.

Without configuration, the form renders an inline warning and submissions fail
gracefully with a clear error message.

## Project structure

```
app/
  layout.tsx        fonts, metadata, no-FOUC theme script
  page.tsx          section composition
  globals.css       DESIGN.md tokens, Tailwind v4 @theme, base styles

components/
  Logo.tsx           SVG monogram + wordmark
  ThemeToggle.tsx    persisted light/dark toggle
  LeadForm.tsx       HubSpot-integrated lead form (client)
  sections/
    Nav.tsx Hero.tsx TrustedBy.tsx Services.tsx HowItWorks.tsx
    AICapabilities.tsx Benefits.tsx Pricing.tsx
    Testimonials.tsx FAQ.tsx LeadCTA.tsx Footer.tsx

lib/
  hubspot.ts         submitLead() — Forms public endpoint client

docs/superpowers/
  specs/2026-07-01-intelisupreme-landing-design.md
  plans/2026-07-01-intelisupreme-landing-plan.md
```

## Design system

All tokens (brand colors, light/dark surfaces, radii, shadows, typography) are
defined in `app/globals.css` as Tailwind v4 `@theme` variables and per-`data-theme`
CSS variables — mapped directly from `DESIGN.md` §2–§7.

- Light + dark modes by default, following `prefers-color-scheme`, with a
  persisted manual toggle in the nav.
- No-FOUC: an inline `<script>` in `app/layout.tsx` sets `data-theme` on `<html>`
  before first paint.
- 8pt spacing rhythm, 12-col grid (max-width 1200px), border radii per DESIGN.md.
- Primary CTAs use the brand gradient `#299EBD → #38A98E` on `--radius-full`.

## Notes on assets

All visuals (logo monogram, hero AI mesh, services mini-panels, partner marks,
bento accents) are authored as inline SVG or CSS-driven composition — there are
no `<div>`-based fake screenshots. Partner names in `TrustedBy` are illustrative
placeholders; replace with real client logos when available.

Metric numbers in `Benefits.tsx` are illustrative and flagged in code comments —
replace with real brand metrics before production.