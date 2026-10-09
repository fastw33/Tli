'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

export function AirHero() {
  const { t } = useLocale()

  return (
    <section
      className='relative overflow-hidden bg-white px-6 py-20 text-slate-900'
      data-aos='fade-up'
    >
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-6 md:gap-10 lg:flex-row lg:items-end lg:justify-between'>
        <div className='max-w-3xl'>
          <p className='mb-4 text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-[#0a4eb6]'>
            {t('Air Freight')}
          </p>
          <h1 className='text-2xl md:text-4xl lg:text-6xl font-extrabold leading-tight text-slate-900'>
            {t(
              'Fast and reliable air freight services across North and South America.',
            )}
          </h1>
          <p className='mt-4 md:mt-6 max-w-2xl text-sm md:text-base lg:text-lg leading-7 md:leading-8 text-slate-600'>
            {t(
              'We move urgent, high-value, and time-sensitive cargo with precision. From first mile pickup to final delivery, our air freight service is built for speed, visibility, and control.',
            )}
          </p>
        </div>

        <div
          className='grid gap-3 md:gap-4 rounded-2xl md:rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-6 text-slate-900 grid-cols-2 sm:grid-cols-2 lg:w-[420px]'
          data-aos='zoom-in'
          data-aos-delay='100'
        >
          <div>
            <p className='text-xs md:text-sm uppercase tracking-[0.25em] text-slate-500'>
              {t('Coverage')}
            </p>
            <p className='mt-1 md:mt-2 text-lg md:text-2xl font-bold text-slate-900'>
              {t('North & South America')}
            </p>
          </div>
          <div>
            <p className='text-xs md:text-sm uppercase tracking-[0.25em] text-slate-500'>
              {t('Focus')}
            </p>
            <p className='mt-1 md:mt-2 text-lg md:text-2xl font-bold text-slate-900'>
              {t('Speed + Visibility')}
            </p>
          </div>
          <div>
            <p className='text-xs md:text-sm uppercase tracking-[0.25em] text-slate-500'>
              {t('Cargo Types')}
            </p>
            <p className='mt-1 md:mt-2 text-lg md:text-2xl font-bold text-slate-900'>
              {t('General, sensitive, urgent')}
            </p>
          </div>
          <div>
            <p className='text-xs md:text-sm uppercase tracking-[0.25em] text-slate-500'>
              {t('Support')}
            </p>
            <p className='mt-1 md:mt-2 text-lg md:text-2xl font-bold text-slate-900'>
              {t('24/7 Shipment Tracking')}
            </p>
          </div>
        </div>
      </div>

      <div className='mx-auto mt-8 md:mt-12 grid w-full max-w-7xl gap-4 md:gap-6 lg:grid-cols-[1.4fr_0.9fr]'>
        <div
          className='rounded-2xl md:rounded-3xl border border-slate-200 bg-slate-50 p-3 md:p-4 shadow-sm'
          data-aos='fade-right'
        >
          <div className='flex min-h-[200px] md:min-h-[320px] items-center justify-center rounded-xl md:rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4 md:px-6 text-center'>
            <div>
              <p className='text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
                {t('Operations')}
              </p>
              <p className='mt-2 md:mt-3 text-base md:text-lg font-semibold text-slate-900'>
                {t('Air freight coordination')}
              </p>
            </div>
          </div>
        </div>

        <div className='grid gap-3 md:gap-4 rounded-2xl md:rounded-3xl border border-slate-200 bg-white p-3 md:p-6 text-slate-900 shadow-sm'>
          <div
            className='flex min-h-[120px] md:min-h-[150px] items-center justify-center rounded-xl md:rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center px-3 md:px-0'
            data-aos='fade-left'
          >
            <p className='text-sm md:text-base font-semibold text-slate-700'>
              {t('Cargo handling and coordination')}
            </p>
          </div>
          <div
            className='flex min-h-[120px] md:min-h-[150px] items-center justify-center rounded-xl md:rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center px-3 md:px-0'
            data-aos='fade-left'
            data-aos-delay='100'
          >
            <p className='text-sm md:text-base font-semibold text-slate-700'>
              {t('Air routes and shipment tracking')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
