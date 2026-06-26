import { useEffect, useRef, useState } from 'react'
import { Footer, Header, siteConfig } from '../../components/site-core.jsx'

const serviceOptions = [
  "Not sure yet - let's talk",
  'Tax preparation & strategy',
  'Bookkeeping & accounting',
  'Fractional CFO / advisory',
  'Managed IT services',
  'Payroll support',
  'Digital marketing services',
  'M&A advisory',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    service: serviceOptions[0],
    message: '',
  })
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [startedAt] = useState(() => Date.now())
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileSiteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY
  const turnstileRef = useRef(null)
  const isReady = form.firstName && form.lastName && form.email && form.service && form.message

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return
    let mounted = true

    const renderWidget = () => {
      if (!mounted || !window.turnstile || !turnstileRef.current) return
      window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
      })
    }

    if (window.turnstile) {
      renderWidget()
      return () => {
        mounted = false
      }
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = renderWidget
    document.head.appendChild(script)

    return () => {
      mounted = false
    }
  }, [turnstileSiteKey])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!isReady || status.state === 'sending') return
    setStatus({ state: 'sending', message: '' })

    try {
      const fd = new FormData(event.currentTarget)
      const name = `${form.firstName} ${form.lastName}`.trim()
      const message = [
        form.message,
        form.businessName ? `\nBusiness name: ${form.businessName}` : '',
      ].join('')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email: form.email,
          phone: '',
          service: form.service,
          message,
          company: String(fd.get('company') || ''),
          startedAt,
          turnstileToken,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload?.error || 'Unable to submit. Please try again.')
      window.location.assign('/thank-you')
    } catch (error) {
      setStatus({ state: 'error', message: error?.message || 'Unable to submit.' })
    }
  }

  return (
    <main id="main-content" className="min-h-screen bg-sand text-cedar">
      <Header active="contact" />

      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="max-w-[18ch] text-balance font-serif text-4xl leading-tight tracking-tight text-cedar sm:text-6xl">
            Let’s make your financial life feel more organized.
          </h1>
          <p className="text-pretty mt-6 max-w-[56ch] text-base leading-relaxed text-cedar/75 sm:text-lg">
            Whether you need clean books, tax clarity, advisory support, payroll coordination, or stronger systems, the first step is a calm conversation. Tell us where things stand and what you want to feel lighter.
          </p>
        </div>
      </section>

      <section className="border-y border-cedar/10 bg-cedar/5 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-moss">Email</span>
              <a href={`mailto:${siteConfig.email}`} className="block font-serif text-xl text-cedar underline underline-offset-4">{siteConfig.email}</a>
              <p className="text-sm text-cedar/75">We reply to every inquiry within one business day.</p>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-moss">Phone</span>
              <a href={`tel:${siteConfig.phone}`} className="block font-serif text-xl text-cedar underline underline-offset-4">(516) 646-1015</a>
              <p className="text-sm text-cedar/75">Available during business hours. Voicemail is fine.</p>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-moss">Office</span>
              <p className="font-serif text-xl text-cedar">Virtual and by appointment</p>
              <p className="text-sm text-cedar/75">Serving {siteConfig.serviceArea.toLowerCase()}.</p>
            </div>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-2">
            <div className="space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-moss">Hours</span>
              <p className="text-base text-cedar/85">Monday - Friday: 9:00am - 5:00pm<br />Saturday - Sunday: Family First</p>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-moss">Availability</span>
              <p className="text-base text-cedar/85">We are accepting select new clients for bookkeeping, tax, advisory, payroll, and managed IT engagements. Discovery calls help us confirm fit, timing, and scope before any commitment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-xl px-6">
          <h2 className="mb-2 text-center font-serif text-3xl text-cedar">Send an inquiry</h2>
          <p className="mb-10 text-center text-cedar/75">Share a few details and we will respond with the next best step.</p>
          <form className="space-y-5 text-left" onSubmit={handleSubmit}>
            <label className="hidden">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className="text-xs font-semibold uppercase tracking-wider text-cedar/60">First name</span>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(event) => setForm({ ...form, firstName: event.target.value })}
                  className="mt-1.5 w-full rounded-lg border-none bg-cedar/5 p-3 text-sm ring-1 ring-cedar/10 focus:outline-none focus:ring-cedar/50"
                  placeholder="Jane"
                  required
                />
              </label>
              <label>
                <span className="text-xs font-semibold uppercase tracking-wider text-cedar/60">Last name</span>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(event) => setForm({ ...form, lastName: event.target.value })}
                  className="mt-1.5 w-full rounded-lg border-none bg-cedar/5 p-3 text-sm ring-1 ring-cedar/10 focus:outline-none focus:ring-cedar/50"
                  placeholder="Doe"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-cedar/60">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="mt-1.5 w-full rounded-lg border-none bg-cedar/5 p-3 text-sm ring-1 ring-cedar/10 focus:outline-none focus:ring-cedar/50"
                placeholder="jane@company.co"
                required
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-cedar/60">Business name</span>
              <input
                type="text"
                value={form.businessName}
                onChange={(event) => setForm({ ...form, businessName: event.target.value })}
                className="mt-1.5 w-full rounded-lg border-none bg-cedar/5 p-3 text-sm ring-1 ring-cedar/10 focus:outline-none focus:ring-cedar/50"
                placeholder="Acme Co."
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-cedar/60">How can we help?</span>
              <select
                value={form.service}
                onChange={(event) => setForm({ ...form, service: event.target.value })}
                className="mt-1.5 w-full rounded-lg border-none bg-cedar/5 p-3 text-sm ring-1 ring-cedar/10 focus:outline-none focus:ring-cedar/50"
                required
              >
                {serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-cedar/60">Message</span>
              <textarea
                rows="4"
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className="mt-1.5 w-full resize-none rounded-lg border-none bg-cedar/5 p-3 text-sm ring-1 ring-cedar/10 focus:outline-none focus:ring-cedar/50"
                placeholder="Tell us about your business, family, or organization, what feels unclear, and what kind of support you are looking for..."
                required
              />
            </label>

            {turnstileSiteKey && <div ref={turnstileRef} />}

            <button
              type="submit"
              disabled={!isReady || status.state === 'sending'}
              className="w-full rounded-lg bg-cedar py-3 text-sm font-medium text-sand ring-1 ring-cedar transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status.state === 'sending' ? 'Sending...' : 'Send inquiry'}
            </button>

            {status.state === 'error' && <p aria-live="polite" className="text-sm leading-6 text-red-700">{status.message}</p>}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
