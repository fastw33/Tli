'use client'

import { ServiceHero } from '../ServiceHero'

export function FtlLclHero() {
  return (
    <ServiceHero
      eyebrow='Truck Freight'
      title='FTL and LCL, explained with a clear choice for every lane.'
      description='FTL gives you a dedicated truck for speed and control. LCL shares truck space so smaller shipments move efficiently without paying for unused capacity.'
      service='ftl'
      facts={[
        { label: 'Faster', value: 'FTL priority transit' },
        { label: 'Efficient', value: 'LCL cost control' },
        { label: 'Visibility', value: 'Tracking and planning' },
      ]}
    />
  )
}
