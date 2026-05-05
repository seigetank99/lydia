import { useEffect } from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import {
  industryProfileBySlug,
  practiceAreaBySlug,
  resourceBySlug,
  sectorBySlug,
  serviceAreaBySlug,
  serviceBySlug,
  siteConfig,
  taxResourceBySlug,
  toolBySlug,
  usExpansionBySlug,
} from './components/site-core.jsx'
import AboutPage from './pages/routes/AboutPage.jsx'
import BusinessHealthCheckPage from './pages/routes/BusinessHealthCheckPage.jsx'
import CareersPage from './pages/routes/CareersPage.jsx'
import CaseStudiesPage from './pages/routes/CaseStudiesPage.jsx'
import ClientDocumentChecklistPage from './pages/routes/ClientDocumentChecklistPage.jsx'
import ClientPortalPage from './pages/routes/ClientPortalPage.jsx'
import ComplianceLanguagePage from './pages/routes/ComplianceLanguagePage.jsx'
import ContactPage from './pages/routes/ContactPage.jsx'
import FAQPage from './pages/routes/FAQPage.jsx'
import HomePage from './pages/routes/HomePage.jsx'
import IndustriesIndexPage from './pages/routes/IndustriesIndexPage.jsx'
import IndustryProfilePage from './pages/routes/IndustryProfilePage.jsx'
import LaunchReadinessPage from './pages/routes/LaunchReadinessPage.jsx'
import LegalPage from './pages/routes/LegalPage.jsx'
import NewsletterPage from './pages/routes/NewsletterPage.jsx'
import NotFoundPage from './pages/routes/NotFoundPage.jsx'
import OnboardingPage from './pages/routes/OnboardingPage.jsx'
import PartnersPage from './pages/routes/PartnersPage.jsx'
import PracticeAreaPage from './pages/routes/PracticeAreaPage.jsx'
import PracticeAreasPage from './pages/routes/PracticeAreasPage.jsx'
import PricingPage from './pages/routes/PricingPage.jsx'
import ReferralsPage from './pages/routes/ReferralsPage.jsx'
import ResourceArticlePage from './pages/routes/ResourceArticlePage.jsx'
import ResourcesPage from './pages/routes/ResourcesPage.jsx'
import SectorPage from './pages/routes/SectorPage.jsx'
import SectorsIndexPage from './pages/routes/SectorsIndexPage.jsx'
import ServiceAreaDetailPage from './pages/routes/ServiceAreaDetailPage.jsx'
import ServiceAreasPage from './pages/routes/ServiceAreasPage.jsx'
import ServicePage from './pages/routes/ServicePage.jsx'
import ServicesIndexPage from './pages/routes/ServicesIndexPage.jsx'
import StartPage from './pages/routes/StartPage.jsx'
import TaxAdvicePage from './pages/routes/TaxAdvicePage.jsx'
import TaxCalendarPage from './pages/routes/TaxCalendarPage.jsx'
import TaxResourceDetailPage from './pages/routes/TaxResourceDetailPage.jsx'
import TaxResourcesPage from './pages/routes/TaxResourcesPage.jsx'
import TechnologyPage from './pages/routes/TechnologyPage.jsx'
import ToolDetailPage from './pages/routes/ToolDetailPage.jsx'
import ToolsPage from './pages/routes/ToolsPage.jsx'
import USExpansionDetailPage from './pages/routes/USExpansionDetailPage.jsx'
import USExpansionPage from './pages/routes/USExpansionPage.jsx'
import WhoWeHelpPage from './pages/routes/WhoWeHelpPage.jsx'

