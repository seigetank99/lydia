import { Footer, Header, ServiceCard, services } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function ServicesIndexPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="services" />

        <PageHero
            eyebrow="Fidara Core Services"
            title="Support for the financial, operational, and technology backbone of your business."
            description="Start with one service or build a relationship that grows with you. Each service page explains what we focus on and how Fidara helps create structure."
            backgroundImage="/images/service.png"
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <a
                href="/contact"
                className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Book a Consultation
            </a>
            <a
                href="/sectors"
                className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white"
            >
              View Sectors
            </a>
          </div>
        </PageHero>

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map(({ title, description, image, slug }) => (
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

        <section className="border-t border-stone-200 px-8 py-14">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {[
              ['Foundation', 'Bookkeeping, tax readiness, clean records, and reliable reporting.'],
              ['Growth', 'Payroll, AP, spend management, advisory, and ongoing financial support.'],
              ['Strategic', 'CFO services, U.S. expansion, wealth coordination, and managed IT services.'],
            ].map(([title, description]) => (
                <article
                    key={title}
                    className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm"
                >
                  <h3 className="font-serif text-3xl text-slate-900">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{description}</p>
                </article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
