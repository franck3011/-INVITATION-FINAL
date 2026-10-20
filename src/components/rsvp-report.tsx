import { motion } from "framer-motion";
import { CheckCircle, XCircle, HelpCircle, Users } from "lucide-react";

interface RsvpReportProps {
  rsvps: { status: string; guest_count?: number | null }[];
  invitedCount?: number | null;
  eventTitle?: string;
  deadline?: string | null;
}

export function RsvpReport({ rsvps, invitedCount, eventTitle, deadline }: RsvpReportProps) {
  const confirmed = rsvps.filter((r) => r.status === "yes").length;
  const refused = rsvps.filter((r) => r.status === "no").length;
  const maybe = rsvps.filter((r) => r.status === "maybe").length;
  const total = rsvps.length;
  const totalGuests = rsvps
    .filter((r) => r.status === "yes")
    .reduce((sum, r) => sum + (r.guest_count ?? 1), 0);

  const invited = invitedCount ?? total;
  const noResponse = Math.max(0, invited - total);
  const participationRate = invited > 0 ? Math.round((confirmed / invited) * 100) : 0;

  const cards = [
    {
      label: "Confirmés",
      value: confirmed,
      subLabel: `${totalGuests} pers. au total`,
      icon: CheckCircle,
      color: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      ring: "ring-emerald-400",
    },
    {
      label: "Refusés",
      value: refused,
      icon: XCircle,
      color: "from-rose-500 to-red-600",
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      ring: "ring-rose-400",
    },
    {
      label: "Peut-être",
      value: maybe,
      icon: HelpCircle,
      color: "from-amber-400 to-orange-500",
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      ring: "ring-amber-400",
    },
    {
      label: "Sans réponse",
      value: noResponse,
      subLabel: invitedCount ? `sur ${invited} invités` : "non renseigné",
      icon: Users,
      color: "from-slate-400 to-gray-500",
      bg: "bg-slate-50",
      text: "text-slate-600",
      border: "border-slate-200",
      ring: "ring-slate-300",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto">
        {/* En-tête clôture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600 uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
            Clôturé
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-3">
            Rapport des réponses
          </h2>
          {eventTitle && <p className="text-muted-foreground text-sm">{eventTitle}</p>}
          <div className="ornament max-w-[6rem] mx-auto mt-6">✦</div>
          <p className="mt-6 text-base text-foreground/70 max-w-lg mx-auto">
            Les réponses à cette invitation sont désormais clôturées.{" "}
            <strong>Merci à tous les invités</strong> pour leur participation.
          </p>
          {deadline && (
            <p className="mt-2 text-xs text-muted-foreground">
              Clôture le{" "}
              {new Date(deadline).toLocaleString("fr-FR", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          )}
        </motion.div>

        {/* Taux de participation */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl border border-border shadow-md p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">Taux de participation</span>
            <span className="text-2xl font-bold text-primary">{participationRate}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${participationRate}%` }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-600"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0%</span>
            <span>
              {invited > 0
                ? `${confirmed} confirmés / ${invited} invités`
                : `${confirmed} confirmés / ${total} réponses`}
            </span>
            <span>100%</span>
          </div>
        </motion.div>

        {/* Cartes stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
                className={`relative overflow-hidden rounded-2xl border ${card.border} ${card.bg} p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow`}
              >
                {/* Icône avec gradient */}
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 shadow-md`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 * i + 0.5 }}
                  className={`text-4xl font-bold ${card.text} leading-none`}
                >
                  {card.value}
                </motion.span>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider mt-2 ${card.text}`}
                >
                  {card.label}
                </span>
                {card.subLabel && (
                  <span className="text-[10px] text-muted-foreground mt-1">{card.subLabel}</span>
                )}
                {/* Deco bg */}
                <div
                  className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${card.color} opacity-10`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Total invités si connu */}
        {invitedCount && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            Total d'invitations envoyées :{" "}
            <strong className="text-foreground">{invitedCount}</strong>
          </motion.p>
        )}
      </div>
    </section>
  );
}
