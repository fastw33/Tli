# Homepage previews

`HomePreviews.tsx` provides server-rendered sections for the English and Spanish homepages: a native GET quote starter, four service previews, route previews, project cargo/warehouse operations and glossary/contact previews. `copy.ts` holds the paired language copy; the locale is passed by each homepage route.

Routes and glossary definitions come from their existing catalogs. The full glossary stays on the server, rather than being bundled into a new browser component. The two featured service cards use matching 1200 × 500 photographic-style WebP images, shared color grading, overlays and aligned card layouts. The warehouse illustration is inline SVG from `FreightArtwork.tsx`. The shared AOS controller animates the homepage and other routes. See `docs/animation-and-air-image.md` for implementation, image provenance and generation prompts.

The existing hero, coverage information, statistics, institutional emblems, quote banner, location and footer remain. `LogisticsCoverage` accepts a server-rendered child to replace its compact route links with the richer homepage previews; other usages retain their default route links.

The quote starter passes origin, region, destination and service to the existing quote page without submitting a lead. Service CTA links preselect a service; route CTA links reuse the existing route context helper. Project cargo and warehouse preview links target stable section anchors on the Logistics Solutions page.

For edits, update both languages, run the build and existing locale/SEO/route checks, and verify quote prefill and mobile layout in the browser.
