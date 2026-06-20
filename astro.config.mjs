import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://www.fidaragroup.com',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      filter: (page) => ![
        'https://www.fidaragroup.com/compliance-language/',
        'https://www.fidaragroup.com/launch-readiness/',
      ].includes(page),
    }),
  ],
})
