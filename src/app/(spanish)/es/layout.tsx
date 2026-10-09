import { SiteLayout } from '@/components/SiteLayout'
import { rootMetadata } from '@/lib/page-metadata'

export const metadata = rootMetadata('es')

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale='es'>{children}</SiteLayout>
}
