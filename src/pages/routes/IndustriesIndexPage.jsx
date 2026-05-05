import { Footer, Header, industryProfiles } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function IndustriesIndexPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="sectors" />

        <PageHero
            eyebrow="Industries"
            title="Focused pages for the industries people search for most."
            description="These pages support more specific client searches, from restaurants and dental practices to construction, real estate, and e-commerce."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industryProfiles.map((profile) => (
                <a
                    key={profile.slug}
                    href={`/industries/${profile.slug}`}
                    className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <img src={profile.image} alt={profile.title} className="mb-4 h-16 w-16 object-contain mix-blend-multiply" />
                  <h3 className="font-serif text-3xl leading-tight text-slate-900">{profile.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{profile.description}</p>
                </a>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
