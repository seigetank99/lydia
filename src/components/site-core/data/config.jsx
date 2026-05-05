export const siteConfig = {
  companyName: 'Fidara Financial Services',
  legalName: 'Fidara Financial Services, LLC',
  email: 'hello@fidara.com',
  phone: 'Add phone number',
  domain: 'https://www.fidarafinancial.com',
  serviceArea: 'New York, New Jersey, Connecticut, and remote clients where appropriate',
  responseTime: '1–2 business days',
}

function mailto(subject, body) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  return `mailto:${siteConfig.email}${query ? `?${query}` : ''}`
}

function isInternalRoute(href) {
  return typeof href === 'string' && href.startsWith('/') && !href.includes('#')
}

export { isInternalRoute, mailto }
