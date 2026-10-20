import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export function SiteHeader({ minimal = false }: { minimal?: boolean } = {}) {
  const navigate = useNavigate();

  // Raccourci secret Ctrl+Alt+Q → /templates (utile en mode minimal pour l'admin)
  useEffect(() => {
    if (!minimal) return;
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.altKey && (e.key === "q" || e.key === "Q")) {
        e.preventDefault();
        navigate({ to: "/templates" });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [minimal, navigate]);

  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {minimal ? (
          <span className="text-xs text-muted-foreground/60 select-none" aria-hidden>
            {/* Accès modèles : Ctrl + Alt + Q */}
          </span>
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-primary">Inviti</span>
            <span className="text-accent">✦</span>
          </Link>
        )}
        <nav className="flex items-center gap-3 sm:gap-6 text-sm">
          {!minimal && (
            <>
              <Link
                to="/templates"
                className="hidden sm:inline hover:text-primary transition-colors"
              >
                Créer une invitation
              </Link>
              <Link
                to="/templates"
                hash="cat-seminaire"
                className="hidden sm:inline font-semibold text-accent hover:opacity-80 transition-opacity"
              >
                Créer un Séminaire
              </Link>
              <Link to="/my-invitations" className="hover:text-primary transition-colors">
                Mes invitations
              </Link>
            </>
          )}
          <a
            href="https://wa.me/c/22588480594"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white hover:opacity-90 transition"
            aria-label="Contacter sur WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.595 5.39l.6 1.002-1.003 3.665 3.768-.756z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground">
        <div className="ornament mb-3" aria-hidden>
          ✦
        </div>
        <p className="font-display text-lg text-primary">Inviti</p>
        <p className="mt-1">Invitations digitales & RSVP — créées avec élégance.</p>
      </div>
    </footer>
  );
}
