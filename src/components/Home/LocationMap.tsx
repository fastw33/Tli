'use client'

import { useLocale } from '@/components/LocaleProvider'
import AOS from 'aos'
import 'aos/dist/aos.css'
import React, { useEffect } from 'react'

export function LocationMap() {
  const { t } = useLocale()

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <section
      aria-labelledby='location-title'
      className='relative overflow-hidden bg-[#f4f8fb] px-6 py-24'
    >
      <div className='pointer-events-none absolute inset-0'>
        <div className='location-light-green absolute left-[-10%] top-1/4 h-80 w-80 rounded-full bg-[#2cad3f]/30 blur-3xl' />
        <div className='location-light-blue absolute right-[-8%] top-10 h-96 w-96 rounded-full bg-[#0a4eb6]/20 blur-3xl' />
      </div>

      <div className='relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center'>
        <div data-aos='fade-right'>
          <p className='mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#0a4eb6]'>
            {t('Miami Warehouse')}
          </p>

          <h2
            id='location-title'
            className='text-3xl font-bold leading-tight text-[#042c51] md:text-5xl'
          >
            {t('Visit our logistics hub in Medley, Florida.')}
          </h2>

          <div className='mt-8 rounded-3xl border border-white/80 bg-white/85 p-7 shadow-xl backdrop-blur'>
            <p className='text-xl font-bold text-[#042c51]'>
              Transport Logistic International
            </p>

            <address className='mt-4 not-italic text-lg leading-relaxed text-[#4a5568]'>
              10049 NW 89th Ave unit 4
              <br />
              Medley, FL 33178
            </address>

            <div className='mt-6 flex flex-wrap gap-3'>
              <a
                href='tel:+13058876363'
                className='inline-flex rounded-full bg-[#0a4eb6] px-5 py-3 text-sm font-bold uppercase text-white shadow-sm transition hover:bg-[#042c51]'
              >
                {t('Call (305) 887-6363')}
              </a>

              <a
                href='https://www.google.com/maps/search/?api=1&query=10049%20NW%2089th%20Ave%20unit%204%20Medley%2C%20FL%2033178'
                target='_blank'
                rel='noreferrer'
                className='inline-flex rounded-full border border-[#2cad3f] bg-white px-5 py-3 text-sm font-bold uppercase text-[#042c51] shadow-sm transition hover:bg-[#2cad3f] hover:text-white'
              >
                {t('Open Map')}
              </a>
            </div>
          </div>
        </div>

        <div
          data-aos='fade-left'
          data-aos-delay='150'
          className='relative overflow-hidden rounded-[2rem] border border-white bg-white/90 p-3 shadow-2xl backdrop-blur'
        >
          <div className='absolute left-6 top-6 z-10 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#042c51] shadow-md backdrop-blur'>
            Medley, FL
          </div>

          <iframe
            title={t(
              'Transport Logistic International Miami warehouse location map',
            )}
            src='https://www.google.com/maps?q=10049%20NW%2089th%20Ave%20unit%204%20Medley%2C%20FL%2033178&output=embed'
            className='h-[430px] w-full rounded-[1.5rem] border-0 grayscale-[15%]'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </div>
    </section>
  )
}

export default LocationMap
