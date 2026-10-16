import { notFound } from 'next/navigation'
import { freightRoutes } from '@/modules/freight-routes/data'
import { RoutePage } from '@/modules/freight-routes/RoutePage'
import { freightRouteMetadata } from '@/modules/freight-routes/metadata'

type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false

export function generateStaticParams() {
  return freightRoutes.map((route) => ({ slug: route.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const route = freightRoutes.find((item) => item.slug === slug)
  if (!route) notFound()
  return freightRouteMetadata(route, 'es')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const route = freightRoutes.find((item) => item.slug === slug)
  if (!route) notFound()
  return <RoutePage route={route} locale='es' />
}
