import { ArrowRight } from 'lucide-react'
import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

const paths = [
  ['I need help with personal finances', 'For life transitions, tax clarity, and planning conversations.', '/who-we-help'],
  ['I own a business', 'For bookkeeping, tax, payroll, reporting, and recurring support.', '/services'],
  ['My books are messy', 'For cleanup, reconciliations, and better monthly close workflows.', '/services/bookkeeping'],
  ['I am expanding to the U.S.', 'For accounting, payroll, tax-readiness, and systems setup.', '/us-expansion'],
  ['I need payroll or HR help', 'For payroll setup, employee records, and compliance checkpoints.', '/services/hr-payroll'],
  ['I need technology support', 'For access controls, vendors, backups, and managed IT workflows.', '/technology'],
]

export default function StartPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
      <Header />
      <PageHero eyebrow="Start Here" title="Tell us where you are. We’ll point you toward the right support." description="Choose the path that sounds closest to your situation. Each path links to services, tools, and practical next steps." />
      <section className="border-t border-stone-200 px-8 py-12"><div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">{paths.map(([title, description, href]) => <a key={title} href={href} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md"><h2 className="font-serif text-3xl leading-tight text-slate-900">{title}</h2><p className="mt-4 text-sm leading-7 text-slate-700">{description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-emerald-700">View next step <ArrowRight className="h-3.5 w-3.5" /></span></a>)}</div></section>
      <Footer />
    </main>
  )
}
