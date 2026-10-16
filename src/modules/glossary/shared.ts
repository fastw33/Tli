export type GlossaryCategory = 'operations' | 'ocean' | 'air' | 'ground' | 'warehouse' | 'documents' | 'trade'
export type TermTranslation = { name: string; definition: string; example: string }
export type GlossaryTerm = { id: string; category: GlossaryCategory; en: TermTranslation; es: TermTranslation }
export type LocalizedTerm = TermTranslation & { id: string; category: GlossaryCategory; translation: string }

export const categories: Record<GlossaryCategory, { en: string; es: string; service: string }> = {
  operations: { en: 'Logistics essentials', es: 'Conceptos logísticos', service: '/logistics-solutions' },
  ocean: { en: 'Ocean freight', es: 'Carga marítima', service: '/ocean' },
  air: { en: 'Air freight', es: 'Carga aérea', service: '/air' },
  ground: { en: 'Ground transportation', es: 'Transporte terrestre', service: '/logistics-solutions' },
  warehouse: { en: 'Warehousing', es: 'Almacenamiento', service: '/logistics-solutions' },
  documents: { en: 'Shipping documents', es: 'Documentos de transporte', service: '/logistics-solutions' },
  trade: { en: 'International trade', es: 'Comercio internacional', service: '/contact' },
}

export function normalizeGlossaryText(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function glossaryLetter(name: string) {
  return normalizeGlossaryText(name).charAt(0).toUpperCase()
}

export function matchesGlossaryTerm(item: LocalizedTerm, query: string, category: GlossaryCategory | '') {
  const words = normalizeGlossaryText(query).trim().split(/\s+/).filter(Boolean)
  const text = normalizeGlossaryText(`${item.name} ${item.translation} ${item.definition} ${item.example}`)
  return (!category || item.category === category) && words.every((word) => text.includes(word))
}

export function glossaryTermPath(id: string) {
  return `/glossary/${id}`
}

export function glossaryQuoteService(category: GlossaryCategory, id?: string) {
  if (id === 'lcl') return 'lcl'
  if (id === 'ftl') return 'ftl'
  if (category === 'air' || category === 'ocean') return category
  return 'logistics'
}
