export const industryProfiles = [
  {
    title: 'Restaurants',
    slug: 'restaurants',
    image: '/images/industry-restaurant.png',
    description:
        'Accounting, payroll, tax, and cash flow support for restaurants, cafes, takeout businesses, food trucks, and hospitality operators.',
    priorities: ['Daily sales and deposit reconciliation', 'Payroll and tip-related workflows', 'Vendor payments and food cost visibility', 'Sales tax and deadline coordination'],
    examples: ['Match POS deposits to bank activity and delivery platform payouts', 'Review food, labor, and vendor cost trends before margins slip', 'Coordinate payroll records, tips, and sales tax deadlines in one cleaner rhythm'],
    recommendedServices: ['bookkeeping', 'tax', 'hr-payroll', 'ap-management', 'cfo-services'],
  },
  {
    title: 'Dental Practices',
    slug: 'dental-practices',
    image: '/images/industry-dental-practice.png',
    description:
        'Financial operations support for dental practices that need clearer books, payroll coordination, reporting, and advisory guidance.',
    priorities: ['Practice-level reporting', 'Payroll and provider compensation support', 'Equipment and financing visibility', 'Tax planning and cash flow review'],
    examples: ['Organize provider payroll, owner compensation, and practice-level reporting', 'Track equipment loans, major purchases, and financing activity', 'Connect bookkeeping and tax planning before year-end decisions are rushed'],
    recommendedServices: ['bookkeeping', 'tax', 'hr-payroll', 'cfo-services', 'wealth-management'],
  },
  {
    title: 'Home Health Care',
    slug: 'home-health-care',
    image: '/images/industry-home-health-aide.png',
    description:
        'Support for home health aide and care businesses managing payroll, compliance deadlines, billing workflows, and growth.',
    priorities: ['Payroll and worker records', 'Billing and receivables visibility', 'Compliance calendar support', 'Cash flow and staffing analysis'],
    examples: ['Create cleaner payroll, contractor, and caregiver record workflows', 'Improve visibility into billing, receivables, and cash timing', 'Support reporting and systems for teams handling sensitive client information'],
    recommendedServices: ['bookkeeping', 'tax', 'hr-payroll', 'cfo-services', 'managed-it-services'],
  },
  {
    title: 'Construction',
    slug: 'construction',
    image: '/images/industry-construction.png',
    description:
        'Job-aware accounting and operating support for contractors, trades, field service teams, and construction businesses.',
    priorities: ['Job costing and project reporting', 'Subcontractor and vendor payment workflows', 'Payroll and compliance checkpoints', 'Equipment, insurance, and cash flow planning'],
    examples: ['Track job costs, vendor bills, subcontractors, and project profitability', 'Separate materials, labor, equipment, insurance, and overhead for clearer reporting', 'Use cash flow planning to prepare for deposits, draws, and large project expenses'],
    recommendedServices: ['bookkeeping', 'tax', 'ap-management', 'spend-management', 'cfo-services'],
  },
  {
    title: 'Managed IT Companies',
    slug: 'managed-it-companies',
    image: '/images/service-managed-it-services.png',
    description:
        'Accounting, advisory, and systems support for IT service providers managing recurring revenue, vendors, support teams, and growth.',
    priorities: ['Recurring revenue visibility', 'Vendor and subscription spend tracking', 'Payroll and team support', 'Forecasting and margin review'],
    examples: ['Connect recurring revenue, support labor, vendor costs, and gross margin reporting', 'Review software subscriptions and vendor spend that quietly pressure profitability', 'Build dashboards for monthly recurring revenue, churn signals, and staffing decisions'],
    recommendedServices: ['real-time-accounting', 'bookkeeping', 'spend-management', 'cfo-services', 'managed-it-services'],
  },
  {
    title: 'Real Estate',
    slug: 'real-estate',
    image: '/images/industry-real-estate.png',
    description:
        'Financial organization for real estate operators, property teams, investors, and service businesses supporting property operations.',
    priorities: ['Entity and property-level reporting', 'Cash flow and loan tracking', 'Vendor payments and document organization', 'Tax planning coordination'],
    examples: ['Organize property-level income, expenses, loans, and owner contributions', 'Track vendor payments, insurance, repairs, capital improvements, and cash flow by entity', 'Coordinate tax planning around acquisitions, sales, financing, and long-term ownership goals'],
    recommendedServices: ['bookkeeping', 'tax', 'ap-management', 'cfo-services', 'wealth-management'],
  },
  {
    title: 'E-Commerce',
    slug: 'ecommerce',
    image: '/images/industry-ecommerce.png',
    description:
        'Support for online stores and digital commerce businesses that need clean sales reporting, inventory visibility, tax support, and systems.',
    priorities: ['Sales channel reconciliation', 'Inventory and cost visibility', 'Sales tax coordination', 'Spend, subscriptions, and platform fees'],
    examples: ['Reconcile sales channels, processors, refunds, chargebacks, and platform fees', 'Improve inventory, cost of goods, and advertising spend visibility', 'Coordinate sales tax, subscriptions, and cash flow planning as channels expand'],
    recommendedServices: ['real-time-accounting', 'bookkeeping', 'tax', 'spend-management', 'cfo-services'],
  },
]

export const industryProfileBySlug = Object.fromEntries(
    industryProfiles.map((profile) => [profile.slug, profile]),
)
