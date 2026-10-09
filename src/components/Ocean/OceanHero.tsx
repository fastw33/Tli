'use client'

import { ServiceHero } from '../ServiceHero'

export function OceanHero() {
  return (
    <ServiceHero
      eyebrow='Ocean Freight'
      title='Reliable ocean shipping services for international cargo transport.'
      description='We handle full container, partial loads, and project cargo with a focus on visibility, coordination, and cost-effective transit across major global trade lanes.'
      service='ocean'
      facts={[
        { label: 'Coverage', value: 'Global trade lanes' },
        { label: 'Focus', value: 'Stability + Savings' },
        { label: 'Cargo Types', value: 'FCL, LCL, project cargo' },
      ]}
    />
  )
}
