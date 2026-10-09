'use client'

import { useLocale } from '@/components/LocaleProvider'
import Image from 'next/image'
import { SiteLink as Link } from '@/components/SiteLink'
import React from 'react'

export function Footer() {
  const { t, localizePath } = useLocale()

  const services = [
    'Less Than Truckload (LTL)',
    'Full Truckload (FTL)',
    'Temperature-Controlled',
    'Open Deck & Heavy Haul',
    'Container Drayage',
    'Expedited',
    'Cargo Insurance',
  ]

  const company = [
    { label: 'Regions', href: '/regions' },
    { label: 'Industries', href: '/regions#industries' },
    { label: 'Become a Customer Today', href: '/quote-now' },
    { label: 'Become an Agent', href: '/contact?topic=partnerships' },
    { label: 'Work With Us', href: '/contact?topic=careers' },
  ]

  return (
    <footer className='bg-[#f4f8fb] px-6 py-12 text-[#042c51]'>
      <div className='mx-auto grid max-w-7xl gap-6 md:gap-10 md:grid-cols-[1fr_1fr_1.4fr]'>
        <div>
          <Image
            src='/transport.webp'
            alt={t('Transport Logistic International logo')}
            width={150}
            height={60}
            className='h-auto w-[150px] object-contain'
          />

          <ul className='mt-6 space-y-2 text-sm font-semibold text-[#0a4eb6]'>
            {services.map((service) => (
              <li key={service}>{t(service)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='mb-4 text-base font-bold text-[#042c51]'>
            {t('Company')}
          </h2>

          <ul className='space-y-2 text-sm font-semibold'>
            {company.map((item) => (
              <li key={item.label}>
                <Link
                  href={localizePath(item.href)}
                  className='text-[#0a4eb6] transition hover:text-[#2cad3f]'
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className='not-italic'>
          <div className='rounded-2xl border border-[#0a4eb6]/10 bg-white p-6 shadow-lg'>
            <p className='font-bold text-[#042c51]'>
              10049 NW 89th Ave unit 4, Medley, FL 33178
              <br />
              {t('United States')}
            </p>

            <a
              href='tel:+13058876363'
              className='mt-2 block font-semibold text-[#0a4eb6] transition hover:text-[#2cad3f]'
            >
              (305) 887-6363
            </a>

            <a
              href='mailto:info@tlimiami.com'
              className='mt-2 block font-semibold text-[#0a4eb6] transition hover:text-[#2cad3f]'
            >
              info@tlimiami.com
            </a>

            <a
              href='mailto:spfway@tlimiami.com'
              className='mt-2 block font-semibold text-[#0a4eb6] transition hover:text-[#2cad3f]'
            >
              spfway@tlimiami.com
            </a>
          </div>
        </address>
      </div>

      <div className='mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-[#0a4eb6]/10 pt-6 text-center text-sm font-semibold text-[#042c51]/80 md:flex-row md:items-center md:justify-between md:text-left'>
        <p>2026 | TLI Miami | {t('All Rights Reserved')}</p>

        <p>
          {t('Designed by')}{' '}
          <span className='font-bold text-[#2cad3f]'>Greenway Bogotá</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
