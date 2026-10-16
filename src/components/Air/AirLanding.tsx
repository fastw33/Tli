import React from 'react'
import ui from '../Interface.module.css'

import { AirCTA } from './AirCTA'
import { AirCapabilities } from './AirCapabilities'
import { AirHero } from './AirHero'
import { AirProcess } from './AirProcess'
import { AviationInstitutions } from '../AviationInstitutions'

export function AirLanding() {
  return (
    <main className={ui.servicePage}>
      <AirHero />
      <AirCapabilities />
      <AirProcess />
      <AviationInstitutions />
      <AirCTA />
    </main>
  )
}
