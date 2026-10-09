'use client'

import { useSearchParams } from 'next/navigation'
import { useLocale } from '../LocaleProvider'

const regionNames: Record<string, string> = {
  'dominican-republic': 'Dominican Republic',
  caribbean: 'Caribbean',
  'central-america': 'Central America',
  'south-america': 'South America',
  global: 'Global',
}

export function QuoteRegionContext() {
  const params = useSearchParams()
  const { t } = useLocale()
  const region = regionNames[params.get('region') ?? '']
  if (!region) return null
  return (
    <p className='mx-auto mt-4 inline-flex rounded-full border border-[#0a4eb6]/20 bg-white px-4 py-2 text-sm font-semibold text-[#042c51]'>
      {t('Region of interest: {region}', { region: t(region) })}
    </p>
  )
}
