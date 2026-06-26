import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero, RelatedLinksSection } from '../shared-sections.jsx'

const categories = {
  everyday: {
    label: 'Everyday People',
    items: [
      ['What should I gather before tax season?', 'Start with income forms, prior-year returns, IRS or state notices, mortgage and interest records, charitable giving support, childcare records, education forms, investment statements, and documents tied to major life changes. Keeping everything in one folder before filing season reduces back-and-forth and missed details.'],
      ['When should I talk to a tax professional?', 'Before year-end is usually best, especially if your income changed, you moved states, bought or sold property, started freelance work, got married, had a child, received equity compensation, or expect a large deduction. Tax planning is more useful before the year closes.'],
      ['What if I receive a tax notice?', 'Do not ignore it, and do not assume it is automatically correct. Save the full notice, note the response deadline, gather the return and payment records connected to the issue, and ask for help before replying if anything is unclear.'],
      ['How can I avoid a surprise tax bill?', 'Review withholding or estimated payments during the year, not only at filing time. A midyear or fall check-in can catch income changes, side work, bonuses, stock activity, or business profit that may require adjustments.'],
      ['Is online tax software enough?', 'It can work for simple situations, but it may not ask enough context around life changes, state moves, business income, entity choices, equity compensation, notices, or planning opportunities. Complexity is usually the signal to get guidance.'],
      ['What life changes should trigger a tax review?', 'Marriage, divorce, a new child, a home purchase or sale, a state move, retirement, inheritance, freelance income, stock compensation, college expenses, and a major charitable gift can all affect your tax picture. The best time to ask is before documents are due.'],
      ['How should I organize receipts and deductions?', 'Keep receipts, statements, mileage logs, charitable confirmations, medical records, education forms, and other support in one secure folder by year. A deduction is easier to defend when the record shows amount, date, business or personal purpose, and proof of payment.'],
    ],
  },
  business: {
    label: 'Small Business Owners',
    items: [
      ['What is the biggest business tax mistake?', 'Waiting until filing season to clean the books. Tax planning depends on accurate records, reconciled accounts, payroll information, owner draws, loan activity, major purchases, and entity structure. If those are unclear, tax work becomes reactive.'],
      ['How often should I review books?', 'At least monthly. A useful monthly review includes bank and credit card reconciliations, uncategorized transactions, payroll entries, loan balances, accounts receivable, accounts payable, margin trends, and cash flow.'],
      ['Do I need separate business accounts?', 'Yes. Separate bank and credit card accounts improve record quality, reduce cleanup risk, and make it easier to support deductions. Mixing personal and business activity creates avoidable tax and bookkeeping friction.'],
      ['When should I think about estimated taxes?', 'As soon as the business is profitable or owner income changes. Waiting until year-end can create cash strain. Estimated tax planning should connect bookkeeping, payroll, owner compensation, and expected deductions.'],
      ['Should I be an LLC, S corporation, or corporation?', 'Entity choice depends on ownership, profit level, payroll, state rules, liability needs, future investors, and administrative burden. It should be reviewed with tax and legal advisors before making changes.'],
      ['What records should a small business keep every month?', 'Keep bank and card statements, receipts, invoices, payroll reports, loan statements, sales tax records, vendor bills, owner draws, mileage logs, and any large purchase documents. Monthly organization makes tax planning, financing, and decision-making much easier.'],
      ['Can I deduct home office, vehicle, meals, or software costs?', 'Possibly, but each category has rules and documentation expectations. The key question is whether the expense is ordinary, necessary, properly documented, and connected to the business. Ask before assuming a deduction applies.'],
      ['What should I do if my books are behind?', 'Do not wait until filing season. Gather statements, payroll reports, prior returns, loan documents, receipts, and accounting access. A cleanup project can separate catch-up work from the ongoing monthly process so tax planning becomes more reliable.'],
    ],
  },
}

export default function TaxAdvicePage() {
  const [activeCategory, setActiveCategory] = useState('everyday')
  const [openIndex, setOpenIndex] = useState(0)
  const active = categories[activeCategory]
  return (
    <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
      <Header active="resources" />
      <PageHero eyebrow="Tax Advice Center" title="Common tax questions, explained clearly." description="Plain-English educational guidance for individuals and small business owners. Tax rules depend on your facts, location, records, entity structure, and timing." />
      <section className="border-t border-stone-200 px-8 py-8">
        <div className="mx-auto max-w-6xl rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-sm leading-7 text-amber-950">
          This page is educational information only and is not formal tax, legal, investment, accounting, or financial advice. Do not rely on it as a professional opinion or as authority for a tax position. Your facts, records, state rules, entity structure, deadlines, and prior filings should be reviewed by a qualified advisor before you act.
        </div>
      </section>
      <section className="border-t border-stone-200 px-8 py-12"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.75fr_1.25fr]"><div className="grid gap-3">{Object.entries(categories).map(([key, category]) => <button key={key} type="button" onClick={() => { setActiveCategory(key); setOpenIndex(0) }} className={`rounded-xl border px-5 py-4 text-left transition ${activeCategory === key ? 'border-emerald-600 bg-white shadow-sm' : 'border-stone-200 bg-white/50 hover:bg-white'}`}><span className="font-serif text-2xl text-slate-900">{category.label}</span></button>)}</div><div className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white/60 shadow-sm">{active.items.map(([question, answer], index) => { const isOpen = openIndex === index; return <div key={question}><button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"><span className="font-serif text-xl text-slate-900">{question}</span><ChevronDown className={`h-5 w-5 flex-none text-emerald-700 transition ${isOpen ? 'rotate-180' : ''}`} /></button>{isOpen && <p className="px-6 pb-6 text-sm leading-7 text-slate-700">{answer}</p>}</div> })}</div></div></section>
      <RelatedLinksSection title="Related Tax Resources" links={[['Tax Services', '/services/tax'], ['Tax Calendar', '/tax-calendar'], ['Tax Resources', '/tax-resources'], ['Book a Consultation', '/contact']]} />
      <Footer />
    </main>
  )
}
