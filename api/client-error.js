function json(res, status, body) {
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  let data
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return json(res, 400, { error: 'Invalid JSON' })
  }

  const payload = {
    at: new Date().toISOString(),
    ua: req.headers['user-agent'] || '',
    ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown',
    ...data,
  }

  console.error('[client-error]', payload)

  if (process.env.CLIENT_ERROR_WEBHOOK) {
    fetch(process.env.CLIENT_ERROR_WEBHOOK, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        text: `Client error: ${payload?.type || 'unknown'} ${payload?.message || ''}`,
        payload,
      }),
    }).catch(() => {})
  }
  return json(res, 200, { ok: true })
}
