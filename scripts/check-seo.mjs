import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..', 'out')
const origin = 'https://tlimiami.com'
const pages = [
  '/',
  '/regions',
  '/logistics-solutions',
  '/air',
  '/ocean',
  '/ftl-lcl',
  '/quote-now',
  '/contact',
]
const localized = (route, locale) =>
  locale === 'es' ? `/es${route === '/' ? '' : route}` : route
const url = (route) => new URL(route, origin).href
const read = (route) =>
  fs.readFileSync(
    path.join(root, route === '/' ? 'index.html' : `${route.slice(1)}.html`),
    'utf8',
  )
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key.toLowerCase(),
      value.replaceAll('&amp;', '&').replaceAll('&quot;', '"'),
    ]),
  )
const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) =>
    attributes(tag),
  )
const meta = (html, key) =>
  tags(html, 'meta').find((tag) => tag.name === key || tag.property === key)
    ?.content
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8')
assert.match(
  sitemap,
  /<urlset\b[^>]*xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/,
)
assert.match(sitemap, /xmlns:xhtml="http:\/\/www.w3.org\/1999\/xhtml"/)
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  ([, block]) => ({
    url: block.match(/<loc>(.*?)<\/loc>/)?.[1],
    alternates: [...block.matchAll(/<xhtml:link\b[^>]*\/>/g)].map(([tag]) =>
      attributes(tag),
    ),
  }),
)
const expected = pages.flatMap((route) =>
  ['en', 'es'].map((locale) => url(localized(route, locale))),
)
assert.deepEqual(entries.map((entry) => entry.url).sort(), expected.toSorted())
assert.equal(new Set(entries.map((entry) => entry.url)).size, 16)
const titles = new Set()
const descriptions = new Set()
let checked = 0
for (const route of pages) {
  const alternates = {
    en: url(route),
    'en-US': url(route),
    es: url(localized(route, 'es')),
    'x-default': url(route),
  }
  for (const locale of ['en', 'es']) {
    const pathname = localized(route, locale)
    const canonical = url(pathname)
    const html = read(pathname)
    const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1]
    assert.ok(head, `Missing head: ${pathname}`)
    const links = tags(head, 'link')
    const agentGuides = links.filter((link) => link.rel === 'describedby')
    assert.equal(agentGuides.length, 1, `Missing agent guide: ${pathname}`)
    assert.equal(
      agentGuides[0].href,
      url(locale === 'es' ? '/es/llms.txt' : '/llms.txt'),
    )
    assert.equal(agentGuides[0].type, 'text/plain')
    for (const [relation, target] of [
      ['ard', '/.well-known/ard.json'],
      ['ai-catalog', '/.well-known/ai-catalog.json'],
    ]) {
      const catalogs = links.filter((link) => link.rel === relation)
      assert.equal(
        catalogs.length,
        1,
        `Missing ${relation} discovery: ${pathname}`,
      )
      assert.equal(catalogs[0].href, target)
      assert.equal(catalogs[0].type, 'application/json')
    }
    const canonicals = links.filter((link) => link.rel === 'canonical')
    assert.equal(
      canonicals.length,
      1,
      `Duplicate or missing canonical: ${pathname}`,
    )
    assert.equal(new URL(canonicals[0].href).href, canonical)
    assert.deepEqual(
      Object.fromEntries(
        links
          .filter((link) => link.rel === 'alternate')
          .map((link) => [link.hreflang, new URL(link.href).href]),
      ),
      alternates,
    )
    const entry = entries.find((item) => item.url === canonical)
    assert.deepEqual(
      Object.fromEntries(
        entry.alternates.map((link) => [link.hreflang, link.href]),
      ),
      alternates,
    )
    const title = head.match(/<title>(.*?)<\/title>/)?.[1]
    const description = meta(head, 'description')
    assert.ok(
      title && !titles.has(title),
      `Missing or duplicate title: ${pathname}`,
    )
    assert.ok(
      description && description.length >= 80 && !descriptions.has(description),
      `Missing or duplicate description: ${pathname}`,
    )
    titles.add(title)
    descriptions.add(description)
    assert.match(
      html,
      new RegExp(`<html[^>]+lang="${locale === 'en' ? 'en-US' : 'es'}"`),
    )
    assert.equal(
      [...html.matchAll(/<h1\b/g)].length,
      1,
      `Exactly one H1 required: ${pathname}`,
    )
    assert.ok(
      !meta(head, 'robots')?.includes('noindex'),
      `Indexable page is noindex: ${pathname}`,
    )
    assert.equal(new URL(meta(head, 'og:url')).href, canonical)
    assert.equal(meta(head, 'og:locale'), locale === 'en' ? 'en_US' : 'es_US')
    assert.equal(meta(head, 'og:title'), title.replaceAll('&amp;', '&'))
    assert.equal(meta(head, 'twitter:card'), 'summary_large_image')
    const image = meta(head, 'og:image')
    assert.equal(image, `${origin}/images/tli-social-${locale}.png`)
    const png = fs.readFileSync(path.join(root, new URL(image).pathname))
    assert.equal(png.readUInt32BE(16), 1200)
    assert.equal(png.readUInt32BE(20), 630)
    const graphs = [
      ...html.matchAll(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, json]) => JSON.parse(json)['@graph'])
    const business = graphs.find((node) => node['@type'] === 'LocalBusiness')
    assert.equal(business?.address.addressCountry, 'US')
    assert.equal(business.address.addressLocality, 'Medley')
    assert.equal(business.telephone, '+1-305-887-6363')
    assert.ok(!business.aggregateRating && !business.openingHoursSpecification)
    assert.ok(graphs.some((node) => node['@type'] === 'WebSite'))
    const webpage = graphs.find(
      (node) =>
        node['@type'] === (route === '/contact' ? 'ContactPage' : 'WebPage'),
    )
    assert.equal(webpage?.url, canonical)
    assert.equal(webpage.inLanguage, locale === 'en' ? 'en-US' : 'es')
    if (route !== '/') {
      const breadcrumb = graphs.find(
        (node) => node['@type'] === 'BreadcrumbList',
      )
      assert.equal(breadcrumb?.itemListElement.at(-1).item, canonical)
    }
    if (['/air', '/ocean', '/ftl-lcl', '/logistics-solutions'].includes(route))
      assert.equal(
        graphs.find((node) => node['@type'] === 'Service')?.provider['@id'],
        `${origin}/#organization`,
      )
    assert.match(html, /<noscript>/)
    if (route === '/') {
      assert.match(html, /20<!-- -->\+/)
      assert.match(html, /6[,.]000<!-- -->\+/)
    }
    checked++
  }
}
for (const locale of ['en', 'es']) {
  assert.match(meta(read(localized('/login', locale)), 'robots'), /noindex/)
  const legacy = read(localized('/clients', locale))
  assert.match(meta(legacy, 'robots'), /noindex/)
  assert.equal(
    tags(legacy, 'link').find((link) => link.rel === 'canonical').href,
    url(localized('/regions', locale)),
  )
}
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8')
const catalog = JSON.parse(
  fs.readFileSync(path.join(root, '.well-known/ard.json'), 'utf8'),
)
assert.equal(catalog.specVersion, '1.0')
assert.equal(
  catalog.host.displayName,
  'TLI Miami — Transport Logistic International',
)
assert.equal(catalog.host.documentationUrl, `${origin}/llms-full.txt`)
assert.equal(catalog.host.logoUrl, `${origin}/transport.webp`)
assert.deepEqual(
  catalog.entries,
  [],
  'Do not advertise tools that this site does not implement',
)
for (const file of ['.well-known/ai-catalog.json', 'ai-catalog.json']) {
  assert.deepEqual(
    JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')),
    catalog,
  )
}
for (const file of ['llms.txt', 'es/llms.txt', 'llms-full.txt']) {
  const text = fs.readFileSync(path.join(root, file), 'utf8')
  assert.match(text, /^# TLI Miami/)
  assert.ok(!text.includes('<html'), `Agent guide contains HTML: ${file}`)
  assert.match(text, /10049 NW 89th Ave, Unit 4/)
  assert.match(text, /info@tlimiami.com/)
  for (const [, href] of text.matchAll(/\]\((https:\/\/[^)]+)\)/g)) {
    const target = new URL(href)
    assert.equal(target.origin, origin)
    const route = target.pathname
    assert.ok(
      fs.existsSync(path.join(root, route.slice(1))) ||
        fs.existsSync(
          path.join(
            root,
            route === '/' ? 'index.html' : `${route.slice(1)}.html`,
          ),
        ),
      `Agent guide links to missing export: ${href}`,
    )
  }
}
assert.match(robots, /User-Agent: \*/)
assert.match(robots, /Allow: \//)
assert.match(robots, /Sitemap: https:\/\/tlimiami.com\/sitemap.xml/)
assert.ok(
  !robots.includes('Disallow: /'),
  'Do not block crawlers from reading noindex pages or assets',
)
assert.match(
  fs.readFileSync(path.join(root, '404.html'), 'utf8'),
  /name="robots" content="noindex"/,
)
assert.equal(
  fs
    .readFileSync(path.join(root, 'googlec4483a00833ee528.html'), 'utf8')
    .trim(),
  'google-site-verification: googlec4483a00833ee528.html',
)
console.log(
  `SEO export verified: ${checked} pages, reciprocal hreflang, canonical URLs, metadata, JSON-LD, social images, robots and exclusions.`,
)
