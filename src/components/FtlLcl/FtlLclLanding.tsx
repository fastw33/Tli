import React from 'react'
import ui from '../Interface.module.css'

import { FtlLclCTA } from './FtlLclCTA'
import { FtlLclCapabilities } from './FtlLclCapabilities'
import { FtlLclHero } from './FtlLclHero'
import { FtlLclProcess } from './FtlLclProcess'

export function FtlLclLanding() {
  return (
    <main className={ui.servicePage}>
      <FtlLclHero />
      <FtlLclCapabilities />
      <FtlLclProcess />
      <FtlLclCTA />
    </main>
  )
}
