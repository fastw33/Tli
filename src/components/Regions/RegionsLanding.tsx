'use client'

import { SiteLink as Link } from '@/components/SiteLink'
import { useLocale } from '../LocaleProvider'
import styles from './Regions.module.css'

const regions = [
  {
    id: 'dominican-republic',
    number: '01',
    name: 'Dominican Republic',
    focus: 'Regional focus',
    description:
      'Connect your business with the Dominican Republic through air and ocean freight coordinated from Miami.',
    detail:
      'A dedicated conversation for every shipment: origin, destination, cargo and timing.',
  },
  {
    id: 'caribbean',
    number: '02',
    name: 'Caribbean',
    focus: 'Island connections',
    description:
      'Cargo solutions for Caribbean markets, with planning that considers each destination and its shipment requirements.',
    detail:
      'Coordinate consolidation, documentation and delivery with our team.',
  },
  {
    id: 'central-america',
    number: '03',
    name: 'Central America',
    focus: 'Latin America',
    description:
      'Move cargo between Miami and Central America with a plan tailored to your supply chain.',
    detail:
      'Air and ocean options for commercial cargo and recurring shipments.',
  },
  {
    id: 'south-america',
    number: '04',
    name: 'South America',
    focus: 'Latin America',
    description:
      'Keep your business connected to South American markets with coordinated international freight.',
    detail:
      'Choose the right service for your cargo volume, budget and schedule.',
  },
  {
    id: 'global',
    number: '05',
    name: 'Global',
    focus: 'Beyond the region',
    description:
      'Extend your reach beyond Latin America with international freight planning through TLI.',
    detail:
      'Tell us your origin and destination so we can evaluate the available options.',
  },
]

const industries = [
  {
    name: 'Retail & E-commerce',
    description:
      'Inventory, commercial goods and distribution for growing businesses.',
  },
  {
    name: 'Manufacturing & Industrial',
    description:
      'Equipment, components and materials that keep operations moving.',
  },
  {
    name: 'Healthcare & Sensitive Cargo',
    description:
      'Shipment planning for products with specific handling requirements.',
  },
  {
    name: 'Food & Perishables',
    description:
      'Coordination for cargo with temperature and timing requirements.',
  },
  {
    name: 'Construction & Projects',
    description:
      'Materials, machinery and project cargo with tailored logistics planning.',
  },
  {
    name: 'Importers & Exporters',
    description:
      'International freight coordination for businesses trading across borders.',
  },
]

function RouteNetwork() {
  const { t } = useLocale()
  return (
    <div className={styles.network}>
      <div className={styles.networkHeader}>
        <span>{t('MIAMI · LOGISTICS HUB')}</span>
        <span aria-hidden='true'>↗</span>
      </div>
      <svg
        viewBox='0 0 580 440'
        role='img'
        aria-label={t(
          'Connections from Miami to the Dominican Republic, the Caribbean, Central America, South America and global markets',
        )}
      >
        <defs>
          <pattern
            id='network-grid'
            width='40'
            height='40'
            patternUnits='userSpaceOnUse'
          >
            <path
              d='M40 0H0V40'
              fill='none'
              stroke='#ffffff'
              strokeOpacity='.08'
            />
          </pattern>
        </defs>
        <rect width='580' height='440' fill='url(#network-grid)' />
        <g fill='none' strokeWidth='1.5'>
          <path d='M165 120Q300 50 400 140' stroke='#81d7b5' />
          <path d='M165 120Q375 130 438 218' stroke='#81d7b5' />
          <path d='M165 120Q85 185 166 252' stroke='#62bdf1' />
          <path d='M165 120Q195 205 292 337' stroke='#62bdf1' />
          <path
            d='M165 120Q275 0 467 61'
            stroke='#ffffff'
            strokeOpacity='.45'
            strokeDasharray='5 5'
          />
        </g>
        <g fill='#81d7b5'>
          <circle cx='400' cy='140' r='5' />
          <circle cx='438' cy='218' r='5' />
        </g>
        <g fill='#62bdf1'>
          <circle cx='166' cy='252' r='5' />
          <circle cx='292' cy='337' r='5' />
        </g>
        <circle cx='467' cy='61' r='4' fill='white' />
        <circle cx='165' cy='120' r='23' fill='#ffffff' fillOpacity='.08' />
        <circle cx='165' cy='120' r='13' fill='#ffffff' fillOpacity='.14' />
        <circle cx='165' cy='120' r='5' fill='white' />
        <g fill='white' fontFamily='Arial, sans-serif' fontSize='13'>
          <text x='165' y='157' textAnchor='middle' fontWeight='700'>
            MIAMI
          </text>
          <text x='400' y='167' textAnchor='middle'>
            {t('Dominican Republic')}
          </text>
          <text x='438' y='245' textAnchor='middle'>
            {t('Caribbean')}
          </text>
          <text x='166' y='280' textAnchor='middle'>
            {t('Central America')}
          </text>
          <text x='292' y='365' textAnchor='middle'>
            {t('South America')}
          </text>
          <text x='467' y='89' textAnchor='middle'>
            {t('Global')}
          </text>
        </g>
      </svg>
      <p className={styles.networkNote}>
        {t('One team in Miami. A world of possibilities.')}
      </p>
    </div>
  )
}

