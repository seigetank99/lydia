import { useEffect, useMemo, useRef, useState } from 'react'

const HIDDEN_PATH_PREFIXES = ['/login', '/forgot-password', '/reset-password', '/staff-login', '/portal', '/admin', '/client-portal']
const ACCOUNT_SPECIFIC_PATTERNS = [
  'my account',
  'my document',
  'my documents',
  'my invoice',
  'my invoices',
  'my bill',
  'my billing',
  'my tax return',
  'refund',
  'audit notice',
  'irs notice',
  'legal advice',
  'tax advice',
  'private',
  'password',
  'social security',
  'ssn',
]
const STARTERS = [
  'What documents do I need for tax prep?',
  'Do you help with bookkeeping?',
  'How does the client portal work?',
  'How do I contact Lydia Financial?',
]

function isHiddenPath(pathname) {
  return HIDDEN_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

function getScriptedResponse(input) {
  const message = input.toLowerCase()

  if (ACCOUNT_SPECIFIC_PATTERNS.some((pattern) => message.includes(pattern))) {
    return 'For account-specific help, please log into your client portal or contact Lydia Financial directly.'
  }

  if (message.includes('bookkeeping') || message.includes('books') || message.includes('reconcile')) {
    return 'Lydia Financial can help organize monthly books, reconcile accounts, clean up records, and prepare financial information that is easier to use for tax planning and business decisions.'
  }

  if (message.includes('payroll') || message.includes('wage') || message.includes('employee')) {
    return 'Lydia Financial supports payroll coordination, onboarding checklists, recurring payroll records, and reporting workflows so payroll information stays aligned with accounting and tax needs.'
  }

  if (
    message.includes('formation') ||
    message.includes('entity') ||
    message.includes('llc') ||
    message.includes('corporation') ||
    message.includes('incorporate')
  ) {
    return 'For business formation and entity documents, Lydia Financial can help organize records such as formation documents, EIN letters, operating agreements, ownership details, and state registration information.'
  }

  if (
    message.includes('tax') ||
    message.includes('w-2') ||
    message.includes('1099') ||
    message.includes('tax prep') ||
    message.includes('tax preparation')
  ) {
    return 'For tax preparation, common documents include W-2s, 1099s, your prior-year return, identification, business income and expense records, and bank statements if you are self-employed or run a business.'
  }

  if (message.includes('portal') || message.includes('upload') || message.includes('download') || message.includes('secure')) {
    return 'The Lydia Financial client portal lets clients log in, upload documents securely, view requested items, see billing records, and download files through time-limited secure links.'
  }

  if (message.includes('billing') || message.includes('invoice') || message.includes('payment') || message.includes('pay')) {
    return 'Billing records may appear in the client portal. Payments are handled through hosted invoice links, so clients complete payment on a secure billing page rather than inside the Lydia Financial website.'
  }

  if (message.includes('pricing') || message.includes('price') || message.includes('cost') || message.includes('fee')) {
    return 'Pricing depends on the services, volume, cleanup needs, and ongoing support required. The best next step is to contact Lydia Financial so the team can scope the right engagement.'
  }

  if (message.includes('contact') || message.includes('call') || message.includes('email') || message.includes('talk')) {
    return 'You can contact Lydia Financial through the contact page at /contact. Share a short note about what you need and the team can follow up.'
  }

  if (message.includes('service') || message.includes('accounting') || message.includes('cfo') || message.includes('tax planning')) {
    return 'Lydia Financial provides accounting, bookkeeping, tax, payroll, advisory, and related business support for growing companies and owners.'
  }

  return 'I can help with general Lydia Financial questions about services, documents, billing, and the client portal. For account-specific help, please contact Lydia Financial directly.'
}

export default function ChatbotWidget() {
  const [isVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !isHiddenPath(window.location.pathname)
  })
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi, I can answer general questions about Lydia Financial services, document preparation, billing, and the client portal.',
    },
  ])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isOpen, messages])

  const canSend = useMemo(() => input.trim().length > 0, [input])

  function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed) return

    const response = getScriptedResponse(trimmed)
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', text: trimmed },
      { id: `assistant-${Date.now()}`, role: 'assistant', text: response },
    ])
    setInput('')
    setIsOpen(true)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!canSend) return
    sendMessage(input)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2.5rem)] flex-col items-end gap-3">
      {isOpen ? (
        <section className="w-[min(380px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">
          <div className="border-b border-stone-200 bg-slate-950 px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold">Lydia Financial Assistant</h2>
                <p className="mt-1 text-xs leading-5 text-slate-300">Ask about services, documents, or getting started.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm text-white transition hover:bg-white/10"
                aria-label="Close Lydia Financial Assistant"
              >
                x
              </button>
            </div>
          </div>

          <div className="max-h-[360px] overflow-y-auto bg-slate-50 px-4 py-4">
            <div className="grid gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === 'user'
                      ? 'ml-8 bg-emerald-600 text-white'
                      : 'mr-8 border border-stone-200 bg-white text-slate-700'
                  }`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-stone-200 bg-white p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {STARTERS.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => sendMessage(starter)}
                  className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-left text-xs leading-5 text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
                >
                  {starter}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a general question..."
                className="min-h-11 min-w-0 flex-1 rounded-xl border border-stone-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-slate-800"
        aria-expanded={isOpen}
      >
        Ask Lydia Financial
      </button>
    </div>
  )
}
