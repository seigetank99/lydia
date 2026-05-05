export const resourceArticles = [
  {
    title: 'How to clean up messy books before tax season',
    slug: 'clean-up-messy-books',
    category: 'Bookkeeping',
    description:
        'A practical guide for organizing records, reconciling accounts, and getting financial statements ready before tax deadlines.',
    sections: [
      ['Start with the bank accounts', 'Make sure each business bank and credit card account is connected, reconciled, and reviewed for missing periods.'],
      ['Clean the chart of accounts', 'Remove duplicate categories, separate owner activity, and create categories that support useful reporting.'],
      ['Review problem transactions', 'Flag uncategorized expenses, transfers, loans, payroll entries, sales deposits, and vendor payments that need context.'],
      ['Create a monthly close rhythm', 'A clean month-end process helps tax planning, lending, cash flow, and better decision-making.'],
    ],
  },
  {
    title: 'When does a business need CFO services?',
    slug: 'when-you-need-cfo-services',
    category: 'Advisory',
    description:
        'Signs that your business needs forecasting, KPI reporting, cash planning, or strategic financial leadership.',
    sections: [
      ['You are making bigger decisions', 'Hiring, expansion, financing, pricing, and ownership decisions require more than basic bookkeeping.'],
      ['Cash flow feels unclear', 'CFO support helps forecast what is coming, not just report what already happened.'],
      ['Reports are not decision-ready', 'Better dashboards, KPIs, and variance explanations help owners understand what matters.'],
      ['You need a financial partner', 'A fractional CFO relationship gives leadership without building a full internal finance department.'],
    ],
  },
  {
    title: 'Payroll checklist for growing teams',
    slug: 'payroll-checklist',
    category: 'Payroll',
    description:
        'What to think about before hiring, expanding payroll, or coordinating employee records and payroll compliance.',
    sections: [
      ['Confirm worker classification', 'Make sure employees and contractors are set up correctly from the beginning.'],
      ['Collect onboarding records', 'Maintain tax forms, direct deposit details, wage information, and benefit elections in one organized process.'],
      ['Review payroll tax deadlines', 'Payroll tax deposits, filings, and state requirements should be tracked before the first pay run.'],
      ['Create approval workflows', 'Payroll changes, bonuses, reimbursements, and time tracking need review points as the team grows.'],
    ],
  },
  {
    title: 'Managed IT basics for small businesses',
    slug: 'managed-it-basics',
    category: 'Technology',
    description:
        'Simple systems, access controls, backups, and support workflows that protect growing teams.',
    sections: [
      ['Control user access', 'Every system should have clear ownership, user permissions, and offboarding procedures.'],
      ['Secure devices and accounts', 'Use multi-factor authentication, password management, device policies, and routine access reviews.'],
      ['Back up critical data', 'Accounting files, payroll records, contracts, and business documents need reliable backup and recovery planning.'],
      ['Create a support workflow', 'Teams need a clear place to report issues, track vendors, and resolve system problems.'],
    ],
  },
]

export const resourceBySlug = Object.fromEntries(
    resourceArticles.map((article) => [article.slug, article]),
)
