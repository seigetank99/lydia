import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function LegalPage({ type }) {
  const copy = {
    privacy: {
      eyebrow: 'Privacy Policy',
      title: 'Privacy and confidentiality matter.',
      paragraphs: [
        'This placeholder privacy policy should be reviewed by counsel before publication. It is drafted as a starting point for the Fidara website.',
        'Fidara may collect information that visitors submit through forms, email, scheduling links, newsletter signups, or client intake workflows. This may include names, contact information, business information, service interests, and documents voluntarily provided by the visitor or client.',
        'Information may be used to respond to inquiries, provide services, improve website experience, manage client relationships, coordinate onboarding, and maintain business records.',
        'Fidara may use third-party tools for forms, scheduling, analytics, document management, email, accounting, payroll, and client workflows. Final launch language should identify the tools actually used.',
        'Visitors should not submit highly sensitive information through general website forms. Sensitive records should be shared only through approved secure workflows.',
      ],
    },
    terms: {
      eyebrow: 'Terms of Use',
      title: 'Terms for using this website.',
      paragraphs: [
        'This placeholder terms page should be reviewed by counsel before publication. It is not a final legal agreement.',
        'The Fidara website is provided for general informational purposes. Website content may change without notice and may not reflect the latest legal, tax, accounting, technology, or regulatory developments.',
        'Use of this website does not create a client relationship. A professional relationship begins only after Fidara accepts an engagement in writing.',
        'Visitors may not copy, misuse, interfere with, or attempt unauthorized access to the website, systems, forms, or client workflows.',
        'Third-party links or tools may be provided for convenience. Fidara is not responsible for third-party websites, services, or policies.',
      ],
    },
    disclaimer: {
      eyebrow: 'Disclaimer',
      title: 'General information, not professional advice.',
      paragraphs: [
        'Website content is for general informational and educational purposes only.',
        'Nothing on this website is tax, legal, investment, cybersecurity, insurance, accounting, or financial advice for any specific person or business.',
        'Tax, accounting, payroll, advisory, technology, and business decisions depend on specific facts, location, timing, entity structure, records, and applicable rules.',
        'No professional relationship is formed by viewing this website, submitting a form, downloading a checklist, or reading educational content.',
        'Any service engagement must be separately reviewed, accepted, scoped, and documented in writing.',
      ],
    },
  }[type]

  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="contact" />

        <PageHero
            eyebrow={copy.eyebrow}
            title={copy.title}
            description="Placeholder legal content for the Fidara website. Review with counsel before launch."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto max-w-4xl rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm">
            {copy.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-5 text-base leading-8 text-slate-700 last:mb-0">
                  {paragraph}
                </p>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
