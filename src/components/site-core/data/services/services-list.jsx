export const services = [
  {
    title: 'Real-Time Accounting',
    slug: 'real-time-accounting',
    description: 'Current financials that help you make decisions before the moment passes.',
    image: '/images/service-real-time-accounting.png',
    intro:
        'Real-time accounting gives owners a clearer view of the business as it is operating today — not months after the decision has already been made.',
    outcomes: [
      'Current reporting rhythms that support faster decisions',
      'Cleaner reconciliations, categories, and review checkpoints',
      'Financial statements with practical notes, not just numbers',
    ],
  },
  {
    title: 'Bookkeeping',
    slug: 'bookkeeping',
    description: 'Clean, organized books that support tax readiness, cash flow clarity, and calmer decisions.',
    image: '/images/service-bookkeeping.png',
    intro:
        'Bookkeeping is the foundation for a calmer business. Lydia Financial turns transactions, receipts, statements, and documents into records you can trust, so your numbers support real decisions instead of last-minute stress.',
    outcomes: [
      'Monthly transaction review and reconciliation support',
      'Organized records for taxes, planning, lending, and reporting',
      'Cleaner books that help owners understand what is really happening',
    ],
  },
  {
    title: 'Tax',
    slug: 'tax',
    description: 'Year-round tax clarity designed to reduce surprises and support better planning.',
    image: '/images/service-tax.png',
    intro:
        'Tax should not feel like a surprise at the end of the year. Lydia Financial helps individuals, families, and businesses prepare earlier, organize better, and understand the planning choices in front of them.',
    outcomes: [
      'Tax-ready books and document organization',
      'Estimated tax and planning conversations',
      'Coordination across bookkeeping, payroll, advisory, and filing needs',
    ],
  },
  {
    title: 'CFO Services',
    slug: 'cfo-services',
    description: 'Strategic financial guidance for owners who need more than backward-looking reports.',
    image: '/images/service-cfo-services.png',
    intro:
        'CFO support helps owners move from “what happened?” to “what should we do next?” through forecasting, planning, KPIs, cash flow discipline, and clearer financial conversations.',
    outcomes: [
      'Forecasting, budgeting, and scenario planning',
      'Owner-focused dashboards and KPI review',
      'Cash flow, margin, pricing, hiring, and growth decision support',
    ],
  },
  {
    title: 'HR & Payroll',
    slug: 'hr-payroll',
    description: 'Payroll and people workflows that keep growing teams organized and deadline-ready.',
    image: '/images/service-hr-payroll.png',
    intro:
        'As teams grow, payroll becomes more than a pay run. Lydia Financial helps organize the records, approvals, deadlines, and workflows around your people.',
    outcomes: [
      'Payroll coordination and recurring review',
      'Employee onboarding and compensation workflow support',
      'Payroll tax, benefits, reimbursements, and recordkeeping checkpoints',
    ],
  },
  {
    title: 'AP Management',
    slug: 'ap-management',
    description: 'Clear payables workflows that protect cash flow and vendor relationships.',
    image: '/images/service-ap-management.png',
    intro:
        'AP management helps owners see what needs to be paid, when cash is needed, and who should approve money leaving the business.',
    outcomes: [
      'Bill intake, approval, and payment timing workflows',
      'Vendor record organization',
      'Better visibility into upcoming cash requirements',
    ],
  },
  {
    title: 'Spend Management',
    slug: 'spend-management',
    description: 'Better visibility and control over the money leaving your business.',
    image: '/images/service-spend-management.png',
    intro:
        'Spend management helps owners understand where money is going, what should be reviewed, and which habits may be quietly hurting margins.',
    outcomes: [
      'Expense category and subscription review',
      'Card, reimbursement, and approval workflow support',
      'Practical savings opportunities and spending controls',
    ],
  },
  {
    title: 'U.S. Expansion',
    slug: 'us-expansion',
    description: 'Accounting, payroll, tax-readiness, and systems support for entering or growing in the U.S.',
    image: '/images/service-us-expansion.png',
    intro:
        'Entering or expanding in the U.S. requires more than opening accounts. Lydia Financial helps organize the financial, payroll, reporting, and document workflows behind the move.',
    outcomes: [
      'U.S. accounting and reporting foundation',
      'Payroll, vendor, and document workflow coordination',
      'Tax-readiness and advisor coordination support',
    ],
  },
  {
    title: 'Wealth Management',
    slug: 'wealth-management',
    description: 'Planning conversations that connect business performance with personal goals.',
    image: '/images/service-wealth-management.png',
    intro:
        'For owners and families, business decisions and personal goals are often connected. Lydia Financial helps bring the financial picture into one clearer conversation.',
    outcomes: [
      'Goal-based planning conversations',
      'Coordination with tax, estate, insurance, and investment advisors',
      'Owner compensation, retirement, and liquidity planning support',
    ],
  },
  {
    title: 'M&A Advisory',
    slug: 'm-and-a-advisory',
    description: 'Financial organization and advisory support for owners preparing to buy, sell, merge, or transition.',
    image: '/images/business-exit-maturity.png',
    intro:
        'M&A advisory helps owners prepare for major transactions with cleaner records, stronger financial narratives, clearer diligence materials, and practical decision support.',
    outcomes: [
      'Financial readiness review before diligence or buyer conversations',
      'Quality-of-information support around revenue, margin, expenses, and cash flow',
      'Coordination with attorneys, bankers, tax advisors, and transaction partners',
    ],
  },
]

export const serviceBySlug = Object.fromEntries(
    services.map((service) => [service.slug, service]),
)
