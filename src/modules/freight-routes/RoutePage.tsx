import { Footer } from '@/components/Footer'
import { SiteLink } from '@/components/SiteLink'
import { RouteReady } from '@/components/NavigationProvider'
import { localePath, type Locale } from '@/lib/locale'
import { freightRoutes, freightRoutePath, routeQuoteParams, type FreightRoute } from './data'
import { routeCopy } from './copy'
import { RouteStructuredData } from './RouteStructuredData'
import styles from './Routes.module.css'

export function RoutePage({ route, locale }: { route: FreightRoute; locale: Locale }) {
  const copy = routeCopy[locale]
  const content = route[locale]
  const localize = (path: string) => localePath(path, locale)
  const quote = (service = 'air') => `${localize('/quote-now')}?${routeQuoteParams(route, locale, service)}`
  const params = routeQuoteParams(route, locale)
  return <>
    <RouteReady path={localize(freightRoutePath(route.slug))} />
    <RouteStructuredData route={route} locale={locale} />
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}>
            <SiteLink href={localize('/')}>{copy.home}</SiteLink><span aria-hidden='true'>/</span>
            <SiteLink href={localize('/regions')}>{copy.regions}</SiteLink><span aria-hidden='true'>/</span>
            <span aria-current='page'>{content.destination}</span>
          </nav>
          <div className={styles.heroGrid}>
            <div><p className={styles.eyebrow}>{copy.eyebrow}</p><h1>{content.title}</h1><p className={styles.intro}>{content.introduction}</p>
              <div className={styles.actions}><SiteLink className={styles.primary} href={quote()}>{copy.quote} <span aria-hidden='true'>↗</span></SiteLink><a className={styles.lightLink} href='#route-services'>{copy.compare} ↓</a></div>
            </div>
            <div className={styles.routeBoard}>
              <p className={styles.code}>{route.code}</p>
              <div className={styles.stop}><span className={styles.dot} aria-hidden='true' /><div><small>{copy.origin}</small><strong>Miami</strong><p>{copy.warehouse}</p></div></div>
              <div className={styles.connector} aria-hidden='true'>↓</div>
              <div className={styles.stop}><span className={styles.dot} aria-hidden='true' /><div><small>{copy.destination}</small><strong>{content.destination}</strong></div></div>
              <div className={styles.modes}><span>{copy.air}</span><span>{copy.ocean}</span></div>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.bodyGrid}>
        <div className={styles.article}>
          <section className={styles.section} aria-labelledby='route-plan'><p className={styles.eyebrow}>01 / {copy.plan}</p><h2 id='route-plan'>{content.focus}</h2><p>{copy.planIntro}</p><ol className={styles.planning}>{content.planning.map((item, i) => <li key={item}><span aria-hidden='true'>0{i + 1}</span><p>{item}</p></li>)}</ol></section>
          <section className={styles.section} id='route-services' aria-labelledby='route-services-title'><p className={styles.eyebrow}>02 / {copy.services}</p><h2 id='route-services-title'>{copy.services}</h2><p>{copy.servicesIntro}</p>
            <div className={styles.services}>{(['air', 'ocean'] as const).map((service) => <article key={service}><span className={styles.serviceCode} aria-hidden='true'>{service === 'air' ? 'AIR / 01' : 'SEA / 02'}</span><h3>{copy[service]}</h3><p>{copy[service === 'air' ? 'airText' : 'oceanText']}</p><SiteLink className={styles.primary} href={quote(service)}>{copy[service === 'air' ? 'airQuote' : 'oceanQuote']} ↗</SiteLink><SiteLink className={styles.textLink} href={localize(`/${service}`)}>{copy.aboutService} →</SiteLink></article>)}</div>
          </section>
          <section className={styles.section} aria-labelledby='route-prepare'><p className={styles.eyebrow}>03 / {copy.prepare}</p><h2 id='route-prepare'>{copy.prepare}</h2><ul className={styles.checklist}>{copy.checklist.map((item) => <li key={item}>{item}</li>)}</ul><p>{copy.checklistNote}</p></section>
          <section className={styles.section} aria-labelledby='route-faq'><h2 id='route-faq'>{copy.faq}</h2><div className={styles.faq}>{content.questions.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
        </div>
        <aside className={styles.aside} aria-labelledby='route-quote-title'><form action={localize('/quote-now')} method='get' className={styles.quoteCard}>
          <p className={styles.eyebrow}>MIAMI → {content.destination}</p><h2 id='route-quote-title'>{copy.formTitle}</h2><p>{copy.formText}</p>
          <input type='hidden' name='origin' value={params.get('origin') ?? ''} /><input type='hidden' name='region' value={route.region} />
          <label htmlFor='route-destination'>{copy.city}</label><input id='route-destination' name='destination' placeholder={copy.cityHint} maxLength={150} required />
          <label htmlFor='route-service'>{copy.service}</label><select id='route-service' name='service' defaultValue='air'><option value='air'>{copy.air}</option><option value='ocean'>{copy.ocean}</option><option value='lcl'>LCL</option></select>
          <button className={styles.primary} type='submit'>{copy.continue} ↗</button><small>{copy.scope}</small>
        </form></aside>
      </div>
      <section className={styles.closing}><div><p className={styles.eyebrow}>{copy.next}</p><h2>{content.title}</h2><p>{copy.nextText}</p></div><SiteLink className={styles.primary} href={quote()}>{copy.quote} ↗</SiteLink></section>
      <nav className={styles.related} aria-label={copy.related}><h2>{copy.related}</h2>{freightRoutes.filter((item) => item.slug !== route.slug).map((item) => <SiteLink key={item.slug} href={localize(freightRoutePath(item.slug))}>{item[locale].title} ↗</SiteLink>)}<SiteLink href={localize('/regions')}>{copy.regions} →</SiteLink><h3>{copy.terms}</h3><div>{['awb', 'fcl', 'lcl'].map((id) => <SiteLink key={id} href={localize(`/glossary/${id}`)}>{id.toUpperCase()} ↗</SiteLink>)}</div></nav>
    </main><Footer />
  </>
}
