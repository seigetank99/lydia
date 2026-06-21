import { getCurrentUser } from '../src/lib/serverAuth.js'
import {
  getStorageBucket,
  json,
  parseBody,
  recordAuditEvent,
  requireAdmin,
} from '../src/lib/serverPortal.js'
import { portalNotificationText, sendPortalNotification } from '../src/lib/portalEmail.js'
import { getSupabaseAdmin } from '../src/lib/supabaseAdmin.js'

const ALLOWED_DOCUMENT_STATUSES = new Set(['received', 'reviewing', 'completed'])
const ALLOWED_BILLING_STATUSES = new Set(['open', 'paid', 'overdue'])
const ALLOWED_REQUEST_STATUSES = new Set(['open', 'completed', 'closed'])

function isValidDate(value) {
  if (!value) return true
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function normalizeText(value) {
  return String(value || '').trim()
}

function normalizeOptionalText(value) {
  const normalized = normalizeText(value)
  return normalized || null
}

function asPositiveInteger(value) {
  const numeric = Number(value)
  if (!Number.isInteger(numeric) || numeric < 0) return null
  return numeric
}

async function requireAdminUser(req, res) {
  const user = await getCurrentUser(req)
  if (!user) {
    json(res, 401, { error: 'Unauthorized' })
    return null
  }

  try {
    await requireAdmin(user.id)
    return user
  } catch (error) {
    if (error.code === 'FORBIDDEN') {
      json(res, 403, { error: 'Forbidden' })
      return null
    }

    throw error
  }
}

async function parseJsonBody(req, res) {
  try {
    return parseBody(req.body)
  } catch {
    json(res, 400, { error: 'Invalid JSON body.' })
    return null
  }
}

async function handleSummary(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const supabaseAdmin = getSupabaseAdmin()
  const [
    { count: clientsCount, error: clientsError },
    { count: documentsCount, error: docsError },
    { count: openRequestsCount, error: requestsError },
    { data: invoiceRows, error: invoiceError },
    { data: recentActivity, error: activityError },
    { data: recentUploads, error: recentUploadsError },
  ] = await Promise.all([
    supabaseAdmin.from('clients').select('id', { count: 'exact', head: true }),
    supabaseAdmin
      .from('documents')
      .select('id', { count: 'exact', head: true })
      .is('archived_at', null)
      .is('deleted_at', null),
    supabaseAdmin.from('document_requests').select('id', { count: 'exact', head: true }).eq('status', 'open'),
    supabaseAdmin.from('billing_items').select('amount_cents, status'),
    supabaseAdmin
      .from('audit_events')
      .select('id, event_type, description, client_id, created_at')
      .order('created_at', { ascending: false })
      .limit(10),
    supabaseAdmin
      .from('documents')
      .select('id, original_file_name, created_at, client_id, clients(name, business_name)')
      .is('archived_at', null)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  if (clientsError) throw clientsError
  if (docsError) throw docsError
  if (requestsError) throw requestsError
  if (invoiceError) throw invoiceError
  if (activityError) throw activityError
  if (recentUploadsError) throw recentUploadsError

  const openInvoices = (invoiceRows || []).filter((row) => row.status === 'open' || row.status === 'overdue')
  const outstandingBalanceCents = openInvoices.reduce((sum, row) => sum + (row.amount_cents || 0), 0)

  return json(res, 200, {
    stats: {
      clientsCount: clientsCount || 0,
      documentsCount: documentsCount || 0,
      openRequestsCount: openRequestsCount || 0,
      openInvoicesCount: openInvoices.length,
      outstandingBalanceCents,
    },
    recentActivity: recentActivity || [],
    recentUploads: recentUploads || [],
  })
}

async function handleClients(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const supabaseAdmin = getSupabaseAdmin()
  const [{ data: clients, error: clientsError }, { data: links, error: linksError }] = await Promise.all([
    supabaseAdmin.from('clients').select('id, name, business_name, created_at').order('created_at', { ascending: false }),
    supabaseAdmin
      .from('client_users')
      .select('client_id, user_id, created_at, profiles(email, full_name)')
      .order('created_at', { ascending: false }),
  ])

  if (clientsError) throw clientsError
  if (linksError) throw linksError

  const linksByClientId = new Map()
  for (const link of links || []) {
    const items = linksByClientId.get(link.client_id) || []
    items.push({
      user_id: link.user_id,
      email: link.profiles?.email || '',
      full_name: link.profiles?.full_name || '',
      linked_at: link.created_at,
    })
    linksByClientId.set(link.client_id, items)
  }

  const normalizedClients = (clients || []).map((client) => ({
    ...client,
    linked_users: linksByClientId.get(client.id) || [],
  }))

  return json(res, 200, { clients: normalizedClients })
}

async function handleDocuments(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const filter = normalizeText(req.query?.filter || 'active').toLowerCase()
  let query = getSupabaseAdmin()
    .from('documents')
    .select('id, client_id, original_file_name, file_type, file_size, category, status, created_at, archived_at, deleted_at, clients(name, business_name)')
    .order('created_at', { ascending: false })
    .limit(100)

  if (filter === 'archived') {
    query = query.not('archived_at', 'is', null).is('deleted_at', null)
  } else if (filter !== 'all') {
    query = query.is('archived_at', null).is('deleted_at', null)
  }

  const { data, error } = await query

  if (error) throw error

  const documents = (data || []).map((document) => ({
    id: document.id,
    client_id: document.client_id,
    client_name: document.clients?.business_name || document.clients?.name || 'Unknown client',
    original_file_name: document.original_file_name,
    category: document.category,
    status: document.status,
    file_size: document.file_size,
    created_at: document.created_at,
    archived_at: document.archived_at,
    deleted_at: document.deleted_at,
  }))

  return json(res, 200, { documents })
}

async function handleRequests(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const { data, error } = await getSupabaseAdmin()
    .from('document_requests')
    .select('id, client_id, title, description, status, due_date, created_at, updated_at, clients(name, business_name)')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) throw error

  return json(res, 200, {
    requests: (data || []).map((request) => ({
      id: request.id,
      client_id: request.client_id,
      client_name: request.clients?.business_name || request.clients?.name || 'Unknown client',
      title: request.title,
      description: request.description,
      status: request.status,
      due_date: request.due_date,
      created_at: request.created_at,
      updated_at: request.updated_at,
    })),
  })
}

async function handleBilling(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const { data, error } = await getSupabaseAdmin()
    .from('billing_items')
    .select('id, client_id, title, description, amount_cents, currency, status, due_date, stripe_hosted_invoice_url, invoice_pdf_url, created_at, updated_at, clients(name, business_name)')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) throw error

  return json(res, 200, {
    billingItems: (data || []).map((item) => ({
      id: item.id,
      client_id: item.client_id,
      client_name: item.clients?.business_name || item.clients?.name || 'Unknown client',
      title: item.title,
      description: item.description,
      amount_cents: item.amount_cents,
      currency: item.currency,
      status: item.status,
      due_date: item.due_date,
      stripe_hosted_invoice_url: item.stripe_hosted_invoice_url,
      invoice_pdf_url: item.invoice_pdf_url,
      created_at: item.created_at,
      updated_at: item.updated_at,
    })),
  })
}

async function handleMessages(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const { data, error } = await getSupabaseAdmin()
    .from('portal_messages')
    .select('id, client_id, title, body, created_by, created_at, updated_at, archived_at, clients(name, business_name)')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) throw error

  return json(res, 200, {
    messages: (data || []).map((message) => ({
      id: message.id,
      client_id: message.client_id,
      client_name: message.clients?.business_name || message.clients?.name || 'Unknown client',
      title: message.title,
      body: message.body,
      created_by: message.created_by,
      created_at: message.created_at,
      updated_at: message.updated_at,
      archived_at: message.archived_at,
    })),
  })
}

