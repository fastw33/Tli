'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

const processSteps = [
  {
    title: 'Pickup',
    description:
      'We collect shipment details, choose the right service level, and schedule the truck.',
    accent: 'from-[#0a4eb6] to-[#18aeea]',
  },
  {
    title: 'Linehaul',
    description:
      'Freight moves through the main route with tracking, updates, and proactive coordination.',
    accent: 'from-[#18aeea] to-[#2cad3f]',
  },
  {
    title: 'Hub or Cross-Dock',
    description:
      'Cargo is consolidated, sorted, or transferred based on the shipment model and destination.',
    accent: 'from-[#2cad3f] to-[#0a4eb6]',
  },
  {
    title: 'Final Delivery',
    description:
      'The load reaches the destination with clear communication through the final mile.',
    accent: 'from-[#0a4eb6] to-[#042c51]',
  },
]

export function FtlLclProcess() {
  const { t } = useLocale()

  return (
    <section
      className='relative overflow-hidden bg-[#f4f8fb] px-6 py-20 text-[#042c51]'
      data-aos='fade-up'
    >
      <div className='relative mx-auto w-full max-w-7xl'>
        <div className='max-w-3xl'>
          <p className='mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('How Freight Moves')}
          </p>
          <h2 className='text-3xl font-extrabold leading-tight text-[#042c51] md:text-5xl'>
            {t('A coordinated process for truck freight.')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-slate-600'>
            {t(
              'The flow changes depending on whether your freight is dedicated or shared, but the journey always follows a clear pickup, transit, consolidation, and delivery path.',
            )}
          </p>
        </div>

        <div className='mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start'>
          <aside
            className='rounded-xl border border-slate-200 bg-[#042c51] p-8 text-white shadow-sm'
            data-aos='fade-right'
          >
            <p
              className='text-sm font-bold uppercase tracking-[0.3em] text-white/80'
              style={{ color: '#ffffff' }}
            >
              {t('Process Snapshot')}
            </p>
            <h3
              className='mt-3 text-2xl font-extrabold text-white'
              style={{ color: '#ffffff' }}
            >
              {t('Four stages, one controlled freight path.')}
            </h3>

            <div className='mt-8 space-y-4'>
              {[
                'FTL stays mostly direct from pickup to delivery.',
                'LCL can include consolidation or cross-docking.',
                'Tracking and communication happen at every stage.',
              ].map((point) => (
                <div
                  key={point}
                  className='flex items-start gap-3 rounded-xl bg-white/10 px-4 py-3'
                >
                  <span className='mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#18aeea] text-sm font-bold text-white'>
                    ✓
                  </span>
                  <span className='text-sm leading-6 text-white'>
                    {t(point)}
                  </span>
                </div>
              ))}
            </div>

            <div className='mt-8 rounded-xl border border-white/15 bg-[#0a4eb6] p-5 text-white'>
              <p className='text-sm font-bold uppercase tracking-[0.3em] text-white'>
                {t('Operations')}
              </p>
              <p className='mt-3 text-base leading-7 text-white'>
                {t('Routes, warehouses and ground transportation.')}
              </p>
            </div>
          </aside>

          <div
            className='relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm '
            data-aos='fade-left'
          >
            <div className='space-y-5'>
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className='relative rounded-xl border border-slate-200 bg-slate-50 p-5'
                  data-aos='zoom-in'
                  data-aos-delay={index * 100}
                >
                  <div
                    className={`absolute -left-2 top-5 hidden h-4 w-4 rounded-full bg-[#0a4eb6] ring-8 ring-white lg:block`}
                  />
                  <div className='flex items-start gap-4'>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a4eb6] text-lg font-bold text-white shadow-sm`}
                    >
                      0{index + 1}
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-bold uppercase tracking-[0.25em] text-[#0a4eb6]'>
                        {t(step.title)}
                      </p>
                      <p className='mt-2 text-base leading-7 text-slate-600'>
                        {t(step.description)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-8 grid gap-4 sm:grid-cols-2'>
              <div className='rounded-xl border border-[#0a4eb6]/15 bg-[#0a4eb6]/5 p-6'>
                <p className='text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
                  {t('FTL')}
                </p>
                <p className='mt-3 text-base leading-7 text-slate-700'>
                  {t(
                    'Best when you need dedicated capacity and minimal handling.',
                  )}
                </p>
              </div>
              <div className='rounded-xl border border-[#2cad3f]/15 bg-[#2cad3f]/5 p-6'>
                <p className='text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
                  {t('LCL')}
                </p>
                <p className='mt-3 text-base leading-7 text-slate-700'>
                  {t(
                    'Best when you want lower cost and your load can share space.',
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
