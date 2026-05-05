import { Footer, Header, clientOnboardingDocuments } from '../../components/site-core.jsx'
import { PageHero, RelatedLinksSection } from '../shared-sections.jsx'

export default function ClientDocumentChecklistPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />

        <PageHero
            eyebrow="Client Document Checklist"
            title="What to prepare before working with Fidara."
            description="A practical list of records that helps onboarding, bookkeeping cleanup, tax planning, payroll support, and advisory work move faster."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {clientOnboardingDocuments.map(([title, description]) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h2 className="font-serif text-3xl leading-tight text-slate-900">{title}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{description}</p>
                </article>
            ))}
          </div>
        </section>

        <RelatedLinksSection
            title="Helpful Next Steps"
            links={[
              ['Onboarding', '/onboarding'],
              ['Client Portal', '/client-portal'],
              ['Bookkeeping Cleanup', '/practice-areas/bookkeeping-cleanup'],
              ['Tax Resources', '/tax-resources'],
              ['Contact', '/contact'],
            ]}
        />

        <Footer />
      </main>
  )
}
