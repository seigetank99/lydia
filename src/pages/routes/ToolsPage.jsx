import { Footer, Header, toolPages } from '../../components/site-core.jsx'
import { PageHero } from '../shared-sections.jsx'

export default function ToolsPage() {
  return (
      <main id="main-content" className="min-h-screen bg-[#f7f3eb] text-slate-900">
        <Header active="resources" />

        <PageHero
            eyebrow="Tools"
            title="Checklists and planning tools for cleaner operations."
            description="Use these practical tools to prepare for bookkeeping, payroll, tax season, managed IT, and better monthly reporting."
        />

        <section className="border-t border-stone-200 px-8 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {toolPages.map((tool) => (
                <a
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <h3 className="font-serif text-3xl leading-tight text-slate-900">{tool.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{tool.description}</p>
                </a>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  )
}