async function handleCreateClient(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const name = normalizeText(payload.name)
  const businessName = normalizeOptionalText(payload.businessName)

  if (!name) return json(res, 400, { error: 'Client name is required.' })

  const { data: client, error } = await getSupabaseAdmin()
    .from('clients')
    .insert({
      name,
      business_name: businessName,
    })
    .select('id, name, business_name, created_at')
    .single()

  if (error) throw error

  await recordAuditEvent({
    clientId: client.id,
    eventType: 'client_created',
    description: `Client created for ${businessName || name}.`,
    actorUserId: user.id,
    metadata: {
      client_name: name,
      business_name: businessName,
    },
  })

  return json(res, 200, { client })
}

async function findAuthUserByEmail(email) {
  const supabaseAdmin = getSupabaseAdmin()
  let page = 1

  while (page <= 10) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: 200,
    })

    if (error) throw error

    const user = data?.users?.find((entry) => String(entry.email || '').toLowerCase() === email.toLowerCase())
    if (user) return user
    if (!data?.users?.length || data.users.length < 200) break
    page += 1
  }

  return null
}

async function linkAuthUserToClient({ clientId, client, authUser, email, fullName, actorUserId, eventType = 'client_user_linked' }) {
  const supabaseAdmin = getSupabaseAdmin()
  const { error: profileError } = await supabaseAdmin.from('profiles').upsert(
    {
      id: authUser.id,
      email,
      full_name: fullName || authUser.user_metadata?.full_name || authUser.email,
      role: 'client',
    },
    { onConflict: 'id' },
  )

  if (profileError) throw profileError

  const { error: linkError } = await supabaseAdmin.from('client_users').upsert(
    {
      client_id: clientId,
      user_id: authUser.id,
    },
    { onConflict: 'client_id,user_id' },
  )

  if (linkError) throw linkError

  await recordAuditEvent({
    clientId,
    eventType,
    description: `${eventType === 'client_user_invited' ? 'Invited' : 'Linked'} ${email} to client portal access.`,
    actorUserId,
    metadata: {
      linked_user_id: authUser.id,
      linked_email: email,
      client_name: client.business_name || client.name,
    },
  })
}

