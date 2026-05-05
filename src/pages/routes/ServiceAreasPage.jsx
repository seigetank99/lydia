import { Footer, Header, serviceAreas } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function ServiceAreasPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="contact" />

        <PageHero
            eyebrow="Service Areas"
            title="Financial clarity for businesses across the region."
            description="Fidara can support clients locally and remotely across New York, New Jersey, Connecticut, and beyond."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {serviceAreas.map((area) => (
                <a key={area.slug} href={`/service-areas/${area.slug}`} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md">
                  <h3 className="font-serif text-3xl text-slate-900">{area.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{area.description}</p>
                </a>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
