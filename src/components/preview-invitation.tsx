import type { Template } from "@/lib/templates";
import { InlineTextEditor, InlineImageEditor } from "@/components/inline-editor";
import { MapPin, Heart, Gift, Calendar, Clock } from "lucide-react";
import ornamentLeafSmall from "@/assets/ornament-leaf-small.png";
import ornamentLeaves from "@/assets/ornament-leaves.png";
import sageBouquet from "@/assets/templates/sage-botanical/bouquet.png";
import lavenderSprig from "@/assets/templates/lavender-dream/sprig.png";
import bordeauxFlorals from "@/assets/templates/bordeaux-romance/florals.png";
import dustyBlueBouquet from "@/assets/templates/dusty-blue-toile/bouquet.png";
import sunflowerLavender from "@/assets/templates/sunflower-lavender/bouquet.png";
import greeneryWreath from "@/assets/templates/greenery-frame/wreath.png";
import { GenerativeLayout } from "@/components/generative-layout";
import { FloatingAudioPlayer } from "@/components/floating-audio-player";
import { PremiumRSVP } from "@/components/premium-rsvp";

/** Per-template dedicated illustration. When present the IllustratedLayout is used. */
const TEMPLATE_ILLUSTRATIONS: Record<string, { src: string; tint: string }> = {
  "mariage-sage-botanical": { src: sageBouquet, tint: "#4a6b48" },
  "mariage-lavender-dream": { src: lavenderSprig, tint: "#6b3fa0" },
  "mariage-bordeaux-romance": { src: bordeauxFlorals, tint: "#8b1a2a" },
  "mariage-dusty-blue-toile": { src: dustyBlueBouquet, tint: "#2f4d77" },
  "mariage-sunflower-lavender": { src: sunflowerLavender, tint: "#c98a1a" },
  "mariage-greenery-frame": { src: greeneryWreath, tint: "#5a7a4d" },
};

interface Props {
  template: Template;
  coverImageUrl?: string | null;
  coverImageUrl2?: string | null;
  title?: string | null;
  hostName?: string | null;
  message?: string | null;
  eventDate?: string | null;
  themeOverrides?: ThemeOverrides | null;
  musicUrl?: string | null;
  isBuilder?: boolean;
  onThemeUpdate?: (updates: any) => void;
  onImageUpdate?: (key: string, file: File) => void;
}

interface LayoutProps extends Omit<Props, "coverImageUrl"> {
  coverImageUrl: string;
  coverImageUrl2?: string | null;
  hostName?: string | null;
  eventDate?: string | null;
  message?: string | null;
  themeOverrides?: ThemeOverrides | null;
  musicUrl?: string | null;
}

export interface ThemeOverrides {
  fontPairIndex?: number | null;
  titleFont?: "script" | "display" | "serif" | "sans" | null;
  forceEnvelope?: boolean | null;
  scrollAnimation?: "fade-blur" | "fade-slide" | "scale-up" | "none" | null;
  layoutOverride?: string | null;
  accent?: string | null;
  bg?: string | null;
  text?: string | null;
  textColor?: string | null;
  /** Couleur personnalisée pour les titres (noms des mariés / nom de l'événement) */
  titleColor?: string | null;
  /** Gras forcé sur les titres (booléen pour compat) */
  titleBold?: boolean | null;
  /** Poids typographique du titre (100–1000) */
  fontWeightTitle?: number | null;
  /** Taille de police du titre (en px ou em) */
  fontSizeTitle?: number | null;
  fontTitle?: string | null;
  bgTitle?: string | null;
  /** Couleur personnalisée pour les sous-titres / textes secondaires */
  subtitleColor?: string | null;
  /** Gras forcé sur les sous-titres */
  subtitleBold?: boolean | null;
  /** Poids typographique des sous-titres (100–1000) */
  fontWeightSubtitle?: number | null;
  /** Taille de police des sous-titres (en px ou em) */
  fontSizeSubtitle?: number | null;
  fontSubtitle?: string | null;
  bgSubtitle?: string | null;
  /** Gras forcé sur les dates */
  dateBold?: boolean | null;
  /** Couleur personnalisée pour les dates */
  dateColor?: string | null;
  /** Couleur pour le titre de cérémonie / événement */
  ceremonyColor?: string | null;
  /** Poids typographique des dates (100–1000) */
  fontWeightDate?: number | null;
  /** Taille de police des dates (en px ou em) */
  fontSizeDate?: number | null;
  fontDate?: string | null;
  bgDate?: string | null;
  /** Couleur du message principal */
  messageColor?: string | null;
  /** Taille de police du message (en px ou em) */
  fontSizeMessage?: number | null;
  fontMessage?: string | null;
  bgMessage?: string | null;
  /** Couleur des sections annexes (Programme, etc.) */
  extraSectionColor?: string | null;
  /** Taille de police des sections annexes (en px ou em) */
  fontSizeExtraSection?: number | null;
  /** Gras forcé sur TOUS les textes */
  allBold?: boolean | null;
  /** Poids typographique global (100–1000) */
  fontWeightAll?: number | null;

  // --- Couleurs et style de l'enveloppe ---
  envelopeStyle?: string | null;
  envelopeDirection?: "top" | "left" | "right" | null;
  envelopeBody?: string | null;
  envelopeFlap?: string | null;
  envelopeSeal?: string | null;
  envelopeSealText?: string | null;
  envelopeCardBg?: string | null;
  envelopeTitleText?: string | null;
  envelopeTitleFont?: "script" | "display" | "serif" | "sans" | null;

  // --- Textes personnalisables ---
  ceremonyTitle?: string | null;
  eventTitle?: string | null;
  textInvitationPour?: string | null;
  textCliquezSceau?: string | null;
  textNotreHistoire?: string | null;
  textLeDeroule?: string | null;
  textLeLieu?: string | null;
  textGalerie?: string | null;
  textInfosPratiques?: string | null;
  textPlusQue?: string | null;
  textSouvenirs?: string | null;
  textBonASavoir?: string | null;
  textRsvpTitre?: string | null;
  textRsvpSousTitre?: string | null;
  textDressCode?: string | null;
  textCadeaux?: string | null;
  textHebergement?: string | null;

  // --- Tailles de police complémentaires ---
  fontSizeBody?: number | null;
  fontSizeLabel?: number | null;
  fontSizeEnvelopeTitle?: number | null;
  fontSizeEnvelopeSeal?: number | null;

  // --- Séminaire ---
  seminaireVideoUrl?: string | null;
  seminaireSpeakers?:
    | { name: string; role?: string | null; company?: string | null; photoUrl?: string | null }[]
    | null;
  seminaireSponsorLogos?: string[] | null;

  // --- Multilingue ---
  lang?: "fr" | "en" | "ar" | null;

  // --- Liste de cadeaux ---
  giftList?:
    | {
        title: string;
        description?: string | null;
        url?: string | null;
        price?: string | null;
        emoji?: string | null;
      }[]
    | null;

  // --- Builder data (éditeur visuel) ---
  builderData?: any[] | null;
  [key: string]: any;
}

/* ============================================================ */
/* Per-template font pairs (display / script / serif)            */
/* ============================================================ */
type FontPair = { display: string; script: string; serif: string };

const FONT_PAIRS: FontPair[] = [
  {
    display: "'Playfair Display', serif",
    script: "'Great Vibes', cursive",
    serif: "'Cormorant Garamond', serif",
  },
  { display: "'Cormorant Garamond', serif", script: "'Allura', cursive", serif: "'Lora', serif" },
  {
    display: "'Bodoni Moda', serif",
    script: "'Pinyon Script', cursive",
    serif: "'EB Garamond', serif",
  },
  {
    display: "'Italiana', serif",
    script: "'Parisienne', cursive",
    serif: "'Libre Caslon Text', serif",
  },
  { display: "'Cinzel', serif", script: "'Tangerine', cursive", serif: "'Cardo', serif" },
  { display: "'Marcellus', serif", script: "'Sacramento', cursive", serif: "'Spectral', serif" },
  {
    display: "'Cormorant Infant', serif",
    script: "'Petit Formal Script', cursive",
    serif: "'Crimson Text', serif",
  },
  {
    display: "'DM Serif Display', serif",
    script: "'Dancing Script', cursive",
    serif: "'DM Serif Text', serif",
  },
  {
    display: "'Abril Fatface', serif",
    script: "'Yellowtail', cursive",
    serif: "'Source Serif 4', serif",
  },
  {
    display: "'Prata', serif",
    script: "'Mr De Haviland', cursive",
    serif: "'Gentium Book Plus', serif",
  },
  {
    display: "'Tenor Sans', sans-serif",
    script: "'Italianno', cursive",
    serif: "'Cormorant', serif",
  },
  {
    display: "'Cormorant SC', serif",
    script: "'Alex Brush', cursive",
    serif: "'Cormorant', serif",
  },
  { display: "'Forum', serif", script: "'Pinyon Script', cursive", serif: "'EB Garamond', serif" },
  {
    display: "'Cinzel Decorative', serif",
    script: "'Mrs Saint Delafield', cursive",
    serif: "'Cardo', serif",
  },
  {
    display: "'Bodoni Moda', serif",
    script: "'Rouge Script', cursive",
    serif: "'Crimson Pro', serif",
  },
  {
    display: "'Libre Bodoni', serif",
    script: "'Marck Script', cursive",
    serif: "'Libre Caslon Text', serif",
  },
  { display: "'Cormorant Unicase', serif", script: "'Cookie', cursive", serif: "'Lora', serif" },
  { display: "'Marcellus SC', serif", script: "'Sacramento', cursive", serif: "'Spectral', serif" },
  { display: "'Della Respira', serif", script: "'Allura', cursive", serif: "'Cardo', serif" },
  {
    display: "'Yeseva One', serif",
    script: "'Dancing Script', cursive",
    serif: "'EB Garamond', serif",
  },
  {
    display: "'Limelight', sans-serif",
    script: "'Tangerine', cursive",
    serif: "'Cormorant', serif",
  },
  {
    display: "'Trajan Pro', 'Cinzel', serif",
    script: "'Petit Formal Script', cursive",
    serif: "'Cardo', serif",
  },
  {
    display: "'Cormorant Garamond', serif",
    script: "'Herr Von Muellerhoff', cursive",
    serif: "'Cormorant', serif",
  },
  {
    display: "'Playfair Display SC', serif",
    script: "'Yellowtail', cursive",
    serif: "'Lora', serif",
  },
  {
    display: "'Antic Didone', serif",
    script: "'Pinyon Script', cursive",
    serif: "'EB Garamond', serif",
  },
  { display: "'Glegoo', serif", script: "'Mr Dafoe', cursive", serif: "'Crimson Text', serif" },
  { display: "'Cormorant Upright', serif", script: "'Niconne', cursive", serif: "'Lora', serif" },
];

/* Inject all needed Google Fonts once on the client */
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?" +
  [
    "Playfair+Display:ital,wght@0,400..900;1,400..900",
    "Playfair+Display+SC:wght@400;700",
    "Cormorant+Garamond:ital,wght@0,400..700;1,400..700",
    "Cormorant:ital,wght@0,400..700;1,400..700",
    "Cormorant+SC:wght@400;600;700",
    "Cormorant+Infant:ital,wght@0,400..700;1,400..700",
    "Cormorant+Unicase:wght@400;700",
    "Cormorant+Upright:wght@400;700",
    "Bodoni+Moda:ital,wght@0,400..900;1,400..900",
    "Libre+Bodoni:ital,wght@0,400..700;1,400..700",
    "Italiana",
    "Italianno",
    "Cinzel:wght@400..900",
    "Cinzel+Decorative:wght@400;700;900",
    "Marcellus",
    "Marcellus+SC",
    "DM+Serif+Display:ital@0;1",
    "DM+Serif+Text:ital@0;1",
    "Abril+Fatface",
    "Prata",
    "Tenor+Sans",
    "Forum",
    "Della+Respira",
    "Yeseva+One",
    "Limelight",
    "Antic+Didone",
    "Glegoo:wght@400;700",
    "Montserrat:ital,wght@0,400..700;1,400..700",
    "EB+Garamond:ital,wght@0,400..800;1,400..800",
    "Lora:ital,wght@0,400..700;1,400..700",
    "Cardo:ital,wght@0,400;0,700;1,400",
    "Crimson+Text:ital,wght@0,400;0,600;1,400",
    "Crimson+Pro:ital,wght@0,400..900;1,400..900",
    "Spectral:ital,wght@0,400;0,600;1,400",
    "Libre+Caslon+Text:ital,wght@0,400;0,700;1,400",
    "Source+Serif+4:ital,wght@0,400..900;1,400..900",
    "Gentium+Book+Plus:ital,wght@0,400;0,700;1,400",
    "Great+Vibes",
    "Allura",
    "Pinyon+Script",
    "Parisienne",
    "Tangerine:wght@400;700",
    "Sacramento",
    "Petit+Formal+Script",
    "Dancing+Script:wght@400..700",
    "Yellowtail",
    "Mr+De+Haviland",
    "Alex+Brush",
    "Mrs+Saint+Delafield",
    "Rouge+Script",
    "Marck+Script",
    "Cookie",
    "Mr+Dafoe",
    "Herr+Von+Muellerhoff",
    "Niconne",
  ]
    .map((f) => "family=" + f)
    .join("&") +
  "&display=swap";

