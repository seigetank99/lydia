# Fidara Site

Production React + Vite + prerender setup for the Fidara marketing site.

## Commands

- `npm run dev`: local dev server
- `npm run lint`: lint checks
- `npm run build`: client build + SSR build + prerender
- `npm run check:launch-gates`: performance/SEO/accessibility static gates on `dist/`
- `npm run ci`: full local CI (`lint` + `build` + launch gates)

## Required Environment Variables (Production)

### Site / SEO
- `SITE_URL` (optional override; defaults to configured site domain)
- `OG_IMAGE` (optional OG image path)
- `GOOGLE_SITE_VERIFICATION` (optional Search Console meta token)
- `BING_SITE_VERIFICATION` (optional Bing Webmaster meta token)

### Contact Pipeline
- `CONTACT_TO`
- `CONTACT_FROM`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

### Anti-Spam / Security (Optional but recommended)
- `TURNSTILE_SECRET_KEY` (enables server-side Turnstile validation)
- `VITE_TURNSTILE_SITE_KEY` (renders Turnstile widget on the contact form)

### Observability (Optional)
- `VITE_CLIENT_ERROR_REPORTING=true` (browser error forwarding)
- `CLIENT_ERROR_WEBHOOK` (server webhook for client JS errors)
- `CONTACT_ALERT_WEBHOOK` (webhook for new contact inquiries)

## Launch Gate Checklist (Pass/Fail)

1. `npm run ci` passes locally.
2. `/api/health` returns `200` and `{ ok: true }`.
3. Contact form submission works end-to-end in production env.
4. `sitemap.xml` and `robots.txt` are present and correct.
5. Search Console and Bing Webmaster verification tokens are configured.
6. Analytics ID (`VITE_GA4_ID`) is configured and pageview events are visible.
7. Error reporting (`VITE_CLIENT_ERROR_REPORTING`) and webhook alerting validated.

## Notes

- Build includes prerendering for all major static/dynamic routes.
- CI now fails if launch-gate checks fail (SEO tags, structured data, basic landmarks, budget thresholds).
