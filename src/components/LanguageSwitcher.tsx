'use client'

import { usePathname } from 'next/navigation'
import { useLocale } from './LocaleProvider'
import { localePath, type Locale } from '@/lib/locale'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const { locale, t } = useLocale()
  return (
    <div
      className='flex shrink-0 items-center rounded-full border border-[#042c51]/20 bg-white/90 p-1'
      role='group'
      aria-label={t('Language')}
    >
      {(['en', 'es'] as Locale[]).map((language) => (
        <a
          key={language}
          href={localePath(pathname, language)}
          hrefLang={language}
          lang={language}
          aria-label={language === 'en' ? 'English' : 'Español'}
          aria-current={locale === language ? 'true' : undefined}
          onClick={(event) => {
            event.currentTarget.href = `${localePath(pathname, language)}${window.location.search}${window.location.hash}`
          }}
          className={`flex min-h-8 min-w-9 items-center justify-center rounded-full px-2 text-xs font-bold transition hover:no-underline ${locale === language ? '!bg-[#042c51] !text-white' : '!text-[#042c51] hover:bg-slate-100'}`}
        >
          {language.toUpperCase()}
        </a>
      ))}
    </div>
  )
}
