'use client'

import { createContext, useContext } from 'react'
import { localePath, type Locale } from '@/lib/locale'
import spanish from '@/lib/translations/es.json'

const dictionary: Record<string, string> = spanish
const LocaleContext = createContext<Locale>('en')

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const locale = useContext(LocaleContext)
  function t(message: string, values: Record<string, string | number> = {}) {
    const translated =
      locale === 'es' ? (dictionary[message] ?? message) : message
    return translated.replace(/\{(\w+)\}/g, (placeholder, key: string) =>
      String(values[key] ?? placeholder),
    )
  }
  return { locale, t, localizePath: (path: string) => localePath(path, locale) }
}
