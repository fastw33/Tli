import { PageLanguageLinks } from '@/components/PageLanguageLinks'
import { pageMetadata } from '@/lib/page-metadata'
import Content from '@/components/pages/ftl-lcl'

export default function Page() {
  return (
    <>
      <PageLanguageLinks path='/ftl-lcl' locale='es' />
      <Content />
    </>
  )
}

export const metadata = pageMetadata('ftl-lcl', 'es')
