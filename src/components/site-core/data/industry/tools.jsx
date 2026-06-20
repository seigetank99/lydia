export const toolPages = [
  {
    title: 'Business Readiness Checklist',
    slug: 'business-readiness-checklist',
    description:
        'A practical checklist for owners preparing to organize books, payroll, tax deadlines, systems, and advisory support.',
    items: [
      'Confirm entity, banking, and ownership information',
      'Gather recent tax returns and financial statements',
      'List all bank, credit card, payroll, and payment systems',
      'Document who has access to accounting, payroll, banking, and files',
      'Identify the top financial questions you need answered',
      'Review upcoming filing, payroll, and compliance deadlines',
    ],
  },
  {
    title: 'Monthly Close Checklist',
    slug: 'monthly-close-checklist',
    description:
        'A simple monthly rhythm for clean books, reconciliations, reporting, and owner review.',
    items: [
      'Reconcile bank and credit card accounts',
      'Review uncategorized and unusual transactions',
      'Confirm invoices, bills, payroll, and loan activity',
      'Check owner draws, contributions, reimbursements, and transfers',
      'Review financial statements and variance notes',
      'Save reports and supporting documents for the month',
    ],
  },
  {
    title: 'Payroll Onboarding Checklist',
    slug: 'payroll-onboarding-checklist',
    description:
        'A checklist for hiring, onboarding, payroll setup, compensation workflows, and recurring payroll review.',
    items: [
      'Collect employee and contractor information',
      'Confirm compensation, pay schedule, and approvals',
      'Set up payroll taxes, benefits, and direct deposit',
      'Document reimbursement, bonus, commission, and payroll change approvals',
      'Create a payroll change approval process',
      'Review payroll reports before and after each run',
    ],
  },
  {
    title: 'Tax Season Organizer',
    slug: 'tax-season-organizer',
    description:
        'A tax season preparation checklist for records, reports, deductions, estimates, and advisor coordination.',
    items: [
      'Collect year-end bank, loan, payroll, and tax documents',
      'Review bookkeeping cleanup items before filing',
      'Summarize major purchases, loans, and owner contributions',
      'Collect notices, estimated tax confirmations, and state account correspondence',
      'Confirm estimated payments and notices',
      'Prepare questions for tax planning and filing review',
    ],
  },
  {
    title: 'Managed IT Security Checklist',
    slug: 'managed-it-security-checklist',
    description:
        'A lightweight security checklist for users, devices, backups, vendor access, and critical business systems.',
    items: [
      'Enable multi-factor authentication on key systems',
      'Review user permissions and remove inactive accounts',
      'Confirm backups for accounting, payroll, and documents',
      'Review password manager usage and shared-login risks',
      'Document vendor contacts and support procedures',
      'Create onboarding and offboarding technology checklists',
    ],
  },
]

export const toolBySlug = Object.fromEntries(
    toolPages.map((tool) => [tool.slug, tool]),
)
