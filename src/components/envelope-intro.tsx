import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import type { Template } from "@/lib/templates";
import type { ThemeOverrides } from "@/components/preview-invitation";

interface Props {
  template: Template;
  hostName?: string | null;
  title: string;
  onOpen: () => void;
  opening: boolean;
  themeOverrides?: ThemeOverrides | null;
  previewMode?: boolean;
}

export const FLAP_PATHS: Record<string, string> = {
  classic: "M0,0 L100,0 L50,55 Z",
  "deep-v": "M0,0 L100,0 L50,80 Z",
  scalloped:
    "M0,0 L100,0 L100,30 Q90,40 80,30 Q70,40 60,30 Q50,40 40,30 Q30,40 20,30 Q10,40 0,30 Z",
  rounded: "M0,0 L100,0 L100,20 Q50,65 0,20 Z",
  square: "M0,0 L100,0 L100,45 L0,45 Z",
  "tapered-square": "M0,0 L100,0 L85,45 L15,45 Z",
  "asymmetric-right": "M0,0 L100,0 L100,55 L0,20 Z",
  "asymmetric-left": "M0,0 L100,0 L100,20 L0,55 Z",
  "gothic-arch": "M0,0 L100,0 L100,20 Q75,30 50,60 Q25,30 0,20 Z",
  "vintage-point": "M0,0 L100,0 L80,25 L50,60 L20,25 Z",
  "double-scallop": "M0,0 L100,0 L100,25 Q75,55 50,35 Q25,55 0,25 Z",
  wavy: "M0,0 L100,0 L100,30 C75,50 75,10 50,30 C25,50 25,10 0,30 Z",
  deckle:
    "M0,0 L100,0 L100,40 L95,42 L90,38 L85,43 L80,39 L75,44 L70,38 L65,42 L60,37 L55,43 L50,38 L45,44 L40,39 L35,43 L30,37 L25,44 L20,38 L15,43 L10,39 L5,42 L0,40 Z",
  ribbon: "M0,0 L100,0 L100,50 L50,35 L0,50 Z",
  convex: "M0,0 L100,0 L100,35 Q50,65 0,35 Z",
  "scallop-triangle": "M0,0 L100,0 L100,20 Q75,10 50,60 Q25,10 0,20 Z",
  "s-curve": "M0,0 L100,0 L100,25 C75,65 25,5 0,45 Z",
  diamond: "M0,0 L100,0 L70,25 L50,60 L30,25 Z",
  baroque: "M0,0 L100,0 L100,15 Q80,25 70,15 Q50,60 30,15 Q20,25 0,15 Z",
  minimalist: "M0,0 L100,0 L100,25 L0,25 Z",
  cd: "M0,0 L100,0 L100,100 L0,100 Z M50,50 m-35,0 a35,35 0 1,0 70,0 a35,35 0 1,0 -70,0 Z",
  "circle-pouch": "M0,50 A50,50 0 0,1 100,50 Z",
  gatefold: "M0,0 L100,0 L100,50 L0,50 Z M0,50 L100,50 L100,100 L0,100 Z", // Just a placeholder for the thumbnail
};

