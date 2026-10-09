'use client'

import { useLocale } from '../LocaleProvider'
import { SiteLink } from '../SiteLink'
import ui from '../Interface.module.css'

export function LoginForm() {
  const { t, localizePath } = useLocale()
  return (
    <main className={ui.page}>
      <section className={ui.hero}>
        <div>
          <p className={ui.eyebrow}>{t('TLI · Customer support')}</p>
          <h1 className={ui.title}>{t('Need help with your shipment?')}</h1>
          <p className={ui.intro}>
            {t(
              'Online account access is not available on this website. Contact our team for shipment updates and assistance.',
            )}
          </p>
          <div className={ui.actions}>
            <SiteLink className={ui.primary} href={localizePath('/contact')}>
              {t('Contact our team')}
            </SiteLink>
            <SiteLink className={ui.secondary} href={localizePath('/')}>
              {t('TLI home')}
            </SiteLink>
          </div>
        </div>
      </section>
    </main>
  )
}
