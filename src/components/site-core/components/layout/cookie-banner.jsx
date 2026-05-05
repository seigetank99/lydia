import { useState } from 'react'

function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      return window.localStorage.getItem('fidara-cookie-consent') !== 'accepted'
    } catch {
      return false
    }
  })

  if (!visible) return null

  return (
      <div className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-4xl rounded-2xl border border-stone-200 bg-white/95 p-5 shadow-2xl backdrop-blur">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-sm leading-6 text-slate-700">
            Fidara may use basic analytics and cookies to understand site usage and improve the experience.
            Review the <a href="/privacy" className="font-medium text-emerald-700 hover:text-emerald-900">Privacy Policy</a> for more information.
          </p>

          <button
              type="button"
              onClick={() => {
                window.localStorage.setItem('fidara-cookie-consent', 'accepted')
                setVisible(false)
              }}
              className="rounded-md bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Accept
          </button>
        </div>
      </div>
  )
}
export { CookieBanner }
