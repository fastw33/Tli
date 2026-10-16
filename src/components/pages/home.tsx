import {
  Hero,
  LocationMap,
  LogisticsCoverage,
  QuoteBanner,
  StatsCards,
  Footer,
} from '@/components'
import { AviationInstitutions } from '@/components/AviationInstitutions'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <LogisticsCoverage />
      <StatsCards />
      <AviationInstitutions compact />
      <QuoteBanner />
      <LocationMap />
      <Footer />
    </main>
  )
}
