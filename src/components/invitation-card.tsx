import { motion } from "framer-motion";
import type { Template } from "@/lib/templates";
import { TemplatePattern } from "@/components/template-pattern";
import { TemplateEffects } from "@/components/template-effects";

interface Props {
  template: Template;
  title: string;
  hostName?: string | null;
  eventDate?: string | null;
  location?: string | null;
  message?: string | null;
  coverImageUrl?: string | null;
  compact?: boolean;
}

function formatDate(d: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(new Date(d));
  } catch {
    return d;
  }
}

export function InvitationCard({
  template,
  title,
  hostName,
  eventDate,
  location,
  message,
  coverImageUrl,
  compact,
}: Props) {
  const dark = !!template.dark;
  const textColor = dark ? "text-ivory" : "text-white";
  const subColor = dark ? "text-ivory/90" : "text-white/85";
  const titleClass =
    template.titleFont === "script"
      ? "font-script text-6xl md:text-8xl"
      : "font-display text-5xl md:text-7xl font-semibold";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${template.bgClass} ${textColor} ${
        compact ? "p-6 min-h-[420px]" : "p-8 md:p-14 min-h-[640px]"
      } shadow-2xl`}
    >
      {coverImageUrl && (
        <img
          src={coverImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
          aria-hidden
        />
      )}
      {!coverImageUrl && (
        <TemplatePattern
          pattern={template.pattern}
          color={dark ? "#e6c570" : "#9a6e41"}
          opacity={0.14}
        />
      )}
      {/* Animated particle layer */}
      <TemplateEffects template={template} density={compact ? 0.6 : 1} />
      {/* Voile bas pour lisibilité du texte uniquement quand il y a une photo */}
      {coverImageUrl && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.75) 100%)",
          }}
          aria-hidden
        />
      )}
      {/* Ornamental corners */}
      <CornerOrnament position="tl" dark={dark} />
      <CornerOrnament position="tr" dark={dark} />
      <CornerOrnament position="bl" dark={dark} />
      <CornerOrnament position="br" dark={dark} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`uppercase tracking-[0.3em] text-sm ${subColor}`}
        >
          Vous êtes invité·e
        </motion.p>

        {hostName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`font-serif italic text-xl ${subColor}`}
          >
            par {hostName}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="ornament w-full max-w-xs text-2xl"
        >
          {template.emoji}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`${titleClass} leading-tight max-w-2xl`}
        >
          {title || "Votre événement"}
        </motion.h1>

        {eventDate && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className={`font-display text-2xl md:text-3xl ${textColor}`}
          >
            {formatDate(eventDate)}
          </motion.p>
        )}

        {location && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`text-lg md:text-xl ${subColor} max-w-md`}
          >
            ⚜ {location}
          </motion.p>
        )}

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className={`mt-4 italic font-serif max-w-xl text-xl md:text-2xl ${subColor}`}
          >
            « {message} »
          </motion.p>
        )}
      </div>
    </div>
  );
}

function CornerOrnament({
  position,
  dark,
}: {
  position: "tl" | "tr" | "bl" | "br";
  dark: boolean;
}) {
  const pos = {
    tl: "top-3 left-3",
    tr: "top-3 right-3 rotate-90",
    bl: "bottom-3 left-3 -rotate-90",
    br: "bottom-3 right-3 rotate-180",
  }[position];
  const color = dark ? "rgb(217 178 105 / 0.6)" : "rgb(154 110 65 / 0.5)";
  return (
    <svg
      className={`absolute ${pos} w-12 h-12`}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M2 2 L22 2 M2 2 L2 22" />
      <path d="M6 6 Q14 6 14 14 Q14 6 22 6" />
      <circle cx="6" cy="6" r="1.5" fill={color} />
    </svg>
  );
}
