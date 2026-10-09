import { SiteLayout } from '@/components/SiteLayout'
import { rootMetadata } from '@/lib/page-metadata'

export const metadata = rootMetadata('en')

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale='en'>{children}</SiteLayout>
}