export function getPageMeta(path) {
  const cleanPath = path || '/'

  const defaultMeta = {
    title: 'Fidara Financial Services | Accounting, Advisory, Tax & Managed IT',
    description:
        'Fidara Financial Services provides accounting, bookkeeping, tax, payroll, advisory, U.S. expansion, and managed IT support for growing businesses.',
  }

  const exact = {
    '/tax-resources': {
      title: 'Tax Resource Library | Fidara Financial Services',
      description:
          'Tax organizers and planning guides for individuals, families, freelancers, and small business owners.',
    },
    '/client-document-checklist': {
      title: 'Client Document Checklist | Fidara Financial Services',
      description:
          'A practical checklist of records to prepare before working with Fidara on bookkeeping, tax, payroll, advisory, or managed IT.',
    },
    '/compliance-language': {
      title: 'Compliance Language Checklist | Fidara Financial Services',
      description:
          'Internal launch guidance for reviewing CPA, tax, managed IT, wealth, testimonial, and regulated website language.',
    },
    '/practice-areas': {
      title: 'Practice Areas | Fidara Financial Services',
      description:
          'Explore Fidara practice areas including individuals and families, small business accounting, bookkeeping cleanup, tax planning, tax notices, new business setup, monthly accounting, and owner advisory.',
    },
    '/launch-readiness': {
      title: 'Launch Readiness Checklist | Fidara Financial Services',
      description:
          'An internal launch-readiness checklist for Fidara website content, legal review, proof points, technical setup, and final business details.',
    },
    '/business-health-check': {
      title: 'Business Health Check | Fidara Financial Services',
      description:
          'A quick self-assessment for small business owners covering bookkeeping, cash flow, payroll, taxes, controls, and managed IT readiness.',
    },
    '/tax-calendar': {
      title: 'Tax Calendar | Fidara Financial Services',
      description:
          'A practical tax, payroll, estimated tax, sales tax, and year-end planning reminder calendar for individuals and small business owners.',
    },
    '/tax-advice': {
      title: 'Tax Advice Center | Fidara Financial Services',
      description:
          'Common tax questions for everyday people and small business owners, explained clearly with educational guidance and reminders to seek professional advice.',
    },
    '/start': {
      title: 'Start Here | Fidara Financial Services',
      description:
          'Choose the Fidara path that best matches your needs, from messy books and payroll to U.S. expansion and managed IT support.',
    },
    '/': {
      title: 'Fidara Financial Services | Financial Clarity for Life and Business',
      description:
          'Accounting, tax, advisory, payroll, technology, and strategic support for every stage of life and business.',
    },
    '/about': {
      title: 'About Fidara | Trust, Clarity & Calm Financial Structure',
      description:
          'Learn about Fidara Financial Services and the philosophy behind its accounting, advisory, tax, payroll, and technology support.',
    },
    '/services': {
      title: 'Services | Fidara Financial Services',
      description:
          'Explore Fidara services including bookkeeping, tax, CFO services, payroll, AP management, spend management, U.S. expansion, wealth coordination, and managed IT.',
    },
    '/sectors': {
      title: 'Sectors We Support | Fidara Financial Services',
      description:
          'Explore the sectors Fidara supports, including home services, health care practices, hospitality, retail, professional services, and mission-driven organizations.',
    },
    '/resources': {
      title: 'Resources | Fidara Financial Services',
      description:
          'Plain-English guides for bookkeeping, tax readiness, payroll, managed IT, CFO support, and better business operations.',
    },
    '/tools': {
      title: 'Tools & Checklists | Fidara Financial Services',
      description:
          'Practical checklists for monthly close, payroll onboarding, tax season, managed IT security, and business readiness.',
    },
    '/contact': {
      title: 'Contact Fidara | Book a Consultation',
      description:
          'Contact Fidara Financial Services to discuss accounting, tax, advisory, payroll, managed IT, or U.S. expansion support.',
    },
    '/pricing': {
      title: 'Pricing & Engagements | Fidara Financial Services',
      description:
          'Explore Fidara engagement types for foundation, growth, and strategic accounting, advisory, and technology support.',
    },
    '/technology': {
      title: 'Technology Systems | Fidara Financial Services',
      description:
          'Technology support for accounting systems, payroll systems, document management, dashboards, cybersecurity basics, and managed IT.',
    },
    '/client-portal': {
      title: 'Client Portal | Fidara Financial Services',
      description:
          'A future client portal for document uploads, reports, onboarding, scheduling, support requests, and secure client workflows.',
    },
  }

  if (exact[cleanPath]) {
    return exact[cleanPath]
  }

  if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '')
    const service = serviceBySlug[slug]
    if (service) {
      return {
        title: `${service.title} | Fidara Financial Services`,
        description: service.intro || service.description,
      }
    }
  }

  if (cleanPath.startsWith('/sectors/')) {
    const slug = cleanPath.replace('/sectors/', '')
    const sector = sectorBySlug[slug]
    if (sector) {
      return {
        title: `${sector.title} | Fidara Financial Services`,
        description: `Accounting, advisory, payroll, tax, and systems support for ${sector.title.toLowerCase()}.`,
      }
    }
  }

  if (cleanPath.startsWith('/industries/')) {
    const slug = cleanPath.replace('/industries/', '')
    const profile = industryProfileBySlug[slug]
    if (profile) {
      return {
        title: `${profile.title} Accounting & Advisory | Fidara`,
        description: profile.description,
      }
    }
  }

  if (cleanPath.startsWith('/practice-areas/')) {
    const slug = cleanPath.replace('/practice-areas/', '')
    const page = practiceAreaBySlug[slug]
    if (page) {
      return {
        title: `${page.title} | Fidara Financial Services`,
        description: page.description,
      }
    }
  }

  if (cleanPath.startsWith('/tax-resources/')) {
    const slug = cleanPath.replace('/tax-resources/', '')
    const page = taxResourceBySlug[slug]
    if (page) {
      return {
        title: `${page.title} | Fidara Financial Services`,
        description: page.description,
      }
    }
  }

  return defaultMeta
}

