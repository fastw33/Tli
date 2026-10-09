'use client'

import { useSearchParams } from 'next/navigation'
import { QuoteNowForm } from './QuoteNowForm'

export function QuoteRequestContext() {
  const params = useSearchParams()
  const region = params.get('region')
  const service = params.get('service')
  return (
    <QuoteNowForm
      key={`${region}:${service}`}
      region={region}
      service={service}
    />
  )
}
