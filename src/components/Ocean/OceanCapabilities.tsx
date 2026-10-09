'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

const capabilities = [
  {
    title: 'Full Container Load',
    description:
      'Dedicated ocean capacity for larger shipments, with reliable routing and structured handoff at origin and destination.',
  },
  {
    title: 'Less Than Container Load',
    description:
      'Cost-efficient consolidation for smaller shipments that do not require a full container.',
  },
  {
    title: 'Port Coordination',
    description:
      'Terminal management, documentation support, and proactive coordination to reduce delays at port.',
  },
  {
    title: 'Project Cargo',
    description:
      'Special handling for oversized, heavy, or complex shipments that need custom planning and execution.',
  },
]

export function OceanCapabilities() {
  const { t } = useLocale()

  return (
    <section
      className='bg-white px-6 py-12 md:py-16 text-slate-900'
      data-aos='fade-up'
    >
      <div className='mx-auto w-full max-w-7xl'>
        <div className='max-w-3xl'>
          <p className='mb-2 text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('What We Handle')}
          </p>
          <h2 className='text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl'>
            {t('Ocean logistics built for reliable international movement.')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-slate-600'>
            {t(
              'From consolidation to port delivery, our ocean freight team keeps your cargo moving through a coordinated and transparent process.',
            )}
          </p>
        </div>

        <div className='mt-8 md:mt-12 grid gap-6 md:grid-cols-2'>
          {capabilities.map((item) => (
            <article
              key={item.title}
              className='rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg'
              data-aos='zoom-in'
            >
              <h3 className='text-xl font-bold text-slate-900'>
                {t(item.title)}
              </h3>
              <p className='mt-3 text-base leading-7 text-slate-600'>
                {t(item.description)}
              </p>
            </article>
          ))}
        </div>

        <div
          className='mt-8 md:mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
          data-aos='fade-up'
          data-aos-delay='150'
        >
          <div className='flex min-h-[220px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center'>
            <div>
              <p className='text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
                {t('Operations')}
              </p>
              <p className='mt-3 text-lg font-semibold text-slate-900'>
                {t('Port operations and container handling')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
