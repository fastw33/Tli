import { PageLanguageLinks } from '@/components/PageLanguageLinks'
import { pageMetadata } from '@/lib/page-metadata'
import Content from '@/components/pages/login'

export default function Page() {
  return (
    <>
      <PageLanguageLinks path='/login' locale='es' />
      <Content />
    </>
  )
}

export const metadata = pageMetadata('login', 'es')
