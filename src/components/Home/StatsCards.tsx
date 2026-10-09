'use client'

import { useLocale } from '@/components/LocaleProvider'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { SiteLink as Link } from '@/components/SiteLink'
import React, { useEffect, useState } from 'react'

type StatItem =
  | {
      type: 'counter'
      end: number
      suffix: string
      label: string
      href: string
    }
  | {
      type: 'text'
      text: string
      label: string
      href: string
    }

const stats: StatItem[] = [
  {
    type: 'counter',
    end: 20,
    suffix: '+',
    label: 'Years in the industry',
    href: '/logistics-solutions',
  },
  {
    type: 'counter',
    end: 6000,
    suffix: '+',
    label: 'Shipments successfully delivered',
    href: '/regions',
  },
  {
    type: 'text',
    text: 'Licensed NVOCC',
    label: 'Licensed NVOCC',
    href: '/ocean',
  },
]

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const { locale } = useLocale()
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame: number
    const duration = 2500
    const startTime = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(eased * end))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [end])

  return (
    <>
      {count.toLocaleString(locale === 'es' ? 'es-US' : 'en-US')}
      {suffix}
    </>
  )
}

export function StatsCards() {
  const { t, localizePath } = useLocale()

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <section aria-labelledby='stats-title' className='bg-[#042c51] px-6 py-14'>
      <div className='mx-auto max-w-7xl'>
        <h2 id='stats-title' className='sr-only'>
          {t('TLI logistics experience and credentials')}
        </h2>

        <div className='grid gap-6 md:grid-cols-3'>
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              data-aos='fade-up'
              data-aos-delay={index * 150}
              className='group rounded-2xl border border-white/15 bg-white p-6 text-center shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#2cad3f]/70 hover:shadow-xl'
            >
              <p className='text-3xl font-bold text-[#0a4eb6] md:text-4xl'>
                {stat.type === 'counter' ? (
                  <Counter end={stat.end} suffix={stat.suffix} />
                ) : (
                  t(stat.text)
                )}
              </p>

              <h3 className='mt-3 text-base font-bold uppercase tracking-wide text-[#042c51]'>
                {t(stat.label)}
              </h3>

              <Link
                href={localizePath(stat.href)}
                className='mt-5 inline-flex rounded-full border border-[#0a4eb6]/40 px-5 py-2 text-xs font-bold uppercase text-[#0a4eb6] transition-all duration-300 ease-out group-hover:border-[#0a4eb6] hover:bg-[#0a4eb6] hover:text-white hover:no-underline'
              >
                {t('More')}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsCards
