'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'
import { SiteLink as Link } from '@/components/SiteLink'

const services = [
  {
    title: 'Ground Transportation',
    description:
      'Full truckload (FTL) and less-than-truckload (LTL) services across all 50 states with real-time tracking and dedicated support.',
    icon: '🚚',
    color: 'from-[#0a4eb6] to-[#042c51]',
    delay: '0',
  },
  {
    title: 'Import/Export',
    description:
      'Comprehensive customs clearance, documentation, and compliance handling for international shipments to and from the United States.',
    icon: '✈️',
    color: 'from-[#2cad3f] to-[#0a8c2f]',
    delay: '100',
  },
  {
    title: 'Warehouse & Distribution',
    description:
      'Strategic warehouse locations across major hubs for seamless storage, inventory management, and distribution operations.',
    icon: '📦',
    color: 'from-[#042c51] to-[#0a4eb6]',
    delay: '200',
  },
  {
    title: 'Last-Mile Delivery',
    description:
      'Local delivery services with flexible scheduling and proof of delivery for guaranteed end-to-end solutions.',
    icon: '📍',
    color: 'from-[#18aeea] to-[#0a4eb6]',
    delay: '300',
  },
  {
    title: 'Consolidation Services',
    description:
      'Cost-effective cargo consolidation for LTL shipments, maximizing space utilization and reducing transportation costs.',
    icon: '📊',
    color: 'from-[#2cad3f] to-[#18aeea]',
    delay: '400',
  },
  {
    title: 'Specialized Handling',
    description:
      'Experience with hazmat, temperature-controlled, and oversized cargo requiring specialized equipment and expertise.',
    icon: '⚠️',
    color: 'from-[#0a4eb6] to-[#2cad3f]',
    delay: '500',
  },
]

export default function LogisticsServices() {
  const { t, localizePath } = useLocale()

  return (
    <section className='w-full bg-white py-16 lg:py-24'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        {/* Section Header */}
        <div className='mb-16 max-w-3xl' data-aos='fade-up'>
          <p className='mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('What We Offer')}
          </p>
          <h2 className='text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl'>
            {t('Full-Spectrum Logistics Services')}
          </h2>
          <p className='mt-4 text-lg text-slate-600'>
            {t(
              'End-to-end solutions designed to streamline your supply chain and reduce operational costs.',
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {services.map((service, idx) => (
            <div
              key={idx}
              data-aos='zoom-in'
              data-aos-delay={service.delay}
              className='group relative overflow-hidden rounded-2xl bg-slate-50 p-8 shadow-md transition duration-300 hover:shadow-xl'
            >
              {/* Gradient Background on Hover */}
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition duration-300 group-hover:opacity-5`}
              />

              {/* Content */}
              <div className='relative z-10'>
                <div className='mb-4 text-5xl'>{service.icon}</div>

                <h3 className='mb-3 text-xl font-bold text-slate-900 transition group-hover:text-[#0a4eb6]'>
                  {t(service.title)}
                </h3>

                <p className='text-base leading-relaxed text-slate-600'>
                  {t(service.description)}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${service.color} opacity-0 transition duration-300 group-hover:opacity-100`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* CTA Section - Full Width */}
      <div
        className='mt-16 w-full bg-gradient-to-r from-[#0a4eb6] via-[#2cad3f] to-[#042c51] p-12 text-center text-white'
        data-aos='zoom-in'
        role='region'
        aria-label={t('Schedule consultation call to action')}
      >
        <div className='mx-auto max-w-7xl'>
          <h3 className='mb-3 text-3xl font-extrabold !text-white mix-blend-normal opacity-100'>
            {t('Ready to Optimize Your Logistics?')}
          </h3>
          <p className='mb-8 text-lg !text-white mix-blend-normal opacity-100'>
            {t(
              "Let's discuss how our comprehensive solutions can improve your supply chain efficiency.",
            )}
          </p>
          <Link
            href={localizePath('/quote-now')}
            className='inline-flex rounded-full border-2 border-white bg-white px-8 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100'
            aria-label={t('Schedule a consultation')}
          >
            {t('Schedule a Consultation')}
          </Link>
        </div>
      </div>
    </section>
  )
}
