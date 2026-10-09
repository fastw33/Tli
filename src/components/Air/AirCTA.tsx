'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'
import { SiteLink as Link } from '@/components/SiteLink'

export function AirCTA() {
  const { t, localizePath } = useLocale()

  return (
    <section className='px-6 py-20' data-aos='zoom-in'>
      <div className='mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm md:p-14'>
        <h2 className='text-3xl font-extrabold text-slate-900 md:text-5xl'>
          {t('Need a faster air freight option?')}
        </h2>
        <p className='mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600'>
          {t(
            'Talk to our team about time-critical routes, priority handling, and the best air freight option for your next shipment.',
          )}
        </p>
        <Link
          href={localizePath('/quote-now')}
          className='mt-8 inline-flex rounded-full border-2 border-slate-900 bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800'
        >
          {t('Request Air Freight Quote')}
        </Link>
      </div>
    </section>
  )
}
