import { ChevronDown } from 'lucide-react'

function PageHero({ eyebrow, title, description, children, backgroundImage }) {
  if (backgroundImage) {
    return (
      <section className="relative mx-auto max-w-7xl overflow-hidden px-8 pb-12 pt-8">
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-multiply brightness-[0.94] contrast-[0.9] sepia-[0.06]"
        />
        <div className="absolute inset-0 bg-[#f7f3eb]/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_35%,rgba(247,243,235,0.10),rgba(247,243,235,0.55)_58%,rgba(247,243,235,0.9)_100%)]" />
        <div className="relative z-10 max-w-4xl py-8">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-800">{eyebrow}</p>
          <h1 className="font-serif text-5xl leading-[1.05] text-slate-900 md:text-7xl">{title}</h1>
          {description && <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-800">{description}</p>}
          {children}
        </div>
      </section>
    )
  }

  return (
      <section className="mx-auto max-w-7xl px-8 pb-12 pt-8">
        <div className="max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
            {eyebrow}
          </p>

          <h1 className="font-serif text-5xl leading-[1.05] text-slate-900 md:text-7xl">
            {title}
          </h1>

          {description && (
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                {description}
              </p>
          )}

          {children}
        </div>
      </section>
  )
}

function HeroVisual({ src, alt }) {
  if (!src) return null
  return (
    <section className="border-t border-stone-200 px-8 py-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-stone-200 bg-white/60 shadow-sm">
        <img src={src} alt={alt || ''} className="h-auto w-full object-cover" />
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    {
      q: 'What does Fidara actually do?',
      a: 'Fidara provides accounting, bookkeeping, tax support, payroll coordination, advisory, U.S. expansion support, and managed IT services for growing businesses and individuals.',
    },
    {
      q: 'Who is Fidara best for?',
      a: 'Fidara is designed for founders, operators, families, and business owners who want clearer financial structure, cleaner records, and practical support that grows with them.',
    },
    {
      q: 'Can I hire Fidara for one service only?',
      a: 'Yes. Many clients start with one need (for example bookkeeping cleanup or tax support) and expand into a broader relationship over time.',
    },
    {
      q: 'Do you support clients remotely?',
      a: 'Yes. Fidara can support clients remotely and locally across its primary service areas.',
    },
    {
      q: 'Do you provide legal or investment advice?',
      a: 'No. Fidara does not provide legal or investment advice unless separately licensed and engaged for specific services.',
    },
    {
      q: 'How fast can we get started?',
      a: 'Timing depends on urgency, service scope, and document readiness. The first step is a consultation to understand priorities and define next steps.',
    },
  ]

  return (
      <section id="faq" className="scroll-mt-24 border-t border-stone-200 px-8 py-12">
        <SectionTitle>FREQUENTLY ASKED QUESTIONS</SectionTitle>
        <div className="mx-auto grid max-w-5xl gap-3">
          {faqs.map((item) => (
                <details
                    key={item.q}
                    className="group rounded-xl border border-stone-200 bg-white/60 p-5 shadow-sm"
                >
                  <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 text-left"
                  >
                    <h3 className="font-serif text-2xl leading-tight text-slate-900">
                      {item.q}
                    </h3>
                    <ChevronDown
                        className="h-5 w-5 flex-none text-emerald-700 transition group-open:rotate-180"
                    />
                  </summary>

                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {item.a}
                  </p>
                </details>
          ))}
        </div>
      </section>
  )
}

function RelatedLinksSection({ title = 'Related Pages', links = [] }) {
  return (
      <section className="border-t border-stone-200 px-8 py-10">
        <div className="mx-auto max-w-6xl rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            {title}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {links.map(([label, href]) => (
                <a
                    key={`${label}-${href}`}
                    href={href}
                    className="rounded-md border border-stone-200 bg-[#f7f3eb] px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
                >
                  {label}
                </a>
            ))}
          </div>
        </div>
      </section>
  )
}

function SectionTitle({ children }) {
  return (
      <div className="mb-8 text-center">
        <h2 className="text-sm uppercase tracking-[0.45em] text-slate-700">
          {children}
        </h2>
        <div className="mx-auto mt-3 h-px w-8 bg-emerald-500" />
      </div>
  )
}

export { FAQSection, HeroVisual, PageHero, RelatedLinksSection, SectionTitle }
