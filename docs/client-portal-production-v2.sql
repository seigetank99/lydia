-- Fidara client portal production v2 migration.
-- Run after docs/client-portal-supabase.sql and docs/client-portal-production.sql.

alter table if exists documents
  add column if not exists archived_at timestamp with time zone,
  add column if not exists archived_by uuid references profiles(id),
  add column if not exists deleted_at timestamp with time zone,
  add column if not exists deleted_by uuid references profiles(id);

alter table if exists billing_items
  add column if not exists updated_at timestamp with time zone default now();

alter table if exists document_requests
  add column if not exists updated_at timestamp with time zone default now();

alter table if exists portal_messages
  add column if not exists updated_at timestamp with time zone default now(),
  add column if not exists archived_at timestamp with time zone;

update billing_items set updated_at = coalesce(updated_at, created_at, now()) where updated_at is null;
update document_requests set updated_at = coalesce(updated_at, created_at, now()) where updated_at is null;
update portal_messages set updated_at = coalesce(updated_at, created_at, now()) where updated_at is null;

create index if not exists documents_client_active_idx
  on documents (client_id, created_at desc)
  where archived_at is null and deleted_at is null;

create index if not exists documents_client_archived_idx
  on documents (client_id, archived_at desc)
  where archived_at is not null and deleted_at is null;

create index if not exists documents_client_deleted_idx
  on documents (client_id, deleted_at desc)
  where deleted_at is not null;

create index if not exists portal_messages_client_active_idx
  on portal_messages (client_id, created_at desc)
  where archived_at is null;

drop policy if exists "users can view documents linked through client_users" on documents;
create policy "users can view documents linked through client_users"
on documents
for select
to authenticated
using (
  archived_at is null
  and deleted_at is null
  and exists (
    select 1
    from client_users
    where client_users.client_id = documents.client_id
      and client_users.user_id = auth.uid()
  )
);

drop policy if exists "users can view portal messages linked through client_users" on portal_messages;
create policy "users can view portal messages linked through client_users"
on portal_messages
for select
to authenticated
using (
  archived_at is null
  and exists (
    select 1
    from client_users
    where client_users.client_id = portal_messages.client_id
      and client_users.user_id = auth.uid()
  )
);
