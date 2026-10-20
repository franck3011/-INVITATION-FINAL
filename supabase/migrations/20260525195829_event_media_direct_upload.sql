-- Allow anonymous client-side uploads to the event-media bucket (public bucket).
CREATE POLICY "Anyone can upload event-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'event-media');

CREATE POLICY "Public read event-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-media');
