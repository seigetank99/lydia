import { siteConfig } from '../../data/index.jsx'

function Footer() {
  return (
    <footer className="border-t border-cedar/10 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 sm:col-span-2">
            <span className="font-serif text-xl text-cedar">Lydia</span>
            <p className="max-w-[30ch] text-sm text-cedar/55">
              Financial advisory rooted in principle. Serving the dreamers and doers of the small business community.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-moss">Navigation</h4>
            <div className="flex flex-col gap-2">
              <a href="/about" className="text-sm text-cedar/75 transition-colors hover:text-cedar">About</a>
              <a href="/our-values" className="text-sm text-cedar/75 transition-colors hover:text-cedar">Our Values</a>
              <a href="/services" className="text-sm text-cedar/75 transition-colors hover:text-cedar">Services</a>
              <a href="/contact" className="text-sm text-cedar/75 transition-colors hover:text-cedar">Contact</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-moss">Contact</h4>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${siteConfig.email}`} className="text-sm text-cedar/75 transition-colors hover:text-cedar">{siteConfig.email}</a>
              <a href={`tel:${siteConfig.phone}`} className="text-sm text-cedar/75 transition-colors hover:text-cedar">(516) 646-1015</a>
              <p className="text-sm text-cedar/75">Mon - Fri: 9am - 5pm</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-cedar/10 pt-8 sm:flex-row">
          <p className="text-[10px] font-medium uppercase tracking-widest text-cedar/45">
            © 2026 Lydia Financial LLC
          </p>
          <p className="text-[10px] font-medium uppercase tracking-widest text-cedar/45">Stewardship first</p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
