'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

const capabilities = [
  {
    title: 'Priority Air Freight',
    description:
      'Time-critical shipments with coordinated booking, fast uplift options, and proactive tracking.',
  },
  {
    title: 'Cross-Border Coverage',
    description:
      'Direct service across North and South America with customs-ready documentation and clear handoffs.',
  },
  {
    title: 'Temperature-Controlled Cargo',
    description:
      'Sensitive products protected with packaging guidance, monitoring, and special handling protocols.',
  },
  {
    title: 'Consolidated Air Solutions',
    description:
      'Smarter routing and cost-efficient consolidation for regular lanes and recurring shipments.',
  },
]

export function AirCapabilities() {
  const { t } = useLocale()

  return (
    <section className='bg-white px-6 py-16 text-[#042c51]' data-aos='fade-up'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='max-w-3xl'>
          <p className='mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('What We Handle')}
          </p>
          <h2 className='text-3xl font-extrabold leading-tight text-[#042c51] md:text-5xl'>
            {t('Air logistics designed for urgent and high-value cargo.')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-slate-600'>
            {t(
              'Our air freight team coordinates every detail so your shipment arrives on time and in the right condition.',
            )}
          </p>
        </div>

        <div className='mt-12 grid gap-6 md:grid-cols-2'>
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
