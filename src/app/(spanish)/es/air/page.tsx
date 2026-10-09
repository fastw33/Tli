import { PageLanguageLinks } from '@/components/PageLanguageLinks'
import { pageMetadata } from '@/lib/page-metadata'
import Content from '@/components/pages/air'

export default function Page() {
  return (
    <>
      <PageLanguageLinks path='/air' locale='es' />
      <Content />
    </>
  )
}

export const metadata = pageMetadata('air', 'es')
