import {
  Hero,
  LocationMap,
  LogisticsCoverage,
  QuoteBanner,
  StatsCards,
  Footer,
} from '@/components'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <LogisticsCoverage />
      <StatsCards />
      <QuoteBanner />
      <LocationMap />
      <Footer />
    </main>
  )
}
