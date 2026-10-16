import { notFound } from 'next/navigation'
import { glossaryTerms } from '@/modules/glossary/data'
import { GlossaryTermPage } from '@/modules/glossary/GlossaryTermPage'
import { glossaryTermMetadata } from '@/modules/glossary/metadata'

type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.id }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const term = glossaryTerms.find((item) => item.id === slug)
  if (!term) notFound()
  return glossaryTermMetadata(term, 'en')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const term = glossaryTerms.find((item) => item.id === slug)
  if (!term) notFound()
  return <GlossaryTermPage term={term} locale='en' />
}
