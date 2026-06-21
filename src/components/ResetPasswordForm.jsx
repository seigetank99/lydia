import { useEffect, useState } from 'react'
import { getSupabaseBrowser } from '../lib/supabaseBrowser.js'

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    let cancelled = false

    async function prepareSession() {
      try {
        const supabase = getSupabaseBrowser()
        const code = new URLSearchParams(window.location.search).get('code')
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
          if (exchangeError) throw exchangeError
          window.history.replaceState({}, document.title, '/reset-password')
        } else if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
          if (sessionError) throw sessionError
          window.history.replaceState({}, document.title, '/reset-password')
        }

        if (!cancelled) setReady(true)
      } catch (sessionError) {
        if (!cancelled) {
          setError(sessionError.message || 'This reset link is invalid or has expired.')
          setReady(true)
        }
      }
    }

    void prepareSession()
    return () => {
      cancelled = true
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters.')
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.')
      }

      const supabase = getSupabaseBrowser()
      const { error: updateError } = await supabase.auth.updateUser({ password })

      if (updateError) throw updateError
      setPassword('')
      setConfirmPassword('')
      setSuccess('Your password has been updated. You can now sign in.')
    } catch (submitError) {
      setError(submitError.message || 'Unable to update your password right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-800">New password</span>
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-md border border-stone-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            minLength={8}
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-800">Confirm password</span>
          <input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="rounded-md border border-stone-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            minLength={8}
            required
          />
        </label>

        {success ? (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}{' '}
            <a href="/login" className="font-medium underline">
              Go to login.
            </a>
          </p>
        ) : null}

        {error ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading || !ready}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
        >
          {loading ? 'Updating...' : 'Update password'}
        </button>
      </div>
    </form>
  )
}
