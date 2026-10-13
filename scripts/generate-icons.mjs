import { mkdir, readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

// Search crawlers are most reliable with stable root PNG/ICO URLs.
const publicDirectory = new URL('../public/', import.meta.url)
const source = await readFile(new URL('favicon-source.svg', import.meta.url))
const sizes = [16, 32, 48, 64]
const images = await Promise.all(
  sizes.map(size => sharp(source).resize(size, size).png().toBuffer()),
)

// ICO supports PNG frames, one directory entry for each display size.
const directory = Buffer.alloc(6 + images.length * 16)
directory.writeUInt16LE(1, 2)
directory.writeUInt16LE(images.length, 4)
let offset = directory.length

images.forEach((image, index) => {
  const entry = 6 + index * 16
  directory[entry] = sizes[index]
  directory[entry + 1] = sizes[index]
  directory.writeUInt16LE(1, entry + 4)
  directory.writeUInt16LE(32, entry + 6)
  directory.writeUInt32LE(image.length, entry + 8)
  directory.writeUInt32LE(offset, entry + 12)
  offset += image.length
})

await mkdir(publicDirectory, { recursive: true })
await writeFile(new URL('favicon.ico', publicDirectory), Buffer.concat([directory, ...images]))
await writeFile(new URL('favicon-48x48.png', publicDirectory), await sharp(source).resize(48, 48).png().toBuffer())
await writeFile(new URL('favicon-192x192.png', publicDirectory), await sharp(source).resize(192, 192).png().toBuffer())
await writeFile(new URL('apple-icon.png', publicDirectory), await sharp(source).resize(180, 180).png().toBuffer())
console.log('Generated favicon.ico, favicon-48x48.png, favicon-192x192.png and apple-icon.png in public/.')
