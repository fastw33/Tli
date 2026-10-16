import type { Metadata } from 'next'
import type { Locale } from '@/lib/locale'
import { localePath } from '@/lib/locale'
import { pageMetadata } from '@/lib/page-metadata'
import { absoluteUrl, languageAlternates, site } from '@/lib/site'
import { glossaryTermPath, type GlossaryTerm } from './shared'

export function glossaryTermMetadata(term: GlossaryTerm, locale: Locale): Metadata {
  const base = pageMetadata('glossary', locale)
  const title = `${term[locale].name} | ${locale === 'es' ? 'Significado y envíos' : 'Meaning & Shipping'} | ${site.name}`
  const description = term[locale].definition.length > 158
    ? `${term[locale].definition.slice(0, 154).replace(/\s+\S*$/, '')}…`
    : term[locale].definition
  const path = glossaryTermPath(term.id)
  const url = absoluteUrl(localePath(path, locale))
  return {
    ...base,
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: { ...base.openGraph, title, description, url },
    twitter: { ...base.twitter, title, description },
  }
}
