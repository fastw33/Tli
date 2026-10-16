'use client'

import React, { Suspense } from 'react'
import { QuoteNowHero } from './QuoteNowHero'
import { QuoteRequestContext } from './QuoteRequestContext'
import ui from '../Interface.module.css'
import { QuoteNowCTA } from './QuoteNowCTA'

export function QuoteNowLanding() {
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
