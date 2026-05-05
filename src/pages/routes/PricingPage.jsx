import { CircleCheck } from 'lucide-react'
import { Footer, Header, SectionTitle } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

function EngagementFitSection() {
  const goodFit = [
    'You want year-round organization, not a last-minute scramble',
    'You are willing to keep documents, access, and communication organized',
    'You value clean books, clear deadlines, and practical financial guidance',
    'You want accounting, tax, payroll, advisory, and systems to work together',
  ]
  const notFit = [
    'You only want the cheapest possible filing with no ongoing relationship',
    'You need legal advice, audit opinions, or investment management',
    'You are not ready to provide records, access, or timely responses',
    'You need emergency work without time for proper review and scoping',
  ]

  return (
      <section className="border-t border-stone-200 px-8 py-12">
        <SectionTitle>ENGAGEMENT FIT</SectionTitle>
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-8 shadow-sm">
            <h3 className="font-serif text-4xl text-slate-900">Fidara may be a good fit if...</h3>
            <div className="mt-6 grid gap-4">
              {goodFit.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CircleCheck className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                    <p className="text-base leading-7 text-slate-700">{item}</p>
                  </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-stone-200 bg-white/60 p-8 shadow-sm">
            <h3 className="font-serif text-4xl text-slate-900">It may not be the right fit if...</h3>
            <div className="mt-6 grid gap-4">
              {notFit.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-slate-400" />
                    <p className="text-base leading-7 text-slate-700">{item}</p>
                  </div>
              ))}
            </div>
          </article>
        </div>
      </section>
  )
}

export default function PricingPage() {
  const tiers = [
    { name: 'Foundation', description: 'For owners who need clean books, tax readiness, and a reliable monthly financial rhythm.', bestFor: 'Simple businesses, early-stage operators, and clients who need organized records.', items: ['Monthly bookkeeping', 'Bank and card reconciliation', 'Basic reporting', 'Tax-ready record organization'] },
    { name: 'Growth', description: 'For owners who need recurring support across accounting, payroll, payables, tax planning, and cash flow.', bestFor: 'Growing teams, service businesses, practices, and multi-vendor operations.', items: ['Bookkeeping', 'Payroll coordination', 'AP management', 'Spend management', 'Advisory check-ins'] },
    { name: 'Strategic', description: 'For businesses needing deeper advisory, forecasting, systems, managed IT, and decision support.', bestFor: 'Scaling businesses, U.S. expansion clients, and owners making larger operating decisions.', items: ['CFO services', 'Forecasting', 'Managed IT Services', 'U.S. expansion', 'Owner planning'] },
  ]
  const projectTypes = [
    ['Cleanup Projects', 'For catching up or repairing prior-period books before tax, financing, or advisory work.'],
    ['Tax Planning', 'For individuals and businesses that want proactive review before deadlines arrive.'],
    ['Systems Setup', 'For accounting, payroll, document, reporting, access-control, and managed IT workflows.'],
    ['U.S. Expansion', 'For businesses entering the U.S. that need accounting, payroll, and tax-readiness coordination.'],
  ]

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />
        <PageHero eyebrow="Engagements" title="Flexible support designed around your stage, systems, and goals." description="Fidara engagements are scoped based on complexity, transaction volume, deadlines, systems, payroll needs, advisory depth, and cleanup requirements." />
        <section className="border-t border-stone-200 px-8 py-12">
          <SectionTitle>SERVICE TIERS</SectionTitle>
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {tiers.map((tier) => (
                <article key={tier.name} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h2 className="font-serif text-3xl leading-tight text-slate-900">{tier.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{tier.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-emerald-700">{tier.bestFor}</p>
                  <div className="mt-5 grid gap-3">
                    {tier.items.map((item) => (
                        <div key={item} className="flex items-start gap-3"><CircleCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-600" /><p className="text-sm leading-6 text-slate-700">{item}</p></div>
                    ))}
                  </div>
                  <a href="/contact" className="mt-8 inline-flex rounded-md border border-emerald-600 px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-emerald-700 hover:text-white">Book a Consultation</a>
                </article>
            ))}
          </div>
        </section>
        <section className="border-t border-stone-200 px-8 py-12">
          <SectionTitle>PROJECT-BASED SUPPORT</SectionTitle>
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
            {projectTypes.map(([title, description]) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm"><h3 className="font-serif text-2xl leading-tight text-slate-900">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-700">{description}</p></article>
            ))}
          </div>
        </section>
        <section className="border-t border-stone-200 px-8 py-10"><div className="mx-auto max-w-6xl rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-sm leading-7 text-amber-950">Pricing is not listed as a fixed public schedule because every engagement depends on scope, urgency, volume, systems, deadlines, payroll complexity, and advisory needs.</div></section>
        <EngagementFitSection />
        <Footer />
      </main>
  )
}
