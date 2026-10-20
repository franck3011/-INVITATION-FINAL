import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { CATEGORIES, getTemplatesByCategory } from "@/lib/templates";
import { PreviewInvitation } from "@/components/preview-invitation";
import { getSampleEvent } from "@/lib/sample-event";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_SIZE = 12;

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Modèles d'invitations — Inviti" },
      {
        name: "description",
        content:
          "Plus de 300 modèles d'invitations digitales : mariage, anniversaire, baptême, gala, soirée privée.",
      },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pages, setPages] = useState<Record<string, number>>({});

  const displayedCategories = selectedCategory
    ? CATEGORIES.filter((c) => c.id === selectedCategory)
    : CATEGORIES;

  const getPage = (catId: string) => pages[catId] ?? 1;
  const loadMore = (catId: string) =>
    setPages((prev) => ({ ...prev, [catId]: (prev[catId] ?? 1) + 1 }));

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-10">
          <p className="ornament max-w-xs mx-auto text-accent">✦</p>
          <h1 className="font-display text-4xl md:text-5xl text-primary mt-4">
            Choisissez votre modèle
          </h1>
          <p className="mt-3 text-muted-foreground">
            Plus de 300 modèles par catégorie. Cliquez pour personnaliser.
          </p>

          <div className="mt-6 mb-2">
            <Link
              to="/create/builder"
              className="inline-block bg-primary text-white font-bold py-2 px-6 rounded-full shadow hover:bg-primary/90 transition-all"
            >
              ✨ Nouveau : Créer de A à Z avec l'éditeur visuel (Glisser-Déposer)
            </Link>
          </div>

          <nav className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setPages({});
              }}
              className={`rounded-full border border-border px-4 py-1.5 text-sm transition ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground font-bold"
                  : "hover:bg-accent/10"
              }`}
            >
              Tous
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  setPages({});
                }}
                className={`rounded-full border border-border px-4 py-1.5 text-sm transition ${
                  selectedCategory === c.id
                    ? "bg-primary text-primary-foreground font-bold"
                    : "hover:bg-accent/10"
                }`}
              >
                <span className="mr-1">{c.emoji}</span>
                {c.name}
              </button>
            ))}
          </nav>
        </div>

        {displayedCategories.map((cat) => {
          const allItems = getTemplatesByCategory(cat.id);
          const currentPage = getPage(cat.id);
          const visibleItems = allItems.slice(0, currentPage * PAGE_SIZE);
          const hasMore = visibleItems.length < allItems.length;

          return (
            <section key={cat.id} id={`cat-${cat.id}`} className="mb-16 scroll-mt-24">
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-border/60 pb-3">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl text-primary">
                    <span className="mr-2">{cat.emoji}</span>
                    {cat.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{cat.tagline}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {visibleItems.length}/{allItems.length} modèles
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {visibleItems.map((t, idx) => {
                    const s = getSampleEvent(t);
                    return (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: (idx % PAGE_SIZE) * 0.03 }}
                        className="space-y-4"
                      >
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
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => loadMore(cat.id)}
                    className="rounded-full border border-accent px-8 py-3 text-primary hover:bg-accent/10 transition font-medium"
                  >
                    Charger {Math.min(PAGE_SIZE, allItems.length - visibleItems.length)} autres
                    modèles ↓
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </div>
  );
}
