import { CheckCircle2 } from 'lucide-react'
import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

const features = [
  ['Upload Documents', 'A central place for tax docs, statements, invoices, payroll records, and support files.'],
  ['Access Reports', 'A home for monthly reports, close packages, planning notes, and advisory summaries.'],
  ['Book Meetings', 'Scheduling for onboarding, reviews, tax planning, payroll, and systems check-ins.'],
  ['Track Onboarding', 'Checklist-driven onboarding for documents, access, payroll, and first reporting cycles.'],
]

export default function ClientPortalPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
      <Header active="about" />
      <PageHero eyebrow="Client Portal" title="A future home for documents, reports, meetings, and support." description="The Fidara portal can become the organized front door for document collection, reporting, onboarding, scheduling, and support workflows." />
      <section className="border-t border-stone-200 px-8 py-12"><div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">{features.map(([title, description]) => <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm"><h2 className="font-serif text-2xl leading-tight text-slate-900">{title}</h2><p className="mt-4 text-sm leading-7 text-slate-700">{description}</p></article>)}</div></section>
      <section className="border-t border-stone-200 px-8 py-10"><div className="mx-auto grid max-w-6xl gap-8 rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm md:grid-cols-[1fr_auto] md:items-center"><h2 className="font-serif text-4xl leading-tight text-slate-900">Ready to organize your client workflow?</h2><a href="/contact" className="inline-flex rounded-md bg-emerald-600 px-10 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">Request Portal Access</a></div></section>
      <section className="border-t border-stone-200 px-8 py-12"><div className="mx-auto max-w-6xl rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm"><h2 className="font-serif text-3xl leading-tight text-slate-900">Security Basics</h2><div className="mt-5 grid gap-3 md:grid-cols-2">{['Role-based access', 'MFA where supported', 'Clear onboarding/offboarding', 'Structured document folders'].map((item) => <div key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" /><p className="text-sm leading-7 text-slate-700">{item}</p></div>)}</div></div></section>
      <Footer />
    </main>
  )
}
