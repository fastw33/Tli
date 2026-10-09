'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

const processSteps = [
  'Request a quote and share shipment details.',
  'We plan the best route, timing, and airline option.',
  'Cargo is picked up, secured, and prepared for uplift.',
  'You receive real-time updates until final delivery.',
]

export function AirProcess() {
  const { t } = useLocale()

  return (
    <section
      className='bg-slate-50 px-6 py-12 md:py-20 text-slate-900'
      data-aos='fade-up'
    >
      <div className='mx-auto w-full max-w-7xl'>
        <div className='max-w-3xl'>
          <p className='mb-2 text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('Our Process')}
          </p>
          <h2 className='text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl'>
            {t('A simple air freight flow that keeps shipments moving.')}
          </h2>
        </div>

        <div className='mt-8 md:mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {processSteps.map((step, index) => (
            <div
              key={step}
              className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
              data-aos='zoom-in'
              data-aos-delay={index * 100}
            >
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#0a4eb6] to-[#2cad3f] text-lg font-bold text-white'>
                {index + 1}
              </div>
              <p className='text-base leading-7 text-slate-600'>{t(step)}</p>
            </div>
          ))}
        </div>

        <div
          className='mt-8 md:mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
          data-aos='fade-up'
          data-aos-delay='150'
        >
          <div className='flex min-h-[240px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center'>
            <div>
              <p className='text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
                {t('Operations')}
              </p>
              <p className='mt-3 text-lg font-semibold text-slate-900'>
                {t('Shipment planning and tracking')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
