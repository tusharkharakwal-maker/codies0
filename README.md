# Codie®

A Next.js website for Codie, primarily a web development agency, with Creative & Design and Marketing & SEO alongside its development services. Inspired by the supplied street-poster reference and built directly in this workspace using the taste skill, without Sites. The image's pink, acid-lime, lavender, warm-paper, and ink palette takes precedence over the older orange-only direction. Vermilion remains the transition and focus accent.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm install
npm run dev
```

Open **http://127.0.0.1:3100**. Port 3100 avoids the existing project on port 3000.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

The production server also uses port 3100, so stop the development server before running it. Fonts are downloaded at build time by `next/font` and self-hosted with the site. Internet access is needed for the first font download and dependency installation, but visitors make no requests to Google Fonts or external image services.

## Structure and editing

```text
app/
  page.tsx                    Home section composition
  layout.tsx                  Fonts, metadata, shared shell
  globals.css                 Tokens, layouts, responsive rules
  work/page.tsx               Portfolio
  work/[slug]/page.tsx        Statically generated case studies
  contact/page.tsx            Contact page and contact details
  api/contact/route.ts        Validated contact API stub
  privacy/page.tsx            Preview privacy notice
  not-found.tsx               Branded 404
components/
  ui/                         Navigation, buttons, icons, artwork
  motion/                     Lenis, GSAP, cursor, transitions, counters
  sections/                   Home copy, portfolio, contact forms
data/projects.ts              Typed project content and artwork slots
data/services.ts              All 11 services and their three groups
lib/contact.ts                Shared Zod schema and budgets
lib/design.ts                 Design direction and layer documentation
public/grain.svg              Local SVG paper texture
```

- **Copy:** `components/sections/hero.tsx`, `home-sections.tsx`, and `footer.tsx`; page-specific copy lives in `app/`.
- **Colors:** `:root` tokens at the top of `app/globals.css`. Artwork-specific colors live with the art styles and project data.
- **Projects:** `data/projects.ts` is the single typed source of truth. Update the client, slug, category, services, story, results, and `photoSlot` there.
- **Services:** `data/services.ts` supplies the home-page service lists, grouped contact choices, and API validation. Development leads the display order; each service link preselects its matching contact option.
- **Fonts:** Anton, Manrope, and Caveat are configured in `app/layout.tsx`.
- **Artwork:** `components/ui/artwork.tsx` and the “Original, code-generated campaign artwork” section of the stylesheet. All campaign art is SVG/CSS, with no remote image dependencies. Case-study containers have named `data-photo-slot` attributes for future photography.
- **Motion:** `components/motion/motion-provider.tsx`. The main preloader plays on every full page load or refresh, with a shorter mobile sequence, and reveals the page directly. Client-side navigation uses the separate page transition. All ongoing motion respects `prefers-reduced-motion`; cursor effects require a fine pointer and a desktop viewport.

## Contact integration

`POST /api/contact` validates JSON with the same schema as the form. It currently returns `mode: "preview"` and **does not send or store enquiries**. The UI explicitly reflects this. Validation, loading, error, retry, and success states are implemented, along with service and budget selections.

To enable delivery, add your email provider at the marked integration point in `app/api/contact/route.ts`, keep credentials server-side, add rate limiting, and only return a delivery success after the provider accepts the message. Update the success copy and privacy policy at that point.

## Content before launch

Case studies, project results, and testimonials are illustrative concepts. Replace these with verified material before publishing. The home-page service totals are derived from the actual service catalog. `hello@codie.studio`, the location, and social destinations are sample details. No phone number was invented; the site offers a callback request instead. Social icons currently open the platforms' homepages and are labeled accordingly.

The privacy page describes the current preview behavior. Replace it with the business's actual privacy policy when adding storage, analytics, or email delivery.

## Accessibility and verification

Semantic landmarks, labeled forms, keyboard focus, native modal focus management, keyboard carousel controls, touch scrolling, and reduced-motion fallbacks are included. Layouts are designed for 360px through 1920px and larger.

Lighthouse audit artifacts, when generated locally, live in ignored `.tmp/`. Run audits against `npm run build` + `npm run start`, not the development server.

Initial implementation verified on October 5, 2026 (Lighthouse measurements precede the service-content update):

- `npm run lint`, TypeScript, and the production build pass.
- Mobile Lighthouse: **93 performance / 100 accessibility / 100 best practices / 100 SEO**. Measured CLS: **0.001**, total blocking time: **10 ms**. These are local lab measurements, not field guarantees.
- Contact-page Lighthouse accessibility: **100**.
- All 13 content routes return HTTP 200; an unknown route returns the branded 404.
- Browser checks cover 360px home/portfolio layouts, the mobile menu, a 1920px case-study layout, desktop contact, category filtering, carousel buttons and keyboard controls, service preselection, validation, success, and form reset.
- The contact API accepts a valid synthetic brief and rejects invalid email, malformed JSON, unsupported content types, and a filled honeypot.
- No production console warnings or errors occurred during the verified contact submission.

The production dependency audit is clean. npm currently reports a transitive `braces` advisory in Next.js's development-only ESLint dependency chain; its suggested automatic fix downgrades the framework lint configuration. The current matching Next.js configuration is retained rather than applying that incompatible downgrade.

The web-development positioning update was also checked on October 5, 2026: lint, TypeScript, and the production build pass. Browser checks verified all 11 service links, contact preselection, a synthetic enquiry combining development and SEO, the new portfolio filters, and the service, contact, and portfolio layouts at 360px with no horizontal page overflow.
