import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import ts from 'typescript'

async function loadSource(path) {
  const source = await fs.readFile(new URL(path, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  })
  return import(
    'data:text/javascript;base64,' + Buffer.from(outputText).toString('base64')
  )
}
const { quoteDefaults, quotePayload, validateQuote } = await loadSource(
  '../src/lib/quote.ts',
)
const { sendLead } = await loadSource('../src/lib/leads.ts')
const complete = {
  ...quoteDefaults('dominican-republic', 'ocean'),
  origin: 'Miami, USA',
  destination: 'Santo Domingo, Dominican Republic',
  name: 'TLI QA',
  email: 'qa@example.invalid',
  phone: '+1 (305) 555-0100',
  weight: '125.5',
  details: 'QA cargo',
  company: 'QA Company',
}

test('regional and service links preserve valid selections and reject unknown URL values', () => {
  assert.equal(
    quoteDefaults('dominican-republic', 'ocean').region,
    'dominican-republic',
  )
  assert.equal(quoteDefaults('dominican-republic', 'ocean').service, 'ocean')
  assert.equal(quoteDefaults('unknown', 'unknown').region, '')
  assert.equal(quoteDefaults('unknown', 'unknown').service, 'air')
  assert.equal(quoteDefaults('__proto__', 'constructor').region, '')
})

test('empty fields, invalid email, nonpositive weight and identical routes cannot pass validation', () => {
  assert.deepEqual(
    Object.keys(validateQuote(quoteDefaults(null, null), 1)).sort(),
    ['destination', 'origin', 'region'],
  )
  for (const weight of ['0', '-1', 'NaN', 'Infinity', ''])
    assert.ok(validateQuote({ ...complete, weight }, 2).weight)
  assert.ok(validateQuote({ ...complete, email: 'invalid@' }, 2).email)
  assert.ok(validateQuote({ ...complete, phone: '-------' }, 2).phone)
  assert.ok(
    validateQuote({ ...complete, destination: '  MIAMI, USA  ' }, 2)
      .destination,
  )
  assert.deepEqual(validateQuote(complete, 2), {})
})

test('the central backend receives logistics under its supported business unit with TLI attribution', () => {
  const payload = quotePayload(complete, 'es')
  assert.equal(payload.businessUnit, 'Fastway')
  assert.equal(payload.brand, 'TLI Miami')
  assert.equal(payload.serviceLine, 'logistica')
  assert.equal(payload.region, 'Dominican Republic')
  assert.equal(payload.service, 'Ocean Freight')
  assert.equal(payload.weight, 125.5)
  assert.equal(payload.language, 'es')
  assert.match(payload.description, /TLI freight quote/)
})

test('submission uses the public ingest multipart contract and records actual notification status', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    assert.ok(String(url).endsWith('/api/leads/public/ingest'))
    assert.equal(init.method, 'POST')
    assert.equal(typeof init.headers['x-api-key'], 'string')
    assert.equal(init.headers['Content-Type'], undefined)
    assert.equal(init.body.get('pageUrl'), 'https://tlimiami.com/quote-now')
    assert.equal(init.body.get('formId'), 'tliQuoteRequest')
    assert.equal(JSON.parse(init.body.get('payload')).brand, 'TLI Miami')
    return Response.json({
      ok: true,
      leadId: 'test-lead',
      code: 'LF-QA',
      notification: { sent: true },
    })
  })
  assert.deepEqual(
    await sendLead(
      quotePayload(complete, 'en'),
      'https://tlimiami.com/quote-now',
    ),
    { ok: true, reference: 'LF-QA', notificationSent: true },
  )
})

test('HTML 200 responses and HTTP failures never produce a false confirmation', async (t) => {
  for (const response of [
    new Response('<html>proxy</html>'),
    Response.json({ ok: true }),
    Response.json({ ok: true, code: '', leadId: '' }),
    Response.json({ ok: false }),
    Response.json({ ok: true, code: 'LF-QA' }, { status: 401 }),
  ]) {
    const mock = t.mock.method(globalThis, 'fetch', async () => response)
    assert.equal(
      (await sendLead({}, 'https://tlimiami.com/quote-now')).ok,
      false,
    )
    mock.mock.restore()
  }
})

test('a saved lead with failed mail notification is not retried or reported as an unsaved request', async (t) => {
  let calls = 0
  t.mock.method(globalThis, 'fetch', async () => {
    calls++
    return Response.json({
      ok: true,
      leadId: 'test-lead',
      notification: { sent: false },
    })
  })
  assert.deepEqual(await sendLead({}, 'https://tlimiami.com/quote-now'), {
    ok: true,
    reference: 'test-lead',
    notificationSent: false,
  })
  assert.equal(calls, 1)
})

test('network failure keeps success false and does not retry an ambiguous submission', async (t) => {
  let calls = 0
  t.mock.method(globalThis, 'fetch', async () => {
    calls++
    throw new TypeError('Network error')
  })
  assert.equal((await sendLead({}, 'https://tlimiami.com/quote-now')).ok, false)
  assert.equal(calls, 1)
})
