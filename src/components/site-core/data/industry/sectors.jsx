export const industrySectors = [
  {
    title: 'Home & Field Services',
    slug: 'home-field-services',
    industries: [
      ['Cleaning Services', '/images/industry-cleaning-services.png'],
      ['Plumbing', '/images/industry-plumbing.png'],
      ['Electrical', '/images/industry-electrical.png'],
      ['Landscaping', '/images/industry-landscaping.png'],
      ['HVAC Services', '/images/industry-hvac-services.png'],
      ['Construction', '/images/industry-construction.png'],
    ],
  },
  {
    title: 'Health & Care Practices',
    slug: 'health-care-practices',
    industries: [
      ['Home Health Aide', '/images/industry-home-health-aide.png'],
      ['Medical Practice', '/images/industry-medical-practice.png'],
      ['Dental Practice', '/images/industry-dental-practice.png'],
      ['Veterinary Clinic', '/images/industry-veterinary-clinic.png'],
      ['Physical Therapy', '/images/industry-physical-therapy.png'],
      ['Chiropractor', '/images/industry-chiropractor.png'],
      ['Optometry', '/images/industry-optometry.png'],
    ],
  },
  {
    title: 'Food & Hospitality',
    slug: 'food-hospitality',
    industries: [
      ['Bakery', '/images/industry-bakery.png'],
      ['Chinese Takeout', '/images/industry-chinese-takeout.png'],
      ['Restaurant', '/images/industry-restaurant.png'],
      ['Coffee Shop', '/images/industry-coffee-shop.png'],
      ['Food Truck', '/images/industry-food-truck.png'],
      ['Catering', '/images/industry-catering.png'],
      ['Hospitality', '/images/industry-hospitality.png'],
    ],
  },
  {
    title: 'Personal Care & Fitness',
    slug: 'personal-care-fitness',
    industries: [
      ['Beauty Salon', '/images/industry-beauty-salon.png'],
      ['Barbershop', '/images/industry-barbershop.png'],
      ['Fitness Studio', '/images/industry-fitness-studio.png'],
      ['Yoga Studio', '/images/industry-yoga-studio.png'],
    ],
  },
  {
    title: 'Pet Services',
    slug: 'pet-services',
    industries: [
      ['Dog Grooming', '/images/industry-dog-grooming.png'],
      ['Pet Boarding', '/images/industry-pet-boarding.png'],
    ],
  },
  {
    title: 'Retail & Local Shops',
    slug: 'retail-local-shops',
    industries: [
      ['Bike Shop', '/images/industry-bike-shop.png'],
      ['Retail', '/images/industry-retail.png'],
    ],
  },
  {
    title: 'Automotive & Property',
    slug: 'automotive-property',
    industries: [
      ['Auto Repair', '/images/industry-auto-repair.png'],
      ['Real Estate', '/images/industry-real-estate.png'],
    ],
  },
  {
    title: 'Digital & Professional Services',
    slug: 'digital-professional-services',
    industries: [
      ['Legal Services', '/images/industry-legal-services.png'],
      ['IT Services', '/images/industry-it-services.png'],
      ['Marketing', '/images/industry-marketing.png'],
      ['Professional Services', '/images/industry-professional-services.png'],
      ['Photography', '/images/industry-photography.png'],
      ['Event Planning', '/images/industry-event-planning.png'],
    ],
  },
  {
    title: 'Operations & Mission-Driven',
    slug: 'operations-mission-driven',
    industries: [
      ['E-Commerce', '/images/industry-ecommerce.png'],
      ['Warehousing', '/images/industry-warehousing.png'],
      ['Education', '/images/industry-education.png'],
      ['Nonprofit', '/images/industry-nonprofit.png'],
    ],
  },
]


export const sectorBySlug = Object.fromEntries(
    industrySectors.map((sector) => [sector.slug, sector]),
)
