import { GlossaryPage } from '@/modules/glossary/GlossaryPage'
import { pageMetadata } from '@/lib/page-metadata'

export const metadata = pageMetadata('glossary', 'en')

export default function Page() {
  return <GlossaryPage locale='en' />
}
