import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero, RelatedLinksSection } from '../shared-sections.jsx'

export default function ResourceArticlePage({ article }) {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />

        <PageHero
            eyebrow={article.category}
            title={article.title}
            description={article.description}
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-5xl gap-5">
            {article.sections.map(([title, body], index) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-900">{title}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-700">{body}</p>
                </article>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 px-8 py-10">
          <div className="mx-auto flex max-w-5xl flex-wrap gap-4">
            <a href="/resources" className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white">
              All Resources
            </a>
            <a href="/contact" className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">
              Discuss with Fidara
            </a>
          </div>
        </section>

        <RelatedLinksSection
            title="More Resources"
            links={[
              ['All Resources', '/resources'],
              ['Tools & Checklists', '/tools'],
              ['Monthly Close Checklist', '/tools/monthly-close-checklist'],
              ['Tax Season Organizer', '/tools/tax-season-organizer'],
              ['Book a Consultation', '/contact'],
            ]}
        />

        <Footer />
      </main>
  )
}
