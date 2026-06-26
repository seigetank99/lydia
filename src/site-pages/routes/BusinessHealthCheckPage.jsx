import { useMemo, useState } from 'react'
import { Footer, Header } from '../../components/site-core.jsx'

const questions = [
  ['Are your bank and credit card accounts reconciled every month?', '/services/bookkeeping', 'Bookkeeping'],
  ['Do you review profit margin, cash position, and upcoming obligations before making decisions?', '/services/cfo-services', 'CFO Services'],
  ['Are payroll, contractor, reimbursement, and onboarding records organized?', '/services/hr-payroll', 'HR & Payroll'],
  ['Do you review estimated tax exposure before year-end?', '/services/tax', 'Tax'],
  ['Do you know who has access to accounting, payroll, banking, and document systems?', '/contact', 'Systems Access Review'],
  ['Do you have a monthly close checklist that someone actually follows?', '/tools/monthly-close-checklist', 'Monthly Close Checklist'],
  ['Could someone else understand your records if you were unavailable for a week?', '/services/real-time-accounting', 'Real-Time Accounting'],
]

const palette = {
  paper: '#d9bd8f',
  paperLight: '#ead3aa',
  paperPanel: '#dfc49a',
  ink: '#2a1a16',
  bodyInk: 'rgba(42, 26, 22, 0.84)',
  borderInk: 'rgba(42, 26, 22, 0.42)',
  glow: '#8f542d',
  faintShadow: 'rgba(42, 26, 22, 0.18)',
}

const displaySerif = '"poynter-oldstyle-display-con", "Cormorant Garamond", "Lora", Georgia, serif'
const bodySerif = '"kandal", "Lora", Times, "Times New Roman", serif'

