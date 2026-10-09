import { PageLanguageLinks } from '@/components/PageLanguageLinks'
import { pageMetadata } from '@/lib/page-metadata'
import Content from '@/components/pages/quote-now'

export default function Page() {
  return (
    <>
      <PageLanguageLinks path='/quote-now' locale='es' />
      <Content />
    </>
  )
}

export const metadata = pageMetadata('quote-now', 'es')
