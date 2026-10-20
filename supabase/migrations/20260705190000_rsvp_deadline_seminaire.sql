-- Nouvelles colonnes pour la gestion de la clôture RSVP, 
-- le nombre d'invitations, et les séminaires/conférences.

-- Table events
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS rsvp_deadline TIMESTAMPTZ;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS invited_count INTEGER;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS seminaire_theme TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS seminaire_organisateur TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS seminaire_intervenants TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS seminaire_sponsors TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS seminaire_contact TEXT;

-- Table rsvps : extra_data JSONB pour les champs séminaire (entreprise, poste, email, téléphone)
ALTER TABLE public.rsvps ADD COLUMN IF NOT EXISTS extra_data JSONB;
