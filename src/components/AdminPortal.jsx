import { useEffect, useMemo, useState } from 'react'

const DOCUMENT_STATUSES = ['received', 'reviewing', 'completed']
const BILLING_STATUSES = ['open', 'paid', 'overdue']

function formatDate(value) {
  if (!value) return 'No date'
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatCurrency(amountCents, currency = 'usd') {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: (currency || 'usd').toUpperCase(),
  }).format((amountCents || 0) / 100)
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return 'Unknown size'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function statusBadgeClass(status) {
  const normalized = String(status || '').toLowerCase()
  if (normalized === 'completed' || normalized === 'paid') {
    return 'border border-emerald-200 bg-emerald-50 text-emerald-700'
  }
  if (normalized === 'overdue') {
    return 'border border-rose-200 bg-rose-50 text-rose-700'
  }
  if (normalized === 'reviewing' || normalized === 'open') {
    return 'border border-amber-200 bg-amber-50 text-amber-700'
  }
  return 'border border-slate-200 bg-slate-100 text-slate-700'
}

function statusLabel(status) {
  const normalized = String(status || '').toLowerCase()
  if (!normalized) return 'Unknown'
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

async function fetchJson(url, options) {
  const response = await fetch(url, options)
  if (response.status === 401) return { unauthorized: true }
  if (response.status === 403) return { forbidden: true }

  const data = await response.json().catch(() => ({}))
  return { unauthorized: false, forbidden: false, ok: response.ok, data }
}

function StatCard({ label, value, detail, loading }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-slate-900">{loading ? '...' : value}</div>
      <div className="mt-2 text-sm text-slate-600">{loading ? 'Loading data...' : detail}</div>
    </div>
  )
}

function SectionCard({ title, subtitle, children, actions }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm leading-6 text-slate-600">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-800">{label}</span>
      {children}
    </label>
  )
}

function EmptyState({ title, body }) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-slate-50 px-5 py-8 text-center">
      <p className="text-sm font-medium text-slate-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  )
}

function FormNotice({ kind, message }) {
  if (!message) return null
  const className =
    kind === 'error'
      ? 'border border-rose-200 bg-rose-50 text-rose-700'
      : 'border border-emerald-200 bg-emerald-50 text-emerald-700'

  return <p className={`rounded-xl px-4 py-3 text-sm ${className}`}>{message}</p>
}

