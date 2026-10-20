export type BlockType =
  | "Section"
  | "Columns"
  | "Column"
  | "Text"
  | "Heading"
  | "Image"
  | "Button"
  | "Video"
  | "Map"
  | "Divider"
  | "Icon"
  | "Motif"
  | "Countdown"
  | "Gallery"
  | "RsvpForm"
  | "Spacer";

export interface BlockStyle {
  // Layout
  width?: string;
  height?: string;
  minHeight?: string;
  margin?: string;
  padding?: string;
  display?: string;
  flexDirection?: "row" | "column";
  justifyContent?: string;
  alignItems?: string;
  gap?: string;

  // Typography
  color?: string;
  fontSize?: string;
  fontWeight?: string | number;
  fontStyle?: string;
  letterSpacing?: string;
  lineHeight?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  fontFamily?: string;

  // Appearance
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  opacity?: number;
  borderRadius?: string;
  border?: string;
  borderBottom?: string;
  boxShadow?: string;

  // Positioning
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
}

export interface BlockProps {
  [key: string]: any;
}

export interface BlockNode {
  id: string;
  type: BlockType;
  props?: any;
  styles?: BlockStyle;
  children?: BlockNode[];
  position?: { x: number; y: number };
  size?: { width: number | string; height: number | string };
}

// Canvas width constant (mobile-first)
export const CANVAS_WIDTH = 400;

// ─────────────────────────────────────────────
// STARTER TEMPLATES
// ─────────────────────────────────────────────

export interface StarterTemplate {
  id: string;
  name: string;
  emoji: string;
  description: string;
  bgPreview: string; // CSS gradient for thumbnail
  canvas: BlockNode[];
}

// Helper to build the root section
function root(bg: string, children: BlockNode[]): BlockNode {
  return {
    id: "root-section-1",
    type: "Section",
    props: {},
    styles: { backgroundColor: bg, minHeight: "800px" },
    children,
  };
}

// ── 1. MARIAGE ÉLÉGANT (Ivory + Gold + Script) ──────────────────
const MARIAGE_ELEGANT: BlockNode[] = [
  root("#fdf8f0", [
    // Photo plein fond
    {
      id: "cover-img",
      type: "Image",
      props: { src: "", alt: "Photo de couverture" },
      position: { x: 0, y: 0 },
      size: { width: 400, height: 280 },
      styles: { borderRadius: "0px" },
    },
    // Bandeau dorure haut
    {
      id: "ornament-top",
      type: "Divider",
      props: { thickness: 1, style: "solid", color: "#c9a961" },
      position: { x: 20, y: 295 },
      size: { width: 360, height: 10 },
      styles: {},
    },
    // Label "Vous êtes invité·e"
    {
      id: "label-top",
      type: "Text",
      props: { text: "✦  Vous êtes cordialement invité·e  ✦" },
      position: { x: 0, y: 310 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "11px",
        letterSpacing: "0.2em",
        textAlign: "center",
        color: "#c9a961",
      },
    },
    // Titre principal (noms)
    {
      id: "title-main",
      type: "Heading",
      props: { text: "Sarah & Marc", level: "h1" },
      position: { x: 0, y: 335 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Great Vibes', cursive",
        fontSize: "56px",
        textAlign: "center",
        color: "#3a2417",
        fontWeight: "400",
        padding: "0",
        margin: "0",
      },
    },
    // Ornament
    {
      id: "ornament-mid",
      type: "Text",
      props: { text: "✦" },
      position: { x: 0, y: 395 },
      size: { width: 400, height: "auto" },
      styles: {
        textAlign: "center",
        color: "#c9a961",
        fontSize: "18px",
      },
    },
    // Date
    {
      id: "date-text",
      type: "Text",
      props: { text: "Samedi 14 Juin 2025" },
      position: { x: 0, y: 420 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "18px",
        letterSpacing: "0.1em",
        textAlign: "center",
        color: "#3a2417",
        fontWeight: "600",
      },
    },
    // Lieu
    {
      id: "location-text",
      type: "Text",
      props: { text: "Château de la Rose — Paris" },
      position: { x: 0, y: 450 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "13px",
        letterSpacing: "0.15em",
        textAlign: "center",
        color: "#c9a961",
      },
    },
    // Divider
    {
      id: "ornament-bottom",
      type: "Divider",
      props: { thickness: 1, style: "solid", color: "#c9a961" },
      position: { x: 20, y: 475 },
      size: { width: 360, height: 10 },
      styles: {},
    },
    // Message
    {
      id: "message-text",
      type: "Text",
      props: { text: "« Ce que Dieu a uni,\nque l'homme ne le sépare point. »" },
      position: { x: 20, y: 500 },
      size: { width: 360, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "14px",
        fontStyle: "italic",
        textAlign: "center",
        color: "#6d4d39",
        lineHeight: "1.8",
      },
    },
    // Bouton RSVP
    {
      id: "rsvp-btn",
      type: "Button",
      props: { text: "Confirmer ma présence", href: "#rsvp" },
      position: { x: 75, y: 570 },
      size: { width: 250, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "14px",
        letterSpacing: "0.1em",
        backgroundColor: "#c9a961",
        color: "#ffffff",
        borderRadius: "0px",
        padding: "14px 28px",
      },
    },
  ]),
];