export function RegionsLanding() {
  const { t, localizePath } = useLocale()
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{t('TLI · REGIONS')}</p>
          <h1>
            {t('Rooted in Miami.')}
            <br />
            <span>{t('Connected to your world.')}</span>
          </h1>
          <p className={styles.intro}>
            {t(
              'Your connection to the Dominican Republic, the Caribbean and Latin America, with reach across global markets.',
            )}
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primary} href={localizePath('/quote-now')}>
              {t('Plan your shipment')} <span aria-hidden='true'>↗</span>
            </Link>
            <a className={styles.secondary} href='#region-coverage'>
              {t('Explore coverage')} <span aria-hidden='true'>↓</span>
            </a>
          </div>
        </div>
        <RouteNetwork />
      </section>

      <nav className={styles.regionNav} aria-label={t('Explore regions')}>
        {regions.map((region) => (
          <a key={region.id} href={`#${region.id}`}>
            <span>{region.number}</span>
            {t(region.name)}
          </a>
        ))}
      </nav>

      <section
        id='region-coverage'
        className={styles.coverage}
        aria-labelledby='coverage-heading'
      >
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>
            {t('REGIONAL KNOWLEDGE · GLOBAL REACH')}
          </p>
          <h2 id='coverage-heading'>
            {t('A closer connection to every destination.')}
          </h2>
          <p>
            {t(
              'Start with your destination. Our team helps you choose the right combination of service, routing and cargo coordination.',
            )}
          </p>
        </div>
        <div className={styles.regionGrid}>
          {regions.map((region, index) => (
            <article
              id={region.id}
              key={region.id}
              className={`${styles.region} ${index < 2 ? styles.featured : ''}`}
            >
              <div className={styles.regionTop}>
                <span className={styles.regionNumber}>{region.number}</span>
                <span className={styles.tag}>{t(region.focus)}</span>
              </div>
              <h3>{t(region.name)}</h3>
              <p className={styles.regionDescription}>
                {t(region.description)}
              </p>
              <p className={styles.regionDetail}>{t(region.detail)}</p>
              <Link
                href={localizePath(`/quote-now?region=${region.id}`)}
                className={styles.regionLink}
              >
                {t('Discuss this destination')}{' '}
                <span aria-hidden='true'>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id='industries'
        className={styles.industries}
        aria-labelledby='industries-heading'
      >
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{t('INDUSTRIES')}</p>
          <h2 id='industries-heading'>
            {t('Different industries. The same commitment.')}
          </h2>
          <p>
            {t(
              'Your cargo has its own requirements. We build the logistics plan around your business, your products and your destination.',
            )}
          </p>
        </div>
        <div className={styles.industryGrid}>
          {industries.map((industry, index) => (
            <article key={industry.name} className={styles.industry}>
              <span className={styles.industryNumber}>0{index + 1}</span>
              <div>
                <h3>{t(industry.name)}</h3>
                <p>{t(industry.description)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <p className={styles.eyebrow}>{t('YOUR NEXT DESTINATION')}</p>
          <h2>{t('Let’s move your business forward.')}</h2>
          <p>
            {t(
              'From the Dominican Republic and the Caribbean to your next global market, start with a conversation with TLI.',
            )}
          </p>
        </div>
        <Link className={styles.primary} href={localizePath('/quote-now')}>
          {t('Plan your shipment')} <span aria-hidden='true'>↗</span>
        </Link>
      </section>
    </main>
  )
}
