'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLocale } from './LocaleProvider'
import { SiteLink } from './SiteLink'
import { EmailCopy } from './EmailCopy'
import { contacts } from '@/lib/contacts'
import ui from './Interface.module.css'
import { site } from '@/lib/site'

const topics = {
  general: {
    title: 'Talk to the TLI team',
    description:
      'For shipment planning and service questions, start a conversation with our sales team.',
    greeting: 'Hello TLI, I would like help with my shipment.',
    contact: 'Juan Cristancho',
  },
  partnerships: {
    title: 'Become a TLI agent',
    description:
      'Talk to our sales team about agent partnerships. Tell us about your company, your location and the services you offer.',
    greeting:
      'Hello TLI, I am interested in becoming an agent. I would like to discuss a partnership.',
    contact: 'Juan Cristancho',
  },
  careers: {
    title: 'Work with TLI',
    description:
      'Contact our office team about career opportunities. Tell us your area of interest and your experience.',
    greeting: 'Hello TLI, I would like to ask about career opportunities.',
    contact: 'Liliana Puerta',
  },
}

function Inquiry() {
  const params = useSearchParams()
  const { t, localizePath } = useLocale()
  const key = params.get('topic') ?? 'general'
  const topic = Object.hasOwn(topics, key)
    ? topics[key as keyof typeof topics]
    : topics.general
  const contact = contacts.find((item) => item.name === topic.contact)!
  return (
    <main className={ui.page}>
      <section className={ui.hero}>
        <div>
          <p className={ui.eyebrow}>{t('TLI · Contact')}</p>
          <h1 className={ui.title}>{t(topic.title)}</h1>
          <p className={ui.intro}>{t(topic.description)}</p>
          <div className={ui.actions}>
            <SiteLink className={ui.secondary} href={localizePath('/regions')}>
              {t('Explore our regions')}
            </SiteLink>
          </div>
        </div>
        <article className='rounded-xl border border-[#dce5ec] bg-white p-6 sm:p-8'>
          <p className={ui.eyebrow}>{t('Your contact at TLI')}</p>
          <h2 className='!text-2xl !font-bold !text-[#042c51]'>
            {contact.name}
          </h2>
          <p className='!mt-2 !text-[#526273]'>{t(contact.role)}</p>
          <p className='!text-sm !text-[#526273]'>{contact.whatsapp?.label}</p>
          <div className={ui.actions}>
            <a
              className={ui.primary}
              href={`https://wa.me/${contact.whatsapp!.number}?text=${encodeURIComponent(t(topic.greeting))}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('Continue on WhatsApp')} <span aria-hidden='true'>↗</span>
            </a>
          </div>
          <p className='!mt-6 !text-sm !text-[#526273]'>
            {t('Prefer email? Copy the address and write to our team.')}
          </p>
          {contact.emails.map((email) => (
            <EmailCopy
              key={email}
              email={email}
              copyLabel={t('Copy')}
              copiedLabel={t('Email address copied.')}
              failedLabel={t('Select and copy the address manually.')}
            />
          ))}
        </article>
      </section>
    </main>
  )
}

export function ContactInquiry() {
  return (
    <Suspense fallback={<ContactFallback />}>
      <Inquiry />
    </Suspense>
  )
}

/** Give static HTML and visitors without JavaScript useful contact information. */
function ContactFallback() {
  const { t } = useLocale()
  return (
    <main className={ui.page}>
      <section className={ui.hero}>
        <div>
          <p className={ui.eyebrow}>{t('TLI · Contact')}</p>
          <h1 className={ui.title}>{t(topics.general.title)}</h1>
          <p className={ui.intro}>{t(topics.general.description)}</p>
        </div>
        <address className='rounded-xl border border-[#dce5ec] bg-white p-6 not-italic sm:p-8'>
          <p>{site.businessName}</p>
          <p>
            {site.streetAddress}
            <br />
            {site.addressLocality}, {site.addressRegion} {site.postalCode}
            <br />
            {t('United States')}
          </p>
          <p>
            {site.telephone}
            <br />
            {site.email}
          </p>
        </address>
      </section>
    </main>
  )
}
