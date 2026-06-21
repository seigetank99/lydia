import { getCurrentUser } from './_auth.js'
import { json, requireAdmin } from './_portal.js'
import { getSupabaseAdmin } from '../src/lib/supabaseAdmin.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const user = await getCurrentUser(req)
  if (!user) return json(res, 401, { error: 'Unauthorized' })

  try {
    await requireAdmin(user.id)

    const supabaseAdmin = getSupabaseAdmin()
    const [
      { count: clientsCount, error: clientsError },
      { count: documentsCount, error: docsError },
      { count: openRequestsCount, error: requestsError },
      { data: invoiceRows, error: invoiceError },
      { data: recentActivity, error: activityError },
    ] = await Promise.all([
      supabaseAdmin.from('clients').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('documents').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('document_requests').select('id', { count: 'exact', head: true }).eq('status', 'open'),
      supabaseAdmin.from('billing_items').select('amount_cents, status'),
      supabaseAdmin
        .from('audit_events')
        .select('id, event_type, description, client_id, created_at')
        .order('created_at', { ascending: false })
        .limit(10),
    ])

    if (clientsError) throw clientsError
    if (docsError) throw docsError
    if (requestsError) throw requestsError
    if (invoiceError) throw invoiceError
    if (activityError) throw activityError

    const outstandingBalanceCents = (invoiceRows || [])
      .filter((row) => row.status === 'open' || row.status === 'overdue')
      .reduce((sum, row) => sum + (row.amount_cents || 0), 0)

    return json(res, 200, {
      stats: {
        clientsCount: clientsCount || 0,
        documentsCount: documentsCount || 0,
        openRequestsCount: openRequestsCount || 0,
        outstandingBalanceCents,
      },
      recentActivity: recentActivity || [],
    })
  } catch (error) {
    if (error.code === 'FORBIDDEN') {
      return json(res, 403, { error: 'Forbidden' })
    }

    console.error('[admin-summary]', error)
    return json(res, 500, { error: 'Failed to load admin summary.' })
  }
}
