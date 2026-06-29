function Header({ active = 'home' }) {
  const links = [
    ['about', 'ABOUT', '/about'],
    ['values', 'OUR VALUES', '/our-values'],
    ['services', 'SERVICES', '/services'],
  ]

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-sand focus:px-4 focus:py-2 focus:text-sm focus:text-cedar focus:shadow-lg"
      >
        Skip to main content
      </a>

      <nav className="sticky top-0 z-50 border-b border-cedar/10 bg-sand/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a
            href="/"
            className="font-serif text-2xl font-medium tracking-normal text-cedar sm:text-3xl"
            aria-current={active === 'home' ? 'page' : undefined}
          >
            Lydia Financial
          </a>

          <div className="hidden items-center gap-8 sm:flex">
            {links.map(([key, label, href]) => (
              <a
                key={key}
                href={href}
                className={`text-sm font-medium transition-colors hover:text-cedar ${
                  active === key ? 'text-cedar' : 'text-cedar/75'
                }`}
                aria-current={active === key ? 'page' : undefined}
              >
                {label}
              </a>
            ))}

            <a
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-cedar py-2 pl-2 pr-3 text-sm font-medium text-sand ring-1 ring-cedar transition-transform active:scale-95"
              aria-current={active === 'contact' ? 'page' : undefined}
            >
              <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
              </svg>
              WORK WITH US
            </a>
          </div>

          <details className="relative sm:hidden">
            <summary className="flex list-none items-center gap-2 rounded-full px-3 py-2 marker:content-none">
              <span className="text-xs font-medium uppercase tracking-wider text-cedar/60">MENU</span>
            </summary>

            <div className="absolute right-0 top-full mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-cedar/10 bg-sand p-4 shadow-xl">
              <nav className="grid gap-3" aria-label="Mobile navigation">
                <a href="/about" className="text-sm font-medium text-cedar/75">ABOUT</a>
                <a href="/our-values" className="text-sm font-medium text-cedar/75">OUR VALUES</a>
                <a href="/services" className="text-sm font-medium text-cedar/75">SERVICES</a>
                <a href="/contact" className="mt-2 rounded-full bg-cedar px-4 py-2 text-center text-sm font-medium text-sand">WORK WITH US</a>
              </nav>
            </div>
          </details>
        </div>
      </nav>
    </>
  )
}

export { Header }
