import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const root = path.resolve(import.meta.dirname, '..')
async function sourceModule(file) {
  const source = fs.readFileSync(path.join(root, 'src/modules/glossary', file), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}
const { glossaryTerms, localizedTerms } = await sourceModule('data.ts')
const { categories, matchesGlossaryTerm, glossaryQuoteService } = await sourceModule('shared.ts')
const { glossaryCopy } = await sourceModule('copy.ts')
assert.ok(glossaryTerms.length >= 50, 'Keep a useful initial glossary')
assert.equal(new Set(glossaryTerms.map((item) => item.id)).size, glossaryTerms.length)
assert.deepEqual(Object.keys(glossaryCopy.en).sort(), Object.keys(glossaryCopy.es).sort())
for (const item of glossaryTerms) {
  assert.match(item.id, /^[a-z][a-z0-9-]*$/)
  assert.ok(categories[item.category], `Invalid category: ${item.id}`)
  for (const locale of ['en', 'es']) {
    assert.ok(item[locale].name.trim(), `Missing name: ${item.id}/${locale}`)
    assert.ok(item[locale].definition.length > 80, `Missing definition: ${item.id}/${locale}`)
    assert.ok(item[locale].example.length > 30, `Missing example: ${item.id}/${locale}`)
  }
}

const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>')
for (const locale of ['en', 'es']) {
  const pathname = locale === 'en' ? '/glossary' : '/es/glossary'
  const url = `https://tlimiami.com${pathname}`
  const html = fs.readFileSync(path.join(root, 'out', `${pathname.slice(1)}.html`), 'utf8')
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]
  assert.ok(main, `Missing main content: ${pathname}`)
  const text = decode(main.replace(/<[^>]*>/g, ''))
  const nodes = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap(([, json]) => JSON.parse(json)['@graph'] ?? [])
  const set = nodes.find((node) => node['@type'] === 'DefinedTermSet')
  const terms = nodes.filter((node) => node['@type'] === 'DefinedTerm')
  assert.equal(set?.['@id'], `${url}#glossary`)
  assert.equal(set.hasDefinedTerm.length, glossaryTerms.length)
  assert.equal(terms.length, glossaryTerms.length)
  assert.equal(nodes.find((node) => node['@type'] === 'WebPage').mainEntity['@id'], set['@id'])
  assert.equal([...main.matchAll(/<article\b/g)].length, glossaryTerms.length)
  for (const item of glossaryTerms) {
    assert.ok(main.includes(`id="${item.id}"`), `Missing term anchor: ${pathname}#${item.id}`)
    assert.ok(text.includes(item[locale].name), `Name absent from HTML: ${item.id}/${locale}`)
    assert.ok(text.includes(item[locale].definition), `Definition absent from HTML: ${item.id}/${locale}`)

    const termUrl = `${url}/${item.id}`
    assert.ok(main.includes(`href="${pathname}/${item.id}"`), `Missing detail link: ${item.id}/${locale}`)
    const node = terms.find((node) => node['@id'] === `${termUrl}#term`)
    assert.equal(node?.name, item[locale].name)
    assert.equal(node.description, item[locale].definition)
    assert.equal(node.inDefinedTermSet['@id'], set['@id'])
    const detail = fs.readFileSync(path.join(root, 'out', `${pathname.slice(1)}/${item.id}.html`), 'utf8')
    const detailMain = detail.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]
    assert.ok(detailMain, `Missing detail content: ${termUrl}`)
    const detailText = decode(detailMain.replace(/<[^>]*>/g, ''))
    assert.ok(detailText.includes(item[locale].definition), `Definition missing: ${termUrl}`)
    assert.ok(detailText.includes(item[locale].example), `Example missing: ${termUrl}`)
    assert.match(detailMain, /<form\b[^>]*method="get"/)
    assert.ok(detailMain.includes(`action="${locale === 'es' ? '/es' : ''}/quote-now"`))
    assert.ok(detailMain.includes(`name="service" value="${glossaryQuoteService(item.category, item.id)}"`))
    assert.ok(detailMain.includes('name="origin"'))
    assert.ok(detailMain.includes('name="destination"'))
    assert.ok(detailMain.includes('name="term"'))
    assert.ok(detailMain.includes(`href="${pathname}"`), `Missing glossary backlink: ${termUrl}`)
    assert.equal([...detail.matchAll(/<h1\b/g)].length, 1)
    const detailGraphs = [...detail.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .flatMap(([, json]) => JSON.parse(json)['@graph'] ?? [])
    const detailTerm = detailGraphs.find((entry) => entry['@type'] === 'DefinedTerm')
    assert.equal(detailTerm?.['@id'], `${termUrl}#term`)
    assert.equal(detailTerm.description, item[locale].definition)
    assert.equal(detailGraphs.find((entry) => entry['@type'] === 'WebPage').mainEntity['@id'], detailTerm['@id'])
    const breadcrumb = detailGraphs.find((entry) => entry['@type'] === 'BreadcrumbList')
    assert.equal(breadcrumb.itemListElement.length, 3)
    assert.equal(breadcrumb.itemListElement.at(-1).item, termUrl)
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id)
  assert.equal(ids.length, new Set(ids).size, `Duplicate HTML IDs: ${pathname}`)
  for (const [, id] of main.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), `Broken anchor: ${id}`)
}

