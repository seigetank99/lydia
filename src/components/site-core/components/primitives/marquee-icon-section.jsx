import { motion } from 'framer-motion'
import { SectionTitle } from './section-title.jsx'

function MarqueeIconSection({
                              id,
                              title,
                              items,
                              direction = 'left',
                            }) {
  const repeatedItems = [...items, ...items]
  const marqueeClass =
      direction === 'left' ? 'lydia-marquee-left' : 'lydia-marquee-right'

  return (
      <section
          id={id}
          className="scroll-mt-24 border-t border-stone-200 px-8 py-10"
      >
        <SectionTitle>{title}</SectionTitle>

        <div className="relative mx-auto max-w-7xl overflow-hidden border-y border-stone-200 py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#f7f3eb] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#f7f3eb] to-transparent" />

          <div className={`${marqueeClass} flex w-max gap-4`}>
            {repeatedItems.map(([label, image], index) => (
                <motion.div
                    key={`${label}-${index}`}
                    className="flex min-w-[190px] flex-col items-center justify-center rounded-xl border border-stone-200 bg-white/50 px-6 py-5 text-center shadow-sm"
                    whileHover={{
                      y: -4,
                      scale: 1.03,
                    }}
                >
                  <motion.img
                      src={image}
                      alt={label}
                      className="mb-3 h-20 w-20 object-contain mix-blend-multiply"
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: (index % items.length) * 0.12,
                      }}
                  />

                  <p className="text-sm leading-5 text-slate-800">{label}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export { MarqueeIconSection }
