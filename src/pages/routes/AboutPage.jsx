import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

const pillars = [
  ['Clarity', 'We translate financial details into decisions people can use.'],
  ['Trust', 'We build consistent systems, communication, and long-term relationships.'],
  ['Growth', 'We help clients prepare for each next stage, not react to deadlines.'],
]

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
      <Header active="about" />
      <PageHero eyebrow="About Fidara" title="Built on trust, clarity, and calm financial structure." description="Fidara exists for people and businesses who want their financial lives to feel more organized, intentional, and understandable." backgroundImage="/images/about.png" />
      <section className="border-t border-stone-200 px-8 py-14"><div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">{pillars.map(([title, description]) => <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm"><h2 className="font-serif text-3xl text-slate-900">{title}</h2><p className="mt-4 text-sm leading-7 text-slate-700">{description}</p></article>)}</div></section>
      <section className="border-t border-stone-200 px-8 py-14"><div className="mx-auto max-w-6xl rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm"><h2 className="font-serif text-4xl leading-tight text-slate-900">Secure today with trust. Pursue tomorrow with peace.</h2><p className="mt-4 text-base leading-8 text-slate-700">Fidara brings accounting, tax, payroll, advisory, and systems support into one relationship so decisions feel clearer and less stressful.</p></div></section>
      <Footer />
    </main>
  )
}
