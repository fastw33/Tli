'use client'

import { useLocale } from '../LocaleProvider'
import { SiteLink } from '../SiteLink'
import ui from '../Interface.module.css'

export function QuoteNowCTA() {
  const { t, localizePath } = useLocale()
  return (
    <section className={ui.callout}>
      <div className={ui.calloutInner}>
        <div>
          <h2>{t("Can't Find What You Need?")}</h2>
          <p>
            {t(
              'Our logistics experts are ready to help. Get personalized support for complex shipments, special requirements, or bulk orders.',
            )}
          </p>
        </div>
        <SiteLink className={ui.primary} href={localizePath('/contact')}>
          {t('Contact our team')}
        </SiteLink>
      </div>
    </section>
  )
}
