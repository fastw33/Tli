import { LegacyRegionsRedirect } from '@/components/Regions/LegacyRegionsRedirect'
import { pageMetadata } from '@/lib/page-metadata'

export const metadata = {
  ...pageMetadata('regions', 'en'),
  robots: { index: false, follow: true },
}

export default function Page() {
  return <LegacyRegionsRedirect />
}
