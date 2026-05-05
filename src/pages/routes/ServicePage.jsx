import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Footer, Header, ServiceDetailsSection, mailto } from '../../components/site-core.jsx'
import { RelatedLinksSection, SectionTitle } from '../shared-sections.jsx'

export default function ServicePage({ service }) {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="services" />

        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 pb-16 pt-8 md:grid-cols-[1fr_0.85fr]">
          <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
          >
            <a
                href="/#services"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-900"
            >
              <ArrowLeft className="h-4 w-4" />
              All services
            </a>

            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
              Fidara Core Service
            </p>

            <h1 className="font-serif text-5xl leading-[1.05] text-slate-900 md:text-7xl">
              {service.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              {service.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                  href="/contact"
                  className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                Start the Conversation
              </a>
              <a
                  href="/"
                  className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white"
              >
                Return Home
              </a>
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65 }}
              className="rounded-xl border border-stone-200 bg-white/70 p-10 text-center shadow-sm"
          >
            <img
                src={service.image}
                alt={service.title}
                className="mx-auto h-40 w-40 object-contain mix-blend-multiply"
            />
            <p className="mx-auto mt-6 max-w-sm text-sm leading-6 text-slate-700">
              {service.description}
            </p>
          </motion.div>
        </section>

        <section className="border-t border-stone-200 px-8 py-14">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionTitle>WHAT WE FOCUS ON</SectionTitle>
              <p className="text-base leading-8 text-slate-700">
                Fidara builds the financial structure behind the work, keeping
                the details clear enough to support day-to-day decisions and
                long-term planning.
              </p>
            </div>

            <div className="grid gap-4">
              {service.outcomes.map((outcome) => (
                  <div
                      key={outcome}
                      className="flex items-start gap-4 border-b border-stone-200 pb-4 last:border-b-0"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                    <p className="text-base leading-7 text-slate-800">{outcome}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceDetailsSection service={service} />

        <RelatedLinksSection
            title="Related Service Pages"
            links={[
              ['All Services', '/services'],
              ['Bookkeeping', '/services/bookkeeping'],
              ['Tax', '/services/tax'],
              ['CFO Services', '/services/cfo-services'],
              ['Managed IT Services', '/services/managed-it-services'],
              ['Pricing', '/pricing'],
              ['Book a Consultation', '/contact'],
            ]}
        />

        <section id="contact" className="mx-auto max-w-6xl px-8 py-8">
          <div className="grid items-center gap-8 rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm md:grid-cols-[1fr_auto]">
            <h2 className="font-serif text-4xl leading-tight text-slate-900">
              Need clarity around {service.title.toLowerCase()}?
            </h2>

            <a
                href={mailto()}
                className="inline-flex rounded-md bg-emerald-600 px-10 py-4 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Contact Fidara
            </a>
          </div>
        </section>

        <Footer />
      </main>
  )
}
