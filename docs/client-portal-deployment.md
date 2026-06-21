# Client Portal Deployment Checklist

## Supabase setup

1. Create the Supabase project.
2. Run `docs/client-portal-supabase.sql`.
3. Run `docs/client-portal-production.sql`.
4. Create a private Supabase Storage bucket named `fidara-client-documents`.
5. Confirm the bucket remains private.

Cloudflare R2 is no longer required for the portal.

## Production environment variables

Add these in Vercel Project Settings:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_STORAGE_BUCKET=fidara-client-documents
PUBLIC_SUPABASE_STORAGE_BUCKET=fidara-client-documents
SESSION_COOKIE_NAME=fidara_session
```

`SUPABASE_SERVICE_ROLE_KEY` must stay server-side only. Do not expose it in frontend code or public env vars.

## Create a client user

1. Create the auth user in Supabase Auth.
2. Insert a matching profile row if your auth hook does not already do it:

```sql
insert into profiles (id, email, full_name, role)
values ('AUTH_USER_UUID', 'client@example.com', 'Client User', 'client')
on conflict (id) do update
set email = excluded.email,
    full_name = excluded.full_name;
```

3. Create the client row:

```sql
insert into clients (name, business_name)
values ('Client User', 'Example Business LLC')
returning id;
```

4. Link the user to the client:

```sql
insert into client_users (client_id, user_id)
values ('CLIENT_UUID', 'AUTH_USER_UUID')
on conflict (client_id, user_id) do nothing;
```

## Make a user admin

Admin access is controlled by `profiles.role`.

```sql
update profiles
set role = 'admin'
where id = 'AUTH_USER_UUID';
```

Users without `role = 'admin'` will receive `403` on `/admin` APIs.

## Billing model

Billing is an MVP that displays stored invoice records only.

- Do not collect card details in the portal.
- Do not build custom payment forms.
- Payments should go through hosted Stripe invoice URLs stored in `billing_items.stripe_hosted_invoice_url`.

Example invoice seed:

```sql
insert into billing_items (
  client_id,
  title,
  description,
  amount_cents,
  currency,
  status,
  due_date,
  stripe_hosted_invoice_url,
  invoice_pdf_url
) values (
  'CLIENT_UUID',
  'Monthly accounting services',
  'June monthly bookkeeping and close support.',
  125000,
  'usd',
  'open',
  current_date + interval '7 days',
  'https://invoice.stripe.com/test_example',
  'https://example.com/invoice.pdf'
);
```

## Requests, messages, and audit activity

Example request seed:

```sql
insert into document_requests (client_id, title, description, status, due_date)
values (
  'CLIENT_UUID',
  'Upload June bank statements',
  'Please upload the finalized June operating and payroll bank statements.',
  'open',
  current_date + interval '5 days'
);
```

Example message seed:

```sql
insert into portal_messages (client_id, title, body, created_by)
values (
  'CLIENT_UUID',
  'Month-end close started',
  'We have started your month-end review and will follow up if anything additional is needed.',
  'Fidara Group'
);
```

Audit events are stored in `audit_events`. The portal now writes events for document upload and download requests automatically once the table exists.

## Final test checklist

1. Visit `/login`.
2. Log in as a linked client user.
3. Confirm redirect to `/portal`.
4. Upload one PDF, JPG, PNG, XLSX, or DOCX file.
5. Confirm the document appears in Recent Documents.
6. Confirm the upload appears in Recent Activity.
7. Click Download and confirm the file opens from a signed Supabase Storage URL.
8. Insert a billing record and confirm the Billing section shows the hosted invoice link.
9. Insert a document request and confirm Requested Items renders correctly.
10. Insert a portal message and confirm Messages and Notes renders correctly.
11. Log in as an admin user and visit `/admin`.
12. Confirm admin stats load.
13. Confirm admin Recent Client Documents loads and secure downloads work.
