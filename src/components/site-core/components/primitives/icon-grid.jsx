import { motion } from 'framer-motion'

function IconGrid({
                    items,
                    columns = 'md:grid-cols-6',
                    rotateIcons = false,
                  }) {
  return (
      <div className={`mx-auto grid max-w-6xl grid-cols-2 gap-y-8 ${columns}`}>
        {items.map(([label, image], index) => (
            <motion.div
                key={`${label}-${image}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.025, 0.25) }}
                className={`flex flex-col items-center px-6 text-center ${
                    index % 6 !== 0 ? 'md:border-l md:border-stone-200' : ''
                }`}
            >
              <motion.img
                  src={image}
                  alt={label}
                  className="mb-3 h-20 w-20 object-contain mix-blend-multiply"
                  animate={
                    rotateIcons
                        ? { rotate: [0, 15, -15, 0] }
                        : { y: [0, -4, 0] }
                  }
                  transition={
                    rotateIcons
                        ? {
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.12,
                        }
                        : {
                          duration: 3.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.08,
                        }
                  }
                  whileHover={{ scale: 1.1 }}
              />
              <p className="text-sm leading-5 text-slate-800">{label}</p>
            </motion.div>
        ))}
      </div>
  )
}


export { IconGrid }