// ── 2. ANNIVERSAIRE FESTIF (Dark + Gold + Bold) ──────────────────
const ANNIVERSAIRE_FESTIF: BlockNode[] = [
  root("#1a1a2e", [
    // Fond confettis simulé avec image
    {
      id: "cover-img",
      type: "Image",
      props: { src: "", alt: "Photo" },
      position: { x: 0, y: 0 },
      size: { width: 400, height: 240 },
      styles: { borderRadius: "0px", opacity: 0.85 },
    },
    // Grand titre
    {
      id: "title-main",
      type: "Heading",
      props: { text: "JOYEUX\nANNIVERSAIRE !", level: "h1" },
      position: { x: 0, y: 255 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: "28px",
        fontWeight: "700",
        textAlign: "center",
        color: "#e6c570",
        letterSpacing: "0.05em",
        lineHeight: "1.3",
      },
    },
    // Nom
    {
      id: "name-text",
      type: "Heading",
      props: { text: "Céleste", level: "h2" },
      position: { x: 0, y: 350 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Great Vibes', cursive",
        fontSize: "64px",
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "400",
      },
    },
    // Âge
    {
      id: "age-text",
      type: "Text",
      props: { text: "fête ses 30 ans" },
      position: { x: 0, y: 420 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "18px",
        textAlign: "center",
        color: "#e6c570",
        letterSpacing: "0.1em",
      },
    },
    // Séparateur
    {
      id: "sep",
      type: "Divider",
      props: { thickness: 1, style: "solid", color: "#e6c570" },
      position: { x: 60, y: 458 },
      size: { width: 280, height: 10 },
      styles: {},
    },
    // Date
    {
      id: "date-text",
      type: "Text",
      props: { text: "Samedi 22 Novembre 2025\n20h00" },
      position: { x: 0, y: 478 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "16px",
        textAlign: "center",
        color: "#ffffff",
        letterSpacing: "0.08em",
        lineHeight: "1.9",
      },
    },
    // Lieu
    {
      id: "lieu-text",
      type: "Text",
      props: { text: "📍  Villa Lumière — Lyon" },
      position: { x: 0, y: 545 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "13px",
        textAlign: "center",
        color: "#e6c570",
      },
    },
    // Bouton RSVP
    {
      id: "rsvp-btn",
      type: "Button",
      props: { text: "Je serai là ! 🎉", href: "#rsvp" },
      position: { x: 75, y: 590 },
      size: { width: 250, height: "auto" },
      styles: {
        fontFamily: "'Cinzel', serif",
        fontSize: "13px",
        letterSpacing: "0.08em",
        backgroundColor: "#e6c570",
        color: "#1a1a2e",
        borderRadius: "0px",
        fontWeight: "700",
        padding: "14px 28px",
      },
    },
  ]),
];

// ── 3. BAPTÊME DOUX (Pastel + Script + Doves) ───────────────────
const BAPTEME_DOUX: BlockNode[] = [
  root("#f0f7ff", [
    {
      id: "cover-img",
      type: "Image",
      props: { src: "", alt: "Photo bébé" },
      position: { x: 50, y: 20 },
      size: { width: 300, height: 300 },
      styles: { borderRadius: "50%" },
    },
    {
      id: "label",
      type: "Text",
      props: { text: "✦  Baptême  ✦" },
      position: { x: 0, y: 335 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "11px",
        letterSpacing: "0.25em",
        textAlign: "center",
        color: "#7eb5e0",
      },
    },
    {
      id: "title-main",
      type: "Heading",
      props: { text: "Léonie", level: "h1" },
      position: { x: 0, y: 360 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Great Vibes', cursive",
        fontSize: "72px",
        textAlign: "center",
        color: "#2a5fa0",
        fontWeight: "400",
      },
    },
    {
      id: "subtitle",
      type: "Text",
      props: { text: "reçoit le sacrement du Baptême" },
      position: { x: 0, y: 442 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontSize: "15px",
        textAlign: "center",
        color: "#4a7db5",
      },
    },
    {
      id: "sep",
      type: "Divider",
      props: { thickness: 1, style: "solid", color: "#aacde8" },
      position: { x: 60, y: 480 },
      size: { width: 280, height: 10 },
      styles: {},
    },
    {
      id: "date-text",
      type: "Text",
      props: { text: "Dimanche 8 Juin 2025 à 10h30\nÉglise Saint-Pierre — Bordeaux" },
      position: { x: 0, y: 500 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "14px",
        textAlign: "center",
        color: "#2a5fa0",
        lineHeight: "2",
      },
    },
    {
      id: "verse",
      type: "Text",
      props: { text: "« Laissez venir à moi les petits enfants. »\n— Marc 10:14" },
      position: { x: 20, y: 570 },
      size: { width: 360, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontSize: "13px",
        textAlign: "center",
        color: "#7eb5e0",
        lineHeight: "1.8",
      },
    },
    {
      id: "rsvp-btn",
      type: "Button",
      props: { text: "Confirmer la présence", href: "#rsvp" },
      position: { x: 75, y: 640 },
      size: { width: 250, height: "auto" },
      styles: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "13px",
        letterSpacing: "0.08em",
        backgroundColor: "#7eb5e0",
        color: "#ffffff",
        borderRadius: "30px",
        padding: "14px 28px",
      },
    },
  ]),
];

