import { CheckCircle2 } from 'lucide-react'
import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function OnboardingPage() {
  const onboardingSteps = [
    ['Discovery Call', 'We learn about your goals, systems, deadlines, and current pain points.'],
    ['Document Review', 'We review books, tax records, payroll setup, workflows, and systems.'],
    ['Support Plan', 'We define the service mix, cadence, responsibilities, and immediate priorities.'],
    ['Ongoing Rhythm', 'Monthly close, reporting, advisory, tax planning, payroll, and systems support begin.'],
  ]

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />

        <PageHero
            eyebrow="Onboarding"
            title="A clear start for a long-term financial relationship."
            description="The goal of onboarding is simple: understand what you need, organize what exists, and build the right support rhythm."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
            {onboardingSteps.map(([title, description], index) => (
                <article
                    key={title}
                    className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
                </article>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <h2 className="font-serif text-4xl leading-tight text-slate-900">
              What to prepare before we begin.
            </h2>
            <div className="grid gap-4">
              {[
                'Recent tax returns and financial statements',
                'Bank, credit card, payroll, and loan account access details',
                'Existing bookkeeping, invoicing, payroll, and payment systems',
                'Known deadlines, pain points, and goals for the next 6–12 months',
              ].map((item) => (
                  <div key={item} className="flex items-start gap-4 border-b border-stone-200 pb-4 last:border-b-0">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                    <p className="text-base leading-7 text-slate-800">{item}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
  )
}
