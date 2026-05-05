import { CircleCheck } from 'lucide-react'
import { Footer, Header, SectionTitle } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function TechnologyPage() {
  const areas = [
    {
      title: 'Accounting Systems',
      description:
          'Set up books, charts of accounts, reconciliations, monthly close workflows, and reporting packages that owners can actually use.',
      items: [
        'Chart of accounts design',
        'Bookkeeping workflow setup',
        'Monthly close checklist',
        'Financial reporting structure',
      ],
    },
    {
      title: 'Payroll Systems',
      description:
          'Coordinate payroll tools, employee records, approval workflows, payroll tax checkpoints, and recurring payroll review.',
      items: [
        'Payroll platform coordination',
        'Employee onboarding records',
        'Pay schedule and approval workflow',
        'Payroll tax deadline checkpoints',
      ],
    },
    {
      title: 'Document Management',
      description:
          'Organize the documents behind the numbers so receipts, statements, payroll files, tax documents, and support records are easier to find.',
      items: [
        'Folder structure and naming conventions',
        'Recurring document collection',
        'Tax and audit support files',
        'Owner and team access rules',
      ],
    },
    {
      title: 'Dashboards & Reporting',
      description:
          'Create clearer reporting views so owners can see cash flow, revenue, margins, payroll, spend, and operating trends.',
      items: [
        'Monthly financial dashboards',
        'KPI and variance review',
        'Cash flow visibility',
        'Owner-ready reporting packages',
      ],
    },
    {
      title: 'Cybersecurity Basics',
      description:
          'Strengthen the everyday controls that protect accounting files, payroll systems, client documents, and business operations.',
      items: [
        'Multi-factor authentication',
        'User access reviews',
        'Password manager workflows',
        'Backup and recovery planning',
      ],
    },
    {
      title: 'Managed IT Support',
      description:
          'Support the technology backbone behind a growing business, including users, devices, vendors, systems, and issue workflows.',
      items: [
        'Help desk workflow planning',
        'Device and user support',
        'Vendor coordination',
        'Onboarding and offboarding controls',
      ],
    },
  ]

  const stack = [
    ['Accounting', 'QuickBooks, Xero, bank feeds, close workflows, reporting exports'],
    ['Payroll', 'Gusto, ADP, Paychex, onboarding records, approvals, tax checkpoints'],
    ['Documents', 'Google Drive, ShareFile, TaxDome, Canopy, folder rules, collection workflows'],
    ['Reporting', 'Dashboards, KPI summaries, close packages, cash flow views, owner reports'],
    ['Security', 'MFA, password management, access reviews, backup planning, offboarding'],
    ['Support', 'Ticket intake, vendor tracking, device support, recurring system reviews'],
  ]

  const process = [
    ['Map', 'We document your current systems, logins, workflows, vendors, and pain points.'],
    ['Organize', 'We clean up access, files, responsibilities, and recurring operating routines.'],
    ['Connect', 'We align accounting, payroll, documents, reporting, and technology workflows.'],
    ['Support', 'We create a recurring review rhythm so systems keep working as the business grows.'],
  ]

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="about" />

        <PageHero
            eyebrow="Technology"
            title="Modern systems for clearer financial and business operations."
            description="Fidara connects accounting, payroll, documents, dashboards, cybersecurity basics, and managed IT support so your operations feel calmer and more reliable."
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/services/managed-it-services" className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">
              Managed IT Services
            </a>
            <a href="/tools/managed-it-security-checklist" className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white">
              Security Checklist
            </a>
          </div>
        </PageHero>

        <section className="border-t border-stone-200 px-8 py-12">
          <SectionTitle>TECHNOLOGY AREAS</SectionTitle>
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
                <article key={area.title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <h3 className="font-serif text-3xl leading-tight text-slate-900">{area.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{area.description}</p>
                  <div className="mt-5 grid gap-3">
                    {area.items.map((item) => (
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

        <section className="border-t border-stone-200 px-8 py-14">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
                Systems Stack
              </p>
              <h2 className="font-serif text-4xl leading-tight text-slate-900">
                The tools behind calm operations.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-700">
                Fidara does not force one software stack. We help clients choose,
                organize, and maintain tools that fit the business stage, team,
                and reporting needs.
              </p>
            </div>

            <div className="grid gap-3">
              {stack.map(([title, description]) => (
                  <div key={title} className="rounded-xl border border-stone-200 bg-white/60 p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 px-8 py-12">
          <SectionTitle>IMPLEMENTATION PROCESS</SectionTitle>
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
            {process.map(([title, description], index) => (
                <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-serif text-3xl text-slate-900">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{description}</p>
                </article>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 px-8 py-10">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
            <h2 className="font-serif text-4xl leading-tight text-slate-900">
              Need help organizing your systems stack?
            </h2>
            <a href="/contact" className="inline-flex rounded-md bg-emerald-600 px-10 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">
              Book a Consultation
            </a>
          </div>
        </section>

        <Footer />
      </main>
  )
}
