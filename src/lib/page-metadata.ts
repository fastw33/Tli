import type { Metadata } from 'next'
import type { Locale } from './locale'
import { localePath } from './locale'
import { absoluteUrl, languageAlternates, pagePaths, site } from './site'

export const pageInfo = {
  contact: {
    en: [
      'Contact Our Miami Freight Team',
      'Contact TLI Miami in Medley, Florida for US and international freight, agent partnerships and career inquiries. Call +1 (305) 887-6363.',
    ],
    es: [
      'Contacta a Nuestro Equipo de Carga en Miami',
      'Contacta a TLI Miami en Medley, Florida, para carga en Estados Unidos e internacional, alianzas y empleo. Llama al +1 (305) 887-6363.',
    ],
  },
  home: {
    en: [
      'Freight Forwarding in Miami, FL | TLI Miami',
      'TLI Miami coordinates air, ocean and ground freight from Medley, Florida across the United States, the Dominican Republic, Caribbean and Latin America.',
    ],
    es: [
      'Transporte de Carga en Miami, Florida | TLI Miami',
      'TLI Miami coordina carga aérea, marítima y terrestre desde Medley, Florida hacia Estados Unidos, República Dominicana, el Caribe y Latinoamérica.',
    ],
  },
  regions: {
    en: [
      'Freight from Miami to the Caribbean & Latin America',
      'Explore freight routes from Miami, Florida to the Dominican Republic, Caribbean, Central America, South America and global markets with TLI.',
    ],
    es: [
      'Carga desde Miami al Caribe y Latinoamérica',
      'Explora las conexiones de carga desde Miami, Florida a República Dominicana, el Caribe, Centroamérica, Sudamérica y mercados globales con TLI.',
    ],
  },
  'logistics-solutions': {
    en: [
      'Miami Logistics, Warehousing & Distribution',
      'Transportation, consolidation, warehousing and distribution from Miami, Florida. TLI coordinates domestic US logistics and international shipments.',
    ],
    es: [
      'Logística, Almacenamiento y Distribución en Miami',
      'Transporte, consolidación, almacenamiento y distribución desde Miami, Florida. TLI coordina logística en Estados Unidos y envíos internacionales.',
    ],
  },
  air: {
    en: [
      'Air Freight from Miami, Florida',
      'Plan air freight from Miami, Florida with TLI. We coordinate urgent, sensitive and high-value cargo to the Caribbean, Latin America and global markets.',
    ],
    es: [
      'Carga Aérea desde Miami, Florida',
      'Planifica carga aérea desde Miami, Florida con TLI. Coordinamos envíos urgentes, sensibles y de alto valor al Caribe, Latinoamérica y otros mercados.',
    ],
  },
  ocean: {
    en: [
      'Ocean Freight from Miami | FCL & LCL',
      'Ocean freight coordination from Miami for FCL containers, LCL consolidation and project cargo to the Dominican Republic, Caribbean and Latin America.',
    ],
    es: [
      'Carga Marítima desde Miami | FCL y LCL',
      'Carga marítima desde Miami: contenedores FCL, consolidación LCL y carga de proyectos a República Dominicana, el Caribe y Latinoamérica con TLI.',
    ],
  },
  'ftl-lcl': {
    en: [
      'FTL & LCL Freight Solutions from Miami',
      'Compare full truckload and LCL freight options with TLI Miami. Plan dedicated or shared capacity around your shipment, budget and delivery schedule.',
    ],
    es: [
      'Soluciones de Carga FTL y LCL desde Miami',
      'Compara carga FTL y LCL con TLI Miami. Planifica capacidad exclusiva o compartida según tu envío, presupuesto y plazo de entrega.',
    ],
  },
  'quote-now': {
    en: [
      'Request a Miami Freight Quote',
      'Request an air, ocean or ground freight quote from TLI Miami. Share your origin, destination, cargo weight and contact details with our Florida team.',
    ],
    es: [
      'Solicita una Cotización de Carga en Miami',
      'Cotiza carga aérea, marítima o terrestre con TLI Miami. Comparte origen, destino, peso y datos de contacto con nuestro equipo en Florida.',
    ],
  },
  login: {
    en: [
      'TLI Account Assistance',
      'Contact the TLI team for account assistance.',
    ],
    es: [
      'Asistencia de Cuenta TLI',
      'Contacta al equipo TLI para recibir asistencia con tu cuenta.',
    ],
  },
} as const

export function pageMetadata(
  page: keyof typeof pageInfo,
  locale: Locale,
): Metadata {
  const [title, description] = pageInfo[page][locale]
  const path = pagePaths[page]
  const url = absoluteUrl(localePath(path, locale))
  const fullTitle = page === 'home' ? title : `${title} | ${site.name}`
  const image = {
    url: absoluteUrl(`/images/tli-social-${locale}.png`),
    width: 1200,
    height: 630,
    alt:
      locale === 'en'
        ? 'TLI Miami — air, ocean and ground freight from Florida, USA'
        : 'TLI Miami — carga aérea, marítima y terrestre desde Florida, Estados Unidos',
  }
  const index = page !== 'login'
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: locale === 'en' ? 'en_US' : 'es_US',
      alternateLocale: locale === 'en' ? ['es_US'] : ['en_US'],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}

export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    publisher: site.businessName,
    title: {
      default: 'TLI Miami | Transport Logistic International',
      template: '%s | TLI Miami',
    },
    description: pageInfo.home[locale][1],
    icons: {
      icon: '/icon.svg',
      shortcut: '/favicon.ico',
      apple: '/apple-icon.png',
    },
  }
}
