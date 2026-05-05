import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function ComplianceLanguagePage() {
  const sections = [
    ['CPA / License Language', 'Only state that Fidara is a CPA firm or offers CPA services if licensing and registration are complete and accurate. Until then, use broader language such as accounting, tax-readiness, advisory, and financial operations support.'],
    ['Tax Advice Language', 'Educational tax content should clearly state that it is general information and not tax advice for a specific person or business.'],
    ['Managed IT Language', 'Avoid guaranteeing security outcomes. Use language around cybersecurity basics, access controls, backup planning, workflows, and support coordination.'],
    ['Wealth Language', 'Avoid investment management or financial planning claims unless the proper licenses, registrations, and engagement terms are in place.'],
    ['Testimonials and Claims', 'Use real testimonials only with permission. If using anonymous scenarios, label them as scenarios or examples.'],
  ]

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />
        <PageHero
            eyebrow="Compliance Language"
            title="A plain-English guide for keeping website claims careful."
            description="Use this internal page to review regulated language before launch. It is not legal advice, but it flags the areas that should be checked carefully."
        />
        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5">
            {sections.map(([title, description]) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h2 className="font-serif text-3xl leading-tight text-slate-900">{title}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-700">{description}</p>
                </article>
            ))}
          </div>
        </section>
        <Footer />
      </main>
  )
}
