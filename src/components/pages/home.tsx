import {
  Hero,
  LocationMap,
  LogisticsCoverage,
  QuoteBanner,
  StatsCards,
  Footer,
} from '@/components'
import { AviationInstitutions } from '@/components/AviationInstitutions'
import type { Locale } from '@/lib/locale'
import { HomeQuoteStarter, HomeServicePreviews, HomeRoutePreviews, HomeOperationsPreview, HomeKnowledgePreview } from '@/modules/home/HomePreviews'

export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <main>
      <Hero />
      <HomeQuoteStarter locale={locale} />
      <HomeServicePreviews locale={locale} />
      <LogisticsCoverage><HomeRoutePreviews locale={locale} /></LogisticsCoverage>
      <HomeOperationsPreview locale={locale} />
      <StatsCards />
      <AviationInstitutions compact />
      <HomeKnowledgePreview locale={locale} />
      <QuoteBanner />
      <LocationMap />
      <Footer />
    </main>
  )
}
