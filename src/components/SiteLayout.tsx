import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import { SiteHeader } from './SiteHeader'
import { ContactDirectory } from './ContactDirectory'
import { LocaleProvider } from './LocaleProvider'
import type { Locale } from '@/lib/locale'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export function SiteLayout({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <html
      lang={locale}
      data-scroll-behavior='smooth'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col bg-white text-neutral-900'>
        <LocaleProvider locale={locale}>
          <SiteHeader />
          {children}
          <ContactDirectory />
        </LocaleProvider>
      </body>
    </html>
  )
}
