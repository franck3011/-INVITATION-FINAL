import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { listAllEvents, deleteEvent } from "@/fns/events.functions";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/super/$token")({
  loader: async ({ params }) => {
    try {
      return await listAllEvents({ data: { token: params.token } });
    } catch {
      throw notFound();
    }
  },
  head: () => ({
    meta: [{ title: "Super-admin — Inviti" }, { name: "robots", content: "noindex" }],
  }),
  component: SuperAdminPage,
  notFoundComponent: () => (
    <div className="p-12 text-center">
      <h1 className="font-display text-3xl text-primary">Accès refusé</h1>
      <p className="text-muted-foreground mt-2 text-sm">Token super-admin invalide.</p>
    </div>
  ),
});

function SuperAdminPage() {
  const { token } = Route.useParams();
  const { events, stats } = Route.useLoaderData();
  const del = useServerFn(deleteEvent);
  // Origin is computed client-only to avoid SSR/CSR hydration mismatch
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);

  const now = Date.now();

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Supprimer définitivement « ${title} » et toutes ses réponses ?`)) return;
    try {
      await del({ data: { token, eventId: id } });
      toast.success("Invitation supprimée");
      window.location.reload();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  }

  function copy(value: string, label: string) {
    if (!origin) return;
    navigator.clipboard.writeText(value);
    toast.success(`${label} copié`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-ivory via-background to-secondary/20">
      <Toaster richColors position="top-center" />
      <SiteHeader minimal />
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-10 space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-3 border-b border-border/60 pb-5">
          <div>
            <p className="uppercase tracking-[0.25em] text-[10px] text-accent mb-1">
              ✦ Super-admin
            </p>
            <h1 className="font-display text-4xl text-primary">Toutes les invitations</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {events.length} invitation{events.length > 1 ? "s" : ""} générée
              {events.length > 1 ? "s" : ""}.
            </p>
          </div>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <Stat label="Total" value={events.length} />
            <Stat
              label="Passées"
              value={events.filter((e: any) => new Date(e.event_date).getTime() < now).length}
              tone="amber"
            />
          </div>
        </header>

        <div className="grid gap-4">
          {events.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center text-muted-foreground">
              Aucune invitation pour l'instant.
            </div>
          )}

          {events.map((e: any) => {
            const s = stats[e.id] ?? { yes: 0, no: 0, maybe: 0, guests: 0, total: 0 };
            const isPast = new Date(e.event_date).getTime() < now;
            const inviteUrl = origin ? `${origin}/i/${e.slug}` : "";
            const adminUrl = origin ? `${origin}/admin/${e.admin_token}` : "";
            return (
              <article
                key={e.id}
                className={`rounded-2xl border bg-card shadow-sm hover:shadow-md transition overflow-hidden ${
                  isPast ? "border-amber-300/60" : "border-border"
                }`}
              >
                {/* Admin link banner — top, prominent */}
                <div className="bg-gradient-to-r from-primary/95 to-primary/80 text-primary-foreground px-5 py-3 flex flex-wrap items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] opacity-80">
                    🔑 Lien admin
                  </span>
                  <code
                    className="flex-1 min-w-[200px] font-mono text-xs bg-black/20 rounded px-2 py-1 truncate"
                    title={adminUrl}
                  >
                    {adminUrl || "…"}
                  </code>
                  <button
                    onClick={() => copy(adminUrl, "Lien admin")}
                    disabled={!origin}
                    className="rounded-md bg-white/15 hover:bg-white/25 disabled:opacity-50 px-3 py-1 text-xs font-medium transition"
                  >
                    📋 Copier
                  </button>
                  {origin && (
                    <a
                      href={adminUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md bg-white text-primary px-3 py-1 text-xs font-medium hover:opacity-90 transition"
                    >
                      Ouvrir ↗
                    </a>
                  )}
                </div>

                <div className="p-5 grid gap-4 md:grid-cols-[1fr_auto] items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-display text-xl text-primary">{e.title}</h2>
                      <span className="text-[10px] uppercase tracking-wider rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
                        {e.template_id}
                      </span>
                      {isPast && (
                        <span className="text-[10px] uppercase tracking-wider rounded-full bg-amber-100 text-amber-800 px-2 py-0.5">
                          Passée
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {e.host_name && <span>👤 {e.host_name} · </span>}
                      📅{" "}
                      {new Date(e.event_date).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      · 📍 {e.location}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs pt-1">
                      <Pill tone="green">✓ {s.yes} oui</Pill>
                      <Pill tone="yellow">? {s.maybe} peut-être</Pill>
                      <Pill tone="red">✗ {s.no} non</Pill>
                      <Pill tone="neutral">👥 {s.guests} pers.</Pill>
                    </div>
                    {origin && (
                      <button
                        onClick={() => copy(inviteUrl, "Lien invitation")}
                        className="text-[11px] text-muted-foreground hover:text-primary underline underline-offset-2 truncate max-w-full block text-left pt-1"
                        title={inviteUrl}
                      >
                        📨 {inviteUrl}
                      </button>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-2 shrink-0">
                    <Link
                      to="/i/$slug"
                      params={{ slug: e.slug }}
                      target="_blank"
                      className="rounded-md border border-input px-3 py-1.5 text-xs hover:bg-accent/10 transition text-center"
                    >
                      Voir invitation ↗
                    </Link>
                    {isPast && (
                      <button
                        onClick={() => handleDelete(e.id, e.title)}
                        className="rounded-md border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 text-xs font-medium transition"
                      >
                        🗑 Supprimer
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: "amber" }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-center ${
        tone === "amber" ? "border-amber-300 bg-amber-50" : "border-border bg-card"
      }`}
    >
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-xl text-primary leading-none mt-1">{value}</p>
    </div>
  );
}

function Pill({
  tone,
  children,
}: {
  tone: "green" | "yellow" | "red" | "neutral";
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    neutral: "bg-secondary text-secondary-foreground",
  };
  return <span className={`rounded-full px-2 py-0.5 ${tones[tone]}`}>{children}</span>;
}
