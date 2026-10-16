import { glossaryCatalog } from '@/modules/glossary/discovery'

export const dynamic = 'force-static'

export function GET() {
  return Response.json(glossaryCatalog())
}
