import type { Locale } from '@/lib/locale'
import { localePath } from '@/lib/locale'
import { Footer } from '@/components/Footer'
import { SiteLink } from '@/components/SiteLink'
import { RouteReady } from '@/components/NavigationProvider'
import { glossaryTerms } from './data'
import { categories, glossaryQuoteService, glossaryTermPath, type GlossaryTerm } from './shared'
import { glossaryCopy } from './copy'
import { shippingGuidance } from './shipping-guidance'
import { GlossaryQuoteCard } from './GlossaryQuoteCard'
import { GlossaryTermStructuredData } from './GlossaryTermStructuredData'
import { GlossaryDiscoveryLinks } from './GlossaryDiscoveryLinks'
import styles from './Glossary.module.css'

export function GlossaryTermPage({ term, locale }: { term: GlossaryTerm; locale: Locale }) {
  const copy = glossaryCopy[locale]
  const content = term[locale]
  const guidance = shippingGuidance[term.category][locale]
  const query = new URLSearchParams({ service: glossaryQuoteService(term.category, term.id), term: content.name })
  const quotePath = `${localePath('/quote-now', locale)}?${query}`
  const related = glossaryTerms.filter((item) => item.id !== term.id && item.category === term.category).slice(0, 3)

  return <>
    <RouteReady path={localePath(glossaryTermPath(term.id), locale)} />
    <GlossaryTermStructuredData term={term} locale={locale} />
    <GlossaryDiscoveryLinks locale={locale} />
    <main className={`${styles.page} ${styles.detailPage}`}>
      <header className={`${styles.hero} ${styles.termHero}`}>
        <div className={styles.heroInner}>
          <nav aria-label={copy.breadcrumb} className={styles.breadcrumb}>
            <SiteLink href={localePath('/', locale)}>{copy.home}</SiteLink><span aria-hidden='true'>/</span>
            <SiteLink href={localePath('/glossary', locale)}>{copy.title}</SiteLink><span aria-hidden='true'>/</span><span aria-current='page'>{content.name}</span>
          </nav>
          <p className={styles.eyebrow}>{categories[term.category][locale]}</p>
          <h1>{content.name}</h1>
          <p className={styles.termTranslation} lang={locale === 'es' ? 'en' : 'es'}>{term[locale === 'es' ? 'en' : 'es'].name}</p>
          <SiteLink href={quotePath} className={styles.heroButton}>{copy.requestQuote}<span aria-hidden='true'>↗</span></SiteLink>
        </div>
      </header>
      <div className={styles.detailLayout}>
        <article className={styles.article}>
          <SiteLink href={localePath('/glossary', locale)} className={styles.backLink}><span aria-hidden='true'>←</span> {copy.back}</SiteLink>
          <section aria-labelledby='term-meaning'><h2 id='term-meaning'>{copy.meaning}</h2><p className={styles.leadDefinition}>{content.definition}</p></section>
          <section className={styles.example} aria-labelledby='term-example'><h2 id='term-example'>{copy.example}</h2><p>{content.example}</p></section>
          <section aria-labelledby='term-prepare'><h2 id='term-prepare'>{copy.prepare}</h2><p>{guidance.text}</p><ul className={styles.checklist}>{guidance.checklist.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <div className={styles.articleCta}><p>{copy.nextText}</p><SiteLink href={quotePath} className={styles.primaryButton}>{copy.requestQuote}<span aria-hidden='true'>↗</span></SiteLink></div>
          <p className={styles.editorialNote}>{copy.note}</p>
        </article>
        <div className={styles.stickyQuote}><GlossaryQuoteCard term={term} locale={locale} /></div>
      </div>
      <section className={styles.related} aria-labelledby='related-heading'>
        <h2 id='related-heading'>{copy.related}</h2>
        <div>{related.map((item) => <SiteLink key={item.id} href={localePath(glossaryTermPath(item.id), locale)}>{item[locale].name}<span aria-hidden='true'>↗</span></SiteLink>)}</div>
      </section>
      <div className={styles.mobileQuote}><SiteLink href={quotePath}>{copy.requestQuote}<span aria-hidden='true'>↗</span></SiteLink></div>
    </main>
    <Footer />
  </>
}
