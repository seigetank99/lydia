import { useState } from 'react'
import { Footer, Header, mailto } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />

        <PageHero
            eyebrow="Newsletter"
            title="Occasional notes on books, tax, payroll, systems, and growth."
            description="A placeholder newsletter signup page. Later, this can connect to Mailchimp, ConvertKit, HubSpot, or your own backend."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto max-w-3xl rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="Email address"
                  className="rounded-xl border border-stone-200 bg-[#f7f3eb] px-5 py-4 focus:border-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
              />
              <a
                  href={mailto(
                      'Newsletter Signup',
                      `Please add this email to the Lydia Financial newsletter: ${email}`.trim(),
                  )}
                  className={`inline-flex justify-center rounded-md px-8 py-4 text-sm font-medium transition ${
                      email
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'pointer-events-none bg-stone-200 text-stone-500'
                  }`}
              >
                Sign Up
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
  )
}
