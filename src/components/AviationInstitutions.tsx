'use client'

import Image from 'next/image'
import { useLocale } from './LocaleProvider'
import { SiteLink } from './SiteLink'
import styles from './AviationInstitutions.module.css'

const institutions = [
  {
    id: 'iata',
    name: 'IATA',
    title: 'International Air Transport Association',
    alt: 'IATA — International Air Transport Association logo',
    role: 'Industry standards',
    description: 'Airline trade association that develops standards and guidance for the safe handling and transport of air cargo.',
    width: 480,
    height: 308,
    url: 'https://www.iata.org/en/about/',
  },
  {
    id: 'tsa',
    name: 'TSA',
    title: 'Transportation Security Administration',
    alt: 'Transportation Security Administration logo',
    role: 'Transportation security',
    description: 'U.S. agency responsible for transportation security, including air cargo security requirements. TSA is part of DHS.',
    width: 640,
    height: 212,
    url: 'https://www.tsa.gov/for-industry/cargo-screening',
  },
  {
    id: 'dhs',
    name: 'DHS',
    title: 'U.S. Department of Homeland Security',
    alt: 'U.S. Department of Homeland Security seal',
    role: 'Federal department',
    description: 'U.S. federal department that includes TSA and coordinates national security responsibilities across its agencies.',
    width: 320,
    height: 320,
    url: 'https://www.dhs.gov/about-dhs',
  },
]

export function AviationInstitutions({ compact = false }: { compact?: boolean }) {
  const { t, localizePath } = useLocale()
  const headingId = compact ? 'aviation-reference-heading' : 'aviation-standards-heading'
  return (
    <section id={compact ? 'aviation-reference' : 'aviation-standards'} aria-labelledby={headingId} className={`${styles.section} ${compact ? styles.compact : styles.expanded}`}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>{t('Air cargo · Institutional references')}</p>
            <h2 id={headingId}>{t('Safety, security and industry standards.')}</h2>
            {!compact && <p className={styles.intro}>{t('Learn about the industry association and U.S. agencies involved in the air cargo framework.')}</p>}
          </div>
          {compact && <SiteLink href={localizePath('/air#aviation-standards')} className={styles.more}>{t('Explore air freight')} <span aria-hidden='true'>↗</span></SiteLink>}
        </div>
        <div className={styles.grid}>
          {institutions.map((item) => (
            <article key={item.id} className={styles.institution}>
              <a href={item.url} aria-label={t(item.title)} className={`${styles.logo} ${styles[item.id]}`}>
                <Image src={`/images/aviation/${item.id}.webp`} alt={t(item.alt)} width={item.width} height={item.height} loading='lazy' decoding='async' />
              </a>
              <div className={styles.copy}>
                <p className={styles.role}>{t(item.role)}</p>
                <h3>{item.name}</h3>
                {!compact && <p className={styles.fullName}>{t(item.title)}</p>}
                {!compact && <p className={styles.description}>{t(item.description)}</p>}
              </div>
            </article>
          ))}
        </div>
        {!compact && <div className={styles.action}><p>{t('Plan your air shipment with clear cargo details and handling requirements.')}</p><SiteLink href={localizePath('/quote-now?service=air')}>{t('Request an air freight quote')} <span aria-hidden='true'>↗</span></SiteLink></div>}
      </div>
    </section>
  )
}
