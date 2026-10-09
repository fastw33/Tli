import { PageLanguageLinks } from '@/components/PageLanguageLinks'
import { pageMetadata } from '@/lib/page-metadata'
import Content from '@/components/pages/ocean'

export default function Page() {
  return (
    <>
      <PageLanguageLinks path='/ocean' locale='es' />
      <Content />
    </>
  )
}

export const metadata = pageMetadata('ocean', 'es')
