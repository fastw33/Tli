import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import sharp from 'sharp'

const output = new URL('../out/', import.meta.url)
const icons = [
  { file: 'favicon.ico', type: /image\/(?:x-icon|vnd\.microsoft\.icon)/ },
  { file: 'favicon-48x48.png', size: 48, type: /image\/png/ },
  { file: 'favicon-192x192.png', size: 192, type: /image\/png/ },
  { file: 'apple-icon.png', size: 180, type: /image\/png/ },
]
const expected = new Map()
for (const icon of icons) {
  const bytes = await readFile(new URL(icon.file, output))
  expected.set(icon.file, bytes)
  if (icon.size) {
    const { info } = await sharp(bytes).raw().toBuffer({ resolveWithObject: true })
    assert.equal(info.width, icon.size, icon.file)
    assert.equal(info.height, icon.size, icon.file)
  } else {
    assert.equal(bytes.readUInt16LE(0), 0)
    assert.equal(bytes.readUInt16LE(2), 1)
    assert.equal(bytes.readUInt16LE(4), 4)
    for (const [index, size] of [16, 32, 48, 64].entries()) {
      const entry = 6 + index * 16
      assert.equal(bytes[entry], size)
      assert.equal(bytes[entry + 1], size)
      const length = bytes.readUInt32LE(entry + 8)
      const offset = bytes.readUInt32LE(entry + 12)
      assert.ok(offset >= 70 && offset + length <= bytes.length)
      const { info } = await sharp(bytes.subarray(offset, offset + length))
        .raw().toBuffer({ resolveWithObject: true })
      assert.equal(info.width, size)
      assert.equal(info.height, size)
    }
  }
}

const manifestBytes = await readFile(new URL('manifest.webmanifest', output))
expected.set('manifest.webmanifest', manifestBytes)
const manifest = JSON.parse(manifestBytes.toString())
for (const icon of manifest.icons) {
  assert.ok(expected.has(icon.src.slice(1)), `Missing manifest icon: ${icon.src}`)
}

function checkHead(html, label) {
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1]
  assert.ok(head, `Missing head: ${label}`)
  const links = [...head.matchAll(/<link\b[^>]*>/g)].map(([tag]) =>
    Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)]
      .map(([, key, value]) => [key, value])),
  )
  const faviconLinks = links.filter(link => link.rel === 'icon')
  assert.deepEqual(faviconLinks.map(link => link.href).sort(), [
    '/favicon.ico', '/favicon-48x48.png', '/favicon-192x192.png',
  ].sort(), `Incorrect favicons: ${label}`)
  assert.equal(links.find(link => link.rel === 'apple-touch-icon')?.href, '/apple-icon.png', label)
  assert.equal(links.find(link => link.rel === 'manifest')?.href, '/manifest.webmanifest', label)
}

let checked = 0
for (const file of await readdir(output, { recursive: true })) {
  if (!file.endsWith('.html')) continue
  const html = await readFile(new URL(file.replaceAll('\\', '/'), output), 'utf8')
  if (!html.includes('rel="canonical"')) continue
  checkHead(html, file)
  checked++
}
assert.ok(checked >= 16, 'Expected all localized pages in the export')
console.log(`Favicons verified: ${checked} pages, four decoded ICO frames, PNG sizes and manifest.`)

if (process.argv.includes('--live')) {
  const origin = 'https://tlimiami.com'
  for (const icon of [...icons, { file: 'manifest.webmanifest', type: /application\/(?:manifest\+json|json)/ }]) {
    const response = await fetch(`${origin}/${icon.file}`, { signal: AbortSignal.timeout(15000) })
    assert.equal(response.status, 200, icon.file)
    assert.match(response.headers.get('content-type') || '', icon.type, icon.file)
    const bytes = Buffer.from(await response.arrayBuffer())
    assert.ok(bytes.equals(expected.get(icon.file)), `Production differs from export: ${icon.file}`)
    console.log(`OK ${origin}/${icon.file}`)
  }
  for (const route of ['/', '/es']) {
    const response = await fetch(`${origin}${route}`, { signal: AbortSignal.timeout(15000) })
    assert.equal(response.status, 200, route)
    checkHead(await response.text(), route)
    console.log(`OK favicon links ${origin}${route}`)
  }
}
