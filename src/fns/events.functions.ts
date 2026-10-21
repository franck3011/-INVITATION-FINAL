import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  supabaseAdmin,
  isSupabaseOnline,
  markSupabaseDown,
  markSupabaseUp,
} from "@/integrations/supabase/client.server";
import {
  saveLocalEvent,
  getLocalEventBySlug,
  getLocalEventByAdminToken,
  updateLocalEvent,
  deleteLocalEvent,
  saveLocalRsvp,
  getLocalRsvps,
  getAllLocalEvents,
  getAllLocalRsvps,
  saveLocalUpload,
} from "./local-store";


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

const programItemSchema = z.object({
  time: z.string().max(100).optional().nullable().default(""),
  title: z.string().max(300).optional().nullable().default(""),
  description: z.string().max(1000).optional().nullable(),
});

const baseFields = {
  templateId: z.string().min(1),
  title: z.string().min(1).max(200),
  hostName: z.string().max(200).optional().nullable(),
  eventDate: z.string().min(1),
  linkExpiresAt: z.string().optional().nullable(),
  location: z.string().min(1).max(500),
  mapLink: z.string().max(2000).optional().nullable(),
  venueImageUrl: z.string().optional().nullable(),
  message: z.string().max(5000).optional().nullable(),
  coverImageUrl: z.string().optional().nullable(),
  musicUrl: z.string().optional().nullable(),
  storyText: z.string().max(10000).optional().nullable(),
  themeOverrides: z
    .object({
      fontPairIndex: z.number().int().min(0).max(50).optional().nullable(),
      titleFont: z.string().max(50).optional().nullable(),
      forceEnvelope: z.boolean().optional().nullable(),
      scrollAnimation: z.string().max(50).optional().nullable(),
      layoutOverride: z.string().optional().nullable(),
      accent: z.string().max(200).optional().nullable(),
      bg: z.string().max(200).optional().nullable(),
      text: z.string().max(200).optional().nullable(),
      textColor: z.string().max(200).optional().nullable(),
      titleColor: z.string().max(200).optional().nullable(),
      titleBold: z.boolean().optional().nullable(),
      subtitleColor: z.string().max(200).optional().nullable(),
      subtitleBold: z.boolean().optional().nullable(),
      dateColor: z.string().max(200).optional().nullable(),
      dateBold: z.boolean().optional().nullable(),
      allBold: z.boolean().optional().nullable(),
      messageColor: z.string().max(200).optional().nullable(),
      extraSectionColor: z.string().max(200).optional().nullable(),
      ceremonyColor: z.string().max(200).optional().nullable(),
      fontWeightTitle: z.number().optional().nullable(),
      fontWeightSubtitle: z.number().optional().nullable(),
      fontWeightDate: z.number().optional().nullable(),
      fontWeightAll: z.number().optional().nullable(),
      builderData: z.any().optional().nullable(),
      // Couleurs enveloppe
      envelopeBody: z.string().max(200).optional().nullable(),
      envelopeFlap: z.string().max(200).optional().nullable(),
      envelopeSeal: z.string().max(200).optional().nullable(),
      envelopeSealText: z.string().max(50).optional().nullable(),
      envelopeCardBg: z.string().max(200).optional().nullable(),
      envelopeTitleText: z.string().max(300).optional().nullable(),
      envelopeTitleFont: z.string().max(50).optional().nullable(),
      // Textes personnalisables
      textInvitationPour: z.string().max(500).optional().nullable(),
      textCliquezSceau: z.string().max(500).optional().nullable(),
      textNotreHistoire: z.string().max(500).optional().nullable(),
      textLeDeroule: z.string().max(500).optional().nullable(),
      textLeLieu: z.string().max(500).optional().nullable(),
      textGalerie: z.string().max(500).optional().nullable(),
      textInfosPratiques: z.string().max(500).optional().nullable(),
      textPlusQue: z.string().max(500).optional().nullable(),
      textSouvenirs: z.string().max(500).optional().nullable(),
      textBonASavoir: z.string().max(500).optional().nullable(),
      textRsvpTitre: z.string().max(500).optional().nullable(),
      textRsvpSousTitre: z.string().max(500).optional().nullable(),
      textDressCode: z.string().max(500).optional().nullable(),
      textCadeaux: z.string().max(500).optional().nullable(),
      textHebergement: z.string().max(500).optional().nullable(),
      // Tailles de police
      fontSizeTitle: z.number().optional().nullable(),
      fontSizeSubtitle: z.number().optional().nullable(),
      fontSizeBody: z.number().optional().nullable(),
      fontSizeLabel: z.number().optional().nullable(),
      fontSizeDate: z.number().optional().nullable(),
      fontSizeMessage: z.number().optional().nullable(),
      fontSizeEnvelopeTitle: z.number().optional().nullable(),
      fontSizeEnvelopeSeal: z.number().optional().nullable(),
      // Nouveaux champs Séminaire Pro (vidéo, intervenants avec photo, logos sponsors)
      seminaireVideoUrl: z.string().max(2000).optional().nullable(),
      seminaireSpeakers: z
        .array(
          z.object({
            name: z.string().max(200),
            role: z.string().max(200).optional().nullable(),
            company: z.string().max(200).optional().nullable(),
            photoUrl: z.string().max(2000).optional().nullable(),
          }),
        )
        .optional()
        .nullable(),
      seminaireSponsorLogos: z.array(z.string().max(2000)).optional().nullable(),
      // Multilingue
      lang: z.string().max(10).optional().nullable(),
      // Liste de cadeaux (tableau d'items)
      giftList: z
        .array(
          z.object({
            title: z.string().max(300),
            description: z.string().max(1000).optional().nullable(),
            url: z.string().max(2000).optional().nullable(),
            price: z.string().max(100).optional().nullable(),
            emoji: z.string().max(50).optional().nullable(),
          }),
        )
        .optional()
        .nullable(),
    })
    .passthrough()
    .optional()
    .nullable(),
  program: z.array(programItemSchema).max(50).optional().default([]),
  galleryUrls: z.array(z.string()).max(50).optional().default([]),
  dressCode: z.string().max(1000).optional().nullable(),
  giftInfo: z.string().max(2000).optional().nullable(),
  accommodationInfo: z.string().max(2000).optional().nullable(),
  invitedCount: z.number().int().min(0).max(100000).optional().nullable(),
  maxGuestsPerRsvp: z.number().int().min(1).max(1000).optional().nullable(),
  rsvpDeadline: z.string().optional().nullable(),
  // Séminaire
  seminaireTheme: z.string().max(500).optional().nullable(),
  seminaireOrganisateur: z.string().max(500).optional().nullable(),
  seminaireIntervenants: z.string().max(5000).optional().nullable(),
  seminaireSponsors: z.string().max(2000).optional().nullable(),
  seminaireContact: z.string().max(500).optional().nullable(),
};

