'use client'

import { useLocale } from '@/components/LocaleProvider'
import React from 'react'
import { SiteLink as Link } from '@/components/SiteLink'

const heroData = {
  title: 'Comprehensive Logistics Solutions',
  subtitle:
    'Tailored domestic and international logistics services for your business needs. From ground transportation to import/export management, we deliver reliable solutions across the United States.',
  stats: [
    {
      label: 'States Covered',
      value: '50+',
      icon: '🗺️',
    },
    {
      label: 'Years Experience',
      value: '20+',
      icon: '📦',
    },
    {
      label: 'Daily Shipments',
      value: '1000+',
      icon: '🚚',
    },
  ],
}

export default function LogisticsSolutionsHero() {
  const { t, localizePath } = useLocale()

  return (
    <header className='w-full border-b border-slate-200/80 bg-white'>
      <div className='mx-auto w-full max-w-7xl px-6 py-16 lg:py-24'>
        {/* Header Text */}
        <div className='mb-12 max-w-4xl' data-aos='fade-up'>
          <p className='mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#0a4eb6]'>
            {t('Our Services')}
          </p>
          <h1 className='mb-6 text-5xl font-extrabold leading-[1.1] text-slate-900 md:text-6xl lg:text-[3.5rem]'>
            {t(heroData.title)}
          </h1>
          <p className='max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl'>
            {t(heroData.subtitle)}
          </p>

          <div className='mt-8 flex flex-wrap gap-4'>
            <Link
              href={localizePath('/quote-now')}
              className='inline-flex rounded-full bg-[#18aeea] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#0a4eb6]'
            >
              {t('Get a Quote')}
            </Link>
            <Link
              href={localizePath('/regions')}
              className='inline-flex rounded-full border border-slate-300 px-8 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50'
            >
              {t('Explore our regions')}
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className='grid gap-6 md:grid-cols-3'
          data-aos='zoom-in'
          data-aos-delay='200'
        >
          {heroData.stats.map((stat, idx) => (
            <div
              key={idx}
              className='group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-md transition hover:shadow-xl'
            >
              <div
                aria-hidden
                className='absolute -inset-full scale-0 rounded-full bg-gradient-to-r from-[#2cad3f]/20 to-[#0a4eb6]/20 transition group-hover:scale-100'
              />
              <div className='relative'>
                <div className='mb-3 text-3xl'>{stat.icon}</div>
                <p className='text-sm font-bold uppercase tracking-[0.2em] text-slate-500'>
                  {t(stat.label)}
                </p>
                <p className='mt-2 text-4xl font-extrabold text-slate-900'>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
