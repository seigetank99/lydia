import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero, RelatedLinksSection } from '../shared-sections.jsx'

const categories = {
  everyday: { label: 'Everyday People', items: [['What should I gather before tax season?', 'Collect income forms, notices, mortgage and interest records, childcare records, and major life-event documents.'], ['When should I talk to a tax professional?', 'Before year-end when income, job, family, property, or freelance status changes.'], ['What if I receive a tax notice?', 'Do not ignore it; keep records and respond before the deadline.']] },
  business: { label: 'Small Business Owners', items: [['What is the biggest business tax mistake?', 'Waiting until filing season to clean books and reconcile accounts.'], ['How often should I review books?', 'At least monthly with reconciliations, P&L review, and cash-flow checks.'], ['Do I need separate accounts?', 'Yes. Separate accounts improve record quality and reduce cleanup risk.']] },
}

export default function TaxAdvicePage() {
  const [activeCategory, setActiveCategory] = useState('everyday')
  const [openIndex, setOpenIndex] = useState(0)
  const active = categories[activeCategory]
  return (
    <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
      <Header active="resources" />
      <PageHero eyebrow="Tax Advice Center" title="Common tax questions, explained clearly." description="Educational guidance for individuals and small business owners. Tax rules depend on your specific facts and jurisdiction." />
      <section className="border-t border-stone-200 px-8 py-12"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.75fr_1.25fr]"><div className="grid gap-3">{Object.entries(categories).map(([key, category]) => <button key={key} type="button" onClick={() => { setActiveCategory(key); setOpenIndex(0) }} className={`rounded-xl border px-5 py-4 text-left transition ${activeCategory === key ? 'border-emerald-600 bg-white shadow-sm' : 'border-stone-200 bg-white/50 hover:bg-white'}`}><span className="font-serif text-2xl text-slate-900">{category.label}</span></button>)}</div><div className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white/60 shadow-sm">{active.items.map(([question, answer], index) => { const isOpen = openIndex === index; return <div key={question}><button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"><span className="font-serif text-xl text-slate-900">{question}</span><ChevronDown className={`h-5 w-5 flex-none text-emerald-700 transition ${isOpen ? 'rotate-180' : ''}`} /></button>{isOpen && <p className="px-6 pb-6 text-sm leading-7 text-slate-700">{answer}</p>}</div> })}</div></div></section>
      <RelatedLinksSection title="Related Tax Resources" links={[['Tax Services', '/services/tax'], ['Tax Calendar', '/tax-calendar'], ['Tax Resources', '/tax-resources'], ['Book a Consultation', '/contact']]} />
      <Footer />
    </main>
  )
}
