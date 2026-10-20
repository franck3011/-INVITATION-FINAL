-- Add diet_restrictions to rsvps table
ALTER TABLE rsvps ADD COLUMN IF NOT EXISTS diet_restrictions text;
