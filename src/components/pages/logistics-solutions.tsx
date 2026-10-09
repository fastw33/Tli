'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
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
  useEffect(() => {
    AOS.init({ duration: 500, once: true, easing: 'ease-out-cubic' })
  }, [])
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
