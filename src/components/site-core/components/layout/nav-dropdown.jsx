import { ChevronDown } from 'lucide-react'

function NavDropdown({
                       label,
                       href,
                       active,
                       items,
                       columns = 'grid-cols-1',
                       width = 'w-64',
                     }) {
  return (
      <div
          className="group relative"
      >
        <div className="flex items-center gap-1.5">
          <a
              className={`inline-flex items-center pb-2 transition hover:text-emerald-700 ${
                  active ? 'border-b border-emerald-500' : ''
              }`}
              href={href}
          >
            {label}
          </a>

          <span
              aria-hidden="true"
              className="mb-2 inline-flex rounded-sm p-1 text-slate-700 transition group-hover:text-emerald-700 group-focus-within:text-emerald-700"
          >
            <ChevronDown
                className="h-3.5 w-3.5 transition group-hover:rotate-180 group-focus-within:rotate-180"
            />
          </span>
        </div>

        <div
            className={`pointer-events-none absolute left-1/2 top-full z-30 -translate-x-1/2 pt-2 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 ${width}`}
        >
          <div className="rounded-lg border border-stone-200 bg-white/95 p-3 text-left shadow-xl backdrop-blur">
            <div className={`grid gap-1.5 ${columns}`}>
              {items.map((item) => (
                  <a
                      key={`${label}-${item.label}`}
                      href={item.href}
                      className="rounded-md px-3 py-2 text-sm leading-5 text-slate-700 transition hover:bg-[#f7f3eb] hover:text-emerald-800 focus:bg-[#f7f3eb] focus:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                  >
                    {item.label}
                  </a>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}


export { NavDropdown }
