'use client'

import { useLocale } from '../LocaleProvider'
import ui from '../Interface.module.css'

export function QuoteNowHero() {
  const { t } = useLocale()
  return (
    <header className='mx-auto max-w-[1100px] px-6 pb-6 pt-12 md:pt-16'>
      <p className={ui.eyebrow}>{t('TLI · Quote request')}</p>
      <h1 className={ui.title}>{t('Get a Custom Quote')}</h1>
      <p className={ui.intro}>
        {t(
          'Tell us about your shipment. Our team will help you plan the next step.',
        )}
      </p>
    </header>
  )
}
