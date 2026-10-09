'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

const ftlPoints = [
  'One customer, one truck, fewer stops',
  'Faster transit and fewer touchpoints',
  'Best for larger or urgent shipments',
]

const lclPoints = [
  'Multiple shipments share the same truck',
  'Lower cost for smaller freight volumes',
  'Best when speed is flexible and cost matters',
]

const decisionPoints = [
  'Shipment volume and cube',
  'Delivery urgency',
  'Handling and security needs',
  'Budget and routing frequency',
]

export function FtlLclCapabilities() {
  const { t } = useLocale()

  return (
    <section
      className='relative overflow-hidden bg-gradient-to-br from-[#f7fbff] via-white to-[#eefcf4] px-6 py-16 text-slate-900'
      data-aos='fade-up'
    >
      <div className='absolute left-0 top-12 h-40 w-40 rounded-full bg-[#18aeea]/15 blur-3xl' />
      <div className='absolute bottom-10 right-0 h-56 w-56 rounded-full bg-[#2cad3f]/15 blur-3xl' />

      <div className='relative mx-auto w-full max-w-7xl'>
        <div className='max-w-3xl'>
          <p className='mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('What It Means')}
          </p>
          <h2 className='text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl'>
            {t('Two truck freight models, each with a different advantage.')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-slate-600'>
            {t(
              'FTL and LCL solve different logistics problems. Use FTL when you want a dedicated truck and faster direct transit. Use LCL when you want to share space and control cost on smaller shipments.',
            )}
          </p>
        </div>

        <div className='mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
          <div className='grid gap-6 md:grid-cols-2'>
            <article
              className='rounded-[2rem] border border-[#0a4eb6]/15 bg-white p-8 shadow-lg shadow-[#0a4eb6]/5'
              data-aos='zoom-in'
              data-aos-delay='50'
            >
              <div className='inline-flex rounded-full bg-[#0a4eb6]/10 px-4 py-2 text-sm font-bold text-[#0a4eb6]'>
                {t('FTL - Full Truck Load')}
              </div>
              <p className='mt-4 text-lg leading-8 text-slate-600'>
                {t(
                  'Dedicated truck capacity for freight that needs speed, privacy, and less handling.',
                )}
              </p>
              <ul className='mt-6 space-y-3'>
                {ftlPoints.map((point) => (
                  <li
                    key={point}
                    className='flex items-start gap-3 text-slate-700'
                  >
                    <span className='mt-1 h-2.5 w-2.5 rounded-full bg-[#0a4eb6]' />
                    <span>{t(point)}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article
              className='rounded-[2rem] border border-[#2cad3f]/15 bg-white p-8 shadow-lg shadow-[#2cad3f]/5'
              data-aos='zoom-in'
              data-aos-delay='150'
            >
              <div className='inline-flex rounded-full bg-[#2cad3f]/10 px-4 py-2 text-sm font-bold text-[#2cad3f]'>
                {t('LCL - Less Than Truck Load')}
              </div>
              <p className='mt-4 text-lg leading-8 text-slate-600'>
                {t(
                  'Shared truck space for smaller freight that does not need a dedicated vehicle.',
                )}
              </p>
              <ul className='mt-6 space-y-3'>
                {lclPoints.map((point) => (
                  <li
                    key={point}
                    className='flex items-start gap-3 text-slate-700'
                  >
                    <span className='mt-1 h-2.5 w-2.5 rounded-full bg-[#2cad3f]' />
                    <span>{t(point)}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <aside
            className='rounded-[2rem] border border-slate-200 bg-slate-900 p-8 shadow-2xl'
            style={{ color: '#ffffff' }}
            data-aos='fade-left'
            data-aos-delay='100'
          >
            <p
              className='text-sm font-bold uppercase tracking-[0.3em]'
              style={{ color: '#ffffff' }}
            >
              {t('How to Decide')}
            </p>
            <h3
              className='mt-3 text-2xl font-extrabold'
              style={{ color: '#ffffff' }}
            >
              {t('We help you choose the best option for every lane.')}
            </h3>
            <div className='mt-6 space-y-4'>
              {decisionPoints.map((point) => (
                <div
                  key={point}
                  className='flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3'
                >
                  <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#18aeea] text-sm font-bold text-white'>
                    ✓
                  </span>
                  <span
                    className='text-sm font-medium'
                    style={{ color: '#ffffff' }}
                  >
                    {t(point)}
                  </span>
                </div>
              ))}
            </div>

            <div className='mt-8 rounded-3xl border border-white/15 bg-gradient-to-r from-[#0a4eb6] via-[#18aeea] to-[#2cad3f] p-5 text-white'>
              <p
                className='text-sm font-bold uppercase tracking-[0.3em]'
                style={{ color: '#ffffff' }}
              >
                {t('Operations')}
              </p>
              <p
                className='mt-3 text-base leading-7'
                style={{ color: '#ffffff' }}
              >
                {t('Route coordination and freight control.')}
              </p>
            </div>
          </aside>
        </div>

        <div className='mt-12 grid gap-4 md:grid-cols-3'>
          <div
            className='rounded-3xl border border-[#0a4eb6]/15 bg-[#0a4eb6]/5 p-6'
            data-aos='zoom-in'
            data-aos-delay='50'
          >
            <p className='text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
              {t('Best for FTL')}
            </p>
            <p className='mt-3 text-base leading-7 text-slate-700'>
              {t(
                'High-volume shipments, urgent deliveries, or freight that should stay on one truck.',
              )}
            </p>
          </div>
          <div
            className='rounded-3xl border border-[#2cad3f]/15 bg-[#2cad3f]/5 p-6'
            data-aos='zoom-in'
            data-aos-delay='100'
          >
            <p className='text-sm font-bold uppercase tracking-[0.3em] text-[#2cad3f]'>
              {t('Best for LCL')}
            </p>
            <p className='mt-3 text-base leading-7 text-slate-700'>
              {t(
                'Smaller loads, flexible timing, or shipments where cost efficiency matters most.',
              )}
            </p>
          </div>
          <div
            className='rounded-3xl border border-[#18aeea]/15 bg-[#18aeea]/5 p-6'
            data-aos='zoom-in'
            data-aos-delay='150'
          >
            <p className='text-sm font-bold uppercase tracking-[0.3em] text-[#18aeea]'>
              {t('Shared Value')}
            </p>
            <p className='mt-3 text-base leading-7 text-slate-700'>
              {t(
                'Both options benefit from tracking, route planning, and proactive shipment communication.',
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
