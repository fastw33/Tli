'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'
import { SiteLink as Link } from '@/components/SiteLink'

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
  const { t, localizePath } = useLocale()

  return (
    <section className='w-full bg-white py-16 lg:py-24'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        {/* Section Header */}
        <div className='mb-16 max-w-3xl' data-aos='fade-up'>
          <p className='mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('Industries We Serve')}
          </p>
          <h2 className='text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl'>
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
              className='group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-md transition hover:shadow-lg'
            >
              {/* Top accent bar */}
              <div className='absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#2cad3f] to-[#0a4eb6] transition-all duration-300 group-hover:w-full' />

              <div className='relative'>
                <h3 className='mb-2 text-lg font-bold text-slate-900'>
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

      {/* CTA Section - Full Width */}
      <div
        className='mt-16 w-full bg-gradient-to-r from-[#0a4eb6] via-[#2cad3f] to-[#042c51] p-12 text-center'
        data-aos='zoom-in'
      >
        <div className='mx-auto max-w-7xl'>
          <h3
            className='mb-3 text-3xl font-extrabold'
            style={{ color: '#ffffff' }}
          >
            {t('Ready to Optimize Your Logistics?')}
          </h3>
          <p className='mb-8 text-lg' style={{ color: '#ffffff' }}>
            {t(
              "Let's discuss how our comprehensive solutions can improve your supply chain efficiency.",
            )}
          </p>
          <Link
            href={localizePath('/quote-now')}
            className='inline-flex rounded-full border-2 border-white bg-white px-8 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100'
          >
            {t('Schedule a Consultation')}
          </Link>
        </div>
      </div>
    </section>
  )
}
