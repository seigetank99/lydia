import { motion } from 'framer-motion'
import { industrySectors } from '../data/industry/index.jsx'

function IndustrySectorGrid() {
  return (
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {industrySectors.map((sector, index) => (
            <motion.article
                key={sector.slug}
                id={`sector-${sector.slug}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.2) }}
                className="scroll-mt-24 rounded-xl border border-stone-200 bg-white/60 p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                    src={sector.industries[0][1]}
                    alt=""
                    className="h-14 w-14 flex-none object-contain mix-blend-multiply"
                />
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-slate-900">
                    {sector.title}
                  </h3>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {sector.industries.map(([label]) => (
                    <span
                        key={`${sector.slug}-${label}`}
                        className="rounded-md border border-stone-200 bg-[#f7f3eb] px-3 py-1.5 text-xs leading-5 text-slate-700"
                    >
                      {label}
                    </span>
                ))}
              </div>
            </motion.article>
        ))}
      </div>
  )
}

export { IndustrySectorGrid }
