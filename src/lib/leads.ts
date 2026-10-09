// This ingestion key is public by design, as in the reference website.
// Never place SMTP credentials or a private administrative key in this client.
const publicKey =
  process.env.NEXT_PUBLIC_LEADS_PUBLIC_KEY ||
  '24ea37570607a4f7bfeb2db3dff038288ac2d7fdee030458466265149ae4444a'
const endpoint =
  process.env.NEXT_PUBLIC_LEADS_ENDPOINT ||
  'https://sisleads.appfastway.com/api/leads/public/ingest'

export type LeadResult =
  | { ok: true; reference: string; notificationSent: boolean }
  | { ok: false; message: string }

export async function sendLead(
  payload: Record<string, unknown>,
  pageUrl: string,
  formId = 'tliQuoteRequest',
): Promise<LeadResult> {
  const body = new FormData()
  body.append('pageUrl', pageUrl)
  body.append('formId', formId)
  body.append('payload', JSON.stringify(payload))
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 45000)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'x-api-key': publicKey },
      body,
      signal: controller.signal,
    })
    let data: Record<string, unknown>
    try {
      data = await response.json()
    } catch {
      return {
        ok: false,
        message:
          'We could not confirm receipt. Contact our team before sending again.',
      }
    }
    const reference =
      typeof data.code === 'string' && data.code.trim()
        ? data.code.trim()
        : typeof data.leadId === 'string'
          ? data.leadId.trim()
          : ''
    if (!response.ok || data.ok !== true || !reference) {
      return {
        ok: false,
        message:
          response.status === 429
            ? 'Too many requests. Please wait a moment before trying again.'
            : 'Your request could not be sent. Your details are still here. Please try again or contact our team.',
      }
    }
    const notification = data.notification as { sent?: boolean } | undefined
    return {
      ok: true,
      reference,
      notificationSent: notification?.sent === true,
    }
  } catch {
    return {
      ok: false,
      message:
        'We could not confirm receipt. Contact our team before sending again.',
    }
  } finally {
    clearTimeout(timeout)
  }
}
