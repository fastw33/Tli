import type { Locale } from '@/lib/locale'
import { localePath } from '@/lib/locale'
import { absoluteUrl, contentLanguage } from '@/lib/site'
import { glossaryTerms } from './data'
import { glossaryCopy } from './copy'
import { glossaryTermPath } from './shared'

export function GlossaryStructuredData({ locale }: { locale: Locale }) {
  const url = absoluteUrl(localePath('/glossary', locale))
  const setId = `${url}#glossary`
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTermSet',
        '@id': setId,
        name: glossaryCopy[locale].title,
        description: glossaryCopy[locale].introduction,
        url,
        inLanguage: contentLanguage(locale),
        isPartOf: { '@id': `${url}#webpage` },
        publisher: { '@id': absoluteUrl('/#organization') },
        encoding: [
          { '@type': 'MediaObject', encodingFormat: 'text/plain', contentUrl: absoluteUrl(localePath('/glossary-reference.txt', locale)) },
          { '@type': 'MediaObject', encodingFormat: 'application/json', contentUrl: absoluteUrl('/glossary.json') },
        ],
        hasDefinedTerm: glossaryTerms.map((item) => ({ '@id': `${absoluteUrl(localePath(glossaryTermPath(item.id), locale))}#term` })),
      },
      ...glossaryTerms.map((item) => ({
        '@type': 'DefinedTerm',
        '@id': `${absoluteUrl(localePath(glossaryTermPath(item.id), locale))}#term`,
        url: absoluteUrl(localePath(glossaryTermPath(item.id), locale)),
        name: item[locale].name,
        alternateName: item[locale === 'es' ? 'en' : 'es'].name,
        description: item[locale].definition,
        inDefinedTermSet: { '@id': setId },
      })),
    ],
  }
  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
