import { Footer, Header, ServiceCard, services } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function ServiceAreaDetailPage({ area }) {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="contact" />

        <PageHero
            eyebrow="Service Area"
            title={area.title}
            description={area.description}
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">
              Contact Fidara
            </a>
            <a href="/service-areas" className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white">
              All Service Areas
            </a>
          </div>
        </PageHero>

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map(({ title, description, image, slug }) => (
                <ServiceCard key={title} title={title} description={description} image={image} slug={slug} />
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
