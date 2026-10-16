import type { Locale } from '@/lib/locale'
import { localePath } from '@/lib/locale'
import { absoluteUrl, site } from '@/lib/site'
import { glossaryTerms, localizedTerms } from './data'
import { glossaryCopy } from './copy'
import { categories, glossaryQuoteService, glossaryTermPath } from './shared'

export function glossaryQuoteUrl(id: string, locale: Locale) {
  const term = glossaryTerms.find((item) => item.id === id)
  if (!term) throw new Error(`Unknown glossary term: ${id}`)
  const params = new URLSearchParams({ service: glossaryQuoteService(term.category, term.id), term: term[locale].name })
  return absoluteUrl(`${localePath('/quote-now', locale)}?${params}`)
}

/** Build-time text reference: generated from the same definitions as the HTML. */
export function glossaryText(locale: Locale) {
  const copy = glossaryCopy[locale]
  const other = locale === 'en' ? 'es' : 'en'
  const labels = locale === 'es'
    ? { page: 'Página oficial', other: 'Versión en inglés', category: 'Tema', definition: 'Definición', example: 'Ejemplo', quote: 'Solicitar cotización', index: 'Índice del glosario', note: 'Las tarifas y la disponibilidad deben confirmarse con TLI. El formulario solicita una cotización; no reserva ni cobra un envío.' }
    : { page: 'Official page', other: 'Spanish version', category: 'Topic', definition: 'Definition', example: 'Example', quote: 'Request a quote', index: 'Glossary index', note: 'Rates and availability must be confirmed with TLI. The form requests a quote; it does not book or charge for a shipment.' }
  const terms = localizedTerms(locale).map((term) => [
    `## ${term.name}`,
    `${labels.category}: ${categories[term.category][locale]}\n${other === 'en' ? 'English' : 'Español'}: ${term.translation}`,
    `${labels.definition}: ${term.definition}`,
    `${labels.example}: ${term.example}`,
    `- [${labels.page}](${absoluteUrl(localePath(glossaryTermPath(term.id), locale))})\n- [${labels.other}](${absoluteUrl(localePath(glossaryTermPath(term.id), other))})\n- [${labels.quote}](${glossaryQuoteUrl(term.id, locale)})`,
  ].join('\n\n')).join('\n\n')
  return [
    `# ${site.name} — ${copy.title}`,
    `> ${site.businessName}. ${copy.referenceText}`,
    `[${labels.index}](${absoluteUrl(localePath('/glossary', locale))}) · [${labels.quote}](${absoluteUrl(localePath('/quote-now', locale))})`,
    labels.note,
    terms,
    copy.note,
    '',
  ].join('\n\n')
}

/** Public data catalog; informational content, not an agent or booking API. */
export function glossaryCatalog() {
  return {
    version: 1,
    publisher: { name: site.name, legalName: site.businessName, url: site.url },
    languages: ['en', 'es'],
    termCount: glossaryTerms.length,
    sitemap: absoluteUrl('/sitemap.xml'),
    references: {
      en: absoluteUrl('/glossary-reference.txt'),
      es: absoluteUrl('/es/glossary-reference.txt'),
    },
    terms: glossaryTerms.map((term) => ({
      id: term.id,
      category: term.category,
      translations: Object.fromEntries((['en', 'es'] as const).map((locale) => [locale, {
        ...term[locale],
        category: categories[term.category][locale],
        url: absoluteUrl(localePath(glossaryTermPath(term.id), locale)),
        quoteUrl: glossaryQuoteUrl(term.id, locale),
      }])),
    })),
  }
}
