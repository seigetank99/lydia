import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { getPageMeta } from './App.jsx'

import {
  industryProfileBySlug,
  practiceAreaBySlug,
  resourceBySlug,
  sectorBySlug,
  serviceAreaBySlug,
  siteConfig,
  serviceBySlug,
  taxResourceBySlug,
  toolBySlug,
  usExpansionBySlug,
} from './components/site-core.jsx'

export {
  industryProfileBySlug,
  practiceAreaBySlug,
  resourceBySlug,
  sectorBySlug,
  serviceAreaBySlug,
  siteConfig,
  serviceBySlug,
  taxResourceBySlug,
  toolBySlug,
  usExpansionBySlug,
}

export function render(url) {
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )

  const cleanPath = url.replace(/\/$/, '') || '/'
  const meta = getPageMeta(cleanPath)

  return {
    appHtml,
    meta,
  }
}
