import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function CaseStudiesPage() {
  const cases = [
    ['Service Business Cleanup', 'Cleaned up 18 months of books, rebuilt monthly reports, and created a reliable close process for a growing service business.'],
    ['Payroll & AP Workflow', 'Designed payroll, vendor payment, and approval workflows for a multi-location operator with growing administrative needs.'],
    ['Restaurant Cash Flow', 'Helped a food and hospitality group understand margins, vendor spend, cash timing, and sales tax responsibilities.'],
    ['U.S. Expansion Setup', 'Supported a professional services firm with U.S. accounting setup, payroll coordination, and reporting foundations.'],
  ]

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="about" />

        <PageHero
            eyebrow="Client Scenarios"
            title="Practical examples of the problems Fidara helps solve."
            description="These scenario-style examples show how accounting, tax, payroll, advisory, and systems support can work together."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
            {cases.map(([title, description], index) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                    Scenario {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight text-slate-900">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{description}</p>
                </article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