const createSchema = z.object(baseFields);

const SELECT_COLS = "*";

export const createEvent = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => createSchema.parse(d))
  .handler(async ({ data }) => {
    let slug = genSlug();
    if (isSupabaseOnline()) {
      try {
        for (let i = 0; i < 3; i++) {
          const { data: existing } = await supabaseAdmin
            .from("events")
            .select("id")
            .eq("slug", slug)
            .maybeSingle();
          if (!existing) break;
          slug = genSlug();
        }
      } catch (err) {
        markSupabaseDown(err);
      }
    }
    while (getLocalEventBySlug(slug)) {
      slug = genSlug();
    }
    const adminToken = genToken();
    const defaultExpiry = new Date(new Date(data.eventDate).getTime() + 2 * 24 * 3600 * 1000).toISOString();
    const eventRecord = {
      id: crypto.randomUUID ? crypto.randomUUID() : genToken(),
      slug,
      admin_token: adminToken,
      template_id: data.templateId,
      title: data.title,
      host_name: data.hostName ?? null,
      event_date: data.eventDate,
      link_expires_at: data.linkExpiresAt || defaultExpiry,
      location: data.location,
      message: data.message ?? null,
      cover_image_url: data.coverImageUrl ?? null,
      theme_overrides: {
        ...(data.themeOverrides ?? {}),
        _ext: {
          mapLink: data.mapLink ?? null,
          venueImageUrl: data.venueImageUrl ?? null,
          musicUrl: data.musicUrl ?? null,
          storyText: data.storyText ?? null,
          dressCode: data.dressCode ?? null,
          giftInfo: data.giftInfo ?? null,
          accommodationInfo: data.accommodationInfo ?? null,
          invitedCount: data.invitedCount ?? null,
          maxGuestsPerRsvp: data.maxGuestsPerRsvp ?? null,
          rsvpDeadline: data.rsvpDeadline || data.linkExpiresAt || null,
          program: data.program ?? [],
          galleryUrls: data.galleryUrls ?? [],
          seminaireTheme: data.seminaireTheme ?? null,
          seminaireOrganisateur: data.seminaireOrganisateur ?? null,
          seminaireIntervenants: data.seminaireIntervenants ?? null,
          seminaireSponsors: data.seminaireSponsors ?? null,
          seminaireContact: data.seminaireContact ?? null,
        },
      },
      created_at: new Date().toISOString(),
    };

    if (isSupabaseOnline()) {
      try {
        const { data: row, error } = await supabaseAdmin
          .from("events")
          .insert(eventRecord as any)
          .select("slug, admin_token")
          .single();
        if (!error && row) {
          markSupabaseUp();
          saveLocalEvent(eventRecord);
          return { slug: row.slug, adminToken: row.admin_token };
        }
        if (error) markSupabaseDown(error);
      } catch (err: any) {
        markSupabaseDown(err);
      }
    }
    saveLocalEvent(eventRecord);
    return { slug: eventRecord.slug, adminToken: eventRecord.admin_token };
  });

