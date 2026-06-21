import { getCurrentUser } from './_auth.js'
import { json, requireAdmin } from './_portal.js'
import { getSupabaseAdmin } from '../src/lib/supabaseAdmin.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const user = await getCurrentUser(req)
  if (!user) return json(res, 401, { error: 'Unauthorized' })

  try {
    await requireAdmin(user.id)

    const { data, error } = await getSupabaseAdmin()
      .from('documents')
      .select(
        'id, client_id, original_file_name, file_type, file_size, category, status, created_at, clients(name, business_name)',
      )
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error

    return json(res, 200, { documents: data || [] })
  } catch (error) {
    if (error.code === 'FORBIDDEN') {
      return json(res, 403, { error: 'Forbidden' })
    }

    console.error('[admin-documents-list]', error)
    return json(res, 500, { error: 'Failed to load admin documents.' })
  }
}
