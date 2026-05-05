import { useEffect, useRef, useState } from 'react'
import { Footer, Header, services, siteConfig } from '../../components/site-core.jsx'
import { FAQSection, PageHero, SectionTitle } from '../shared-sections.jsx'

function WhatHappensNextSection() {
  const steps = [
    ['Submit the inquiry', 'Tell us what you need help with, what feels urgent, and what outcome you want.'],
    ['We review the situation', 'We look at the service area, timing, complexity, and whether Fidara is the right fit.'],
    ['Discovery conversation', 'If there is fit, we schedule a conversation to understand the details and next steps.'],
    ['Scope the engagement', 'We define responsibilities, timing, systems, documents, and the level of support needed.'],
  ]

  return (
      <section className="border-t border-stone-200 px-8 py-12">
        <SectionTitle>WHAT HAPPENS NEXT</SectionTitle>
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
          {steps.map(([title, description], index) => (
              <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-serif text-2xl text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
              </article>
          ))}
        </div>
      </section>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [startedAt] = useState(() => Date.now())
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY
  const turnstileRef = useRef(null)
  const isReady = form.name && form.email && form.service && form.message

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

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="contact" />
        <PageHero
            eyebrow="Contact Fidara"
            title="Start with a conversation."
            description="Tell us where you are, what needs attention, and what kind of support would make life or business feel more organized."
            backgroundImage="/images/contact.png"
        />
        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-10 rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="font-serif text-4xl leading-tight text-slate-900">Secure today with trust,<br />pursue tomorrow with peace.</h2>
              <p className="mt-5 text-base leading-8 text-slate-700">Tell us what you need help with and we’ll use your message to decide the best next step.</p>
              <div className="mt-6 grid gap-3 text-sm text-slate-700">
                <p>Email: {siteConfig.email}</p>
                <p>Response time: usually within {siteConfig.responseTime}</p>
              </div>
            </div>
            <form className="grid gap-4" onSubmit={async (event) => {
              event.preventDefault()
              if (!isReady || status.state === 'sending') return
              setStatus({ state: 'sending', message: '' })
              try {
                const fd = new FormData(event.currentTarget)
                const payload = {
                  ...form,
                  company: String(fd.get('company') || ''),
                  startedAt,
                  turnstileToken,
                }
                const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(payload),
                })
                const respPayload = await response.json().catch(() => ({}))
                if (!response.ok) throw new Error(respPayload?.error || 'Unable to submit. Please try again.')
                setStatus({ state: 'success', message: 'Message sent. We will reply shortly.' })
                setForm({ name: '', email: '', service: '', message: '' })
              } catch (err) {
                setStatus({ state: 'error', message: err?.message || 'Unable to submit.' })
              }
            }}>
              <label className="hidden">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
              <label className="grid gap-2 text-sm text-slate-700">Name
                <input name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Name" required className="rounded-xl border border-stone-200 bg-[#f7f3eb] px-5 py-4 focus:border-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30" />
              </label>
              <label className="grid gap-2 text-sm text-slate-700">Email
                <input name="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" type="email" required className="rounded-xl border border-stone-200 bg-[#f7f3eb] px-5 py-4 focus:border-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30" />
              </label>
              <label className="grid gap-2 text-sm text-slate-700">Service interest
                <select name="service" value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })} required className="rounded-xl border border-stone-200 bg-[#f7f3eb] px-5 py-4 focus:border-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30">
                  <option value="">What do you need help with?</option>
                  {services.map((service) => (<option key={service.slug} value={service.title}>{service.title}</option>))}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-slate-700">Message
                <textarea name="message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell us a little about your situation." rows="6" required className="resize-none rounded-xl border border-stone-200 bg-[#f7f3eb] px-5 py-4 focus:border-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30" />
              </label>
              <button type="submit" disabled={!isReady || status.state === 'sending'} className={`inline-flex justify-center rounded-md px-8 py-4 text-sm font-medium transition ${isReady ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'cursor-not-allowed bg-stone-200 text-stone-500'}`}>{status.state === 'sending' ? 'Sending...' : 'Submit Request'}</button>
              {turnstileSiteKey && <div ref={turnstileRef} />}
              {status.state === 'success' && <p aria-live="polite" className="text-sm leading-6 text-emerald-800">{status.message}</p>}
              {status.state === 'error' && <p aria-live="polite" className="text-sm leading-6 text-red-700">{status.message}</p>}
              <p className="text-xs leading-6 text-slate-500">By submitting, you agree that Fidara may contact you about your inquiry.</p>
            </form>
          </div>
        </section>
        <section className="border-t border-stone-200 px-8 py-12">
          <SectionTitle>WHAT TO INCLUDE IN YOUR MESSAGE</SectionTitle>
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
            {[
              ['Your situation', 'Tell us whether you need tax, bookkeeping, cleanup, payroll, advisory, U.S. expansion, or managed IT support.'],
              ['Timing', 'Let us know if there are upcoming deadlines, notices, filing needs, payroll dates, or urgent cleanup issues.'],
              ['Current systems', 'Mention any accounting, payroll, banking, document, or business systems already in use.'],
              ['Desired outcome', 'Tell us what would make the financial side feel more organized, clear, or manageable.'],
            ].map(([title, description]) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h3 className="font-serif text-2xl leading-tight text-slate-900">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{description}</p>
                </article>
            ))}
          </div>
        </section>
        <WhatHappensNextSection />
        <FAQSection />
        <Footer />
      </main>
  )
}
