import { CircleCheck } from 'lucide-react'
import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function LaunchReadinessPage() {
  const groups = [
    ['Business Details', ['Legal entity name', 'Business email', 'Phone number', 'Service area', 'Final domain', 'Social links']],
    ['Brand & Positioning', ['Final logo files', 'Founder story', 'CPA/license language', 'Service descriptions', 'Target client profile', 'Tone of voice review']],
    ['Proof & Trust', ['Real testimonials or anonymized scenarios', 'Credentials and licenses', 'Founder/team bios', 'Real stats or softened proof points']],
    ['Legal & Compliance', ['Privacy policy review', 'Terms review', 'Disclaimer review', 'Tax advice disclaimer', 'Managed IT/security disclaimer']],
    ['Technical Launch', ['Form endpoint', 'Favicon', 'OG image', 'Sitemap domain', 'Robots file', 'npm run build']],
    ['Content Review', ['Homepage', 'About', 'Bookkeeping', 'Tax', 'Managed IT', 'Pricing', 'Contact']],
  ]

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />
        <PageHero
            eyebrow="Launch Readiness"
            title="A final checklist before Fidara goes live."
            description="Use this page internally to track the remaining business details, legal review, proof points, and technical launch items."
        />
        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {groups.map(([title, items]) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h2 className="font-serif text-3xl leading-tight text-slate-900">{title}</h2>
                  <div className="mt-5 grid gap-3">
                    {items.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CircleCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                          <p className="text-sm leading-6 text-slate-700">{item}</p>
                        </div>
                    ))}
                  </div>
                </article>
            ))}
          </div>
        </section>
        <Footer />
      </main>
  )
}