function unwrapExt(row: any) {
  if (row && row.theme_overrides && row.theme_overrides._ext) {
    const ext = row.theme_overrides._ext;
    if (ext.mapLink !== undefined) row.map_link = ext.mapLink;
    if (ext.venueImageUrl !== undefined) row.venue_image_url = ext.venueImageUrl;
    if (ext.musicUrl !== undefined) row.music_url = ext.musicUrl;
    if (ext.storyText !== undefined) row.story_text = ext.storyText;
    if (ext.dressCode !== undefined) row.dress_code = ext.dressCode;
    if (ext.giftInfo !== undefined) row.gift_info = ext.giftInfo;
    if (ext.accommodationInfo !== undefined) row.accommodation_info = ext.accommodationInfo;
    if (ext.invitedCount !== undefined) row.invited_count = ext.invitedCount;
    if (ext.maxGuestsPerRsvp !== undefined) row.max_guests_per_rsvp = ext.maxGuestsPerRsvp;
    if (ext.rsvpDeadline !== undefined) row.rsvp_deadline = ext.rsvpDeadline;
    if (ext.program !== undefined) row.program = ext.program;
    if (ext.galleryUrls !== undefined) row.gallery_urls = ext.galleryUrls;
    if (ext.seminaireTheme !== undefined) row.seminaire_theme = ext.seminaireTheme;
    if (ext.seminaireOrganisateur !== undefined) row.seminaire_organisateur = ext.seminaireOrganisateur;
    if (ext.seminaireIntervenants !== undefined) row.seminaire_intervenants = ext.seminaireIntervenants;
    if (ext.seminaireSponsors !== undefined) row.seminaire_sponsors = ext.seminaireSponsors;
    if (ext.seminaireContact !== undefined) row.seminaire_contact = ext.seminaireContact;
  }
  return row;
}

