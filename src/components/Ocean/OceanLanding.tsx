import React from 'react'
import ui from '../Interface.module.css'

import { OceanCTA } from './OceanCTA'
import { OceanCapabilities } from './OceanCapabilities'
import { OceanHero } from './OceanHero'
import { OceanProcess } from './OceanProcess'

export function OceanLanding() {
  return (
    <main className={ui.servicePage}>
      <OceanHero />
      <OceanCapabilities />
      <OceanProcess />
      <OceanCTA />
    </main>
  )
}
