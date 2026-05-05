import { CheckCircle2 } from 'lucide-react'
import { Footer, Header, ServiceCard, serviceBySlug } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function IndustryProfilePage({ profile }) {
  const recommended = profile.recommendedServices.map((slug) => serviceBySlug[slug]).filter(Boolean)
  return (
    <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
      <Header active="sectors" />
      <PageHero eyebrow="Industry Support" title={profile.title} description={profile.description}><div className="mt-8 flex flex-wrap gap-4"><a href="/contact" className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">Start the Conversation</a><a href="/industries" className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white">All Industries</a></div></PageHero>
      <section className="border-t border-stone-200 px-8 py-12"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr]"><div><img src={profile.image} alt={profile.title} className="h-32 w-32 object-contain mix-blend-multiply" /><h2 className="mt-6 font-serif text-4xl leading-tight text-slate-900">What Fidara focuses on.</h2></div><div className="grid gap-4">{profile.priorities.map((priority) => <div key={priority} className="flex items-start gap-4 border-b border-stone-200 pb-4 last:border-b-0"><CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" /><p className="text-base leading-7 text-slate-800">{priority}</p></div>)}</div></div></section>
      <section className="border-t border-stone-200 px-8 py-12"><h2 className="mx-auto max-w-6xl font-serif text-3xl leading-tight text-slate-900">Recommended Services</h2><div className="mx-auto mt-6 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">{recommended.map(({ title, description, image, slug }) => <ServiceCard key={title} title={title} description={description} image={image} slug={slug} />)}</div></section>
      <Footer />
    </main>
  )
}
