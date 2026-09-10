# PRD — La Torre del Gall Website

## Original problem statement
Rebuild from scratch the website of La Torre del Gall (latorredelgall.com), a rural estate / masia in Catalonia used as a venue for weddings, private events, celebrations and corporate events. Single-page, photography-led, premium Mediterranean editorial feel, all copy in Catalan, minimal navigation (ESPAI / ESDEVENIMENTS / GALERIA / CONTACTE + SOL·LICITAR INFORMACIÓ CTA), contact form as primary conversion. Must NOT feel like a generic wedding template. User additions: contact form saves to backend with confirmation + mailto/tel links; curated Mediterranean stock photography placeholders; CA/ES/EN language switcher; large replaceable hero video at the top.

## Architecture
- Frontend: Vite + React 19 + TS, Tailwind v4, motion (framer-motion) scroll reveals, Lenis smooth scrolling, Playfair Display + DM Sans + JetBrains Mono (fontsource).
- i18n: `/app/frontend/src/lib/i18n.tsx` (CA default, ES, EN) via LanguageProvider context.
- Media placeholders centralized in `/app/frontend/src/lib/site.ts` (hero video + all images + contact details).
- Sections as components under `/app/frontend/src/components/site/`: Nav, Hero (video + masked line reveal + parallax), Marquee, Espai (asymmetric editorial grid + parallax strip), Esdeveniments (3 equal dark panels), Galeria (masonry + filters + lightbox), Contacte (form + contact rows), Footer.
- Backend: FastAPI `/api/inquiries` POST → MongoDB `inquiries` collection (uuid id, aware UTC timestamps), EmailStr validation, 422 on bad input.

## Implemented (2026-09-10)
- Full single-page site in Catalan with ES/EN switcher (verified switching to EN).
- Cinematic hero with autoplay looping video (mixkit placeholder), masked line-by-line headline reveal, parallax, scroll indicator, poster fallback.
- Editorial Espai photo essay (6 images, asymmetric 12-col grid, full-width parallax landscape).
- Dark Esdeveniments chapter with three equal staggered panels (Bodes / Esdeveniments / Empreses) with hover reveals linking to contact.
- Masonry gallery "Moments a La Torre del Gall" with 5 filters and lightbox.
- Contact section: inquiry form saving to MongoDB with inline success panel + sonner toast; mailto/tel/Instagram/Google Maps rows.
- Slow editorial marquee strip, sticky glass nav with scroll transition, full-screen mobile menu.
- SEO: title, meta description, Open Graph tags, semantic headings, data-testids throughout.

## Verified
- POST /api/inquiries via public URL: 200 with id; invalid body → 422. yarn typecheck clean. Desktop + mobile screenshots of all sections; form submit → success panel confirmed in browser.
- NOTE: hero video shows error code 4 only in the headless test browser (no H.264 codec); network fetch of the mp4 returns 206 — plays in real browsers; poster fallback verified.

## Backlog
- P0: Replace placeholder media with real La Torre del Gall photography + owner's hero video (edit `/app/frontend/src/lib/site.ts` only). Replace placeholder email/phone/Instagram with real contact details.
- P1: Email notification on new inquiry (Resend managed integration). Admin view of inquiries.
- P2: FAQ section, real Google Maps embed, cookie/analytics consent, OG image from real photography.
