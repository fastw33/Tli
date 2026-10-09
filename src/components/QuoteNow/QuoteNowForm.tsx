'use client'

import { useRef, useState } from 'react'
import { useLocale } from '../LocaleProvider'
import { SiteLink } from '../SiteLink'
import { sendLead, type LeadResult } from '@/lib/leads'
import {
  quoteDefaults,
  quotePayload,
  quoteRegions,
  quoteServices,
  validateQuote,
  type QuoteData,
} from '@/lib/quote'
import { citiesByContinent } from './citiesData'
import ui from '../Interface.module.css'
import styles from './QuoteForm.module.css'

export function QuoteNowForm({
  region = null,
  service = null,
}: {
  region?: string | null
  service?: string | null
}) {
  const { t, locale, localizePath } = useLocale()
  const [data, setData] = useState(() => quoteDefaults(region, service))
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<
    Partial<Record<keyof QuoteData, string>>
  >({})
  const [result, setResult] = useState<LeadResult | null>(null)
  const [sending, setSending] = useState(false)
  const inFlight = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)

  function update(field: keyof QuoteData, value: string) {
    setData((previous) => ({
      ...previous,
      [field]: value,
      ...(field === 'region' && previous.region !== value
        ? { destination: '' }
        : {}),
    }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
    setResult(null)
  }
  function focusStep() {
    requestAnimationFrame(() => {
      headingRef.current?.focus()
      headingRef.current?.scrollIntoView({
        block: 'start',
        behavior: 'instant',
      })
    })
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return
    const nextErrors = validateQuote(data, step)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      )
      return
    }
    if (step === 1) {
      setStep(2)
      focusStep()
      return
    }
    if (honeypotRef.current?.value) return
    inFlight.current = true
    setSending(true)
    setResult(null)
    try {
      const response = await sendLead(
        quotePayload(data, locale),
        window.location.href,
      )
      setResult(response)
      if (response.ok)
        requestAnimationFrame(() => {
          successRef.current?.focus()
          successRef.current?.scrollIntoView({
            block: 'start',
            behavior: 'instant',
          })
        })
    } finally {
      inFlight.current = false
      setSending(false)
    }
  }
  function field(
    name: keyof QuoteData,
    label: string,
    type = 'text',
    list?: string,
  ) {
    const id = 'quote-' + name
    return (
      <div className={styles.field}>
        <label htmlFor={id}>{t(label)}</label>
        <input
          id={id}
          name={name}
          type={type}
          value={data[name]}
          onChange={(event) => update(name, event.target.value)}
          disabled={sending}
          required={name !== 'company' && name !== 'phone'}
          maxLength={name === 'email' ? 254 : 150}
          list={list}
          min={type === 'number' ? '0.01' : undefined}
          step={type === 'number' ? 'any' : undefined}
          autoComplete={
            name === 'name'
              ? 'name'
              : name === 'email'
                ? 'email'
                : name === 'phone'
                  ? 'tel'
                  : name === 'company'
                    ? 'organization'
                    : 'off'
          }
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? id + '-error' : undefined}
        />
        {errors[name] && (
          <p className={styles.error} id={id + '-error'}>
            {t(errors[name]!)}
          </p>
        )}
      </div>
    )
  }
  const allCities = Array.from(new Set(Object.values(citiesByContinent).flat()))
  const destinationCities =
    data.region === 'dominican-republic'
      ? citiesByContinent['Dominican Republic & Caribbean'].filter((city) =>
          city.includes('Dominican Republic'),
        )
      : data.region === 'caribbean'
        ? citiesByContinent['Dominican Republic & Caribbean'].filter(
            (city) => !city.includes('Dominican Republic'),
          )
        : data.region === 'central-america'
          ? citiesByContinent['Central America']
          : data.region === 'south-america'
            ? citiesByContinent['South America']
            : allCities
  return (
    <section className={styles.layout}>
      {result?.ok ? (
        <div
          className={styles.success}
          tabIndex={-1}
          ref={successRef}
          role='status'
        >
          <h2>{t('Your quote request was received')}</h2>
          <p>
            {t(
              'Your request has been registered. Our team will use the contact details you provided to follow up.',
            )}
          </p>
          <p>
            <strong>{t('Request reference:')}</strong> {result.reference}
          </p>
          {!result.notificationSent && (
            <p>
              {t(
                'Your request is saved. For immediate assistance, you can also contact our team.',
              )}
            </p>
          )}
          <div className={ui.actions}>
            <SiteLink className={ui.primary} href={localizePath('/contact')}>
              {t('Contact our team')}
            </SiteLink>
            <button
              className={ui.secondary}
              type='button'
              onClick={() => {
                setResult(null)
                setStep(1)
                setData(quoteDefaults(region, service))
                setErrors({})
                focusStep()
              }}
            >
              {t('Request Another Quote')}
            </button>
          </div>
        </div>
      ) : (
        <form
          className={styles.form}
          onSubmit={submit}
          noValidate
          ref={formRef}
          aria-busy={sending}
        >
          <ol className={styles.progress} aria-label={t('Quote progress')}>
            <li aria-current={step === 1 ? 'step' : undefined}>
              <span>1</span>
              {t('Shipment')}
            </li>
            <li aria-current={step === 2 ? 'step' : undefined}>
              <span>2</span>
              {t('Details & contact')}
            </li>
          </ol>
          <h2 ref={headingRef} tabIndex={-1}>
            {t(step === 1 ? 'Plan your shipment' : 'Tell us the details')}
          </h2>
          <p className={styles.hint}>
            {t(
              step === 1
                ? 'Choose a service and tell us where your cargo needs to go.'
                : 'Review your route, add the cargo weight and let us know how to reach you.',
            )}
          </p>
          {step === 1 ? (
            <>
              <div className={styles.field}>
                <label htmlFor='quote-service'>{t('Shipping service')}</label>
                <select
                  id='quote-service'
                  value={data.service}
                  onChange={(event) => update('service', event.target.value)}
                  aria-invalid={!!errors.service}
                >
                  {Object.entries(quoteServices).map(([value, label]) => (
                    <option key={value} value={value}>
                      {t(label)}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor='quote-region'>{t('Destination region')}</label>
                <select
                  id='quote-region'
                  value={data.region}
                  onChange={(event) => update('region', event.target.value)}
                  aria-invalid={!!errors.region}
                  aria-describedby={
                    errors.region ? 'quote-region-error' : undefined
                  }
                  required
                >
                  <option value=''>{t('Select a region')}</option>
                  {Object.entries(quoteRegions).map(([value, label]) => (
                    <option key={value} value={value}>
                      {t(label)}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <p id='quote-region-error' className={styles.error}>
                    {t(errors.region)}
                  </p>
                )}
              </div>
              {field(
                'origin',
                'Origin city and country',
                'text',
                'origin-cities',
              )}
              {field(
                'destination',
                'Destination city and country',
                'text',
                'destination-cities',
              )}
              <datalist id='origin-cities'>
                {allCities.map((city) => (
                  <option key={city} value={t(city)} />
                ))}
              </datalist>
              <datalist id='destination-cities'>
                {destinationCities.map((city) => (
                  <option key={city} value={t(city)} />
                ))}
              </datalist>
              <p className={styles.hint}>
                {t('You can type a city that is not in the suggestions.')}
              </p>
            </>
          ) : (
            <>
              {field('weight', 'Total weight (kg)', 'number')}
              <div className={styles.grid}>
                {field('name', 'Full name')}
                {field('email', 'Your email', 'email')}
              </div>
              <div className={styles.grid}>
                {field('company', 'Company (optional)')}
                {field('phone', 'Phone with country code (optional)', 'tel')}
              </div>
              <div className={styles.field}>
                <label htmlFor='quote-details'>
                  {t('Cargo details (optional)')}
                </label>
                <textarea
                  id='quote-details'
                  name='details'
                  value={data.details}
                  disabled={sending}
                  onChange={(event) => update('details', event.target.value)}
                  rows={3}
                  maxLength={5000}
                />
              </div>
            </>
          )}
          <div className={styles.honeypot} aria-hidden='true'>
            <input
              ref={honeypotRef}
              tabIndex={-1}
              name='website'
              autoComplete='off'
            />
          </div>
          {result && !result.ok && (
            <p className={styles.errorBanner} role='alert'>
              {t(result.message)}
            </p>
          )}
          <div className={styles.buttons}>
            {step === 2 && (
              <button
                className={ui.secondary}
                type='button'
                disabled={sending}
                onClick={() => {
                  setStep(1)
                  setErrors({})
                  setResult(null)
                  focusStep()
                }}
              >
                {t('← Back')}
              </button>
            )}
            <button className={ui.primary} type='submit' disabled={sending}>
              {t(
                sending
                  ? 'Sending request…'
                  : step === 1
                    ? 'Continue →'
                    : 'Send Quote Request →',
              )}
            </button>
          </div>
        </form>
      )}
      <aside className={styles.summary} aria-label={t('Your shipment summary')}>
        <p className={ui.eyebrow}>{t('TLI · Your shipment')}</p>
        <h2>{t('Your shipment summary')}</h2>
        <dl>
          {[
            {
              label: 'Shipping service',
              value: quoteServices[data.service as keyof typeof quoteServices],
            },
            {
              label: 'Destination region',
              value: quoteRegions[data.region as keyof typeof quoteRegions],
            },
            { label: 'Origin', value: data.origin },
            { label: 'Destination', value: data.destination },
            { label: 'Total weight (kg)', value: data.weight },
          ].map((row) => (
            <div className={styles.row} key={row.label}>
              <dt>{t(row.label)}</dt>
              <dd>{row.value ? t(row.value) : t('Not specified yet')}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.support}>
          <p>{t('Need help with your shipment? Talk to our team directly.')}</p>
          <SiteLink className={ui.secondary} href={localizePath('/contact')}>
            {t('Contact our team')}
          </SiteLink>
        </div>
      </aside>
    </section>
  )
}
