export type QuoteData = {
  service: string
  region: string
  origin: string
  destination: string
  name: string
  company: string
  email: string
  phone: string
  weight: string
  details: string
}

export const quoteRegions = {
  'dominican-republic': 'Dominican Republic',
  caribbean: 'Caribbean',
  'central-america': 'Central America',
  'south-america': 'South America',
  global: 'Global',
} as const

export const quoteServices = {
  air: 'Air Freight',
  ocean: 'Ocean Freight',
  ftl: 'FTL (Full Truckload)',
  lcl: 'LCL',
  logistics: 'Logistics Solutions',
} as const

export function quoteDefaults(
  region: string | null,
  service: string | null,
): QuoteData {
  return {
    region: region && Object.hasOwn(quoteRegions, region) ? region : '',
    service: service && Object.hasOwn(quoteServices, service) ? service : 'air',
    origin: '',
    destination: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    weight: '',
    details: '',
  }
}

export function validateQuote(data: QuoteData, step: number) {
  const errors: Partial<Record<keyof QuoteData, string>> = {}
  if (!Object.hasOwn(quoteServices, data.service))
    errors.service = 'Choose a shipping service.'
  if (!Object.hasOwn(quoteRegions, data.region))
    errors.region = 'Choose a destination region.'
  if (data.origin.trim().length < 2)
    errors.origin = 'Enter the origin city and country.'
  if (data.destination.trim().length < 2)
    errors.destination = 'Enter the destination city and country.'
  if (
    data.origin.trim() &&
    data.origin.trim().toLowerCase() === data.destination.trim().toLowerCase()
  )
    errors.destination = 'Origin and destination must be different.'
  if (step === 2) {
    if (data.name.trim().length < 2) errors.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      errors.email = 'Enter a valid email address.'
    if (
      !data.weight.trim() ||
      !Number.isFinite(Number(data.weight)) ||
      Number(data.weight) <= 0
    )
      errors.weight = 'Enter a weight greater than zero.'
    const phoneDigits = data.phone.replace(/\D/g, '').length
    if (
      data.phone.trim() &&
      (!/^\+?[\d\s().-]{7,25}$/.test(data.phone.trim()) ||
        phoneDigits < 7 ||
        phoneDigits > 15)
    )
      errors.phone = 'Enter a valid phone number with country code.'
  }
  return errors
}

export function quotePayload(data: QuoteData, language: string) {
  return {
    brand: 'TLI Miami',
    businessUnit: 'Fastway',
    serviceLine: 'logistica',
    requestType: 'TLI freight quote',
    name: data.name.trim(),
    company: data.company.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    service: quoteServices[data.service as keyof typeof quoteServices],
    region: quoteRegions[data.region as keyof typeof quoteRegions],
    origin: data.origin.trim(),
    destination: data.destination.trim(),
    weight: Number(data.weight),
    weightUnit: 'kg',
    cargoDescription: data.details.trim(),
    description:
      `TLI freight quote: ${data.origin.trim()} → ${data.destination.trim()}. ${data.details.trim()}`.trim(),
    language,
  }
}