export const getEventBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    if (isSupabaseOnline()) {
      try {
        const { data: row, error } = (await supabaseAdmin
          .from("events")
          .select("*")
          .eq("slug", data.slug)
          .maybeSingle()) as any;
        if (!error && row) {
          markSupabaseUp();
          return unwrapExt(row);
        }
        if (error) {
          markSupabaseDown(error);
        }
      } catch (e) {
        markSupabaseDown(e);
      }
    }
    const local = getLocalEventBySlug(data.slug);
    if (local) return unwrapExt(local);
    return null;
  });

export const getEventByAdminToken = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ token: z.string() }).parse(d))
  .handler(async ({ data }) => {
    if (isSupabaseOnline()) {
      try {
        const { data: row, error } = (await supabaseAdmin
          .from("events")
          .select("*")
          .eq("admin_token", data.token)
          .maybeSingle()) as any;
        if (!error && row) {
          markSupabaseUp();
          const unwrappedRow = unwrapExt(row);
          const { data: rsvps } = await supabaseAdmin
            .from("rsvps")
            .select("*")
            .eq("event_id", unwrappedRow.id)
            .order("created_at", { ascending: false });
          return { event: unwrappedRow, rsvps: rsvps ?? [] };
        }
        if (error) {
          markSupabaseDown(error);
        }
      } catch (e) {
        markSupabaseDown(e);
      }
    }
    const local = getLocalEventByAdminToken(data.token);
    if (local) {
      const unwrappedRow = unwrapExt(local);
      const rsvps = getLocalRsvps(unwrappedRow.id);
      return { event: unwrappedRow, rsvps };
    }
    return null;
  });

export const syncClientEvent = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ event: z.record(z.any()) }).parse(d))
  .handler(async ({ data }) => {
    if (data.event && data.event.slug) {
      saveLocalEvent(data.event);
      return { ok: true };
    }
    return { ok: false };
  });

