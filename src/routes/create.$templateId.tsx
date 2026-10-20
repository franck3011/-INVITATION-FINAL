import { createFileRoute, useNavigate, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getTemplate } from "@/lib/templates";
import { getFormSchema, type FieldKey, type FieldConfig } from "@/lib/form-schemas";
import {
  PreviewInvitation,
  pickLayout,
  FONT_PAIR_OPTIONS,
  TITLE_FONT_OPTIONS,
  type ThemeOverrides,
} from "@/components/preview-invitation";
import { FullInvitationPreview } from "@/components/full-invitation-preview";
import { EnvelopeIntro, FLAP_PATHS } from "@/components/envelope-intro";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getSampleEvent } from "@/lib/sample-event";
import { createEvent } from "@/fns/events.functions";
import { supabase } from "@/integrations/supabase/client";
import { saveMyInvitation } from "@/lib/my-invitations";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Reveal } from "@/components/ui/reveal";

export const Route = createFileRoute("/create/$templateId")({
  head: ({ params }) => {
    const t = getTemplate(params.templateId);
    return {
      meta: [
        { title: t ? `Créer une invitation ${t.name} — Inviti` : "Créer — Inviti" },
        {
          name: "description",
          content: "Personnalisez votre invitation digitale en quelques clics.",
        },
      ],
    };
  },
  component: CreatePage,
  notFoundComponent: () => (
    <div className="p-12 text-center">
      <p>Modèle introuvable.</p>
      <Link to="/templates" className="underline">
        Voir les modèles
      </Link>
    </div>
  ),
  loader: ({ params }) => {
    const t = getTemplate(params.templateId);
    if (!t) throw notFound();
    return { template: t };
  },
});

interface ProgramItem {
  time: string;
  title: string;
  description: string;
}

export function getEventDateLabel(ceremonyTitle?: string | null, fallback = "Date du mariage"): string {
  if (!ceremonyTitle || !ceremonyTitle.trim()) return fallback;
  const clean = ceremonyTitle.trim();
  const upper = clean.toUpperCase();

  // Correspondances directes
  if (upper === "LA DOTE" || upper === "DOTE") return "Date de la dote";
  if (upper === "LE MARIAGE" || upper === "MARIAGE" || upper === "NOTRE MARIAGE") return "Date du mariage";
  if (upper === "CÉRÉMONIE" || upper === "CEREMONIE" || upper === "LA CÉRÉMONIE" || upper === "LA CEREMONIE") return "Date de la cérémonie";
  if (upper === "MARIAGE COUTUMIER" || upper === "LE MARIAGE COUTUMIER") return "Date du mariage coutumier";
  if (upper === "MARIAGE CIVIL" || upper === "LE MARIAGE CIVIL") return "Date du mariage civil";
  if (upper === "MARIAGE RELIGIEUX" || upper === "LE MARIAGE RELIGIEUX") return "Date du mariage religieux";

  // Mots-clés
  if (upper.includes("DOTE")) return `Date de la ${clean.toLowerCase()}`;
  if (upper.includes("FIANÇAILLE") || upper.includes("FIANCAILLE")) return `Date des ${clean.toLowerCase()}`;
  if (upper.includes("ANNIVERSAIRE")) return `Date de l'${clean.toLowerCase()}`;
  if (upper.includes("BAPTÊME") || upper.includes("BAPTEME")) return `Date du ${clean.toLowerCase()}`;
  if (upper.includes("CÉRÉMONIE") || upper.includes("CEREMONIE")) return `Date de la ${clean.toLowerCase()}`;
  if (upper.includes("MARIAGE")) return `Date du ${clean.toLowerCase()}`;

  // Préfixes grammaticaux
  if (upper.startsWith("LA ")) return `Date de la ${clean.slice(3).toLowerCase()}`;
  if (upper.startsWith("LE ")) return `Date du ${clean.slice(3).toLowerCase()}`;
  if (upper.startsWith("LES ")) return `Date des ${clean.slice(4).toLowerCase()}`;
  if (upper.startsWith("L'") || upper.startsWith("L’")) return `Date de l'${clean.slice(2).toLowerCase()}`;
  if (/^[AEIOUÉÈÊÀÂÎÏÔÙÛ]/i.test(clean)) return `Date de l'${clean.toLowerCase()}`;

  return `Date : ${clean}`;
}

