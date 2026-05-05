import { useMemo, useState } from 'react'
import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

const questions = [
  ['Are your bank and credit card accounts reconciled every month?', '/services/bookkeeping', 'Bookkeeping'],
  ['Do you know your current profit margin and cash position?', '/services/cfo-services', 'CFO Services'],
  ['Are payroll and contractor records organized?', '/services/hr-payroll', 'HR & Payroll'],
  ['Do you review estimated tax exposure before year-end?', '/services/tax', 'Tax'],
  ['Do you know who has system access to finance data?', '/services/managed-it-services', 'Managed IT Services'],
]

export default function BusinessHealthCheckPage() {
  const [answers, setAnswers] = useState({})
  const score = useMemo(() => Math.round((Object.values(answers).filter((v) => v === 'yes').length / questions.length) * 100) || 0, [answers])
  const weakAreas = useMemo(() => questions.filter((_, i) => answers[i] === 'no'), [answers])
  return (
    <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
      <Header active="resources" />
      <PageHero eyebrow="Business Health Check" title="A quick self-assessment for small business owners." description="Answer a few practical questions to see which parts of your financial operations need attention first." />
      <section className="border-t border-stone-200 px-8 py-12"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.15fr_0.85fr]"><div className="grid gap-4">{questions.map(([question], index) => <article key={question} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm"><h2 className="font-serif text-2xl leading-tight text-slate-900">{question}</h2><div className="mt-4 flex gap-3">{['yes', 'no'].map((value) => <button key={value} type="button" onClick={() => setAnswers({ ...answers, [index]: value })} className={`rounded-md px-5 py-2 text-sm font-medium transition ${answers[index] === value ? 'bg-emerald-600 text-white' : 'border border-stone-200 bg-white/60 text-slate-700 hover:bg-white'}`}>{value === 'yes' ? 'Yes' : 'No'}</button>)}</div></article>)}</div><aside className="h-fit rounded-xl border border-stone-200 bg-white/70 p-8 shadow-sm md:sticky md:top-6"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">Score</p><p className="mt-3 font-serif text-6xl text-slate-900">{score}%</p><p className="mt-4 text-sm leading-7 text-slate-700">Lower scores usually point to bookkeeping, tax planning, payroll workflow, and systems gaps.</p><div className="mt-5 grid gap-3">{weakAreas.map(([, href, label]) => <a key={label + href} href={href} className="rounded-md border border-stone-200 bg-[#f7f3eb] px-4 py-3 text-sm text-slate-700 transition hover:bg-white">{label}</a>)}</div><a href="/contact" className="mt-6 inline-flex w-full justify-center rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">Review This With Fidara</a></aside></div></section>
      <Footer />
    </main>
  )
}
