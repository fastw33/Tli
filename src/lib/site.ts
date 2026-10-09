import { localePath, type Locale } from './locale'

export const site = {
  url: 'https://tlimiami.com',
  name: 'TLI Miami',
  businessName: 'Transport Logistic International',
  telephone: '+1-305-887-6363',
  email: 'info@tlimiami.com',
  streetAddress: '10049 NW 89th Ave, Unit 4',
  addressLocality: 'Medley',
  addressRegion: 'FL',
  postalCode: '33178',
  addressCountry: 'US',
  logo: '/transport.webp',
  map: 'https://www.google.com/maps/search/?api=1&query=10049%20NW%2089th%20Ave%20unit%204%20Medley%2C%20FL%2033178',
} as const

export const pagePaths = {
  home: '/',
  regions: '/regions',
  'logistics-solutions': '/logistics-solutions',
  air: '/air',
  ocean: '/ocean',
  'ftl-lcl': '/ftl-lcl',
  'quote-now': '/quote-now',
  contact: '/contact',
  login: '/login',
} as const

export const indexablePages = Object.entries(pagePaths).filter(
  ([page]) => page !== 'login',
)

export function absoluteUrl(path: string) {
  return new URL(path, site.url).href
}

export function languageAlternates(path: string) {
  const english = absoluteUrl(localePath(path, 'en'))
  return {
    en: english,
    'en-US': english,
    es: absoluteUrl(localePath(path, 'es')),
    'x-default': english,
  }
}

export function contentLanguage(locale: Locale) {
  return locale === 'en' ? 'en-US' : 'es'
}
