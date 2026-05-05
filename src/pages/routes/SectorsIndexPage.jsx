import { Footer, Header, IndustrySectorGrid } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function SectorsIndexPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="sectors" />

        <PageHero
            eyebrow="Sectors We Support"
            title="Accounting, advisory, and systems support for service businesses, practices, shops, and growing teams."
            description="Explore the sectors Fidara supports and the operating patterns we help make clearer."
            backgroundImage="/images/sector.png"
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <IndustrySectorGrid />
        </section>

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm max-w-6xl">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <h2 className="font-serif text-4xl leading-tight text-slate-900">
                Don’t see your sector listed?
              </h2>
              <a
                  href="/contact"
                  className="inline-flex rounded-md bg-emerald-600 px-10 py-4 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                Ask Fidara
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
  )
}
