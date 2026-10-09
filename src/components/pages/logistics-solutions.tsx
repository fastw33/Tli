'use client'

import React, { useEffect } from 'react'
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
import Footer from '@/components/Footer'

export default function LogisticsSolutionsPage() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' })
  }, [])

  return (
    <>
      <main className='relative overflow-hidden bg-[#f4f8fb] pt-12'>
        {/* Animated gradient blobs */}
        <div
          aria-hidden
          className='pointer-events-none absolute -left-40 top-24 h-[34rem] w-[34rem] rounded-full opacity-20 blur-3xl mix-blend-multiply moving-blob'
          style={{
            background: 'linear-gradient(135deg, #2cad3f 0%, #0a4eb6 100%)',
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />

        <div
          aria-hidden
          className='pointer-events-none absolute -right-40 top-[42rem] h-[28rem] w-[28rem] rounded-full opacity-15 blur-2xl mix-blend-screen moving-blob-2'
          style={{
            background: 'linear-gradient(135deg, #0a4eb6 0%, #042c51 100%)',
            animation: 'pulse 10s ease-in-out infinite 1s',
          }}
        />

        <LogisticsSolutionsHero />

        <section className='w-full space-y-0 py-0'>
          <div data-aos='fade-up'>
            <LogisticsServices />
          </div>
          <div data-aos='zoom-in'>
            <LogisticsNetwork />
          </div>
          <div data-aos='fade-right'>
            <LogisticsProcess />
          </div>
          <div data-aos='fade-left'>
            <LogisticsCapabilities />
          </div>
          <div data-aos='fade-up'>
            <LogisticsPartners />
          </div>
        </section>

        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.2;
            }
            50% {
              opacity: 0.35;
            }
          }
        `}</style>
      </main>

      <Footer />
    </>
  )
}