function CreatePage() {
  const params = Route.useParams();
  const template = getTemplate(params.templateId)!;
  const schema = getFormSchema(template.id);
  const sample = getSampleEvent(template);
  const navigate = useNavigate();
  const create = useServerFn(createEvent);

  const [ceremonyTitle, setCeremonyTitle] = useState("");
  const [title, setTitle] = useState("");
  const [hostName, setHostName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [linkExpiresAt, setLinkExpiresAt] = useState("");
  const [location, setLocation] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [venueImageUrl, setVenueImageUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [bibleVerse, setBibleVerse] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [coverImageUrl2, setCoverImageUrl2] = useState<string | null>(null);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [storyText, setStoryText] = useState("");
  const [rsvpDeadline, setRsvpDeadline] = useState("");
  const [invitedCount, setInvitedCount] = useState("");
  const [maxGuestsPerRsvp, setMaxGuestsPerRsvp] = useState("");
  const [seminaireTheme, setSeminaireTheme] = useState("");
  const [seminaireOrganisateur, setSeminaireOrganisateur] = useState("");
  const [seminaireIntervenants, setSeminaireIntervenants] = useState("");
  const [seminaireSponsors, setSeminaireSponsors] = useState("");
  const [seminaireContact, setSeminaireContact] = useState("");
  const [seminaireVideoUrl, setSeminaireVideoUrl] = useState("");
  const [seminaireSpeakers, setSeminaireSpeakers] = useState<
    { name: string; role: string; company: string; photoUrl: string }[]
  >([{ name: "", role: "", company: "", photoUrl: "" }]);
  const [seminaireSponsorLogos, setSeminaireSponsorLogos] = useState<string[]>([]);
  const phInit = getFormSchema(template.id).programItemPlaceholder ?? {
    time: "",
    title: "",
    description: "",
  };
  const [program, setProgram] = useState<ProgramItem[]>([
    { time: phInit.time, title: "", description: "" },
  ]);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [dressCode, setDressCode] = useState("");
  const [giftInfo, setGiftInfo] = useState("");
  const [accommodationInfo, setAccommodationInfo] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [showEnvelopePreview, setShowEnvelopePreview] = useState(false);
  const [previewEnvelopeOpening, setPreviewEnvelopeOpening] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  // --- Predefined Envelope Models (from Pinterest) ---
  const ENVELOPE_MODELS: {
    id: string;
    name: string;
    style: string;
    direction: "top" | "left" | "right";
    body: string;
    flap: string;
    seal: string;
    text: string;
  }[] = [
    {
      id: "m1",
      name: "Vert Olive Chic",
      style: "classic",
      direction: "top",
      body: "#7c8c6b",
      flap: "#6f7e5f",
      seal: "#5a6a48",
      text: "✦",
    },
    {
      id: "m2",
      name: "Bleu Nuit & Or",
      style: "deep-v",
      direction: "top",
      body: "#f4f1eb",
      flap: "#1c355e",
      seal: "#d4af37",
      text: "SM",
    },
    {
      id: "m3",
      name: "Kraft Rustique",
      style: "vintage-point",
      direction: "top",
      body: "#b38b59",
      flap: "#a67b49",
      seal: "#6e4a2e",
      text: "♥",
    },
    {
      id: "m4",
      name: "Rouge Bordeaux",
      style: "scalloped",
      direction: "top",
      body: "#8b1a2a",
      flap: "#751321",
      seal: "#d4af37",
      text: "M&V",
    },
    {
      id: "m5",
      name: "Porte Blanche & Bleu",
      style: "minimalist",
      direction: "left",
      body: "#ffffff",
      flap: "#2f4d77",
      seal: "silver",
      text: "W",
    },
    {
      id: "m6",
      name: "Noir & Or Minimaliste",
      style: "tapered-square",
      direction: "top",
      body: "#1a1a1a",
      flap: "#1a1a1a",
      seal: "#d4af37",
      text: "M",
    },
    {
      id: "m7",
      name: "Vieux Rose Dentelle",
      style: "deckle",
      direction: "top",
      body: "#d4b5b0",
      flap: "#c4a09a",
      seal: "#8a5a54",
      text: "L&A",
    },
    {
      id: "m8",
      name: "Porte Émeraude Latéral",
      style: "baroque",
      direction: "right",
      body: "#14453D",
      flap: "#103932",
      seal: "#F9D07F",
      text: "R",
    },
    {
      id: "m9",
      name: "Pochette CD Blanche",
      style: "cd",
      direction: "top",
      body: "#ffffff",
      flap: "#f3f4f6",
      seal: "#d4af37",
      text: "O",
    },
    {
      id: "m10",
      name: "Enveloppe Circulaire",
      style: "circle-pouch",
      direction: "top",
      body: "#e0cfa5",
      flap: "#e0cfa5",
      seal: "#8b1a2a",
      text: "C",
    },
    {
      id: "m11",
      name: "Ouverture en porte (Ivoire)",
      style: "gatefold",
      direction: "top",
      body: "#fdfbf7",
      flap: "#f4e9d2",
      seal: "#d4af37",
      text: "✦",
    },
    {
      id: "m12",
      name: "CD Vinyle Retro",
      style: "cd",
      direction: "left",
      body: "#0a0a0a",
      flap: "#1a1a1a",
      seal: "#ff3333",
      text: "V",
    },
    {
      id: "m13",
      name: "Pochette Disque Or",
      style: "cd",
      direction: "right",
      body: "#735817",
      flap: "#b89027",
      seal: "#111111",
      text: "G",
    },
  ];

  function applyEnvelopeModel(m: (typeof ENVELOPE_MODELS)[0]) {
    setEnvelopeStyle(m.style);
    setEnvelopeDirection(m.direction);
    setEnvelopeBody(m.body);
    setEnvelopeFlap(m.flap);
    setEnvelopeSeal(m.seal);
    setEnvelopeSealText(m.text);
    toast.success(`Modèle "${m.name}" appliqué !`);
  }

  // Personnalisation (police + couleurs) — appliquée à l'aperçu
  const [fontPairIndex, setFontPairIndex] = useState<number | "auto">("auto");
  const [titleFont, setTitleFont] = useState<"auto" | "script" | "display" | "serif" | "sans">(
    "auto",
  );
  const [accentColor, setAccentColor] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  const [ceremonyColor, setCeremonyColor] = useState<string>("");
  const [titleColor, setTitleColor] = useState<string>("");
  const [titleBold, setTitleBold] = useState<boolean>(false);
  const [subtitleColor, setSubtitleColor] = useState<string>("");
  const [subtitleBold, setSubtitleBold] = useState<boolean>(false);
  const [dateColor, setDateColor] = useState<string>("");
  const [dateBold, setDateBold] = useState<boolean>(false);
  const [allBold, setAllBold] = useState<boolean>(false);
  const [fontWeightTitle, setFontWeightTitle] = useState<number>(400);
  const [fontWeightSubtitle, setFontWeightSubtitle] = useState<number>(400);
  const [fontWeightDate, setFontWeightDate] = useState<number>(400);
  const [fontWeightAll, setFontWeightAll] = useState<number>(400);
  const [messageColor, setMessageColor] = useState<string>("");
  const [extraSectionColor, setExtraSectionColor] = useState<string>("");

  const [layoutOverride, setLayoutOverride] = useState<string>("auto");
  const [forceEnvelope, setForceEnvelope] = useState<boolean>(false);
  const [scrollAnimation, setScrollAnimation] = useState<
    "fade-blur" | "fade-slide" | "scale-up" | "none"
  >("fade-blur");
  const [lang, setLang] = useState<"fr" | "en" | "ar">("fr");
  const [giftList, setGiftList] = useState<
    { title: string; description: string; url: string; price: string; emoji: string }[]
  >([]);

  // Tailles de police
  const [fontSizeTitle, setFontSizeTitle] = useState<number | null>(null);
  const [fontSizeSubtitle, setFontSizeSubtitle] = useState<number | null>(null);
  const [fontSizeBody, setFontSizeBody] = useState<number | null>(null);
  const [fontSizeLabel, setFontSizeLabel] = useState<number | null>(null);
  const [fontSizeDate, setFontSizeDate] = useState<number | null>(null);
  const [fontSizeMessage, setFontSizeMessage] = useState<number | null>(null);
  const [fontSizeExtraSection, setFontSizeExtraSection] = useState<number | null>(null);
  const [fontSizeEnvelopeTitle, setFontSizeEnvelopeTitle] = useState<number | null>(null);
  const [fontSizeEnvelopeSeal, setFontSizeEnvelopeSeal] = useState<number | null>(null);

  // Textes personnalisables
  const [textInvitationPour, setTextInvitationPour] = useState<string>("");
  const [textCliquezSceau, setTextCliquezSceau] = useState<string>("");
  const [textNotreHistoire, setTextNotreHistoire] = useState<string>("");
  const [textLeDeroule, setTextLeDeroule] = useState<string>("");
  const [textLeLieu, setTextLeLieu] = useState<string>("");
  const [textGalerie, setTextGalerie] = useState<string>("");
  const [textInfosPratiques, setTextInfosPratiques] = useState<string>("");
  const [textPlusQue, setTextPlusQue] = useState<string>("");
  const [textSouvenirs, setTextSouvenirs] = useState<string>("");
  const [textBonASavoir, setTextBonASavoir] = useState<string>("");
  const [textRsvpTitre, setTextRsvpTitre] = useState<string>("");
  const [textRsvpSousTitre, setTextRsvpSousTitre] = useState<string>("");
  const [textDressCode, setTextDressCode] = useState<string>("");
  const [textCadeaux, setTextCadeaux] = useState<string>("");
  const [textHebergement, setTextHebergement] = useState<string>("");

  // --- Auto-save draft ---
  const DRAFT_KEY = `inviti-draft-${params.templateId}`;
  useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) {
      try {
        const d = JSON.parse(raw);
        if (d.ceremonyTitle) setCeremonyTitle(d.ceremonyTitle);
        if (d.title) setTitle(d.title);
        if (d.hostName) setHostName(d.hostName);
        if (d.eventDate) setEventDate(d.eventDate);
        if (d.location) setLocation(d.location);
        if (d.message) setMessage(d.message);
        if (d.storyText) setStoryText(d.storyText);
        if (d.dressCode) setDressCode(d.dressCode);
        if (d.giftInfo) setGiftInfo(d.giftInfo);
        if (d.accommodationInfo) setAccommodationInfo(d.accommodationInfo);
        if (d.ceremonyColor) setCeremonyColor(d.ceremonyColor);
        if (d.titleColor) setTitleColor(d.titleColor);
        if (d.subtitleColor) setSubtitleColor(d.subtitleColor);
        if (d.dateColor) setDateColor(d.dateColor);
        if (d.messageColor) setMessageColor(d.messageColor);
        if (d.extraSectionColor) setExtraSectionColor(d.extraSectionColor);
        if (d.textColor) setTextColor(d.textColor);
        if (d.bgColor) setBgColor(d.bgColor);
        if (d.accentColor) setAccentColor(d.accentColor);
        if (d.fontSizeTitle) setFontSizeTitle(d.fontSizeTitle);
        if (d.fontSizeSubtitle) setFontSizeSubtitle(d.fontSizeSubtitle);
        if (d.fontSizeBody) setFontSizeBody(d.fontSizeBody);
        if (d.fontSizeDate) setFontSizeDate(d.fontSizeDate);
        if (d.fontSizeMessage) setFontSizeMessage(d.fontSizeMessage);
        if (d.fontSizeLabel) setFontSizeLabel(d.fontSizeLabel);
        if (d.fontSizeExtraSection) setFontSizeExtraSection(d.fontSizeExtraSection);
        if (d.fontWeightTitle) setFontWeightTitle(d.fontWeightTitle);
        if (d.fontWeightSubtitle) setFontWeightSubtitle(d.fontWeightSubtitle);
        if (d.fontWeightDate) setFontWeightDate(d.fontWeightDate);
        if (d.fontWeightAll) setFontWeightAll(d.fontWeightAll);
        if (d.textRsvpTitre) setTextRsvpTitre(d.textRsvpTitre);
        if (d.textRsvpSousTitre) setTextRsvpSousTitre(d.textRsvpSousTitre);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          ceremonyTitle,
          title,
          hostName,
          eventDate,
          location,
          message,
          storyText,
          dressCode,
          giftInfo,
          accommodationInfo,
          ceremonyColor,
          titleColor,
          subtitleColor,
          dateColor,
          messageColor,
          extraSectionColor,
          textColor,
          bgColor,
          accentColor,
          fontSizeTitle,
          fontSizeSubtitle,
          fontSizeBody,
          fontSizeDate,
          fontSizeMessage,
          fontSizeLabel,
          fontSizeExtraSection,
          fontWeightTitle,
          fontWeightSubtitle,
          fontWeightDate,
          fontWeightAll,
          textRsvpTitre,
          textRsvpSousTitre,
        }),
      );
    }, 2000);
    return () => clearTimeout(id);
  }, [
    ceremonyTitle,
    title,
    hostName,
    eventDate,
    location,
    message,
    storyText,
    dressCode,
    giftInfo,
    accommodationInfo,
    ceremonyColor,
    titleColor,
    subtitleColor,
    dateColor,
    messageColor,
    extraSectionColor,
    textColor,
    bgColor,
    accentColor,
    fontSizeTitle,
    fontSizeSubtitle,
    fontSizeBody,
    fontSizeDate,
    fontSizeMessage,
    fontSizeLabel,
    fontSizeExtraSection,
    fontWeightTitle,
    fontWeightSubtitle,
    fontWeightDate,
    fontWeightAll,
    textRsvpTitre,
    textRsvpSousTitre,
    DRAFT_KEY,
  ]);

  const clearDraft = () => {
    if (window.confirm("Voulez-vous vraiment effacer votre brouillon et recommencer à zéro ?")) {
      localStorage.removeItem(DRAFT_KEY);
      window.location.reload();
    }
  };

  // Couleurs et style de l'enveloppe
  const [envelopeStyle, setEnvelopeStyle] = useState<string>("classic");
  const [envelopeDirection, setEnvelopeDirection] = useState<"top" | "left" | "right">("top");
  const [envelopeBody, setEnvelopeBody] = useState<string>("");
  const [envelopeFlap, setEnvelopeFlap] = useState<string>("");
  const [envelopeSeal, setEnvelopeSeal] = useState<string>("");
  const [envelopeSealText, setEnvelopeSealText] = useState<string>("");
  const [envelopeCardBg, setEnvelopeCardBg] = useState<string>("");

  const [inlineOverrides, setInlineOverrides] = useState<any>({});

  const themeOverrides: ThemeOverrides = {
    ...inlineOverrides,
    fontPairIndex: fontPairIndex === "auto" ? null : fontPairIndex,
    titleFont: titleFont === "auto" ? null : titleFont,
    accent: accentColor || null,
    bg: bgColor || null,
    text: textColor || null,
    textColor: textColor || null,
    titleColor: titleColor || null,
    titleBold: titleBold || null,
    subtitleColor: subtitleColor || null,
    subtitleBold: subtitleBold || null,
    dateColor: dateColor || null,
    dateBold: dateBold || null,
    allBold: allBold || null,
    messageColor: messageColor || null,
    extraSectionColor: extraSectionColor || null,
    ceremonyColor: ceremonyColor || null,
    fontWeightTitle: fontWeightTitle !== 400 ? fontWeightTitle : null,
    fontWeightSubtitle: fontWeightSubtitle !== 400 ? fontWeightSubtitle : null,
    fontWeightDate: fontWeightDate !== 400 ? fontWeightDate : null,
    fontWeightAll: fontWeightAll !== 400 ? fontWeightAll : null,
    layoutOverride: layoutOverride === "auto" ? null : layoutOverride,
    forceEnvelope: forceEnvelope || null,
    scrollAnimation: scrollAnimation,
    // Style et couleurs enveloppe
    envelopeStyle: envelopeStyle || null,
    envelopeDirection: envelopeDirection || null,
    envelopeBody: envelopeBody || null,
    envelopeFlap: envelopeFlap || null,
    envelopeSeal: envelopeSeal || null,
    envelopeSealText: envelopeSealText || null,
    envelopeCardBg: envelopeCardBg || null,
    // Textes personnalisables
    ceremonyTitle: ceremonyTitle || null,
    eventTitle: ceremonyTitle || null,
    textInvitationPour: textInvitationPour || null,
    textCliquezSceau: textCliquezSceau || null,
    textNotreHistoire: textNotreHistoire || null,
    textLeDeroule: textLeDeroule || null,
    textLeLieu: textLeLieu || null,
    textGalerie: textGalerie || null,
    textInfosPratiques: textInfosPratiques || null,
    textPlusQue: textPlusQue || null,
    textSouvenirs: textSouvenirs || null,
    textBonASavoir: textBonASavoir || null,
    textRsvpTitre: textRsvpTitre || null,
    textRsvpSousTitre: textRsvpSousTitre || null,
    textDressCode: textDressCode || null,
    textCadeaux: textCadeaux || null,
    textHebergement: textHebergement || null,
    // Tailles de police
    fontSizeTitle: fontSizeTitle,
    fontSizeSubtitle: fontSizeSubtitle,
    fontSizeBody: fontSizeBody,
    fontSizeLabel: fontSizeLabel,
    fontSizeDate: fontSizeDate,
    fontSizeMessage: fontSizeMessage,
    fontSizeExtraSection: fontSizeExtraSection || fontSizeLabel,
    fontSizeEnvelopeTitle: fontSizeEnvelopeTitle,
    fontSizeEnvelopeSeal: fontSizeEnvelopeSeal,
    // Nouveaux champs Séminaire
    seminaireVideoUrl: seminaireVideoUrl || null,
    seminaireSpeakers:
      seminaireSpeakers.filter((s) => s.name.trim() !== "").length > 0
        ? seminaireSpeakers.filter((s) => s.name.trim() !== "")
        : null,
    seminaireSponsorLogos: seminaireSponsorLogos.length > 0 ? seminaireSponsorLogos : null,
    // Multilingue et liste de cadeaux
    lang: lang,
    giftList:
      giftList.filter((g) => g.title.trim() !== "").length > 0
        ? giftList
            .filter((g) => g.title.trim() !== "")
            .map((g) => ({
              title: g.title,
              description: g.description || null,
              url: g.url || null,
              price: g.price || null,
              emoji: g.emoji || null,
            }))
        : null,
  };

  const isPolaroid = pickLayout(template.id) === "polaroid";

  // helper to resolve placeholders for program items
  const programPH = schema.programItemPlaceholder ?? {
    time: "15h00",
    title: "Étape",
    description: "",
  };

  const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const ALLOWED_AUDIO = [
    "audio/mpeg",
    "audio/mp3",
    "audio/ogg",
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",
    "audio/x-m4a",
  ];
  const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
  const EXT_BY_TYPE: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "audio/mpeg": "mp3",
    "audio/mp3": "mp3",
    "audio/ogg": "ogg",
    "audio/wav": "wav",
    "audio/x-wav": "wav",
    "audio/mp4": "m4a",
    "audio/x-m4a": "m4a",
  };

  function compressImageFile(file: File, maxWidth = 1200, quality = 0.75): Promise<string> {
    return new Promise((resolve) => {
      if (!file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => resolve("");
        reader.readAsDataURL(file);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  }

  function compressDataUrlIfNeeded(
    dataUrl: string | null | undefined,
    maxWidth = 1200,
    quality = 0.75,
  ): Promise<string | null> {
    if (!dataUrl) return Promise.resolve(null);
    if (!dataUrl.startsWith("data:image/")) return Promise.resolve(dataUrl);
    if (dataUrl.length < 400_000) return Promise.resolve(dataUrl); // Déjà sous 400 KB

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  }

  async function uploadFileToSupabase(file: File, isAudio = false): Promise<string | null> {
    const allowed = isAudio ? ALLOWED_AUDIO : ALLOWED_IMAGE;
    if (!allowed.includes(file.type)) {
      toast.error(isAudio ? "Format audio non supporté" : "Format image non supporté");
      return null;
    }
    if (file.size > MAX_BYTES) {
      toast.error(`Fichier trop volumineux (max ${Math.round(MAX_BYTES / 1024 / 1024)} Mo)`);
      return null;
    }
    if (isAudio && file.size > 2.5 * 1024 * 1024) {
      toast.error("La musique ne doit pas dépasser 2.5 Mo pour le serveur");
      return null;
    }
    try {
      const ext = EXT_BY_TYPE[file.type] ?? "bin";
      const rand = crypto.getRandomValues(new Uint8Array(6));
      const randStr = Array.from(rand, (b) => b.toString(16).padStart(2, "0")).join("");
      const path = `${Date.now()}-${randStr}.${ext}`;
      const { error } = await supabase.storage
        .from("event-media")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      const { data: pub } = supabase.storage.from("event-media").getPublicUrl(path);
      toast.success("Fichier ajouté");
      return pub.publicUrl;
    } catch (e) {
      console.warn("Échec upload Supabase, compression et sauvegarde locale:", e);
      // Fallback local compressé pour ne jamais dépasser la limite de 4.5 Mo de Vercel
      toast.success("Image optimisée et ajoutée");
      return await compressImageFile(file);
    }
  }

  async function handleUpload(
    file: File,
    kind: "cover" | "cover2" | "music" | "gallery" | "venue",
  ) {
    setUploading(kind);
    const url = await uploadFileToSupabase(file, kind === "music");
    setUploading(null);
    if (!url) return;
    if (kind === "cover") setCoverImageUrl(url);
    else if (kind === "cover2") setCoverImageUrl2(url);
    else if (kind === "music") setMusicUrl(url);
    else if (kind === "venue") setVenueImageUrl(url);
    else setGalleryUrls((g) => [...g, url]);
  }

  async function handleGalleryFiles(files: FileList) {
    for (const f of Array.from(files)) await handleUpload(f, "gallery");
  }

  function addProgramItem() {
    setProgram((p) => [...p, { time: "", title: "", description: "" }]);
  }
  function updateProgram(i: number, field: keyof ProgramItem, value: string) {
    setProgram((p) => p.map((x, idx) => (idx === i ? { ...x, [field]: value } : x)));
  }
  function removeProgram(i: number) {
    setProgram((p) => p.filter((_, idx) => idx !== i));
  }

  const handleThemeUpdate = (updates: any) => {
    const remaining = { ...updates };
    
    if (remaining.fontSizeTitle !== undefined) { setFontSizeTitle(remaining.fontSizeTitle); delete remaining.fontSizeTitle; }
    if (remaining.titleColor !== undefined) { setTitleColor(remaining.titleColor); delete remaining.titleColor; }
    if (remaining.fontSizeSubtitle !== undefined) { setFontSizeSubtitle(remaining.fontSizeSubtitle); delete remaining.fontSizeSubtitle; }
    if (remaining.subtitleColor !== undefined) { setSubtitleColor(remaining.subtitleColor); delete remaining.subtitleColor; }
    if (remaining.fontSizeDate !== undefined) { setFontSizeDate(remaining.fontSizeDate); delete remaining.fontSizeDate; }
    if (remaining.fontSizeBody !== undefined) { setFontSizeBody(remaining.fontSizeBody); delete remaining.fontSizeBody; }
    if (remaining.fontSizeLabel !== undefined) { setFontSizeLabel(remaining.fontSizeLabel); delete remaining.fontSizeLabel; }
    if (remaining.fontSizeMessage !== undefined) { setFontSizeMessage(remaining.fontSizeMessage); delete remaining.fontSizeMessage; }
    
    if (remaining.fontTitle !== undefined) { setTitleFont(remaining.fontTitle); delete remaining.fontTitle; }
    if (remaining.messageColor !== undefined) { setMessageColor(remaining.messageColor); delete remaining.messageColor; }
    if (remaining.textRsvpTitre !== undefined) { setTextRsvpTitre(remaining.textRsvpTitre); }
    if (remaining.textRsvpSousTitre !== undefined) { setTextRsvpSousTitre(remaining.textRsvpSousTitre); }

    if (Object.keys(remaining).length > 0) {
      setInlineOverrides((prev: any) => ({ ...prev, ...remaining }));
    }
  };

  const cleanProgram = program
    .filter((p) => p.time.trim() || p.title.trim() || p.description.trim())
    .map((p) => ({
      time: p.time.trim(),
      title: p.title.trim(),
      description: p.description.trim() || null,
    }));

  function safeIso(val: string | null | undefined): string | null {
    if (!val || !val.trim()) return null;
    try {
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d.toISOString();
    } catch {
      return null;
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !eventDate || !location) {
      toast.error("Titre, date et lieu sont requis");
      return;
    }
    setSubmitting(true);
    try {
      const parsedInvited =
        invitedCount && !isNaN(parseInt(invitedCount)) ? parseInt(invitedCount) : null;
      const parsedMaxGuests =
        maxGuestsPerRsvp && !isNaN(parseInt(maxGuestsPerRsvp))
          ? parseInt(maxGuestsPerRsvp)
          : null;

      // Optimiser et compresser toutes les images avant l'envoi pour respecter la limite de 4.5 Mo de Vercel
      const safeCoverImage = await compressDataUrlIfNeeded(coverImageUrl);
      const safeVenueImage = await compressDataUrlIfNeeded(venueImageUrl);
      const safeCoverImage2 = await compressDataUrlIfNeeded(coverImageUrl2);
      const safeGalleryUrls = await Promise.all(
        galleryUrls.map((u) => compressDataUrlIfNeeded(u).then((res) => res || u)),
      );

      const res = await create({
        data: {
          templateId: template.id,
          title: title.trim(),
          hostName: hostName.trim() || null,
          eventDate: safeIso(eventDate) || new Date().toISOString(),
          linkExpiresAt: safeIso(linkExpiresAt),
          location: location.trim(),
          mapLink: mapLink.trim() || null,
          venueImageUrl: safeVenueImage || null,
          message: [message, bibleVerse].filter(Boolean).join("\n\n").trim() || null,
          coverImageUrl: safeCoverImage || null,
          musicUrl: musicUrl || null,
          storyText: storyText.trim() || null,
          themeOverrides,
          program: cleanProgram,
          galleryUrls: safeCoverImage2 ? [safeCoverImage2, ...safeGalleryUrls] : safeGalleryUrls,
          dressCode: dressCode.trim() || null,
          giftInfo: giftInfo.trim() || null,
          accommodationInfo: accommodationInfo.trim() || null,
          invitedCount: parsedInvited,
          maxGuestsPerRsvp: parsedMaxGuests,
          rsvpDeadline: safeIso(rsvpDeadline),
          seminaireTheme: seminaireTheme.trim() || null,
          seminaireOrganisateur: seminaireOrganisateur.trim() || null,
          seminaireIntervenants: seminaireIntervenants.trim() || null,
          seminaireSponsors: seminaireSponsors.trim() || null,
          seminaireContact: seminaireContact.trim() || null,
        },
      });
      saveMyInvitation({
        slug: res.slug,
        adminToken: res.adminToken,
        title,
        templateId: template.id,
        eventDate: safeIso(eventDate),
        createdAt: new Date().toISOString(),
      });
      // Clear auto-saved draft on success
      localStorage.removeItem(DRAFT_KEY);
      navigate({ to: "/admin/$token", params: { token: res.adminToken } });
    } catch (err: any) {
      console.error("[Creation Error]", err);
      let msg = "Erreur lors de la création";
      if (typeof err === "string") {
        msg = err;
      } else if (err?.message) {
        msg = err.message;
      } else if (Array.isArray(err) && err[0]?.message) {
        msg = `${err[0].path?.join(".") || "Champ"}: ${err[0].message}`;
      } else if (err?.data?.message) {
        msg = err.data.message;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  /** Render a field by key, only if defined in the schema */
  function renderField(key: FieldKey) {
    const cfg = schema.fields[key];
    if (!cfg) return null;

    switch (key) {
      case "ceremonyTitle":
        return (
          <Field key={key} cfg={cfg}>
            <div className="space-y-2">
              <input
                value={ceremonyTitle}
                onChange={(e) => setCeremonyTitle(e.target.value)}
                placeholder={cfg.placeholder || "Ex : LE MARIAGE, LA DOTE, CÉRÉMONIE..."}
                className={inputCls}
              />
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {["LE MARIAGE", "LA DOTE", "CÉRÉMONIE", "NOTRE MARIAGE", "MARIAGE COUTUMIER"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setCeremonyTitle(ceremonyTitle === tag ? "" : tag)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      ceremonyTitle === tag
                        ? "bg-amber-600 text-white border-amber-600 font-semibold shadow-sm"
                        : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </Field>
        );
      case "title":
        return (
          <Field key={key} cfg={cfg}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={cfg.placeholder}
              className={inputCls}
              required={cfg.required}
            />
          </Field>
        );
      case "hostName":
        return (
          <Field key={key} cfg={cfg}>
            <input
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder={cfg.placeholder}
              className={inputCls}
            />
          </Field>
        );
      case "eventDate": {
        const dateLabel = getEventDateLabel(ceremonyTitle, cfg.label);
        return (
          <div key={key} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field cfg={{ ...cfg, label: dateLabel }}>
                <input
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEventDate(val);
                    if (val) {
                      try {
                        const d = new Date(val);
                        d.setDate(d.getDate() + 2);
                        const pad = (n: number) => n.toString().padStart(2, "0");
                        const twoDaysAfter = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                        setLinkExpiresAt(twoDaysAfter);
                      } catch {}
                    }
                  }}
                  className={inputCls}
                  required={cfg.required}
                />
              </Field>
              <Field
                cfg={{
                  label: "Date limite RSVP (clôture des réponses)",
                  helper: "Après cette date, le formulaire RSVP se fermera.",
                }}
              >
                <input
                  type="datetime-local"
                  value={rsvpDeadline}
                  max={eventDate || undefined}
                  onChange={(e) => setRsvpDeadline(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                cfg={{
                  label: "Expiration du lien (optionnel)",
                  helper: "Par défaut 2 jours après l'événement. Date à laquelle le lien d'invitation cessera d'être accessible.",
                }}
              >
                <input
                  type="datetime-local"
                  value={linkExpiresAt}
                  min={eventDate || undefined}
                  onChange={(e) => setLinkExpiresAt(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field
                cfg={{
                  label: "Nombre d'invitations (optionnel)",
                  helper:
                    "Le nombre total d'invitations envoyées (pour calculer le taux de participation).",
                }}
              >
                <input
                  type="number"
                  min={0}
                  value={invitedCount}
                  onChange={(e) => setInvitedCount(e.target.value)}
                  className={inputCls}
                  placeholder="Ex: 150"
                />
              </Field>
              <Field
                cfg={{
                  label: "Max personnes par RSVP (optionnel)",
                  helper:
                    "Limite le nombre maximal de personnes (accompagnants) qu'un invité peut déclarer.",
                }}
              >
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={maxGuestsPerRsvp}
                  onChange={(e) => setMaxGuestsPerRsvp(e.target.value)}
                  className={inputCls}
                  placeholder="Ex: 2 ou 5 (par défaut: 20)"
                />
              </Field>
            </div>
          </div>
        );
      }
      case "location":
        return (
          <div key={key} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field cfg={cfg}>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={cfg.placeholder}
                  className={inputCls}
                  required={cfg.required}
                />
              </Field>
              <Field
                cfg={{
                  label: "Photo du lieu (optionnel)",
                  helper: "Affichée à côté de la carte sur l'invitation.",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "venue")}
                  className="text-sm"
                />
                {uploading === "venue" && (
                  <p className="text-xs text-muted-foreground mt-1">Envoi…</p>
                )}
                {venueImageUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={venueImageUrl} alt="" className="w-16 h-16 rounded-md object-cover" />
                    <button
                      type="button"
                      onClick={() => setVenueImageUrl(null)}
                      className="text-xs text-destructive hover:underline"
                    >
                      Retirer
                    </button>
                  </div>
                )}
              </Field>
            </div>
            <Field
              cfg={{
                label: "Lien GPS / Google Maps (optionnel)",
                helper:
                  "Si vous avez un lien direct vers le lieu sur Google Maps, collez-le ici. Sinon, la carte utilisera automatiquement le nom du lieu.",
              }}
            >
              <input
                value={mapLink}
                onChange={(e) => setMapLink(e.target.value)}
                placeholder="https://maps.google.com/..."
                className={inputCls}
              />
            </Field>
          </div>
        );
      case "coverImageUrl":
        return (
          <div key={key} className="space-y-4">
            <Field
              cfg={
                isPolaroid
                  ? {
                      ...cfg,
                      label: "Photo 1 (Gauche)",
                      helper: "Première image (à gauche ou en haut selon le modèle).",
                    }
                  : cfg
              }
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "cover")}
                className="text-sm"
              />
              {uploading === "cover" && (
                <p className="text-xs text-muted-foreground mt-1">Envoi…</p>
              )}
              {coverImageUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={coverImageUrl} alt="" className="w-16 h-16 rounded-md object-cover" />
                  <button
                    type="button"
                    onClick={() => setCoverImageUrl(null)}
                    className="text-xs text-destructive hover:underline"
                  >
                    Retirer
                  </button>
                </div>
              )}
            </Field>
            {isPolaroid && (
              <Field
                cfg={{
                  label: "Photo 2 (Droite)",
                  helper: "Seconde image (à droite ou en bas selon le modèle).",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "cover2")}
                  className="text-sm"
                />
                {uploading === "cover2" && (
                  <p className="text-xs text-muted-foreground mt-1">Envoi…</p>
                )}
                {coverImageUrl2 && (
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={coverImageUrl2}
                      alt=""
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverImageUrl2(null)}
                      className="text-xs text-destructive hover:underline"
                    >
                      Retirer
                    </button>
                  </div>
                )}
              </Field>
            )}
          </div>
        );
      case "musicUrl":
        return (
          <Field key={key} cfg={cfg}>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "music")}
              className="text-sm"
            />
            {uploading === "music" && <p className="text-xs text-muted-foreground mt-1">Envoi…</p>}
            {musicUrl && <p className="text-xs text-green-700 mt-1">✓ Musique ajoutée</p>}
          </Field>
        );
      case "storyText":
        return (
          <Field key={key} cfg={cfg}>
            <textarea
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              rows={5}
              placeholder={cfg.placeholder}
              className={inputCls}
            />
          </Field>
        );
      case "message":
        return (
          <div key={key} className="space-y-3">
            <Field cfg={cfg}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder={cfg.placeholder}
                className={inputCls}
              />
            </Field>
            <Field
              cfg={{
                label: "Verset biblique (optionnel)",
                helper: "Ajoutez un verset biblique pour accompagner votre invitation.",
                placeholder: "« Car l'amour est fort comme la mort. » — Cantique des Cantiques 8:6",
              }}
            >
              <textarea
                value={bibleVerse}
                onChange={(e) => setBibleVerse(e.target.value)}
                rows={2}
                placeholder="« Car l'amour est fort comme la mort. » — Cantique des Cantiques 8:6"
                className={inputCls}
              />
            </Field>
          </div>
        );
      case "program":
        return (
          <Field key={key} cfg={cfg}>
            <div className="space-y-3">
              {program.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-background/50 p-3 space-y-2"
                >
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      value={item.time}
                      onChange={(e) => updateProgram(i, "time", e.target.value)}
                      placeholder={programPH.time}
                      className={inputCls}
                    />
                    <input
                      value={item.title}
                      onChange={(e) => updateProgram(i, "title", e.target.value)}
                      placeholder={programPH.title}
                      className={`${inputCls} col-span-2`}
                    />
                  </div>
                  <textarea
                    value={item.description}
                    onChange={(e) => updateProgram(i, "description", e.target.value)}
                    rows={2}
                    placeholder={programPH.description || "Description (optionnel)"}
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => removeProgram(i)}
                    className="text-xs text-destructive hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addProgramItem}
                className="w-full rounded-md border border-dashed border-accent text-primary py-2 text-sm hover:bg-accent/5"
              >
                + Ajouter une étape
              </button>
            </div>
          </Field>
        );
      case "galleryUrls":
        return (
          <Field key={key} cfg={cfg}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && handleGalleryFiles(e.target.files)}
              className="text-sm"
            />
            {uploading === "gallery" && (
              <p className="text-xs text-muted-foreground mt-1">Envoi…</p>
            )}
            {galleryUrls.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {galleryUrls.map((u, i) => (
                  <div key={u} className="relative group">
                    <img src={u} alt="" className="w-full aspect-square object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => setGalleryUrls((g) => g.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Field>
        );
      case "dressCode":
        return (
          <Field key={key} cfg={cfg}>
            <input
              value={dressCode}
              onChange={(e) => setDressCode(e.target.value)}
              placeholder={cfg.placeholder}
              className={inputCls}
            />
          </Field>
        );
      case "giftInfo":
        return (
          <Field key={key} cfg={cfg}>
            <textarea
              value={giftInfo}
              onChange={(e) => setGiftInfo(e.target.value)}
              rows={2}
              placeholder={cfg.placeholder}
              className={inputCls}
            />
          </Field>
        );
      case "accommodationInfo":
        return (
          <Field key={key} cfg={cfg}>
            <textarea
              value={accommodationInfo}
              onChange={(e) => setAccommodationInfo(e.target.value)}
              rows={2}
              placeholder={cfg.placeholder}
              className={inputCls}
            />
          </Field>
        );
      case "seminaireTheme":
        return (
          <Field key={key} cfg={cfg}>
            <input
              value={seminaireTheme}
              onChange={(e) => setSeminaireTheme(e.target.value)}
              placeholder={cfg.placeholder}
              className={inputCls}
              required={cfg.required}
            />
          </Field>
        );
      case "seminaireOrganisateur":
        return (
          <Field key={key} cfg={cfg}>
            <input
              value={seminaireOrganisateur}
              onChange={(e) => setSeminaireOrganisateur(e.target.value)}
              placeholder={cfg.placeholder}
              className={inputCls}
              required={cfg.required}
            />
          </Field>
        );
      case "seminaireIntervenants":
        return (
          <Field key={key} cfg={cfg}>
            <textarea
              value={seminaireIntervenants}
              onChange={(e) => setSeminaireIntervenants(e.target.value)}
              rows={2}
              placeholder={cfg.placeholder}
              className={inputCls}
            />
          </Field>
        );
      case "seminaireSponsors":
        return (
          <Field key={key} cfg={cfg}>
            <textarea
              value={seminaireSponsors}
              onChange={(e) => setSeminaireSponsors(e.target.value)}
              rows={2}
              placeholder={cfg.placeholder}
              className={inputCls}
            />
          </Field>
        );
      case "seminaireContact":
        return (
          <Field key={key} cfg={cfg}>
            <input
              value={seminaireContact}
              onChange={(e) => setSeminaireContact(e.target.value)}
              placeholder={cfg.placeholder}
              className={inputCls}
              required={cfg.required}
            />
          </Field>
        );
      case "seminaireVideoUrl":
        return (
          <Field key={key} cfg={cfg}>
            <input
              value={seminaireVideoUrl}
              onChange={(e) => setSeminaireVideoUrl(e.target.value)}
              placeholder={cfg.placeholder}
              className={inputCls}
            />
          </Field>
        );
      case "seminaireSpeakers":
        return (
          <Field key={key} cfg={cfg}>
            <div className="space-y-4">
              {seminaireSpeakers.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 p-4 border border-border rounded-lg relative bg-secondary/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      value={s.name}
                      onChange={(e) => {
                        const ns = [...seminaireSpeakers];
                        ns[i].name = e.target.value;
                        setSeminaireSpeakers(ns);
                      }}
                      placeholder="Nom de l'intervenant"
                      className={inputCls}
                    />
                    <input
                      value={s.role}
                      onChange={(e) => {
                        const ns = [...seminaireSpeakers];
                        ns[i].role = e.target.value;
                        setSeminaireSpeakers(ns);
                      }}
                      placeholder="Poste / Rôle"
                      className={inputCls}
                    />
                    <input
                      value={s.company}
                      onChange={(e) => {
                        const ns = [...seminaireSpeakers];
                        ns[i].company = e.target.value;
                        setSeminaireSpeakers(ns);
                      }}
                      placeholder="Entreprise"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {s.photoUrl ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border">
                        <img src={s.photoUrl} className="object-cover w-full h-full" alt={s.name} />
                        <button
                          type="button"
                          onClick={() => {
                            const ns = [...seminaireSpeakers];
                            ns[i].photoUrl = "";
                            setSeminaireSpeakers(ns);
                          }}
                          className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-xs font-bold hover:bg-black/70"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <label className="text-xs bg-white text-primary border border-border rounded px-3 py-1.5 cursor-pointer hover:bg-secondary/50 transition inline-block">
                        {uploading === `speaker_${i}` ? "Envoi..." : "📸 Ajouter photo"}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg, image/png, image/webp"
                          onChange={async (e) => {
                            if (!e.target.files?.[0]) return;
                            setUploading(`speaker_${i}`);
                            const url = await uploadFileToSupabase(e.target.files[0], false);
                            setUploading(null);
                            if (url) {
                              const ns = [...seminaireSpeakers];
                              ns[i].photoUrl = url;
                              setSeminaireSpeakers(ns);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                  {seminaireSpeakers.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setSeminaireSpeakers(seminaireSpeakers.filter((_, idx) => idx !== i))
                      }
                      className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 text-xs p-1"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setSeminaireSpeakers([
                    ...seminaireSpeakers,
                    { name: "", role: "", company: "", photoUrl: "" },
                  ])
                }
                className="text-xs font-medium text-accent hover:underline"
              >
                + Ajouter un intervenant
              </button>
            </div>
          </Field>
        );
      case "seminaireSponsorLogos":
        return (
          <Field key={key} cfg={cfg}>
            <div className="space-y-4">
              <label className="inline-flex items-center gap-2 cursor-pointer border border-border bg-white text-sm font-medium rounded-md px-4 py-2 hover:bg-secondary/50">
                <span>
                  {uploading === "sponsors" ? "Envoi en cours..." : "📸 Sélectionner des logos"}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg, image/png, image/webp, image/svg+xml"
                  className="hidden"
                  onChange={async (e) => {
                    if (!e.target.files?.length) return;
                    setUploading("sponsors");
                    const newUrls: string[] = [];
                    for (const f of Array.from(e.target.files)) {
                      const u = await uploadFileToSupabase(f, false);
                      if (u) newUrls.push(u);
                    }
                    setSeminaireSponsorLogos((prev) => [...prev, ...newUrls]);
                    setUploading(null);
                  }}
                />
              </label>
              {seminaireSponsorLogos.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3 p-4 bg-secondary/10 rounded-lg border border-border">
                  {seminaireSponsorLogos.map((url, i) => (
                    <div
                      key={i}
                      className="relative group w-24 h-24 rounded border border-border bg-white flex items-center justify-center overflow-hidden shadow-sm"
                    >
                      <img
                        src={url}
                        className="max-w-[80%] max-h-[80%] object-contain"
                        alt="sponsor"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSeminaireSponsorLogos(
                            seminaireSponsorLogos.filter((_, idx) => idx !== i),
                          )
                        }
                        className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Field>
        );
    }
  }

  /** Lay out date + location side-by-side when both appear consecutively */
  function renderSection(s: (typeof schema.sections)[number], idx: number) {
    let sectionTitle = s.title;
    if (idx === 0 && ceremonyTitle?.trim()) {
      const upper = ceremonyTitle.trim().toUpperCase();
      if (upper === "LA DOTE" || upper === "DOTE") {
        sectionTitle = "Les mariés & la dote";
      } else if (upper === "MARIAGE COUTUMIER" || upper === "LE MARIAGE COUTUMIER") {
        sectionTitle = "Les mariés & le mariage coutumier";
      } else if (upper.includes("DOTE")) {
        sectionTitle = "Les mariés & la dote";
      }
    }
    const items: React.ReactNode[] = s.fields.map((k) => renderField(k));
    return (
      <Section key={idx} title={sectionTitle} defaultOpen={!!s.defaultOpen}>
        {items}
      </Section>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster richColors position="top-center" />
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-7xl px-4 py-10 grid lg:grid-cols-2 gap-10 w-full">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Link to="/templates" className="text-sm text-muted-foreground hover:text-primary">
              ← Changer de modèle
            </Link>
            <p className="text-xs uppercase tracking-widest text-accent mt-2">{template.name}</p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <h1 className="font-display text-3xl text-primary">{schema.pageTitle}</h1>
              {title && (
                <div className="flex items-center gap-3">
                  <span className="text-xs rounded-full bg-green-100 text-green-700 px-2.5 py-1 font-medium">
                    💾 Brouillon auto-sauvegardé
                  </span>
                  <button
                    type="button"
                    onClick={clearDraft}
                    className="text-xs text-muted-foreground hover:text-destructive underline"
                  >
                    Effacer le brouillon
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{schema.pageSubtitle}</p>
          </div>

          {schema.sections.map((s, idx) => renderSection(s, idx))}

          <Section title="Personnalisation (police & couleurs)" defaultOpen={false}>
            <Field
              cfg={{
                label: "Police générale",
                helper: "Choisissez une combinaison de polices pour l'ensemble de l'invitation.",
              }}
            >
              <select
                value={String(fontPairIndex)}
                onChange={(e) =>
                  setFontPairIndex(e.target.value === "auto" ? "auto" : Number(e.target.value))
                }
                className={inputCls}
              >
                <option value="auto">Automatique (selon le modèle)</option>
                {FONT_PAIR_OPTIONS.map((o) => (
                  <option key={o.index} value={o.index} style={{ fontFamily: o.display }}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              cfg={{
                label: "Police des noms",
                helper:
                  "Choisissez une police lisible pour les noms des mariés. Par défaut, le modèle décide.",
              }}
            >
              <select
                value={titleFont}
                onChange={(e) => setTitleFont(e.target.value as any)}
                className={inputCls}
              >
                {TITLE_FONT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              cfg={{
                label: "Structure visuelle (Layout)",
                helper: "Remplacez la structure par défaut par celle d'un autre design (0 à 299).",
              }}
            >
              <select
                value={layoutOverride}
                onChange={(e) => setLayoutOverride(e.target.value)}
                className={inputCls}
              >
                <option value="auto">Automatique (selon le modèle)</option>
                {Array.from({ length: 300 }).map((_, i) => (
                  <option key={i} value={String(i)}>
                    Design {i + 1}
                  </option>
                ))}
              </select>
            </Field>

            {/* Couleurs de base de la page */}
            <div className="pt-2 border-t border-border/40">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                <span>🎨</span> Couleurs globales de la page
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <ColorField
                  label="Fond de la page"
                  value={bgColor}
                  onChange={setBgColor}
                  defaultColor="#faf9f5"
                />
                <ColorField
                  label="Couleur d'accent"
                  value={accentColor}
                  onChange={setAccentColor}
                  defaultColor="#a8623a"
                />
                <ColorField
                  label="Texte courant"
                  value={textColor}
                  onChange={setTextColor}
                  defaultColor="#1f2937"
                />
              </div>
            </div>

            {/* Titre de l'événement */}
            <div className="pt-3 border-t border-border/40 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <span>🏷️</span> Titre de l'événement (ex: LE MARIAGE, LA DOTE...)
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <ColorField
                  label="Couleur du titre événement"
                  value={ceremonyColor}
                  onChange={setCeremonyColor}
                  defaultColor="#8c8270"
                />
              </div>
              <FontSizeField
                label="Taille de police (événement)"
                value={fontSizeLabel}
                onChange={setFontSizeLabel}
                min={9}
                max={36}
                defaultVal={13}
              />
            </div>

            {/* Titre principal */}
            <div className="pt-3 border-t border-border/40 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <span>👑</span> Titre principal & Noms
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <ColorField
                  label="Couleur du titre"
                  value={titleColor}
                  onChange={setTitleColor}
                  defaultColor="#1f2937"
                />
              </div>
              <FontSizeField
                label="Taille de police du titre"
                value={fontSizeTitle}
                onChange={setFontSizeTitle}
                min={16}
                max={80}
                defaultVal={36}
              />
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Graisse du titre</span>
                  <span className="font-medium text-foreground">{fontWeightTitle}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={900}
                  step={100}
                  value={fontWeightTitle}
                  onChange={(e) => setFontWeightTitle(Number(e.target.value))}
                  onInput={(e) => setFontWeightTitle(Number((e.target as HTMLInputElement).value))}
                  className="w-full accent-primary h-2 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground/60">
                  <span>Fin (100)</span>
                  <span>Normal (400)</span>
                  <span>Gras (700)</span>
                  <span>Extra-gras (900)</span>
                </div>
              </div>
            </div>

            {/* Sous-titres & Parents */}
            <div className="pt-3 border-t border-border/40 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <span>🕊️</span> Sous-titres & Noms des parents
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <ColorField
                  label="Couleur du sous-titre"
                  value={subtitleColor}
                  onChange={setSubtitleColor}
                  defaultColor="#6b7280"
                />
              </div>
              <FontSizeField
                label="Taille de police (sous-titre)"
                value={fontSizeSubtitle}
                onChange={setFontSizeSubtitle}
                min={10}
                max={36}
                defaultVal={14}
              />
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Graisse des sous-titres</span>
                  <span className="font-medium text-foreground">{fontWeightSubtitle}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={900}
                  step={100}
                  value={fontWeightSubtitle}
                  onChange={(e) => setFontWeightSubtitle(Number(e.target.value))}
                  onInput={(e) => setFontWeightSubtitle(Number((e.target as HTMLInputElement).value))}
                  className="w-full accent-primary h-2 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Dates & Horaires */}
            <div className="pt-3 border-t border-border/40 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <span>📅</span> Dates & Horaires
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <ColorField
                  label="Couleur de la date"
                  value={dateColor}
                  onChange={setDateColor}
                  defaultColor="#4b5563"
                />
              </div>
              <FontSizeField
                label="Taille de police (date)"
                value={fontSizeDate}
                onChange={setFontSizeDate}
                min={10}
                max={36}
                defaultVal={15}
              />
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Graisse des dates</span>
                  <span className="font-medium text-foreground">{fontWeightDate}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={900}
                  step={100}
                  value={fontWeightDate}
                  onChange={(e) => setFontWeightDate(Number(e.target.value))}
                  onInput={(e) => setFontWeightDate(Number((e.target as HTMLInputElement).value))}
                  className="w-full accent-primary h-2 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Message & Verset */}
            <div className="pt-3 border-t border-border/40 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <span>📜</span> Message principal / Citation / Verset
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <ColorField
                  label="Couleur du message"
                  value={messageColor}
                  onChange={setMessageColor}
                  defaultColor="#374151"
                />
              </div>
              <FontSizeField
                label="Taille de police (message)"
                value={fontSizeMessage}
                onChange={setFontSizeMessage}
                min={10}
                max={36}
                defaultVal={14}
              />
            </div>

            {/* Sections Annexes (Programme, RSVP, etc.) */}
            <div className="pt-3 border-t border-border/40 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <span>📑</span> Titres des sections annexes (Programme, Lieu, Galerie, RSVP...)
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <ColorField
                  label="Couleur des titres de sections"
                  value={extraSectionColor}
                  onChange={setExtraSectionColor}
                  defaultColor="#a8623a"
                />
              </div>
              <FontSizeField
                label="Taille de police (titres de sections)"
                value={fontSizeExtraSection}
                onChange={setFontSizeExtraSection}
                min={16}
                max={54}
                defaultVal={30}
              />
            </div>

            {/* Corps de texte général */}
            <div className="pt-3 border-t border-border/40 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <span>📖</span> Corps de texte général (Descriptions, détails de la page)
              </p>
              <FontSizeField
                label="Taille de police du corps de texte"
                value={fontSizeBody}
                onChange={setFontSizeBody}
                min={10}
                max={28}
                defaultVal={14}
              />
            </div>

            {/* Style global */}
            <div className="pt-3 border-t border-border/40 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <span>⚖️</span> Graisse globale (Toute la page)
              </p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Graisse de tous les textes</span>
                  <span className="font-medium text-foreground">{fontWeightAll}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={900}
                  step={100}
                  value={fontWeightAll}
                  onChange={(e) => setFontWeightAll(Number(e.target.value))}
                  onInput={(e) => setFontWeightAll(Number((e.target as HTMLInputElement).value))}
                  className="w-full accent-primary h-2 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground/60">
                  <span>Fin (100)</span>
                  <span>Normal (400)</span>
                  <span>Semi-gras (600)</span>
                  <span>Extra-gras (900)</span>
                </div>
              </div>
            </div>
          </Section>

          <Section title="🎬 Expérience Animée & Enveloppe" defaultOpen={false}>
            <Field
              cfg={{
                label: "Activer l'enveloppe virtuelle",
                helper:
                  "Force l'affichage de l'enveloppe animée avant de découvrir l'invitation, même si le modèle ne l'a pas par défaut.",
              }}
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={forceEnvelope}
                  onChange={(e) => setForceEnvelope(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm font-medium">Oui, afficher l'enveloppe</span>
              </label>
            </Field>

            <Field
              cfg={{
                label: "🎶 Musique de fond (MP3)",
                helper: "Ajoutez une musique qui se lancera à l'ouverture de l'invitation.",
              }}
            >
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "music")}
                className="text-sm"
              />
              {uploading === "music" && (
                <p className="text-xs text-muted-foreground mt-1">Envoi en cours…</p>
              )}
              {musicUrl && (
                <div className="mt-2 flex items-center gap-3">
                  <p className="text-xs font-medium text-green-700">✓ Musique ajoutée</p>
                  <button
                    type="button"
                    onClick={() => setMusicUrl(null)}
                    className="text-xs text-destructive hover:underline"
                  >
                    Retirer
                  </button>
                </div>
              )}
            </Field>

            <Field
              cfg={{
                label: "Animations au défilement (Scroll)",
                helper:
                  "Choisissez le style d'animation des éléments lorsque les invités descendent sur la page.",
              }}
            >
              <select
                value={scrollAnimation}
                onChange={(e) => setScrollAnimation(e.target.value as any)}
                className={inputCls}
              >
                <option value="fade-blur">Haute Couture (Flou + Apparition douce)</option>
                <option value="fade-slide">Classique (Glissement vers le haut)</option>
                <option value="scale-up">Dynamique (Zoom léger)</option>
                <option value="none">Aucune (Affichage direct)</option>
              </select>
            </Field>

            {/* --- ENVELOPPE --- */}
            <Section title="Design de l'enveloppe" defaultOpen={false}>
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Modèles prédéfinis</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {ENVELOPE_MODELS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => applyEnvelopeModel(m)}
                      className="flex flex-col items-center justify-center p-2 border border-border rounded-lg hover:bg-secondary/50 transition bg-white shadow-sm group"
                    >
                      <div
                        className={`w-12 h-10 relative mb-2 shadow-sm border border-black/10 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 ${m.style === "circle-pouch" || m.style === "cd" ? "rounded-full" : "rounded"}`}
                        style={{ background: m.body }}
                      >
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          }}
                        />
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          {m.style === "circle-pouch" || m.style === "cd" ? (
                            <path
                              d={FLAP_PATHS[m.style] || FLAP_PATHS.classic}
                              fill={m.flap}
                              stroke="rgba(0,0,0,0.1)"
                              strokeWidth="0.5"
                            />
                          ) : (
                            <g
                              style={{
                                transformOrigin:
                                  m.direction === "left"
                                    ? "0 50%"
                                    : m.direction === "right"
                                      ? "100% 50%"
                                      : "50% 0",
                                transform:
                                  m.direction === "left"
                                    ? "rotate(-90deg) scale(0.6)"
                                    : m.direction === "right"
                                      ? "rotate(90deg) scale(0.6)"
                                      : "scale(1, 0.6)",
                              }}
                            >
                              <path
                                d={FLAP_PATHS[m.style] || FLAP_PATHS.classic}
                                fill={m.flap}
                                stroke="rgba(0,0,0,0.1)"
                                strokeWidth="0.5"
                              />
                            </g>
                          )}
                        </svg>

                        <div
                          className={`absolute z-10 w-3 h-3 rounded-full shadow-md flex items-center justify-center text-[5px] font-bold text-white
                          ${m.direction === "top" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""}
                          ${m.direction === "left" ? "top-1/2 left-[40%] -translate-y-1/2" : ""}
                          ${m.direction === "right" ? "top-1/2 right-[40%] -translate-y-1/2" : ""}
                        `}
                          style={{ background: m.seal }}
                        >
                          {m.text.slice(0, 1)}
                        </div>
                      </div>
                      <span className="text-[10px] text-center font-medium leading-tight">
                        {m.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Personnalisation manuelle
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Field
                    cfg={{
                      label: "Sens d'ouverture",
                      helper: "L'enveloppe peut s'ouvrir par le haut ou sur le côté.",
                    }}
                  >
                    <select
                      value={envelopeDirection}
                      onChange={(e) => setEnvelopeDirection(e.target.value as any)}
                      className={inputCls}
                    >
                      <option value="top">Ouverture par le haut (Classique)</option>
                      <option value="left">Ouverture latérale (Pochette gauche)</option>
                      <option value="right">Ouverture latérale (Pochette droite)</option>
                    </select>
                  </Field>

                  <Field
                    cfg={{
                      label: "Forme du rabat",
                      helper: "Affinez la forme de la découpe si vous le souhaitez.",
                    }}
                  >
                    <select
                      value={envelopeStyle}
                      onChange={(e) => setEnvelopeStyle(e.target.value)}
                      className={inputCls}
                    >
                      <option value="classic">Classique (Triangle Standard)</option>
                      <option value="deep-v">Plongeant profond (Deep V)</option>
                      <option value="scalloped">Festonné (Bords dentelés romantiques)</option>
                      <option value="rounded">Arrondi (Courbe douce)</option>
                      <option value="square">Carré strict (Moderne)</option>
                      <option value="tapered-square">Carré biseauté (Élégant)</option>
                      <option value="asymmetric-right">Asymétrique (Pointe à droite)</option>
                      <option value="asymmetric-left">Asymétrique (Pointe à gauche)</option>
                      <option value="gothic-arch">Arche Gothique (Pointu courbé)</option>
                      <option value="vintage-point">Pointe Vintage (Étroite)</option>
                      <option value="double-scallop">Double Feston (Style royal)</option>
                      <option value="wavy">Ondulé (Vagues fluides)</option>
                      <option value="deckle">Bord Déchiré (Effet artisanal)</option>
                      <option value="ribbon">Coupe Ruban (Fente centrale)</option>
                      <option value="convex">Bombé (Courbe inversée)</option>
                      <option value="scallop-triangle">Triangle Festonné</option>
                      <option value="s-curve">Courbe en S (Art Nouveau)</option>
                      <option value="diamond">Pointe de Diamant</option>
                      <option value="baroque">Ornement Baroque (Très luxueux)</option>
                      <option value="minimalist">Micro-rabat Minimaliste</option>
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <ColorField
                    label="Corps de l'enveloppe"
                    value={envelopeBody}
                    onChange={setEnvelopeBody}
                  />
                  <ColorField
                    label="Rabat de l'enveloppe"
                    value={envelopeFlap}
                    onChange={setEnvelopeFlap}
                  />
                  <ColorField
                    label="Sceau en cire 3D"
                    value={envelopeSeal}
                    onChange={setEnvelopeSeal}
                  />
                  <ColorField
                    label="Fond de la carte"
                    value={envelopeCardBg}
                    onChange={setEnvelopeCardBg}
                  />
                </div>
              </div>
            </Section>

            <Field
              cfg={{
                label: "Texte du sceau",
                helper: "Le texte affiché sur le sceau de cire (ex: M&V, vos initiales, ✦).",
              }}
            >
              <input
                value={envelopeSealText}
                onChange={(e) => setEnvelopeSealText(e.target.value)}
                placeholder="✦"
                maxLength={20}
                className={inputCls}
              />
            </Field>
          </Section>

          <Section title="🌍 Langue de l'invitation" defaultOpen={false}>
            <Field
              cfg={{
                label: "Langue affichée aux invités",
                helper:
                  "Tous les textes de boutons et étiquettes s'adapteront à la langue choisie.",
              }}
            >
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className={inputCls}
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
                <option value="ar">🇲🇦 العربية (Arabe)</option>
              </select>
            </Field>
          </Section>

          <Section title="🎁 Liste de cadeaux" defaultOpen={false}>
            <p className="text-xs text-muted-foreground mb-3">
              Ajoutez des idées de cadeaux qui s'afficheront en section élégante sur votre
              invitation.
            </p>
            {giftList.map((item, i) => (
              <div
                key={i}
                className="border border-border/50 rounded-xl p-3 mb-3 space-y-2 bg-secondary/30"
              >
                <div className="flex gap-2">
                  <input
                    value={item.emoji}
                    onChange={(e) => {
                      const g = [...giftList];
                      g[i].emoji = e.target.value;
                      setGiftList(g);
                    }}
                    placeholder="🎁"
                    maxLength={4}
                    className={`${inputCls} w-16 text-center`}
                  />
                  <input
                    value={item.title}
                    onChange={(e) => {
                      const g = [...giftList];
                      g[i].title = e.target.value;
                      setGiftList(g);
                    }}
                    placeholder="Nom du cadeau *"
                    className={`${inputCls} flex-1`}
                  />
                </div>
                <input
                  value={item.description}
                  onChange={(e) => {
                    const g = [...giftList];
                    g[i].description = e.target.value;
                    setGiftList(g);
                  }}
                  placeholder="Description (optionnel)"
                  className={inputCls}
                />
                <div className="flex gap-2">
                  <input
                    value={item.price}
                    onChange={(e) => {
                      const g = [...giftList];
                      g[i].price = e.target.value;
                      setGiftList(g);
                    }}
                    placeholder="Prix (ex: 50€)"
                    className={`${inputCls} w-28`}
                  />
                  <input
                    value={item.url}
                    onChange={(e) => {
                      const g = [...giftList];
                      g[i].url = e.target.value;
                      setGiftList(g);
                    }}
                    placeholder="Lien (optionnel)"
                    className={`${inputCls} flex-1`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setGiftList(giftList.filter((_, j) => j !== i))}
                  className="text-xs text-destructive hover:underline"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setGiftList([
                  ...giftList,
                  { title: "", description: "", url: "", price: "", emoji: "🎁" },
                ])
              }
              className="w-full rounded-xl border border-dashed border-border/60 py-2 text-sm text-muted-foreground hover:border-accent/60 hover:text-accent transition"
            >
              + Ajouter un cadeau
            </button>
          </Section>

          <Section title="📏 Tailles de police" defaultOpen={false}>
            <p className="text-xs text-muted-foreground mb-2">
              Ajustez les tailles de police de chaque élément de votre invitation.
            </p>
            <FontSizeField
              label="Titre principal (noms)"
              value={fontSizeTitle}
              onChange={setFontSizeTitle}
              min={16}
              max={120}
              defaultVal={48}
            />
            <FontSizeField
              label="Sous-titres de section"
              value={fontSizeSubtitle}
              onChange={setFontSizeSubtitle}
              min={14}
              max={80}
              defaultVal={30}
            />
            <FontSizeField
              label="Texte général / Story"
              value={fontSizeBody}
              onChange={setFontSizeBody}
              min={10}
              max={40}
              defaultVal={18}
            />
            <FontSizeField
              label="Petits labels (tracking)"
              value={fontSizeLabel}
              onChange={setFontSizeLabel}
              min={8}
              max={24}
              defaultVal={12}
            />
            <FontSizeField
              label="Dates & horaires"
              value={fontSizeDate}
              onChange={setFontSizeDate}
              min={10}
              max={60}
              defaultVal={18}
            />
            <FontSizeField
              label="Message / Citation"
              value={fontSizeMessage}
              onChange={setFontSizeMessage}
              min={8}
              max={40}
              defaultVal={14}
            />
            <FontSizeField
              label="Titre dans l'enveloppe"
              value={fontSizeEnvelopeTitle}
              onChange={setFontSizeEnvelopeTitle}
              min={12}
              max={60}
              defaultVal={28}
            />
            <FontSizeField
              label="Texte du sceau"
              value={fontSizeEnvelopeSeal}
              onChange={setFontSizeEnvelopeSeal}
              min={12}
              max={60}
              defaultVal={24}
            />
          </Section>

          <Section title="✏️ Textes personnalisables" defaultOpen={false}>
            <p className="text-xs text-muted-foreground mb-2">
              Modifiez les textes décoratifs de votre invitation. Laissez vide pour garder le texte
              par défaut.
            </p>

            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-1">
              Enveloppe
            </p>
            <TextOverrideField
              label="Texte d'accueil"
              value={textInvitationPour}
              onChange={setTextInvitationPour}
              placeholder="Une invitation pour"
            />
            <TextOverrideField
              label="Bouton d'ouverture"
              value={textCliquezSceau}
              onChange={setTextCliquezSceau}
              placeholder="✦ Cliquez sur le sceau pour ouvrir ✦"
            />

            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-3">
              Sections de la page
            </p>
            <TextOverrideField
              label="Compte à rebours"
              value={textPlusQue}
              onChange={setTextPlusQue}
              placeholder="Plus que"
            />
            <TextOverrideField
              label="Notre histoire"
              value={textNotreHistoire}
              onChange={setTextNotreHistoire}
              placeholder="Notre histoire"
            />
            <TextOverrideField
              label="Programme / Déroulé"
              value={textLeDeroule}
              onChange={setTextLeDeroule}
              placeholder="Le déroulé"
            />
            <TextOverrideField
              label="Lieu"
              value={textLeLieu}
              onChange={setTextLeLieu}
              placeholder="Le lieu"
            />
            <TextOverrideField
              label="Label galerie"
              value={textSouvenirs}
              onChange={setTextSouvenirs}
              placeholder="Souvenirs"
            />
            <TextOverrideField
              label="Titre galerie"
              value={textGalerie}
              onChange={setTextGalerie}
              placeholder="Galerie"
            />
            <TextOverrideField
              label="Label infos"
              value={textBonASavoir}
              onChange={setTextBonASavoir}
              placeholder="Bon à savoir"
            />
            <TextOverrideField
              label="Titre infos pratiques"
              value={textInfosPratiques}
              onChange={setTextInfosPratiques}
              placeholder="Infos pratiques"
            />
            <TextOverrideField
              label="Dress code"
              value={textDressCode}
              onChange={setTextDressCode}
              placeholder="Dress code"
            />
            <TextOverrideField
              label="Cadeaux"
              value={textCadeaux}
              onChange={setTextCadeaux}
              placeholder="Cadeaux"
            />
            <TextOverrideField
              label="Hébergement"
              value={textHebergement}
              onChange={setTextHebergement}
              placeholder="Hébergement"
            />

            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-3">
              Formulaire RSVP
            </p>
            <TextOverrideField
              label="Titre RSVP (ex : Confirmer ma présence)"
              value={textRsvpTitre}
              onChange={setTextRsvpTitre}
              placeholder="Confirmer ma présence"
            />
            <TextOverrideField
              label="Sous-titre / Message descriptif RSVP"
              value={textRsvpSousTitre}
              onChange={setTextRsvpSousTitre}
              placeholder="Ceci est un aperçu du formulaire RSVP. Les invités pourront confirmer leur présence ici."
            />
          </Section>

          {/* Bouton réinitialiser tout */}
          <button
            type="button"
            onClick={() => {
              setFontPairIndex("auto");
              setTitleFont("auto");
              setAccentColor("");
              setBgColor("");
              setTextColor("");
              setTitleColor("");
              setTitleBold(false);
              setSubtitleColor("");
              setSubtitleBold(false);
              setDateBold(false);
              setAllBold(false);
              setFontWeightTitle(400);
              setFontWeightSubtitle(400);
              setFontWeightDate(400);
              setFontWeightAll(400);
              setEnvelopeStyle("classic");
              setEnvelopeDirection("top");
              setEnvelopeBody("");
              setEnvelopeFlap("");
              setEnvelopeSeal("");
              setEnvelopeSealText("");
              setEnvelopeCardBg("");
              // Tailles
              setFontSizeTitle(null);
              setFontSizeSubtitle(null);
              setFontSizeBody(null);
              setFontSizeLabel(null);
              setFontSizeDate(null);
              setFontSizeMessage(null);
              setFontSizeEnvelopeTitle(null);
              setFontSizeEnvelopeSeal(null);
              setInlineOverrides({});
              // Textes
              setTextInvitationPour("");
              setTextCliquezSceau("");
              setTextNotreHistoire("");
              setTextLeDeroule("");
              setTextLeLieu("");
              setTextGalerie("");
              setTextInfosPratiques("");
              setTextPlusQue("");
              setTextSouvenirs("");
              setTextBonASavoir("");
              setTextRsvpTitre("");
              setTextRsvpSousTitre("");
              setTextDressCode("");
              setTextCadeaux("");
              setTextHebergement("");
            }}
            className="text-xs text-muted-foreground hover:text-primary underline"
          >
            🔄 Réinitialiser toute la personnalisation
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-primary py-3 text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition"
          >
            {submitting ? "Création…" : schema.submitLabel}
          </button>
        </form>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="card">Carte d'invitation</TabsTrigger>
              <TabsTrigger value="envelope">Enveloppe</TabsTrigger>
            </TabsList>
            
            <TabsContent value="envelope" className="space-y-4">
              {/* Aperçu de l'enveloppe */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Aperçu de l'enveloppe
                  </p>
                  {showEnvelopePreview && (
                    <button
                      onClick={() => setShowEnvelopePreview(false)}
                      className="text-[10px] text-muted-foreground hover:text-foreground underline"
                    >
                      Fermer l'animation
                    </button>
                  )}
                </div>

                {showEnvelopePreview ? (
                  <div
                    className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-border/40"
                    style={{ minHeight: 350 }}
                  >
                    <EnvelopeIntro
                      template={template}
                      hostName={hostName || null}
                      title={title || template.name}
                      onOpen={() => setPreviewEnvelopeOpening(true)}
                      opening={previewEnvelopeOpening}
                      themeOverrides={themeOverrides}
                      previewMode={true}
                    />

                    {previewEnvelopeOpening && (
                      <button
                        type="button"
                        onClick={() => setPreviewEnvelopeOpening(false)}
                        className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/60 text-white text-[10px] px-3 py-1.5 rounded-full backdrop-blur-sm transition"
                      >
                        Rejouer l'animation
                      </button>
                    )}
                  </div>
                ) : (
                  <div
                    className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-border/40 overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/40 transition group"
                    style={{ minHeight: 220 }}
                    onClick={() => {
                      setShowEnvelopePreview(true);
                      setPreviewEnvelopeOpening(false);
                    }}
                  >
                    <div className="absolute inset-0 bg-black/5 z-10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <span className="bg-white/90 text-black text-xs font-medium px-4 py-2 rounded-full shadow-sm">
                        Lancer l'animation réelle
                      </span>
                    </div>

                    {/* Mini enveloppe stylisée */}
                    <div
                      className="relative mx-auto"
                      style={{ width: "100%", maxWidth: 300, height: 180, perspective: 800 }}
                    >
                      {/* corps */}
                      <div
                        className="absolute inset-0 rounded-md shadow-lg"
                        style={{
                          background:
                            themeOverrides.envelopeBody || template.envelope?.body || "#f4e9d2",
                        }}
                      />
                      {/* triangles latéraux */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 60"
                        preserveAspectRatio="none"
                        style={{ zIndex: 1 }}
                      >
                        <polygon
                          points="0,0 50,38 0,60"
                          fill={themeOverrides.envelopeFlap || template.envelope?.flap || "#e8d6a8"}
                          stroke="rgba(0,0,0,0.08)"
                          strokeWidth="0.3"
                        />
                        <polygon
                          points="100,0 50,38 100,60"
                          fill={themeOverrides.envelopeFlap || template.envelope?.flap || "#e8d6a8"}
                          stroke="rgba(0,0,0,0.08)"
                          strokeWidth="0.3"
                        />
                        <polygon
                          points="0,60 50,32 100,60"
                          fill={themeOverrides.envelopeBody || template.envelope?.body || "#f4e9d2"}
                          stroke="rgba(0,0,0,0.1)"
                          strokeWidth="0.3"
                        />
                      </svg>
                      {/* rabat */}
                      <svg
                        className="absolute left-0 right-0 top-0"
                        style={{ height: "55%", zIndex: 2 }}
                        viewBox="0 0 100 55"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points="0,0 100,0 50,50"
                          fill={themeOverrides.envelopeFlap || template.envelope?.flap || "#e8d6a8"}
                          stroke="rgba(0,0,0,0.12)"
                          strokeWidth="0.4"
                        />
                      </svg>
                      {/* sceau */}
                      <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-display text-white select-none"
                        style={{
                          width: 52,
                          height: 52,
                          background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, ${themeOverrides.envelopeSeal || template.envelope?.seal || "#8b1a1a"} 70%, white), ${themeOverrides.envelopeSeal || template.envelope?.seal || "#8b1a1a"} 70%)`,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)",
                          zIndex: 3,
                          fontSize: themeOverrides.fontSizeEnvelopeSeal
                            ? themeOverrides.fontSizeEnvelopeSeal + "px"
                            : "16px",
                        }}
                      >
                        {themeOverrides.envelopeSealText || template.envelope?.sealText || "✦"}
                      </div>
                    </div>
                    {/* Textes sous l'enveloppe */}
                    <p
                      className="text-center text-xs text-muted-foreground mt-3 italic w-full"
                      style={{
                        fontWeight:
                          themeOverrides.fontWeightAll ||
                          themeOverrides.fontWeightTitle ||
                          (themeOverrides.allBold ? 700 : undefined),
                      }}
                    >
                      {themeOverrides.textInvitationPour || "Une invitation pour"}{" "}
                      <strong style={{ fontWeight: "inherit" }}>{hostName || "vous"}</strong>
                    </p>
                    <p
                      className="text-center text-[10px] text-muted-foreground/70 mt-1 w-full"
                      style={{
                        fontWeight:
                          themeOverrides.fontWeightAll || (themeOverrides.allBold ? 700 : undefined),
                      }}
                    >
                      {themeOverrides.textCliquezSceau || "✦ Cliquez sur le sceau pour ouvrir ✦"}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="card">
              <div 
                className="h-fit max-h-[calc(100vh-4rem)] overflow-y-auto pr-2 pb-12 custom-scrollbar"
                style={{
                  fontWeight:
                    themeOverrides.fontWeightAll || (themeOverrides.allBold ? 700 : undefined),
                }}
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Rendu final (carte)
                </p>
                <FullInvitationPreview
                  template={template}
                  coverImageUrl={coverImageUrl || null}
                  coverImageUrl2={coverImageUrl2 || (isPolaroid ? null : null)}
                  title={title || ""}
                  hostName={hostName || ""}
                  eventDate={eventDate || ""}
                  message={bibleVerse || message || storyText || ""}
                  themeOverrides={themeOverrides}
                  musicUrl={musicUrl || null}
                  program={cleanProgram}
                  location={location || ""}
                  venueImageUrl={venueImageUrl || null}
                  galleryUrls={coverImageUrl2 ? [coverImageUrl2, ...galleryUrls] : galleryUrls}
                  giftInfo={giftInfo || ""}
                  dressCode={dressCode || null}
                  accommodationInfo={accommodationInfo || null}
                  scrollAnimation={"fade-up"}
                  isBuilder={true}
                  onThemeUpdate={handleThemeUpdate}
                  onImageUpdate={(key, file) => {
                    if (key === 'coverImage') handleUpload(file, 'cover');
                    if (key === 'coverImage2') handleUpload(file, 'cover2');
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent";

function Field({ cfg, children }: { cfg: FieldConfig; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground mb-1 block">
        {cfg.label}
        {cfg.required && " *"}
      </span>
      {children}
      {cfg.helper && <p className="text-xs text-muted-foreground mt-1">{cfg.helper}</p>}
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
  defaultColor = "#a8623a",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  defaultColor?: string;
}) {
  const safePickerColor = /^#[0-9a-fA-F]{6}$/i.test(value)
    ? value
    : /^#[0-9a-fA-F]{6}$/i.test(defaultColor)
      ? defaultColor
      : "#a8623a";

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-lg border border-input shadow-sm overflow-hidden shrink-0 cursor-pointer hover:ring-2 hover:ring-primary/30 transition">
          <input
            type="color"
            value={safePickerColor}
            onChange={(e) => onChange(e.target.value)}
            onInput={(e) => onChange((e.target as HTMLInputElement).value)}
            className="absolute -top-3 -left-3 w-14 h-14 cursor-pointer border-0 p-0"
          />
        </div>
        <input
          type="text"
          value={value}
          placeholder={defaultColor}
          onChange={(e) => onChange(e.target.value.trim())}
          className="w-20 px-2 py-1 text-xs border rounded-md bg-background font-mono uppercase"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[11px] text-muted-foreground hover:text-destructive underline shrink-0"
          >
            Auto
          </button>
        )}
      </div>
    </div>
  );
}

function FontSizeField({
  label,
  value,
  onChange,
  min = 10,
  max = 72,
  defaultVal = 16,
}: {
  label: string;
  value: number | null;
  onChange: (v: number | null) => void;
  min?: number;
  max?: number;
  defaultVal?: number;
}) {
  const currentVal = value ?? defaultVal;
  return (
    <div className="space-y-1.5 py-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground tabular-nums font-mono">
            {value !== null ? `${value}px` : `Auto (${defaultVal}px)`}
          </span>
          {value !== null && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-[10px] text-muted-foreground hover:text-destructive underline"
            >
              Auto
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={currentVal}
          onChange={(e) => onChange(Number(e.target.value))}
          onInput={(e) => onChange(Number((e.target as HTMLInputElement).value))}
          className="flex-1 accent-primary h-2 cursor-pointer rounded"
        />
        <input
          type="number"
          min={min}
          max={max}
          value={value ?? ""}
          placeholder={String(defaultVal)}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
          className="w-14 px-1.5 py-0.5 border rounded text-xs text-center bg-background"
        />
      </div>
    </div>
  );
}

function TextOverrideField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-foreground w-36 shrink-0">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={200}
        className="flex-1 rounded-md border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-[10px] text-muted-foreground hover:text-destructive underline shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  );
}

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-secondary/30 transition"
      >
        <span className="font-display text-lg text-primary">{title}</span>
        <span className="text-accent text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 pt-2 space-y-4 border-t border-border/40">{children}</div>}
    </div>
  );
}
