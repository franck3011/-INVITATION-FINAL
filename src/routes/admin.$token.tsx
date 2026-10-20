import { createFileRoute, notFound, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getEventByAdminToken, updateEvent, uploadMedia, syncClientEvent } from "@/fns/events.functions";
import { TITLE_FONT_OPTIONS } from "@/components/preview-invitation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";
import { StatsPanel } from "@/components/admin/stats-panel";
import { RsvpTable } from "@/components/admin/rsvp-table";
import { SeatingPlan } from "@/components/admin/seating-plan";
import { supabase } from "@/integrations/supabase/client";

/** Published URL — public, no login required. Used for QR / share links. */
const STABLE_PUBLISHED_ORIGIN = "https://preview-my-choice.lovable.app";

function isPreviewHost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".lovableproject.com") ||
    hostname.includes("id-preview--") ||
    hostname.endsWith(".lovable.dev")
  );
}

function getShareOrigin(): string {
  if (typeof window === "undefined") return STABLE_PUBLISHED_ORIGIN;
  const host = window.location.hostname;
  // Login-walled preview hosts → swap for the published URL that guests can open without an account.
  if (isPreviewHost(host)) return STABLE_PUBLISHED_ORIGIN;
  return window.location.origin;
}

export const Route = createFileRoute("/admin/$token")({
  loader: async ({ params }) => {
    const res = await getEventByAdminToken({ data: { token: params.token } });
    return res ?? { event: null, rsvps: [], token: params.token };
  },
  head: () => ({
    meta: [{ title: "Tableau de bord — Inviti" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminDashboard,
  notFoundComponent: () => (
    <div className="p-12 text-center">
      <h1 className="font-display text-3xl text-primary">Lien admin invalide</h1>
    </div>
  ),
});

function AdminDashboard() {
  const loaderData = Route.useLoaderData();
  const syncEvent = useServerFn(syncClientEvent);
  const [event, setEvent] = useState<any>(() => {
    if (loaderData.event) return loaderData.event;
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(`inviti_admin_${(loaderData as any).token}`);
        if (cached) return JSON.parse(cached);
      } catch {}
    }
    return null;
  });

  useEffect(() => {
    if (!loaderData.event && event) {
      syncEvent({ data: { event } }).catch(() => {});
    }
  }, [loaderData.event, event, syncEvent]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background text-center">
        <div className="max-w-md space-y-3">
          <div className="text-5xl">🔒</div>
          <h1 className="font-display text-3xl text-primary">Lien admin invalide</h1>
          <p className="text-muted-foreground text-sm">
            Ce tableau de bord semble introuvable ou a été supprimé.
          </p>
          <a
            href="/"
            className="inline-block mt-4 px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  const rsvps = loaderData.rsvps ?? [];
  const router = useRouter();
  const update = useServerFn(updateEvent);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: event.title,
    hostName: event.host_name ?? "",
    eventDate: new Date(event.event_date).toISOString().slice(0, 16),
    linkExpiresAt: event.link_expires_at
      ? new Date(event.link_expires_at).toISOString().slice(0, 16)
      : "",
    rsvpDeadline: (event as any).rsvp_deadline
      ? new Date((event as any).rsvp_deadline).toISOString().slice(0, 16)
      : "",
    location: event.location,
    mapLink: (event as any).map_link ?? "",
    message: event.message ?? "",
    titleFont: ((event as any).theme_overrides?.titleFont as any) || "auto",
    invitedCount: (event as any).invited_count ? String((event as any).invited_count) : "",
    maxGuestsPerRsvp: (event as any).max_guests_per_rsvp || (event as any).theme_overrides?._ext?.maxGuestsPerRsvp ? String((event as any).max_guests_per_rsvp || (event as any).theme_overrides?._ext?.maxGuestsPerRsvp) : "",
  });

  const qrWrapRef = useRef<HTMLDivElement>(null);
  const qrHiResRef = useRef<HTMLDivElement>(null);
  const [rsvpsState, setRsvpsState] = useState<any[]>(rsvps as any[]);
  const [activeTab, setActiveTab] = useState<"guests" | "seating">("guests");
  const [coverUploading, setCoverUploading] = useState(false);

  const upload = useServerFn(uploadMedia);

  const inviteUrl = `${getShareOrigin()}/i/${event.slug}`;
  const notPublished = typeof window !== "undefined" && isPreviewHost(window.location.hostname);

  // Supabase Realtime — new RSVPs notification
  useEffect(() => {
    const channel = supabase
      .channel(`rsvp-${event.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rsvps", filter: `event_id=eq.${event.id}` },
        (payload) => {
          const newRsvp = payload.new as any;
          setRsvpsState((prev) => [newRsvp, ...prev]);
          toast.success(`🎉 Nouveau RSVP de ${newRsvp.name || "quelqu'un"} !`);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [event.id]);

  function copyLink() {
    navigator.clipboard.writeText(inviteUrl);
    toast.success("Lien copié");
  }
  function shareWhatsApp() {
    const txt = encodeURIComponent(
      `Vous êtes invité·e à ${event.title} ✨\n${inviteUrl}\n\nMerci de confirmer votre présence !`,
    );
    window.open(`https://wa.me/?text=${txt}`, "_blank");
  }
  function remindWhatsApp() {
    const when = new Date(event.event_date).toLocaleString("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
    });
    const txt = encodeURIComponent(
      `Petit rappel 🙂 — ${event.title}, le ${when}.\nMerci de confirmer votre présence :\n${inviteUrl}`,
    );
    window.open(`https://wa.me/?text=${txt}`, "_blank");
  }

  function exportCsv() {
    const rows = [
      ["Nom", "Statut", "Nombre de personnes", "Accompagnants", "Allergies / Régimes", "Message", "Société", "Poste", "Téléphone", "Email", "Date de réponse"],
      ...rsvpsState.map((r: any) => {
        const acc = Array.isArray(r.extra_data?.accompanyingNames) ? r.extra_data.accompanyingNames.join(" | ") : (r.extra_data?.accompanyingNames || "");
        return [
          r.name || "",
          r.status === "yes" ? "Présent" : r.status === "no" ? "Absent" : "Peut-être",
          String(r.guest_count || 1),
          acc,
          r.diet_restrictions || r.extra_data?.dietRestrictions || r.extra_data?.diet_restrictions || "",
          r.message || "",
          r.company || "",
          r.job_title || "",
          r.phone || "",
          r.email || "",
          r.created_at ? new Date(r.created_at).toLocaleString("fr-FR") : "",
        ];
      }),
    ];
    const csv = rows
      .map((r: any) => r.map((c: any) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    download(`rsvps-${event.slug}.csv`, "text/csv", "\ufeff" + csv);
  }
  function download(name: string, mime: string, data: string) {
    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadQr(hiRes = false) {
    const ref = hiRes ? qrHiResRef : qrWrapRef;
    const canvas = ref.current?.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) {
      toast.error("QR code introuvable");
      return;
    }
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `invitation-${event.slug}${hiRes ? "-hd" : ""}.png`;
    a.click();
  }

  async function uploadCoverPhoto(file: File) {
    setCoverUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const result = await upload({
          data: { filename: file.name, contentType: file.type, base64 },
        });
        const currentOverrides =
          ((event as any).theme_overrides as Record<string, any> | null) ?? {};
        await update({
          data: {
            token: event.admin_token,
            title: event.title,
            hostName: event.host_name ?? null,
            eventDate: event.event_date,
            linkExpiresAt: event.link_expires_at ?? null,
            rsvpDeadline: (event as any).rsvp_deadline ?? null,
            location: event.location,
            mapLink: (event as any).map_link ?? null,
            venueImageUrl: event.venue_image_url ?? null,
            message: event.message ?? null,
            coverImageUrl: result.url,
            musicUrl: event.music_url ?? null,
            storyText: event.story_text ?? null,
            themeOverrides: currentOverrides,
            program: event.program ?? [],
            galleryUrls: event.gallery_urls ?? [],
            dressCode: event.dress_code ?? null,
            giftInfo: event.gift_info ?? null,
            accommodationInfo: event.accommodation_info ?? null,
            invitedCount: null,
          },
        });
        toast.success("Photo de couverture mise à jour ! 🖼️");
        setCoverUploading(false);
        window.location.reload();
      };
    } catch {
      toast.error("Erreur lors du téléversement");
      setCoverUploading(false);
    }
  }

  function exportPdf() {
    const printWin = window.open("", "_blank");
    if (!printWin) return;
    const totalYes = rsvpsState.filter((r: any) => r.status === "yes").reduce((acc: number, r: any) => acc + (r.guest_count || 1), 0);
    const rows = rsvpsState
      .map(
        (r: any) => {
          const acc = Array.isArray(r.extra_data?.accompanyingNames) ? r.extra_data.accompanyingNames.join("<br/>• ") : (r.extra_data?.accompanyingNames || "—");
          return `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:500">${r.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${r.status === "yes" ? "✅ Oui" : r.status === "no" ? "❌ Non" : "🤔 Peut-être"}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center font-bold">${r.guest_count || 1}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#333;font-size:13px">${acc !== "—" ? "• " + acc : "—"}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#c2410c;font-weight:600">${r.diet_restrictions || r.extra_data?.dietRestrictions || r.extra_data?.diet_restrictions || "—"}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:13px;color:#555">${r.message || "—"}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:12px">${[r.phone, r.email].filter(Boolean).join("<br/>") || "—"}</td>
      </tr>`;
        }
      )
      .join("");
    printWin.document.write(`<html><head><title>Rapport Invités — ${event.title}</title>
      <style>body{font-family:system-ui,-apple-system,sans-serif;padding:30px;color:#222}h1{font-size:24px;margin-bottom:4px}p{color:#666;margin-bottom:20px}.stats{display:flex;gap:20px;background:#fdfaf6;border:1px solid #ede5da;padding:15px 20px;border-radius:8px;margin-bottom:25px}.stat-box{font-size:14px}.stat-num{font-size:22px;font-weight:bold;color:#9a7b4f}table{width:100%;border-collapse:collapse;font-size:14px}th{background:#f8f4ef;padding:10px 12px;text-align:left;font-weight:600;border-bottom:2px solid #ddd}@media print{button{display:none}}</style></head>
      <body>
      <h1>📋 Liste des Invités & Traiteur : ${event.title}</h1>
      <p>${event.location} &bull; ${new Date(event.event_date).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}</p>
      <div class="stats">
        <div class="stat-box">Total Réponses : <div class="stat-num">${rsvpsState.length}</div></div>
        <div class="stat-box">Présents (avec accompagnants) : <div class="stat-num">${totalYes}</div></div>
      </div>
      <button onclick="window.print()" style="margin-bottom:20px;padding:10px 24px;background:#9a7b4f;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:bold">🖨️ Imprimer / Enregistrer en PDF</button>
      <table><thead><tr><th>Nom</th><th style="text-align:center">Statut</th><th style="text-align:center">Pers.</th><th>Accompagnants</th><th>Allergies / Régimes</th><th>Mot</th><th>Contact</th></tr></thead><tbody>${rows}</tbody></table>
      </body></html>`);
    printWin.document.close();
  }
  async function saveEdit() {
    try {
      const currentOverrides = ((event as any).theme_overrides as Record<string, any> | null) ?? {};
      const newTitleFont = form.titleFont === "auto" ? null : form.titleFont;
      const themeOverrides = {
        ...currentOverrides,
        titleFont: newTitleFont,
      };
      const invitedCountNum = form.invitedCount ? parseInt(form.invitedCount) : null;
      const maxGuestsNum = form.maxGuestsPerRsvp ? parseInt(form.maxGuestsPerRsvp) : null;
      await update({
        data: {
          token: event.admin_token,
          title: form.title,
          hostName: form.hostName || null,
          eventDate: new Date(form.eventDate).toISOString(),
          linkExpiresAt: form.linkExpiresAt ? new Date(form.linkExpiresAt).toISOString() : null,
          rsvpDeadline: form.rsvpDeadline ? new Date(form.rsvpDeadline).toISOString() : null,
          location: form.location,
          mapLink: form.mapLink || null,
          venueImageUrl: event.venue_image_url ?? null,
          message: form.message || null,
          coverImageUrl: event.cover_image_url ?? null,
          musicUrl: event.music_url ?? null,
          storyText: event.story_text ?? null,
          themeOverrides,
          program: event.program ?? [],
          galleryUrls: event.gallery_urls ?? [],
          dressCode: event.dress_code ?? null,
          giftInfo: event.gift_info ?? null,
          accommodationInfo: event.accommodation_info ?? null,
          invitedCount: invitedCountNum,
          maxGuestsPerRsvp: maxGuestsNum,
        },
      });
      toast.success("Modifications enregistrées");
      setEditing(false);
      // soft reload
      window.location.reload();
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster richColors position="top-center" />
      <SiteHeader minimal />
      <main className="flex-1 mx-auto max-w-6xl px-4 py-10 space-y-8">
        <div>
          <p className="text-sm text-muted-foreground">Tableau de bord</p>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-4xl text-primary">{event.title}</h1>
            {/* Badge Ouvert / Fermé */}
            {(() => {
              const deadline = (event as any).rsvp_deadline || event.link_expires_at;
              if (!deadline)
                return (
                  <span className="rounded-full bg-green-100 text-green-700 text-xs px-3 py-1 font-semibold">
                    ✅ Ouvert
                  </span>
                );
              const closed = new Date(deadline) < new Date();
              return closed ? (
                <span className="rounded-full bg-rose-100 text-rose-700 text-xs px-3 py-1 font-semibold">
                  🔒 Clôturé
                </span>
              ) : (
                <span className="rounded-full bg-green-100 text-green-700 text-xs px-3 py-1 font-semibold">
                  ✅ Ouvert
                </span>
              );
            })()}
          </div>
          <p className="text-muted-foreground">
            {event.location} · {new Date(event.event_date).toLocaleString("fr-FR")}
          </p>
          {((event as any).rsvp_deadline || event.link_expires_at) && (
            <p className="text-xs text-muted-foreground mt-1">
              📅 Date limite RSVP :{" "}
              {new Date((event as any).rsvp_deadline || event.link_expires_at!).toLocaleString(
                "fr-FR",
              )}
            </p>
          )}
        </div>

        {/* Share panel */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-display text-xl text-primary">Partage</h2>
          <div className="flex flex-wrap items-center gap-2">
            <input
              readOnly
              value={inviteUrl}
              className="flex-1 min-w-[260px] rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <button
              onClick={copyLink}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm hover:opacity-90"
            >
              Copier
            </button>
            <button
              onClick={shareWhatsApp}
              className="rounded-md bg-[#25D366] px-4 py-2 text-white text-sm hover:opacity-90"
            >
              WhatsApp
            </button>
            <button
              onClick={remindWhatsApp}
              className="rounded-md border border-[#25D366] text-[#128C7E] px-4 py-2 text-sm hover:bg-[#25D366]/10"
              title="Relancer les invités qui n'ont pas encore répondu"
            >
              ⏰ Rappel WhatsApp
            </button>
            <Link
              to="/i/$slug"
              params={{ slug: event.slug }}
              target="_blank"
              className="rounded-md border border-input px-4 py-2 text-sm hover:bg-accent/10"
            >
              Voir l'invitation ↗
            </Link>
          </div>

          {/* QR Code */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2 border-t border-border/40">
            {/* Visible normal QR */}
            <div
              ref={qrWrapRef}
              className="p-3 bg-white rounded-xl shadow-sm border border-border/30"
            >
              <QRCodeCanvas
                value={inviteUrl}
                size={140}
                bgColor="#ffffff"
                fgColor="#3b1f0a"
                level="M"
              />
            </div>
            {/* Hidden hi-res QR for HD export */}
            <div ref={qrHiResRef} className="hidden">
              <QRCodeCanvas
                value={inviteUrl}
                size={512}
                bgColor="#ffffff"
                fgColor="#3b1f0a"
                level="H"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">QR code de l'invitation</p>
              <p className="text-xs text-muted-foreground max-w-xs">
                Imprimez ou partagez ce QR code — vos invités n'auront qu'à le scanner pour accéder
                à l'invitation.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => downloadQr(false)}
                  className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent/10 transition"
                >
                  ⬇ QR code (PNG)
                </button>
                <button
                  onClick={() => downloadQr(true)}
                  className="inline-flex items-center gap-2 rounded-md border border-accent/50 bg-accent/5 px-4 py-2 text-sm hover:bg-accent/15 transition"
                >
                  🖼️ QR Haute Résolution (512px)
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            ⚠ Conservez ce lien admin (URL actuelle) précieusement : il vous donne accès à votre
            tableau de bord.
          </p>
          {notPublished && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 p-3 text-xs">
              <strong>Mode aperçu</strong> — le lien et le QR code pointent vers l'URL publiée
              publique du projet. Assurez-vous d'avoir publié au moins une fois (bouton « Publish »
              en haut à droite) pour que vos invités puissent y accéder sans compte Lovable.
            </div>
          )}
        </div>

        {/* Stats */}
        <StatsPanel rsvps={rsvpsState} />

        {/* Cover photo change */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-xl text-primary mb-3">🖼️ Photo de couverture</h2>
          <div className="flex flex-wrap items-center gap-4">
            {event.cover_image_url && (
              <img
                src={event.cover_image_url}
                alt="Couverture"
                className="w-24 h-16 object-cover rounded-lg border border-border/40 shadow-sm"
              />
            )}
            <label
              className={`inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm cursor-pointer hover:bg-accent/10 transition ${coverUploading ? "opacity-50 pointer-events-none" : ""}`}
            >
              {coverUploading ? "⏳ Chargement..." : "📤 Changer la photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadCoverPhoto(f);
                }}
              />
            </label>
          </div>
        </div>

        {/* Guests and Seating navigation tabs */}
        <div className="flex border-b border-border gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("guests")}
            className={`pb-3 font-display text-lg transition border-b-2 ${activeTab === "guests" ? "border-primary text-primary font-bold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            📋 Liste des Invités ({rsvpsState.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("seating")}
            className={`pb-3 font-display text-lg transition border-b-2 ${activeTab === "seating" ? "border-primary text-primary font-bold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            🍽️ Plan de Table & Placement
          </button>
        </div>

        {activeTab === "guests" ? (
          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl text-primary">
                Invités ({rsvpsState.length})
                {rsvpsState.length > (rsvps as any[]).length && (
                  <span className="ml-2 text-xs rounded-full bg-green-100 text-green-700 px-2 py-0.5">
                    +{rsvpsState.length - (rsvps as any[]).length} nouveau(x) 🎉
                  </span>
                )}
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={exportCsv}
                  className="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-accent/10 flex items-center gap-1.5"
                >
                  <span>⬇</span> Export CSV (Excel)
                </button>
                <button
                  onClick={exportPdf}
                  className="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-accent/10 flex items-center gap-1.5"
                >
                  <span>🖨️</span> Rapport PDF (Traiteur)
                </button>
              </div>
            </div>
            {rsvpsState.length === 0 ? (
              <p className="p-8 text-center text-muted-foreground">Aucune réponse pour l'instant.</p>
            ) : (
              <RsvpTable slug={event.slug} rsvps={rsvpsState as any} />
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-6">
            <SeatingPlan
              rsvps={rsvpsState}
              initialPlan={((event as any).theme_overrides?._ext?.seatingPlan) || null}
              onSave={async (newPlan) => {
                const currentOverrides = ((event as any).theme_overrides as Record<string, any> | null) ?? {};
                const updatedOverrides = {
                  ...currentOverrides,
                  _ext: { ...(currentOverrides._ext || {}), seatingPlan: newPlan },
                };
                await update({
                  data: {
                    token: event.admin_token,
                    title: event.title,
                    hostName: event.host_name ?? null,
                    eventDate: event.event_date,
                    linkExpiresAt: event.link_expires_at ?? null,
                    rsvpDeadline: (event as any).rsvp_deadline ?? null,
                    location: event.location,
                    mapLink: (event as any).map_link ?? null,
                    venueImageUrl: event.venue_image_url ?? null,
                    message: event.message ?? null,
                    coverImageUrl: event.cover_image_url ?? null,
                    musicUrl: event.music_url ?? null,
                    storyText: event.story_text ?? null,
                    themeOverrides: updatedOverrides,
                    program: event.program ?? [],
                    galleryUrls: event.gallery_urls ?? [],
                    dressCode: event.dress_code ?? null,
                    giftInfo: event.gift_info ?? null,
                    accommodationInfo: event.accommodation_info ?? null,
                    invitedCount: null,
                  },
                });
              }}
            />
          </div>
        )}

        {/* Edit panel */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-primary">Détails de l'événement</h2>
            <button
              onClick={() => setEditing((v) => !v)}
              className="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-accent/10"
            >
              {editing ? "Annuler" : "Modifier"}
            </button>
          </div>
          {editing ? (
            <div className="space-y-3">
              {(
                [
                  ["title", "Titre"],
                  ["hostName", "Hôte"],
                  ["location", "Lieu"],
                ] as const
              ).map(([k, l]) => (
                <label key={k} className="block">
                  <span className="text-sm">{l}</span>
                  <input
                    value={(form as any)[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1"
                  />
                </label>
              ))}
              <label className="block">
                <span className="text-sm">Date</span>
                <input
                  type="datetime-local"
                  value={form.eventDate}
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1"
                />
              </label>
              <label className="block">
                <span className="text-sm">Date limite RSVP (clôture des réponses)</span>
                <input
                  type="datetime-local"
                  value={form.rsvpDeadline}
                  max={form.eventDate || undefined}
                  onChange={(e) => setForm({ ...form, rsvpDeadline: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Après cette date, le formulaire RSVP se fermera et le rapport de participation
                  s'affichera automatiquement.
                </p>
              </label>
              <label className="block">
                <span className="text-sm">Expiration du lien d'invitation (optionnel)</span>
                <input
                  type="datetime-local"
                  value={form.linkExpiresAt}
                  max={form.eventDate || undefined}
                  onChange={(e) => setForm({ ...form, linkExpiresAt: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Date à laquelle le lien cessera d'être accessible aux invités.
                </p>
              </label>
              <label className="block">
                <span className="text-sm">Lien GPS / Google Maps (optionnel)</span>
                <input
                  value={form.mapLink}
                  onChange={(e) => setForm({ ...form, mapLink: e.target.value })}
                  placeholder="https://maps.google.com/..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1"
                />
              </label>
              <label className="block">
                <span className="text-sm">Nombre d'invitations envoyées (pour le rapport)</span>
                <input
                  type="number"
                  min={0}
                  value={form.invitedCount}
                  onChange={(e) => setForm({ ...form, invitedCount: e.target.value })}
                  placeholder="Ex: 180"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Permet de calculer les "sans réponse" dans le rapport.
                </p>
              </label>
              <label className="block">
                <span className="text-sm">Max personnes par RSVP (accompagnants)</span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={form.maxGuestsPerRsvp}
                  onChange={(e) => setForm({ ...form, maxGuestsPerRsvp: e.target.value })}
                  placeholder="Ex: 2, 5 (par défaut: 20)"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Limite le nombre de personnes qu'un invité peut déclarer dans sa réponse.
                </p>
              </label>
              <label className="block">
                <span className="text-sm">Message</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1"
                  rows={3}
                />
              </label>
              <label className="block">
                <span className="text-sm">Police des noms</span>
                <select
                  value={form.titleFont}
                  onChange={(e) => setForm({ ...form, titleFont: e.target.value as any })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1"
                >
                  {TITLE_FONT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Choisir une police plus lisible si besoin.
                </p>
              </label>
              <button
                onClick={saveEdit}
                className="rounded-full bg-primary px-6 py-2 text-primary-foreground hover:opacity-90"
              >
                Enregistrer
              </button>
            </div>
          ) : (
            <dl className="grid sm:grid-cols-2 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Titre</dt>
              <dd>{event.title}</dd>
              <dt className="text-muted-foreground">Hôte</dt>
              <dd>{event.host_name || "—"}</dd>
              <dt className="text-muted-foreground">Date</dt>
              <dd>{new Date(event.event_date).toLocaleString("fr-FR")}</dd>
              <dt className="text-muted-foreground">Expiration du lien</dt>
              <dd>
                {event.link_expires_at
                  ? new Date(event.link_expires_at).toLocaleString("fr-FR")
                  : "—"}
              </dd>
              <dt className="text-muted-foreground">Lieu</dt>
              <dd>{event.location}</dd>
              <dt className="text-muted-foreground">Lien GPS</dt>
              <dd>
                {(event as any).map_link ? (
                  <a
                    href={(event as any).map_link}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Voir sur Maps
                  </a>
                ) : (
                  "—"
                )}
              </dd>
              <dt className="text-muted-foreground">Message</dt>
              <dd>{event.message || "—"}</dd>
            </dl>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
