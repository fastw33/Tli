'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

const networkData = {
  title: 'Nationwide Network & Coverage',
  regions: [
    {
      name: 'West Coast',
      description: 'Strategic hubs in CA, WA, OR for Pacific operations',
      coverage: '12 states',
    },
    {
      name: 'Southwest',
      description: 'Desert logistics expertise with TX, AZ, NV coverage',
      coverage: '8 states',
    },
    {
      name: 'Midwest',
      description: 'Central distribution hub serving IL, WI, MN, IA',
      coverage: '10 states',
    },
    {
      name: 'Southeast',
      description: 'Strong presence in GA, FL, NC, SC, VA operations',
      coverage: '9 states',
    },
    {
      name: 'Northeast',
      description: 'Major gateway for NY, NJ, PA, MA, CT shipping',
      coverage: '11 states',
    },
  ],
}

export default function LogisticsNetwork() {
  const { t } = useLocale()

  return (
    <section className='w-full bg-[#f4f8fb] py-16 lg:py-24'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        {/* Section Header */}
        <div className='mb-16 max-w-3xl' data-aos='fade-up'>
          <p className='mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('Coverage')}
          </p>
          <h2 className='text-4xl font-extrabold leading-tight text-[#042c51] md:text-5xl'>
            {t(networkData.title)}
          </h2>
          <p className='mt-4 text-lg text-slate-600'>
            {t(
              'Strategically positioned distribution centers and partnerships across every major region ensure efficient operations and rapid delivery times.',
            )}
          </p>
        </div>

        {/* Regions Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {networkData.regions.map((region, idx) => (
            <div
              key={idx}
              data-aos='fade-up'
              data-aos-delay={idx * 100}
              className='group relative rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-sm'
            >
              {/* Corner accent */}
              <div className='absolute right-0 top-0 h-1 w-16 rounded-bl-full bg-[#0a4eb6]' />

              <div className='relative'>
                <p className='mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0a4eb6]'>
                  {t(region.coverage)}
                </p>
                <h3 className='mb-3 text-xl font-bold text-[#042c51]'>
                  {t(region.name)}
                </h3>
                <p className='text-slate-600'>{t(region.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
