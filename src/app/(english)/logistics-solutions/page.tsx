import { PageLanguageLinks } from '@/components/PageLanguageLinks'
import { pageMetadata } from '@/lib/page-metadata'
import Content from '@/components/pages/logistics-solutions'

export default function Page() {
  return (
    <>
      <PageLanguageLinks path='/logistics-solutions' locale='en' />
      <Content />
    </>
  )
}

export const metadata = pageMetadata('logistics-solutions', 'en')