// Public references must remain synchronized with the HTML and editorial data.
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'out/glossary.json'), 'utf8'))
assert.equal(catalog.termCount, glossaryTerms.length)
assert.equal(catalog.terms.length, glossaryTerms.length)
assert.equal(new Set(catalog.terms.map((term) => term.id)).size, glossaryTerms.length)
assert.deepEqual(catalog.languages, ['en', 'es'])
assert.equal(catalog.publisher.url, 'https://tlimiami.com')
assert.equal(catalog.sitemap, 'https://tlimiami.com/sitemap.xml')
for (const locale of ['en', 'es']) {
  const prefix = locale === 'es' ? '/es' : ''
  const reference = fs.readFileSync(path.join(root, 'out', `${prefix.slice(1)}${prefix ? '/' : ''}glossary-reference.txt`), 'utf8')
  assert.match(reference, /^# TLI Miami/)
  assert.ok(!reference.includes('<html'))
  assert.equal([...reference.matchAll(/^## /gm)].length, glossaryTerms.length)
  for (const term of glossaryTerms) {
    const record = catalog.terms.find((item) => item.id === term.id).translations[locale]
    assert.equal(record.name, term[locale].name)
    assert.equal(record.definition, term[locale].definition)
    assert.equal(record.example, term[locale].example)
    assert.equal(record.url, `https://tlimiami.com${prefix}/glossary/${term.id}`)
    const quote = new URL(record.quoteUrl)
    assert.equal(quote.origin, 'https://tlimiami.com')
    assert.equal(quote.pathname, `${prefix}/quote-now`)
    assert.equal(quote.searchParams.get('service'), glossaryQuoteService(term.category, term.id))
    assert.equal(quote.searchParams.get('term'), term[locale].name)
    for (const content of [record.definition, record.example, record.url, record.quoteUrl]) assert.ok(reference.includes(content), `Missing reference content: ${term.id}/${locale}`)
  }
}

// Search must work across languages and accents while respecting topic filters.
const spanish = localizedTerms('es')
const awb = spanish.find((item) => item.id === 'awb')
assert.ok(matchesGlossaryTerm(awb, 'GUIA AEREA', ''))
assert.ok(matchesGlossaryTerm(awb, 'air waybill', 'air'))
assert.ok(!matchesGlossaryTerm(awb, 'air waybill', 'ocean'))
assert.ok(!spanish.some((item) => matchesGlossaryTerm(item, 'zzzz-no-such-term', '')))
assert.equal(spanish.filter((item) => matchesGlossaryTerm(item, '', 'ocean')).length, glossaryTerms.filter((item) => item.category === 'ocean').length)

// The full bilingual editorial catalog belongs in server/build code, not client JS.
const chunks = fs.readdirSync(path.join(root, 'out/_next/static/chunks')).filter((name) => name.endsWith('.js'))
for (const name of chunks) {
  const js = fs.readFileSync(path.join(root, 'out/_next/static/chunks', name), 'utf8')
  assert.ok(!js.includes(glossaryTerms[0].en.definition), `Catalog leaked into client bundle: ${name}`)
}
console.log(`Glossary verified: ${glossaryTerms.length * 2} term pages, directory links, quote forms, static definitions, schema and bilingual search.`)
