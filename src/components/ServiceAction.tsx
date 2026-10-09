'use client'

import { useLocale } from './LocaleProvider'
import { SiteLink } from './SiteLink'
import styles from './Interface.module.css'

export function ServiceAction({
  title,
  description,
  label,
  service,
}: {
  title: string
  description: string
  label: string
  service: string
}) {
  const { t, localizePath } = useLocale()
  return (
    <section className={styles.callout}>
      <div className={styles.calloutInner}>
        <div>
          <h2>{t(title)}</h2>
          <p>{t(description)}</p>
        </div>
        <SiteLink
          className={styles.primary}
          href={localizePath(`/quote-now?service=${service}`)}
        >
          {t(label)} <span aria-hidden='true'>↗</span>
        </SiteLink>
      </div>
    </section>
  )
}
