'use client'

import { useLocale } from '@/components/LocaleProvider'
import React, { Suspense } from 'react'
import { QuoteRegionContext } from './QuoteRegionContext'

export function QuoteNowHero() {
  const { t } = useLocale()

  return (
    <section
      className='relative overflow-hidden bg-gradient-to-br from-[#f4f8fb] via-white to-[#effef7] px-6 py-12 text-slate-900'
      data-aos='fade-up'
    >
      <div className='absolute left-[-48px] top-10 h-44 w-44 rounded-full bg-[#0a4eb6]/10 blur-3xl' />
      <div className='absolute right-[-44px] bottom-0 h-56 w-56 rounded-full bg-[#18aeea]/10 blur-3xl' />

      <div className='relative mx-auto w-full max-w-5xl text-center'>
        <p className='mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
          {t('Instant Quote')}
        </p>
        <h1 className='text-2xl font-extrabold leading-tight md:text-4xl'>
          {t('Get a Custom Quote')}
        </h1>
        <p className='mx-auto mt-3 max-w-2xl text-base leading-6 text-slate-600'>
          {t('Get a custom quote for your shipping needs in minutes.')}
        </p>
        <Suspense fallback={null}>
          <QuoteRegionContext />
        </Suspense>
      </div>
    </section>
  )
}
