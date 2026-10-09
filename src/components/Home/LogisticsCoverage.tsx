'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'
import { SiteLink as Link } from '@/components/SiteLink'

export function LogisticsCoverage() {
  const { t, localizePath } = useLocale()

  return (
    <section
      aria-labelledby='logistics-coverage-title'
      className='bg-white px-6 py-20'
    >
      <div className='mx-auto max-w-5xl text-center'>
        <p className='mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#0a4eb6]'>
          {t('Logistics Coverage')}
        </p>

        <h2
          id='logistics-coverage-title'
          className='text-3xl font-bold leading-tight text-[#042c51] md:text-5xl'
        >
          {t(
            'Connecting Miami with the Dominican Republic, the Caribbean, Central America, South America and global markets.',
          )}
        </h2>
        <Link
          href={localizePath('/regions')}
          className='mt-6 inline-flex items-center gap-2 text-sm font-bold'
        >
          {t('Explore our regions')} <span aria-hidden='true'>↗</span>
        </Link>
      </div>
    </section>
  )
}

export default LogisticsCoverage
