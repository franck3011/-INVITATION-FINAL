-- Drop overly broad SELECT and INSERT policies on storage.objects for event-media.
-- Public file delivery uses the CDN/getPublicUrl path which does NOT require an
-- RLS SELECT policy, so removing this does not break public viewing of files
-- whose URLs are already known.

DROP POLICY IF EXISTS "Public read event media" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload event media" ON storage.objects;

-- All uploads now go through the server (supabaseAdmin / service_role), which
-- bypasses RLS, so no INSERT policy for anon is needed.