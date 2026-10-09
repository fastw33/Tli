'use client'

import { ServiceHero } from '../ServiceHero'

export function AirHero() {
  return (
    <ServiceHero
      eyebrow='Air Freight'
      title='Fast and reliable air freight services across North and South America.'
      description='We move urgent, high-value, and time-sensitive cargo with precision. From first mile pickup to final delivery, our air freight service is built for speed, visibility, and control.'
      service='air'
      facts={[
        { label: 'Coverage', value: 'North & South America' },
        { label: 'Focus', value: 'Speed + Visibility' },
        { label: 'Cargo Types', value: 'General, sensitive, urgent' },
      ]}
    />
  )
}
