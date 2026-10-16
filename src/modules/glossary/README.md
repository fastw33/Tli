# TLI logistics glossary

Directory: `/glossary` and `/es/glossary`. Every term has a statically exported detail page, for example `/glossary/fcl` and `/es/glossary/fcl`. Term IDs are shared across languages so the language switcher stays on the same topic.

- `data.ts`: original bilingual catalog. Add a unique stable ID, category, name, definition and example in both languages.
- `shared.ts`: categories, search normalization, term paths and quote service mapping. The full bilingual catalog stays out of client JavaScript.
- `copy.ts`: bilingual interface text.
- `shipping-guidance.ts`: practical guidance and quote preparation checklist per category.
- `GlossaryDirectory.tsx`: search, category and actual letter filters. Selecting a letter shows only matching terms and marks the active button; changing the search or topic resets the letter. Every card links to its detail page.
- `GlossaryPage.tsx`: directory landing page with quote entry points.
- `GlossaryTermPage.tsx`: definition, example, preparation checklist, related terms and contextual quote CTAs. A quote panel follows desktop readers; mobile readers have a fixed quote button.
- `GlossaryQuoteCard.tsx`: native GET form that passes origin, destination, service and the consulted term to the existing quote page. It does not submit a lead. `QuoteRequestContext` applies these values to `QuoteNowForm`; unknown services retain the existing validation and fallback.
- `metadata.ts`, `GlossaryStructuredData.tsx` and `GlossaryTermStructuredData.tsx`: canonical URLs, reciprocal hreflang, social metadata, DefinedTermSet, DefinedTerm and breadcrumbs.
- `Glossary.module.css`: scoped styling and responsive layouts.
- `discovery.ts`: generates the complete English/Spanish text references and bilingual JSON catalog from the editorial source. Static Route Handlers export `/glossary-reference.txt`, `/es/glossary-reference.txt` and `/glossary.json` during the normal build.
  The `-reference.txt` name is intentional: Next.js exports its own React Server Component payload at `/glossary.txt` for the HTML `/glossary` route. Reusing that name would overwrite or expose the wrong representation in the static export.
- `GlossaryDiscoveryLinks.tsx`: exposes these alternate formats in every glossary page's HTML head. The `llms.txt` guides also link to them; they are supplemental references rather than new sitemap pages.

Both dynamic routes use `generateStaticParams` and reject unknown slugs. The sitemap registers every term in both languages. All definitions and detail examples are rendered at build time; crawlers do not need to run the filters.

Run `npm run check:locales`, `npm run build`, `npm run check:seo`, `npm run check:glossary` and `npm run test:quotes`. The export checks validate term pages, metadata, schema, directory links and contextual quote forms. Browser QA should also select letters, combine filters, open a term, switch languages and carry a route into the quote form without submitting it.

Editorial references: [FIATA](https://fiata.org/about-freight-forwarding/), [IATA](https://www.iata.org/en/publications/newsletters/iata-knowledge-hub/air-cargo-tariffs-and-rules-what-you-need-to-know/), [ICC](https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/) and [CBP](https://www.help.cbp.gov/s/article/Article-1216?language=en_US). Definitions are original summaries. Publish the complete `out/` using the existing deployment process.
