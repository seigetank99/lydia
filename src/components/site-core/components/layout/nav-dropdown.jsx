import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { isInternalRoute } from '../../data/index.jsx'

function NavDropdown({
                       label,
                       href,
                       active,
                       items,
                       columns = 'grid-cols-1',
                       width = 'w-64',
                     }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
      <div
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex items-center gap-1.5">
          {isInternalRoute(href) ? (
              <Link
                  className={`inline-flex items-center pb-2 transition hover:text-emerald-700 ${
                      active ? 'border-b border-emerald-500' : ''
                  }`}
                  to={href}
              >
                {label}
              </Link>
          ) : (
              <a
                  className={`inline-flex items-center pb-2 transition hover:text-emerald-700 ${
                      active ? 'border-b border-emerald-500' : ''
                  }`}
                  href={href}
              >
                {label}
              </a>
          )}

          <button
              type="button"
              aria-label={`Open ${label} menu`}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
              className="mb-2 inline-flex rounded-sm p-1 text-slate-700 transition hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          >
            <ChevronDown
                className={`h-3.5 w-3.5 transition ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <div
            className={`absolute left-1/2 top-full z-30 -translate-x-1/2 pt-2 ${width} ${
                isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            } transition duration-150`}
        >
          <div className="rounded-lg border border-stone-200 bg-white/95 p-3 text-left shadow-xl backdrop-blur">
            <div className={`grid gap-1.5 ${columns}`}>
              {items.map((item) => (
                  isInternalRoute(item.href) ? (
                      <Link
                          key={`${label}-${item.label}`}
                          to={item.href}
                          className="rounded-md px-3 py-2 text-sm leading-5 text-slate-700 transition hover:bg-[#f7f3eb] hover:text-emerald-800 focus:bg-[#f7f3eb] focus:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                      >
                        {item.label}
                      </Link>
                  ) : (
                      <a
                          key={`${label}-${item.label}`}
                          href={item.href}
                          className="rounded-md px-3 py-2 text-sm leading-5 text-slate-700 transition hover:bg-[#f7f3eb] hover:text-emerald-800 focus:bg-[#f7f3eb] focus:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                      >
                        {item.label}
                      </a>
                  )
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}


export { NavDropdown }
