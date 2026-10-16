import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const root = path.resolve(import.meta.dirname, '..')
async function load(file) {
  const source = fs.readFileSync(path.join(root, 'src/modules/freight-routes', file), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}
const { freightRoutes, routeQuoteParams } = await load('data.ts')
const { routeCopy } = await load('copy.ts')
assert.deepEqual(Object.keys(routeCopy.en).sort(), Object.keys(routeCopy.es).sort())
const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>')
const read = (route) => fs.readFileSync(path.join(root, 'out', route === '/' ? 'index.html' : `${route.slice(1)}.html`), 'utf8')
let checked = 0
for (const locale of ['en', 'es']) {
  const prefix = locale === 'es' ? '/es' : ''
  for (const route of freightRoutes) {
    const routePath = `${prefix}/routes/${route.slug}`
    const html = read(routePath)
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]
    assert.ok(main, `Missing route content: ${routePath}`)
    const text = decode(main.replace(/<[^>]*>/g, ''))
    const content = route[locale]
    for (const value of [content.title, content.introduction, ...content.planning, ...content.questions.flatMap(({ question, answer }) => [question, answer])]) {
      assert.ok(text.includes(value), `Content missing from exported HTML: ${routePath}: ${value}`)
    }
    const form = main.match(/<form\b[^>]*>[\s\S]*?<\/form>/)?.[0]
    assert.ok(form?.includes(`action="${prefix}/quote-now"`))
    assert.match(form, /method="get"/)
    assert.ok(form.includes(`name="region" value="${route.region}"`))
    assert.ok(form.includes(`name="origin" value="${routeQuoteParams(route, locale).get('origin')}"`))
    const destinationInput = [...form.matchAll(/<input\b[^>]*>/g)].map(([tag]) => tag).find((tag) => tag.includes('name="destination"'))
    assert.match(destinationInput, /required=""/)
    assert.ok(!destinationInput.includes('value='), 'Customer must specify a city in the quick form')
    const quotes = [...main.matchAll(/href="([^"?]*\/quote-now\?[^"]+)"/g)].map(([, href]) => new URL(decode(href), 'https://tlimiami.com'))
    for (const service of ['air', 'ocean']) {
      const link = quotes.find((url) => url.searchParams.get('service') === service)
      assert.ok(link, `Missing ${service} quote: ${routePath}`)
      assert.equal(link.pathname, `${prefix}/quote-now`)
      assert.equal(link.searchParams.get('region'), route.region)
      assert.equal(link.searchParams.get('origin'), routeQuoteParams(route, locale).get('origin'))
      assert.equal(link.searchParams.get('destination'), route.region === 'dominican-republic' ? content.destination : null)
    }
    const graph = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(([, json]) => JSON.parse(json)['@graph'] ?? [])
    const service = graph.find((node) => node['@type'] === 'Service')
    assert.equal(service?.provider['@id'], 'https://tlimiami.com/#organization')
    assert.equal(service?.areaServed[1].name, content.destination)
    for (const id of ['awb', 'fcl', 'lcl']) assert.ok(main.includes(`href="${prefix}/glossary/${id}"`))
    for (const parent of ['/', '/regions', '/air', '/ocean']) {
      const localizedParent = `${prefix}${parent === '/' ? '' : parent}` || '/'
      assert.ok(read(localizedParent).includes(`href="${routePath}"`), `Missing internal link: ${localizedParent} → ${routePath}`)
    }
    checked++
  }
}
console.log(`Freight routes verified: ${checked} bilingual pages, visible content, quote context, city requirements, service schema and internal links.`)
