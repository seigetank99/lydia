import { Footer, Header } from '../../components/site-core.jsx'
import { FAQSection, PageHero } from '../shared-sections.jsx'

export default function FAQPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="about" />

        <PageHero
            eyebrow="FAQ"
            title="Answers about working with Fidara."
            description="A deeper FAQ page for services, onboarding, pricing, technology, and how support can grow over time."
        />

        <FAQSection />
        <Footer />
      </main>
  )
}
