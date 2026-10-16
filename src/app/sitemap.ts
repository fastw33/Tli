import type { MetadataRoute } from 'next'
import { localePath } from '@/lib/locale'
import { absoluteUrl, indexablePages, languageAlternates } from '@/lib/site'
import { glossaryTerms } from '@/modules/glossary/data'
import { glossaryTermPath } from '@/modules/glossary/shared'
import { freightRoutes, freightRoutePath } from '@/modules/freight-routes/data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // One canonical HTML URL per language. Text/JSON references and quote
  // parameters are alternate representations, not additional indexable pages.
  const paths = Array.from(new Set([
    ...indexablePages.map(([, path]) => path),
    ...glossaryTerms.map((term) => glossaryTermPath(term.id)),
    ...freightRoutes.map((route) => freightRoutePath(route.slug)),
  ]))
  return paths.flatMap((path) =>
    (['en', 'es'] as const).map((locale) => ({
      url: absoluteUrl(localePath(path, locale)),
      alternates: { languages: languageAlternates(path) },
    })),
  )
}
