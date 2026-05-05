import fs from 'node:fs/promises'
import path from 'node:path'

const DIST_DIR = path.resolve('dist')
const MAX_JS_KB = Number(process.env.MAX_JS_KB || 380)
const MAX_CSS_KB = Number(process.env.MAX_CSS_KB || 80)

async function listFiles(dir) {
  const out = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await listFiles(full))
    else out.push(full)
  }
  return out
}

function fail(errors) {
  for (const error of errors) console.error(`✖ ${error}`)
  process.exit(1)
}

function assertIncludes(content, pattern, error, errors) {
  if (!pattern.test(content)) errors.push(error)
}

async function main() {
  const errors = []
  const files = await listFiles(DIST_DIR)
  const htmlFiles = files.filter((f) => f.endsWith('.html'))
  const jsFiles = files.filter((f) => f.endsWith('.js'))
  const cssFiles = files.filter((f) => f.endsWith('.css'))

  if (!htmlFiles.length) errors.push('No prerendered HTML files found in dist.')

  for (const file of jsFiles) {
    const stat = await fs.stat(file)
    const sizeKb = stat.size / 1024
    if (sizeKb > MAX_JS_KB) {
      errors.push(`JS budget exceeded: ${path.relative(DIST_DIR, file)} is ${sizeKb.toFixed(1)}KB (max ${MAX_JS_KB}KB).`)
    }
  }

  for (const file of cssFiles) {
    const stat = await fs.stat(file)
    const sizeKb = stat.size / 1024
    if (sizeKb > MAX_CSS_KB) {
      errors.push(`CSS budget exceeded: ${path.relative(DIST_DIR, file)} is ${sizeKb.toFixed(1)}KB (max ${MAX_CSS_KB}KB).`)
    }
  }

  for (const file of htmlFiles) {
    const rel = path.relative(DIST_DIR, file)
    const html = await fs.readFile(file, 'utf8')

    assertIncludes(html, /<title>[^<]+<\/title>/i, `${rel}: missing <title>.`, errors)
    assertIncludes(html, /<meta name="description" content="[^"]+"/i, `${rel}: missing meta description.`, errors)
    assertIncludes(html, /<link rel="canonical" href="[^"]+"/i, `${rel}: missing canonical link.`, errors)
    assertIncludes(html, /<meta property="og:title" content="[^"]+"/i, `${rel}: missing og:title.`, errors)
    assertIncludes(html, /<meta property="og:description" content="[^"]+"/i, `${rel}: missing og:description.`, errors)
    assertIncludes(html, /<meta name="twitter:card" content="summary_large_image"/i, `${rel}: missing twitter:card.`, errors)
    assertIncludes(html, /<meta name="robots" content="[^"]+"/i, `${rel}: missing robots meta.`, errors)
    assertIncludes(html, /<script type="application\/ld\+json">/i, `${rel}: missing structured data script.`, errors)
    assertIncludes(html, /id="main-content"/i, `${rel}: missing #main-content landmark.`, errors)
    assertIncludes(html, /<h1[\s>]/i, `${rel}: missing H1.`, errors)
  }

  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml')
  const robotsPath = path.join(DIST_DIR, 'robots.txt')
  try { await fs.access(sitemapPath) } catch { errors.push('Missing dist/sitemap.xml') }
  try { await fs.access(robotsPath) } catch { errors.push('Missing dist/robots.txt') }

  if (errors.length) fail(errors)
  console.log('✓ Launch gates passed')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
