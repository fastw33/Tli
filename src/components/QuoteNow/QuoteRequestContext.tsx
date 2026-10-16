'use client'

import { useSearchParams } from 'next/navigation'
import { QuoteNowForm } from './QuoteNowForm'

export function QuoteRequestContext() {
  const params = useSearchParams()
  const region = params.get('region')
  const service = params.get('service')
  const origin = params.get('origin')?.slice(0, 150) ?? ''
  const destination = params.get('destination')?.slice(0, 150) ?? ''
  const referenceTerm = params.get('term')?.slice(0, 150) ?? ''
  return (
    <QuoteNowForm
      key={JSON.stringify([region, service, origin, destination, referenceTerm])}
      region={region}
      service={service}
      origin={origin}
      destination={destination}
      referenceTerm={referenceTerm}
    />
  )
}
