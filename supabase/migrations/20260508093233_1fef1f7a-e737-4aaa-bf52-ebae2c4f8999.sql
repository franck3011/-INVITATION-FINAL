-- Restrict storage.objects SELECT on event-media to direct path lookups only.
-- Public reads via getPublicUrl() still work (they use the public CDN, not RLS).
-- This blocks anonymous LIST queries that could enumerate all uploaded files.

DROP POLICY IF EXISTS "Public read event-media" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read event-media" ON storage.objects;
DROP POLICY IF EXISTS "event-media public read" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- No SELECT policy on storage.objects for the event-media bucket means
-- anonymous clients cannot list bucket contents via the API. Files remain
-- publicly accessible through the CDN at known URLs.