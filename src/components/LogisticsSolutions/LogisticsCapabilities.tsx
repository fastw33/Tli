'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

const capabilities = [
  {
    category: 'Technology & Tracking',
    items: [
      'Real-time GPS tracking for all shipments',
      'Mobile app for live shipment updates',
      'Automated notifications and alerts',
      'API integration for enterprise systems',
    ],
    gradient: 'from-[#0a4eb6]/10 to-[#18aeea]/10',
    icon: '📡',
  },
  {
    category: 'Compliance & Safety',
    items: [
      'DOT certified and licensed NVOCC',
      'FMCSA compliant fleet management',
      'Hazmat and specialized handling certifications',
      'Insurance coverage up to $2.5M',
    ],
    gradient: 'from-[#2cad3f]/10 to-[#0a8c2f]/10',
    icon: '🛡️',
  },
  {
    category: 'Operational Excellence',
    items: [
      'On-time delivery rate >98%',
      'Damage-free shipment guarantee',
      'Flexible scheduling and rush services',
      '24/7 customer support availability',
    ],
    gradient: 'from-[#042c51]/10 to-[#0a4eb6]/10',
    icon: '⚙️',
  },
  {
    category: 'Sustainability',
    items: [
      'Fleet optimization for reduced emissions',
      'Carbon offset programs available',
      'Eco-friendly packaging solutions',
      'Sustainable logistics practices',
    ],
    gradient: 'from-[#2cad3f]/10 to-[#18aeea]/10',
    icon: '🌱',
  },
]

export default function LogisticsCapabilities() {
  const { t } = useLocale()

  return (
    <section className='w-full bg-[#f4f8fb] py-16 lg:py-24'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        {/* Section Header */}
        <div className='mb-16 max-w-3xl' data-aos='fade-up'>
          <p className='mb-2 text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('Why Choose Us')}
          </p>
          <h2 className='text-4xl font-extrabold leading-tight text-[#042c51] md:text-5xl'>
            {t('Industry-Leading Capabilities')}
          </h2>
          <p className='mt-4 text-lg text-slate-600'>
            {t(
              'Advanced technology, strict compliance, operational excellence, and environmental responsibility in everything we do.',
            )}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className='grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              data-aos='zoom-in'
              data-aos-delay={idx * 100}
              className={`group relative rounded-xl bg-white border border-slate-200 p-8 backdrop-blur transition hover:border-slate-300 hover:shadow-sm`}
            >
              {/* Icon Background */}
              <div className='absolute right-4 top-4 text-4xl opacity-20 transition group-hover:opacity-40'>
                {cap.icon}
              </div>

              {/* Content */}
              <div className='relative z-10'>
                <h3 className='mb-6 text-lg font-bold text-[#042c51]'>
                  {t(cap.category)}
                </h3>

                <ul className='space-y-3'>
                  {cap.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className='flex items-start gap-3 text-sm text-slate-700'
                    >
                      <span className='mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#0a4eb6]' />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
