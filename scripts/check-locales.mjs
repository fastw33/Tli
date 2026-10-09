import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const root = path.resolve(import.meta.dirname, '..')
const dictionary = JSON.parse(
  fs.readFileSync(path.join(root, 'src/lib/translations/es.json'), 'utf8'),
)
const required = new Set()
const errors = []
const fields = new Set([
  'title',
  'subtitle',
  'description',
  'label',
  'category',
  'coverage',
  'name',
  'focus',
  'detail',
  'role',
])
function files(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? files(path.join(dir, entry.name))
        : [path.join(dir, entry.name)],
    )
}
function requireTranslation(value) {
  if (
    value &&
    /[A-Za-z]/.test(value) &&
    !value.includes('@') &&
    !['Google', 'LinkedIn', 'GitHub', 'en', 'es', 'latin'].includes(value)
  )
    required.add(value)
}
const sourceFiles = files(path.join(root, 'src/components')).filter(
  (file) =>
    /\.tsx$/.test(file) &&
    !file.includes(`${path.sep}Clients${path.sep}`) &&
    !/(Button|Card)\.tsx$/.test(file),
)
sourceFiles.push(
  path.join(root, 'src/lib/contacts.ts'),
  path.join(root, 'src/components/QuoteNow/citiesData.ts'),
)
for (const file of sourceFiles) {
  const sf = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  function literalBranches(node) {
    if (ts.isStringLiteral(node)) requireTranslation(node.text)
    else if (ts.isConditionalExpression(node)) {
      literalBranches(node.whenTrue)
      literalBranches(node.whenFalse)
    }
  }
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(sf) === 't' &&
      node.arguments[0]
    )
      literalBranches(node.arguments[0])
    if (
      ts.isPropertyAssignment(node) &&
      fields.has(node.name.getText(sf)) &&
      ts.isStringLiteral(node.initializer) &&
      !(file.endsWith('contacts.ts') && node.name.getText(sf) === 'name')
    )
      requireTranslation(node.initializer.text)
    if (ts.isArrayLiteralExpression(node))
      node.elements
        .filter(ts.isStringLiteral)
        .forEach((item) => requireTranslation(item.text))
    if (
      file.endsWith('citiesData.ts') &&
      ts.isPropertyAssignment(node) &&
      ts.isStringLiteral(node.name)
    )
      requireTranslation(node.name.text)
    if (ts.isJsxText(node)) {
      const raw = node.text.replace(/\s+/g, ' ').trim()
      if (
        /[A-Za-z]/.test(raw) &&
        !raw.includes('@') &&
        !/^(10049|Medley, FL|Transport Logistic International|Greenway Bogotá|2026 \| TLI Miami|MIAMI)$/.test(
          raw,
        ) &&
        !/^(10049|Medley, FL|2026 \| TLI Miami)/.test(raw)
      )
        errors.push(`Untranslated JSX in ${path.relative(root, file)}: ${raw}`)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
}
for (const key of required)
  if (!dictionary[key]) errors.push(`Missing Spanish translation: ${key}`)
for (const [english, spanish] of Object.entries(dictionary)) {
  const placeholders = (text) =>
    [...text.matchAll(/\{(\w+)\}/g)]
      .map((match) => match[1])
      .sort()
      .join(',')
  if (placeholders(english) !== placeholders(spanish))
    errors.push(`Interpolation mismatch: ${english}`)
}
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(
  `Checked ${required.size} translations, interpolation and visible JSX across ${sourceFiles.length} files.`,
)
