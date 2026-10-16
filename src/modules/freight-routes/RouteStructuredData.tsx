import { localePath, type Locale } from '@/lib/locale'
import { absoluteUrl, contentLanguage } from '@/lib/site'
import { freightRoutePath, type FreightRoute } from './data'
import { routeCopy } from './copy'

export function RouteStructuredData({ route, locale }: { route: FreightRoute; locale: Locale }) {
  const content = route[locale]
  const url = absoluteUrl(localePath(freightRoutePath(route.slug), locale))
  const copy = routeCopy[locale]
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: content.title, description: content.description,
        inLanguage: contentLanguage(locale), isPartOf: { '@id': absoluteUrl('/#website') },
        mainEntity: { '@id': `${url}#service` }, breadcrumb: { '@id': `${url}#breadcrumb` } },
      { '@type': 'Service', '@id': `${url}#service`, url, name: content.title, description: content.description,
        serviceType: locale === 'es' ? 'Coordinación de carga aérea y marítima' : 'Air and ocean freight coordination',
        provider: { '@id': absoluteUrl('/#organization') },
        areaServed: [{ '@type': 'City', name: 'Miami' }, { '@type': route.region === 'dominican-republic' ? 'Country' : 'Place', name: content.destination }] },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: copy.home, item: absoluteUrl(localePath('/', locale)) },
        { '@type': 'ListItem', position: 2, name: copy.regions, item: absoluteUrl(localePath('/regions', locale)) },
        { '@type': 'ListItem', position: 3, name: content.title, item: url },
      ] },
    ],
  }
  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
