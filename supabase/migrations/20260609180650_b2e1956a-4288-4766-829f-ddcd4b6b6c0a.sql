CREATE POLICY "Backend only events access"
ON public.events
FOR ALL
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Backend only rsvps access"
ON public.rsvps
FOR ALL
TO authenticated
USING (false)
WITH CHECK (false);