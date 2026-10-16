'use client'

import {
  LogisticsSolutionsHero,
  LogisticsServices,
  LogisticsNetwork,
  LogisticsProcess,
  LogisticsCapabilities,
  LogisticsPartners,
} from '@/components/LogisticsSolutions'
import Footer from '../Footer'
import ui from '../Interface.module.css'

export default function LogisticsSolutionsPage() {
  return (
    <>
      <main className={ui.servicePage}>
        <LogisticsSolutionsHero />
        <LogisticsServices />
        <LogisticsNetwork />
        <LogisticsProcess />
        <LogisticsCapabilities />
        <LogisticsPartners />
      </main>
      <Footer />
    </>
  )
}
