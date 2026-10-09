import type { Locale } from '@/lib/locale'
import { localePath } from '@/lib/locale'
import { pageInfo } from '@/lib/page-metadata'
import { absoluteUrl, contentLanguage, pagePaths, site } from '@/lib/site'

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

export function SiteStructuredData() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'LocalBusiness',
            '@id': absoluteUrl('/#organization'),
            name: site.businessName,
            alternateName: site.name,
            url: absoluteUrl('/'),
            telephone: site.telephone,
            email: site.email,
            logo: absoluteUrl(site.logo),
            image: absoluteUrl('/images/tli-social-en.png'),
            address: {
              '@type': 'PostalAddress',
              streetAddress: site.streetAddress,
              addressLocality: site.addressLocality,
              addressRegion: site.addressRegion,
              postalCode: site.postalCode,
              addressCountry: site.addressCountry,
            },
            hasMap: site.map,
            areaServed: [
              { '@type': 'Country', name: 'United States' },
              { '@type': 'Country', name: 'Dominican Republic' },
              { '@type': 'Place', name: 'Caribbean' },
              { '@type': 'Place', name: 'Central America' },
              { '@type': 'Place', name: 'South America' },
            ],
          },
          {
            '@type': 'WebSite',
            '@id': absoluteUrl('/#website'),
            url: absoluteUrl('/'),
            name: site.name,
            publisher: { '@id': absoluteUrl('/#organization') },
            inLanguage: ['en-US', 'es'],
          },
        ],
      }}
    />
  )
}

export function PageStructuredData({
  path,
  locale,
}: {
  path: string
  locale: Locale
}) {
  const page = Object.entries(pagePaths).find(
    ([, value]) => value === path,
  )?.[0] as keyof typeof pageInfo | undefined
  if (!page || page === 'login') return null
  const [name, description] = pageInfo[page][locale]
  const url = absoluteUrl(localePath(path, locale))
  const isService = ['air', 'ocean', 'ftl-lcl', 'logistics-solutions'].includes(
    page,
  )
  const graph: object[] = [
    {
      '@type': page === 'contact' ? 'ContactPage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: contentLanguage(locale),
      isPartOf: { '@id': absoluteUrl('/#website') },
      about: { '@id': absoluteUrl('/#organization') },
      ...(page !== 'home'
        ? { breadcrumb: { '@id': `${url}#breadcrumb` } }
        : {}),
      ...(isService ? { mainEntity: { '@id': `${url}#service` } } : {}),
    },
  ]
  if (page !== 'home')
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: site.name,
          item: absoluteUrl(localePath('/', locale)),
        },
        { '@type': 'ListItem', position: 2, name, item: url },
      ],
    })
  if (isService)
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name,
      description,
      url,
      provider: { '@id': absoluteUrl('/#organization') },
      areaServed: {
        '@type': 'Place',
        name: 'United States and international markets',
      },
    })
  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': graph }} />
}
