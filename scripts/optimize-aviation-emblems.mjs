import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const source = path.join(root, 'assets/aviation-emblems')
const output = path.join(root, 'public/images/aviation')
await fs.mkdir(output, { recursive: true })

const assets = [
  { id: 'iata', input: 'iata-original.svg', width: 480, quality: 85, url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/IATAlogo.svg' },
  { id: 'tsa', input: 'tsa-original.svg', width: 640, quality: 82, url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Transportation_Security_Administration_Logo.svg' },
  { id: 'dhs', input: 'dhs-original.svg', width: 320, quality: 82, url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg' },
]

const report = []
for (const asset of assets) {
  const original = path.join(source, asset.input)
  const destination = path.join(output, `${asset.id}.webp`)
  const info = await sharp(original, { density: 192 })
    .resize({ width: asset.width })
    .webp({ quality: asset.quality, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(destination)
  report.push({
    id: asset.id,
    source: asset.url,
    file: `/images/aviation/${asset.id}.webp`,
    width: info.width,
    height: info.height,
    bytes: info.size,
  })
  console.log(`${asset.id}: ${info.width}×${info.height}, ${(info.size / 1024).toFixed(1)} KiB`)
}
await fs.writeFile(path.join(source, 'optimized.json'), `${JSON.stringify(report, null, 2)}\n`)
