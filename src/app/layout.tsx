import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { ContactDirectory } from '@/components/ContactDirectory'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'TLI Miami | Transport Logistic International',
    template: '%s | TLI Miami',
  },
  description: 'Air, ocean and ground freight services from Transport Logistic International in Miami.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      data-scroll-behavior='smooth'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col bg-white text-neutral-900'>
        <SiteHeader />
        {children}
        <ContactDirectory />
      </body>
    </html>
  )
}
