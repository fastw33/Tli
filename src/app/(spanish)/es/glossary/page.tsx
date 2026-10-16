import { GlossaryPage } from '@/modules/glossary/GlossaryPage'
import { pageMetadata } from '@/lib/page-metadata'

export const metadata = pageMetadata('glossary', 'es')

export default function Page() {
  return <GlossaryPage locale='es' />
}
