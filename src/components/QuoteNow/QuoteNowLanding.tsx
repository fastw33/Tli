'use client'

import React, { Suspense, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { QuoteNowHero } from './QuoteNowHero'
import { QuoteRequestContext } from './QuoteRequestContext'
import ui from '../Interface.module.css'
import { QuoteNowCTA } from './QuoteNowCTA'

export function QuoteNowLanding() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' })
  }, [])

  return (
    <main className={ui.page}>
      <QuoteNowHero />
      <Suspense fallback={<div className='min-h-96' />}>
        <QuoteRequestContext />
      </Suspense>
      <QuoteNowCTA />
    </main>
  )
}
