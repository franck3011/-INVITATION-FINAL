import React from "react";
import { getPalette, getTitleFontClass, fontVars, getFontClass } from "@/components/preview-invitation";
import { InlineTextEditor, InlineImageEditor } from "@/components/inline-editor";
import { MapPin, Heart, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";
// â”€â”€â”€ 12 designs radicalement diffÃ©rents â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** 1. HERO CINÃ‰MA â€” photo plein Ã©cran, titre en bas, style film */
export function Design1({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl"
      style={{
        aspectRatio: "9/16",
        maxHeight: 480,
        fontFamily: "var(--font-cinzel)",
        ...fontVars(template, themeOverrides),
      }}
    >
      <img
        src={coverImageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />
      {/* Top label */}
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
        <span
          className="text-[9px] text-white/70 tracking-[0.4em] uppercase"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
        >
          {themeOverrides?.ceremonyTitle || themeOverrides?.eventTitle || "Invitation"}
        </span>
        <span
          className="text-[9px] tracking-[0.3em] uppercase"
          style={{ color: p.accent, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
        >
          {dt.year}
        </span>
      </div>
      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
        <div className="w-8 h-0.5 mb-3" style={{ background: p.accent }} />
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(2.5rem,8vw,3.5rem)] text-white leading-tight`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          {template.name}
        </h2>
        {hostName && (
          <p
            className="text-white/80 text-[11px] mt-1 italic"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            {hostName}
          </p>
        )}
        <div className="flex items-center gap-3 mt-4">
          <div className="text-white/90 text-[11px] flex items-center gap-1.5">
            <Calendar className="w-3 h-3" style={{ color: p.accent }} />
            {dt.day} {dt.month}
          </div>
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="text-white/90 text-[11px] flex items-center gap-1.5">
            <Clock className="w-3 h-3" style={{ color: p.accent }} />
            {dt.time}
          </div>
        </div>
        <button
          className="mt-4 w-full text-[11px] tracking-widest uppercase font-medium rounded-full"
          style={{ background: p.accent, color: "#fff" }}
        >
          Confirmer ma prÃ©sence
        </button>
      </div>
    </motion.div>
  );
}

/** 2. CARTE POSTALE â€” format paysage, photo Ã  gauche, texte Ã  droite */
export function Design2({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10"
      style={{
        background: p.bg,
        fontFamily: "var(--font-syne)",
        ...fontVars(template, themeOverrides),
      }}
    >
      <div className="flex" style={{ minHeight: 200 }}>
        <div className="w-2/5 relative flex-shrink-0">
          <img
            src={coverImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 p-5 flex flex-col" style={{ color: p.text }}>
          <div className="text-[8px] tracking-[0.5em] uppercase" style={{ color: p.accent }}>
            Invitation
          </div>
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(1.25rem,6vw,1.75rem)] mt-2 leading-tight`}
            style={{ color: p.titleColor }}
          >
            {template.name}
          </h2>
          {hostName && (
            <p className="text-[10px] italic mt-1" style={{ color: p.accent }}>
              {hostName}
            </p>
          )}
          <div className="mt-auto space-y-1.5">
            <div className="h-px" style={{ background: p.rule }} />
            <div className="font-display text-3xl leading-none" style={{ color: p.accent }}>
              {dt.day}
            </div>
            <div className="text-[9px] tracking-wider uppercase" style={{ color: p.sub }}>
              {dt.month} Â· {dt.year}
            </div>
            <div className="text-[9px]" style={{ color: p.sub }}>
              {dt.time}
            </div>
          </div>
        </div>
      </div>
      <div
        className="px-5 flex items-center justify-between border-t"
        style={{ borderColor: p.rule, background: p.bg }}
      >
        <span className="text-[9px] uppercase tracking-widest" style={{ color: p.sub }}>
          {template.tagline?.slice(0, 30)}
        </span>
        <button
          className="text-[10px] px-3 py-1 rounded-full font-medium"
          style={{ background: p.accent, color: "#fff" }}
        >
          RSVP
        </button>
      </div>
    </motion.div>
  );
}

/** 3. TYPOGRAPHIE PURE â€” pas de photo, texte roi, style Ã©ditoriale */
export function Design3({ template, hostName, eventDate, themeOverrides }: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  const dark = !!template.dark;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl px-8 py-10 text-center"
      style={{
        background: dark ? "#0f0f0f" : p.bg,
        color: p.text,
        fontFamily: "var(--font-playfair)",
        ...fontVars(template, themeOverrides),
      }}
    >
      <div className="text-[8px] tracking-[0.6em] uppercase mb-8" style={{ color: p.accent }}>
        âœ¦ Vous Ãªtes invitÃ©Â·e âœ¦
      </div>
      <h2
        className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(2.5rem,10vw,3.5rem)] leading-[0.9] mb-4`}
        style={{ color: dark ? "#fff" : p.titleColor }}
      >
        {template.name}
      </h2>
      <div className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: p.accent }}>
        {dt.weekday} Â· {dt.day} {dt.month} {dt.year}
      </div>
      <div className="border-t border-b py-5 mb-6" style={{ borderColor: p.rule }}>
        <p
          className="font-serif italic text-[clamp(0.75rem,3vw,0.875rem)] leading-relaxed"
          style={{ color: dark ? "rgba(255,255,255,0.7)" : p.sub }}
        >
          {template.tagline}
        </p>
      </div>
      {hostName && (
        <p className="text-[11px] mb-6" style={{ color: p.accent }}>
          OrganisÃ© par {hostName}
        </p>
      )}
      <div
        className="font-display text-[clamp(3.5rem,12vw,4.5rem)] leading-none"
        style={{ color: p.accent }}
      >
        {dt.day}
      </div>
      <div className="text-[10px] mt-1 mb-8 tracking-widest uppercase" style={{ color: p.sub }}>
        {dt.month} {dt.year} · {dt.time}
      </div>
      <button
        className="rounded-none px-10 text-[11px] tracking-[0.3em] uppercase border-2"
        style={{ borderColor: p.accent, color: dark ? "#fff" : p.text }}
      >
        R · S · V · P
      </button>
    </motion.div>
  );
}

/** 4. DOUBLE POLAROID — deux photos empilées en diagonale */
export function Design4({
  template,
  coverImageUrl,
  coverImageUrl2,
  hostName,
  eventDate,
  themeOverrides,
  isBuilder,
  onThemeUpdate,
  onImageUpdate,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  const photo2 = coverImageUrl2 || coverImageUrl;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl pb-6"
      style={{ background: p.bg, color: p.text, ...fontVars(template, themeOverrides) }}
    >
      <div className="relative h-[340px] mx-4 mt-6">
        <div className="absolute left-0 top-0 w-48 -rotate-6 bg-white p-2 pb-8 shadow-xl z-10 transition-transform duration-500 hover:rotate-[-2deg] hover:scale-105">
          <div className="w-full aspect-[3/4] overflow-hidden">
            <InlineImageEditor isBuilder={isBuilder} onImageUpload={(file) => onImageUpdate?.("coverImage", file)}>
              <img src={coverImageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
            </InlineImageEditor>
          </div>
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="Photo2Caption"
            currentFontSize={themeOverrides?.fontSizePhoto2Caption ?? null}
            currentColor={themeOverrides?.photo2CaptionColor || "#6b7280"}
            currentFont={themeOverrides?.fontPhoto2Caption ?? null}
            currentBgColor={themeOverrides?.bgPhoto2Caption ?? null}
            currentPadding={themeOverrides?.paddingPhoto2Caption ?? null}
            currentHidden={themeOverrides?.hidePhoto2Caption ?? false}
            onUpdate={(updates) => onThemeUpdate?.(updates)}
          >
            <div className={`${getFontClass(themeOverrides?.fontPhoto2Caption, 'font-serif')} text-[10px] text-center mt-1 italic rounded px-1`} style={{ color: themeOverrides?.photo2CaptionColor || '#6b7280', backgroundColor: themeOverrides?.bgPhoto2Caption || undefined, fontSize: themeOverrides?.fontSizePhoto2Caption ? `${themeOverrides.fontSizePhoto2Caption}px` : undefined, padding: themeOverrides?.paddingPhoto2Caption != null ? `${themeOverrides.paddingPhoto2Caption}px` : undefined }}>
              notre jour ♥
            </div>
          </InlineTextEditor>
        </div>
        <div
          className="absolute right-0 top-12 w-40 rotate-5 bg-white p-2 pb-8 shadow-xl z-20 transition-transform duration-500 hover:rotate-[2deg] hover:scale-105"
          style={{ zIndex: 20 }}
        >
          <div className="w-full aspect-square overflow-hidden">
            <InlineImageEditor isBuilder={isBuilder} onImageUpload={(file) => onImageUpdate?.("coverImage2", file)}>
              <img
                src={photo2}
                alt=""
                className="w-full h-full object-cover object-right"
                loading="lazy"
              />
            </InlineImageEditor>
          </div>
        </div>
      </div>
      <div className="px-6 text-center mt-4">
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="SaveTheDate"
          currentFontSize={themeOverrides?.fontSizeSaveTheDate ?? null}
          currentColor={themeOverrides?.saveTheDateColor || p.accent}
          currentFont={themeOverrides?.fontSaveTheDate ?? null}
          currentBgColor={themeOverrides?.bgSaveTheDate ?? null}
          currentPadding={themeOverrides?.paddingSaveTheDate ?? null}
          currentHidden={themeOverrides?.hideSaveTheDate ?? false}
          onUpdate={(updates) => onThemeUpdate?.(updates)}
        >
          <div className={`${getFontClass(themeOverrides?.fontSaveTheDate, '')} tracking-[0.3em] uppercase rounded px-1 inline-block`} style={{ color: themeOverrides?.saveTheDateColor || p.accent, backgroundColor: themeOverrides?.bgSaveTheDate || undefined, fontSize: themeOverrides?.fontSizeSaveTheDate ? `${themeOverrides.fontSizeSaveTheDate}px` : "10px", padding: themeOverrides?.paddingSaveTheDate != null ? `${themeOverrides.paddingSaveTheDate}px` : undefined }}>
            ~ Save the Date ~
          </div>
        </InlineTextEditor>
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="Title"
          currentFontSize={themeOverrides?.fontSizeTitle ?? null}
          currentColor={p.titleColor}
          currentFont={themeOverrides?.fontTitle ?? null}
          currentBgColor={themeOverrides?.bgTitle ?? null}
          currentPadding={themeOverrides?.paddingTitle ?? null}
          currentHidden={themeOverrides?.hideTitle ?? false}
          onUpdate={(updates) => onThemeUpdate?.(updates)}
        >
          <h2
            className={`${getFontClass(themeOverrides?.fontTitle, getTitleFontClass(template, themeOverrides))} mt-1 leading-tight rounded px-2`}
            style={{ color: p.titleColor, fontWeight: p.titleBold ? 700 : undefined, backgroundColor: themeOverrides?.bgTitle || undefined, fontSize: themeOverrides?.fontSizeTitle ? `${themeOverrides.fontSizeTitle}px` : "clamp(2.25rem,8vw,3rem)", padding: themeOverrides?.paddingTitle != null ? `${themeOverrides.paddingTitle}px` : undefined }}
          >
            {template.name}
          </h2>
        </InlineTextEditor>
        {hostName && (
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="HostName"
            currentFontSize={themeOverrides?.fontSizeHostName ?? null}
            currentColor={themeOverrides?.hostNameColor || p.accent}
            currentFont={themeOverrides?.fontHostName ?? null}
            currentBgColor={themeOverrides?.bgHostName ?? null}
            currentPadding={themeOverrides?.paddingHostName ?? null}
            currentHidden={themeOverrides?.hideHostName ?? false}
            onUpdate={(updates) => onThemeUpdate?.(updates)}
          >
            <div className={`${getFontClass(themeOverrides?.fontHostName, '')} italic mt-1 rounded px-1 inline-block`} style={{ color: themeOverrides?.hostNameColor || p.accent, backgroundColor: themeOverrides?.bgHostName || undefined, fontSize: themeOverrides?.fontSizeHostName ? `${themeOverrides.fontSizeHostName}px` : "11px", padding: themeOverrides?.paddingHostName != null ? `${themeOverrides.paddingHostName}px` : undefined }}>
              — {hostName} —
            </div>
          </InlineTextEditor>
        )}
        <div
          className="mt-4 inline-flex items-center gap-2 border-2 border-dashed px-4 rounded-lg"
          style={{ borderColor: p.rule }}
        >
          <InlineTextEditor 
              isBuilder={isBuilder} 
              themeKey="Subtitle" 
              currentFontSize={themeOverrides?.fontSizeSubtitle ?? null} 
            currentColor={p.subtitleColor}
            currentFont={themeOverrides?.fontSubtitle ?? null}
            currentBgColor={themeOverrides?.bgSubtitle ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <div className="inline-flex items-center gap-2 rounded px-1" style={{ backgroundColor: themeOverrides?.bgSubtitle || undefined }}>
              <span
                className={`${getFontClass(themeOverrides?.fontSubtitle, 'font-display')}`}
                style={{ color: p.accent, fontWeight: p.subtitleBold ? 700 : undefined, fontSize: themeOverrides?.fontSizeSubtitle ? `${themeOverrides.fontSizeSubtitle}px` : "clamp(1rem,4vw,1.125rem)" }}
              >
                {dt.day} {dt.month.slice(0, 3)}
              </span>
              <span style={{ color: p.rule }}>·</span>
              <span className={`${getFontClass(themeOverrides?.fontSubtitle, '')}`} style={{ color: p.sub, fontWeight: p.subtitleBold ? 700 : undefined, fontSize: themeOverrides?.fontSizeSubtitle ? `${Math.max(10, themeOverrides.fontSizeSubtitle - 4)}px` : "11px" }}>
                {dt.year} · {dt.time}
              </span>
            </div>
          </InlineTextEditor>
        </div>
        <div className="mt-4 px-4">
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="ActionRSVPText"
            currentFontSize={themeOverrides?.fontSizeActionRSVPText ?? null}
            currentColor={themeOverrides?.actionRSVPTextColor || "#fff"}
            currentFont={themeOverrides?.fontActionRSVPText ?? null}
            currentBgColor={themeOverrides?.bgActionRSVPText ?? null}
            currentPadding={themeOverrides?.paddingActionRSVPText ?? null}
            currentHidden={themeOverrides?.hideActionRSVPText ?? false}
            onUpdate={(updates) => onThemeUpdate?.(updates)}
          >
            <button
              className={`${getFontClass(themeOverrides?.fontActionRSVPText, '')} mx-auto flex items-center justify-center rounded-full tracking-wider uppercase`}
              style={{ backgroundColor: themeOverrides?.bgActionRSVPText || p.accent, color: themeOverrides?.actionRSVPTextColor || "#fff", fontSize: themeOverrides?.fontSizeActionRSVPText ? `${themeOverrides.fontSizeActionRSVPText}px` : "11px", height: themeOverrides?.paddingActionRSVPText != null ? `${30 + themeOverrides.paddingActionRSVPText}px` : "40px", width: themeOverrides?.paddingActionRSVPText != null ? `${100 + themeOverrides.paddingActionRSVPText * 3}px` : "180px", padding: 0 }}
            >
              Confirmer
            </button>
          </InlineTextEditor>
        </div>
      </div>
    </motion.div>
  );
}

/** 5. ART DÃ‰CO GÃ‰OMÃ‰TRIQUE â€” cadre symÃ©trique, SVG gÃ©omÃ©trique */
export function Design5({ template, hostName, eventDate, themeOverrides }: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  const dark = !!template.dark;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl p-6"
      style={{
        background: dark ? "#111" : p.bg,
        color: p.text,
        fontFamily: "var(--font-cinzel)",
        ...fontVars(template, themeOverrides),
      }}
    >
      <div className="border-2 p-1" style={{ borderColor: p.accent }}>
        <div className="border p-5 text-center" style={{ borderColor: p.accent + "66" }}>
          <svg viewBox="0 0 160 40" className="mx-auto w-40 h-8" aria-hidden>
            <line x1="0" y1="20" x2="55" y2="20" stroke={p.accent} strokeWidth="1" />
            <polygon points="80,4 96,20 80,36 64,20" fill={p.accent} />
            <circle cx="60" cy="20" r="3" fill={p.accent} />
            <circle cx="100" cy="20" r="3" fill={p.accent} />
            <line x1="105" y1="20" x2="160" y2="20" stroke={p.accent} strokeWidth="1" />
          </svg>
          <p className="text-[9px] tracking-[0.6em] uppercase mt-4" style={{ color: p.accent }}>
            You Are Invited
          </p>
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(1.75rem,7vw,2.25rem)] mt-3 tracking-widest`}
            style={{ color: dark ? "#fff" : p.titleColor }}
          >
            {template.name.toUpperCase()}
          </h2>
          {hostName && (
            <p className="text-[10px] italic mt-1 tracking-[0.2em]" style={{ color: p.accent }}>
              {hostName}
            </p>
          )}
          <p
            className="text-[11px] italic mt-4 leading-relaxed"
            style={{ color: dark ? "rgba(255,255,255,0.6)" : p.sub }}
          >
            {template.tagline}
          </p>
          <div
            className="mt-5 grid grid-cols-3 text-center border-t pt-4"
            style={{ borderColor: p.rule }}
          >
            {[
              ["Date", `${dt.day}`],
              ["Mois", dt.month.slice(0, 3).toUpperCase()],
              ["Heure", dt.time],
            ].map(([l, v]) => (
              <div key={l}>
                <div className="text-[8px] tracking-widest uppercase" style={{ color: p.sub }}>
                  {l}
                </div>
                <div
                  className="font-display text-[clamp(1rem,4vw,1.125rem)] mt-0.5"
                  style={{ color: p.accent }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 160 40" className="mx-auto w-40 h-8 mt-4 rotate-180" aria-hidden>
            <line x1="0" y1="20" x2="55" y2="20" stroke={p.accent} strokeWidth="1" />
            <polygon points="80,4 96,20 80,36 64,20" fill={p.accent} />
            <line x1="105" y1="20" x2="160" y2="20" stroke={p.accent} strokeWidth="1" />
          </svg>
        </div>
      </div>
      <button
        className="mt-4 w-full text-[11px] tracking-[0.3em] uppercase"
        style={{ background: p.accent, color: dark ? "#111" : "#fff" }}
      >
        R.S.V.P
      </button>
    </motion.div>
  );
}

/** 6. TICKET D'ENTRÃ‰E â€” coupon dÃ©coupÃ© avec pointillÃ©s */
export function Design6({ template, hostName, eventDate, themeOverrides }: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  const dark = !!template.dark;
  const words = template.name.trim().split(/\s+/);
  const initials =
    (words[0]?.[0] ?? "A").toUpperCase() + (words[words.length - 1]?.[0] ?? "B").toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl"
      style={{
        background: p.bg,
        color: p.text,
        fontFamily: "var(--font-syne)",
        ...fontVars(template, themeOverrides),
      }}
    >
      <div className="px-7 pt-8 pb-5 text-center">
        <div className="text-[9px] tracking-[0.5em] uppercase" style={{ color: p.accent }}>
          Admission Â· 1 InvitÃ©
        </div>
        <div
          className="mt-6 mx-auto w-24 h-24 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: p.accent }}
        >
          <span className="font-display text-[clamp(1.5rem,6vw,2rem)]" style={{ color: p.accent }}>
            {initials}
          </span>
        </div>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(2rem,7vw,2.5rem)] mt-4 leading-tight`}
          style={{ color: p.titleColor }}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="font-serif italic text-[11px] mt-1" style={{ color: p.accent }}>
            â€” {hostName} â€”
          </p>
        )}
        <p className="text-[12px] italic mt-3 max-w-[220px] mx-auto" style={{ color: p.sub }}>
          {template.tagline}
        </p>
      </div>
      {/* Perforated edge */}
      <div className="relative flex items-center">
        <div className="absolute -left-3 w-6 h-6 rounded-full bg-white" />
        <div className="absolute -right-3 w-6 h-6 rounded-full bg-white" />
        <div className="flex-1 border-t border-dashed mx-4" style={{ borderColor: p.rule }} />
      </div>
      <div className="px-7 py-5 grid grid-cols-3 text-center gap-3">
        {[
          {
            icon: <Calendar className="w-4 h-4 mx-auto" />,
            top: `${dt.day} ${dt.month.slice(0, 3)}.`,
            bot: "Date",
          },
          { icon: <Clock className="w-4 h-4 mx-auto" />, top: dt.time, bot: "Heure" },
          { icon: <MapPin className="w-4 h-4 mx-auto" />, top: "Lieu", bot: "Plan" },
        ].map(({ icon, top, bot }) => (
          <div key={bot}>
            <div style={{ color: p.accent }}>{icon}</div>
            <div className="font-display text-[clamp(0.875rem,3vw,1rem)] mt-1">{top}</div>
            <div className="text-[9px] tracking-widest uppercase" style={{ color: p.sub }}>
              {bot}
            </div>
          </div>
        ))}
      </div>
      <div className="px-7 pb-6 flex gap-2">
        <button
          className="flex-1 rounded-full text-[11px] tracking-wider uppercase"
          style={{ background: p.accent, color: dark ? p.bg : "#fff" }}
        >
          Confirmer
        </button>
        <button
          className="px-4 rounded-full border text-[11px]"
          style={{ borderColor: p.accent, color: p.accent }}
        >
          Infos
        </button>
      </div>
    </motion.div>
  );
}

/** 7. MAGAZINE Ã‰DITORIAL â€” grille asymÃ©trique, chiffre gÃ©ant */
export function Design7({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10"
      style={{
        background: p.bg,
        color: p.text,
        fontFamily: "var(--font-playfair)",
        ...fontVars(template, themeOverrides),
      }}
    >
      <div className="grid grid-cols-[1fr_1.4fr] min-h-[380px]">
        <div className="relative">
          <img
            src={coverImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: `${p.accent}22` }} />
        </div>
        <div className="px-5 py-6 flex flex-col">
          <div
            className="text-[9px] tracking-[0.5em] uppercase pb-2 border-b"
            style={{ color: p.accent, borderColor: p.rule }}
          >
            NÂº 01 Â· Invitation
          </div>
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(2rem,7vw,2.5rem)] leading-[0.9] mt-3`}
            style={{ color: p.titleColor }}
          >
            {template.name}
          </h2>
          {hostName && (
            <p className="text-[10px] italic mt-1" style={{ color: p.accent }}>
              {hostName}
            </p>
          )}
          <p className="text-[11px] italic mt-3 leading-relaxed" style={{ color: p.sub }}>
            {template.tagline?.slice(0, 50)}
          </p>
          <div className="mt-auto pt-4">
            <div
              className="font-display leading-none"
              style={{ fontSize: "clamp(3rem,12vw,4rem)", color: p.accent, lineHeight: 1 }}
            >
              {dt.day}
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: p.sub }}>
                {dt.month} {dt.year}
              </span>
              <span
                className="font-display text-[clamp(0.875rem,3vw,1rem)]"
                style={{ color: p.text }}
              >
                {dt.time}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="px-5 border-t flex items-center justify-between"
        style={{ borderColor: p.rule }}
      >
        <span className="text-[9px] uppercase tracking-widest" style={{ color: p.sub }}>
          RSVP requis
        </span>
        <button
          className="text-[10px] px-4 py-1.5 rounded-full font-medium"
          style={{ background: p.accent, color: "#fff" }}
        >
          Je confirme <ArrowRight className="w-3 h-3 inline ml-1" />
        </button>
      </div>
    </motion.div>
  );
}

