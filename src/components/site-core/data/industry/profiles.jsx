export const industryProfiles = [
  {
    title: 'Restaurants',
    slug: 'restaurants',
    image: '/images/industry-restaurant.png',
    description:
        'Accounting, payroll, tax, and cash flow support for restaurants, cafes, takeout businesses, food trucks, and hospitality operators.',
    priorities: ['Daily sales and deposit reconciliation', 'Payroll and tip-related workflows', 'Vendor payments and food cost visibility', 'Sales tax and deadline coordination'],
    recommendedServices: ['bookkeeping', 'tax', 'hr-payroll', 'ap-management', 'cfo-services'],
  },
  {
    title: 'Dental Practices',
    slug: 'dental-practices',
    image: '/images/industry-dental-practice.png',
    description:
        'Financial operations support for dental practices that need clearer books, payroll coordination, reporting, and advisory guidance.',
    priorities: ['Practice-level reporting', 'Payroll and provider compensation support', 'Equipment and financing visibility', 'Tax planning and cash flow review'],
    recommendedServices: ['bookkeeping', 'tax', 'hr-payroll', 'cfo-services', 'wealth-management'],
  },
  {
    title: 'Home Health Care',
    slug: 'home-health-care',
    image: '/images/industry-home-health-aide.png',
    description:
        'Support for home health aide and care businesses managing payroll, compliance deadlines, billing workflows, and growth.',
    priorities: ['Payroll and worker records', 'Billing and receivables visibility', 'Compliance calendar support', 'Cash flow and staffing analysis'],
    recommendedServices: ['bookkeeping', 'tax', 'hr-payroll', 'cfo-services', 'managed-it-services'],
  },
  {
    title: 'Construction',
    slug: 'construction',
    image: '/images/industry-construction.png',
    description:
        'Job-aware accounting and operating support for contractors, trades, field service teams, and construction businesses.',
    priorities: ['Job costing and project reporting', 'Subcontractor and vendor payment workflows', 'Payroll and compliance checkpoints', 'Equipment, insurance, and cash flow planning'],
    recommendedServices: ['bookkeeping', 'tax', 'ap-management', 'spend-management', 'cfo-services'],
  },
  {
    title: 'Managed IT Companies',
    slug: 'managed-it-companies',
    image: '/images/service-managed-it-services.png',
    description:
        'Accounting, advisory, and systems support for IT service providers managing recurring revenue, vendors, support teams, and growth.',
    priorities: ['Recurring revenue visibility', 'Vendor and subscription spend tracking', 'Payroll and team support', 'Forecasting and margin review'],
    recommendedServices: ['real-time-accounting', 'bookkeeping', 'spend-management', 'cfo-services', 'managed-it-services'],
  },
  {
    title: 'Real Estate',
    slug: 'real-estate',
    image: '/images/industry-real-estate.png',
    description:
        'Financial organization for real estate operators, property teams, investors, and service businesses supporting property operations.',
    priorities: ['Entity and property-level reporting', 'Cash flow and loan tracking', 'Vendor payments and document organization', 'Tax planning coordination'],
    recommendedServices: ['bookkeeping', 'tax', 'ap-management', 'cfo-services', 'wealth-management'],
  },
  {
    title: 'E-Commerce',
    slug: 'ecommerce',
    image: '/images/industry-ecommerce.png',
    description:
        'Support for online stores and digital commerce businesses that need clean sales reporting, inventory visibility, tax support, and systems.',
    priorities: ['Sales channel reconciliation', 'Inventory and cost visibility', 'Sales tax coordination', 'Spend, subscriptions, and platform fees'],
    recommendedServices: ['real-time-accounting', 'bookkeeping', 'tax', 'spend-management', 'cfo-services'],
  },
]

export const industryProfileBySlug = Object.fromEntries(
    industryProfiles.map((profile) => [profile.slug, profile]),
)
