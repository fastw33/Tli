'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { useSiteNavigation } from './NavigationProvider'

type SiteLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

export function SiteLink({ href, onNavigate, ...props }: SiteLinkProps) {
  const navigation = useSiteNavigation()
  return (
    <Link
      {...props}
      href={href}
      scroll={navigation ? false : props.scroll}
      onNavigate={(event) => {
        let cancelled = false
        onNavigate?.({
          preventDefault: () => {
            cancelled = true
            event.preventDefault()
          },
        })
        if (!cancelled) navigation?.navigate(href)
      }}
    />
  )
}
