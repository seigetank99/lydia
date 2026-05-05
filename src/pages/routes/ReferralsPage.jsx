import { Footer, Header, mailto } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function ReferralsPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="contact" />

        <PageHero
            eyebrow="Referrals"
            title="Know someone who needs financial clarity?"
            description="Refer a founder, family, operator, or growing business that could benefit from calmer books, better systems, and year-round guidance."
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <a
                href={mailto('Referral for Fidara')}
                className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Send a Referral
            </a>
            <a href="/who-we-help" className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white">
              Who We Help
            </a>
          </div>
        </PageHero>

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {[
              ['Step 1', 'Tell us who you are referring and what they need help with.'],
              ['Step 2', 'We start with a calm discovery conversation.'],
              ['Step 3', 'If there is fit, we build a support plan around their goals.'],
            ].map(([title, description]) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h3 className="font-serif text-3xl text-slate-900">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{description}</p>
                </article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
