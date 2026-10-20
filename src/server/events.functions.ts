import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

function genSlug() {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let s = "";
  const arr = new Uint8Array(10);
  crypto.getRandomValues(arr);
  for (let i = 0; i < 10; i++) s += chars[arr[i] % chars.length];
  return s;
}
function genToken() {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

const programItemSchema = z
  .object({
    time: z.string().max(40).optional().default(""),
    title: z.string().max(120).optional().default(""),
    description: z.string().max(400).optional().nullable(),
  })
  .refine((p) => p.time?.trim() || p.title?.trim() || (p.description ?? "").trim(), {
    message: "Au moins un champ doit être rempli",
  });

const baseFields = {
  templateId: z.string().min(1),
  title: z.string().min(1).max(120),
  hostName: z.string().max(120).optional().nullable(),
  eventDate: z.string().min(1),
  location: z.string().min(1).max(240),
  message: z.string().max(2000).optional().nullable(),
  coverImageUrl: z.string().optional().nullable(),
  musicUrl: z.string().optional().nullable(),
  storyText: z.string().max(4000).optional().nullable(),
  program: z.array(programItemSchema).max(30).optional().default([]),
  galleryUrls: z.array(z.string()).max(30).optional().default([]),
  dressCode: z.string().max(500).optional().nullable(),
  giftInfo: z.string().max(1000).optional().nullable(),
  accommodationInfo: z.string().max(1000).optional().nullable(),
};

const createSchema = z.object(baseFields);

const SELECT_COLS =
  "id, slug, template_id, title, host_name, event_date, location, message, cover_image_url, music_url, story_text, program, gallery_urls, dress_code, gift_info, accommodation_info, created_at";

export const createEvent = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => createSchema.parse(d))
  .handler(async ({ data }) => {
    let slug = genSlug();
    for (let i = 0; i < 3; i++) {
      const { data: existing } = await supabaseAdmin
        .from("events")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();
      if (!existing) break;
      slug = genSlug();
    }
    const adminToken = genToken();
    const { data: row, error } = await supabaseAdmin
      .from("events")
      .insert({
        slug,
        admin_token: adminToken,
        template_id: data.templateId,
        title: data.title,
        host_name: data.hostName ?? null,
        event_date: data.eventDate,
        location: data.location,
        message: data.message ?? null,
        cover_image_url: data.coverImageUrl ?? null,
        music_url: data.musicUrl ?? null,
        story_text: data.storyText ?? null,
        program: data.program ?? [],
        gallery_urls: data.galleryUrls ?? [],
        dress_code: data.dressCode ?? null,
        gift_info: data.giftInfo ?? null,
        accommodation_info: data.accommodationInfo ?? null,
      })
      .select("slug, admin_token")
      .single();
    if (error || !row) throw new Error(error?.message ?? "create failed");
    return { slug: row.slug, adminToken: row.admin_token };
  });

export const getEventBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("events")
      .select(SELECT_COLS)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;
    return row;
  });

export const getEventByAdminToken = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ token: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("events")
      .select("*")
      .eq("admin_token", data.token)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;
    const { data: rsvps } = await supabaseAdmin
      .from("rsvps")
      .select("*")
      .eq("event_id", row.id)
      .order("created_at", { ascending: false });
    return { event: row, rsvps: rsvps ?? [] };
  });

const rsvpSchema = z.object({
  slug: z.string(),
  name: z.string().min(1).max(120),
  status: z.enum(["yes", "no", "maybe"]),
  guestCount: z.number().int().min(0).max(20),
  message: z.string().max(1000).optional().nullable(),
});

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => rsvpSchema.parse(d))
  .handler(async ({ data }) => {
    const { data: ev, error: e1 } = await supabaseAdmin
      .from("events")
      .select("id")
      .eq("slug", data.slug)
      .maybeSingle();
    if (e1) throw new Error(e1.message);
    if (!ev) throw new Error("Event not found");
    const { error } = await supabaseAdmin.from("rsvps").insert({
      event_id: ev.id,
      name: data.name,
      status: data.status,
      guest_count: data.guestCount,
      message: data.message ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const updateSchema = z
  .object({
    token: z.string(),
    ...baseFields,
  })
  .omit({ templateId: true });

export const updateEvent = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => updateSchema.parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("events")
      .update({
        title: data.title,
        host_name: data.hostName ?? null,
        event_date: data.eventDate,
        location: data.location,
        message: data.message ?? null,
        cover_image_url: data.coverImageUrl ?? null,
        music_url: data.musicUrl ?? null,
        story_text: data.storyText ?? null,
        program: data.program ?? [],
        gallery_urls: data.galleryUrls ?? [],
        dress_code: data.dressCode ?? null,
        gift_info: data.giftInfo ?? null,
        accommodation_info: data.accommodationInfo ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("admin_token", data.token);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const ALLOWED_MEDIA: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/ogg": "ogg",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
};

// ~11 MB decoded (base64 inflates ~33%)
const MAX_BASE64_LEN = 15_000_000;

const uploadSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z
    .string()
    .min(1)
    .max(100)
    .refine((t) => t in ALLOWED_MEDIA, { message: "Type de fichier non autorisé" }),
  base64: z.string().min(1).max(MAX_BASE64_LEN),
});

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => uploadSchema.parse(d))
  .handler(async ({ data }) => {
    const buf = Uint8Array.from(atob(data.base64), (c) => c.charCodeAt(0));
    // Derive extension server-side from the allowlisted MIME type — never trust client filename.
    const ext = ALLOWED_MEDIA[data.contentType];
    const rand = crypto.getRandomValues(new Uint8Array(6));
    const randStr = Array.from(rand, (b) => b.toString(16).padStart(2, "0")).join("");
    const path = `${Date.now()}-${randStr}.${ext}`;
    const { error } = await supabaseAdmin.storage.from("event-media").upload(path, buf, {
      contentType: data.contentType,
      upsert: false,
    });
    if (error) throw new Error(error.message);
    const { data: pub } = supabaseAdmin.storage.from("event-media").getPublicUrl(path);
    return { url: pub.publicUrl };
  });
