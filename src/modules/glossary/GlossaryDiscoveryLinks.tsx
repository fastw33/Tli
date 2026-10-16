import type { Locale } from '@/lib/locale'
import { localePath } from '@/lib/locale'
import { absoluteUrl } from '@/lib/site'

export function GlossaryDiscoveryLinks({ locale }: { locale: Locale }) {
  return <>
    <link rel='alternate' type='text/plain' href={absoluteUrl(localePath('/glossary-reference.txt', locale))} title={locale === 'es' ? 'Glosario completo en texto' : 'Complete glossary in plain text'} />
    <link rel='alternate' type='application/json' href={absoluteUrl('/glossary.json')} title={locale === 'es' ? 'Datos del glosario bilingüe' : 'Bilingual glossary data'} />
  </>
}
