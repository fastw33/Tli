# SEO: TLI Miami, United States

## Canonical site and audience

- Production origin: `https://tlimiami.com`, HTTPS, without `www`.
- English at the root is the primary language, with `lang=en-US` and `og:locale=en_US`.
- Spanish lives under `/es`, with `lang=es`. Hreflang links include `en`, `en-US`, `es` and `x-default`; both English codes point to the same English page so other English speakers retain a fallback.
- Company location: Medley, Florida, United States. The website describes Miami logistics operations serving the US and international markets; it does not claim offices in each destination.
- `src/lib/site.ts` defines the production origin, business information and page paths. `src/lib/page-metadata.ts` defines unique localized titles, descriptions, canonical URLs, robots and social metadata.

## Indexing and structured data

- `/sitemap.xml` contains 16 canonical URLs: 8 pages in each language, with reciprocal language alternatives. No query parameters, redirects or login pages are included.
- `/robots.txt` allows crawling and points to the sitemap. It does not block assets or prevent crawlers from reading `noindex`.
- `/login` and `/es/login` are account assistance pages, marked `noindex,follow`. `/clients` and `/es/clients` are compatibility aliases with regional canonical URLs and `noindex`; permanent server redirects are preferred.
- Canonical and language links are generated once through the Next.js Metadata API, in the exported HTML head. Contact inquiries and quote parameters use the clean page canonical.
- JSON-LD includes `LocalBusiness`, `WebSite`, `WebPage`/`ContactPage`, `BreadcrumbList` and `Service`. The real address, US country and published telephone are used. No ratings, hours, prices, certifications or coordinates are fabricated.
- Main titles, page content, actual counters and useful default contact information are available in static HTML. The noscript fallback makes animated sections visible without JavaScript.
- Social cards are PNG, 1200×630, one per language. Run `npm run seo:images` after editing `scripts/generate-social-images.mjs`; it uses Sharp bundled with the installed Next.js runtime.
- Sitemap `lastmod` is intentionally omitted: a rebuild is not proof that each page's content changed. Add dates only when the last significant content change can be tracked accurately.

## Agent discovery and llms.txt

`public/llms.txt` provides the primary English Markdown guide, `public/es/llms.txt` provides the Spanish guide, and `public/llms-full.txt` contains an expanded bilingual company reference. These public files are copied into the static export. They describe actual services, coverage, contact routes and published team details; they do not contain API keys or backend details. Keep them synchronized when the public business content or contact directory changes.

Every English and Spanish page includes a localized `rel="describedby"` link to its guide in the exported HTML head. React places this link in the head during server rendering; it requires no JavaScript to discover it. The prepared Coolify Nginx configuration serves the files as UTF-8 plain text with real 404s for missing files. Existing robots rules allow access.

`npm run check:seo` validates the exported guides, their linked resources and discovery links across all 16 indexable pages. `npm run check:seo:live` also verifies the three production guide URLs return HTTP 200 with plain-text content instead of the homepage fallback.

This follows the [llms.txt proposal](https://llmstxt.org/) and addresses the [Lighthouse llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt). Publishing these files does not establish a specific agentic browsing score or resolve a Search Console sitemap fetch error; inspect the remaining audit criteria separately.

## Required hosting configuration

The pre-change production check found that missing URLs, `/sitemap.xml` and `/robots.txt` returned the homepage with HTTP 200 and `text/html`. Generated files must be published from **the entire `out/` directory**, not only its HTML pages.

Use `deployment/nginx-seo.conf.example` as a fragment to merge into the existing HTTPS virtual host. Keep its TLS configuration and correct export root. Replace the SPA fallback (`try_files ... /index.html`) with file/HTML lookup and a real 404. Do not create duplicate `location /` blocks.

### Coolify (current deployment)

Keep the settings shown in the current application: **Nixpacks**, **Static site enabled**, **SPA disabled**, **Build Command `npm run build`**, **Base Directory `/`**, **Publish Directory `/out`**, **Domain `https://tlimiami.com`**.

Replace **Custom Nginx Configuration** with the complete content of `deployment/coolify-nginx.conf`, click **Save**, then **Redeploy**. This configuration belongs inside the static Nginx container; Coolify's proxy continues to handle public TLS. It uses `/usr/share/nginx/html`, where Coolify places the contents of the publish directory. It handles www and trailing-slash redirects, actual 404s, XML/text MIME types, gzip and cacheable hashed Next assets. There is no need to switch build packs.

The configuration is prepared in the repository but must be saved in the Coolify field to take effect; Coolify does not automatically discover this file. [Coolify's static Nginx configuration documentation](https://coolify.io/docs/applications/builds/static) requires redeployment after a configuration edit.

The fragment also serves the sitemap as XML, robots as plain text and redirects old client URLs to Regions with HTTP 301. Ensure any HTTP and `www` virtual hosts redirect to `https://tlimiami.com$request_uri`; configure valid TLS for any HTTPS host that is used.

This repository does not have access to the production Nginx configuration. Adding the fragment here documents the necessary change; it does not apply that change on the server.

## Verification and Search Console

1. Run `npm run check:locales`, `npm run build` and `npm run check:seo`. The SEO check validates the actual exported HTML/XML, not just the source configuration.
2. Deploy the complete `out/` and apply the hosting locations above.
3. Run `npm run check:seo:live`. It checks MIME types, file contents, page canonicals, legacy redirects and a missing URL's HTTP 404. A successful build alone does not prove correct hosting.
4. Complete Search Console verification using `/googlec4483a00833ee528.html`, then submit `https://tlimiami.com/sitemap.xml` in its Sitemaps report.
5. Inspect `/`, `/air`, `/ocean`, `/regions` and Spanish counterparts with URL Inspection. Validate deployed structured data with Google's Rich Results Test.
6. Maintain a verified Google Business Profile with the same company name, address and telephone. This account-level work is not created automatically by website metadata.

Technical implementation does not guarantee indexing, rankings or rich results. Content quality, competition, local business signals and real performance remain relevant. The previously rejected homepage video/contrast/height work remains outside this change.

Primary references: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business).
