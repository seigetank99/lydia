import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function normalizeRoute(route) {
  if (!route) return '/'
  if (!route.startsWith('/')) route = `/${route}`
  if (route !== '/' && route.endsWith('/')) route = route.slice(0, -1)
  return route
}

function routeToFilePath(outDir, route) {
  if (route === '/') return path.join(outDir, 'index.html')
  const rel = route.replace(/^\//, '')
  return path.join(outDir, rel, 'index.html')
}

function injectSeoHead(html, meta, canonicalUrl, ogImageUrl, robots, jsonLd, verifications) {
  const headInject = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    ogImageUrl ? `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    verifications.google ? `<meta name="google-site-verification" content="${escapeHtml(verifications.google)}" />` : '',
    verifications.bing ? `<meta name="msvalidate.01" content="${escapeHtml(verifications.bing)}" />` : '',
    ogImageUrl ? `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />` : '',
    jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll('</script', '<\\/script')}</script>` : '',
  ].filter(Boolean).join('\n    ')

  // Remove any existing title/description/og tags from the template.
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[\s\S]*?>/i, '')
    .replace(/<link\s+rel="canonical"[\s\S]*?>/i, '')
    .replace(/<meta\s+property="og:[\s\S]*?>/gi, '')
    .replace(/<meta\s+name="twitter:[\s\S]*?>/gi, '')
    .replace(/<meta\s+name="robots"[\s\S]*?>/gi, '')
    .replace(/<meta\s+name="google-site-verification"[\s\S]*?>/gi, '')
    .replace(/<meta\s+name="msvalidate\.01"[\s\S]*?>/gi, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '')

  return html.replace(/<\/head>/i, `    ${headInject}\n  </head>`)
}

function uniqueSorted(list) {
  return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b))
}

async function main() {
  const clientOutDir = path.resolve('dist')
  const serverOutDir = path.resolve('dist/server')
  const templatePath = path.join(clientOutDir, 'index.html')
  const serverEntryPath = path.join(serverOutDir, 'entry-server.js')

  const template = await fs.readFile(templatePath, 'utf8')
  const serverMod = await import(pathToFileURL(serverEntryPath).href)

  const {
    render,
    siteConfig,
    serviceBySlug,
    sectorBySlug,
    resourceBySlug,
    industryProfileBySlug,
    usExpansionBySlug,
    toolBySlug,
    serviceAreaBySlug,
    practiceAreaBySlug,
    taxResourceBySlug,
  } = serverMod

  const staticRoutes = [
    '/',
    '/start',
    '/about',
    '/who-we-help',
    '/case-studies',
    '/technology',
    '/client-portal',
    '/faq',
    '/services',
    '/practice-areas',
    '/sectors',
    '/industries',
    '/us-expansion',
    '/tools',
    '/launch-readiness',
    '/careers',
    '/partners',
    '/referrals',
    '/newsletter',
    '/service-areas',
    '/contact',
    '/business-health-check',
    '/tax-calendar',
    '/tax-advice',
    '/tax-resources',
    '/client-document-checklist',
    '/compliance-language',
    '/resources',
    '/onboarding',
    '/pricing',
    '/privacy',
    '/terms',
    '/disclaimer',
  ]

  const dynamicRoutes = [
    ...Object.keys(serviceBySlug).map((slug) => `/services/${slug}`),
    ...Object.keys(sectorBySlug).map((slug) => `/sectors/${slug}`),
    ...Object.keys(resourceBySlug).map((slug) => `/resources/${slug}`),
    ...Object.keys(industryProfileBySlug).map((slug) => `/industries/${slug}`),
    ...Object.keys(usExpansionBySlug).map((slug) => `/us-expansion/${slug}`),
    ...Object.keys(toolBySlug).map((slug) => `/tools/${slug}`),
    ...Object.keys(serviceAreaBySlug).map((slug) => `/service-areas/${slug}`),
    ...Object.keys(practiceAreaBySlug).map((slug) => `/practice-areas/${slug}`),
    ...Object.keys(taxResourceBySlug).map((slug) => `/tax-resources/${slug}`),
  ]

  const routes = uniqueSorted([...staticRoutes, ...dynamicRoutes].map(normalizeRoute))
  const baseUrl = (process.env.SITE_URL || siteConfig.domain || '').replace(/\/$/, '')
  const ogImagePath = process.env.OG_IMAGE || '/images/hero-mountain.png'
  const ogImageUrl = baseUrl
    ? `${baseUrl}${ogImagePath.startsWith('/') ? ogImagePath : `/${ogImagePath}`}`
    : ogImagePath

  const verifications = {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
    bing: process.env.BING_SITE_VERIFICATION || '',
  }

  function getMetaImagePath(route) {
    const exact = {
      '/about': '/images/about.png',
      '/contact': '/images/contact.png',
      '/resources': '/images/resource.png',
      '/sectors': '/images/sector.png',
      '/services': '/images/service.png',
    }
    if (exact[route]) return exact[route]
    if (route.startsWith('/services/')) return '/images/service.png'
    if (route.startsWith('/resources/')) return '/images/resource.png'
    if (route.startsWith('/sectors/')) return '/images/sector.png'
    if (route.startsWith('/industries/')) return '/images/sector.png'
    return '/images/hero-mountain.png'
  }

  function getRobotsPolicy(route) {
    const noIndex = new Set(['/launch-readiness', '/compliance-language'])
    return noIndex.has(route) ? 'noindex,nofollow' : 'index,follow'
  }

  function getStructuredData(route, canonicalUrl) {
    const org = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.companyName,
      url: baseUrl || canonicalUrl,
      email: siteConfig.email,
      logo: baseUrl ? `${baseUrl}/images/logo.png` : '/images/logo.png',
    }
    const website = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.companyName,
      url: baseUrl || canonicalUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl || ''}/resources?query={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }
    const breadcrumbItems = route === '/'
      ? [{ '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl }]
      : [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl || '/' },
        { '@type': 'ListItem', position: 2, name: route.replace(/\//g, ' ').trim() || 'Page', item: canonicalUrl },
      ]
    const breadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    }
    return [org, website, breadcrumbs]
  }

  for (const route of routes) {
    const { appHtml, meta } = render(route)
    const canonicalUrl = baseUrl ? `${baseUrl}${route === '/' ? '' : route}` : route
    const imagePath = getMetaImagePath(route)
    const ogImageForRoute = baseUrl ? `${baseUrl}${imagePath}` : imagePath
    const robots = getRobotsPolicy(route)
    const jsonLd = getStructuredData(route, canonicalUrl)

    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    )
    html = injectSeoHead(html, meta, canonicalUrl, ogImageForRoute || ogImageUrl, robots, jsonLd, verifications)

    const outPath = routeToFilePath(clientOutDir, route)
    await fs.mkdir(path.dirname(outPath), { recursive: true })
    await fs.writeFile(outPath, html, 'utf8')
  }

  if (baseUrl) {
    const sitemapEntries = routes
      .map((route) => {
        const loc = `${baseUrl}${route === '/' ? '' : route}`
        return `  <url><loc>${escapeHtml(loc)}</loc></url>`
      })
      .join('\n')

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      `${sitemapEntries}\n` +
      `</urlset>\n`

    await fs.writeFile(path.join(clientOutDir, 'sitemap.xml'), sitemap, 'utf8')

    const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`
    await fs.writeFile(path.join(clientOutDir, 'robots.txt'), robots, 'utf8')
  }

  console.log(`Prerendered ${routes.length} routes into ${clientOutDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
