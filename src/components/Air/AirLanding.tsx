import React from 'react'
import ui from '../Interface.module.css'

import { AirCTA } from './AirCTA'
import { AirCapabilities } from './AirCapabilities'
import { AirHero } from './AirHero'
import { AirProcess } from './AirProcess'

export function AirLanding() {
  return (
    <main className={ui.servicePage}>
      <AirHero />
      <AirCapabilities />
      <AirProcess />
      <AirCTA />
    </main>
  )
}
