import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { PreviewInvitation } from "@/components/preview-invitation";
import { getSampleEvent } from "@/lib/sample-event";
import { TEMPLATES, getTemplate } from "@/lib/templates";

// 6 modèles vedettes — 1 par layout unique, 1 par catégorie
const FEATURED_IDS = [
  "mariage-dore", // fullbleed  — Mariage
  "anniv-elegant-noir", // artdeco    — Anniversaire
  "bapteme-ivoire", // polaroid   — Baptême
  "gala-opera", // magazine   — Gala
  "soiree-cocktail", // classic    — Soirée
  "anniv-neon-night", // ticket     — Ambiance fest
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inviti — Invitations digitales animées & RSVP en ligne" },
      {
        name: "description",
        content:
          "Créez en quelques minutes une invitation animée pour mariage, gala ou anniversaire et collectez les RSVP automatiquement, sans inscription.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ivory via-background to-[oklch(0.92_0.06_85)]" />
          <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
                  ✦ Invitations digitales ✦
                </p>
                <h1 className="font-display text-5xl md:text-7xl font-semibold text-primary leading-[1.05]">
                  Invitez avec
                  <span className="block font-script text-accent text-6xl md:text-8xl mt-2">
                    élégance
                  </span>
                </h1>
                <p className="mt-6 text-lg text-foreground/75 max-w-md">
                  Créez en quelques minutes une invitation animée pour vos plus belles occasions.
                  Collectez les RSVP, suivez vos réponses, partagez en un clic — sans inscription.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/templates"
                    className="rounded-full bg-primary px-8 py-3 text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    Créer mon invitation
                  </Link>
                  <Link
                    to="/templates"
                    className="rounded-full border border-accent px-8 py-3 text-primary hover:bg-accent/10 transition"
                  >
                    Voir les modèles
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                  <span>✓ Sans inscription</span>
                  <span>✓ Lien WhatsApp</span>
                  <span>✓ Export Excel</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              {(() => {
                const s = getSampleEvent(TEMPLATES[0]);
                return (
                  <PreviewInvitation
                    template={TEMPLATES[0]}
                    title={s.title}
                    message={s.message}
                    coverImageUrl={s.coverImageUrl}
                  />
                );
              })()}
            </motion.div>
          </div>
        </section>

        {/* TEMPLATES PREVIEW */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <div className="text-center mb-12">
            <p className="ornament max-w-xs mx-auto text-accent">✦</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary mt-4">
              Cinq univers, une même élégance
            </h2>
            <p className="mt-3 text-muted-foreground">
              Mariage, gala, anniversaire, baptême ou soirée chic — choisissez votre ambiance.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_IDS.map((id) => getTemplate(id))
              .filter((t): t is NonNullable<ReturnType<typeof getTemplate>> => Boolean(t))
              .map((t) => {
                const s = getSampleEvent(t);
                return (
                  <div key={t.id} className="space-y-4">
                    <PreviewInvitation
                      template={t}
                      title={s.title}
                      message={s.message}
                      coverImageUrl={s.coverImageUrl}
                    />
                    <div className="flex items-center justify-between gap-3 px-1">
                      <div className="min-w-0">
                        <h3 className="font-display text-lg text-primary truncate">{t.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{t.tagline}</p>
                      </div>
                      <Link
                        to="/create/$templateId"
                        params={{ templateId: t.id }}
                        className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90 transition"
                      >
                        Choisir
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/templates"
              className="rounded-full border border-accent px-8 py-3 text-primary hover:bg-accent/10 transition"
            >
              Voir les 300+ modèles
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-secondary/40 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-4xl text-center text-primary mb-12">
              Trois étapes, c'est tout
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                ["①", "Choisissez", "Sélectionnez un modèle qui correspond à votre événement."],
                ["②", "Personnalisez", "Renseignez date, lieu, photo, musique. Aperçu en direct."],
                [
                  "③",
                  "Partagez",
                  "Lien unique + WhatsApp. Suivez les RSVP depuis votre tableau de bord.",
                ],
              ].map(([n, t, d]) => (
                <div key={t} className="text-center">
                  <div className="font-display text-5xl text-accent mb-3">{n}</div>
                  <h3 className="font-display text-2xl text-primary mb-2">{t}</h3>
                  <p className="text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/templates"
                className="rounded-full bg-primary px-8 py-3 text-primary-foreground font-medium hover:opacity-90 transition"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
