import React from 'react'

import { AirLanding, Footer } from '@/components'
import { RouteLinks } from '@/modules/freight-routes/RouteLinks'

export default function AirPage() {
  return (
    <>
      <AirLanding />
      <div className='pt-12'><RouteLinks /></div>
      <Footer />
    </>
  )
}
