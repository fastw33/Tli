import { SiteLink } from '@/components/SiteLink'
import Image from 'next/image'
import { localePath, type Locale } from '@/lib/locale'
import { freightRoutes, freightRoutePath, routeQuoteParams } from '@/modules/freight-routes/data'
import { glossaryTerms } from '@/modules/glossary/data'
import { homePreviewCopy } from './copy'
import { FreightArtwork, FreightIcon } from './FreightArtwork'
import styles from './HomePreviews.module.css'

const services = [
  { id: 'air', path: '/air', service: 'air' },
  { id: 'ocean', path: '/ocean', service: 'ocean' },
  { id: 'ftl-lcl', path: '/ftl-lcl', service: 'ftl' },
  { id: 'logistics', path: '/logistics-solutions', service: 'logistics' },
] as const

export function HomeQuoteStarter({ locale }: { locale: Locale }) {
  const copy = homePreviewCopy[locale]
  return <section className={styles.starter} aria-labelledby='home-quick-quote'>
    <div className={styles.container}>
      <div className={styles.starterHeading}><h2 id='home-quick-quote'>{copy.quickTitle}</h2><p>{copy.quickNote}</p></div>
      <form action={localePath('/quote-now', locale)} method='get' className={styles.quickForm}>
        <input type='hidden' name='origin' value={copy.origin} />
        <div><label htmlFor='home-quote-service'>{copy.service}</label><select id='home-quote-service' name='service' defaultValue='air'>{Object.entries(copy.serviceOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
        <div><label htmlFor='home-quote-region'>{copy.region}</label><select id='home-quote-region' name='region' required defaultValue=''><option value='' disabled>{copy.chooseRegion}</option>{Object.entries(copy.regions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
        <div><label htmlFor='home-quote-destination'>{copy.destination}</label><input id='home-quote-destination' name='destination' placeholder={copy.destinationHint} required minLength={2} maxLength={150} /></div>
        <button className={styles.primary} type='submit'>{copy.start}<span aria-hidden='true'>↗</span></button>
      </form>
    </div>
  </section>
}

export function HomeServicePreviews({ locale }: { locale: Locale }) {
  const copy = homePreviewCopy[locale]
  return <section className={`${styles.section} ${styles.container}`} aria-labelledby='home-services-title'>
    <header className={styles.heading}><p className={styles.eyebrow}>{copy.servicesEyebrow}</p><h2 id='home-services-title'>{copy.servicesTitle}</h2><p>{copy.servicesIntro}</p></header>
    <div className={styles.serviceGrid}>{services.map((service, index) => {
      const content = copy.services[service.id]
      const featured = service.id === 'air' || service.id === 'ocean'
      return <article key={service.id} className={`${styles.serviceCard} ${featured ? styles.featuredCard : styles.compactCard}`}>
        {featured ? <div className={`${styles.artwork} ${styles.photoArt}`}><span className={styles.artIndex}>0{index + 1} / {content.title}</span><Image src={`/images/home/${service.id === 'air' ? 'air' : 'ocean'}-freight.webp`} alt={service.id === 'air' ? copy.airImageAlt : copy.oceanImageAlt} width={1200} height={500} loading='lazy' sizes='(max-width: 760px) 100vw, 50vw' /></div> : <div className={styles.compactIcon}><FreightIcon kind={service.id === 'ftl-lcl' ? 'truck' : 'boxes'} /></div>}
        <div className={styles.serviceBody}><h3>{content.title}</h3><p>{content.description}</p>{featured && <ul className={styles.tags}>{content.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
          <div className={styles.cardActions}><SiteLink className={styles.textLink} aria-label={`${copy.viewService}: ${content.title}`} href={localePath(service.path, locale)}>{copy.viewService}<span aria-hidden='true'>↗</span></SiteLink><SiteLink className={styles.quoteLink} aria-label={`${copy.quoteService}: ${content.title}`} href={`${localePath('/quote-now', locale)}?service=${service.service}`}>{copy.quoteService}<span aria-hidden='true'>→</span></SiteLink></div>
        </div>
      </article>
    })}</div>
  </section>
}

export function HomeRoutePreviews({ locale }: { locale: Locale }) {
  const copy = homePreviewCopy[locale]
  return <div className={styles.routeSection}><p className={styles.eyebrow}>{copy.routeEyebrow}</p><div className={styles.routeGrid}>{freightRoutes.map((route, index) => <article key={route.slug} className={`${styles.routeCard} ${index === 0 ? styles.darkRoute : ''}`}>
    <div className={styles.routeVisual} aria-hidden='true'><span>MIAMI</span><div><i /><b /><i /></div><span>{route[locale].destination}</span></div>
    <p className={styles.routeOrigin}>{copy.routeOrigin}</p><h3>{route[locale].title}</h3><p>{route[locale].introduction}</p>
    <div className={styles.routeActions}><SiteLink className={styles.routeButton} aria-label={`${copy.routeView}: ${route[locale].destination}`} href={localePath(freightRoutePath(route.slug), locale)}>{copy.routeView}<span aria-hidden='true'>↗</span></SiteLink><SiteLink className={styles.routeQuote} aria-label={`${copy.routeQuote}: ${route[locale].destination}`} href={`${localePath('/quote-now', locale)}?${routeQuoteParams(route, locale)}`}>{copy.routeQuote} →</SiteLink></div>
  </article>)}</div></div>
}

export function HomeOperationsPreview({ locale }: { locale: Locale }) {
  const copy = homePreviewCopy[locale]
  return <section className={styles.operations} aria-labelledby='home-operations-title'><div className={styles.container}>
    <div className={styles.operationsGrid}><div className={styles.operationsLead}><p className={styles.eyebrow}>{copy.operationsEyebrow}</p><h2 id='home-operations-title'>{copy.operationsTitle}</h2><p>{copy.operationsIntro}</p><div className={styles.warehouseArt}><FreightArtwork kind='warehouse' /></div></div>
      <div className={styles.operationCards}>
        <article><span className={styles.operationIcon}><FreightIcon kind='project' /></span><h3>{copy.projectTitle}</h3><p>{copy.projectText}</p><SiteLink className={styles.textLink} href={localePath('/logistics-solutions#project-cargo', locale)}>{copy.projectLink}<span aria-hidden='true'>↗</span></SiteLink></article>
        <article><span className={styles.operationIcon}><FreightIcon kind='warehouse' /></span><h3>{copy.warehouseTitle}</h3><p>{copy.warehouseText}</p><SiteLink className={styles.textLink} href={localePath('/logistics-solutions#warehouse-distribution', locale)}>{copy.warehouseLink}<span aria-hidden='true'>↗</span></SiteLink></article>
      </div>
    </div>
    <div className={styles.process}><div className={styles.processHeading}><h3>{copy.processTitle}</h3><SiteLink className={styles.textLink} href={localePath('/contact', locale)}>{copy.processCta} ↗</SiteLink></div><ol>{copy.process.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h4>{step.title}</h4><p>{step.text}</p></div></li>)}</ol></div>
  </div></section>
}

export function HomeKnowledgePreview({ locale }: { locale: Locale }) {
  const copy = homePreviewCopy[locale]
  const terms = ['awb', 'fcl', 'lcl'].map((id) => glossaryTerms.find((term) => term.id === id)!)
  return <section className={`${styles.section} ${styles.container}`} aria-labelledby='home-glossary-title'>
    <div className={styles.knowledgeGrid}><div><header className={styles.heading}><p className={styles.eyebrow}>{copy.glossaryEyebrow}</p><h2 id='home-glossary-title'>{copy.glossaryTitle}</h2><p>{copy.glossaryIntro}</p></header>
      <div className={styles.termList}>{terms.map((term) => <article key={term.id}><span aria-hidden='true'>{term.id.toUpperCase()}</span><div><h3><SiteLink href={localePath(`/glossary/${term.id}`, locale)}>{term[locale].name}<span aria-hidden='true'>↗</span></SiteLink></h3><p>{term[locale].definition}</p></div></article>)}</div>
      <div className={styles.glossaryFooter}><p><strong>{glossaryTerms.length}</strong> {copy.glossaryCount}</p><SiteLink className={styles.textLink} href={localePath('/glossary', locale)}>{copy.glossaryLink}<span aria-hidden='true'>↗</span></SiteLink></div>
    </div><aside className={styles.helpCard} aria-labelledby='home-help-title'><p className={styles.eyebrow}>{copy.helpEyebrow}</p><h3 id='home-help-title'>{copy.helpTitle}</h3><p>{copy.helpText}</p><SiteLink className={styles.mintButton} href={localePath('/quote-now', locale)}>{copy.helpQuote}<span aria-hidden='true'>↗</span></SiteLink><SiteLink className={styles.helpContact} href={localePath('/contact', locale)}>{copy.helpContact} →</SiteLink></aside></div>
  </section>
}
