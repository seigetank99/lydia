import { CircleCheck } from 'lucide-react'
import { serviceContent } from '../data/services/index.jsx'

function ServiceDetailsSection({ service }) {
  const details = serviceContent[service.slug]

  if (!details) return null

  const columns = [
    ['Who it is for', details.whoFor],
    ['Common problems solved', details.problems],
    ['What is included', details.included],
    ['What is not included', details.notIncluded],
  ]

  return (
      <section className="border-t border-stone-200 px-8 py-14">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {columns.map(([title, items]) => (
              <article key={title} className="rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm">
                <h2 className="font-serif text-2xl leading-tight text-slate-900">
                  {title}
                </h2>

                <div className="mt-5 grid gap-3">
                  {items.map((item) => (
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
  )
}
export { ServiceDetailsSection }
