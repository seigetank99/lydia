import { Footer, Header, usExpansionPages } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function USExpansionPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="services" />

        <PageHero
            eyebrow="U.S. Expansion"
            title="A financial and systems foundation for entering or growing in the U.S."
            description="Fidara helps founders and businesses create the accounting, payroll, tax-readiness, and system workflows needed to operate with confidence."
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">
              Talk About Expansion
            </a>
            <a href="/us-expansion/accounting-setup" className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white">
              Explore Setup
            </a>
          </div>
        </PageHero>

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {usExpansionPages.map((page) => (
                <a
                    key={page.slug}
                    href={`/us-expansion/${page.slug}`}
                    className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <h3 className="font-serif text-2xl leading-tight text-slate-900">{page.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{page.description}</p>
                </a>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
