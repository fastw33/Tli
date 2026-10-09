import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import { SiteHeader } from './SiteHeader'
import { ContactDirectory } from './ContactDirectory'
import { LocaleProvider } from './LocaleProvider'
import { NavigationProvider } from './NavigationProvider'
import type { Locale } from '@/lib/locale'
import { absoluteUrl, contentLanguage } from '@/lib/site'
import { SiteStructuredData } from './StructuredData'

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
      lang={contentLanguage(locale)}
      data-scroll-behavior='smooth'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col bg-white text-neutral-900'>
        <link
          rel='describedby'
          href={absoluteUrl(locale === 'es' ? '/es/llms.txt' : '/llms.txt')}
          type='text/plain'
        />
        <link rel='ard' href='/.well-known/ard.json' type='application/json' />
        <link
          rel='ai-catalog'
          href='/.well-known/ai-catalog.json'
          type='application/json'
        />
        <SiteStructuredData />
        <noscript>
          <style>
            {
              '[data-aos] { opacity: 1 !important; transform: none !important; }'
            }
          </style>
        </noscript>
        <LocaleProvider locale={locale}>
          <NavigationProvider>
            <SiteHeader />
            {children}
            <ContactDirectory />
          </NavigationProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
