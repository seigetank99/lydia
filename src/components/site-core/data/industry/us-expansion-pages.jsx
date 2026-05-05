export const usExpansionPages = [
  {
    title: 'U.S. Accounting Setup',
    slug: 'accounting-setup',
    description:
        'Set up a clean U.S. accounting foundation with chart of accounts, bookkeeping workflows, reporting cadence, and document organization.',
    points: [
      'Chart of accounts and bookkeeping setup',
      'Bank, card, payroll, and vendor workflow planning',
      'Monthly reporting and close process design',
      'Document collection and recordkeeping structure',
    ],
  },
  {
    title: 'Payroll & Compliance',
    slug: 'payroll-and-compliance',
    description:
        'Coordinate payroll, employee records, contractor workflows, and compliance checkpoints for teams entering or growing in the U.S.',
    points: [
      'Payroll system coordination',
      'Employee and contractor onboarding workflows',
      'Payroll tax and deadline tracking',
      'Benefits, reimbursements, and compensation support',
    ],
  },
  {
    title: 'Entity & Tax Readiness',
    slug: 'entity-and-tax-readiness',
    description:
        'Prepare the finance and tax foundation around U.S. entity operations, filings, estimates, and advisor coordination.',
    points: [
      'Entity-aware accounting support',
      'Tax deadline and estimate planning',
      'Coordination with legal, tax, and banking advisors',
      'Cross-border reporting and document organization',
    ],
  },
  {
    title: 'Financial Systems Setup',
    slug: 'financial-systems-setup',
    description:
        'Build the tools and workflows that connect accounting, payroll, payables, documents, reporting, and internal controls.',
    points: [
      'Accounting and payroll system workflow planning',
      'AP, spend, and document process design',
      'Access controls and user management',
      'Reporting dashboards and owner visibility',
    ],
  },
]

export const usExpansionBySlug = Object.fromEntries(
    usExpansionPages.map((page) => [page.slug, page]),
)