export function EnvelopeIntro({
  template,
  hostName,
  title,
  onOpen,
  opening,
  themeOverrides,
  previewMode = false,
}: Props) {
  const templateEnv = template.envelope ?? {
    body: "#f4e9d2",
    flap: "#e8d6a8",
    seal: "#8b1a1a",
    sealText: "✦",
    cardBg: "#fbf7f0",
  };
  const env = {
    body: themeOverrides?.envelopeBody || templateEnv.body,
    flap: themeOverrides?.envelopeFlap || templateEnv.flap,
    seal: themeOverrides?.envelopeSeal || templateEnv.seal,
    sealText: themeOverrides?.envelopeSealText || templateEnv.sealText || "✦",
    cardBg: themeOverrides?.envelopeCardBg || templateEnv.cardBg,
  };

  const direction = themeOverrides?.envelopeDirection || "top";
  const styleKey = themeOverrides?.envelopeStyle || "classic";
  const flapPath = FLAP_PATHS[styleKey] || FLAP_PATHS["classic"];
  const isCircular = styleKey === "cd" || styleKey === "circle-pouch";

  const dark = template.dark;
  const isSeminaire = template.category === "seminaire";

  const displayTitle = themeOverrides?.envelopeTitleText?.trim() || title;
  const envelopeFontClass =
    themeOverrides?.envelopeTitleFont === "script"
      ? "font-script"
      : themeOverrides?.envelopeTitleFont === "serif"
        ? "font-serif"
        : themeOverrides?.envelopeTitleFont === "sans"
          ? "font-sans"
          : themeOverrides?.envelopeTitleFont === "display"
            ? "font-display"
            : template.titleFont === "script"
              ? "font-script"
              : "font-display";

  const handleOpen = () => {
    if (!previewMode) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: [env.seal, "#ffffff", env.flap],
      });
    }
    onOpen();
  };

  if (isSeminaire) {
    return (
      <motion.div
        initial={previewMode ? {} : { opacity: 0 }}
        animate={previewMode ? {} : { opacity: 1 }}
        exit={previewMode ? {} : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className={`${previewMode ? "absolute inset-0 z-10" : "fixed inset-0 z-[60]"} flex flex-col items-center justify-center overflow-hidden ${template.bgClass}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.2),transparent_60%)]" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: opening ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`mb-12 text-xs uppercase tracking-[0.4em] text-center ${dark ? "text-ivory/80" : "text-primary/80"}`}
          style={{
            fontWeight: themeOverrides?.fontWeightAll || themeOverrides?.fontWeightTitle || 700,
          }}
        >
          {themeOverrides?.textInvitationPour || "Une invitation pour"}{" "}
          {hostName ? <span className="font-serif italic">{hostName}</span> : "vous"}
        </motion.p>

        <div
          className="relative"
          style={
            previewMode
              ? { width: "35%", minWidth: "140px", aspectRatio: "420/500", perspective: 1200 }
              : { width: "min(85vw, 420px)", height: "min(120vw, 500px)", perspective: 1200 }
          }
        >
          {/* Card sliding UP */}
          <motion.div
            initial={{ y: "20%", opacity: 0 }}
            animate={
              opening
                ? {
                    y: "-60%",
                    opacity: 1,
                    transition: { delay: 0.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                  }
                : { y: "20%", opacity: 1, transition: { duration: 0.8, delay: 0.2 } }
            }
            className="absolute inset-x-2 top-0 bottom-[40%] rounded-t-xl shadow-xl flex flex-col items-center text-center pt-10 px-8 border border-border/50"
            style={{ background: env.cardBg, color: dark ? "#f5ead0" : "#3a1f15", zIndex: 1 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] opacity-70 mb-4">
              {themeOverrides?.ceremonyTitle || themeOverrides?.eventTitle || template.name}
            </p>
            <h2
              className={`${envelopeFontClass} text-2xl md:text-3xl`}
              style={{
                color: env.seal,
                fontWeight: themeOverrides?.fontWeightTitle || 700,
                ...(themeOverrides?.fontSizeEnvelopeTitle
                  ? { fontSize: themeOverrides.fontSizeEnvelopeTitle + "px" }
                  : {}),
              }}
            >
              {displayTitle}
            </h2>
          </motion.div>

          {/* Sleeve covering the lower part */}
          <div
            className="absolute inset-x-0 bottom-0 rounded-b-xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] overflow-hidden border-t border-white/20"
            style={{ height: "60%", background: env.body, zIndex: 2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              {/* Subtle logo/icon placeholder */}
              <div className="w-12 h-12 rounded-full border border-current opacity-20 flex items-center justify-center">
                <span className="text-xl">🏛</span>
              </div>
              {/* Modern button */}
              <motion.button
                type="button"
                onClick={onOpen}
                disabled={opening}
                className="px-8 py-3.5 rounded-sm text-xs uppercase tracking-[0.2em] font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                style={{ background: env.seal, color: "#fff" }}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  opening
                    ? { opacity: 0, scale: 0.9 }
                    : { opacity: 1, y: 0, transition: { delay: 0.6 } }
                }
              >
                {themeOverrides?.textCliquezSceau || "Découvrir l'événement"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={previewMode ? {} : { opacity: 0 }}
      animate={previewMode ? {} : { opacity: 1 }}
      exit={previewMode ? {} : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`${previewMode ? "absolute inset-0 z-10" : "fixed inset-0 z-[60]"} flex flex-col items-center justify-center overflow-hidden ${template.bgClass}`}
    >
      {/* ambient sparkle */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.2),transparent_60%)]" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mb-8 text-xs uppercase tracking-[0.4em] text-center ${dark ? "text-ivory/80" : "text-primary/80"}`}
        style={{
          fontWeight: themeOverrides?.fontWeightAll || themeOverrides?.fontWeightTitle || 700,
        }}
      >
        {themeOverrides?.textInvitationPour || "Une invitation pour"}{" "}
        {hostName ? <span className="font-serif italic">{hostName}</span> : "vous"}
      </motion.p>

      {/* Envelope */}
      <div
        className="relative"
        style={
          previewMode
            ? { width: "45%", minWidth: "180px", aspectRatio: "460/300", perspective: 1200 }
            : { width: "min(90vw, 460px)", height: "min(60vw, 300px)", perspective: 1200 }
        }
      >
        {/* card sliding out */}
        <motion.div
          initial={{ x: 0, y: 0, opacity: 0, rotateY: 180, scale: 0.95 }}
          animate={
            opening
              ? {
                  x: direction === "left" ? "85%" : direction === "right" ? "-85%" : 0,
                  y: direction === "top" ? "-85%" : 0,
                  opacity: 1,
                  rotateY: 0,
                  scale: 1,
                  transition: { delay: 0.55, duration: 1.1, ease: [0.2, 0.7, 0.2, 1] },
                }
              : { x: 0, y: 0, opacity: 0, rotateY: 180, scale: 0.95 }
          }
          className={`absolute inset-x-4 top-3 bottom-3 shadow-2xl flex flex-col items-center justify-center text-center px-6 ${styleKey === "circle-pouch" ? "rounded-full" : "rounded-md"}`}
          style={{
            background: env.cardBg,
            color: dark ? "#f5ead0" : "#3a1f15",
            zIndex: 1,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] opacity-70 text-center w-full">
            {themeOverrides?.ceremonyTitle || themeOverrides?.eventTitle || "Invitation"}
          </p>
          <h2
            className={`mt-2 text-center w-full ${envelopeFontClass} ${
              previewMode
                ? "text-lg md:text-xl"
                : "text-2xl md:text-4xl"
            }`}
            style={{
              color: env.seal,
              fontWeight:
                themeOverrides?.fontWeightTitle ||
                themeOverrides?.fontWeightAll ||
                (themeOverrides?.titleBold ? 700 : 700),
              ...(themeOverrides?.fontSizeEnvelopeTitle
                ? { fontSize: themeOverrides.fontSizeEnvelopeTitle + "px" }
                : {}),
            }}
          >
            {displayTitle}
          </h2>
          <div className="mt-2 text-lg" aria-hidden>
            {template.emoji}
          </div>
        </motion.div>

        {/* envelope body (back) */}
        <div
          className={`absolute inset-0 shadow-2xl ${styleKey === "circle-pouch" ? "rounded-full" : "rounded-md"}`}
          style={{
            background: env.body,
            zIndex: 2,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        />

        {/* triangular sides for envelope shape */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ zIndex: 3 }}
        >
          <defs>
            <filter id="paper-texture-body" x="0" y="0" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                numOctaves="3"
                result="noise"
              />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0"
                in="noise"
                result="coloredNoise"
              />
              <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
            </filter>
          </defs>
          {isCircular ? (
            <>
              {styleKey === "cd" && (
                <path
                  d="M0,0 L100,0 L100,100 L0,100 Z M50,50 m-35,0 a35,35 0 1,0 70,0 a35,35 0 1,0 -70,0 Z"
                  fill={env.flap}
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth="0.3"
                  filter="url(#paper-texture-body)"
                  fillRule="evenodd"
                />
              )}
              {styleKey === "circle-pouch" && (
                <path
                  d="M0,50 A50,50 0 0,0 100,50 Z"
                  fill={env.body}
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="0.3"
                  filter="url(#paper-texture-body)"
                />
              )}
            </>
          ) : (
            <>
              {direction === "top" && (
                <>
                  <polygon
                    points="0,0 50,50 0,100"
                    fill={env.body}
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="0.3"
                    filter="url(#paper-texture-body)"
                  />
                  <polygon
                    points="100,0 50,50 100,100"
                    fill={env.body}
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="0.3"
                    filter="url(#paper-texture-body)"
                  />
                  <polygon
                    points="0,100 50,60 100,100"
                    fill={env.flap}
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="0.3"
                    filter="url(#paper-texture-body)"
                  />
                </>
              )}
              {direction === "left" && (
                <>
                  <polygon
                    points="0,0 50,50 100,0"
                    fill={env.body}
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="0.3"
                    filter="url(#paper-texture-body)"
                  />
                  <polygon
                    points="0,100 50,50 100,100"
                    fill={env.body}
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="0.3"
                    filter="url(#paper-texture-body)"
                  />
                  <polygon
                    points="100,0 40,50 100,100"
                    fill={env.flap}
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="0.3"
                    filter="url(#paper-texture-body)"
                  />
                </>
              )}
              {direction === "right" && (
                <>
                  <polygon
                    points="0,0 50,50 100,0"
                    fill={env.body}
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="0.3"
                    filter="url(#paper-texture-body)"
                  />
                  <polygon
                    points="0,100 50,50 100,100"
                    fill={env.body}
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="0.3"
                    filter="url(#paper-texture-body)"
                  />
                  <polygon
                    points="0,0 60,50 0,100"
                    fill={env.flap}
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="0.3"
                    filter="url(#paper-texture-body)"
                  />
                </>
              )}
            </>
          )}
        </svg>

        {/* Flap(s) */}
        {styleKey === "gatefold" ? (
          <>
            {/* Left Door */}
            <motion.div
              className="absolute inset-0"
              style={{
                transformOrigin: "left",
                transformStyle: "preserve-3d",
                zIndex: opening ? 0 : 4,
              }}
              initial={{ rotateY: 0 }}
              animate={opening ? { rotateY: -180 } : { rotateY: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.15))" }}
              >
                <g transform="matrix(0 1 1 0 0 0)">
                  <path
                    d="M0,0 L100,0 L100,50 L0,50 Z"
                    fill={env.flap}
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth="0.4"
                    filter="url(#paper-texture)"
                  />
                  <path d="M0,0 L100,0 L100,50 L0,50 Z" fill="url(#flap-shade)" />
                </g>
              </svg>
            </motion.div>
            {/* Right Door */}
            <motion.div
              className="absolute inset-0"
              style={{
                transformOrigin: "right",
                transformStyle: "preserve-3d",
                zIndex: opening ? 0 : 4,
              }}
              initial={{ rotateY: 0 }}
              animate={opening ? { rotateY: 180 } : { rotateY: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.15))" }}
              >
                <g transform="matrix(0 1 1 0 0 0)">
                  <path
                    d="M0,50 L100,50 L100,100 L0,100 Z"
                    fill={env.flap}
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth="0.4"
                    filter="url(#paper-texture)"
                  />
                  <path d="M0,50 L100,50 L100,100 L0,100 Z" fill="url(#flap-shade)" />
                </g>
              </svg>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="absolute inset-0"
            style={{
              transformOrigin: direction,
              transformStyle: "preserve-3d",
              zIndex: opening ? 0 : 4,
            }}
            initial={{ rotateX: 0, rotateY: 0 }}
            animate={
              opening
                ? {
                    rotateX: direction === "top" ? -180 : 0,
                    rotateY: direction === "left" ? -180 : direction === "right" ? 180 : 0,
                  }
                : { rotateX: 0, rotateY: 0 }
            }
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.15))" }}
            >
              <defs>
                <filter id="paper-texture" x="0" y="0" width="100%" height="100%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.04"
                    numOctaves="3"
                    result="noise"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0"
                    in="noise"
                    result="coloredNoise"
                  />
                  <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
                </filter>
              </defs>
              <g
                transform={
                  direction === "left"
                    ? "matrix(0 1 1 0 0 0)"
                    : direction === "right"
                      ? "matrix(0 1 -1 0 100 0)"
                      : "matrix(1 0 0 1 0 0)"
                }
              >
                <path
                  d={flapPath}
                  fill={env.flap}
                  stroke="rgba(0,0,0,0.12)"
                  strokeWidth="0.4"
                  filter="url(#paper-texture)"
                />
                <path d={flapPath} fill="url(#flap-shade)" />
              </g>
              <defs>
                <linearGradient id="flap-shade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}

        {/* Wax seal */}
        <motion.button
          type="button"
          onClick={handleOpen}
          disabled={opening}
          aria-label="Ouvrir l'invitation"
          className="absolute rounded-full flex items-center justify-center font-display select-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: direction === "left" ? "55%" : direction === "right" ? "45%" : "50%",
            top: direction === "left" || direction === "right" ? "50%" : "55%",
            width: previewMode ? 45 : "min(22vw, 96px)",
            height: previewMode ? 45 : "min(22vw, 96px)",
            background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, ${env.seal} 40%, white), ${env.seal} 70%, color-mix(in oklab, ${env.seal} 60%, black))`,
            color: "#fff",
            boxShadow: `0 15px 30px rgba(0,0,0,0.4), inset 0 3px 6px rgba(255,255,255,0.5), inset 0 -6px 12px rgba(0,0,0,0.6), 0 0 0 1px color-mix(in oklab, ${env.seal} 40%, black)`,
            zIndex: 5,
          }}
          initial={{ scale: 0, rotate: -20 }}
          animate={
            opening
              ? { scale: 0, opacity: 0, rotate: 30, transition: { duration: 0.35 } }
              : { scale: [0, 1.05, 1], rotate: 0, transition: { duration: 0.7, delay: 0.4 } }
          }
          whileHover={!opening ? { scale: 1.06 } : undefined}
          whileTap={!opening ? { scale: 0.95 } : undefined}
        >
          <span
            className={previewMode ? "text-lg drop-shadow" : "text-2xl md:text-3xl drop-shadow"}
            style={
              themeOverrides?.fontSizeEnvelopeSeal
                ? { fontSize: themeOverrides.fontSizeEnvelopeSeal + "px" }
                : undefined
            }
          >
            {env.sealText ?? "✦"}
          </span>
        </motion.button>
      </div>

      <motion.button
        type="button"
        onClick={handleOpen}
        disabled={opening}
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className={`mt-10 text-xs uppercase tracking-[0.4em] text-center hover:opacity-100 transition ${dark ? "text-ivory/70" : "text-primary/70"}`}
        style={{ fontWeight: themeOverrides?.fontWeightAll || 700 }}
      >
        {themeOverrides?.textCliquezSceau || "✦ Cliquez sur le sceau pour ouvrir ✦"}
      </motion.button>
    </motion.div>
  );
}
