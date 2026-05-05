import { Link } from 'react-router-dom'

function AnnouncementStrip() {
  return (
      <div className="border-b border-stone-200 bg-emerald-800 px-8 py-2 text-center text-xs font-medium tracking-[0.18em] text-white">
        <Link to="/start" className="transition hover:text-emerald-100">
          Now supporting bookkeeping, tax, payroll, advisory, U.S. expansion, and managed IT for growing businesses.
        </Link>
      </div>
  )
}

export { AnnouncementStrip }
