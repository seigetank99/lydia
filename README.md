# Lydia Financial Site

Astro static marketing site with React islands for interactive forms and Vercel
functions for contact delivery, health checks, and optional client-error
reporting.

## Local development

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

The Astro development server does not emulate the root-level Vercel functions
in `api/`. Use a Vercel preview deployment for end-to-end form testing.

## Commands

- `npm run dev`: start Astro locally
- `npm run lint`: run ESLint
- `npm run check:api`: smoke-test API handler behavior
- `npm run build`: build the static site into `dist/`
- `npm run preview`: serve the production build locally
- `npm run check:launch-gates`: validate generated metadata, landmarks,
  sitemap files, and asset budgets
- `npm run ci`: run every local release check

## Production environment variables

Copy `.env.example` for the complete list. Configure production values in
Vercel rather than committing a populated `.env` file.

Required for contact email delivery:

- `CONTACT_TO`
- `CONTACT_FROM`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

Recommended anti-spam configuration:

- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

Both Turnstile values must be configured together. Variables prefixed with
`PUBLIC_` are embedded in the browser build and are not secrets.

Optional analytics and alerting:

- `PUBLIC_GA4_ID`
- `PUBLIC_CLIENT_ERROR_REPORTING=true`
- `CLIENT_ERROR_WEBHOOK`
- `CONTACT_ALERT_WEBHOOK`

## Deployment

Vercel should detect Astro and use:

- Build command: `npm run build`
- Output directory: `dist`

The root-level `api/` directory is deployed as Vercel functions. No catch-all
rewrite is configured, so unknown paths use the generated `404.html` instead
of returning the homepage with a false `200` response.

## Release checklist

1. Run `npm run ci`.
2. Deploy a Vercel preview with production-equivalent environment variables.
3. Confirm `/api/health` returns `200` with `{ "ok": true }`.
4. Submit the contact form and verify email delivery and `replyTo`.
5. Confirm Turnstile blocks a submission without a valid token.
6. Verify analytics and optional webhook alerts.
7. Check desktop and mobile navigation, forms, and the generated 404 page.
8. Confirm `robots.txt`, `sitemap-index.xml`, and `sitemap-0.xml` are public.