async function handleLinkClientUser(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const clientId = normalizeText(payload.clientId)
  const email = normalizeText(payload.email).toLowerCase()
  const fullName = normalizeText(payload.fullName)

  if (!clientId || !email) {
    return json(res, 400, { error: 'Client and email are required.' })
  }

  const { data: client, error: clientError } = await getSupabaseAdmin()
    .from('clients')
    .select('id, name, business_name')
    .eq('id', clientId)
    .single()

  if (clientError || !client) return json(res, 404, { error: 'Client not found.' })

  const authUser = await findAuthUserByEmail(email)
  if (!authUser) return await handleInviteClientUser(req, res, user, { payload, client })

  await linkAuthUserToClient({
    clientId,
    client,
    authUser,
    email,
    fullName,
    actorUserId: user.id,
  })

  await sendPortalNotification({
    clientId,
    subject: 'Fidara client portal access',
    text: [
      'Fidara Group linked your email address to a client portal account.',
      '',
      'Please log in to review your portal. If you need a password, use the forgot password link on the login page.',
    ].join('\n'),
  })

  return json(res, 200, {
    ok: true,
    message: `${email} linked to ${client.business_name || client.name}.`,
  })
}

async function handleInviteClientUser(req, res, user, preloaded = {}) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = preloaded.payload || (await parseJsonBody(req, res))
  if (!payload) return

  const clientId = normalizeText(payload.clientId)
  const email = normalizeText(payload.email).toLowerCase()
  const fullName = normalizeText(payload.fullName)

  if (!clientId || !email) {
    return json(res, 400, { error: 'Client and email are required.' })
  }

  let client = preloaded.client
  if (!client) {
    const { data, error: clientError } = await getSupabaseAdmin()
      .from('clients')
      .select('id, name, business_name')
      .eq('id', clientId)
      .single()

    if (clientError || !data) return json(res, 404, { error: 'Client not found.' })
    client = data
  }

  const existingAuthUser = await findAuthUserByEmail(email)
  if (existingAuthUser) {
    await linkAuthUserToClient({
      clientId,
      client,
      authUser: existingAuthUser,
      email,
      fullName,
      actorUserId: user.id,
    })

    return json(res, 200, {
      ok: true,
      message: `${email} already existed in Supabase Auth and has been linked to ${client.business_name || client.name}.`,
    })
  }

  const supabaseAdmin = getSupabaseAdmin()
  if (typeof supabaseAdmin.auth.admin.inviteUserByEmail !== 'function') {
    await recordAuditEvent({
      clientId,
      eventType: 'client_user_invite_unavailable',
      description: `Invite requested for ${email}, but Supabase invite API was unavailable.`,
      actorUserId: user.id,
      metadata: { invited_email: email },
    })

    return json(res, 200, {
      ok: true,
      message:
        'Supabase invite email is not available in this environment. Create the Supabase Auth user or enable invite emails, then link this email again.',
    })
  }

  const redirectTo = `${(process.env.PUBLIC_SITE_URL || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`).replace(/\/$/, '')}/reset-password`
  const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    redirectTo,
    data: fullName ? { full_name: fullName } : undefined,
  })

  if (inviteError) {
    await recordAuditEvent({
      clientId,
      eventType: 'client_user_invite_failed',
      description: `Invite failed for ${email}.`,
      actorUserId: user.id,
      metadata: { invited_email: email, error_message: inviteError.message },
    })

    return json(res, 400, { error: inviteError.message || 'Unable to send Supabase invite email.' })
  }

  const invitedUser = inviteData?.user || (await findAuthUserByEmail(email))
  if (invitedUser) {
    await linkAuthUserToClient({
      clientId,
      client,
      authUser: invitedUser,
      email,
      fullName,
      actorUserId: user.id,
      eventType: 'client_user_invited',
    })
  } else {
    await recordAuditEvent({
      clientId,
      eventType: 'client_user_invited',
      description: `Invite email sent to ${email}.`,
      actorUserId: user.id,
      metadata: { invited_email: email },
    })
  }

  return json(res, 200, {
    ok: true,
    message: `Invite sent to ${email}. They will set their password through Supabase Auth.`,
  })
}

async function handleCreateRequest(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const clientId = normalizeText(payload.clientId)
  const title = normalizeText(payload.title)
  const description = normalizeOptionalText(payload.description)
  const dueDate = normalizeOptionalText(payload.dueDate)

  if (!clientId || !title) return json(res, 400, { error: 'Client and request title are required.' })
  if (!isValidDate(dueDate)) return json(res, 400, { error: 'Due date must use YYYY-MM-DD format.' })

  const { data: request, error } = await getSupabaseAdmin()
    .from('document_requests')
    .insert({
      client_id: clientId,
      title,
      description,
      status: 'open',
      due_date: dueDate,
    })
    .select('id, client_id, title, description, status, due_date, created_at')
    .single()

  if (error) throw error

  await recordAuditEvent({
    clientId,
    eventType: 'document_request_created',
    description: 'New document request added.',
    actorUserId: user.id,
    metadata: {
      request_id: request.id,
      title,
      due_date: dueDate,
    },
  })

  await sendPortalNotification({
    clientId,
    subject: 'New item in your Fidara client portal',
    text: portalNotificationText('a new request'),
  })

  return json(res, 200, { request })
}

async function handleUpdateRequest(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const id = normalizeText(payload.id)
  const title = normalizeText(payload.title)
  const description = normalizeOptionalText(payload.description)
  const status = normalizeText(payload.status || 'open').toLowerCase()
  const dueDate = normalizeOptionalText(payload.dueDate)

  if (!id || !title) return json(res, 400, { error: 'Request ID and title are required.' })
  if (!ALLOWED_REQUEST_STATUSES.has(status)) {
    return json(res, 400, { error: 'Request status must be open, completed, or closed.' })
  }
  if (!isValidDate(dueDate)) return json(res, 400, { error: 'Due date must use YYYY-MM-DD format.' })

  const { data: request, error } = await getSupabaseAdmin()
    .from('document_requests')
    .update({
      title,
      description,
      status,
      due_date: dueDate,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('id, client_id, title, description, status, due_date, created_at, updated_at')
    .single()

  if (error || !request) return json(res, 404, { error: 'Request not found.' })

  await recordAuditEvent({
    clientId: request.client_id,
    eventType: 'document_request_updated',
    description: `Document request updated: ${title}.`,
    actorUserId: user.id,
    metadata: {
      request_id: request.id,
      status,
      due_date: dueDate,
    },
  })

  return json(res, 200, { request })
}

async function handleCreateBillingItem(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const clientId = normalizeText(payload.clientId)
  const title = normalizeText(payload.title)
  const description = normalizeOptionalText(payload.description)
  const amountCents = asPositiveInteger(payload.amountCents)
  const currency = normalizeText(payload.currency || 'usd').toLowerCase()
  const status = normalizeText(payload.status || 'open').toLowerCase()
  const dueDate = normalizeOptionalText(payload.dueDate)
  const stripeHostedInvoiceUrl = normalizeOptionalText(payload.stripeHostedInvoiceUrl)
  const invoicePdfUrl = normalizeOptionalText(payload.invoicePdfUrl)

  if (!clientId || !title || amountCents === null) {
    return json(res, 400, { error: 'Client, title, and invoice amount are required.' })
  }
  if (!ALLOWED_BILLING_STATUSES.has(status)) {
    return json(res, 400, { error: 'Billing status must be open, paid, or overdue.' })
  }
  if (!isValidDate(dueDate)) return json(res, 400, { error: 'Due date must use YYYY-MM-DD format.' })

  const { data: billingItem, error } = await getSupabaseAdmin()
    .from('billing_items')
    .insert({
      client_id: clientId,
      title,
      description,
      amount_cents: amountCents,
      currency,
      status,
      due_date: dueDate,
      stripe_hosted_invoice_url: stripeHostedInvoiceUrl,
      invoice_pdf_url: invoicePdfUrl,
    })
    .select('id, client_id, title, description, amount_cents, currency, status, due_date, stripe_hosted_invoice_url, invoice_pdf_url, created_at')
    .single()

  if (error) throw error

  await recordAuditEvent({
    clientId,
    eventType: 'billing_item_created',
    description: 'Invoice added to portal.',
    actorUserId: user.id,
    metadata: {
      billing_item_id: billingItem.id,
      title,
      amount_cents: amountCents,
      status,
    },
  })

  await sendPortalNotification({
    clientId,
    subject: 'New item in your Fidara client portal',
    text: portalNotificationText('a new billing item'),
  })

  return json(res, 200, { billingItem })
}

async function handleUpdateBillingItem(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const id = normalizeText(payload.id)
  const title = normalizeText(payload.title)
  const description = normalizeOptionalText(payload.description)
  const amountCents = asPositiveInteger(payload.amountCents)
  const currency = normalizeText(payload.currency || 'usd').toLowerCase()
  const status = normalizeText(payload.status || 'open').toLowerCase()
  const dueDate = normalizeOptionalText(payload.dueDate)
  const stripeHostedInvoiceUrl = normalizeOptionalText(payload.stripeHostedInvoiceUrl)
  const invoicePdfUrl = normalizeOptionalText(payload.invoicePdfUrl)

  if (!id || !title || amountCents === null) {
    return json(res, 400, { error: 'Billing item ID, title, and amount are required.' })
  }
  if (!ALLOWED_BILLING_STATUSES.has(status)) {
    return json(res, 400, { error: 'Billing status must be open, paid, or overdue.' })
  }
  if (!isValidDate(dueDate)) return json(res, 400, { error: 'Due date must use YYYY-MM-DD format.' })

  const { data: billingItem, error } = await getSupabaseAdmin()
    .from('billing_items')
    .update({
      title,
      description,
      amount_cents: amountCents,
      currency,
      status,
      due_date: dueDate,
      stripe_hosted_invoice_url: stripeHostedInvoiceUrl,
      invoice_pdf_url: invoicePdfUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('id, client_id, title, description, amount_cents, currency, status, due_date, stripe_hosted_invoice_url, invoice_pdf_url, created_at, updated_at')
    .single()

  if (error || !billingItem) return json(res, 404, { error: 'Billing item not found.' })

  await recordAuditEvent({
    clientId: billingItem.client_id,
    eventType: 'billing_item_updated',
    description: `Billing item updated: ${title}.`,
    actorUserId: user.id,
    metadata: {
      billing_item_id: billingItem.id,
      amount_cents: amountCents,
      status,
    },
  })

  return json(res, 200, { billingItem })
}

async function handleCreateMessage(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const clientId = normalizeText(payload.clientId)
  const title = normalizeText(payload.title)
  const body = normalizeText(payload.body)

  if (!clientId || !title || !body) {
    return json(res, 400, { error: 'Client, title, and message body are required.' })
  }

  const { data: message, error } = await getSupabaseAdmin()
    .from('portal_messages')
    .insert({
      client_id: clientId,
      title,
      body,
      created_by: 'Fidara Group',
    })
    .select('id, client_id, title, body, created_by, created_at')
    .single()

  if (error) throw error

  await recordAuditEvent({
    clientId,
    eventType: 'portal_message_created',
    description: 'New portal message added.',
    actorUserId: user.id,
    metadata: {
      message_id: message.id,
      title,
    },
  })

  await sendPortalNotification({
    clientId,
    subject: 'New item in your Fidara client portal',
    text: portalNotificationText('a new message'),
  })

  return json(res, 200, { message })
}

async function handleArchiveMessage(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const id = normalizeText(payload.id)
  if (!id) return json(res, 400, { error: 'Message ID is required.' })

  const { data: message, error } = await getSupabaseAdmin()
    .from('portal_messages')
    .update({
      archived_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('id, client_id, title, archived_at')
    .single()

  if (error || !message) return json(res, 404, { error: 'Message not found.' })

  await recordAuditEvent({
    clientId: message.client_id,
    eventType: 'portal_message_archived',
    description: `Portal message archived: ${message.title}.`,
    actorUserId: user.id,
    metadata: {
      message_id: message.id,
    },
  })

  return json(res, 200, { message })
}

async function handleUpdateDocumentStatus(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const documentId = normalizeText(payload.documentId)
  const status = normalizeText(payload.status).toLowerCase()

  if (!documentId || !ALLOWED_DOCUMENT_STATUSES.has(status)) {
    return json(res, 400, { error: 'Document status must be received, reviewing, or completed.' })
  }

  const { data: document, error } = await getSupabaseAdmin()
    .from('documents')
    .update({ status })
    .eq('id', documentId)
    .select('id, client_id, status')
    .single()

  if (error || !document) return json(res, 404, { error: 'Document not found.' })

  await recordAuditEvent({
    clientId: document.client_id,
    eventType: 'document_status_updated',
    description: `Document marked as ${status}.`,
    actorUserId: user.id,
    metadata: {
      document_id: document.id,
      status,
    },
  })

  if (status === 'completed') {
    await sendPortalNotification({
      clientId: document.client_id,
      subject: 'New item in your Fidara client portal',
      text: [
        'Fidara Group marked a document in your client portal as completed.',
        '',
        'Please log in to review your portal activity.',
        '',
        'For your security, this email does not include private document links or attachments.',
      ].join('\n'),
    })
  }

  return json(res, 200, { document })
}

async function handleArchiveDocument(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const documentId = normalizeText(payload.documentId)
  if (!documentId) return json(res, 400, { error: 'documentId is required.' })

  const { data: document, error } = await getSupabaseAdmin()
    .from('documents')
    .update({
      archived_at: new Date().toISOString(),
      archived_by: user.id,
    })
    .eq('id', documentId)
    .is('deleted_at', null)
    .select('id, client_id, original_file_name, archived_at')
    .single()

  if (error || !document) return json(res, 404, { error: 'Document not found.' })

  await recordAuditEvent({
    clientId: document.client_id,
    eventType: 'document_archived',
    description: `Document archived: ${document.original_file_name}.`,
    actorUserId: user.id,
    metadata: {
      document_id: document.id,
    },
  })

  return json(res, 200, { document })
}

async function handleDeleteDocument(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const documentId = normalizeText(payload.documentId)
  if (!documentId || payload.confirm !== true) {
    return json(res, 400, { error: 'documentId and confirm: true are required.' })
  }

  const supabaseAdmin = getSupabaseAdmin()
  const { data: document, error } = await supabaseAdmin
    .from('documents')
    .select('id, client_id, original_file_name, storage_key, deleted_at')
    .eq('id', documentId)
    .single()

  if (error || !document) return json(res, 404, { error: 'Document not found.' })
  if (document.deleted_at) return json(res, 200, { ok: true, message: 'Document was already marked deleted.' })

  const { error: storageError } = await supabaseAdmin.storage.from(getStorageBucket()).remove([document.storage_key])
  if (storageError) {
    return json(res, 500, { error: 'Storage deletion failed. The document record was not marked deleted.' })
  }

  const { data: deletedDocument, error: updateError } = await supabaseAdmin
    .from('documents')
    .update({
      deleted_at: new Date().toISOString(),
      deleted_by: user.id,
    })
    .eq('id', documentId)
    .select('id, client_id, original_file_name, deleted_at')
    .single()

  if (updateError || !deletedDocument) throw updateError || new Error('Failed to mark document deleted.')

  await recordAuditEvent({
    clientId: deletedDocument.client_id,
    eventType: 'document_deleted',
    description: `Document file deleted from storage: ${deletedDocument.original_file_name}.`,
    actorUserId: user.id,
    metadata: {
      document_id: deletedDocument.id,
    },
  })

  return json(res, 200, { ok: true, document: deletedDocument })
}

async function handleDownloadUrl(req, res, user) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  const payload = await parseJsonBody(req, res)
  if (!payload) return

  const documentId = normalizeText(payload.documentId)
  if (!documentId) return json(res, 400, { error: 'documentId is required.' })

  const supabaseAdmin = getSupabaseAdmin()
  const bucketName = getStorageBucket()
  const { data: document, error } = await supabaseAdmin
    .from('documents')
    .select('id, client_id, storage_key, deleted_at')
    .eq('id', documentId)
    .single()

  if (error || !document) return json(res, 404, { error: 'Document not found.' })
  if (document.deleted_at) return json(res, 404, { error: 'Document not found.' })

  const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin.storage
    .from(bucketName)
    .createSignedUrl(document.storage_key, 60 * 10)

  if (signedUrlError || !signedUrlData?.signedUrl) {
    throw signedUrlError || new Error('Failed to create signed download URL.')
  }

  await recordAuditEvent({
    clientId: document.client_id,
    eventType: 'admin_document_download_requested',
    description: `Admin requested download for document ${document.id}`,
    actorUserId: user.id,
    metadata: {
      document_id: document.id,
    },
  })

  return json(res, 200, { downloadUrl: signedUrlData.signedUrl })
}

export default async function handler(req, res) {
  const action = String(req.query?.action || '').trim()

  try {
    const user = await requireAdminUser(req, res)
    if (!user) return

    switch (action) {
      case 'summary':
        return await handleSummary(req, res)
      case 'clients':
        return await handleClients(req, res)
      case 'documents':
        return await handleDocuments(req, res)
      case 'requests':
        return await handleRequests(req, res)
      case 'billing':
        return await handleBilling(req, res)
      case 'messages':
        return await handleMessages(req, res)
      case 'create-client':
        return await handleCreateClient(req, res, user)
      case 'link-client-user':
        return await handleLinkClientUser(req, res, user)
      case 'invite-client-user':
        return await handleInviteClientUser(req, res, user)
      case 'create-request':
        return await handleCreateRequest(req, res, user)
      case 'update-request':
        return await handleUpdateRequest(req, res, user)
      case 'create-billing-item':
        return await handleCreateBillingItem(req, res, user)
      case 'update-billing-item':
        return await handleUpdateBillingItem(req, res, user)
      case 'create-message':
        return await handleCreateMessage(req, res, user)
      case 'archive-message':
        return await handleArchiveMessage(req, res, user)
      case 'update-document-status':
        return await handleUpdateDocumentStatus(req, res, user)
      case 'archive-document':
        return await handleArchiveDocument(req, res, user)
      case 'delete-document':
        return await handleDeleteDocument(req, res, user)
      case 'download-url':
        return await handleDownloadUrl(req, res, user)
      default:
        return json(res, 404, { error: 'Unknown action.' })
    }
  } catch (error) {
    console.error('[admin]', error)
    return json(res, 500, { error: 'Admin request failed.' })
  }
}
