import { useState } from 'react'

async function readJson(response) {
  return response.json().catch(() => ({}))
}

export default function StaffLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function logout() {
    await fetch('/api/portal?action=logout', { method: 'POST' }).catch(() => {})
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const loginResponse = await fetch('/api/portal?action=login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const loginData = await readJson(loginResponse)

      if (!loginResponse.ok) {
        throw new Error(loginData?.error || 'Unable to sign in with those credentials.')
      }

      const adminResponse = await fetch('/api/admin?action=summary', {
        headers: { accept: 'application/json' },
      })

      if (adminResponse.status === 403) {
        await logout()
        setPassword('')
        setError('This account does not have staff access.')
        return
      }

      if (adminResponse.status === 401) {
        await logout()
        setPassword('')
        setError('Please sign in again to continue.')
        return
      }

      if (!adminResponse.ok) {
        await logout()
        setPassword('')
        setError('Staff access could not be verified right now.')
        return
      }

      window.location.assign('/admin')
    } catch (submitError) {
      setError(submitError.message || 'Unable to sign in right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-800">Email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-md border border-stone-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-800">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-md border border-stone-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            required
          />
        </label>

        {error ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? 'Verifying...' : 'Sign in'}
        </button>

        <a href="/" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
          Back to home
        </a>
      </div>
    </form>
  )
}
