'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'
import { ServiceAction } from '../ServiceAction'

const partners = [
  {
    name: 'Fortune 500 Companies',
    description:
      'Trusted by leading enterprises for mission-critical shipments',
  },
  {
    name: 'E-Commerce Leaders',
    description: 'Supporting rapid scaling and fulfillment operations',
  },
  {
    name: 'Manufacturing Giants',
    description: 'JIT delivery and supply chain optimization expertise',
  },
  {
    name: 'Retail Networks',
    description: 'Multi-location distribution and store-to-store transfers',
  },
  {
    name: 'Import/Export Specialists',
    description: 'Customs clearance and international trade expertise',
  },
  {
    name: 'Healthcare Providers',
    description: 'Temperature-controlled and time-sensitive shipments',
  },
]

export default function LogisticsPartners() {
  const { t } = useLocale()

  return (
    <section className='w-full bg-white py-16 lg:py-24'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        {/* Section Header */}
        <div className='mb-16 max-w-3xl' data-aos='fade-up'>
          <p className='mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('Industries We Serve')}
          </p>
          <h2 className='text-4xl font-extrabold leading-tight text-[#042c51] md:text-5xl'>
            {t('Trusted by Industry Leaders')}
          </h2>
          <p className='mt-4 text-lg text-slate-600'>
            {t(
              'Our expertise spans multiple industries with customized solutions for unique logistics challenges.',
            )}
          </p>
        </div>

        {/* Partners Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {partners.map((partner, idx) => (
            <div
              key={idx}
              data-aos='fade-up'
              data-aos-delay={idx * 75}
              className='group relative overflow-hidden rounded-xl border border-slate-200 bg-[#f4f8fb] p-8 shadow-sm transition hover:shadow-sm'
            >
              {/* Top accent bar */}
              <div className='absolute top-0 left-0 h-1 w-0 bg-[#0a4eb6] transition-all duration-300 group-hover:w-full' />

              <div className='relative'>
                <h3 className='mb-2 text-lg font-bold text-[#042c51]'>
                  {t(partner.name)}
                </h3>
                <p className='text-slate-600'>{t(partner.description)}</p>

                {/* Corner decoration */}
                <div
                  aria-hidden
                  className='absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[#0a4eb6]/5 transition group-hover:bg-[#0a4eb6]/10'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceAction
        title='Ready to Optimize Your Logistics?'
        description="Let's discuss how our comprehensive solutions can improve your supply chain efficiency."
        label='Schedule a Consultation'
        service='logistics'
      />
    </section>
  )
}
