import nodemailer from 'nodemailer'

function json(res, status, body) {
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function getIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length) return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

// Best-effort in-memory rate limiter (works per function instance).
const RATE_WINDOW_MS = 60_000
const RATE_MAX = 8
const MIN_SUBMIT_INTERVAL_MS = 5_000
const MIN_FORM_FILL_MS = 3_000
const recentByIp = new Map()
const lastSubmitByIp = new Map()

function rateLimitOk(ip) {
  const now = Date.now()
  const lastSubmit = lastSubmitByIp.get(ip) || 0
  if (now - lastSubmit < MIN_SUBMIT_INTERVAL_MS) return false
  const arr = recentByIp.get(ip) || []
  const next = arr.filter((t) => now - t < RATE_WINDOW_MS)
  next.push(now)
  recentByIp.set(ip, next)
  if (next.length <= RATE_MAX) {
    lastSubmitByIp.set(ip, now)
    return true
  }
  return false
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function hasSuspiciousContent(value) {
  const s = String(value || '').toLowerCase()
  return (
    s.includes('http://') ||
    s.includes('https://') ||
    s.includes('viagra') ||
    s.includes('casino') ||
    s.includes('bitcoin')
  )
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  })

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    })
    const data = await response.json()
    return Boolean(data?.success)
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  const ip = getIp(req)
  if (!rateLimitOk(ip)) return json(res, 429, { error: 'Too many requests. Please try again shortly.' })

  let data
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return json(res, 400, { error: 'Invalid JSON' })
  }

  const name = String(data?.name || '').trim()
  const email = String(data?.email || '').trim()
  const phone = String(data?.phone || '').trim()
  const service = String(data?.service || '').trim()
  const message = String(data?.message || '').trim()
  const company = String(data?.company || '').trim() // honeypot
  const startedAt = Number(data?.startedAt || 0)
  const turnstileToken = String(data?.turnstileToken || '').trim()

  // Honeypot: if filled, pretend success.
  if (company) return json(res, 200, { ok: true })

  if (!name || !email || !phone || !service || !message) {
    return json(res, 400, { error: 'Missing required fields.' })
  }

  if (name.length > 120 || email.length > 200 || phone.length > 80 || service.length > 200) {
    return json(res, 400, { error: 'Please shorten your contact details.' })
  }

  if (!isEmail(email)) {
    return json(res, 400, { error: 'Please provide a valid email address.' })
  }

  if (hasSuspiciousContent(name) || hasSuspiciousContent(message)) {
    return json(res, 400, { error: 'Message blocked. Please remove suspicious links/text.' })
  }

  if (startedAt && Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FORM_FILL_MS) {
    return json(res, 400, { error: 'Form submitted too quickly. Please try again.' })
  }

  const turnstileOk = await verifyTurnstile(turnstileToken, ip)
  if (!turnstileOk) {
    return json(res, 400, { error: 'Captcha verification failed.' })
  }

  const to = process.env.CONTACT_TO
  const from = process.env.CONTACT_FROM
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || '587')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!to || !from || !host || !user || !pass) {
    return json(res, 500, {
      error:
        'Server email is not configured. Set CONTACT_TO, CONTACT_FROM, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.',
    })
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const subject = `New Fidara inquiry: ${service}`
  const text =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Service: ${service}\n` +
    `IP: ${ip}\n` +
    `\n` +
    `${message}\n`

  try {
    await transporter.sendMail({
      to,
      from,
      replyTo: email,
      subject,
      text,
    })

    if (process.env.CONTACT_ALERT_WEBHOOK) {
      fetch(process.env.CONTACT_ALERT_WEBHOOK, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          text: `New Fidara inquiry: ${service} from ${name} <${email}>`,
          ip,
        }),
      }).catch(() => {})
    }

    return json(res, 200, { ok: true })
  } catch (error) {
    console.error('[contact-email-failed]', {
      message: error?.message,
      code: error?.code,
      command: error?.command,
      response: error?.response,
      responseCode: error?.responseCode,
      host,
      port,
      secure: port === 465,
      from,
      to,
    })
    return json(res, 500, { error: 'Failed to send. Please try again later.' })
  }
}