export default function BusinessHealthCheckPage() {
  const [answers, setAnswers] = useState({})
  const score = useMemo(() => Math.round((Object.values(answers).filter((v) => v === 'yes').length / questions.length) * 100) || 0, [answers])
  const weakAreas = useMemo(() => questions.filter((_, i) => answers[i] === 'no'), [answers])
  const answeredCount = Object.keys(answers).length
  const unansweredCount = questions.length - answeredCount

  return (
    <main
      id="main-content"
      className="health-check-page min-h-screen text-[#2b211d]"
      style={{
        backgroundColor: palette.paper,
        backgroundImage:
          'radial-gradient(circle at 18% 0%, rgba(255, 236, 188, 0.18), transparent 30%), radial-gradient(circle at 88% 12%, rgba(95, 47, 22, 0.18), transparent 34%), linear-gradient(90deg, rgba(82, 41, 20, 0.16), transparent 13%, transparent 87%, rgba(82, 41, 20, 0.14))',
        boxShadow: `inset 12px 0 120px ${palette.glow}, inset -12px 0 90px rgba(95, 47, 22, 0.28)`,
        color: palette.bodyInk,
        fontFamily: bodySerif,
      }}
    >
      <Header active="resources" />

      <section className="relative overflow-hidden px-8 pb-12 pt-8 md:pb-16 md:pt-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#2b211d_0.8px,transparent_0.8px)] [background-size:14px_14px]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 md:order-1">
            <img
              src="/images/business-health-ledger.png"
              alt=""
              className="w-full mix-blend-multiply contrast-125 sepia opacity-90"
            />
          </div>

          <div className="order-1 md:order-2">
            <p className="text-xs font-normal uppercase tracking-[0.18em]" style={{ color: palette.ink, fontFamily: bodySerif }}>
              * Business Health Check
            </p>
            <h1
              className="mt-2 max-w-4xl text-5xl font-semibold leading-none sm:text-7xl md:text-[5.6rem]"
              style={{ color: palette.ink, fontFamily: displaySerif }}
            >
              Don&apos;t let financial blind spots slow the business.
            </h1>
            <div className="mt-8 h-2 w-full" style={{ backgroundColor: palette.ink }} />
            <p
              className="mt-8 max-w-2xl text-2xl font-normal uppercase leading-[1.25] tracking-[0.14em] sm:text-3xl"
              style={{ color: palette.ink, fontFamily: bodySerif }}
            >
              Find what&apos;s clean.
              <br />
              Find what&apos;s exposed.
              <br />
              Decide what to fix first.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 px-8 py-10" style={{ borderColor: palette.ink }}>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="text-xs font-normal uppercase tracking-[0.18em]" style={{ color: palette.ink, fontFamily: bodySerif }}>* Quick diagnostic</p>
            <h2
              className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl"
              style={{ color: palette.ink, fontFamily: displaySerif }}
            >
              Seven questions that show where the operation is getting thin.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 md:justify-self-end" style={{ color: palette.bodyInk }}>
            Answer honestly. A lower score is not a verdict; it is a map for whether the next fix is bookkeeping,
            payroll, tax planning, cash flow review, or systems access.
          </p>
        </div>
      </section>

      <section className="px-8 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5">
            {questions.map(([question], index) => (
              <article
                key={question}
                className="border-2 p-5 md:p-6"
                style={{
                  backgroundColor: palette.paperLight,
                  borderColor: palette.ink,
                  boxShadow: `0 2px 20px 0 ${palette.faintShadow}`,
                }}
              >
                <div className="flex gap-4">
                  <p
                    className="text-4xl font-bold leading-none"
                    style={{ color: palette.ink, fontFamily: displaySerif }}
                  >
                    {index + 1}
                  </p>
                  <div className="flex-1">
                    <h3
                      className="text-3xl font-semibold leading-[1.02]"
                      style={{ color: palette.ink, fontFamily: displaySerif }}
                    >
                      {question}
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {['yes', 'no'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={answers[index] === value}
                          onClick={() => setAnswers({ ...answers, [index]: value })}
                          className={`min-w-24 border-2 px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] transition active:translate-x-0.5 active:translate-y-0.5 ${
                            answers[index] === value
                              ? 'bg-[#2f201d] text-[#fcedd4]'
                              : 'bg-transparent text-[#2f201d] hover:bg-[#fcedd4]'
                          }`}
                          style={{ borderColor: palette.ink }}
                        >
                          {value === 'yes' ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside
            className="h-fit border-2 p-7 lg:sticky lg:top-24"
            style={{
              backgroundColor: palette.paperPanel,
              borderColor: palette.ink,
              boxShadow: `0 2px 20px 0 ${palette.faintShadow}`,
            }}
          >
            <p className="text-xs font-normal uppercase tracking-[0.18em]" style={{ color: palette.ink, fontFamily: bodySerif }}>Score</p>
            <div className="mt-4 flex items-end gap-4 border-y-2 py-6" style={{ borderColor: palette.ink }}>
              <p
                className="text-8xl font-semibold leading-none"
                style={{ color: palette.ink, fontFamily: displaySerif }}
              >
                {score}%
              </p>
              <p className="pb-2 text-sm font-bold uppercase tracking-[0.18em]" style={{ color: palette.bodyInk }}>
                {answeredCount}/{questions.length} answered
              </p>
            </div>

            <p className="mt-5 text-sm leading-7" style={{ color: palette.bodyInk }}>
              {unansweredCount > 0
                ? `${unansweredCount} question${unansweredCount === 1 ? '' : 's'} left before the picture is complete.`
                : 'Use the flagged areas below as a first pass at what should be reviewed next.'}
            </p>

            <div className="mt-6">
              <p
                className="text-2xl font-bold leading-tight"
                style={{ color: palette.ink, fontFamily: bodySerif }}
              >
                {weakAreas.length > 0 ? '※ Needs a closer look' : 'No weak spots marked yet'}
              </p>

              <div className="mt-4 grid gap-3">
                {weakAreas.length > 0 ? (
                  weakAreas.map(([, href, label]) => (
                    <a
                      key={label + href}
                      href={href}
                      className="border-2 bg-[#fdf1dd] px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#2f201d] transition hover:bg-[#2f201d] hover:text-[#fcedd4]"
                      style={{ borderColor: palette.ink }}
                    >
                      {label}
                    </a>
                  ))
                ) : (
                  <p
                    className="border-2 border-dashed px-4 py-4 text-sm leading-7"
                    style={{ borderColor: palette.borderInk, color: palette.bodyInk }}
                  >
                    Mark any answer as No and Lydia will point you toward the most relevant next step.
                  </p>
                )}
              </div>
            </div>

            <a
              href="/contact"
              className="mt-7 inline-flex w-full justify-center border-2 bg-[#2f201d] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#fcedd4] transition hover:bg-[#2f201d]/90"
              style={{ borderColor: palette.ink }}
            >
              Review this with Lydia
            </a>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  )
}
