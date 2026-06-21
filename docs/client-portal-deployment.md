# Client Portal Deployment Checklist

## Supabase Setup

Run the SQL files in this order:

1. `docs/client-portal-supabase.sql`
2. `docs/client-portal-production.sql`
3. `docs/client-portal-production-v2.sql`

Create a private Supabase Storage bucket named:

```text
fidara-client-documents
```

Keep the bucket private. Client and admin downloads use short-lived signed URLs.

Cloudflare R2 is not required for the portal.

## Vercel Environment Variables

Required for the client portal:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_STORAGE_BUCKET=fidara-client-documents
PUBLIC_SUPABASE_STORAGE_BUCKET=fidara-client-documents
SESSION_COOKIE_NAME=fidara_session
PUBLIC_SITE_URL=https://www.fidaragroup.com
```

Required for contact form email delivery and recommended for portal notifications:

```env
CONTACT_TO=
CONTACT_FROM=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
PORTAL_EMAIL_FROM=
```

`PORTAL_EMAIL_FROM` is optional. If it is blank, portal notifications use `CONTACT_FROM`.

Optional site/security variables:

```env
PUBLIC_GA4_ID=
PUBLIC_GOOGLE_SITE_VERIFICATION=
PUBLIC_BING_SITE_VERIFICATION=
PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
PUBLIC_CLIENT_ERROR_REPORTING=false
CLIENT_ERROR_WEBHOOK=
CONTACT_ALERT_WEBHOOK=
```

`SUPABASE_SERVICE_ROLE_KEY` must remain server-side only. Do not expose it through `PUBLIC_*` variables or frontend code.

## Supabase Auth Email Settings

Configure Supabase Auth email templates and redirect URLs before enabling password reset and invite flows.

Add these redirect URLs in Supabase Auth settings:

```text
https://www.fidaragroup.com/reset-password
http://localhost:4321/reset-password
```

Password reset flow:

1. Client opens `/forgot-password`.
2. The browser uses `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
3. Supabase sends a reset email with redirect URL `${origin}/reset-password`.
4. Client chooses a new password on `/reset-password`.

Staff login and admin dashboard:

1. Footer `Staff Login` points to `/staff-login`.
2. `/staff-login` signs in through `POST /api/portal?action=login`.
3. After login, the page verifies staff access with `GET /api/admin?action=summary`.
4. If the account is not an admin, it logs out and shows an access-denied message.
5. `/admin` is the protected admin dashboard and should only render dashboard content after admin API verification succeeds.

Invite/link flow:

1. Admin signs in at `/staff-login`, then opens `/admin`.
2. Admin selects a client and enters email/full name in `Invite / Link Client User`.
3. If the Supabase Auth user already exists, the API upserts `profiles` and links `client_users`.
4. If the user does not exist and Supabase invite email is available, the API calls `supabase.auth.admin.inviteUserByEmail`.
5. No passwords are emailed and no insecure default passwords are created.

## Make A User Admin

Admin access is controlled by `profiles.role`.

```sql
update profiles
set role = 'admin'
where email = 'seigetank99@gmail.com';
```

Users without `role = 'admin'` receive `403` from `/api/admin`.

## Billing Model

Billing displays stored invoice records only.

- Do not collect card details in the portal.
- Do not build custom payment forms.
- Create invoices in Stripe.
- Copy the Stripe `hosted_invoice_url`.
- Add the URL to the billing item in `/admin`.
- Clients pay through the Stripe-hosted invoice page.

The portal stores `stripe_hosted_invoice_url` and optional `invoice_pdf_url` on `billing_items`.

## Email Notifications

Portal notifications use `src/lib/portalEmail.js` and the existing SMTP variables.

Notifications are sent when admin:

- creates a document request
- creates a billing item
- creates a portal message
- marks a document as completed

Email delivery is best effort. If SMTP is missing or delivery fails, the main admin action still succeeds and the server logs a warning. Emails do not include attachments, private storage keys, signed URLs, or passwords.

## Document Archive/Delete Policy

Archive:

- Admin action sets `documents.archived_at` and `documents.archived_by`.
- The physical file remains in Supabase Storage.
- Archived documents are hidden from client views by default.
- Admin can filter documents by Active, Archived, or All.

Delete:

- Admin action requires `confirm: true`.
- The physical file is removed from the `fidara-client-documents` bucket.
- The document row is retained with `deleted_at` and `deleted_by` metadata where possible.
- Deleted documents are hidden from clients and cannot produce signed download URLs.
- Audit events do not log secrets or signed URLs.

## Audit Events

Audit events are stored in `audit_events` with:

- `client_id`
- `event_type`
- `description`
- `actor_user_id`
- `metadata`

Current portal actions log:

- admin client created
- admin client user linked or invited
- admin request created or updated
- admin billing item created or updated
- admin message created or archived
- admin document status updated
- admin document archived or deleted
- client document uploaded
- client document download requested
- admin document download requested

Do not log passwords, service keys, private storage links, full signed URLs, or other secrets.

## Production Checklist

1. Run all three Supabase SQL files in order.
2. Create and verify the private `fidara-client-documents` bucket.
3. Set all required Vercel environment variables.
4. Configure Supabase Auth email templates and allowed reset redirect URLs.
5. Deploy to Vercel.
6. Make the admin user with the SQL above.
7. Visit `/login`, `/forgot-password`, `/staff-login`, `/privacy`, `/terms`, and `/security`.
8. In an incognito window, sign in at `/staff-login` with a non-admin user and confirm access is denied.
9. In an incognito window, sign in at `/staff-login` with an admin user and confirm it redirects to `/admin`.
10. Visit `/admin` while logged out and confirm it verifies access, then redirects to `/staff-login`.
11. Visit `/admin` as a non-admin user and confirm access is denied.
12. Visit `/admin` as an admin user and confirm the dashboard loads.
13. Log in as admin and create a test client.
14. Invite or link a test client user.
15. Log in as the test client and upload a PDF, JPG, PNG, XLSX, or DOCX file.
16. Confirm client upload, download, billing, requests, messages, and activity load in `/portal`.
17. Confirm admin document download, status update, archive, and delete behavior in `/admin`.
18. Confirm Stripe billing links open only on hosted Stripe pages.
19. Confirm portal notification emails send when SMTP is configured.
