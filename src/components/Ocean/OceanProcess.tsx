'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

const processSteps = [
  'Request a quote and share lane details.',
  'We select the best routing, vessel schedule, and service level.',
  'Cargo is prepared, documented, and moved to port.',
  'You receive shipment visibility through final delivery.',
]

export function OceanProcess() {
  const { t } = useLocale()

  return (
    <section
      className='bg-slate-50 px-6 py-20 text-[#042c51]'
      data-aos='fade-up'
    >
      <div className='mx-auto w-full max-w-7xl'>
        <div className='max-w-3xl'>
          <p className='mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('Our Process')}
          </p>
          <h2 className='text-3xl font-extrabold leading-tight text-[#042c51] md:text-5xl'>
            {t('A simple ocean freight flow that keeps cargo on schedule.')}
          </h2>
        </div>

        <div className='mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {processSteps.map((step, index) => (
            <div
              key={step}
              className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'
              data-aos='zoom-in'
              data-aos-delay={index * 100}
            >
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0a4eb6] text-lg font-bold text-white'>
                {index + 1}
              </div>
              <p className='text-base leading-7 text-slate-600'>{t(step)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
