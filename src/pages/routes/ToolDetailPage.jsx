import { Footer, Header } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function ToolDetailPage({ tool }) {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />

        <PageHero
            eyebrow="Fidara Tool"
            title={tool.title}
            description={tool.description}
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto max-w-5xl rounded-xl border border-stone-200 bg-white/60 p-8 shadow-sm">
            <div className="grid gap-4">
              {tool.items.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 border-b border-stone-200 pb-4 last:border-b-0">
                    <span className="mt-0.5 font-serif text-2xl text-emerald-700">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-base leading-7 text-slate-800">{item}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 px-8 py-10">
          <div className="mx-auto flex max-w-5xl flex-wrap gap-4">
            <a href="/tools" className="rounded-md border border-emerald-600 px-8 py-4 text-sm font-medium text-slate-900 transition hover:bg-white">
              All Tools
            </a>
            <a href="/contact" className="rounded-md bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-emerald-700">
              Get Help With This
            </a>
          </div>
        </section>

        <Footer />
      </main>
  )
}
