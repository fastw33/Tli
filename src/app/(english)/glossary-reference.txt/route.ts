import { glossaryText } from '@/modules/glossary/discovery'

// Keep a distinct basename: /glossary.txt is Next.js's internal RSC export.
export const dynamic = 'force-static'

export function GET() {
  return new Response(glossaryText('en'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
