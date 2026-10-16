import React from 'react'

import { OceanLanding, Footer } from '@/components'
import { RouteLinks } from '@/modules/freight-routes/RouteLinks'

export default function OceanPage() {
  return (
    <>
      <OceanLanding />
      <div className='pt-12'><RouteLinks /></div>
      <Footer />
    </>
  )
}
