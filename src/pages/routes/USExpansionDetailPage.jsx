import { CheckCircle2 } from 'lucide-react'
import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function USExpansionDetailPage({ page }) {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="services" />

        <PageHero
            eyebrow="U.S. Expansion"
            title={page.title}
            description={page.description}
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">
              Start the Conversation
            </a>
            <a href="/us-expansion" className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white">
              All U.S. Expansion
            </a>
          </div>
        </PageHero>

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-5xl gap-4">
            {page.points.map((point) => (
                <div key={point} className="flex items-start gap-4 border-b border-stone-200 pb-4 last:border-b-0">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <p className="text-base leading-7 text-slate-800">{point}</p>
                </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
