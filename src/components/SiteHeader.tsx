'use client'

import { usePathname } from 'next/navigation'
import { Nav } from './Nav'
import { basePath } from '@/lib/locale'

export function SiteHeader() {
  const pathname = usePathname()

  if (basePath(pathname) === '/') {
    return null
  }

  return <Nav />
}

export default SiteHeader
