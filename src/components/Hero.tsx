'use client'

import { useLocale } from '@/components/LocaleProvider'
import { SiteLink as Link } from '@/components/SiteLink'
import React from 'react'
import { Nav } from './Nav'

export function Hero() {
  const { t, localizePath } = useLocale()

  return (
    <section className='relative min-h-screen overflow-hidden bg-white text-white'>
      <video
        className='absolute inset-0 h-full w-full object-cover'
        autoPlay
        muted
        loop
        playsInline
      >
        <source src='/videos/hero.mp4' type='video/mp4' />
      </video>

      <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-44 bg-gradient-to-b from-white/35 to-transparent' />

      <div className='relative z-20'>
        <Nav />
      </div>

      <div className='relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pt-12 md:pt-24'>
        <div className='max-w-3xl'>
          <h1
            className='mb-6 text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-7xl'
            style={{
              color: '#ffffff',
              WebkitTextFillColor: '#ffffff',
              background: 'none',
              textShadow: '0 2px 18px rgba(0, 0, 0, 0.65)',
            }}
          >
            {t('Global transport solutions')}
          </h1>

          <p
            className='mb-8 max-w-2xl text-base leading-relaxed text-white md:text-lg'
            style={{
              color: '#ffffff',
              WebkitTextFillColor: '#ffffff',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.45)',
            }}
          >
            {t(
              'From Miami to the Dominican Republic, the Caribbean, Latin America and beyond. Air, ocean and ground freight coordinated by TLI.',
            )}
          </p>

          <Link
            href={localizePath('/quote-now')}
            className='inline-flex rounded-md bg-[#18aeea] px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#0a4eb6]'
          >
            {t('GET A QUOTE')}
          </Link>
          <Link
            href={localizePath('/regions')}
            className='ml-4 inline-flex border-b border-white/70 py-3 text-sm font-bold !text-white hover:no-underline'
          >
            {t('Explore our regions')}{' '}
            <span aria-hidden='true' className='ml-2'>
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
