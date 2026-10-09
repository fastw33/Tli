'use client'

import { useLocale } from './LocaleProvider'
import { SiteLink } from './SiteLink'
import styles from './Interface.module.css'

export function ServiceHero({
  eyebrow,
  title,
  description,
  service,
  facts,
}: {
  eyebrow: string
  title: string
  description: string
  service: string
  facts: { label: string; value: string }[]
}) {
  const { t, localizePath } = useLocale()
  return (
    <section className={styles.hero}>
      <div>
        <p className={styles.eyebrow}>{t(eyebrow)}</p>
        <h1 className={styles.title}>{t(title)}</h1>
        <p className={styles.intro}>{t(description)}</p>
        <div className={styles.actions}>
          <SiteLink
            className={styles.primary}
            href={localizePath(`/quote-now?service=${service}`)}
          >
            {t('Get a Quote')} <span aria-hidden='true'>↗</span>
          </SiteLink>
          <SiteLink
            className={styles.secondary}
            href={localizePath('/regions')}
          >
            {t('Explore our regions')}
          </SiteLink>
        </div>
      </div>
      <aside className={styles.facts} aria-label={t('Service at a glance')}>
        <p className={styles.factsHeader}>{t('TLI · Service overview')}</p>
        <dl>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{t(fact.label)}</dt>
              <dd>{t(fact.value)}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  )
}
