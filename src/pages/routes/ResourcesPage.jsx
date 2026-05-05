import { ArrowRight } from 'lucide-react'
import { Footer, Header, resourceArticles } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function ResourcesPage() {
  const resources = resourceArticles

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />

        <PageHero
            eyebrow="Resources"
            title="Plain-English guides for cleaner books, better systems, and stronger decisions."
            description="Use these as placeholder articles now. Later, each card can become a full blog post or downloadable checklist."
            backgroundImage="/images/resource.png"
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
            {resources.map((resource) => (
                <article
                    key={resource.title}
                    className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <p className="mb-4 text-xs uppercase tracking-[0.25em] text-emerald-700">
                    {resource.category}
                  </p>
                  <h3 className="font-serif text-3xl leading-tight text-slate-900">
                    {resource.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {resource.description}
                  </p>
                  <a
                      href={`/resources/${resource.slug || resource.title.toLowerCase().replaceAll(' ', '-')}`}
                      className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-emerald-700"
                  >
                    Read guide <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
