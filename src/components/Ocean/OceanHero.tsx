'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

export function OceanHero() {
  const { t } = useLocale()

  return (
    <section
      className='relative overflow-hidden bg-white px-6 py-12 md:py-16 text-slate-900'
      data-aos='fade-up'
    >
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-6 md:gap-10 lg:flex-row lg:items-end lg:justify-between'>
        <div className='max-w-3xl'>
          <p className='mb-4 text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-[#0a4eb6]'>
            {t('Ocean Freight')}
          </p>
          <h1 className='text-2xl md:text-4xl lg:text-6xl font-extrabold leading-tight text-slate-900'>
            {t(
              'Reliable ocean shipping services for international cargo transport.',
            )}
          </h1>
          <p className='mt-4 md:mt-6 max-w-2xl text-sm md:text-base lg:text-lg leading-7 md:leading-8 text-slate-600'>
            {t(
              'We handle full container, partial loads, and project cargo with a focus on visibility, coordination, and cost-effective transit across major global trade lanes.',
            )}
          </p>
        </div>

        <div
          className='grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-900 shadow-sm sm:grid-cols-2 lg:w-[420px]'
          data-aos='zoom-in'
          data-aos-delay='100'
        >
          <div>
            <p className='text-sm uppercase tracking-[0.25em] text-slate-500'>
              {t('Coverage')}
            </p>
            <p className='mt-2 text-2xl font-bold text-slate-900'>
              {t('Global trade lanes')}
            </p>
          </div>
          <div>
            <p className='text-sm uppercase tracking-[0.25em] text-slate-500'>
              {t('Focus')}
            </p>
            <p className='mt-2 text-2xl font-bold text-slate-900'>
              {t('Stability + Savings')}
            </p>
          </div>
          <div>
            <p className='text-sm uppercase tracking-[0.25em] text-slate-500'>
              {t('Cargo Types')}
            </p>
            <p className='mt-2 text-2xl font-bold text-slate-900'>
              {t('FCL, LCL, project cargo')}
            </p>
          </div>
          <div>
            <p className='text-sm uppercase tracking-[0.25em] text-slate-500'>
              {t('Support')}
            </p>
            <p className='mt-2 text-2xl font-bold text-slate-900'>
              {t('24/7 Shipment Updates')}
            </p>
          </div>
        </div>
      </div>

      <div className='mx-auto mt-8 grid w-full max-w-7xl gap-6 lg:grid-cols-[1.4fr_0.9fr]'>
        <div
          className='rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm'
          data-aos='fade-right'
        >
          <div className='flex min-h-[320px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 text-center'>
            <div>
              <p className='text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
                {t('Operations')}
              </p>
              <p className='mt-3 text-lg font-semibold text-slate-900'>
                {t('Ocean freight coordination')}
              </p>
            </div>
          </div>
        </div>

        <div className='grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm'>
          <div
            className='flex min-h-[150px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center'
            data-aos='fade-left'
          >
            <p className='text-base font-semibold text-slate-700'>
              {t('Ocean cargo coordination')}
            </p>
          </div>
          <div
            className='flex min-h-[150px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center'
            data-aos='fade-left'
            data-aos-delay='100'
          >
            <p className='text-base font-semibold text-slate-700'>
              {t('Routes and cargo tracking')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
