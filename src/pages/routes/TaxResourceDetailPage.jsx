import { CircleCheck } from 'lucide-react'
import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

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

export default function TaxResourceDetailPage({ page }) {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />
        <Breadcrumbs items={[{ label: 'Tax Resources', href: '/tax-resources' }, { label: page.title }]} />

        <PageHero
            eyebrow="Tax Resource"
            title={page.title}
            description={page.description}
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">
              Book a Consultation
            </a>
            <a href="/tax-resources" className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white">
              All Tax Resources
            </a>
          </div>
        </PageHero>

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {page.sections.map(([title, items]) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h2 className="font-serif text-3xl leading-tight text-slate-900">{title}</h2>
                  <div className="mt-5 grid gap-3">
                    {items.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CircleCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                          <p className="text-sm capitalize leading-6 text-slate-700">{item}</p>
                        </div>
                    ))}
                  </div>
                </article>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 px-8 py-10">
          <div className="mx-auto max-w-6xl rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-sm leading-7 text-amber-950">
            <strong>Important:</strong> This guide is general educational information. Tax rules depend on your facts,
            location, entity type, records, and timing. Confirm your specific situation with a qualified tax professional.
          </div>
        </section>

        <Footer />
      </main>
  )
}