export default function AdminPortal() {
  const [summary, setSummary] = useState(null)
  const [documents, setDocuments] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [clients, setClients] = useState([])
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [documentsLoading, setDocumentsLoading] = useState(true)
  const [clientsLoading, setClientsLoading] = useState(true)
  const [error, setError] = useState('')
  const [forbidden, setForbidden] = useState(false)
  const [createClientForm, setCreateClientForm] = useState({ name: '', businessName: '' })
  const [linkUserForm, setLinkUserForm] = useState({ clientId: '', email: '', fullName: '' })
  const [requestForm, setRequestForm] = useState({ clientId: '', title: '', description: '', dueDate: '' })
  const [billingForm, setBillingForm] = useState({
    clientId: '',
    title: '',
    description: '',
    amountDollars: '',
    status: 'open',
    dueDate: '',
    stripeHostedInvoiceUrl: '',
    invoicePdfUrl: '',
  })
  const [messageForm, setMessageForm] = useState({ clientId: '', title: '', body: '' })
  const [busyAction, setBusyAction] = useState('')
  const [notice, setNotice] = useState({ kind: '', message: '' })

  const hasDocuments = useMemo(() => documents.length > 0, [documents])
  const hasClients = useMemo(() => clients.length > 0, [clients])

  function redirectToLogin() {
    window.location.assign('/login')
  }

  function clearNotice() {
    setNotice({ kind: '', message: '' })
  }

  async function submitAdminAction(action, body) {
    const result = await fetchJson(`/api/admin?action=${action}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (result?.unauthorized) {
      redirectToLogin()
      return null
    }

    if (result?.forbidden) {
      setForbidden(true)
      return null
    }

    if (!result?.ok) {
      throw new Error(result?.data?.error || 'Admin action failed.')
    }

    return result.data
  }

  async function loadAdmin() {
    setError('')
    const [summaryResult, documentsResult, clientsResult] = await Promise.all([
      fetchJson('/api/admin?action=summary', { headers: { accept: 'application/json' } }),
      fetchJson('/api/admin?action=documents', { headers: { accept: 'application/json' } }),
      fetchJson('/api/admin?action=clients', { headers: { accept: 'application/json' } }),
    ])

    if (summaryResult?.unauthorized || documentsResult?.unauthorized || clientsResult?.unauthorized) {
      redirectToLogin()
      return
    }

    if (summaryResult?.forbidden || documentsResult?.forbidden || clientsResult?.forbidden) {
      setForbidden(true)
      return
    }

    if (!summaryResult?.ok || !documentsResult?.ok || !clientsResult?.ok) {
      throw new Error('Unable to load the admin dashboard right now.')
    }

    setSummary(summaryResult.data?.stats || null)
    setRecentActivity(Array.isArray(summaryResult.data?.recentActivity) ? summaryResult.data.recentActivity : [])
    setDocuments(Array.isArray(documentsResult.data?.documents) ? documentsResult.data.documents : [])
    setClients(Array.isArray(clientsResult.data?.clients) ? clientsResult.data.clients : [])
  }

  useEffect(() => {
    let cancelled = false

    async function initialize() {
      try {
        await loadAdmin()
      } catch (loadError) {
        if (!cancelled) setError(loadError.message || 'Unable to load the admin dashboard right now.')
      } finally {
        if (!cancelled) {
          setSummaryLoading(false)
          setDocumentsLoading(false)
          setClientsLoading(false)
        }
      }
    }

    void initialize()

    return () => {
      cancelled = true
    }
  }, [])

  async function refreshAdminData() {
    setSummaryLoading(true)
    setDocumentsLoading(true)
    setClientsLoading(true)
    try {
      await loadAdmin()
    } catch (refreshError) {
      setError(refreshError.message || 'Unable to refresh the admin dashboard right now.')
    } finally {
      setSummaryLoading(false)
      setDocumentsLoading(false)
      setClientsLoading(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/portal?action=logout', { method: 'POST' }).catch(() => {})
    redirectToLogin()
  }

  async function handleDownload(documentId) {
    try {
      clearNotice()
      const result = await submitAdminAction('download-url', { documentId })
      if (!result) return
      window.open(result.downloadUrl, '_blank', 'noopener,noreferrer')
      await refreshAdminData()
    } catch (downloadError) {
      setError(downloadError.message || 'Download is not available right now.')
    }
  }

  async function handleCreateClient(event) {
    event.preventDefault()
    setBusyAction('create-client')
    clearNotice()

    try {
      const result = await submitAdminAction('create-client', createClientForm)
      if (!result) return
      setCreateClientForm({ name: '', businessName: '' })
      setNotice({ kind: 'success', message: 'Client created successfully.' })
      await refreshAdminData()
    } catch (submitError) {
      setNotice({ kind: 'error', message: submitError.message || 'Unable to create the client.' })
    } finally {
      setBusyAction('')
    }
  }

  async function handleLinkUser(event) {
    event.preventDefault()
    setBusyAction('link-client-user')
    clearNotice()

    try {
      const result = await submitAdminAction('link-client-user', linkUserForm)
      if (!result) return
      setLinkUserForm({ clientId: '', email: '', fullName: '' })
      setNotice({ kind: 'success', message: result.message || 'Client user linked successfully.' })
      await refreshAdminData()
    } catch (submitError) {
      setNotice({ kind: 'error', message: submitError.message || 'Unable to link this user.' })
    } finally {
      setBusyAction('')
    }
  }

  async function handleCreateRequest(event) {
    event.preventDefault()
    setBusyAction('create-request')
    clearNotice()

    try {
      const result = await submitAdminAction('create-request', requestForm)
      if (!result) return
      setRequestForm({ clientId: '', title: '', description: '', dueDate: '' })
      setNotice({ kind: 'success', message: 'Document request added to the portal.' })
      await refreshAdminData()
    } catch (submitError) {
      setNotice({ kind: 'error', message: submitError.message || 'Unable to create the request.' })
    } finally {
      setBusyAction('')
    }
  }

  async function handleCreateBillingItem(event) {
    event.preventDefault()
    setBusyAction('create-billing-item')
    clearNotice()

    try {
      const amountDollars = Number(billingForm.amountDollars || 0)
      const amountCents = Number.isFinite(amountDollars) ? Math.round(amountDollars * 100) : null
      const result = await submitAdminAction('create-billing-item', {
        ...billingForm,
        amountCents,
        currency: 'usd',
      })
      if (!result) return
      setBillingForm({
        clientId: '',
        title: '',
        description: '',
        amountDollars: '',
        status: 'open',
        dueDate: '',
        stripeHostedInvoiceUrl: '',
        invoicePdfUrl: '',
      })
      setNotice({ kind: 'success', message: 'Billing item created successfully.' })
      await refreshAdminData()
    } catch (submitError) {
      setNotice({ kind: 'error', message: submitError.message || 'Unable to create the billing item.' })
    } finally {
      setBusyAction('')
    }
  }

  async function handleCreateMessage(event) {
    event.preventDefault()
    setBusyAction('create-message')
    clearNotice()

    try {
      const result = await submitAdminAction('create-message', messageForm)
      if (!result) return
      setMessageForm({ clientId: '', title: '', body: '' })
      setNotice({ kind: 'success', message: 'Portal message sent successfully.' })
      await refreshAdminData()
    } catch (submitError) {
      setNotice({ kind: 'error', message: submitError.message || 'Unable to send the portal message.' })
    } finally {
      setBusyAction('')
    }
  }

  async function handleUpdateDocumentStatus(documentId, status) {
    setBusyAction(`document-${documentId}-${status}`)
    clearNotice()

    try {
      const result = await submitAdminAction('update-document-status', { documentId, status })
      if (!result) return
      setNotice({ kind: 'success', message: `Document marked as ${status}.` })
      await refreshAdminData()
    } catch (submitError) {
      setNotice({ kind: 'error', message: submitError.message || 'Unable to update the document status.' })
    } finally {
      setBusyAction('')
    }
  }

  if (forbidden) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-6 text-sm text-amber-800 shadow-sm">
        This account does not have admin access.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-stone-200 bg-gradient-to-br from-white via-slate-50 to-stone-100 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex min-h-9 items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-700">
              Admin dashboard
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Fidara Admin Portal</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Manage clients, documents, billing, and requests from one operations dashboard.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/portal"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-stone-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-stone-400 hover:text-slate-900"
            >
              Back to client portal
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-stone-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-stone-400 hover:text-slate-900"
            >
              Log out
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Clients" value={summary?.clientsCount ?? 0} detail="Managed client accounts" loading={summaryLoading} />
        <StatCard label="Documents Uploaded" value={summary?.documentsCount ?? 0} detail="Files stored in the portal" loading={summaryLoading} />
        <StatCard label="Open Requests" value={summary?.openRequestsCount ?? 0} detail="Client follow-ups still outstanding" loading={summaryLoading} />
        <StatCard label="Outstanding Balance" value={formatCurrency(summary?.outstandingBalanceCents || 0)} detail={`${summary?.openInvoicesCount ?? 0} open invoice${summary?.openInvoicesCount === 1 ? '' : 's'}`} loading={summaryLoading} />
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          We hit a problem loading part of the admin dashboard. Refresh and try again.
        </div>
      ) : null}

      <FormNotice kind={notice.kind} message={notice.message} />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.7fr)_340px]">
        <div className="space-y-8">
          <SectionCard title="Recent Documents" subtitle="Review client uploads, download secure copies, and update processing status.">
            {documentsLoading ? (
              <p className="text-sm text-slate-600">Loading recent client documents...</p>
            ) : hasDocuments ? (
              <div className="space-y-3">
                {documents.map((document) => (
                  <div key={document.id} className="rounded-2xl border border-stone-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-medium text-slate-900">{document.original_file_name}</p>
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClass(document.status)}`}>
                            {statusLabel(document.status)}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                          <span>{document.client_name}</span>
                          <span>{document.category || 'general'}</span>
                          <span>{formatDate(document.created_at)}</span>
                          <span>{formatFileSize(document.file_size)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {DOCUMENT_STATUSES.map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => handleUpdateDocumentStatus(document.id, status)}
                            disabled={busyAction === `document-${document.id}-${status}` || document.status === status}
                            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-700 transition hover:border-stone-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {busyAction === `document-${document.id}-${status}` ? 'Saving...' : status}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleDownload(document.id)}
                          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No documents found" body="Client uploads will appear here as soon as records start coming into the portal." />
            )}
          </SectionCard>

          <SectionCard title="Clients" subtitle="Create client accounts and link existing Supabase Auth users to portal access.">
            {clientsLoading ? (
              <p className="text-sm text-slate-600">Loading clients...</p>
            ) : (
              <div className="space-y-6">
                {hasClients ? (
                  <div className="space-y-3">
                    {clients.map((client) => (
                      <div key={client.id} className="rounded-2xl border border-stone-200 bg-slate-50 p-4">
                        <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{client.business_name || client.name}</p>
                            <p className="mt-1 text-sm text-slate-600">{client.name}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">Created {formatDate(client.created_at)}</p>
                          </div>
                          <div className="text-sm text-slate-600">
                            {client.linked_users?.length ? `${client.linked_users.length} linked user${client.linked_users.length === 1 ? '' : 's'}` : 'No linked users'}
                          </div>
                        </div>
                        {client.linked_users?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {client.linked_users.map((linkedUser) => (
                              <span key={`${client.id}-${linkedUser.user_id}`} className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-slate-600">
                                {linkedUser.full_name || linkedUser.email}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState title="No clients yet" body="Create your first client below, then link an existing Supabase Auth user to portal access." />
                )}

                <div className="grid gap-6 lg:grid-cols-2">
                  <form onSubmit={handleCreateClient} className="grid gap-4 rounded-2xl border border-stone-200 bg-white p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">Create client</h3>
                    <Field label="Name">
                      <input
                        value={createClientForm.name}
                        onChange={(event) => setCreateClientForm((current) => ({ ...current, name: event.target.value }))}
                        className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        required
                      />
                    </Field>
                    <Field label="Business name">
                      <input
                        value={createClientForm.businessName}
                        onChange={(event) => setCreateClientForm((current) => ({ ...current, businessName: event.target.value }))}
                        className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      />
                    </Field>
                    <button
                      type="submit"
                      disabled={busyAction === 'create-client'}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
                    >
                      {busyAction === 'create-client' ? 'Creating...' : 'Create client'}
                    </button>
                  </form>

                  <form onSubmit={handleLinkUser} className="grid gap-4 rounded-2xl border border-stone-200 bg-white p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">Link client user</h3>
                    <Field label="Client">
                      <select
                        value={linkUserForm.clientId}
                        onChange={(event) => setLinkUserForm((current) => ({ ...current, clientId: event.target.value }))}
                        className="min-h-11 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        required
                      >
                        <option value="">Select client</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.business_name || client.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        value={linkUserForm.email}
                        onChange={(event) => setLinkUserForm((current) => ({ ...current, email: event.target.value }))}
                        className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        required
                      />
                    </Field>
                    <Field label="Full name">
                      <input
                        value={linkUserForm.fullName}
                        onChange={(event) => setLinkUserForm((current) => ({ ...current, fullName: event.target.value }))}
                        className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      />
                    </Field>
                    <button
                      type="submit"
                      disabled={busyAction === 'link-client-user'}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {busyAction === 'link-client-user' ? 'Linking...' : 'Link user'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Create Request" subtitle="Add a new missing-item request that clients will see immediately in their portal.">
            <form onSubmit={handleCreateRequest} className="grid gap-4 lg:grid-cols-2">
              <Field label="Client">
                <select
                  value={requestForm.clientId}
                  onChange={(event) => setRequestForm((current) => ({ ...current, clientId: event.target.value }))}
                  className="min-h-11 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  required
                >
                  <option value="">Select client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.business_name || client.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Due date">
                <input
                  type="date"
                  value={requestForm.dueDate}
                  onChange={(event) => setRequestForm((current) => ({ ...current, dueDate: event.target.value }))}
                  className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </Field>
              <div className="lg:col-span-2">
                <Field label="Request title">
                  <input
                    value={requestForm.title}
                    onChange={(event) => setRequestForm((current) => ({ ...current, title: event.target.value }))}
                    className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </Field>
              </div>
              <div className="lg:col-span-2">
                <Field label="Description">
                  <textarea
                    value={requestForm.description}
                    onChange={(event) => setRequestForm((current) => ({ ...current, description: event.target.value }))}
                    className="min-h-28 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </Field>
              </div>
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  disabled={busyAction === 'create-request'}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
                >
                  {busyAction === 'create-request' ? 'Saving...' : 'Create request'}
                </button>
              </div>
            </form>
          </SectionCard>

          <SectionCard title="Create Billing Item" subtitle="Store invoice records and hosted Stripe invoice URLs. No card handling happens inside the portal.">
            <form onSubmit={handleCreateBillingItem} className="grid gap-4 lg:grid-cols-2">
              <Field label="Client">
                <select
                  value={billingForm.clientId}
                  onChange={(event) => setBillingForm((current) => ({ ...current, clientId: event.target.value }))}
                  className="min-h-11 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  required
                >
                  <option value="">Select client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.business_name || client.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <select
                  value={billingForm.status}
                  onChange={(event) => setBillingForm((current) => ({ ...current, status: event.target.value }))}
                  className="min-h-11 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                >
                  {BILLING_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {statusLabel(status)}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="lg:col-span-2">
                <Field label="Title">
                  <input
                    value={billingForm.title}
                    onChange={(event) => setBillingForm((current) => ({ ...current, title: event.target.value }))}
                    className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </Field>
              </div>
              <div className="lg:col-span-2">
                <Field label="Description">
                  <textarea
                    value={billingForm.description}
                    onChange={(event) => setBillingForm((current) => ({ ...current, description: event.target.value }))}
                    className="min-h-28 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </Field>
              </div>
              <Field label="Amount in dollars">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={billingForm.amountDollars}
                  onChange={(event) => setBillingForm((current) => ({ ...current, amountDollars: event.target.value }))}
                  className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </Field>
              <Field label="Due date">
                <input
                  type="date"
                  value={billingForm.dueDate}
                  onChange={(event) => setBillingForm((current) => ({ ...current, dueDate: event.target.value }))}
                  className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </Field>
              <div className="lg:col-span-2">
                <Field label="Stripe hosted invoice URL">
                  <input
                    type="url"
                    value={billingForm.stripeHostedInvoiceUrl}
                    onChange={(event) => setBillingForm((current) => ({ ...current, stripeHostedInvoiceUrl: event.target.value }))}
                    className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </Field>
              </div>
              <div className="lg:col-span-2">
                <Field label="Invoice PDF URL">
                  <input
                    type="url"
                    value={billingForm.invoicePdfUrl}
                    onChange={(event) => setBillingForm((current) => ({ ...current, invoicePdfUrl: event.target.value }))}
                    className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </Field>
              </div>
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  disabled={busyAction === 'create-billing-item'}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {busyAction === 'create-billing-item' ? 'Saving...' : 'Create billing item'}
                </button>
              </div>
            </form>
          </SectionCard>

          <SectionCard title="Send Message" subtitle="Add a portal message that clients can read inside their dashboard.">
            <form onSubmit={handleCreateMessage} className="grid gap-4">
              <Field label="Client">
                <select
                  value={messageForm.clientId}
                  onChange={(event) => setMessageForm((current) => ({ ...current, clientId: event.target.value }))}
                  className="min-h-11 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  required
                >
                  <option value="">Select client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.business_name || client.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Title">
                <input
                  value={messageForm.title}
                  onChange={(event) => setMessageForm((current) => ({ ...current, title: event.target.value }))}
                  className="min-h-11 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </Field>
              <Field label="Message body">
                <textarea
                  value={messageForm.body}
                  onChange={(event) => setMessageForm((current) => ({ ...current, body: event.target.value }))}
                  className="min-h-32 rounded-xl border border-stone-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </Field>
              <button
                type="submit"
                disabled={busyAction === 'create-message'}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
              >
                {busyAction === 'create-message' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <SectionCard title="Recent activity" subtitle="Latest admin and client actions captured in the audit log.">
            {summaryLoading ? (
              <p className="text-sm text-slate-600">Loading recent activity...</p>
            ) : recentActivity.length ? (
              <div className="space-y-3">
                {recentActivity.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-stone-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-medium text-slate-900">{event.description}</p>
                      <span className="text-xs uppercase tracking-[0.12em] text-slate-500">{formatDate(event.created_at)}</span>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-slate-500">{event.event_type}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No recent activity" body="Audit events will appear here as admins and clients interact with the portal." />
            )}
          </SectionCard>

          <SectionCard title="Billing workflow">
            <ul className="space-y-3 text-sm leading-6 text-slate-600">
              <li>Create invoices in Stripe.</li>
              <li>Copy the hosted invoice URL into the billing form.</li>
              <li>Optionally add the invoice PDF URL for download.</li>
              <li>Clients click Pay Invoice and complete payment on Stripe-hosted pages.</li>
            </ul>
          </SectionCard>

          <SectionCard title="Operations notes">
            <ul className="space-y-3 text-sm leading-6 text-slate-600">
              <li>Auth users must already exist in Supabase Auth before they can be linked to a client.</li>
              <li>Client uploads and downloads continue to use private Supabase Storage with time-limited signed URLs.</li>
              <li>No card data is stored in the Fidara portal.</li>
            </ul>
          </SectionCard>
        </aside>
      </div>
    </div>
  )
}