/** 8. CERCLE CENTRÃ‰ â€” photo ronde centrale, texte en couronne */
export function Design8({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl pt-8 pb-6 px-6 text-center"
      style={{
        background: p.bg,
        color: p.text,
        fontFamily: "var(--font-syne)",
        ...fontVars(template, themeOverrides),
      }}
    >
      <p className="text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: p.accent }}>
        Vous Ãªtes invitÃ©Â·e
      </p>
      {/* Outer decorative ring */}
      <div className="relative mx-auto mb-4" style={{ width: 180, height: 180 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 180 180" aria-hidden>
          <circle
            cx="90"
            cy="90"
            r="86"
            fill="none"
            stroke={p.accent}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle cx="90" cy="90" r="78" fill="none" stroke={p.accent} strokeWidth="0.5" />
        </svg>
        <div
          className="absolute inset-3 rounded-full overflow-hidden"
          style={{ boxShadow: `0 8px 32px ${p.accent}44` }}
        >
          <img
            src={coverImageUrl}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            loading="lazy"
          />
        </div>
      </div>
      <h2
        className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(2.5rem,8vw,3.5rem)] leading-tight`}
        style={{ color: p.titleColor }}
      >
        {template.name}
      </h2>
      {hostName && (
        <p className="text-[11px] italic mt-1.5" style={{ color: p.accent }}>
          â€” {hostName} â€”
        </p>
      )}
      <div className="flex items-center justify-center gap-2 mt-4 text-[11px]">
        <span style={{ color: p.accent }}>âœ¦</span>
        <span style={{ color: p.text }}>
          {dt.day} {dt.month} {dt.year}
        </span>
        <span style={{ color: p.accent }}>âœ¦</span>
      </div>
      <div className="text-[11px] mt-1" style={{ color: p.sub }}>
        {dt.time}
      </div>
      <p
        className="font-serif italic text-[clamp(0.75rem,3vw,0.875rem)] mt-4 leading-relaxed"
        style={{ color: p.sub }}
      >
        Â« {template.tagline} Â»
      </p>
      <button
        className="mt-5 rounded-full px-8 text-[11px] tracking-wider uppercase font-medium"
        style={{ background: p.accent, color: "#fff" }}
      >
        RÃ©pondre
      </button>
    </motion.div>
  );
}

/** 9. BANDE HORIZONTALE â€” photo en banniÃ¨re pleine largeur, infos sous */
export function Design9({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10"
      style={{
        background: p.bg,
        fontFamily: "var(--font-syne)",
        ...fontVars(template, themeOverrides),
      }}
    >
      {/* BanniÃ¨re photo */}
      <div className="relative w-full overflow-hidden" style={{ height: 130 }}>
        <img
          src={coverImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, transparent 40%, ${p.bg} 100%)` }}
        />
      </div>
      {/* Contenu */}
      <div className="px-6 pb-6 -mt-6 relative">
        <div className="w-6 h-0.5 mb-3" style={{ background: p.accent }} />
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(2.5rem,8vw,3.5rem)] leading-tight`}
          style={{ color: p.titleColor }}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-[11px] italic mt-1" style={{ color: p.accent }}>
            {hostName}
          </p>
        )}
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          {[
            { label: "Jour", val: dt.day },
            { label: "Mois", val: dt.month.slice(0, 3).toUpperCase() },
            { label: "Heure", val: dt.time },
          ].map(({ label, val }) => (
            <div key={label} className="rounded-xl py-2" style={{ background: p.accent + "18" }}>
              <div
                className="font-display text-[clamp(1rem,4vw,1.125rem)]"
                style={{ color: p.accent }}
              >
                {val}
              </div>
              <div className="text-[8px] tracking-widest uppercase mt-0.5" style={{ color: p.sub }}>
                {label}
              </div>
            </div>
          ))}
        </div>
        <p
          className="font-serif italic text-[clamp(0.75rem,3vw,0.875rem)] mt-4 text-center"
          style={{ color: p.sub }}
        >
          Â« {template.tagline} Â»
        </p>
        <button
          className="mt-4 w-full rounded-xl text-[11px] tracking-widest uppercase font-medium"
          style={{ background: p.accent, color: "#fff" }}
        >
          Confirmer ma prÃ©sence
        </button>
      </div>
    </motion.div>
  );
}

/** 10. LUXE SOMBRE â€” fond trÃ¨s sombre, typographie or sur noir */
export function Design10({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  const gold = p.accent;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl"
      style={{
        background: "#0a0a0a",
        color: "#f0ead6",
        fontFamily: "var(--font-cinzel)",
        ...fontVars(template, themeOverrides),
      }}
    >
      {/* Photo avec overlay dorÃ© */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <img
          src={coverImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${gold}22 0%, #0a0a0a 100%)` }}
        />
        <div className="absolute bottom-4 left-6">
          <div className="text-[9px] tracking-[0.6em] uppercase" style={{ color: gold }}>
            â€” Invitation exclusive â€”
          </div>
        </div>
      </div>
      <div className="px-7 py-6 text-center">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(2.5rem,8vw,3.5rem)] leading-tight`}
          style={{ color: "#f0ead6" }}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-[11px] mt-2 tracking-[0.2em]" style={{ color: gold }}>
            {hostName}
          </p>
        )}
        {/* Ligne or */}
        <div className="flex items-center gap-3 my-5 justify-center">
          <div
            className="h-px flex-1"
            style={{ background: `linear-gradient(to right, transparent, ${gold})` }}
          />
          <Star className="w-3 h-3" style={{ color: gold }} />
          <div
            className="h-px flex-1"
            style={{ background: `linear-gradient(to left, transparent, ${gold})` }}
          />
        </div>
        <div className="grid grid-cols-3 text-center gap-2">
          {[
            ["Date", `${dt.day} ${dt.month.slice(0, 3).toUpperCase()}`],
            ["AnnÃ©e", dt.year],
            ["Heure", dt.time],
          ].map(([l, v]) => (
            <div key={l} className="py-2 border" style={{ borderColor: gold + "33" }}>
              <div
                className="text-[8px] tracking-widest uppercase mb-1"
                style={{ color: gold + "99" }}
              >
                {l}
              </div>
              <div
                className="font-display text-[clamp(0.875rem,3vw,1rem)]"
                style={{ color: "#f0ead6" }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
        <p
          className="font-serif italic text-[11px] mt-5 leading-relaxed"
          style={{ color: "rgba(240,234,214,0.6)" }}
        >
          {template.tagline}
        </p>
        <button
          className="mt-5 px-10 text-[11px] tracking-[0.3em] uppercase border"
          style={{ borderColor: gold, color: gold }}
        >
          R Â· S Â· V Â· P
        </button>
      </div>
    </motion.div>
  );
}

/** 11. STORY VERTICAL â€” style Instagram story, trÃ¨s Ã©purÃ© */
export function Design11({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl"
      style={{
        aspectRatio: "9/14",
        maxHeight: 500,
        fontFamily: "var(--font-syne)",
        ...fontVars(template, themeOverrides),
      }}
    >
      <img
        src={coverImageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
      {/* Gradient trÃ¨s fort en bas */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.95) 70%)" }}
      />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col px-6 py-8">
        {/* Top */}
        <div className="flex justify-between items-start">
          <div className="text-[9px] text-white/70 tracking-[0.4em] uppercase bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
            Invitation
          </div>
          <div
            className="text-[9px] tracking-widest uppercase py-1 px-2 rounded-full"
            style={{ background: p.accent, color: "#fff" }}
          >
            {dt.year}
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-auto">
          <p
            className="font-serif italic text-white/80 text-[clamp(0.75rem,3vw,0.875rem)] mb-2"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            {template.tagline?.slice(0, 40)}
          </p>
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(2.5rem,8vw,3.5rem)] text-white leading-tight`}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            {template.name}
          </h2>
          {hostName && (
            <p
              className="text-white/80 text-xs mt-1"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              {hostName}
            </p>
          )}
          <div
            className="mt-4 flex items-center gap-2 text-white/90 text-[11px]"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            <Calendar className="w-3.5 h-3.5" style={{ color: p.accent }} />
            {dt.weekday} {dt.day} {dt.month} Â· {dt.time}
          </div>
          <button
            className="mt-4 w-full rounded-2xl text-[12px] font-bold tracking-wide"
            style={{ background: p.accent, color: "#fff" }}
          >
            Confirmer ma prÃ©sence â†’
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/** 12. MINIMALISTE EPURÃ‰ â€” beaucoup d'espace, trÃ¨s peu d'Ã©lÃ©ments */
export function Design12({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/8"
      style={{
        background: p.bg,
        color: p.text,
        fontFamily: "var(--font-playfair)",
        ...fontVars(template, themeOverrides),
      }}
    >
      {/* Photo cÃ´tÃ© droit sur fond blanc */}
      <div className="flex items-stretch" style={{ minHeight: 280 }}>
        <div className="flex-1 px-7 py-8 flex flex-col justify-between">
          <div>
            <div className="w-8 h-0.5 mb-5" style={{ background: p.accent }} />
            <p className="text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: p.accent }}>
              Vous Ãªtes conviÃ©Â·e
            </p>
            <h2
              className={`${getTitleFontClass(template, themeOverrides)} text-[clamp(1.75rem,6vw,2.25rem)] leading-tight`}
              style={{ color: p.titleColor }}
            >
              {template.name}
            </h2>
            {hostName && (
              <p className="text-[10px] mt-2 italic" style={{ color: p.sub }}>
                {hostName}
              </p>
            )}
          </div>
          <div>
            <div
              className="text-[clamp(1.5rem,6vw,2rem)] font-display leading-none"
              style={{ color: p.accent }}
            >
              {dt.day}
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: p.sub }}>
              {dt.month} Â· {dt.year}
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: p.sub }}>
              {dt.time}
            </div>
            <button
              className="mt-4 rounded-full px-5 text-[10px] tracking-wider uppercase"
              style={{ background: p.accent, color: "#fff" }}
            >
              RSVP
            </button>
          </div>
        </div>
        <div className="w-2/5 relative flex-shrink-0">
          <img
            src={coverImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
      <div className="px-7 border-t text-[10px]" style={{ borderColor: p.rule, color: p.sub }}>
        {template.tagline?.slice(0, 45)}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Dispatch â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const DESIGNS = [
  Design1,
  Design2,
  Design3,
  Design4,
  Design5,
  Design6,
  Design7,
  Design8,
  Design9,
  Design10,
  Design11,
  Design12,
];
