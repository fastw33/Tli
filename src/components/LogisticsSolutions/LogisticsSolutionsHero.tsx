'use client'

import { ServiceHero } from '../ServiceHero'

export default function LogisticsSolutionsHero() {
  return (
    <ServiceHero
      eyebrow='Our Services'
      title='Comprehensive Logistics Solutions'
      description='Tailored domestic and international logistics services for your business needs. From ground transportation to import/export management, we deliver reliable solutions across the United States.'
      service='logistics'
      facts={[
        { label: 'Coverage', value: 'Global trade lanes' },
        { label: 'Years Experience', value: '20+' },
        { label: 'Focus', value: 'Tracking and planning' },
      ]}
    />
  )
}
