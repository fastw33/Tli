import { localePath, type Locale } from '@/lib/locale'
import { RouteReady } from './NavigationProvider'
import { PageStructuredData } from './StructuredData'

export function PageLanguageLinks({
  path,
  locale,
}: {
  path: string
  locale: Locale
}) {
  return (
    <>
      <RouteReady path={localePath(path, locale)} />
      <PageStructuredData path={path} locale={locale} />
    </>
  )
}
