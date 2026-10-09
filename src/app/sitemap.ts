import type { MetadataRoute } from 'next'
import { localePath } from '@/lib/locale'
import { absoluteUrl, indexablePages, languageAlternates } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages.flatMap(([, path]) =>
    (['en', 'es'] as const).map((locale) => ({
      url: absoluteUrl(localePath(path, locale)),
      alternates: { languages: languageAlternates(path) },
    })),
  )
}
