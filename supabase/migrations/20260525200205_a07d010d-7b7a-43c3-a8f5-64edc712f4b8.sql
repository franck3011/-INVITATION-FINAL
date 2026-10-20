
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  admin_token TEXT NOT NULL UNIQUE,
  template_id TEXT NOT NULL,
  title TEXT NOT NULL,
  host_name TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  link_expires_at TIMESTAMPTZ,
  location TEXT NOT NULL,
  map_link TEXT,
  venue_image_url TEXT,
  message TEXT,
  cover_image_url TEXT,
  music_url TEXT,
  story_text TEXT,
  program JSONB NOT NULL DEFAULT '[]'::jsonb,
  gallery_urls TEXT[] NOT NULL DEFAULT '{}'::text[],
  dress_code TEXT,
  gift_info TEXT,
  accommodation_info TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('yes','no','maybe')),
  guest_count INTEGER NOT NULL DEFAULT 1 CHECK (guest_count >= 0 AND guest_count <= 20),
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_rsvps_event_id ON public.rsvps(event_id);
CREATE INDEX idx_events_slug ON public.events(slug);
CREATE INDEX idx_events_admin_token ON public.events(admin_token);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- All reads/writes go through server functions using service_role (bypasses RLS).
-- No public RLS policies on events/rsvps.

-- Storage bucket for event media (cover images, music, gallery)
INSERT INTO storage.buckets (id, name, public) VALUES ('event-media', 'event-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anonymous client-side uploads + public read via CDN
CREATE POLICY "Anyone can upload event-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'event-media');

CREATE POLICY "Public read event-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-media');
