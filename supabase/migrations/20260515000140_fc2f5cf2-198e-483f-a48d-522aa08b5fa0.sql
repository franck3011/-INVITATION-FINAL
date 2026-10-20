
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS link_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS venue_image_url text;

UPDATE public.events
  SET link_expires_at = event_end_date
  WHERE link_expires_at IS NULL AND event_end_date IS NOT NULL;
