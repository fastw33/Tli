const origin = 'https://tlimiami.com'
const checks = [
  {
    path: '/sitemap.xml',
    status: 200,
    type: /(?:application|text)\/xml/,
    content: /<urlset\b/,
  },
  {
    path: '/robots.txt',
    status: 200,
    type: /text\/plain/,
    content: /Sitemap: https:\/\/tlimiami.com\/sitemap.xml/,
  },
  {
    path: '/googlec4483a00833ee528.html',
    status: 200,
    content: /^google-site-verification: googlec4483a00833ee528.html\s*$/,
  },
  {
    path: '/air',
    status: 200,
    content: /rel="canonical" href="https:\/\/tlimiami.com\/air"/,
  },
  {
    path: '/es/air',
    status: 200,
    content: /rel="canonical" href="https:\/\/tlimiami.com\/es\/air"/,
  },
  { path: '/clients', status: 301, location: '/regions' },
  { path: '/es/clients', status: 301, location: '/es/regions' },
  { path: '/tli-missing-page-seo-check', status: 404 },
]
let failed = 0
for (const check of checks) {
  try {
    const response = await fetch(`${origin}${check.path}`, {
      redirect: 'manual',
      signal: AbortSignal.timeout(15000),
    })
    const body = await response.text()
    const problems = []
    if (response.status !== check.status)
      problems.push(`HTTP ${response.status}; expected ${check.status}`)
    if (
      check.type &&
      !check.type.test(response.headers.get('content-type') || '')
    )
      problems.push('Incorrect content type')
    if (check.content && !check.content.test(body))
      problems.push('Incorrect content')
    if (
      check.location &&
      new URL(response.headers.get('location') || '/', origin).pathname !==
        check.location
    )
      problems.push('Incorrect redirect')
    if (problems.length) {
      failed++
      console.error(`FAIL ${check.path}: ${problems.join('; ')}`)
    } else console.log(`OK ${check.path}`)
  } catch (error) {
    failed++
    console.error(`FAIL ${check.path}: ${error.message}`)
  }
}
if (failed) process.exitCode = 1
