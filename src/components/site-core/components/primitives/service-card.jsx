import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function ServiceCard({ title, description, image, slug }) {
  return (
      <motion.a
          href={`/services/${slug}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="group rounded-xl border border-stone-200 bg-white/60 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
      >
        <img
            src={image}
            alt={title}
            className="mx-auto mb-4 h-20 w-20 object-contain mix-blend-multiply"
        />

        <h3 className="font-serif text-xl text-slate-900">{title}</h3>

        <p className="mt-2 text-sm leading-5 text-slate-700">{description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-emerald-700">
          Learn more
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
        </span>
      </motion.a>
  )
}


export { ServiceCard }
