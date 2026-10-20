import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import confetti from "canvas-confetti";

interface PassSearchParams {
  name?: string;
  guests?: number;
  accompanying?: string;
  date?: string;
  title?: string;
}

export const Route = createFileRoute("/pass/$slug")({
  validateSearch: (search: Record<string, unknown>): PassSearchParams => {
    return {
      name: (search.name as string) || "Invité",
      guests: Number(search.guests) || 1,
      accompanying: (search.accompanying as string) || "",
      date: (search.date as string) || "",
      title: (search.title as string) || "Événement",
    };
  },
  component: PassVerificationPage,
});

function PassVerificationPage() {
  const { slug } = Route.useParams() as { slug: string };
  const search = Route.useSearch() as PassSearchParams;
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const name = search?.name || "Invité";
  const guestsCount = search?.guests || 1;
  const title = search?.title || "Événement";
  const dateStr = search?.date || "";

  const accompanyingList = search?.accompanying
    ? String(search.accompanying).split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  function handleCheckIn() {
    if (checkedIn) return;
    setCheckedIn(true);
    const now = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    setCheckInTime(now);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* Container principal style passeport */}
      <div className="max-w-md w-full bg-stone-900/90 backdrop-blur-xl border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* En-tête officiel */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-6 text-center text-stone-950 font-bold relative overflow-hidden shadow-md">
          <div className="uppercase tracking-widest text-xs font-extrabold opacity-80 mb-1">
            Passeport d'Accès Officiel
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-sm">
            PASS VIP VÉRIFIÉ
          </h1>
          <div className="mt-2 inline-flex items-center gap-1.5 bg-stone-950/20 text-stone-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-green-950 animate-pulse"></span>
            Inscription Confirmée
          </div>
        </div>

        {/* Corps du billet */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Titre et Date de l'événement */}
          <div className="text-center pb-4 border-b border-amber-500/20">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 font-display">
              {title}
            </h2>
            {formattedDate && (
              <p className="text-sm text-stone-300 mt-1 capitalize">📅 {formattedDate}</p>
            )}
          </div>

          {/* Statut Vérification */}
          <div className="bg-gradient-to-r from-green-950/60 to-emerald-950/60 border border-green-500/40 rounded-2xl p-4 flex items-center gap-4 shadow-inner">
            <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-400/50 flex items-center justify-center text-2xl flex-shrink-0">
              ✅
            </div>
            <div>
              <div className="text-xs font-bold text-green-400 uppercase tracking-wider">
                Statut de la réservation
              </div>
              <div className="text-lg font-extrabold text-white">
                VALIDE & ENREGISTRÉ
              </div>
              <div className="text-xs text-stone-300">
                Accès autorisé pour <span className="text-amber-400 font-bold">{guestsCount} personne{guestsCount > 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>

          {/* Détail des convives */}
          <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-700 pb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                👤 Invité Principal
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                Titulaire
              </span>
            </div>
            <div className="text-lg font-bold text-white pl-1">
              ✨ {name}
            </div>

            {/* Liste des accompagnants si > 1 */}
            {guestsCount > 1 && (
              <div className="pt-2 border-t border-stone-700/80 space-y-2.5">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  👥 Accompagnant{accompanyingList.length > 1 ? "s" : ""} enregistré{accompanyingList.length > 1 ? "s" : ""} ({guestsCount - 1})
                </div>
                {accompanyingList.length > 0 ? (
                  <ul className="space-y-1.5">
                    {accompanyingList.map((accName: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 bg-stone-900/60 px-3 py-2 rounded-xl text-sm font-medium text-stone-200 border border-stone-700/50"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span>{accName}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs italic text-stone-400 bg-stone-900/40 p-3 rounded-xl border border-stone-700/30">
                    ℹ️ L'invité a réservé pour {guestsCount} personnes au total sans détailler les noms individuels.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bouton pour l'accueil / contrôle d'entrée */}
          <div className="pt-2">
            {!checkedIn ? (
              <button
                onClick={handleCheckIn}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-base uppercase tracking-wider shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2"
              >
                <span>👉</span> Pointer l'arrivée (Accueil)
              </button>
            ) : (
              <div className="w-full py-4 px-6 rounded-2xl bg-green-600/30 border-2 border-green-500 text-green-300 font-bold text-center space-y-1 animate-fade-in shadow-lg">
                <div className="flex items-center justify-center gap-2 text-base text-white font-extrabold uppercase">
                  <span>✔️</span> ENTRÉE VALIDE ET POINTÉE !
                </div>
                <div className="text-xs text-green-200">
                  Enregistré à l'accueil à {checkInTime}
                </div>
              </div>
            )}
            <p className="text-[11px] text-center text-stone-400 mt-2 italic">
              * Ce bouton est réservé à l'équipe d'accueil ou à l'hôte le jour de l'événement pour vérifier l'entrée.
            </p>
          </div>
        </div>

        {/* Pied de page avec lien retour */}
        <div className="bg-stone-950/60 p-4 border-t border-stone-800 text-center">
          <Link
            to="/i/$slug"
            params={{ slug }}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium underline transition"
          >
            ← Retour à l'invitation digitale
          </Link>
        </div>
      </div>
    </div>
  );
}
