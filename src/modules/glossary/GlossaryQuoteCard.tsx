import type { Locale } from '@/lib/locale'
import { localePath } from '@/lib/locale'
import { glossaryCopy } from './copy'
import { glossaryQuoteService, type GlossaryTerm } from './shared'
import styles from './Glossary.module.css'

export function GlossaryQuoteCard({ locale, term }: { locale: Locale; term?: GlossaryTerm }) {
  const copy = glossaryCopy[locale]
  return (
    <aside className={styles.quoteCard} aria-labelledby='glossary-quote-heading'>
      <p className={styles.eyebrow}>{copy.quoteContext}</p>
      <h2 id='glossary-quote-heading'>{copy.quoteTitle}</h2>
      <p>{copy.quoteIntro}</p>
      <form action={localePath('/quote-now', locale)} method='get'>
        <input type='hidden' name='service' value={term ? glossaryQuoteService(term.category, term.id) : 'logistics'} />
        {term && <input type='hidden' name='term' value={term[locale].name} />}
        <label htmlFor='glossary-origin'>{copy.origin}</label>
        <input id='glossary-origin' name='origin' type='text' maxLength={150} placeholder={copy.originPlaceholder} required autoComplete='off' />
        <label htmlFor='glossary-destination'>{copy.destination}</label>
        <input id='glossary-destination' name='destination' type='text' maxLength={150} placeholder={copy.destinationPlaceholder} required autoComplete='off' />
        <button className={styles.primaryButton} type='submit'>{copy.continueQuote}<span aria-hidden='true'>↗</span></button>
      </form>
      <small>{copy.quoteNote}</small>
    </aside>
  )
}
