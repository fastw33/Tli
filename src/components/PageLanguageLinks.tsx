import { localePath, type Locale } from '@/lib/locale'

export function PageLanguageLinks({
  path,
  locale,
}: {
  path: string
  locale: Locale
}) {
  return (
    <>
      <link rel='canonical' href={localePath(path, locale)} />
      <link rel='alternate' hrefLang='en' href={localePath(path, 'en')} />
      <link rel='alternate' hrefLang='es' href={localePath(path, 'es')} />
      <link
        rel='alternate'
        hrefLang='x-default'
        href={localePath(path, 'en')}
      />
    </>
  )
}
