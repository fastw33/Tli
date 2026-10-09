'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocale } from '../LocaleProvider'

/** Preserve old /clients links on static hosts without requiring server redirects. */
export function LegacyRegionsRedirect() {
  const { t, localizePath } = useLocale()
  const router = useRouter()
  const destination = localizePath('/regions')
  useEffect(() => {
    router.replace(destination)
  }, [router, destination])
  return (
    <main className='mx-auto max-w-7xl px-6 py-20'>
      <h1>{t('Explore our regions')}</h1>
      <p>{t('Discover our regional and global coverage.')}</p>
      <Link href={destination}>{t('Regions')} →</Link>
    </main>
  )
}
