import { LegacyRegionsRedirect } from '@/components/Regions/LegacyRegionsRedirect'
import { pageMetadata } from '@/lib/page-metadata'

export const metadata = {
  ...pageMetadata('regions', 'es'),
  robots: { index: false, follow: true },
}

export default function Page() {
  return <LegacyRegionsRedirect />
}
