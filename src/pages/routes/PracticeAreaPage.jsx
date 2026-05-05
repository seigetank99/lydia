import { CircleCheck } from 'lucide-react'
import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero, RelatedLinksSection } from '../shared-sections.jsx'

function Breadcrumbs({ items = [] }) {
  if (!items.length) return null

  return (
      <nav className="mx-auto max-w-7xl px-8 pt-4 text-xs text-slate-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <a href="/" className="transition hover:text-emerald-700">
              Home
            </a>
          </li>

          {items.map((item, index) => (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                <span>/</span>
                {item.href ? (
                    <a href={item.href} className="transition hover:text-emerald-700">
                      {item.label}
                    </a>
                ) : (
                    <span className="text-slate-700">{item.label}</span>
                )}
              </li>
          ))}
        </ol>
      </nav>
  )
}

export default function PracticeAreaPage({ page }) {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="services" />
        <Breadcrumbs items={[{ label: 'Practice Areas', href: '/practice-areas' }, { label: page.title }]} />

        <PageHero
            eyebrow={page.eyebrow}
            title={page.title}
            description={page.hero}
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">
              Book a Consultation
            </a>
            <a href="/practice-areas" className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white">
              All Practice Areas
            </a>
          </div>
        </PageHero>

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {page.sections.map(([title, content]) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h2 className="font-serif text-3xl leading-tight text-slate-900">{title}</h2>
                  {Array.isArray(content) ? (
                      <div className="mt-5 grid gap-3">
                        {content.map((item) => (
                            <div key={item} className="flex items-start gap-3">
                              <CircleCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                              <p className="text-sm leading-6 text-slate-700">{item}</p>
                            </div>
                        ))}
                      </div>
                  ) : (
                      <p className="mt-5 text-sm leading-7 text-slate-700">{content}</p>
                  )}
                </article>
            ))}
          </div>
        </section>

        <RelatedLinksSection
            title="Related Pages"
            links={[
              ...page.related,
              ['Pricing', '/pricing'],
              ['Contact', '/contact'],
            ]}
        />

        <Footer />
      </main>
  )
}
