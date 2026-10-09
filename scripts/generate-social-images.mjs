import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const output = path.join(root, 'public/images')
await fs.mkdir(output, { recursive: true })
const logo = await sharp(path.join(root, 'public/transport.webp'))
  .resize({ width: 360 })
  .png()
  .toBuffer()
const copy = {
  en: {
    eyebrow: 'MIAMI, FLORIDA · UNITED STATES',
    title: ['Your freight.', 'Connected worldwide.'],
    services: 'AIR · OCEAN · GROUND',
    destinations: 'United States · Caribbean · Latin America',
  },
  es: {
    eyebrow: 'MIAMI, FLORIDA · ESTADOS UNIDOS',
    title: ['Tu carga.', 'Conectada con el mundo.'],
    services: 'AÉREO · MARÍTIMO · TERRESTRE',
    destinations: 'Estados Unidos · Caribe · Latinoamérica',
  },
}
for (const [locale, text] of Object.entries(copy)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#f4f8fb"/>
    <rect x="770" width="430" height="630" fill="#042c51"/>
    <path d="M770 0v630" stroke="#18aeea" stroke-width="8"/>
    <rect x="52" y="40" width="388" height="155" rx="12" fill="white"/>
    <image href="data:image/png;base64,${logo.toString('base64')}" x="66" y="45" width="360" height="144"/>
    <g font-family="Arial, sans-serif">
      <text x="60" y="248" font-size="18" font-weight="700" letter-spacing="2" fill="#0a4eb6">${text.eyebrow}</text>
      <text x="60" y="334" font-size="58" font-weight="700" letter-spacing="-2" fill="#042c51">${text.title[0]}</text>
      <text x="60" y="403" font-size="48" font-weight="700" letter-spacing="-1" fill="#042c51">${text.title[1]}</text>
      <text x="60" y="505" font-size="19" font-weight="700" letter-spacing="1" fill="#0a4eb6">${text.services}</text>
      <text x="60" y="550" font-size="22" fill="#526273">${text.destinations}</text>
      <text x="822" y="274" font-size="40" font-weight="700" fill="white">TLI MIAMI</text>
      <path d="M822 310h270" stroke="#18aeea" stroke-width="4"/>
      <text x="822" y="356" font-size="26" fill="#c6d8e8">tlimiami.com</text>
      <text x="822" y="564" font-size="20" fill="#c6d8e8">+1 (305) 887-6363</text>
    </g>
  </svg>`
  const filename = `tli-social-${locale}.png`
  await sharp(Buffer.from(svg)).png().toFile(path.join(output, filename))
  console.log(`Generated ${filename} (1200×630)`)
}
