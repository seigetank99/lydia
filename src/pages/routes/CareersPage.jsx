import { Footer, Header, mailto } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function CareersPage() {
  const roles = [
    ['Bookkeeping & Accounting', 'Monthly bookkeeping, reconciliations, reporting workflows, and quality control for growing client accounts.'],
    ['Tax Preparation & Planning', 'Individual and small business tax workflow support, document organization, planning prep, and filing readiness.'],
    ['Payroll & Operations', 'Payroll process execution, onboarding support, recurring review, and operational process coordination.'],
    ['Advisory & Systems', 'Owner advisory support, KPI reporting, workflow optimization, technology process design, and managed IT coordination.'],
  ]

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="about" />

        <PageHero
            eyebrow="Careers"
            title="Build thoughtful financial systems with Fidara."
            description="We are always interested in thoughtful accounting, tax, advisory, operations, and technology professionals."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {roles.map(([title, description]) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h3 className="font-serif text-2xl leading-tight text-slate-900">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{description}</p>
                </article>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 px-8 py-10">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
            <h2 className="font-serif text-4xl leading-tight text-slate-900">
              Interested in future opportunities?
            </h2>
            <a
                href={mailto('Careers at Fidara')}
                className="inline-flex rounded-md bg-emerald-600 px-10 py-4 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Introduce Yourself
            </a>
          </div>
        </section>

        <Footer />
      </main>
  )
}
