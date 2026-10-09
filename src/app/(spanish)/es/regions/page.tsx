import { PageLanguageLinks } from '@/components/PageLanguageLinks'
import { pageMetadata } from '@/lib/page-metadata'
import { RegionsLanding } from '@/components/Regions/RegionsLanding'
import { Footer } from '@/components/Footer'

export default function Page() {
  return (
    <>
      <PageLanguageLinks path='/regions' locale='es' />
      <RegionsLanding />
      <Footer />
    </>
  )
}

export const metadata = pageMetadata('regions', 'es')
