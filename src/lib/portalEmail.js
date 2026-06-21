import process from 'node:process'
import nodemailer from 'nodemailer'
import { getSupabaseAdmin } from './supabaseAdmin.js'

function getEmailConfig() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || '587')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.PORTAL_EMAIL_FROM || process.env.CONTACT_FROM

  if (!host || !user || !pass || !from) return null
  return { host, port, user, pass, from }
}

export async function getClientPortalRecipients(clientId) {
  if (!clientId) return []

  const { data, error } = await getSupabaseAdmin()
    .from('client_users')
    .select('profiles(email)')
    .eq('client_id', clientId)

  if (error) {
    console.warn('[portal-email:recipients]', error)
    return []
  }

  return Array.from(
    new Set(
      (data || [])
        .map((row) => String(row.profiles?.email || '').trim().toLowerCase())
        .filter(Boolean),
    ),
  )
}

export async function sendPortalNotification({ clientId, subject, text }) {
  const config = getEmailConfig()
  if (!config) {
    console.warn('[portal-email] SMTP is not configured; notification skipped.')
    return { sent: false, skipped: true, reason: 'smtp_missing' }
  }

  const recipients = await getClientPortalRecipients(clientId)
  if (!recipients.length) {
    console.warn('[portal-email] No linked client recipients; notification skipped.')
    return { sent: false, skipped: true, reason: 'no_recipients' }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    })

    await transporter.sendMail({
      to: recipients.join(','),
      from: config.from,
      subject,
      text,
    })

    return { sent: true, skipped: false, recipients: recipients.length }
  } catch (error) {
    console.warn('[portal-email:send-failed]', {
      message: error?.message,
      code: error?.code,
      command: error?.command,
      responseCode: error?.responseCode,
    })
    return { sent: false, skipped: false, reason: 'send_failed' }
  }
}

export function portalNotificationText(itemType) {
  return [
    `Fidara Group added ${itemType} to your client portal.`,
    '',
    'Please log in to review it.',
    '',
    'For your security, this email does not include private document links or attachments.',
  ].join('\n')
}
