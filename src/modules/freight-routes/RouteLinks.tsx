'use client'

import { SiteLink } from '@/components/SiteLink'
import { useLocale } from '@/components/LocaleProvider'
import { freightRoutes, freightRoutePath } from './data'
import { routeCopy } from './copy'
import styles from './Routes.module.css'

export function RouteLinks() {
  const { locale, localizePath } = useLocale()
  return <nav className={styles.routeLinks} aria-label={routeCopy[locale].links}>
    <p>{routeCopy[locale].links}</p>
    <div>{freightRoutes.map((route) => <SiteLink key={route.slug} href={localizePath(freightRoutePath(route.slug))}>{route[locale].title}<span aria-hidden='true'>↗</span></SiteLink>)}</div>
  </nav>
}
