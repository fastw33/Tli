import type { Locale } from '@/lib/locale'
import { localePath } from '@/lib/locale'
import { absoluteUrl, contentLanguage, site } from '@/lib/site'
import { glossaryCopy } from './copy'
import { glossaryTermPath, type GlossaryTerm } from './shared'

export function GlossaryTermStructuredData({ term, locale }: { term: GlossaryTerm; locale: Locale }) {
  const url = absoluteUrl(localePath(glossaryTermPath(term.id), locale))
  const glossaryUrl = absoluteUrl(localePath('/glossary', locale))
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url,
        name: term[locale].name, description: term[locale].definition,
        inLanguage: contentLanguage(locale),
        isPartOf: { '@id': absoluteUrl('/#website') },
        publisher: { '@id': absoluteUrl('/#organization') },
        about: { '@id': `${url}#term` },
        relatedLink: absoluteUrl(localePath('/quote-now', locale)),
        mainEntity: { '@id': `${url}#term` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'DefinedTerm', '@id': `${url}#term`, url,
        name: term[locale].name,
        alternateName: term[locale === 'es' ? 'en' : 'es'].name,
        description: term[locale].definition,
        inDefinedTermSet: { '@id': `${glossaryUrl}#glossary` },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.name, item: absoluteUrl(localePath('/', locale)) },
          { '@type': 'ListItem', position: 2, name: glossaryCopy[locale].title, item: glossaryUrl },
          { '@type': 'ListItem', position: 3, name: term[locale].name, item: url },
        ],
      },
    ],
  }
  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
