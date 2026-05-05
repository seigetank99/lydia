import { ArrowRight } from 'lucide-react'
import { Footer, Header, practiceAreaPages } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function PracticeAreasPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="services" />

        <PageHero
            eyebrow="Practice Areas"
            title="Accounting and tax support for the situations clients ask about most."
            description="Explore common CPA-firm style practice areas, from personal tax questions and small business accounting to cleanup projects, tax planning, notices, and new business setup."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {practiceAreaPages.map((page) => (
                <a
                    key={page.slug}
                    href={`/practice-areas/${page.slug}`}
                    className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                    {page.eyebrow}
                  </p>
                  <h2 className="font-serif text-3xl leading-tight text-slate-900">
                    {page.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {page.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-emerald-700">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