// ── 4. SÉMINAIRE CORPORATE (Dark Minimal + Sans-serif) ──────────
const SEMINAIRE_CORPORATE: BlockNode[] = [
  root("#0f172a", [
    {
      id: "cover-img",
      type: "Image",
      props: { src: "", alt: "Bannière événement" },
      position: { x: 0, y: 0 },
      size: { width: 400, height: 200 },
      styles: { opacity: 0.7, borderRadius: "0px" },
    },
    {
      id: "badge",
      type: "Text",
      props: { text: "CONFÉRENCE & SÉMINAIRE" },
      position: { x: 0, y: 215 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "0.3em",
        textAlign: "center",
        color: "#60a5fa",
      },
    },
    {
      id: "title-main",
      type: "Heading",
      props: { text: "Summit\nDigital 2025", level: "h1" },
      position: { x: 20, y: 240 },
      size: { width: 360, height: "auto" },
      styles: {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "36px",
        fontWeight: "700",
        textAlign: "center",
        color: "#ffffff",
        lineHeight: "1.2",
      },
    },
    {
      id: "sep",
      type: "Divider",
      props: { thickness: 2, style: "solid", color: "#3b82f6" },
      position: { x: 150, y: 350 },
      size: { width: 100, height: 10 },
      styles: {},
    },
    {
      id: "tagline",
      type: "Text",
      props: { text: "Transformer le numérique,\nensemble." },
      position: { x: 0, y: 375 },
      size: { width: 400, height: "auto" },
      styles: {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "15px",
        textAlign: "center",
        color: "#94a3b8",
        lineHeight: "1.7",
      },
    },
    {
      id: "date-text",
      type: "Text",
      props: { text: "📅  15 – 16 Octobre 2025\n🏛️  Palais des Congrès — Paris" },
      position: { x: 20, y: 445 },
      size: { width: 360, height: "auto" },
      styles: {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "13px",
        textAlign: "center",
        color: "#e2e8f0",
        lineHeight: "2.2",
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
      },
    },
    {
      id: "rsvp-btn",
      type: "Button",
      props: { text: "S'inscrire gratuitement →", href: "#rsvp" },
      position: { x: 60, y: 565 },
      size: { width: 280, height: "auto" },
      styles: {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "13px",
        fontWeight: "700",
        letterSpacing: "0.05em",
        backgroundColor: "#3b82f6",
        color: "#ffffff",
        borderRadius: "8px",
        padding: "16px 28px",
      },
    },
  ]),
];

// ── 5. TOILE VIERGE ─────────────────────────────────────────────
const BLANK_CANVAS: BlockNode[] = [root("#ffffff", [])];

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: "mariage",
    name: "Mariage élégant",
    emoji: "💍",
    description: "Ivory, doré & script manuscrit",
    bgPreview: "linear-gradient(135deg, #fdf8f0 0%, #f0e6cc 100%)",
    canvas: MARIAGE_ELEGANT,
  },
  {
    id: "anniversaire",
    name: "Anniversaire festif",
    emoji: "🎉",
    description: "Sombre, doré & audacieux",
    bgPreview: "linear-gradient(135deg, #1a1a2e 0%, #2d2d5e 100%)",
    canvas: ANNIVERSAIRE_FESTIF,
  },
  {
    id: "bapteme",
    name: "Baptême doux",
    emoji: "🕊️",
    description: "Bleu pastel & élégance sobre",
    bgPreview: "linear-gradient(135deg, #f0f7ff 0%, #cce4f7 100%)",
    canvas: BAPTEME_DOUX,
  },
  {
    id: "seminaire",
    name: "Séminaire / Corporate",
    emoji: "🎤",
    description: "Sombre, moderne & professionnel",
    bgPreview: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
    canvas: SEMINAIRE_CORPORATE,
  },
  {
    id: "blank",
    name: "Toile vierge",
    emoji: "✨",
    description: "Partir de zéro",
    bgPreview: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    canvas: BLANK_CANVAS,
  },
];

// Default export for backward compat
export const INITIAL_CANVAS_DATA: BlockNode[] = MARIAGE_ELEGANT;
