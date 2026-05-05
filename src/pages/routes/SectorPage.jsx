import { CheckCircle2 } from 'lucide-react'
import { Footer, Header, IconGrid, SectionTitle, ServiceCard, services } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function SectorPage({ sector }) {
  const recommended = services.slice(0, 5)

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="sectors" />

        <PageHero
            eyebrow="Sector Support"
            title={sector.title}
            description="Fidara helps businesses in this sector create cleaner books, stronger workflows, better reporting, and more confidence around decisions."
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <a
                href="/contact"
                className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Start the Conversation
            </a>
            <a
                href="/sectors"
                className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white"
            >
              All Sectors
            </a>
          </div>
        </PageHero>

        <section className="border-t border-stone-200 px-8 py-12">
          <SectionTitle>BUSINESSES IN THIS SECTOR</SectionTitle>
          <IconGrid items={sector.industries} columns="md:grid-cols-4 lg:grid-cols-7" />
        </section>

        <section className="border-t border-stone-200 px-8 py-14">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
                Common priorities
              </p>
              <h2 className="font-serif text-4xl leading-tight text-slate-900">
                Practical support for real operating needs.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-700">
                We focus on the recurring financial and operational details that
                help owners understand performance, protect cash flow, and plan ahead.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                'Clean monthly books and reconciliations',
                'Payroll, tax deadlines, and compliance checkpoints',
                'Cash flow visibility and vendor payment control',
                'Better systems, records, reporting, and advisory conversations',
              ].map((item) => (
                  <div
                      key={item}
                      className="flex items-start gap-4 border-b border-stone-200 pb-4 last:border-b-0"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                    <p className="text-base leading-7 text-slate-800">{item}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 px-8 py-12">
          <SectionTitle>RECOMMENDED SERVICES</SectionTitle>
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {recommended.map(({ title, description, image, slug }) => (
                <ServiceCard
                    key={title}
                    title={title}
                    description={description}
                    image={image}
                    slug={slug}
                />
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
