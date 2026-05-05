export const serviceAreas = [
  {
    title: 'New York',
    slug: 'new-york',
    description:
        'Accounting, tax, payroll, advisory, and managed systems support for businesses and families across New York.',
  },
  {
    title: 'New Jersey',
    slug: 'new-jersey',
    description:
        'Support for New Jersey owners, practices, service businesses, and growing teams that need financial clarity.',
  },
  {
    title: 'Connecticut',
    slug: 'connecticut',
    description:
        'Financial operations and advisory support for Connecticut businesses building cleaner books and better workflows.',
  },
]

export const serviceAreaBySlug = Object.fromEntries(
    serviceAreas.map((area) => [area.slug, area]),
)
