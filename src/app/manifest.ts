import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | ${site.businessName}`,
    short_name: site.name,
    description: 'Miami freight forwarding, logistics and shipping coordination from Medley, Florida.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#062f57',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
