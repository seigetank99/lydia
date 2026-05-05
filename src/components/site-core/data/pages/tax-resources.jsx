export const taxResourcePages = [
  {
    title: 'Individual Tax Organizer',
    slug: 'individual-tax-organizer',
    description:
        'A plain-English list of records individuals and families should gather before filing season.',
    sections: [
      ['Income documents', ['W-2s', '1099s', 'investment income forms', 'retirement income forms', 'freelance or side-income records']],
      ['Deduction and credit records', ['mortgage interest', 'charitable giving', 'student loan interest', 'childcare records', 'education expenses', 'medical records where relevant']],
      ['Life-event documents', ['marriage or divorce records', 'new dependent information', 'home purchase or sale documents', 'moving records', 'tax notices']],
    ],
  },
  {
    title: 'Small Business Tax Organizer',
    slug: 'small-business-tax-organizer',
    description:
        'A checklist for small business owners preparing books, documents, payroll records, and tax questions before filing.',
    sections: [
      ['Financial records', ['profit and loss statement', 'balance sheet', 'bank statements', 'credit card statements', 'loan statements']],
      ['Expense records', ['receipts', 'vendor bills', 'contractor payments', 'software subscriptions', 'mileage and travel logs', 'home office support where applicable']],
      ['Payroll and contractor records', ['payroll reports', 'W-2 records', '1099 contractor records', 'W-9 forms', 'benefits and reimbursement details']],
    ],
  },
  {
    title: '1099 Readiness Guide',
    slug: '1099-readiness-guide',
    description:
        'A practical guide for businesses that pay contractors, vendors, landlords, attorneys, or other service providers.',
    sections: [
      ['What to collect', ['W-9 forms', 'legal names', 'addresses', 'tax identification numbers', 'payment totals']],
      ['What to review', ['who was paid', 'how much was paid', 'what type of service was provided', 'how payments were made']],
      ['What to avoid', ['waiting until January to collect W-9s', 'mixing personal and business payments', 'ignoring vendor classification questions']],
    ],
  },
  {
    title: 'Estimated Tax Guide',
    slug: 'estimated-tax-guide',
    description:
        'A planning guide for individuals and owners who may owe tax throughout the year instead of only at filing time.',
    sections: [
      ['Who should review estimates', ['freelancers', 'business owners', 'investors with gains', 'people with under-withheld wages', 'owners with changing profits']],
      ['What affects estimates', ['profit changes', 'owner compensation', 'withholding', 'deductions', 'prior-year tax', 'state tax exposure']],
      ['Planning rhythm', ['review quarterly', 'compare actual results to expectations', 'adjust before year-end', 'keep payment records']],
    ],
  },
  {
    title: 'Year-End Planning Guide',
    slug: 'year-end-planning-guide',
    description:
        'A year-end review guide for owners and individuals who want to reduce surprises and prepare for filing season.',
    sections: [
      ['Business review', ['profitability', 'cash flow', 'equipment purchases', 'payroll records', 'retirement contributions', 'accounts receivable']],
      ['Personal review', ['withholding', 'estimated taxes', 'charitable giving', 'investment activity', 'retirement contributions', 'life events']],
      ['Before December ends', ['gather documents', 'ask planning questions', 'review notices', 'clean up books', 'confirm advisor deadlines']],
    ],
  },
]

export const taxResourceBySlug = Object.fromEntries(
    taxResourcePages.map((page) => [page.slug, page]),
)

export const clientOnboardingDocuments = [
  ['Identity and contact details', 'Basic contact information, entity details, responsible parties, and authorized contacts.'],
  ['Prior tax filings', 'Recent personal or business tax returns, notices, estimates, and filing confirmations.'],
  ['Accounting records', 'Accounting system access, bank statements, credit card statements, loans, payroll reports, and financial statements.'],
  ['Business documents', 'Entity documents, agreements, leases, insurance records, contractor files, and major purchase records.'],
  ['Payroll records', 'Payroll platform access, employee records, contractor records, W-9s, benefits, reimbursements, and payroll tax reports.'],
  ['Technology access', 'Document storage, accounting tools, payroll systems, vendor portals, and access-control information.'],
]
