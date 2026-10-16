# Freight routes

Original commercial landing pages in English and Spanish, using the coverage already published on the website and confirmed by the user: Miami–Dominican Republic and Miami–Caribbean.

`data.ts` is the route catalog and quote-parameter source. `copy.ts` contains bilingual shared interface copy. `RoutePage.tsx` renders the full content at build time; its native GET form continues into the existing quote flow without creating a lead. `RouteLinks.tsx` provides localized discovery links on Home, Regions, Air and Ocean.

Routes are `/routes/{slug}` and `/es/routes/{slug}`. Both languages use the same slug to preserve the existing language switcher. Regions is the parent directory; there is no separate `/routes` index. Unsupported slugs are not generated.

Metadata and structured data describe the actual content and existing Miami business. No destination offices, schedules, prices, fixed transit times or guaranteed service to every island are claimed. The Caribbean form requires an actual destination city; a regional name is not silently treated as a city.

To add a route, first confirm operational coverage, write distinct content in both languages, add the catalog entry, and update the expected routes in `scripts/check-seo.mjs` and live-check list. The static pages, reciprocal language alternatives, internal links and sitemap are derived from the catalog. Add new links to the public language guides and `llms-full.txt`.

Verify with `npm run build`, `npm run check:seo` and `npm run check:routes`, plus a browser check of the quote prefill and responsive layout. Deploy the complete `out` directory to publish.
