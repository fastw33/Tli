import { PageLanguageLinks } from '@/components/PageLanguageLinks'
import { pageMetadata } from '@/lib/page-metadata'
import Content from '@/components/pages/home'

export default function Page() {
  return (
    <>
      <PageLanguageLinks path='/' locale='en' />
      <Content />
    </>
  )
}

export const metadata = pageMetadata('home', 'en')
