import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function PartnersPage() {
  const partners = [
    ['Attorneys', 'Entity, contracts, succession, immigration, and cross-border coordination.'],
    ['Bankers & Lenders', 'Financing, lending packages, cash flow conversations, and reporting support.'],
    ['Insurance Advisors', 'Business risk, benefits, key-person planning, and coverage coordination.'],
    ['Technology Vendors', 'Payroll, accounting, document, cybersecurity, and managed IT platforms.'],
  ]

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="about" />

        <PageHero
            eyebrow="Partners"
            title="A better client experience through trusted professional coordination."
            description="Fidara can coordinate with attorneys, bankers, insurance advisors, technology vendors, and other professionals around shared client goals."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {partners.map(([title, description]) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h3 className="font-serif text-2xl leading-tight text-slate-900">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{description}</p>
                </article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
