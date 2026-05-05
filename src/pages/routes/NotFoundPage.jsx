import { Sparkles } from 'lucide-react'
import { Header } from '../../components/site-core.jsx'

export default function NotFoundPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header />

        <section className="mx-auto max-w-4xl px-8 py-24 text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <Sparkles className="h-8 w-8" />
          </div>

          <h1 className="font-serif text-5xl leading-tight text-slate-900 md:text-7xl">
            This page wandered off.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-700">
            The page you are looking for is not available. You can return home,
            explore Fidara’s services, browse resources, or book a consultation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
                href="/"
                className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Return Home
            </a>

            <a
                href="/services"
                className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white"
            >
              Explore Services
            </a>

            <a
                href="/start"
                className="rounded-md border border-stone-300 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white"
            >
              Start Here
            </a>

            <a
                href="/resources"
                className="rounded-md border border-stone-300 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white"
            >
              View Resources
            </a>

            <a
                href="/contact"
                className="rounded-md border border-stone-300 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white"
            >
              Book a Consultation
            </a>
          </div>
        </section>
      </main>
  )
}
