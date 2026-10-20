import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { listMyInvitations, removeMyInvitation, type MyInvitation } from "@/lib/my-invitations";
import { getTemplate } from "@/lib/templates";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/my-invitations")({
  head: () => ({
    meta: [
      { title: "Mes invitations — Inviti" },
      {
        name: "description",
        content: "Retrouvez toutes les invitations que vous avez créées sur cet appareil.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MyInvitationsPage,
});

function MyInvitationsPage() {
  const [items, setItems] = useState<MyInvitation[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(listMyInvitations());
    setReady(true);
  }, []);

  function handleRemove(slug: string) {
    if (!confirm("Retirer cette invitation de la liste ? (L'invitation reste en ligne)")) return;
    removeMyInvitation(slug);
    setItems(listMyInvitations());
  }

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copié`);
    } catch {
      toast.error("Copie impossible");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <Toaster />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-12">
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="font-display text-4xl text-primary">Mes invitations</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Invitations créées depuis cet appareil. Conservez vos liens d'administration en lieu
              sûr.
            </p>
          </div>
          <Link
            to="/templates"
            className="rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground hover:opacity-90 transition"
          >
            + Nouvelle invitation
          </Link>
        </div>

        {!ready ? (
          <p className="text-muted-foreground">Chargement…</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="font-display text-2xl text-primary mb-2">
              Aucune invitation pour le moment
            </p>
            <p className="text-muted-foreground mb-6">
              Créez votre première invitation, elle apparaîtra ici automatiquement.
            </p>
            <Link
              to="/templates"
              className="rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground hover:opacity-90 transition"
            >
              Choisir un modèle
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((it) => {
              const tpl = getTemplate(it.templateId);
              const shareUrl =
                typeof window !== "undefined"
                  ? `${window.location.origin}/i/${it.slug}`
                  : `/i/${it.slug}`;
              const adminUrl =
                typeof window !== "undefined"
                  ? `${window.location.origin}/admin/${it.adminToken}`
                  : `/admin/${it.adminToken}`;
              return (
                <li
                  key={it.slug}
                  className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-display text-xl text-primary truncate">
                        {it.title || "(Sans titre)"}
                      </h2>
                      {tpl && (
                        <span className="text-xs rounded-full bg-secondary px-2 py-0.5 text-muted-foreground">
                          {tpl.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {it.eventDate
                        ? new Date(it.eventDate).toLocaleString("fr-FR", {
                            dateStyle: "long",
                            timeStyle: "short",
                          })
                        : "Date non renseignée"}{" "}
                      · créée le {new Date(it.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <Link
                      to="/i/$slug"
                      params={{ slug: it.slug }}
                      className="rounded-full border border-accent px-4 py-1.5 text-xs text-primary hover:bg-accent/10 transition"
                    >
                      Voir
                    </Link>
                    <Link
                      to="/admin/$token"
                      params={{ token: it.adminToken }}
                      className="rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground hover:opacity-90 transition"
                    >
                      Admin / RSVP
                    </Link>
                    <button
                      onClick={() => copy(shareUrl, "Lien public")}
                      className="rounded-full border border-border px-4 py-1.5 text-xs hover:bg-secondary transition"
                    >
                      Copier le lien
                    </button>
                    <button
                      onClick={() => copy(adminUrl, "Lien admin")}
                      className="rounded-full border border-border px-4 py-1.5 text-xs hover:bg-secondary transition"
                    >
                      Copier admin
                    </button>
                    <button
                      onClick={() => handleRemove(it.slug)}
                      className="rounded-full border border-destructive/40 px-4 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition"
                    >
                      Retirer
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="text-xs text-muted-foreground mt-8">
          ⓘ La liste est enregistrée localement dans ce navigateur. Si vous changez d'appareil ou
          videz vos données, conservez vos liens admin pour retrouver vos invitations.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
