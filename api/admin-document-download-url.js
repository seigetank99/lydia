import { getCurrentUser } from './_auth.js'
import { getStorageBucket, json, recordAuditEvent, requireAdmin } from './_portal.js'
import { getSupabaseAdmin } from '../src/lib/supabaseAdmin.js'

function parseBody(body) {
  if (!body) return {}
  if (typeof body === 'string') return JSON.parse(body)
  return body
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  const user = await getCurrentUser(req)
  if (!user) return json(res, 401, { error: 'Unauthorized' })

  let payload
  try {
    payload = parseBody(req.body)
  } catch {
    return json(res, 400, { error: 'Invalid JSON body.' })
  }

  const documentId = String(payload?.documentId || '').trim()
  if (!documentId) return json(res, 400, { error: 'documentId is required.' })

  try {
    await requireAdmin(user.id)

    const supabaseAdmin = getSupabaseAdmin()
    const bucketName = getStorageBucket()
    const { data: document, error } = await supabaseAdmin
      .from('documents')
      .select('id, client_id, storage_key')
      .eq('id', documentId)
      .single()

    if (error || !document) return json(res, 404, { error: 'Document not found.' })

    const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin.storage
      .from(bucketName)
      .createSignedUrl(document.storage_key, 60 * 10)

    if (signedUrlError || !signedUrlData?.signedUrl) {
      throw signedUrlError || new Error('Failed to create signed download URL.')
    }

    void recordAuditEvent({
      clientId: document.client_id,
      eventType: 'admin_document_download_requested',
      description: `Admin requested download for document ${document.id}`,
      actorUserId: user.id,
      metadata: {
        document_id: document.id,
      },
    })

    return json(res, 200, { downloadUrl: signedUrlData.signedUrl })
  } catch (error) {
    if (error.code === 'FORBIDDEN') {
      return json(res, 403, { error: 'Forbidden' })
    }

    console.error('[admin-document-download-url]', error)
    return json(res, 500, { error: 'Failed to create admin download URL.' })
  }
}
