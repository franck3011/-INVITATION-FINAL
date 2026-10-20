ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS theme_overrides jsonb;

ALTER TABLE public.events
ADD CONSTRAINT events_theme_overrides_is_object
CHECK (theme_overrides IS NULL OR jsonb_typeof(theme_overrides) = 'object');