function getMetaImagePath(cleanPath) {
  const exact = {
    '/about': '/images/about.png',
    '/contact': '/images/contact.png',
    '/resources': '/images/resource.png',
    '/sectors': '/images/sector.png',
    '/services': '/images/service.png',
  }
  if (exact[cleanPath]) return exact[cleanPath]
  if (cleanPath.startsWith('/services/')) return '/images/service.png'
  if (cleanPath.startsWith('/resources/')) return '/images/resource.png'
  if (cleanPath.startsWith('/sectors/')) return '/images/sector.png'
  if (cleanPath.startsWith('/industries/')) return '/images/sector.png'
  return '/images/hero-mountain.png'
}

function getRobotsPolicy(cleanPath) {
  const noIndexPaths = new Set(['/launch-readiness', '/compliance-language'])
  return noIndexPaths.has(cleanPath) ? 'noindex,nofollow' : 'index,follow'
}

export function updateMetaTag(name, content, attribute = 'name') {
  if (!content) return

  let tag = document.querySelector(`meta[${attribute}="${name}"]`)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, name)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function updateLinkTag(rel, href) {
  if (!href) return
  let tag = document.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

function ServiceRoute() {
  const { slug } = useParams()
  const service = serviceBySlug[slug]
  return service ? <ServicePage service={service} /> : <NotFoundPage />
}

function SectorRoute() {
  const { slug } = useParams()
  const sector = sectorBySlug[slug]
  return sector ? <SectorPage sector={sector} /> : <NotFoundPage />
}

function ResourceRoute() {
  const { slug } = useParams()
  const article = resourceBySlug[slug]
  return article ? <ResourceArticlePage article={article} /> : <NotFoundPage />
}

function IndustryRoute() {
  const { slug } = useParams()
  const profile = industryProfileBySlug[slug]
  return profile ? <IndustryProfilePage profile={profile} /> : <NotFoundPage />
}

function USExpansionRoute() {
  const { slug } = useParams()
  const page = usExpansionBySlug[slug]
  return page ? <USExpansionDetailPage page={page} /> : <NotFoundPage />
}

function ToolRoute() {
  const { slug } = useParams()
  const tool = toolBySlug[slug]
  return tool ? <ToolDetailPage tool={tool} /> : <NotFoundPage />
}

function ServiceAreaRoute() {
  const { slug } = useParams()
  const area = serviceAreaBySlug[slug]
  return area ? <ServiceAreaDetailPage area={area} /> : <NotFoundPage />
}

function PracticeAreaRoute() {
  const { slug } = useParams()
  const page = practiceAreaBySlug[slug]
  return page ? <PracticeAreaPage page={page} /> : <NotFoundPage />
}

function TaxResourceRoute() {
  const { slug } = useParams()
  const page = taxResourceBySlug[slug]
  return page ? <TaxResourceDetailPage page={page} /> : <NotFoundPage />
}

export default function App() {
  const location = useLocation()
  const cleanPath = location.pathname.replace(/\/$/, '') || '/'
  const ga4Id = import.meta.env.VITE_GA4_ID
  const baseUrl = (siteConfig.domain || '').replace(/\/$/, '')

  useEffect(() => {
    const meta = getPageMeta(cleanPath)
    const imagePath = getMetaImagePath(cleanPath)
    const canonical = baseUrl ? `${baseUrl}${cleanPath === '/' ? '' : cleanPath}` : cleanPath
    const imageUrl = baseUrl ? `${baseUrl}${imagePath}` : imagePath
    const robots = getRobotsPolicy(cleanPath)
    document.title = meta.title
    updateMetaTag('description', meta.description)
    updateMetaTag('robots', robots)
    updateLinkTag('canonical', canonical)
    updateMetaTag('og:title', meta.title, 'property')
    updateMetaTag('og:description', meta.description, 'property')
    updateMetaTag('og:type', 'website', 'property')
    updateMetaTag('og:url', canonical, 'property')
    updateMetaTag('og:image', imageUrl, 'property')
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', meta.title)
    updateMetaTag('twitter:description', meta.description)
    updateMetaTag('twitter:image', imageUrl)
  }, [baseUrl, cleanPath])

  useEffect(() => {
    if (!ga4Id) return

    if (!document.querySelector(`script[data-ga4="${ga4Id}"]`)) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
      script.setAttribute('data-ga4', ga4Id)
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag = window.gtag || gtag
      window.gtag('js', new Date())
    }

    // Track SPA navigations.
    if (window.gtag) {
      window.gtag('config', ga4Id, { page_path: location.pathname + location.search })
    }
  }, [ga4Id, location.pathname, location.search])

  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/who-we-help" element={<WhoWeHelpPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/client-portal" element={<ClientPortalPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/services" element={<ServicesIndexPage />} />
        <Route path="/services/:slug" element={<ServiceRoute />} />
        <Route path="/practice-areas" element={<PracticeAreasPage />} />
        <Route path="/practice-areas/:slug" element={<PracticeAreaRoute />} />
        <Route path="/sectors" element={<SectorsIndexPage />} />
        <Route path="/sectors/:slug" element={<SectorRoute />} />
        <Route path="/industries" element={<IndustriesIndexPage />} />
        <Route path="/industries/:slug" element={<IndustryRoute />} />
        <Route path="/us-expansion" element={<USExpansionPage />} />
        <Route path="/us-expansion/:slug" element={<USExpansionRoute />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/:slug" element={<ToolRoute />} />
        <Route path="/launch-readiness" element={<LaunchReadinessPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/service-areas" element={<ServiceAreasPage />} />
        <Route path="/service-areas/:slug" element={<ServiceAreaRoute />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/business-health-check" element={<BusinessHealthCheckPage />} />
        <Route path="/tax-calendar" element={<TaxCalendarPage />} />
        <Route path="/tax-advice" element={<TaxAdvicePage />} />
        <Route path="/tax-resources" element={<TaxResourcesPage />} />
        <Route path="/tax-resources/:slug" element={<TaxResourceRoute />} />
        <Route path="/client-document-checklist" element={<ClientDocumentChecklistPage />} />
        <Route path="/compliance-language" element={<ComplianceLanguagePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:slug" element={<ResourceRoute />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/terms" element={<LegalPage type="terms" />} />
        <Route path="/disclaimer" element={<LegalPage type="disclaimer" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  )
}
