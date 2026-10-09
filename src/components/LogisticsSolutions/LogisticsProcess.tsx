'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

const processSteps = [
  {
    step: '01',
    title: 'Request & Quote',
    description:
      'Submit your shipment details and receive a competitive quote within 2 hours. Our team handles all logistics planning.',
    icon: '📋',
  },
  {
    step: '02',
    title: 'Booking & Confirmation',
    description:
      'Confirm your shipment with detailed pickup and delivery scheduling. Receive your tracking reference immediately.',
    icon: '✅',
  },
  {
    step: '03',
    title: 'Pickup & Consolidation',
    description:
      'Professional pickup services with care handling and optional consolidation to optimize costs and delivery times.',
    icon: '🚚',
  },
  {
    step: '04',
    title: 'In-Transit Tracking',
    description:
      'Real-time GPS tracking, live updates, and proactive communication throughout the entire shipment journey.',
    icon: '📍',
  },
  {
    step: '05',
    title: 'Delivery & Proof',
    description:
      'Timely delivery with digital proof of delivery, signature capture, and detailed delivery documentation.',
    icon: '📦',
  },
  {
    step: '06',
    title: 'Support & Follow-up',
    description:
      'Post-delivery support, billing reconciliation, and continuous communication for complete peace of mind.',
    icon: '💬',
  },
]

export default function LogisticsProcess() {
  const { t } = useLocale()

  return (
    <section className='w-full bg-white py-16 lg:py-24'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        {/* Section Header */}
        <div className='mb-16 max-w-3xl' data-aos='fade-up'>
          <p className='mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('How It Works')}
          </p>
          <h2 className='text-4xl font-extrabold leading-tight text-[#042c51] md:text-5xl'>
            {t('Simple, Transparent Process')}
          </h2>
          <p className='mt-4 text-lg text-slate-600'>
            {t(
              'From initial inquiry to final delivery, we keep you informed every step of the way with streamlined operations.',
            )}
          </p>
        </div>

        {/* Process Steps - Numbered Cards */}
        <div className='space-y-6'>
          {processSteps.map((item, idx) => (
            <div
              key={idx}
              data-aos='fade-right'
              data-aos-delay={idx * 75}
              className='group relative'
            >
              <div className='flex items-start gap-6'>
                {/* Step Number Circle */}
                <div className='relative flex-shrink-0'>
                  <div className='relative flex h-20 w-20 items-center justify-center rounded-full bg-[#0a4eb6] shadow-sm'>
                    <span className='text-lg font-extrabold text-white'>
                      {item.step}
                    </span>
                  </div>

                  {/* Connector Line */}
                  {idx < processSteps.length - 1 && (
                    <div
                      aria-hidden
                      className='absolute left-1/2 top-20 h-6 w-1 -translate-x-1/2 bg-[#0a4eb6]'
                    />
                  )}
                </div>

                {/* Content Card */}
                <div className='flex-1 rounded-xl border border-slate-200 bg-[#f4f8fb] p-6 shadow-sm transition hover:shadow-sm'>
                  <div className='mb-3 flex items-center gap-3'>
                    <span className='text-3xl'>{item.icon}</span>
                    <h3 className='text-xl font-bold text-[#042c51]'>
                      {t(item.title)}
                    </h3>
                  </div>
                  <p className='text-slate-600'>{t(item.description)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
