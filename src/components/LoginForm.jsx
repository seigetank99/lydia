import { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const COOLDOWN_AFTER_FAILED_ATTEMPTS = 3
const COOLDOWN_SECONDS = 30

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [, setFailedAttempts] = useState(0)
  const [cooldownSeconds, setCooldownSeconds] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!cooldownSeconds) return undefined
    const timer = window.setTimeout(() => setCooldownSeconds((current) => Math.max(0, current - 1)), 1000)
    return () => window.clearTimeout(timer)
  }, [cooldownSeconds])

  function registerFailedAttempt() {
    setFailedAttempts((current) => {
      const next = current + 1
      if (next >= COOLDOWN_AFTER_FAILED_ATTEMPTS) {
        setCooldownSeconds(COOLDOWN_SECONDS)
        return 0
      }
      return next
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (cooldownSeconds > 0) {
      setError(`Please wait ${cooldownSeconds} seconds before trying again.`)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/portal?action=login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        registerFailedAttempt()
        throw new Error(data?.error || 'Invalid email or password.')
      }

      setFailedAttempts(0)
      setCooldownSeconds(0)
      window.location.href = '/portal'
    } catch (submitError) {
      setError(submitError.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-sand p-6 ring-1 ring-cedar/10 sm:p-8">
      <div className="grid gap-5">
        <div className="space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-moss">Sign In</span>
          <h2 className="font-serif text-3xl leading-tight text-cedar">Enter your portal credentials.</h2>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-cedar">Email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-xl border border-cedar/15 bg-sand px-4 py-3 text-base text-cedar outline-none transition focus:border-cedar focus:ring-2 focus:ring-cedar/10"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-cedar">Password</span>
          <span className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-cedar/15 bg-sand px-4 py-3 pr-12 text-base text-cedar outline-none transition focus:border-cedar focus:ring-2 focus:ring-cedar/10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center text-cedar/45 transition hover:text-cedar"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
            </button>
          </span>
        </label>

        {error ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading || cooldownSeconds > 0}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-cedar px-5 py-3 text-sm font-medium text-sand ring-1 ring-cedar transition hover:bg-cedar/92 disabled:cursor-not-allowed disabled:bg-cedar/45"
        >
          {loading ? 'Signing in...' : cooldownSeconds > 0 ? `Try again in ${cooldownSeconds}s` : 'Sign in'}
        </button>

        <a href="/forgot-password" className="text-sm font-medium text-cedar/80 underline underline-offset-4 transition hover:text-cedar">
          Forgot password?
        </a>
      </div>
    </form>
  )
}