if (typeof document !== "undefined") {
  const ID = "preview-invitation-fonts";
  if (!document.getElementById(ID)) {
    const link = document.createElement("link");
    link.id = ID;
    link.rel = "stylesheet";
    link.href = GOOGLE_FONTS_HREF;
    document.head.appendChild(link);
  }
}

function pickFontPair(id: string): FontPair {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 131 + id.charCodeAt(i)) | 0;
  return FONT_PAIRS[Math.abs(h) % FONT_PAIRS.length];
}

export function fontVars(template: Template, ov?: ThemeOverrides | null): React.CSSProperties {
  const idx = ov?.fontPairIndex;
  const p =
    typeof idx === "number" && idx >= 0 && idx < FONT_PAIRS.length
      ? FONT_PAIRS[idx]
      : pickFontPair(template.id);
  return {
    ["--font-display" as any]: p.display,
    ["--font-script" as any]: p.script,
    ["--font-serif" as any]: p.serif,
  };
}

export const FONT_PAIR_OPTIONS = FONT_PAIRS.map((p, i) => ({
  index: i,
  label: p.display.replace(/['",]/g, "").split(" ").slice(0, 2).join(" "),
  display: p.display,
  script: p.script,
}));

export const TITLE_FONT_OPTIONS: {
  value: "script" | "display" | "serif" | "sans" | "auto";
  label: string;
}[] = [
  { value: "auto", label: "Automatique (selon le modèle)" },
  { value: "script", label: "Calligraphie élégante" },
  { value: "display", label: "Serif élégante" },
  { value: "serif", label: "Serif classique" },
  { value: "sans", label: "Sans-serif moderne" },
];

export function getTitleFontClass(
  template: Template,
  overrides?: ThemeOverrides | null,
): "font-script" | "font-display" | "font-serif" | "font-sans" {
  const chosen = overrides?.titleFont || template.titleFont || "display";
  if (chosen === "script") return "font-script";
  if (chosen === "serif") return "font-serif";
  if (chosen === "sans") return "font-sans";
  return "font-display";
}

type LayoutId = "classic" | "magazine" | "ticket" | "polaroid" | "artdeco" | "fullbleed";

const LAYOUTS: LayoutId[] = ["classic", "magazine", "ticket", "polaroid", "artdeco", "fullbleed"];

/** Stable hash of template id → layout, so each template feels intentional. */
export function getFontClass(fontOverride: string | null | undefined, defaultClass: string) {
  if (fontOverride === "script") return "font-script";
  if (fontOverride === "display") return "font-display";
  if (fontOverride === "serif") return "font-serif";
  if (fontOverride === "sans") return "font-sans";
  return defaultClass;
}

export function pickLayout(id: string): LayoutId {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return LAYOUTS[Math.abs(h) % LAYOUTS.length];
}

/** Extract first hue (0-360) from a Tailwind bgClass that uses oklch(... h). */
function hueFromTemplate(template: Template): number {
  const m = template.bgClass.match(/oklch\([^)]*?_(\d+(?:\.\d+)?)\)/);
  if (m) return parseFloat(m[1]);
  let h = 0;
  for (let i = 0; i < template.id.length; i++) h = (h * 31 + template.id.charCodeAt(i)) | 0;
  return Math.abs(h) % 360;
}

export function getPalette(
  templateOrDark: Template | boolean,
  ov?: ThemeOverrides | null,
): {
  bg: string;
  text: string;
  sub: string;
  accent: string;
  rule: string;
  titleColor: string;
  titleBold: boolean;
  subtitleColor: string;
  subtitleBold: boolean;
  dateColor: string;
  ceremonyColor: string;
  messageColor: string;
  extraSectionColor: string;
  fontSizeTitle: number | null;
  fontSizeSubtitle: number | null;
  fontSizeDate: number | null;
  fontSizeMessage: number | null;
  fontSizeLabel: number | null;
  fontSizeBody: number | null;
} {
  const applyOv = (p: { bg: string; text: string; sub: string; accent: string; rule: string }) => {
    const bg = ov?.bg || p.bg;
    const text = ov?.text || p.text;
    const accent = ov?.accent || p.accent;
    return {
      bg,
      text,
      sub: ov?.text ? hexWithAlpha(text, 0.7) : p.sub,
      accent,
      rule: ov?.accent ? hexWithAlpha(accent, 0.45) : p.rule,
      titleColor: ov?.titleColor || accent,
      titleBold: ov?.titleBold ?? false,
      subtitleColor: ov?.subtitleColor || (ov?.text ? hexWithAlpha(text, 0.7) : p.sub),
      subtitleBold: ov?.subtitleBold ?? false,
      dateColor: ov?.dateColor || accent,
      ceremonyColor: ov?.ceremonyColor || accent,
      messageColor: ov?.messageColor || text,
      extraSectionColor: ov?.extraSectionColor || text,
      fontSizeTitle: ov?.fontSizeTitle || null,
      fontSizeSubtitle: ov?.fontSizeSubtitle || null,
      fontSizeDate: ov?.fontSizeDate || null,
      fontSizeMessage: ov?.fontSizeMessage || null,
      fontSizeLabel: ov?.fontSizeLabel || ov?.fontSizeExtraSection || null,
      fontSizeBody: ov?.fontSizeBody || null,
    };
  };
  if (typeof templateOrDark === "boolean") {
    return applyOv(
      templateOrDark
        ? {
            bg: "#1a130d",
            text: "#f3e9d6",
            sub: "rgba(243,233,214,0.78)",
            accent: "#d9b269",
            rule: "rgba(217,178,105,0.45)",
          }
        : {
            bg: "#fbf4ea",
            text: "#3a2417",
            sub: "#6d4d39",
            accent: "#a8623a",
            rule: "rgba(168,98,58,0.45)",
          },
    );
  }
  const t = templateOrDark;
  const h = hueFromTemplate(t);
  const dark = !!t.dark;
  if (dark) {
    return applyOv({
      bg: `oklch(0.18 0.04 ${h})`,
      text: `oklch(0.95 0.02 ${h})`,
      sub: `oklch(0.78 0.03 ${h} / 0.85)`,
      accent: `oklch(0.78 0.14 ${(h + 35) % 360})`,
      rule: `oklch(0.78 0.14 ${(h + 35) % 360} / 0.45)`,
    });
  }
  return applyOv({
    bg: `oklch(0.97 0.02 ${h})`,
    text: `oklch(0.25 0.05 ${h})`,
    sub: `oklch(0.45 0.06 ${h})`,
    accent: `oklch(0.50 0.16 ${(h + 20) % 360})`,
    rule: `oklch(0.50 0.16 ${(h + 20) % 360} / 0.45)`,
  });
}

/** Convert "#rrggbb" to rgba with given alpha. Falls back to original if not hex. */
function hexWithAlpha(hex: string, alpha: number): string {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Parse an ISO date string and return display parts for the preview card. */
function parseDateParts(iso?: string | null): {
  day: string;
  month: string;
  weekday: string;
  year: string;
  time: string;
} {
  if (!iso) return { day: "––", month: "––", weekday: "––", year: "––", time: "––:––" };
  try {
    const d = new Date(iso);
    const day = String(d.getUTCDate()).padStart(2, "0");
    const month = d
      .toLocaleDateString("fr-FR", { month: "short", timeZone: "UTC" })
      .replace(".", "");
    const weekday = d.toLocaleDateString("fr-FR", { weekday: "long", timeZone: "UTC" });
    const year = String(d.getUTCFullYear());
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    const time = `${hh}h${mm}`;
    return {
      day,
      month: month.charAt(0).toUpperCase() + month.slice(1),
      weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
      year,
      time,
    };
  } catch {
    return { day: "––", month: "––", weekday: "––", year: "––", time: "––:––" };
  }
}

export function generateThemeCSS(prefix: string, ov?: ThemeOverrides | null) {
  const overridesCSS = ov ? `
    ${ov.fontSizeTitle ? `
      ${prefix} h1, ${prefix} h2, ${prefix} [data-inv-title], ${prefix} .inv-title, ${prefix} [class*="text-[clamp(1"], ${prefix} [class*="text-[clamp(2"], ${prefix} [class*="text-[clamp(3"] {
        font-size: ${ov.fontSizeTitle}px !important;
        line-height: 1.15 !important;
      }
    ` : ''}
    ${ov.titleColor ? `
      ${prefix} h1, ${prefix} h2, ${prefix} [data-inv-title], ${prefix} .inv-title {
        color: ${ov.titleColor} !important;
      }
    ` : ''}
    ${ov.fontWeightTitle ? `
      ${prefix} h1, ${prefix} h2, ${prefix} [data-inv-title], ${prefix} .inv-title {
        font-weight: ${ov.fontWeightTitle} !important;
      }
    ` : ''}
    ${ov.titleBold ? `
      ${prefix} h1, ${prefix} h2, ${prefix} [data-inv-title], ${prefix} .inv-title {
        font-weight: 700 !important;
      }
    ` : ''}
    
    ${(ov.fontSizeLabel || ov.fontSizeExtraSection) ? `
      ${prefix} [data-inv-ceremony], ${prefix} .inv-ceremony {
        font-size: ${ov.fontSizeLabel || ov.fontSizeExtraSection}px !important;
      }
    ` : ''}
    ${(ov.ceremonyColor || ov.accent) ? `
      ${prefix} [data-inv-ceremony], ${prefix} .inv-ceremony {
        color: ${ov.ceremonyColor || ov.accent} !important;
      }
    ` : ''}
    
    ${ov.fontSizeSubtitle ? `
      ${prefix} h3, ${prefix} [data-inv-subtitle], ${prefix} .inv-subtitle {
        font-size: ${ov.fontSizeSubtitle}px !important;
        line-height: 1.4 !important;
      }
    ` : ''}
    ${ov.subtitleColor ? `
      ${prefix} h3, ${prefix} [data-inv-subtitle], ${prefix} .inv-subtitle, ${prefix} .host-name {
        color: ${ov.subtitleColor} !important;
      }
    ` : ''}
    ${ov.fontWeightSubtitle ? `
      ${prefix} h3, ${prefix} [data-inv-subtitle], ${prefix} .inv-subtitle {
        font-weight: ${ov.fontWeightSubtitle} !important;
      }
    ` : ''}
    
    ${ov.fontSizeDate ? `
      ${prefix} [data-inv-date], ${prefix} .inv-date, ${prefix} .event-date, ${prefix} [class*="Calendar"] ~ *, ${prefix} [class*="Clock"] ~ * {
        font-size: ${ov.fontSizeDate}px !important;
      }
    ` : ''}
    ${ov.dateColor ? `
      ${prefix} [data-inv-date], ${prefix} .inv-date, ${prefix} .event-date, ${prefix} [class*="Calendar"] ~ *, ${prefix} [class*="Clock"] ~ *, ${prefix} svg[class*="lucide-calendar"], ${prefix} svg[class*="lucide-clock"] {
        color: ${ov.dateColor} !important;
      }
    ` : ''}
    ${ov.fontWeightDate ? `
      ${prefix} [data-inv-date], ${prefix} .inv-date, ${prefix} .event-date, ${prefix} [class*="Calendar"] ~ *, ${prefix} [class*="Clock"] ~ * {
        font-weight: ${ov.fontWeightDate} !important;
      }
    ` : ''}
    ${ov.dateBold ? `
      ${prefix} [data-inv-date], ${prefix} .inv-date, ${prefix} .event-date, ${prefix} [class*="Calendar"] ~ *, ${prefix} [class*="Clock"] ~ * {
        font-weight: 700 !important;
      }
    ` : ''}
    
    ${ov.fontSizeMessage ? `
      ${prefix} [data-inv-message], ${prefix} .inv-message, ${prefix} blockquote {
        font-size: ${ov.fontSizeMessage}px !important;
      }
    ` : ''}
    ${ov.messageColor ? `
      ${prefix} [data-inv-message], ${prefix} .inv-message, ${prefix} blockquote {
        color: ${ov.messageColor} !important;
      }
    ` : ''}
    
    ${ov.fontSizeBody ? `
      ${prefix} p:not([data-inv-ceremony]):not([data-inv-subtitle]):not([data-inv-date]):not([data-inv-message]):not([data-inv-title]):not(.inv-date):not(.event-date),
      ${prefix} span.inv-body {
        font-size: ${ov.fontSizeBody}px !important;
      }
    ` : ''}
    ${(ov.textColor || ov.text) ? `
      ${prefix} p:not([data-inv-ceremony]):not([data-inv-date]):not([data-inv-subtitle]):not([data-inv-title]):not([data-inv-message]):not(.inv-date):not(.event-date),
      ${prefix} span:not([data-inv-ceremony]):not([data-inv-title]):not([data-inv-date]):not([data-inv-subtitle]):not([class*="badge"]) {
        color: ${ov.textColor || ov.text} !important;
      }
    ` : ''}
    
    ${ov.bg ? `${prefix} > div:first-child, ${prefix} [class*="min-h-"] { background-color: ${ov.bg} !important; }` : ''}
    ${ov.allBold ? `${prefix} * { font-weight: 700 !important; }` : ''}
    ${ov.fontWeightAll ? `${prefix} * { font-weight: ${ov.fontWeightAll} !important; }` : ''}
  ` : '';

  return `
    ${overridesCSS}

    /* 1. Conteneur principal de la carte : transparent pour supprimer le fond #F5F8F6 derrière le cadre des mariés */
    ${prefix} > div:first-child,
    ${prefix} > div > div[class*="min-h-"],
    ${prefix} [class*="min-h-[85vh]"] {
      background: transparent !important;
      background-color: transparent !important;
      box-shadow: none !important;
      border: none !important;
    }

    /* 2. Masquer les halos et orbes floues qui créaient la couleur #F5F8F6 */
    ${prefix} [class*="bg-pink-100"],
    ${prefix} [class*="bg-blue-100"],
    ${prefix} [class*="blur-3xl"],
    ${prefix} [class*="blur-[80px]"] {
      display: none !important;
    }
  `;
}

export function PreviewInvitation({
  template,
  coverImageUrl,
  coverImageUrl2,
  title,
  hostName,
  message,
  eventDate,
  themeOverrides,
  musicUrl,
  isBuilder,
  onThemeUpdate,
  onImageUpdate,
}: Props) {
  const defaultImage =
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80";
  const finalCover = coverImageUrl || defaultImage;
  const finalCover2 = coverImageUrl2 || defaultImage;
  const displayTemplate = {
    ...template,
    name: title?.trim() || template.name,
  };
  // Templates avec illustration dédiée (botaniques)
  const illustration = TEMPLATE_ILLUSTRATIONS[template.id];
  if (illustration) {
    return (
      <div className="relative">
        <style>{generateThemeCSS(".illustrated-preview", themeOverrides)}</style>
        <div className="illustrated-preview">
          <IllustratedLayout
            template={displayTemplate}
            coverImageUrl={finalCover}
            hostName={hostName}
            message={message}
            themeOverrides={themeOverrides}
            eventDate={eventDate}
            illustration={illustration}
            musicUrl={musicUrl}
          />
        </div>
        {musicUrl && <FloatingAudioPlayer musicUrl={musicUrl} />}
      </div>
    );
  }

  if (pickLayout(template.id) === "polaroid") {
    return (
      <div className="relative">
        <style>{generateThemeCSS(".polaroid-preview", themeOverrides)}</style>
        <div className="polaroid-preview">
          <PolaroidLayout
            template={displayTemplate}
            coverImageUrl={finalCover}
            coverImageUrl2={finalCover2}
            hostName={hostName}
            message={message}
            themeOverrides={themeOverrides}
            eventDate={eventDate}
            isBuilder={isBuilder}
            onThemeUpdate={onThemeUpdate}
            onImageUpdate={onImageUpdate}
          />
        </div>
        {musicUrl && <FloatingAudioPlayer musicUrl={musicUrl} />}
      </div>
    );
  }

  // Tous les templates à layout génératif unique
  return (
    <div id="generative-preview" className="relative">
      <style>{generateThemeCSS("#generative-preview", themeOverrides)}</style>
      <GenerativeLayout
        template={displayTemplate}
        coverImageUrl={finalCover}
        coverImageUrl2={finalCover2}
        hostName={hostName}
        message={message}
        eventDate={eventDate}
        themeOverrides={themeOverrides}
        musicUrl={musicUrl}
        isBuilder={isBuilder}
        onThemeUpdate={onThemeUpdate}
        onImageUpdate={onImageUpdate}
      />
      {musicUrl && <FloatingAudioPlayer musicUrl={musicUrl} />}
    </div>
  );
}

function splitNames(name: string) {
  // Render names exactly as typed; user adds any "&" or "et" manually
  return { first: name, second: "" };
}

/* ============================================================ */
/* 1. CLASSIC — hero photo + script names + 3-col date + icons   */
/* ============================================================ */
function ClassicLayout({
  template,
  coverImageUrl,
  hostName,
  message,
  themeOverrides,
  eventDate,
  isBuilder,
  onThemeUpdate,
  onImageUpdate,
}: LayoutProps) {
  const palette = getPalette(template, themeOverrides);
  const { first } = splitNames(template.name);
  const dt = parseDateParts(eventDate);
  const quoteText = message || "« Ce que Dieu a uni,\nque l'homme ne le sépare point. »";
  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10"
      style={{
        background: palette.bg,
        color: palette.text,
        ...fontVars(template, themeOverrides),
        ...(themeOverrides?.fontWeightAll ? { fontWeight: themeOverrides.fontWeightAll } : {}),
      }}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <InlineImageEditor isBuilder={isBuilder} onImageUpload={(file) => onImageUpdate?.('coverImage', file)}>
          <img
            src={coverImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </InlineImageEditor>
      </div>
      <div className="relative px-7 pt-8 pb-2 text-center">
        <InlineTextEditor 
          isBuilder={isBuilder} 
          themeKey="Subtitle" 
          currentFontSize={themeOverrides?.fontSizeSubtitle ?? null} 
          currentColor={palette.subtitleColor}
          currentFont={themeOverrides?.fontSubtitle ?? null}
          currentBgColor={themeOverrides?.bgSubtitle ?? null}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <p
            className={`${getFontClass(themeOverrides?.fontSubtitle, 'font-serif')} italic text-[15px] rounded px-2`}
            style={{
              color: palette.subtitleColor,
              fontWeight: palette.subtitleBold ? 700 : undefined,
              backgroundColor: themeOverrides?.bgSubtitle || undefined,
              ...(themeOverrides?.fontSizeBody
                ? { fontSize: themeOverrides.fontSizeBody + "px" }
                : {}),
            }}
          >
            Le grand jour est enfin arrivé…
          </p>
        </InlineTextEditor>
        {hostName && (
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="HostName"
            currentFontSize={themeOverrides?.fontSizeHostName ?? null}
            currentColor={themeOverrides?.hostNameColor || palette.accent}
            currentFont={themeOverrides?.fontHostName ?? null}
            currentBgColor={themeOverrides?.bgHostName ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <p className={`${getFontClass(themeOverrides?.fontHostName, 'font-serif')} italic text-[13px] mt-2 rounded px-1`} style={{ color: themeOverrides?.hostNameColor || palette.accent, backgroundColor: themeOverrides?.bgHostName || undefined }}>
              — {hostName} —
            </p>
          </InlineTextEditor>
        )}
        <div className="my-5 flex justify-center">
          <img src={ornamentLeafSmall} alt="" className="w-10 h-10 opacity-90" />
        </div>
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="Message"
          currentFontSize={themeOverrides?.fontSizeMessage ?? null}
          currentColor={palette.text}
          currentFont={themeOverrides?.fontMessage ?? null}
          currentBgColor={themeOverrides?.bgMessage ?? null}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <p
            className={`${getFontClass(themeOverrides?.fontMessage, 'font-serif')} italic text-[14px] leading-relaxed mx-auto max-w-[260px] whitespace-pre-line rounded px-2`}
            style={{
              color: palette.text,
              backgroundColor: themeOverrides?.bgMessage || undefined,
              ...(themeOverrides?.fontSizeMessage
                ? { fontSize: themeOverrides.fontSizeMessage + "px" }
                : themeOverrides?.fontSizeBody
                  ? { fontSize: themeOverrides.fontSizeBody + "px" }
                  : {}),
              ...(themeOverrides?.fontWeightAll ? { fontWeight: themeOverrides.fontWeightAll } : {}),
            }}
          >
            {quoteText}
          </p>
        </InlineTextEditor>
        <div className="relative mt-8 mb-2">
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="Title"
            currentFontSize={themeOverrides?.fontSizeTitle ?? null}
            currentColor={palette.titleColor}
            currentFont={themeOverrides?.fontTitle ?? null}
            currentBgColor={themeOverrides?.bgTitle ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <h2
              className={`${getFontClass(themeOverrides?.fontTitle, getTitleFontClass(template, themeOverrides))} text-6xl leading-[0.85] text-left pl-2 rounded px-2`}
              style={{
                color: palette.titleColor,
                fontWeight: palette.titleBold ? 700 : undefined,
                backgroundColor: themeOverrides?.bgTitle || undefined,
                ...(themeOverrides?.fontSizeTitle
                  ? { fontSize: themeOverrides.fontSizeTitle + "px" }
                  : {}),
              }}
            >
              {first}
            </h2>
          </InlineTextEditor>

          <img
            src={ornamentLeaves}
            alt=""
            className="pointer-events-none absolute -right-4 -top-2 w-32 h-32 opacity-90"
          />
        </div>
        <div className="mt-7" style={{ ...(themeOverrides?.dateBold ? { fontWeight: 700 } : {}) }}>
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="Date"
            currentFontSize={themeOverrides?.fontSizeDate ?? null}
            currentColor={themeOverrides?.dateColor || palette.accent}
            currentFont={themeOverrides?.fontDate ?? null}
            currentBgColor={themeOverrides?.bgDate ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <div className={`${getFontClass(themeOverrides?.fontDate, '')} rounded px-2`} style={{ color: themeOverrides?.dateColor || palette.accent, backgroundColor: themeOverrides?.bgDate || undefined }}>
              <div className="grid grid-cols-[1fr_auto] items-center gap-3 justify-center mx-auto w-fit">
                <div className="flex flex-col items-end pr-3">
                  <span
                    className="font-serif text-[11px] tracking-[0.25em] uppercase"
                    style={{
                      ...(themeOverrides?.fontSizeDate
                        ? { fontSize: Math.max(8, themeOverrides.fontSizeDate * 0.45) + "px" }
                        : {}),
                    }}
                  >
                    {dt.month}.
                  </span>
                  <span
                    className="font-display text-[15px] tracking-[0.15em] uppercase mt-1"
                    style={
                      themeOverrides?.fontSizeDate
                        ? { fontSize: Math.max(10, themeOverrides.fontSizeDate * 0.6) + "px" }
                        : undefined
                    }
                  >
                    {dt.weekday}
                  </span>
                </div>
                <div
                  className="flex flex-col items-center px-4 border-l"
                  style={{ borderColor: palette.rule }}
                >
                  <span
                    className="font-display text-6xl leading-none"
                    style={
                      themeOverrides?.fontSizeDate
                        ? { fontSize: themeOverrides.fontSizeDate + "px" }
                        : undefined
                    }
                  >
                    {dt.day}
                  </span>
                  <span
                    className="font-serif text-[11px] tracking-[0.25em] uppercase mt-1"
                    style={{
                      ...(themeOverrides?.fontSizeDate
                        ? { fontSize: Math.max(8, themeOverrides.fontSizeDate * 0.45) + "px" }
                        : {}),
                    }}
                  >
                    {dt.year}
                  </span>
                </div>
              </div>
              <p
                className="text-center mt-3 font-display text-[15px] tracking-[0.1em] uppercase"
                style={{
                  ...(themeOverrides?.fontSizeDate
                    ? { fontSize: Math.max(10, themeOverrides.fontSizeDate * 0.6) + "px" }
                    : {}),
                }}
              >
                • {dt.time}
              </p>
            </div>
          </InlineTextEditor>
        </div>
        <ActionRow palette={palette} isBuilder={isBuilder} themeOverrides={themeOverrides} onThemeUpdate={onThemeUpdate} />
      </div>
    </div>
  );
}

/* ============================================================ */
/* 2. MAGAZINE — editorial split, big serif numerals             */
/* ============================================================ */
function MagazineLayout({
  template,
  coverImageUrl,
  hostName,
  themeOverrides,
  eventDate,
  isBuilder,
  onThemeUpdate,
  onImageUpdate,
}: LayoutProps) {
  const palette = getPalette(template, themeOverrides);
  const { first } = splitNames(template.name);
  const dt = parseDateParts(eventDate);
  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10"
      style={{
        background: palette.bg,
        color: palette.text,
        ...fontVars(template, themeOverrides),
        ...(themeOverrides?.fontWeightAll ? { fontWeight: themeOverrides.fontWeightAll } : {}),
      }}
    >
      <div className="grid grid-cols-[1fr_1.2fr] min-h-[420px]">
        <div className="relative">
          <InlineImageEditor isBuilder={isBuilder} onImageUpload={(file) => onImageUpdate?.('coverImage', file)}>
            <img
              src={coverImageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </InlineImageEditor>
        </div>
        <div className="px-5 py-7 flex flex-col">
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="MagazineVol"
            currentFontSize={themeOverrides?.fontSizeMagazineVol ?? null}
            currentColor={themeOverrides?.magazineVolColor || palette.accent}
            currentFont={themeOverrides?.fontMagazineVol ?? null}
            currentBgColor={themeOverrides?.bgMagazineVol ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <div
              className={`${getFontClass(themeOverrides?.fontMagazineVol, '')} text-[10px] tracking-[0.4em] uppercase pb-2 border-b rounded px-1`}
              style={{ color: themeOverrides?.magazineVolColor || palette.accent, borderColor: palette.rule, backgroundColor: themeOverrides?.bgMagazineVol || undefined }}
            >
              Vol. 01 · Invitation
            </div>
          </InlineTextEditor>
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="Title"
            currentFontSize={themeOverrides?.fontSizeTitle ?? null}
            currentColor={palette.titleColor}
            currentFont={themeOverrides?.fontTitle ?? null}
            currentBgColor={themeOverrides?.bgTitle ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <h2
              className={`${getFontClass(themeOverrides?.fontTitle, getTitleFontClass(template, themeOverrides))} text-4xl leading-[0.95] mt-4 rounded px-2`}
              style={{ 
                color: palette.titleColor, 
                fontWeight: palette.titleBold ? 700 : undefined,
                backgroundColor: themeOverrides?.bgTitle || undefined,
              }}
            >
              {first}
            </h2>
          </InlineTextEditor>
          {hostName && (
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="HostName"
              currentFontSize={themeOverrides?.fontSizeHostName ?? null}
              currentColor={themeOverrides?.hostNameColor || palette.accent}
              currentFont={themeOverrides?.fontHostName ?? null}
              currentBgColor={themeOverrides?.bgHostName ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <p className={`${getFontClass(themeOverrides?.fontHostName, 'font-serif')} italic text-[11px] mt-1 rounded px-1`} style={{ color: themeOverrides?.hostNameColor || palette.accent, backgroundColor: themeOverrides?.bgHostName || undefined }}>
                {hostName}
              </p>
            </InlineTextEditor>
          )}
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="Message"
            currentFontSize={themeOverrides?.fontSizeMessage ?? null}
            currentColor={palette.subtitleColor}
            currentFont={themeOverrides?.fontMessage ?? null}
            currentBgColor={themeOverrides?.bgMessage ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <p
              className={`${getFontClass(themeOverrides?.fontMessage, 'font-serif')} italic text-[12px] mt-3 leading-relaxed rounded px-2`}
              style={{
                color: palette.subtitleColor,
                fontWeight: palette.subtitleBold ? 700 : undefined,
                backgroundColor: themeOverrides?.bgMessage || undefined,
              }}
            >
              ont l'honneur de vous convier à leur célébration.
            </p>
          </InlineTextEditor>
          <div className="mt-auto pt-6">
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="Subtitle"
              currentFontSize={null}
              currentColor={palette.subtitleColor}
              currentFont={themeOverrides?.fontSubtitle ?? null}
              currentBgColor={themeOverrides?.bgSubtitle ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <div className={`${getFontClass(themeOverrides?.fontSubtitle, 'font-display')} text-7xl leading-none rounded px-2`} style={{ color: palette.accent, backgroundColor: themeOverrides?.bgSubtitle || undefined }}>
                {dt.day}
              </div>
            </InlineTextEditor>
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="Date"
              currentFontSize={themeOverrides?.fontSizeDate ?? null}
              currentColor={themeOverrides?.dateColor || palette.subtitleColor}
              currentFont={themeOverrides?.fontDate ?? null}
              currentBgColor={themeOverrides?.bgDate ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <div className={`${getFontClass(themeOverrides?.fontDate, '')} flex items-baseline justify-between mt-1 rounded px-2`} style={{ color: themeOverrides?.dateColor || palette.subtitleColor, backgroundColor: themeOverrides?.bgDate || undefined }}>
                <span
                  className="font-serif text-[11px] tracking-[0.3em] uppercase"
                  style={{
                    fontWeight: palette.subtitleBold ? 700 : undefined,
                  }}
                >
                  {dt.month} {dt.year}
                </span>
                <span className="font-display text-sm" style={{ color: palette.text }}>
                  {dt.time}
                </span>
              </div>
            </InlineTextEditor>
          </div>
        </div>
      </div>
      <div
        className="px-5 py-4 flex items-center justify-center gap-5 border-t"
        style={{ borderColor: palette.rule }}
      >
        <MiniAction icon={<MapPin className="w-4 h-4" />} label="Lieu" themeKey="ActionLieu" palette={palette} isBuilder={isBuilder} themeOverrides={themeOverrides} onThemeUpdate={onThemeUpdate} />
        <MiniAction icon={<Heart className="w-4 h-4" />} label="RSVP" themeKey="ActionRSVP" palette={palette} highlight isBuilder={isBuilder} themeOverrides={themeOverrides} onThemeUpdate={onThemeUpdate} />
        <MiniAction icon={<Gift className="w-4 h-4" />} label="Cadeaux" themeKey="ActionCadeaux" palette={palette} isBuilder={isBuilder} themeOverrides={themeOverrides} onThemeUpdate={onThemeUpdate} />
      </div>
    </div>
  );
}

/* ============================================================ */
/* 3. TICKET — no photo, monogram, perforated stub               */
/* ============================================================ */
function TicketLayout({ 
  template, 
  hostName, 
  themeOverrides, 
  eventDate,
  isBuilder,
  onThemeUpdate,
}: LayoutProps) {
  const dark = !!template.dark;
  const palette = getPalette(template, themeOverrides);
  const { first } = splitNames(template.name);
  const nameWords = first.trim().split(/\s+/).filter(Boolean);
  const initials = `${(nameWords[0]?.[0] || "A").toUpperCase()}·${(nameWords[nameWords.length - 1]?.[0] || "B").toUpperCase()}`;
  const dt = parseDateParts(eventDate);

  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10"
      style={{ background: palette.bg, color: palette.text, ...fontVars(template, themeOverrides) }}
    >
      <div className="px-7 pt-10 pb-6 text-center">
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="AdmissionText"
          currentFontSize={themeOverrides?.fontSizeAdmissionText ?? null}
          currentColor={themeOverrides?.admissionTextColor || palette.accent}
          currentFont={themeOverrides?.fontAdmissionText ?? null}
          currentBgColor={themeOverrides?.bgAdmissionText ?? null}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <div className={`${getFontClass(themeOverrides?.fontAdmissionText, '')} text-[10px] tracking-[0.5em] uppercase rounded px-1`} style={{ color: themeOverrides?.admissionTextColor || palette.accent, backgroundColor: themeOverrides?.bgAdmissionText || undefined }}>
            Admission · One Guest
          </div>
        </InlineTextEditor>
        <div
          className="mt-8 mx-auto w-32 h-32 rounded-full flex items-center justify-center border-2"
          style={{ borderColor: palette.accent }}
        >
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="InitialsText"
            currentFontSize={themeOverrides?.fontSizeInitialsText ?? null}
            currentColor={themeOverrides?.initialsTextColor || palette.accent}
            currentFont={themeOverrides?.fontInitialsText ?? null}
            currentBgColor={themeOverrides?.bgInitialsText ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <span className={`${getFontClass(themeOverrides?.fontInitialsText, 'font-display')} text-4xl rounded px-2`} style={{ color: themeOverrides?.initialsTextColor || palette.accent, backgroundColor: themeOverrides?.bgInitialsText || undefined }}>
              {initials}
            </span>
          </InlineTextEditor>
        </div>
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="Title"
          currentFontSize={themeOverrides?.fontSizeTitle ?? null}
          currentColor={palette.titleColor}
          currentFont={themeOverrides?.fontTitle ?? null}
          currentBgColor={themeOverrides?.bgTitle ?? null}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <h2
            className={`${getFontClass(themeOverrides?.fontTitle, getTitleFontClass(template, themeOverrides))} text-5xl mt-6 leading-tight rounded px-2`}
            style={{ 
              color: palette.titleColor, 
              fontWeight: palette.titleBold ? 700 : undefined,
              backgroundColor: themeOverrides?.bgTitle || undefined,
            }}
          >
            {first}
          </h2>
        </InlineTextEditor>
        {hostName && (
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="HostName"
            currentFontSize={themeOverrides?.fontSizeHostName ?? null}
            currentColor={themeOverrides?.hostNameColor || palette.accent}
            currentFont={themeOverrides?.fontHostName ?? null}
            currentBgColor={themeOverrides?.bgHostName ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <p className={`${getFontClass(themeOverrides?.fontHostName, 'font-serif')} italic text-[12px] mt-2 rounded px-1`} style={{ color: themeOverrides?.hostNameColor || palette.accent, backgroundColor: themeOverrides?.bgHostName || undefined }}>
              — {hostName} —
            </p>
          </InlineTextEditor>
        )}
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="Message"
          currentFontSize={themeOverrides?.fontSizeMessage ?? null}
          currentColor={palette.subtitleColor}
          currentFont={themeOverrides?.fontMessage ?? null}
          currentBgColor={themeOverrides?.bgMessage ?? null}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <p
            className={`${getFontClass(themeOverrides?.fontMessage, 'font-serif')} italic text-[13px] mt-4 max-w-[260px] mx-auto rounded px-2`}
            style={{
              color: palette.subtitleColor,
              fontWeight: palette.subtitleBold ? 700 : undefined,
              backgroundColor: themeOverrides?.bgMessage || undefined,
            }}
          >
            {template.tagline}
          </p>
        </InlineTextEditor>
      </div>

      {/* Perforated separator */}
      <div className="relative flex items-center" style={{ color: palette.rule }}>
        <div
          className="absolute -left-3 w-6 h-6 rounded-full"
          style={{ background: "var(--background, #fff)" }}
        />
        <div
          className="absolute -right-3 w-6 h-6 rounded-full"
          style={{ background: "var(--background, #fff)" }}
        />
        <div className="flex-1 border-t border-dashed mx-6" style={{ borderColor: palette.rule }} />
      </div>

      <div className="px-7 py-6 grid grid-cols-3 gap-2 text-center">
        <div>
          <Calendar className="w-4 h-4 mx-auto" style={{ color: palette.accent }} />
          <InlineTextEditor 
            isBuilder={isBuilder} 
            themeKey="Subtitle" 
            currentFontSize={null} 
            currentColor={palette.subtitleColor}
            currentFont={themeOverrides?.fontSubtitle ?? null}
            currentBgColor={themeOverrides?.bgSubtitle ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <div className={`${getFontClass(themeOverrides?.fontSubtitle, 'font-display')} text-sm mt-2 rounded px-1`} style={{ backgroundColor: themeOverrides?.bgSubtitle || undefined }}>
              {dt.day} {dt.month}.
            </div>
            <div
              className={`${getFontClass(themeOverrides?.fontSubtitle, '')} text-[10px] tracking-widest uppercase`}
              style={{
                color: palette.subtitleColor,
                fontWeight: palette.subtitleBold ? 700 : undefined,
              }}
            >
              Date
            </div>
          </InlineTextEditor>
        </div>
        <div className="border-x" style={{ borderColor: palette.rule }}>
          <Clock className="w-4 h-4 mx-auto" style={{ color: palette.accent }} />
          <InlineTextEditor 
            isBuilder={isBuilder} 
            themeKey="Subtitle" 
            currentFontSize={null} 
            currentColor={palette.subtitleColor}
            currentFont={themeOverrides?.fontSubtitle ?? null}
            currentBgColor={themeOverrides?.bgSubtitle ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <div className={`${getFontClass(themeOverrides?.fontSubtitle, 'font-display')} text-sm mt-2 rounded px-1`} style={{ backgroundColor: themeOverrides?.bgSubtitle || undefined }}>{dt.time}</div>
            <div
              className={`${getFontClass(themeOverrides?.fontSubtitle, '')} text-[10px] tracking-widest uppercase`}
              style={{
                color: palette.subtitleColor,
                fontWeight: palette.subtitleBold ? 700 : undefined,
              }}
            >
              Heure
            </div>
          </InlineTextEditor>
        </div>
        <div>
          <MapPin className="w-4 h-4 mx-auto" style={{ color: palette.accent }} />
          <InlineTextEditor 
            isBuilder={isBuilder} 
            themeKey="ActionLieuText" 
            currentFontSize={themeOverrides?.fontSizeActionLieuText ?? null} 
            currentColor={themeOverrides?.actionLieuTextColor || palette.subtitleColor}
            currentFont={themeOverrides?.fontActionLieuText ?? null}
            currentBgColor={themeOverrides?.bgActionLieuText ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <div className={`${getFontClass(themeOverrides?.fontActionLieuText, 'font-display')} text-sm mt-2 rounded px-1`} style={{ backgroundColor: themeOverrides?.bgActionLieuText || undefined }}>
              Lieu
            </div>
            <div
              className={`${getFontClass(themeOverrides?.fontActionLieuText, '')} text-[10px] tracking-widest uppercase`}
              style={{
                color: themeOverrides?.actionLieuTextColor || palette.subtitleColor,
                fontWeight: palette.subtitleBold ? 700 : undefined,
              }}
            >
              Lieu
            </div>
          </InlineTextEditor>
        </div>
      </div>
      <div className="px-7 pb-7 flex items-center justify-center gap-3">
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="ActionRSVPText"
          currentFontSize={themeOverrides?.fontSizeActionRSVPText ?? null}
          currentColor={themeOverrides?.actionRSVPTextColor || (dark ? palette.bg : "#fff")}
          currentFont={themeOverrides?.fontActionRSVPText ?? null}
          currentBgColor={themeOverrides?.bgActionRSVPText ?? palette.accent}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <button
            className={`${getFontClass(themeOverrides?.fontActionRSVPText, '')} flex-1 rounded-full py-2.5 text-[11px] tracking-[0.25em] uppercase w-full`}
            style={{ backgroundColor: themeOverrides?.bgActionRSVPText || palette.accent, color: themeOverrides?.actionRSVPTextColor || (dark ? palette.bg : "#fff") }}
          >
            Confirmer
          </button>
        </InlineTextEditor>
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="ActionDetailsText"
          currentFontSize={themeOverrides?.fontSizeActionDetailsText ?? null}
          currentColor={themeOverrides?.actionDetailsTextColor || palette.accent}
          currentFont={themeOverrides?.fontActionDetailsText ?? null}
          currentBgColor={themeOverrides?.bgActionDetailsText ?? null}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <button
            className={`${getFontClass(themeOverrides?.fontActionDetailsText, '')} flex-1 rounded-full py-2.5 text-[11px] tracking-[0.25em] uppercase border w-full`}
            style={{ borderColor: themeOverrides?.actionDetailsTextColor || palette.accent, color: themeOverrides?.actionDetailsTextColor || palette.accent, backgroundColor: themeOverrides?.bgActionDetailsText || undefined }}
          >
            Détails
          </button>
        </InlineTextEditor>
      </div>
    </div>
  );
}

/* ============================================================ */
/* 4. POLAROID — scrapbook with tilted photos & washi tape       */
/* ============================================================ */
function PolaroidLayout({
  template,
  coverImageUrl,
  coverImageUrl2,
  hostName,
  themeOverrides,
  eventDate,
  isBuilder,
  onThemeUpdate,
  onImageUpdate,
}: LayoutProps) {
  const palette = getPalette(template, themeOverrides);
  const { first } = splitNames(template.name);
  const photo2 = coverImageUrl2 || coverImageUrl;
  const dt = parseDateParts(eventDate);
  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10 pb-8"
      style={{ background: palette.bg, color: palette.text, ...fontVars(template, themeOverrides) }}
    >
      <div className="relative h-80 mx-4 mt-8">
        {/* Photo 1 tilted left */}
        <div className="absolute left-2 top-0 w-44 -rotate-6 bg-white p-2 pb-8 shadow-xl">
          <div className="w-full aspect-[3/4] overflow-hidden">
            <InlineImageEditor isBuilder={isBuilder} onImageUpload={(file) => onImageUpdate?.('coverImage', file)}>
              <img src={coverImageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
            </InlineImageEditor>
          </div>
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rotate-3 opacity-70"
            style={{ background: palette.accent }}
          />
        </div>
        {/* Photo 2 tilted right */}
        <div className="absolute right-2 top-16 w-40 rotate-6 bg-white p-2 pb-8 shadow-xl">
          <div className="w-full aspect-square overflow-hidden">
            <InlineImageEditor isBuilder={isBuilder} onImageUpload={(file) => onImageUpdate?.('coverImage2', file)}>
              <img src={photo2} alt="" className="w-full h-full object-cover" loading="lazy" />
            </InlineImageEditor>
          </div>
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="Photo2Caption"
            currentFontSize={themeOverrides?.fontSizePhoto2Caption ?? null}
            currentColor={themeOverrides?.photo2CaptionColor || "#374151"}
            currentFont={themeOverrides?.fontPhoto2Caption ?? null}
            currentBgColor={themeOverrides?.bgPhoto2Caption ?? null}
            currentPadding={themeOverrides?.paddingPhoto2Caption ?? null}
            currentHidden={themeOverrides?.hidePhoto2Caption ?? false}
            onUpdate={(updates) => onThemeUpdate?.(updates)}
          >
            <div className={`${getFontClass(themeOverrides?.fontPhoto2Caption, 'font-script')} text-center text-sm mt-1 rounded px-1 inline-block w-full`} style={{ color: themeOverrides?.photo2CaptionColor || '#374151', backgroundColor: themeOverrides?.bgPhoto2Caption || undefined, fontSize: themeOverrides?.fontSizePhoto2Caption ? `${themeOverrides.fontSizePhoto2Caption}px` : undefined, padding: themeOverrides?.paddingPhoto2Caption != null ? `${themeOverrides.paddingPhoto2Caption}px` : undefined }}>notre jour ♥</div>
          </InlineTextEditor>
        </div>
      </div>
      <div className="px-7 mt-4 text-center">
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="SaveTheDate"
          currentFontSize={themeOverrides?.fontSizeSaveTheDate ?? null}
          currentColor={themeOverrides?.saveTheDateColor || palette.subtitleColor}
          currentFont={themeOverrides?.fontSaveTheDate ?? null}
          currentBgColor={themeOverrides?.bgSaveTheDate ?? null}
          currentPadding={themeOverrides?.paddingSaveTheDate ?? null}
          currentHidden={themeOverrides?.hideSaveTheDate ?? false}
          onUpdate={(updates) => onThemeUpdate?.(updates)}
        >
          <div
            className={`${getFontClass(themeOverrides?.fontSaveTheDate, 'font-serif')} italic text-[12px] tracking-wide rounded px-1 inline-block`}
            style={{
              color: themeOverrides?.saveTheDateColor || palette.subtitleColor,
              fontWeight: palette.subtitleBold ? 700 : undefined,
              backgroundColor: themeOverrides?.bgSaveTheDate || undefined,
              fontSize: themeOverrides?.fontSizeSaveTheDate ? `${themeOverrides.fontSizeSaveTheDate}px` : undefined,
              padding: themeOverrides?.paddingSaveTheDate != null ? `${themeOverrides.paddingSaveTheDate}px` : undefined,
            }}
          >
            {themeOverrides?.ceremonyTitle || themeOverrides?.eventTitle || "~ Save the date ~"}
          </div>
        </InlineTextEditor>
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="Title"
          currentFontSize={themeOverrides?.fontSizeTitle ?? null}
          currentColor={palette.titleColor}
          currentFont={themeOverrides?.fontTitle ?? null}
          currentBgColor={themeOverrides?.bgTitle ?? null}
          currentPadding={themeOverrides?.paddingTitle ?? null}
          currentHidden={themeOverrides?.hideTitle ?? false}
          onUpdate={(updates) => onThemeUpdate?.(updates)}
        >
          <h2
            data-inv-title
            className={`${getFontClass(themeOverrides?.fontTitle, getTitleFontClass(template, themeOverrides))} text-5xl mt-2 leading-tight rounded px-2`}
            style={{ 
              color: palette.titleColor, 
              fontWeight: palette.titleBold ? 700 : undefined,
              backgroundColor: themeOverrides?.bgTitle || undefined,
              fontSize: themeOverrides?.fontSizeTitle ? `${themeOverrides.fontSizeTitle}px` : undefined,
              padding: themeOverrides?.paddingTitle != null ? `${themeOverrides.paddingTitle}px` : undefined,
            }}
          >
            {first}
          </h2>
        </InlineTextEditor>
        {hostName && (
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="HostName"
            currentFontSize={themeOverrides?.fontSizeHostName ?? null}
            currentColor={themeOverrides?.hostNameColor || palette.accent}
            currentFont={themeOverrides?.fontHostName ?? null}
            currentBgColor={themeOverrides?.bgHostName ?? null}
            currentPadding={themeOverrides?.paddingHostName ?? null}
            currentHidden={themeOverrides?.hideHostName ?? false}
            onUpdate={(updates) => onThemeUpdate?.(updates)}
          >
            <div data-inv-subtitle className={`${getFontClass(themeOverrides?.fontHostName, 'font-serif')} italic text-[12px] mt-1 rounded px-1 inline-block`} style={{ color: themeOverrides?.hostNameColor || palette.accent, backgroundColor: themeOverrides?.bgHostName || undefined, fontSize: themeOverrides?.fontSizeHostName ? `${themeOverrides.fontSizeHostName}px` : undefined, padding: themeOverrides?.paddingHostName != null ? `${themeOverrides.paddingHostName}px` : undefined }}>
              — {hostName} —
            </div>
          </InlineTextEditor>
        )}
        <div
          data-inv-date
          className="mt-4 inline-flex items-center gap-3 px-5 py-3 rounded-lg border-2 border-dashed"
          style={{ borderColor: palette.rule }}
        >
          <div className="text-center">
            <InlineTextEditor 
              isBuilder={isBuilder} 
              themeKey="Subtitle" 
              currentFontSize={null} 
              currentColor={palette.subtitleColor}
              currentFont={themeOverrides?.fontSubtitle ?? null}
              currentBgColor={themeOverrides?.bgSubtitle ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <div 
                className={`${getFontClass(themeOverrides?.fontSubtitle, 'font-display')} text-2xl leading-none rounded px-2`}
                style={{ backgroundColor: themeOverrides?.bgSubtitle || undefined }}
              >
                {dt.day}
              </div>
              <div
                className={`${getFontClass(themeOverrides?.fontSubtitle, '')} text-[9px] tracking-widest uppercase mt-0.5`}
                style={{
                  color: palette.subtitleColor,
                  fontWeight: palette.subtitleBold ? 700 : undefined,
                }}
              >
                {dt.month}
              </div>
            </InlineTextEditor>
          </div>
          <div className="w-px h-8" style={{ background: palette.rule }} />
          <div className="text-center">
            <InlineTextEditor 
              isBuilder={isBuilder} 
              themeKey="Subtitle" 
              currentFontSize={null} 
              currentColor={palette.subtitleColor}
              currentFont={themeOverrides?.fontSubtitle ?? null}
              currentBgColor={themeOverrides?.bgSubtitle ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <div 
                className={`${getFontClass(themeOverrides?.fontSubtitle, 'font-display')} text-2xl leading-none rounded px-2`}
                style={{ backgroundColor: themeOverrides?.bgSubtitle || undefined }}
              >
                {dt.year.slice(2)}
              </div>
              <div
                className={`${getFontClass(themeOverrides?.fontSubtitle, '')} text-[9px] tracking-widest uppercase mt-0.5`}
                style={{
                  color: palette.subtitleColor,
                  fontWeight: palette.subtitleBold ? 700 : undefined,
                }}
              >
                An
              </div>
            </InlineTextEditor>
          </div>
          <div className="w-px h-8" style={{ background: palette.rule }} />
          <div className="text-center">
            <InlineTextEditor 
              isBuilder={isBuilder} 
              themeKey="Subtitle" 
              currentFontSize={null} 
              currentColor={palette.subtitleColor}
              currentFont={themeOverrides?.fontSubtitle ?? null}
              currentBgColor={themeOverrides?.bgSubtitle ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <div 
                className={`${getFontClass(themeOverrides?.fontSubtitle, 'font-display')} text-2xl leading-none rounded px-2`}
                style={{ backgroundColor: themeOverrides?.bgSubtitle || undefined }}
              >
                {dt.time}
              </div>
              <div
                className={`${getFontClass(themeOverrides?.fontSubtitle, '')} text-[9px] tracking-widest uppercase mt-0.5`}
                style={{
                  color: palette.subtitleColor,
                  fontWeight: palette.subtitleBold ? 700 : undefined,
                }}
              >
                Heure
              </div>
            </InlineTextEditor>
          </div>
        </div>
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="Message"
          currentFontSize={themeOverrides?.fontSizeMessage ?? null}
          currentColor={palette.subtitleColor}
          currentFont={themeOverrides?.fontMessage ?? null}
          currentBgColor={themeOverrides?.bgMessage ?? null}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <p
            data-inv-message
            className={`${getFontClass(themeOverrides?.fontMessage, 'font-serif')} italic text-[12px] mt-5 rounded px-2`}
            style={{
              color: palette.subtitleColor,
              fontWeight: palette.subtitleBold ? 700 : undefined,
              backgroundColor: themeOverrides?.bgMessage || undefined,
            }}
          >
            - {template.tagline} -
          </p>
        </InlineTextEditor>
      </div>
    </div>
  );
}

/* ============================================================ */
/* 5. ART DECO — geometric symmetric frame, no photo dominance   */
/* ============================================================ */
function ArtDecoLayout({ 
  template, 
  hostName, 
  themeOverrides, 
  eventDate,
  isBuilder,
  onThemeUpdate,
}: LayoutProps) {
  const dark = !!template.dark;
  const palette = getPalette(template, themeOverrides);
  const { first } = splitNames(template.name);
  const dt = parseDateParts(eventDate);
  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10"
      style={{
        background: palette.bg,
        color: palette.text,
        ...fontVars(template, themeOverrides),
        ...(themeOverrides?.fontWeightAll ? { fontWeight: themeOverrides.fontWeightAll } : {}),
      }}
    >
      <div className="relative p-6">
        {/* Geometric double frame */}
        <div className="border-2 p-4" style={{ borderColor: palette.accent }}>
          <div className="border p-6 text-center" style={{ borderColor: palette.accent }}>
            {/* Top deco */}
            <svg viewBox="0 0 120 40" className="mx-auto w-32 h-10" aria-hidden>
              <g stroke={palette.accent} strokeWidth="1.2" fill="none">
                <path d="M0 20 L40 20" />
                <path d="M80 20 L120 20" />
                <polygon points="60,5 75,20 60,35 45,20" fill={palette.accent} />
                <circle cx="45" cy="20" r="2" fill={palette.accent} />
                <circle cx="75" cy="20" r="2" fill={palette.accent} />
              </g>
            </svg>
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="ArtDecoSubtitle"
              currentFontSize={themeOverrides?.fontSizeArtDecoSubtitle ?? null}
              currentColor={themeOverrides?.artDecoSubtitleColor || palette.accent}
              currentFont={themeOverrides?.fontArtDecoSubtitle ?? null}
              currentBgColor={themeOverrides?.bgArtDecoSubtitle ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <p
                className={`${getFontClass(themeOverrides?.fontArtDecoSubtitle, 'font-serif')} text-[10px] tracking-[0.5em] uppercase mt-4 rounded px-1`}
                style={{ color: themeOverrides?.artDecoSubtitleColor || palette.accent, backgroundColor: themeOverrides?.bgArtDecoSubtitle || undefined }}
              >
                You are invited
              </p>
            </InlineTextEditor>
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="Title"
              currentFontSize={themeOverrides?.fontSizeTitle ?? null}
              currentColor={palette.titleColor}
              currentFont={themeOverrides?.fontTitle ?? null}
              currentBgColor={themeOverrides?.bgTitle ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <h2
                className={`${getFontClass(themeOverrides?.fontTitle, getTitleFontClass(template, themeOverrides))} text-3xl mt-5 tracking-wide rounded px-2`}
                style={{ 
                  color: palette.titleColor, 
                  fontWeight: palette.titleBold ? 700 : undefined,
                  backgroundColor: themeOverrides?.bgTitle || undefined,
                }}
              >
                {first?.toUpperCase()}
              </h2>
            </InlineTextEditor>
            {hostName && (
              <InlineTextEditor
                isBuilder={isBuilder}
                themeKey="HostName"
                currentFontSize={themeOverrides?.fontSizeHostName ?? null}
                currentColor={themeOverrides?.hostNameColor || palette.accent}
                currentFont={themeOverrides?.fontHostName ?? null}
                currentBgColor={themeOverrides?.bgHostName ?? null}
                onUpdate={(u) => onThemeUpdate?.(u)}
              >
                <p
                  className={`${getFontClass(themeOverrides?.fontHostName, 'font-serif')} italic text-[11px] mt-2 tracking-widest rounded px-1`}
                  style={{ color: themeOverrides?.hostNameColor || palette.accent, backgroundColor: themeOverrides?.bgHostName || undefined }}
                >
                  AND {hostName}
                </p>
              </InlineTextEditor>
            )}
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="Message"
              currentFontSize={themeOverrides?.fontSizeMessage ?? null}
              currentColor={palette.subtitleColor}
              currentFont={themeOverrides?.fontMessage ?? null}
              currentBgColor={themeOverrides?.bgMessage ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <p
                className={`${getFontClass(themeOverrides?.fontMessage, 'font-serif')} italic text-[12px] mt-5 rounded px-2`}
                style={{
                  color: palette.subtitleColor,
                  fontWeight: palette.subtitleBold ? 700 : undefined,
                  backgroundColor: themeOverrides?.bgMessage || undefined,
                }}
              >
                vous prient d'honorer leur soirée de votre présence
              </p>
            </InlineTextEditor>
            <div className="mt-6 grid grid-cols-3 text-center gap-1">
              <div>
                <InlineTextEditor
                  isBuilder={isBuilder}
                  themeKey="Date"
                  currentFontSize={themeOverrides?.fontSizeDate ?? null}
                  currentColor={themeOverrides?.dateColor || palette.subtitleColor}
                  currentFont={themeOverrides?.fontDate ?? null}
                  currentBgColor={themeOverrides?.bgDate ?? null}
                  onUpdate={(u) => onThemeUpdate?.(u)}
                >
                  <div
                    className={`${getFontClass(themeOverrides?.fontDate, '')} text-[9px] tracking-widest uppercase rounded px-1`}
                    style={{
                      color: themeOverrides?.dateColor || palette.subtitleColor,
                      fontWeight: palette.subtitleBold ? 700 : undefined,
                      backgroundColor: themeOverrides?.bgDate || undefined,
                    }}
                  >
                    Date
                  </div>
                  <div className="font-display text-lg mt-1" style={{ color: palette.accent }}>
                    {dt.day}.{dt.month.slice(0, 3).toUpperCase()}
                  </div>
                </InlineTextEditor>
              </div>
              <div>
                <InlineTextEditor
                  isBuilder={isBuilder}
                  themeKey="Date"
                  currentFontSize={themeOverrides?.fontSizeDate ?? null}
                  currentColor={themeOverrides?.dateColor || palette.subtitleColor}
                  currentFont={themeOverrides?.fontDate ?? null}
                  currentBgColor={themeOverrides?.bgDate ?? null}
                  onUpdate={(u) => onThemeUpdate?.(u)}
                >
                  <div
                    className={`${getFontClass(themeOverrides?.fontDate, '')} text-[9px] tracking-widest uppercase rounded px-1`}
                    style={{
                      color: themeOverrides?.dateColor || palette.subtitleColor,
                      fontWeight: palette.subtitleBold ? 700 : undefined,
                      backgroundColor: themeOverrides?.bgDate || undefined,
                    }}
                  >
                    Année
                  </div>
                  <div className="font-display text-lg mt-1" style={{ color: palette.accent }}>
                    {dt.year}
                  </div>
                </InlineTextEditor>
              </div>
              <div>
                <InlineTextEditor
                  isBuilder={isBuilder}
                  themeKey="Date"
                  currentFontSize={themeOverrides?.fontSizeDate ?? null}
                  currentColor={themeOverrides?.dateColor || palette.subtitleColor}
                  currentFont={themeOverrides?.fontDate ?? null}
                  currentBgColor={themeOverrides?.bgDate ?? null}
                  onUpdate={(u) => onThemeUpdate?.(u)}
                >
                  <div
                    className={`${getFontClass(themeOverrides?.fontDate, '')} text-[9px] tracking-widest uppercase rounded px-1`}
                    style={{
                      color: themeOverrides?.dateColor || palette.subtitleColor,
                      fontWeight: palette.subtitleBold ? 700 : undefined,
                      backgroundColor: themeOverrides?.bgDate || undefined,
                    }}
                  >
                    Heure
                  </div>
                  <div className="font-display text-lg mt-1" style={{ color: palette.accent }}>
                    {dt.time}
                  </div>
                </InlineTextEditor>
              </div>
            </div>
            <svg viewBox="0 0 120 40" className="mx-auto w-32 h-10 mt-5 rotate-180" aria-hidden>
              <g stroke={palette.accent} strokeWidth="1.2" fill="none">
                <path d="M0 20 L40 20" />
                <path d="M80 20 L120 20" />
                <polygon points="60,5 75,20 60,35 45,20" fill={palette.accent} />
              </g>
            </svg>
          </div>
        </div>
        <div className="mt-4 text-center">
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="ActionRSVPText"
            currentFontSize={themeOverrides?.fontSizeActionRSVPText ?? null}
            currentColor={themeOverrides?.actionRSVPTextColor || (dark ? palette.bg : "#fff")}
            currentFont={themeOverrides?.fontActionRSVPText ?? null}
            currentBgColor={themeOverrides?.bgActionRSVPText ?? palette.accent}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <button
              className={`${getFontClass(themeOverrides?.fontActionRSVPText, '')} rounded-none py-2.5 px-8 text-[11px] tracking-[0.3em] uppercase`}
              style={{ backgroundColor: themeOverrides?.bgActionRSVPText || palette.accent, color: themeOverrides?.actionRSVPTextColor || (dark ? palette.bg : "#fff") }}
            >
              R.S.V.P
            </button>
          </InlineTextEditor>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* 6. FULL BLEED — immersive photo background with overlay copy  */
/* ============================================================ */
function FullBleedLayout({
  template,
  coverImageUrl,
  hostName,
  themeOverrides,
  eventDate,
  isBuilder,
  onThemeUpdate,
  onImageUpdate,
}: LayoutProps) {
  const palette = getPalette(template, themeOverrides);
  const { first } = splitNames(template.name);
  const dt = parseDateParts(eventDate);
  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10 aspect-[4/6]"
      style={{
        ...fontVars(template, themeOverrides),
        ...(themeOverrides?.fontWeightAll ? { fontWeight: themeOverrides.fontWeightAll } : {}),
      }}
    >
      <div className="absolute inset-0">
        <InlineImageEditor isBuilder={isBuilder} onImageUpload={(file) => onImageUpdate?.('coverImage', file)}>
          <img
            src={coverImageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </InlineImageEditor>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/85" />
      <div className="relative h-full flex flex-col px-7 py-9 text-white">
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="FullBleedSubtitle"
          currentFontSize={themeOverrides?.fontSizeFullBleedSubtitle ?? null}
          currentColor={themeOverrides?.fullBleedSubtitleColor || undefined}
          currentFont={themeOverrides?.fontFullBleedSubtitle ?? null}
          currentBgColor={themeOverrides?.bgFullBleedSubtitle ?? null}
          currentPadding={themeOverrides?.paddingFullBleedSubtitle ?? null}
          currentHidden={themeOverrides?.hideFullBleedSubtitle ?? false}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <div className={`${getFontClass(themeOverrides?.fontFullBleedSubtitle, '')} flex items-center justify-between text-[10px] tracking-[0.4em] uppercase opacity-80 rounded px-1`} style={{ color: themeOverrides?.fullBleedSubtitleColor || undefined, backgroundColor: themeOverrides?.bgFullBleedSubtitle || undefined, padding: themeOverrides?.paddingFullBleedSubtitle != null ? `${themeOverrides.paddingFullBleedSubtitle}px` : undefined }}>
            <span>
              {dt.day} · {dt.month.slice(0, 3).toUpperCase()} · {dt.year.slice(2)}
            </span>
            <span style={{ color: palette.accent }}>—</span>
            <span>Save the Date</span>
          </div>
        </InlineTextEditor>
        <div className="mt-auto">
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="FullBleedMessage"
            currentFontSize={themeOverrides?.fontSizeFullBleedMessage ?? null}
            currentColor={themeOverrides?.fullBleedMessageColor || undefined}
            currentFont={themeOverrides?.fontFullBleedMessage ?? null}
            currentBgColor={themeOverrides?.bgFullBleedMessage ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <p className={`${getFontClass(themeOverrides?.fontFullBleedMessage, 'font-serif')} italic text-sm opacity-90 rounded px-1`} style={{ color: themeOverrides?.fullBleedMessageColor || undefined, backgroundColor: themeOverrides?.bgFullBleedMessage || undefined }}>Ensemble pour célébrer</p>
          </InlineTextEditor>
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="Title"
            currentFontSize={themeOverrides?.fontSizeTitle ?? null}
            currentColor={palette.titleColor}
            currentFont={themeOverrides?.fontTitle ?? null}
            currentBgColor={themeOverrides?.bgTitle ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <h2
              className={`${getFontClass(themeOverrides?.fontTitle, getTitleFontClass(template, themeOverrides))} text-6xl leading-[0.9] mt-2 rounded px-2`}
              style={{ 
                color: palette.titleColor, 
                fontWeight: palette.titleBold ? 700 : undefined,
                backgroundColor: themeOverrides?.bgTitle || undefined,
              }}
            >
              {first}
            </h2>
          </InlineTextEditor>
          {hostName && (
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="HostName"
              currentFontSize={themeOverrides?.fontSizeHostName ?? null}
              currentColor={themeOverrides?.hostNameColor || palette.accent}
              currentFont={themeOverrides?.fontHostName ?? null}
              currentBgColor={themeOverrides?.bgHostName ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <p
                className={`${getFontClass(themeOverrides?.fontHostName, 'font-serif')} italic text-sm mt-2 opacity-85 rounded px-1`}
                style={{ color: themeOverrides?.hostNameColor || palette.accent, backgroundColor: themeOverrides?.bgHostName || undefined }}
              >
                — {hostName} —
              </p>
            </InlineTextEditor>
          )}
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="FullBleedDate"
            currentFontSize={themeOverrides?.fontSizeFullBleedDate ?? null}
            currentColor={themeOverrides?.fullBleedDateColor || undefined}
            currentFont={themeOverrides?.fontFullBleedDate ?? null}
            currentBgColor={themeOverrides?.bgFullBleedDate ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <div className={`${getFontClass(themeOverrides?.fontFullBleedDate, '')} mt-6 flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase opacity-90 rounded px-1`} style={{ color: themeOverrides?.fullBleedDateColor || undefined, backgroundColor: themeOverrides?.bgFullBleedDate || undefined }}>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> {dt.weekday} {dt.day} {dt.month}.
              </div>
              <div className="w-px h-3 bg-white/40" />
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> {dt.time}
              </div>
            </div>
          </InlineTextEditor>
          <div className="mt-6 flex gap-2">
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="ActionRSVPText"
              textKey="textRsvpTitre"
              textLabel="Texte du bouton RSVP"
              currentText={themeOverrides?.textRsvpTitre ?? "Confirmer ma présence"}
              currentFontSize={themeOverrides?.fontSizeActionRSVPText ?? null}
              currentColor={themeOverrides?.actionRSVPTextColor || "#1a130d"}
              currentFont={themeOverrides?.fontActionRSVPText ?? null}
              currentBgColor={themeOverrides?.bgActionRSVPText ?? palette.accent}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <button
                className={`${getFontClass(themeOverrides?.fontActionRSVPText, '')} flex-1 rounded-full py-2.5 text-[11px] tracking-[0.25em] uppercase w-full`}
                style={{ backgroundColor: themeOverrides?.bgActionRSVPText || palette.accent, color: themeOverrides?.actionRSVPTextColor || "#1a130d" }}
              >
                {themeOverrides?.textRsvpTitre || "Confirmer ma présence"}
              </button>
            </InlineTextEditor>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----- shared bits ----- */
function ActionRow({ palette, isBuilder, themeOverrides, onThemeUpdate }: { palette: ReturnType<typeof getPalette>, isBuilder?: boolean, themeOverrides?: ThemeOverrides | null, onThemeUpdate?: (updates: Partial<ThemeOverrides>) => void }) {
  return (
    <div className="mt-10 mb-4 flex items-end justify-center gap-6">
      <MiniAction icon={<MapPin className="w-5 h-5" />} label="Lieu" themeKey="ActionLieu" palette={palette} isBuilder={isBuilder} themeOverrides={themeOverrides} onThemeUpdate={onThemeUpdate} />
      <MiniAction
        icon={<Heart className="w-5 h-5" fill="currentColor" />}
        label="RSVP"
        themeKey="ActionRSVP"
        palette={palette}
        isBuilder={isBuilder}
        themeOverrides={themeOverrides}
        onThemeUpdate={onThemeUpdate}
        highlight
      />
      <MiniAction icon={<Gift className="w-5 h-5" />} label="Cadeaux" themeKey="ActionCadeaux" palette={palette} isBuilder={isBuilder} themeOverrides={themeOverrides} onThemeUpdate={onThemeUpdate} />
    </div>
  );
}

/* ============================================================ */
/* 7. ILLUSTRATED — dedicated per-template artwork + photo hero  */
/* ============================================================ */
function IllustratedLayout({
  template,
  coverImageUrl,
  hostName,
  themeOverrides,
  eventDate,
  illustration,
  isBuilder,
  onThemeUpdate,
  onImageUpdate,
}: LayoutProps & { illustration: { src: string; tint: string } }) {
  const palette = getPalette(template, themeOverrides);
  const { first } = splitNames(template.name);
  const dt = parseDateParts(eventDate);
  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10"
      style={{
        background: palette.bg,
        color: palette.text,
        ...fontVars(template, themeOverrides),
        ...(themeOverrides?.fontWeightAll ? { fontWeight: themeOverrides.fontWeightAll } : {}),
      }}
    >
      {/* Top illustration band */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={illustration.src}
          alt=""
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-[140%] max-w-none object-contain opacity-90"
          loading="lazy"
        />
      </div>

      <div className="relative px-7 pt-2 pb-2 text-center">
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="IllustratedSubtitle"
          currentFontSize={themeOverrides?.fontSizeIllustratedSubtitle ?? null}
          currentColor={themeOverrides?.illustratedSubtitleColor || palette.accent}
          currentFont={themeOverrides?.fontIllustratedSubtitle ?? null}
          currentBgColor={themeOverrides?.bgIllustratedSubtitle ?? null}
          currentPadding={themeOverrides?.paddingIllustratedSubtitle ?? null}
          currentHidden={themeOverrides?.hideIllustratedSubtitle ?? false}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <p
            className={`${getFontClass(themeOverrides?.fontIllustratedSubtitle, 'font-serif')} italic text-[12px] tracking-[0.3em] uppercase rounded px-1`}
            style={{ color: themeOverrides?.illustratedSubtitleColor || palette.accent, backgroundColor: themeOverrides?.bgIllustratedSubtitle || undefined, padding: themeOverrides?.paddingIllustratedSubtitle != null ? `${themeOverrides.paddingIllustratedSubtitle}px` : undefined }}
          >
            Save the Date
          </p>
        </InlineTextEditor>
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="Title"
          currentFontSize={themeOverrides?.fontSizeTitle ?? null}
          currentColor={palette.titleColor}
          currentFont={themeOverrides?.fontTitle ?? null}
          currentBgColor={themeOverrides?.bgTitle ?? null}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <h2
            className={`${getFontClass(themeOverrides?.fontTitle, getTitleFontClass(template, themeOverrides))} text-6xl mt-3 leading-[0.9] rounded px-2`}
            style={{ 
              color: palette.titleColor, 
              fontWeight: palette.titleBold ? 700 : undefined,
              backgroundColor: themeOverrides?.bgTitle || undefined,
            }}
          >
            {first}
          </h2>
        </InlineTextEditor>
        {hostName && (
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="HostName"
            currentFontSize={themeOverrides?.fontSizeHostName ?? null}
            currentColor={themeOverrides?.hostNameColor || palette.accent}
            currentFont={themeOverrides?.fontHostName ?? null}
            currentBgColor={themeOverrides?.bgHostName ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <p className={`${getFontClass(themeOverrides?.fontHostName, 'font-serif')} italic text-[13px] mt-2 rounded px-1`} style={{ color: themeOverrides?.hostNameColor || palette.accent, backgroundColor: themeOverrides?.bgHostName || undefined }}>
              — {hostName} —
            </p>
          </InlineTextEditor>
        )}
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="Message"
          currentFontSize={themeOverrides?.fontSizeMessage ?? null}
          currentColor={palette.subtitleColor}
          currentFont={themeOverrides?.fontMessage ?? null}
          currentBgColor={themeOverrides?.bgMessage ?? null}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <p
            className={`${getFontClass(themeOverrides?.fontMessage, 'font-serif')} italic text-[13px] mt-5 max-w-[260px] mx-auto rounded px-2`}
            style={{
              color: palette.subtitleColor,
              fontWeight: palette.subtitleBold ? 700 : undefined,
              backgroundColor: themeOverrides?.bgMessage || undefined,
            }}
          >
            {template.tagline}
          </p>
        </InlineTextEditor>

        {/* Hero photo framed */}
        <div
          className="mt-6 mx-auto w-44 h-56 overflow-hidden rounded-full ring-2 ring-offset-2"
          style={{ boxShadow: `0 8px 24px ${illustration.tint}33` }}
        >
          <InlineImageEditor isBuilder={isBuilder} onImageUpload={(file) => onImageUpdate?.('coverImage', file)}>
            <img src={coverImageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
          </InlineImageEditor>
        </div>

        {/* Date strip */}
        <div className="mt-6 grid grid-cols-3 text-center gap-1">
          <div>
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="Date"
              currentFontSize={themeOverrides?.fontSizeDate ?? null}
              currentColor={themeOverrides?.dateColor || palette.subtitleColor}
              currentFont={themeOverrides?.fontDate ?? null}
              currentBgColor={themeOverrides?.bgDate ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <div
                className={`${getFontClass(themeOverrides?.fontDate, '')} text-[9px] tracking-widest uppercase rounded px-1`}
                style={{
                  color: themeOverrides?.dateColor || palette.subtitleColor,
                  fontWeight: palette.subtitleBold ? 700 : undefined,
                  backgroundColor: themeOverrides?.bgDate || undefined,
                }}
              >
                {dt.weekday}
              </div>
              <div className="font-display text-lg mt-1" style={{ color: palette.accent }}>
                {dt.day} {dt.month}.
              </div>
            </InlineTextEditor>
          </div>
          <div className="border-x" style={{ borderColor: palette.rule }}>
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="Date"
              currentFontSize={themeOverrides?.fontSizeDate ?? null}
              currentColor={themeOverrides?.dateColor || palette.subtitleColor}
              currentFont={themeOverrides?.fontDate ?? null}
              currentBgColor={themeOverrides?.bgDate ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <div
                className={`${getFontClass(themeOverrides?.fontDate, '')} text-[9px] tracking-widest uppercase rounded px-1`}
                style={{
                  color: themeOverrides?.dateColor || palette.subtitleColor,
                  fontWeight: palette.subtitleBold ? 700 : undefined,
                  backgroundColor: themeOverrides?.bgDate || undefined,
                }}
              >
                Année
              </div>
              <div className="font-display text-lg mt-1" style={{ color: palette.accent }}>
                {dt.year}
              </div>
            </InlineTextEditor>
          </div>
          <div>
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="Date"
              currentFontSize={themeOverrides?.fontSizeDate ?? null}
              currentColor={themeOverrides?.dateColor || palette.subtitleColor}
              currentFont={themeOverrides?.fontDate ?? null}
              currentBgColor={themeOverrides?.bgDate ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <div
                className={`${getFontClass(themeOverrides?.fontDate, '')} text-[9px] tracking-widests uppercase rounded px-1`}
                style={{
                  color: themeOverrides?.dateColor || palette.subtitleColor,
                  fontWeight: palette.subtitleBold ? 700 : undefined,
                  backgroundColor: themeOverrides?.bgDate || undefined,
                }}
              >
                Heure
              </div>
              <div className="font-display text-lg mt-1" style={{ color: palette.accent }}>
                {dt.time}
              </div>
            </InlineTextEditor>
          </div>
        </div>

        <ActionRow palette={palette} isBuilder={isBuilder} themeOverrides={themeOverrides} onThemeUpdate={onThemeUpdate} />
      </div>

      {/* Bottom illustration mirror */}
      <div className="relative h-20 overflow-hidden -mt-2 pointer-events-none">
        <img
          src={illustration.src}
          alt=""
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[130%] max-w-none object-contain opacity-60 rotate-180"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function MiniAction({
  icon,
  label,
  themeKey,
  palette,
  highlight,
  isBuilder,
  themeOverrides,
  onThemeUpdate,
}: {
  icon: React.ReactNode;
  label: string;
  themeKey: string;
  palette: ReturnType<typeof getPalette>;
  highlight?: boolean;
  isBuilder?: boolean;
  themeOverrides?: ThemeOverrides | null;
  onThemeUpdate?: (updates: Partial<ThemeOverrides>) => void;
}) {
  const dim = highlight ? "w-14 h-14" : "w-11 h-11";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`${dim} rounded-full flex items-center justify-center text-white shadow-md`}
        style={{ background: palette.accent }}
      >
        {icon}
      </div>
      <InlineTextEditor
        isBuilder={isBuilder}
        themeKey={themeKey}
        currentFontSize={themeOverrides?.['fontSize' + themeKey] as number ?? null}
        currentColor={themeOverrides?.[themeKey.charAt(0).toLowerCase() + themeKey.slice(1) + 'Color'] as string || palette.subtitleColor}
        currentFont={themeOverrides?.['font' + themeKey] as string ?? null}
        currentBgColor={themeOverrides?.['bg' + themeKey] as string ?? null}
        onUpdate={(u) => onThemeUpdate?.(u)}
      >
        <span
          className={`${getFontClass(themeOverrides?.['font' + themeKey] as string, 'font-serif')} text-[9px] tracking-[0.2em] uppercase rounded px-1`}
          style={{ 
            color: themeOverrides?.[themeKey.charAt(0).toLowerCase() + themeKey.slice(1) + 'Color'] as string || palette.subtitleColor, 
            fontWeight: palette.subtitleBold ? 700 : undefined,
            backgroundColor: themeOverrides?.['bg' + themeKey] as string || undefined
          }}
        >
          {label}
        </span>
      </InlineTextEditor>
    </div>
  );
}

/* ============================================================ */
/* SÉMINAIRE — Corporate, moderne, professionnel                */
/* ============================================================ */
function SeminaireLayout({
  template,
  coverImageUrl,
  hostName,
  themeOverrides,
  eventDate,
  isBuilder,
  onThemeUpdate,
}: LayoutProps) {
  const dark = !!template.dark;
  const palette = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  const accentColor = dark ? "#c9a84c" : "#1a3a6b";
  const bgColor = dark ? "#0f2044" : "#f8f9fa";
  const textColor = dark ? "#f0f4ff" : "#1a1a2e";
  const mutedColor = dark ? "rgba(240,244,255,0.6)" : "rgba(26,26,46,0.55)";

  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10"
      style={{
        background: bgColor,
        color: textColor,
        fontWeight: themeOverrides?.fontWeightAll || undefined,
      }}
    >
      {/* Header bande top */}
      <div
        className="relative overflow-hidden"
        style={{
          background: dark
            ? "linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)"
            : "linear-gradient(135deg, #1a3a6b 0%, #0f2044 100%)",
          minHeight: 110,
        }}
      >
        {/* Logo / cover image */}
        {coverImageUrl && (
          <div className="absolute top-4 right-6 w-16 h-16 rounded-xl overflow-hidden ring-2 ring-white/20 shadow-lg">
            <img src={coverImageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        <div className="relative px-6 py-6 pr-24">
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="SeminaireSubtitle"
            currentFontSize={themeOverrides?.fontSizeSeminaireSubtitle ?? null}
            currentColor={themeOverrides?.seminaireSubtitleColor || accentColor}
            currentFont={themeOverrides?.fontSeminaireSubtitle ?? null}
            currentBgColor={themeOverrides?.bgSeminaireSubtitle ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <div
              className={`${getFontClass(themeOverrides?.fontSeminaireSubtitle, '')} text-[9px] tracking-[0.5em] uppercase mb-2 rounded px-1`}
              style={{ color: themeOverrides?.seminaireSubtitleColor || accentColor, backgroundColor: themeOverrides?.bgSeminaireSubtitle || undefined }}
            >
              Invitation officielle
            </div>
          </InlineTextEditor>
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="Title"
            currentFontSize={themeOverrides?.fontSizeTitle ?? null}
            currentColor={palette.titleColor}
            currentFont={themeOverrides?.fontTitle ?? null}
            currentBgColor={themeOverrides?.bgTitle ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <h2
              className={`${getFontClass(themeOverrides?.fontTitle, 'font-display')} text-2xl leading-tight rounded px-2`}
              style={{
                color: palette.titleColor,
                fontWeight: palette.titleBold ? 700 : undefined,
                fontSize: themeOverrides?.fontSizeTitle ? themeOverrides.fontSizeTitle + "px" : undefined,
                backgroundColor: themeOverrides?.bgTitle || undefined,
              }}
            >
              {template.name}
            </h2>
          </InlineTextEditor>
          {hostName && (
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="HostName"
              currentFontSize={themeOverrides?.fontSizeHostName ?? null}
              currentColor={themeOverrides?.hostNameColor || "rgba(255,255,255,0.7)"}
              currentFont={themeOverrides?.fontHostName ?? null}
              currentBgColor={themeOverrides?.bgHostName ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <p className={`${getFontClass(themeOverrides?.fontHostName, '')} text-[11px] mt-1 rounded px-1`} style={{ color: themeOverrides?.hostNameColor || "rgba(255,255,255,0.7)", backgroundColor: themeOverrides?.bgHostName || undefined }}>
                {hostName}
              </p>
            </InlineTextEditor>
          )}
        </div>
        {/* Ligne déco bas */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />
      </div>

      {/* Corps */}
      <div className="px-6 py-5 space-y-4">
        {/* Infos clés */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-xl p-3"
            style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(26,58,107,0.06)" }}
          >
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="Date"
              currentFontSize={themeOverrides?.fontSizeDate ?? null}
              currentColor={themeOverrides?.dateColor || (dark ? "#f0f4ff" : "#0f2044")}
              currentFont={themeOverrides?.fontDate ?? null}
              currentBgColor={themeOverrides?.bgDate ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <div
                className={`${getFontClass(themeOverrides?.fontDate, '')} text-[9px] tracking-[0.3em] uppercase mb-1 rounded px-1`}
                style={{ color: accentColor, backgroundColor: themeOverrides?.bgDate || undefined }}
              >
                Date
              </div>
              <div
                className={`${getFontClass(themeOverrides?.fontDate, 'font-display')} text-lg leading-none rounded px-1`}
                style={{ color: themeOverrides?.dateColor || (dark ? "#f0f4ff" : "#0f2044") }}
              >
                {dt.day}
              </div>
              <div className={`${getFontClass(themeOverrides?.fontDate, '')} text-[10px] mt-0.5 rounded px-1`} style={{ color: mutedColor }}>
                {dt.weekday} {dt.month} {dt.year}
              </div>
            </InlineTextEditor>
          </div>
          <div
            className="rounded-xl p-3"
            style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(26,58,107,0.06)" }}
          >
            <InlineTextEditor
              isBuilder={isBuilder}
              themeKey="Date"
              currentFontSize={themeOverrides?.fontSizeDate ?? null}
              currentColor={themeOverrides?.dateColor || (dark ? "#f0f4ff" : "#0f2044")}
              currentFont={themeOverrides?.fontDate ?? null}
              currentBgColor={themeOverrides?.bgDate ?? null}
              onUpdate={(u) => onThemeUpdate?.(u)}
            >
              <div
                className={`${getFontClass(themeOverrides?.fontDate, '')} text-[9px] tracking-[0.3em] uppercase mb-1 rounded px-1`}
                style={{ color: accentColor, backgroundColor: themeOverrides?.bgDate || undefined }}
              >
                Heure
              </div>
              <div
                className={`${getFontClass(themeOverrides?.fontDate, 'font-display')} text-lg leading-none rounded px-1`}
                style={{ color: themeOverrides?.dateColor || (dark ? "#f0f4ff" : "#0f2044") }}
              >
                {dt.time}
              </div>
              <div className={`${getFontClass(themeOverrides?.fontDate, '')} text-[10px] mt-0.5 rounded px-1`} style={{ color: mutedColor }}>
                Heure d'ouverture
              </div>
            </InlineTextEditor>
          </div>
        </div>

        {/* Trait déco */}
        <div
          className="h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}44, transparent)`,
          }}
        />

        {/* Message / thème */}
        {template.tagline && (
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="Message"
            currentFontSize={themeOverrides?.fontSizeMessage ?? null}
            currentColor={palette.subtitleColor}
            currentFont={themeOverrides?.fontMessage ?? null}
            currentBgColor={themeOverrides?.bgMessage ?? null}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <p className={`${getFontClass(themeOverrides?.fontMessage, '')} text-[12px] italic leading-relaxed rounded px-1`} style={{ color: palette.subtitleColor, fontWeight: palette.subtitleBold ? 700 : undefined, backgroundColor: themeOverrides?.bgMessage || undefined }}>
              {template.tagline}
            </p>
          </InlineTextEditor>
        )}

        {/* Boutons d'action */}
        <div className="flex gap-2 pt-1">
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="ActionRSVPText"
            currentFontSize={themeOverrides?.fontSizeActionRSVPText ?? null}
            currentColor={themeOverrides?.actionRSVPTextColor || "#ffffff"}
            currentFont={themeOverrides?.fontActionRSVPText ?? null}
            currentBgColor={themeOverrides?.bgActionRSVPText ?? undefined}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <button
              className={`${getFontClass(themeOverrides?.fontActionRSVPText, '')} flex-1 rounded-xl py-2.5 text-[11px] font-semibold tracking-wider uppercase shadow w-full`}
              style={{
                background: themeOverrides?.bgActionRSVPText || `linear-gradient(135deg, ${accentColor}, ${dark ? "#9b7e35" : "#0f2044"})`,
                color: themeOverrides?.actionRSVPTextColor || "#ffffff",
              }}
            >
              S'inscrire
            </button>
          </InlineTextEditor>
          <InlineTextEditor
            isBuilder={isBuilder}
            themeKey="ActionDetailsText"
            currentFontSize={themeOverrides?.fontSizeActionDetailsText ?? null}
            currentColor={themeOverrides?.actionDetailsTextColor || accentColor}
            currentFont={themeOverrides?.fontActionDetailsText ?? null}
            currentBgColor={themeOverrides?.bgActionDetailsText ?? undefined}
            onUpdate={(u) => onThemeUpdate?.(u)}
          >
            <button
              className={`${getFontClass(themeOverrides?.fontActionDetailsText, '')} rounded-xl px-3 py-2.5 text-[11px] border`}
              style={{ borderColor: themeOverrides?.actionDetailsTextColor || accentColor + "44", color: themeOverrides?.actionDetailsTextColor || accentColor, backgroundColor: themeOverrides?.bgActionDetailsText || undefined }}
            >
              Agenda
            </button>
          </InlineTextEditor>
        </div>
      </div>

      {/* Pied de page */}
      <div
        className="px-6 py-3 border-t flex items-center justify-between"
        style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(26,58,107,0.12)" }}
      >
        <InlineTextEditor
          isBuilder={isBuilder}
          themeKey="SeminaireFooter"
          currentFontSize={themeOverrides?.fontSizeSeminaireFooter ?? null}
          currentColor={themeOverrides?.seminaireFooterColor || mutedColor}
          currentFont={themeOverrides?.fontSeminaireFooter ?? null}
          currentBgColor={themeOverrides?.bgSeminaireFooter ?? null}
          onUpdate={(u) => onThemeUpdate?.(u)}
        >
          <span className={`${getFontClass(themeOverrides?.fontSeminaireFooter, '')} text-[9px] tracking-[0.4em] uppercase rounded px-1`} style={{ color: themeOverrides?.seminaireFooterColor || mutedColor, backgroundColor: themeOverrides?.bgSeminaireFooter || undefined }}>
            Conférence Professionnelle
          </span>
        </InlineTextEditor>
        <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
      </div>
    </div>
  );
}

