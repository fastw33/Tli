import { PageLanguageLinks } from '@/components/PageLanguageLinks'
import { pageMetadata } from '@/lib/page-metadata'
import Content from '@/components/pages/contact'

export default function Page() {
  return (
    <>
      <PageLanguageLinks path='/contact' locale='es' />
      <Content />
    </>
  )
}
export const metadata = pageMetadata('contact', 'es')
