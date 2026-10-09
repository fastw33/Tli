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
      className='bg-white px-6 py-12 md:py-16 text-[#042c51]'
      data-aos='fade-up'
    >
      <div className='mx-auto w-full max-w-7xl'>
        <div className='max-w-3xl'>
          <p className='mb-2 text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('What We Handle')}
          </p>
          <h2 className='text-3xl font-extrabold leading-tight text-[#042c51] md:text-5xl'>
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
              className='rounded-xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition  hover:bg-white hover:shadow-sm'
              data-aos='zoom-in'
            >
              <h3 className='text-xl font-bold text-[#042c51]'>
                {t(item.title)}
              </h3>
              <p className='mt-3 text-base leading-7 text-slate-600'>
                {t(item.description)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
