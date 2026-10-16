import type { Locale } from '@/lib/locale'

type RouteContent = {
  destination: string
  title: string
  description: string
  introduction: string
  focus: string
  planning: string[]
  questions: { question: string; answer: string }[]
}

export type FreightRoute = {
  slug: string
  region: 'dominican-republic' | 'caribbean'
  code: string
  en: RouteContent
  es: RouteContent
}

export const freightRoutes: FreightRoute[] = [
  {
    slug: 'miami-dominican-republic', region: 'dominican-republic', code: 'MIA → DO',
    en: {
      destination: 'Dominican Republic',
      title: 'Freight from Miami to the Dominican Republic',
      description: 'Plan commercial freight from Miami to the Dominican Republic with TLI. Compare air and ocean options and request a quote tailored to your cargo and destination.',
      introduction: 'Connect your suppliers in the United States with your business in the Dominican Republic. Our team in Medley, Florida helps coordinate air and ocean freight around your cargo, destination and delivery needs.',
      focus: 'From supplier pickup to the destination you specify.',
      planning: [
        'Tell us where the goods are located and whether pickup or delivery to our Miami warehouse is needed.',
        'Specify the final city in the Dominican Republic and whether you need terminal delivery or an onward delivery option evaluated.',
        'For purchases from several suppliers, share when each order will be ready so we can evaluate consolidation before departure.',
      ],
      questions: [
        { question: 'Can I request air and ocean options for the same shipment?', answer: 'Yes. Tell us your cargo dimensions, weight and required delivery date. Ask our team to compare air and ocean options, including consolidated cargo or a full container where appropriate.' },
        { question: 'Can I combine purchases from different suppliers?', answer: 'Ask us to evaluate consolidation in Miami. Include the number of suppliers, pickup locations, package counts and expected readiness dates so the team can assess how to coordinate the orders.' },
        { question: 'Does the quote include delivery to my city?', answer: 'Specify your city and delivery address in the Dominican Republic. The team will confirm the proposed scope, available delivery options and which charges are included before you proceed.' },
        { question: 'How much does shipping cost and how long does it take?', answer: 'The quote depends on the cargo, service, origin, destination and availability. Share your shipment details to receive a proposal with the applicable costs and estimated timing.' },
      ],
    },
    es: {
      destination: 'República Dominicana',
      title: 'Carga de Miami a República Dominicana',
      description: 'Planifica tu carga comercial de Miami a República Dominicana con TLI. Compara opciones aéreas y marítimas y cotiza según tu mercancía y destino.',
      introduction: 'Conecta a tus proveedores en Estados Unidos con tu negocio en República Dominicana. Nuestro equipo en Medley, Florida coordina opciones de carga aérea y marítima según tu mercancía, destino y necesidades de entrega.',
      focus: 'Desde la ubicación de tu proveedor hasta el destino que necesitas.',
      planning: [
        'Indica dónde está la mercancía y si necesitas recogida o entrega en nuestro almacén en Miami.',
        'Especifica la ciudad final en República Dominicana y si deseas evaluar entrega en terminal o una conexión hasta tu dirección.',
        'Si compras a varios proveedores, comparte cuándo estará lista cada orden para evaluar su consolidación antes de la salida.',
      ],
      questions: [
        { question: '¿Puedo comparar transporte aéreo y marítimo para mi envío?', answer: 'Sí. Comparte las dimensiones, el peso y la fecha en que necesitas la mercancía. Solicita al equipo una comparación de opciones aéreas y marítimas, incluida carga consolidada o contenedor completo cuando corresponda.' },
        { question: '¿Puedo reunir compras de varios proveedores?', answer: 'Solicita una evaluación de consolidación en Miami. Incluye el número de proveedores, las ubicaciones de recogida, la cantidad de bultos y las fechas estimadas de disponibilidad para revisar cómo coordinar las órdenes.' },
        { question: '¿La cotización incluye entrega en mi ciudad?', answer: 'Indica tu ciudad y dirección de entrega en República Dominicana. El equipo confirmará el alcance propuesto, las opciones de entrega disponibles y los cargos incluidos antes de continuar.' },
        { question: '¿Cuánto cuesta el envío y cuánto tarda?', answer: 'La cotización depende de la mercancía, el servicio, el origen, el destino y la disponibilidad. Comparte los datos de tu envío para recibir una propuesta con los costos aplicables y los tiempos estimados.' },
      ],
    },
  },
  {
    slug: 'miami-caribbean', region: 'caribbean', code: 'MIA → CAR',
    en: {
      destination: 'Caribbean',
      title: 'Freight from Miami to the Caribbean',
      description: 'Coordinate commercial freight from Miami to the Caribbean with TLI. Specify your island and final destination to evaluate air, ocean and consolidation options.',
      introduction: 'Every island has its own shipping needs. Start with your destination and our Miami team will help evaluate air, ocean and consolidation options for your commercial cargo.',
      focus: 'An island-specific plan, built around your final destination.',
      planning: [
        'Specify the island or territory and final city. A regional destination alone is not enough to prepare a useful quote.',
        'Tell us whether you need an airport or port handoff, or want the team to evaluate an onward connection to your delivery address.',
        'Share recurring inventory needs and supplier readiness dates so the team can evaluate consolidation and shipment planning.',
      ],
      questions: [
        { question: 'What destination information should I provide?', answer: 'Include the island or territory, city and, if available, the delivery address. Our team evaluates service availability for that specific destination before preparing a proposal.' },
        { question: 'Are the same services available for every island?', answer: 'Available options depend on the destination, cargo and shipping date. Specify your requirements so the team can confirm the applicable routing, connections and delivery scope.' },
        { question: 'Can you help plan recurring inventory shipments?', answer: 'Share your suppliers, approximate shipment frequency, cargo volume and stock replenishment dates. The team can use that information to evaluate a freight plan for your business.' },
        { question: 'How do I compare consolidated cargo and a full container?', answer: 'Provide the total package count, dimensions and weight. We can evaluate ocean consolidation (LCL) or a full container (FCL) based on shipment volume and available options for your destination.' },
      ],
    },
    es: {
      destination: 'Caribe',
      title: 'Carga de Miami al Caribe',
      description: 'Coordina carga comercial de Miami al Caribe con TLI. Indica la isla y el destino final para evaluar transporte aéreo, marítimo y consolidación.',
      introduction: 'Cada isla tiene sus propias necesidades de transporte. Comparte tu destino y nuestro equipo en Miami te ayudará a evaluar opciones aéreas, marítimas y de consolidación para tu carga comercial.',
      focus: 'Un plan para tu isla, pensado desde el destino final.',
      planning: [
        'Especifica la isla o el territorio y la ciudad final. Una referencia regional por sí sola no permite preparar una cotización útil.',
        'Indica si necesitas entrega en aeropuerto o puerto, o si deseas evaluar una conexión hasta tu dirección de entrega.',
        'Comparte tus necesidades de reposición y las fechas de disponibilidad de tus proveedores para evaluar la consolidación y planificación de envíos.',
      ],
      questions: [
        { question: '¿Qué información del destino debo indicar?', answer: 'Incluye la isla o el territorio, la ciudad y, si la tienes, la dirección de entrega. Nuestro equipo evalúa la disponibilidad del servicio para ese destino específico antes de preparar la propuesta.' },
        { question: '¿Todas las islas tienen los mismos servicios?', answer: 'Las opciones disponibles dependen del destino, la mercancía y la fecha del envío. Especifica tus necesidades para que el equipo confirme la ruta, las conexiones y el alcance de entrega aplicables.' },
        { question: '¿Pueden ayudarme a planificar envíos recurrentes de inventario?', answer: 'Comparte tus proveedores, la frecuencia aproximada de los envíos, el volumen de carga y las fechas de reposición. El equipo podrá usar esa información para evaluar un plan de transporte para tu negocio.' },
        { question: '¿Cómo comparo carga consolidada y contenedor completo?', answer: 'Indica la cantidad total de bultos, sus dimensiones y su peso. Podemos evaluar consolidación marítima (LCL) o contenedor completo (FCL) según el volumen y las opciones disponibles para tu destino.' },
      ],
    },
  },
]

export const freightRoutePath = (slug: string) => `/routes/${slug}`

export function routeQuoteParams(route: FreightRoute, locale: Locale, service = 'air') {
  return new URLSearchParams({
    region: route.region,
    origin: locale === 'es' ? 'Miami, Estados Unidos' : 'Miami, United States',
    // Caribbean is a region, so leave the destination city for the customer.
    ...(route.region === 'dominican-republic' ? { destination: route[locale].destination } : {}),
    service,
  })
}