const rsvpSchema = z.object({
  slug: z.string(),
  name: z.string().min(1).max(120),
  status: z.enum(["yes", "no", "maybe"]),
  guestCount: z.number().int().min(0).max(100),
  dietRestrictions: z.string().max(500).optional().nullable(),
  message: z.string().max(1000).optional().nullable(),
  // Champs séminaire
  company: z.string().max(200).optional().nullable(),
  jobTitle: z.string().max(200).optional().nullable(),
  phone: z.string().max(40).optional().nullable(),
  email: z.string().email().max(200).optional().nullable(),
  // Sécurité Anti-Spam & CAPTCHA
  websiteUrl: z.string().max(200).optional().nullable(), // Honeypot (bot trap)
  formLoadedAt: z.number().optional().nullable(), // Timestamp de chargement
  turnstileToken: z.string().max(2000).optional().nullable(), // Cloudflare Turnstile token
  accompanyingNames: z.array(z.string()).optional().nullable(), // Noms des personnes en plus
});

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => rsvpSchema.parse(d))
  .handler(async ({ data }) => {
    let ev: any = null;
    try {
      const { data: row, error: e1 } = await supabaseAdmin
        .from("events")
        .select("id, link_expires_at, theme_overrides")
        .eq("slug", data.slug)
        .maybeSingle();
      if (!e1 && row) ev = row;
    } catch {
      // Supabase offline
    }
    if (!ev) {
      ev = getLocalEventBySlug(data.slug);
    }
    if (!ev) throw new Error("Event not found");

    // 1. Bouclier Pot de Miel (Honeypot) : Si un robot remplit ce champ caché, on bloque !
    if (data.websiteUrl && data.websiteUrl.trim() !== "") {
      throw new Error("Activité suspecte détectée (Honeypot activé). Soumission rejetée.");
    }
    // 2. Protection temporelle anti-script rapide : Un humain met au minimum 0.8 seconde à remplir le formulaire
    if (data.formLoadedAt && Date.now() - data.formLoadedAt < 800) {
      throw new Error("Soumission trop rapide détectée. Veuillez patienter un instant avant de valider.");
    }
    // 3. Vérification Cloudflare Turnstile (si clé secrète configurée sur Vercel)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!data.turnstileToken) {
        throw new Error("Veuillez valider le test de sécurité anti-robot (CAPTCHA).");
      }
      try {
        const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(data.turnstileToken)}`,
        });
        const verifyJson = await verifyRes.json();
        if (!verifyJson.success) {
          throw new Error("Échec de la vérification CAPTCHA. Veuillez réessayer.");
        }
      } catch (err: any) {
        if (err.message?.includes("CAPTCHA")) throw err;
        console.error("Turnstile verification error:", err);
      }
    }

    const overrides = ((ev as any).theme_overrides as Record<string, any> | null) ?? {};
    // Validation Limite du nombre de personnes autorisées par réponse
    const maxPerRsvp = overrides.maxGuestsPerRsvp ? Number(overrides.maxGuestsPerRsvp) : null;
    if (maxPerRsvp && data.guestCount > maxPerRsvp) {
      throw new Error(`Le nombre de personnes autorisé par réponse est limité à ${maxPerRsvp}.`);
    }

    const baseRsvp = {
      id: crypto.randomUUID ? crypto.randomUUID() : genToken(),
      event_id: ev.id,
      name: data.name,
      status: data.status,
      guest_count: data.guestCount,
      message: data.message ?? null,
      created_at: new Date().toISOString(),
    };
    const extraDataObj =
      data.company || data.jobTitle || data.phone || data.email || data.dietRestrictions || (data.accompanyingNames && data.accompanyingNames.length > 0)
        ? {
            company: data.company ?? null,
            jobTitle: data.jobTitle ?? null,
            phone: data.phone ?? null,
            email: data.email ?? null,
            dietRestrictions: data.dietRestrictions ?? null,
            accompanyingNames: data.accompanyingNames ?? null,
          }
        : null;

    if (isSupabaseOnline()) {
      try {
        // 4. Protection Anti-Flood / Anti-doublon (empêche le spam en boucle dans les 4 secondes)
        const { data: recentRsvps } = await supabaseAdmin
          .from("rsvps")
          .select("id, created_at")
          .eq("event_id", ev.id)
          .ilike("name", data.name.trim())
          .gt("created_at", new Date(Date.now() - 4 * 1000).toISOString());
        if (recentRsvps && recentRsvps.length > 0) {
          throw new Error("Une réponse avec ce nom vient d'être envoyée à l'instant. Veuillez patienter 4 secondes.");
        }

        let { error } = await supabaseAdmin.from("rsvps").insert({
          ...baseRsvp,
          extra_data: extraDataObj,
        } as any);

        if (error && (error.message.includes("schema cache") || error.message.includes("column") || error.message.includes("colonne"))) {
          const fallbackMessage = [
            data.message,
            data.dietRestrictions ? `[Régime: ${data.dietRestrictions}]` : null,
            data.accompanyingNames && data.accompanyingNames.length > 0 ? `[Accompagnants: ${data.accompanyingNames.join(", ")}]` : null,
            data.company ? `[Société: ${data.company}]` : null,
            data.jobTitle ? `[Poste: ${data.jobTitle}]` : null,
            data.phone ? `[Tél: ${data.phone}]` : null,
            data.email ? `[Email: ${data.email}]` : null,
          ].filter(Boolean).join(" ");

          const res = await supabaseAdmin.from("rsvps").insert({
            ...baseRsvp,
            message: fallbackMessage || null,
          } as any);
          error = res.error;
        }

        if (error) {
          markSupabaseDown(error);
        } else {
          markSupabaseUp();
        }
      } catch (err: any) {
        if (err.message && err.message.includes("Veuillez patienter 4 secondes")) {
          throw err;
        }
        markSupabaseDown(err);
      }
    }
    saveLocalRsvp({ ...baseRsvp, extra_data: extraDataObj });
    return { ok: true };
  });

export const getPublicWishes = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    let all: any[] = [];
    if (isSupabaseOnline()) {
      try {
        const { data: ev, error: evErr } = await supabaseAdmin
          .from("events")
          .select("id")
          .eq("slug", data.slug)
          .maybeSingle();
        if (evErr) {
          markSupabaseDown(evErr);
        } else if (ev) {
          const { data: rsvps, error: rsvpsErr } = await supabaseAdmin
            .from("rsvps")
            .select("name, status, guest_count, message, created_at")
            .eq("event_id", ev.id)
            .order("created_at", { ascending: false });
          if (rsvpsErr) markSupabaseDown(rsvpsErr);
          else if (rsvps && rsvps.length > 0) all = rsvps;
        }
      } catch (err) {
        markSupabaseDown(err);
      }
    }

    if (all.length === 0) {
      const localEv = getLocalEventBySlug(data.slug);
      if (localEv) {
        all = getLocalRsvps(localEv.id);
      }
    }

    const confirmed = all.filter((r: any) => r.status === "yes").length;
    const guests = all.reduce(
      (sum: number, r: any) => sum + (r.status === "yes" ? (r.guest_count ?? 0) : 0),
      0,
    );
    const wishes = all
      .filter((r: any) => (r.message ?? "").trim().length > 0)
      .slice(0, 30)
      .map((r: any) => ({
        name: r.name as string,
        status: r.status as "yes" | "no" | "maybe",
        message: r.message as string,
        created_at: r.created_at as string,
      }));
    return { wishes, confirmed, guests };
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
    const updatePayload = {
      title: data.title,
      host_name: data.hostName ?? null,
      event_date: data.eventDate,
      link_expires_at: data.linkExpiresAt || null,
      location: data.location,
      message: data.message ?? null,
      cover_image_url: data.coverImageUrl ?? null,
      theme_overrides: {
        ...(data.themeOverrides ?? {}),
        _ext: {
          mapLink: data.mapLink ?? null,
          venueImageUrl: data.venueImageUrl ?? null,
          musicUrl: data.musicUrl ?? null,
          storyText: data.storyText ?? null,
          dressCode: data.dressCode ?? null,
          giftInfo: data.giftInfo ?? null,
          accommodationInfo: data.accommodationInfo ?? null,
          invitedCount: data.invitedCount ?? null,
          maxGuestsPerRsvp: data.maxGuestsPerRsvp ?? null,
          rsvpDeadline: data.rsvpDeadline || data.linkExpiresAt || null,
          program: data.program ?? [],
          galleryUrls: data.galleryUrls ?? [],
          seminaireTheme: data.seminaireTheme ?? null,
          seminaireOrganisateur: data.seminaireOrganisateur ?? null,
          seminaireIntervenants: data.seminaireIntervenants ?? null,
          seminaireSponsors: data.seminaireSponsors ?? null,
          seminaireContact: data.seminaireContact ?? null,
        },
      },
    };

    try {
      const { error } = await supabaseAdmin
        .from("events")
        .update(updatePayload as any)
        .eq("admin_token", data.token);
      if (error) throw new Error(error.message);
      updateLocalEvent(data.token, updatePayload);
      return { ok: true };
    } catch (err: any) {
      console.warn("[updateEvent] Supabase indisponible ou en pause. Sauvegarde locale:", err?.message || err);
      const updated = updateLocalEvent(data.token, updatePayload);
      if (!updated) {
        throw new Error("Impossible de trouver l'événement à modifier.");
      }
      return { ok: true };
    }
  });

export const listAllEvents = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ token: z.string().min(1) }).parse(d))
  .handler(async ({ data }) => {
    const expected = process.env.SUPER_ADMIN_TOKEN;
    if (!expected) throw new Error("SUPER_ADMIN_TOKEN not configured");
    if (data.token !== expected) throw new Error("Unauthorized");

    let events: any[] = [];
    let rsvpCounts: any[] = [];

    try {
      const { data: evList, error } = await supabaseAdmin
        .from("events")
        .select(
          "id, slug, admin_token, template_id, title, host_name, event_date, location, created_at",
        )
        .order("created_at", { ascending: false });
      if (!error && evList) events = evList;

      const { data: rsvps } = await supabaseAdmin
        .from("rsvps")
        .select("event_id, status, guest_count");
      if (rsvps) rsvpCounts = rsvps;
    } catch {
      // Supabase offline
    }

    if (events.length === 0) {
      events = getAllLocalEvents();
      rsvpCounts = getAllLocalRsvps();
    }

    const byEvent: Record<
      string,
      { yes: number; no: number; maybe: number; guests: number; total: number }
    > = {};
    for (const r of rsvpCounts) {
      const k = (r as any).event_id as string;
      if (!byEvent[k]) byEvent[k] = { yes: 0, no: 0, maybe: 0, guests: 0, total: 0 };
      byEvent[k].total += 1;
      const st = (r as any).status as "yes" | "no" | "maybe";
      if (st) byEvent[k][st] = (byEvent[k][st] ?? 0) + 1;
      if (st === "yes") byEvent[k].guests += (r as any).guest_count ?? 0;
    }
    return { events, stats: byEvent };
  });

export const deleteEvent = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ token: z.string().min(1), eventId: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data }) => {
    const expected = process.env.SUPER_ADMIN_TOKEN;
    if (!expected) throw new Error("SUPER_ADMIN_TOKEN not configured");
    if (data.token !== expected) throw new Error("Unauthorized");
    try {
      // RSVPs first (no FK cascade defined)
      await supabaseAdmin.from("rsvps").delete().eq("event_id", data.eventId);
      await supabaseAdmin.from("events").delete().eq("id", data.eventId);
    } catch {
      // offline
    }
    deleteLocalEvent(data.eventId);
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

// Rate limiter in-memory pour les uploads (anti-flood stockage)
const uploadTimestamps: number[] = [];
const MAX_UPLOADS_PER_MINUTE = 30;

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => uploadSchema.parse(d))
  .handler(async ({ data }) => {
    const now = Date.now();
    while (uploadTimestamps.length > 0 && now - uploadTimestamps[0] > 60000) {
      uploadTimestamps.shift();
    }
    if (uploadTimestamps.length >= MAX_UPLOADS_PER_MINUTE) {
      throw new Error("Limite de téléversement temporairement atteinte (protection anti-spam). Veuillez patienter une minute.");
    }
    uploadTimestamps.push(now);
    const buf = Uint8Array.from(atob(data.base64), (c) => c.charCodeAt(0));
    const ext = ALLOWED_MEDIA[data.contentType];
    const rand = crypto.getRandomValues(new Uint8Array(6));
    const randStr = Array.from(rand, (b) => b.toString(16).padStart(2, "0")).join("");
    const path = `${Date.now()}-${randStr}.${ext}`;

    try {
      const { error } = await supabaseAdmin.storage.from("event-media").upload(path, buf, {
        contentType: data.contentType,
        upsert: false,
      });
      if (error) throw new Error(error.message);
      const { data: pub } = supabaseAdmin.storage.from("event-media").getPublicUrl(path);
      return { url: pub.publicUrl };
    } catch (err: any) {
      console.warn("[uploadMedia] Supabase storage indisponible, sauvegarde locale:", err?.message || err);
      const localUrl = saveLocalUpload(path, buf);
      return { url: localUrl };
    }
  });

