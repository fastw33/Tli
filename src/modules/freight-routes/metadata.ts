import type { Metadata } from 'next'
import { localePath, type Locale } from '@/lib/locale'
import { pageMetadata } from '@/lib/page-metadata'
import { absoluteUrl, languageAlternates, site } from '@/lib/site'
import { freightRoutePath, type FreightRoute } from './data'

export function freightRouteMetadata(route: FreightRoute, locale: Locale): Metadata {
  const base = pageMetadata('regions', locale)
  const { title, description } = route[locale]
  const fullTitle = `${title} | ${site.name}`
  const path = freightRoutePath(route.slug)
  const url = absoluteUrl(localePath(path, locale))
  return {
    ...base, title: { absolute: fullTitle }, description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: { ...base.openGraph, title: fullTitle, description, url },
    twitter: { ...base.twitter, title: fullTitle, description },
  }
}
