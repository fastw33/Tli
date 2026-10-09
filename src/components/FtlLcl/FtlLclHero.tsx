'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'

export function FtlLclHero() {
  const { t } = useLocale()

  return (
    <section
      className='relative overflow-hidden bg-gradient-to-br from-[#fff7ef] via-[#ffffff] to-[#eefcf4] px-6 py-12 md:py-20 text-slate-900'
      data-aos='fade-up'
    >
      <div className='absolute left-[-64px] top-16 h-40 w-40 rounded-full bg-[#0a4eb6]/15 blur-3xl' />
      <div className='absolute right-[-56px] top-28 h-52 w-52 rounded-full bg-[#2cad3f]/15 blur-3xl' />

      <div className='mx-auto grid w-full max-w-7xl gap-4 md:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center'>
        <div className='max-w-3xl' data-aos='fade-right'>
          <p className='mb-4 inline-flex rounded-full bg-[#0a4eb6]/10 px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('Truck Freight')}
          </p>
          <h1 className='text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl'>
            {t('FTL and LCL, explained with a clear choice for every lane.')}
          </h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-slate-600'>
            {t(
              'FTL gives you a dedicated truck for speed and control. LCL shares truck space so smaller shipments move efficiently without paying for unused capacity.',
            )}
          </p>

          <div className='mt-8 flex flex-wrap gap-4'>
            <div className='rounded-2xl border border-[#0a4eb6]/15 bg-white px-5 py-4 shadow-sm'>
              <p className='text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-[#0a4eb6]'>
                {t('Faster')}
              </p>
              <p className='mt-1 text-lg font-semibold text-slate-900'>
                {t('FTL priority transit')}
              </p>
            </div>
            <div className='rounded-2xl border border-[#2cad3f]/15 bg-white px-5 py-4 shadow-sm'>
              <p className='text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-[#2cad3f]'>
                {t('Efficient')}
              </p>
              <p className='mt-1 text-lg font-semibold text-slate-900'>
                {t('LCL cost control')}
              </p>
            </div>
            <div className='rounded-2xl border border-[#18aeea]/15 bg-white px-5 py-4 shadow-sm'>
              <p className='text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-[#18aeea]'>
                {t('Visibility')}
              </p>
              <p className='mt-1 text-lg font-semibold text-slate-900'>
                {t('Tracking and planning')}
              </p>
            </div>
          </div>
        </div>

        <div className='grid gap-4' data-aos='zoom-in' data-aos-delay='100'>
          <div className='overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl'>
            <div className='bg-gradient-to-r from-[#0a4eb6] via-[#18aeea] to-[#2cad3f] px-6 py-5 text-white'>
              <p
                className='text-xs md:text-sm font-bold uppercase tracking-[0.3em]'
                style={{ color: '#ffffff' }}
              >
                {t('FTL vs LCL')}
              </p>
              <p
                className='mt-2 text-2xl font-extrabold'
                style={{ color: '#ffffff' }}
              >
                {t('Choose the right freight mode')}
              </p>
            </div>

            <div className='grid gap-4 p-6 sm:grid-cols-2'>
              <div className='rounded-2xl border border-[#0a4eb6]/15 bg-[#0a4eb6]/5 p-5'>
                <p className='text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-[#0a4eb6]'>
                  {t('FTL')}
                </p>
                <p className='mt-2 text-base leading-7 text-slate-700'>
                  {t('Dedicated truck, fewer stops, faster direct movement.')}
                </p>
              </div>
              <div className='rounded-2xl border border-[#2cad3f]/15 bg-[#2cad3f]/5 p-5'>
                <p className='text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-[#2cad3f]'>
                  {t('LCL')}
                </p>
                <p className='mt-2 text-base leading-7 text-slate-700'>
                  {t('Shared space, lower cost, ideal for smaller loads.')}
                </p>
              </div>
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-[#0a4eb6]/5'>
              <p className='text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
                {t('Operations')}
              </p>
              <p className='mt-3 text-base leading-7 text-slate-600'>
                {t('Trucks, distribution centers and routes.')}
              </p>
            </div>
            <div className='rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-[#2cad3f]/5'>
              <p className='text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#2cad3f]'>
                {t('Operations')}
              </p>
              <p className='mt-3 text-base leading-7 text-slate-600'>
                {t('Loading and route planning.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
