'use client'

import { useLocale } from '@/components/LocaleProvider'
import React, { useState } from 'react'
import { citiesByContinent } from './citiesData'

const shipmentOptions = [
  { id: 'air', label: 'Air Freight', icon: '✈️' },
  { id: 'ocean', label: 'Ocean Freight', icon: '⚓' },
  { id: 'ftl', label: 'FTL (Full Truckload)', icon: '🚛' },
  { id: 'lcl', label: 'LCL', icon: '📦' },
]

export function QuoteNowForm() {
  const { t } = useLocale()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    shipmentType: 'Air Freight',
    origin: '',
    destination: '',
    weight: '',
    email: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleShipmentSelect = (id: string) => {
    const selected = shipmentOptions.find((opt) => opt.id === id)
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        shipmentType: selected.label,
      }))
    }
  }

  const handleNextStep = () => {
    if (
      step === 1 &&
      formData.shipmentType &&
      formData.origin &&
      formData.destination
    ) {
      setStep(2)
    } else if (step === 2 && formData.weight && formData.email) {
      handleSubmit()
    }
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log('Quote request:', formData)
    setStep(3)
  }

  return (
    <section
      className='relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-12 md:py-16'
      data-aos='fade-up'
    >
      <div className='absolute left-[-48px] top-10 h-44 w-44 rounded-full bg-[#0a4eb6]/5 blur-3xl' />
      <div className='absolute right-[-44px] bottom-0 h-56 w-56 rounded-full bg-[#2cad3f]/5 blur-3xl' />

      <div className='relative mx-auto w-full max-w-2xl px-2 md:px-0'>
        {/* Progress Bar */}
        <div className='mb-8 md:mb-12 flex items-center justify-between'>
          <div className='flex flex-1 items-center gap-1 md:gap-2'>
            <div
              className={`flex h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-full text-xs md:text-sm font-bold text-white transition-all ${
                step >= 1 ? 'bg-[#0a4eb6]' : 'bg-slate-300'
              }`}
            >
              1
            </div>
            <div
              className={`flex-1 h-1 transition-all ${
                step >= 2 ? 'bg-[#0a4eb6]' : 'bg-slate-300'
              }`}
            />
            <div
              className={`flex h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-full text-xs md:text-sm font-bold text-white transition-all ${
                step >= 2 ? 'bg-[#0a4eb6]' : 'bg-slate-300'
              }`}
            >
              2
            </div>
            <div
              className={`flex-1 h-1 transition-all ${
                step >= 3 ? 'bg-[#0a4eb6]' : 'bg-slate-300'
              }`}
            />
            <div
              className={`flex h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-full text-xs md:text-sm font-bold text-white transition-all ${
                step >= 3 ? 'bg-[#2cad3f]' : 'bg-slate-300'
              }`}
            >
              ✓
            </div>
          </div>
        </div>

        {/* Step 1: Shipment Type & Route */}
        {step === 1 && (
          <div
            className='space-y-6 md:space-y-8 animate-fadeIn'
            data-aos='fade-up'
          >
            <div>
              <h2 className='text-xl md:text-2xl font-bold text-slate-900'>
                {t('What are you shipping?')}
              </h2>
              <p className='mt-1 md:mt-2 text-sm md:text-base text-slate-600'>
                {t('Select your shipment type')}
              </p>
            </div>

            {/* Shipment Type Cards */}
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
              {shipmentOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleShipmentSelect(option.id)}
                  className={`group relative rounded-2xl transition-all duration-300 cursor-pointer p-5 text-center ${
                    formData.shipmentType === option.label
                      ? 'border-3 border-[#0a4eb6] bg-blue-50 shadow-xl ring-2 ring-[#0a4eb6]'
                      : 'border-2 border-dashed border-slate-300 bg-white hover:border-[#0a4eb6] hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`transition-all ${
                      formData.shipmentType === option.label
                        ? 'text-5xl'
                        : 'text-4xl opacity-60 group-hover:opacity-100'
                    }`}
                  >
                    {option.icon}
                  </div>
                  <p
                    className={`mt-3 font-bold transition-all ${
                      formData.shipmentType === option.label
                        ? 'text-sm text-slate-900'
                        : 'text-xs text-slate-500 group-hover:text-slate-900'
                    }`}
                  >
                    {t(option.label)}
                  </p>
                  {formData.shipmentType === option.label && (
                    <div className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold shadow-lg'>
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Route */}
            <div className='space-y-4'>
              <div className='relative'>
                <label
                  htmlFor='quote-origin'
                  className='block text-sm font-bold text-slate-900 mb-2'
                >
                  {t('Where from?')}
                </label>
                <select
                  id='quote-origin'
                  name='origin'
                  value={formData.origin}
                  onChange={handleChange}
                  required
                  className='w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-[#0a4eb6] focus:outline-none'
                >
                  <option value=''>{t('Select departure city')}</option>
                  {Object.entries(citiesByContinent).map(
                    ([continent, cities]) => (
                      <optgroup key={continent} label={t(continent)}>
                        {cities.map((city, idx) => (
                          <option key={`${continent}-${idx}`} value={city}>
                            {t(city)}
                          </option>
                        ))}
                      </optgroup>
                    ),
                  )}
                </select>
              </div>

              <div className='relative'>
                <label
                  htmlFor='quote-destination'
                  className='block text-sm font-bold text-slate-900 mb-2'
                >
                  {t('Where to?')}
                </label>
                <select
                  id='quote-destination'
                  name='destination'
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className='w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-[#0a4eb6] focus:outline-none'
                >
                  <option value=''>{t('Select destination city')}</option>
                  {Object.entries(citiesByContinent).map(
                    ([continent, cities]) => (
                      <optgroup key={continent} label={t(continent)}>
                        {cities.map((city, idx) => (
                          <option key={`${continent}-${idx}`} value={city}>
                            {t(city)}
                          </option>
                        ))}
                      </optgroup>
                    ),
                  )}
                </select>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextStep}
              disabled={
                !formData.shipmentType ||
                !formData.origin ||
                !formData.destination
              }
              className='w-full rounded-xl bg-[#0a4eb6] px-6 py-3 font-bold text-white transition-all duration-300 hover:bg-[#0a4eb6]/90 disabled:bg-slate-300 disabled:cursor-not-allowed'
            >
              {t('Continue →')}
            </button>
          </div>
        )}

        {/* Step 2: Weight & Email */}
        {step === 2 && (
          <div className='space-y-8 animate-fadeIn' data-aos='fade-up'>
            <div>
              <h2 className='text-2xl font-bold text-slate-900'>
                {t('Tell us the details')}
              </h2>
              <p className='mt-2 text-slate-600'>
                {t('Weight and contact information')}
              </p>
            </div>

            {/* Selected Info Summary */}
            <div className='rounded-xl bg-blue-50 border-2 border-blue-200 p-4'>
              <p className='text-sm text-slate-600'>
                <span className='font-bold'>{t(formData.shipmentType)}</span>
                {' • '}
                <span className='font-bold'>{t(formData.origin)}</span>
                {' → '}
                <span className='font-bold'>{t(formData.destination)}</span>
              </p>
            </div>

            {/* Weight & Email */}
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='quote-weight'
                  className='block text-sm font-bold text-slate-900 mb-2'
                >
                  {t('Total weight (kg)')}
                </label>
                <input
                  id='quote-weight'
                  type='number'
                  name='weight'
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder={t('Enter weight')}
                  className='w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-[#0a4eb6] focus:outline-none'
                />
              </div>

              <div>
                <label
                  htmlFor='quote-email'
                  className='block text-sm font-bold text-slate-900 mb-2'
                >
                  {t('Your email')}
                </label>
                <input
                  id='quote-email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('you@company.com')}
                  className='w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-[#0a4eb6] focus:outline-none'
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className='flex gap-4'>
              <button
                onClick={handlePrevStep}
                className='flex-1 rounded-xl border-2 border-slate-300 px-6 py-3 font-bold text-slate-900 transition-all duration-300 hover:border-slate-400'
              >
                {t('← Back')}
              </button>
              <button
                onClick={handleNextStep}
                disabled={!formData.weight || !formData.email}
                className='flex-1 rounded-xl bg-[#2cad3f] px-6 py-3 font-bold text-white transition-all duration-300 hover:bg-[#2cad3f]/90 disabled:bg-slate-300 disabled:cursor-not-allowed'
              >
                {t('Send Quote Request →')}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div
            className='space-y-8 text-center animate-fadeIn'
            data-aos='zoom-in'
          >
            <div>
              <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
                <span className='text-3xl'>✓</span>
              </div>
              <h2 className='text-3xl font-bold text-slate-900'>
                {t('Quote Request Sent!')}
              </h2>
              <p className='mt-2 text-slate-600'>
                {t("We'll review your request and send you a custom quote to")}{' '}
                <span className='font-bold'>{formData.email}</span>{' '}
                {t('within 24 hours.')}
              </p>
            </div>

            {/* Confirmation Details */}
            <div className='rounded-xl bg-slate-100 p-6 space-y-2'>
              <p className='text-sm text-slate-600'>
                <span className='font-bold'>{t('Shipment:')}</span>{' '}
                {t(formData.shipmentType)}
              </p>
              <p className='text-sm text-slate-600'>
                <span className='font-bold'>{t('Route:')}</span>{' '}
                {t(formData.origin)} → {t(formData.destination)}
              </p>
              <p className='text-sm text-slate-600'>
                <span className='font-bold'>{t('Weight:')}</span>{' '}
                {formData.weight} {t('kg')}
              </p>
            </div>

            <button
              onClick={() => {
                setStep(1)
                setFormData({
                  shipmentType: '',
                  origin: '',
                  destination: '',
                  weight: '',
                  email: '',
                })
              }}
              className='w-full rounded-xl bg-[#0a4eb6] px-6 py-3 font-bold text-white transition-all duration-300 hover:bg-[#0a4eb6]/90'
            >
              {t('Request Another Quote')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
