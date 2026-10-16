import type { Locale } from '@/lib/locale'
import { localePath } from '@/lib/locale'
import { SiteLink } from '@/components/SiteLink'
import { Footer } from '@/components/Footer'
import { PageLanguageLinks } from '@/components/PageLanguageLinks'
import { glossaryTerms, localizedTerms } from './data'
import { glossaryCopy } from './copy'
import { GlossaryDirectory } from './GlossaryDirectory'
import { GlossaryQuoteCard } from './GlossaryQuoteCard'
import { GlossaryStructuredData } from './GlossaryStructuredData'
import { GlossaryDiscoveryLinks } from './GlossaryDiscoveryLinks'
import styles from './Glossary.module.css'

export function GlossaryPage({ locale }: { locale: Locale }) {
  const copy = glossaryCopy[locale]
  return <>
    <PageLanguageLinks path='/glossary' locale={locale} />
    <GlossaryStructuredData locale={locale} />
    <GlossaryDiscoveryLinks locale={locale} />
    <main className={styles.page}>
      <a className={styles.skip} href='#directory-title'>{copy.skip}</a>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <nav aria-label={copy.breadcrumb} className={styles.breadcrumb}>
            <SiteLink href={localePath('/', locale)}>{copy.home}</SiteLink>
            <span aria-hidden='true'>/</span><span aria-current='page'>{copy.title}</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1>{copy.title}<span>.</span></h1>
              <p className={styles.introduction}>{copy.introduction}</p>
              <SiteLink href={localePath('/quote-now', locale)} className={styles.heroButton}>{copy.requestQuote}<span aria-hidden='true'>↗</span></SiteLink>
              <p className={styles.heroMeta}><strong>{glossaryTerms.length}</strong> {copy.terms}<span aria-hidden='true'>/</span>{copy.languages}</p>
            </div>
            <GlossaryQuoteCard locale={locale} />
          </div>
        </div>
      </header>
      <GlossaryDirectory terms={localizedTerms(locale)} locale={locale} />
      <section className={styles.cta}>
        <div><p className={styles.eyebrow}>{copy.eyebrow}</p><h2>{copy.nextStep}</h2><p>{copy.nextText}</p></div>
        <SiteLink className={styles.primaryButton} href={localePath('/quote-now', locale)}>{copy.requestQuote}<span aria-hidden='true'>↗</span></SiteLink>
      </section>
      <details className={styles.references}>
        <summary>{copy.referenceLabel}</summary><p>{copy.referenceText}</p>
        <ul>
          <li><a href='https://fiata.org/about-freight-forwarding/'>{copy.fiata}</a></li>
          <li><a href='https://www.iata.org/en/publications/newsletters/iata-knowledge-hub/air-cargo-tariffs-and-rules-what-you-need-to-know/'>{copy.iata}</a></li>
          <li><a href='https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/'>{copy.icc}</a></li>
          <li><a href='https://www.help.cbp.gov/s/article/Article-1216?language=en_US'>{copy.cbp}</a></li>
        </ul><p>{copy.note}</p>
      </details>
    </main>
    <Footer />
  </>
}
