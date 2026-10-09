import type { Metadata } from 'next'
import type { Locale } from './locale'

export const pageInfo = {
  home: {
    en: [
      'TLI Miami | Transport Logistic International',
      'Air, ocean and ground freight connecting Miami with the Dominican Republic, the Caribbean, Latin America and global markets.',
    ],
    es: [
      'TLI Miami | Transport Logistic International',
      'Carga aérea, marítima y terrestre que conecta Miami con República Dominicana, el Caribe, Latinoamérica y mercados globales.',
    ],
  },
  regions: {
    en: [
      'Regions',
      'Explore TLI freight solutions for the Dominican Republic, the Caribbean, Central America, South America and global markets, with logistics for multiple industries.',
    ],
    es: [
      'Regiones',
      'Explora soluciones de carga TLI para República Dominicana, el Caribe, Centroamérica, Sudamérica y mercados globales, con logística para múltiples industrias.',
    ],
  },
  'logistics-solutions': {
    en: [
      'Logistics Solutions',
      'Explore TLI transportation, consolidation, warehousing and distribution services from Miami.',
    ],
    es: [
      'Soluciones logísticas',
      'Conoce los servicios TLI de transporte, consolidación, almacenamiento y distribución desde Miami.',
    ],
  },
  air: {
    en: [
      'Air Freight',
      'Air freight planning and coordination for urgent, sensitive and high-value cargo.',
    ],
    es: [
      'Carga aérea',
      'Planificación y coordinación de carga aérea para envíos urgentes, sensibles y de alto valor.',
    ],
  },
  ocean: {
    en: [
      'Ocean Freight',
      'Ocean freight solutions for full containers, consolidated shipments and project cargo.',
    ],
    es: [
      'Carga marítima',
      'Soluciones marítimas para contenedores completos, envíos consolidados y carga de proyectos.',
    ],
  },
  'ftl-lcl': {
    en: [
      'FTL / LCL',
      'Compare dedicated and shared freight options for your cargo, budget and schedule.',
    ],
    es: [
      'FTL / LCL',
      'Compara opciones de transporte exclusivo y compartido según tu carga, presupuesto y plazo.',
    ],
  },
  'quote-now': {
    en: [
      'Request a Quote',
      'Share your cargo details with TLI to plan your next shipment.',
    ],
    es: [
      'Solicita una cotización',
      'Comparte los detalles de tu carga con TLI para planificar tu próximo envío.',
    ],
  },
  login: {
    en: ['Sign In', 'Access the TLI shipping portal.'],
    es: ['Iniciar sesión', 'Accede al portal de envíos de TLI.'],
  },
} as const

export function pageMetadata(
  page: keyof typeof pageInfo,
  locale: Locale,
): Metadata {
  const [title, description] = pageInfo[page][locale]
  return { title: page === 'home' ? { absolute: title } : title, description }
}

export function rootMetadata(locale: Locale): Metadata {
  return {
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
