import { getTemplate, type TemplateId } from "./templates";

/**
 * Schéma de formulaire spécifique à chaque modèle.
 * Chaque modèle a ses propres libellés, placeholders, sections et champs visibles
 * pour coller au type d'événement (mariage, anniversaire, gala, baptême, soirée…).
 */

export type FieldKey =
  | "ceremonyTitle"
  | "title"
  | "hostName"
  | "eventDate"
  | "location"
  | "message"
  | "coverImageUrl"
  | "musicUrl"
  | "storyText"
  | "program"
  | "galleryUrls"
  | "dressCode"
  | "giftInfo"
  | "accommodationInfo"
  | "seminaireTheme"
  | "seminaireOrganisateur"
  | "seminaireIntervenants"
  | "seminaireSponsors"
  | "seminaireContact"
  | "seminaireVideoUrl"
  | "seminaireSpeakers"
  | "seminaireSponsorLogos";

export interface FieldConfig {
  label: string;
  placeholder?: string;
  helper?: string;
  required?: boolean;
}

export interface SectionConfig {
  title: string;
  defaultOpen?: boolean;
  fields: FieldKey[];
}

export interface FormSchema {
  /** Titre affiché en haut du formulaire */
  pageTitle: string;
  /** Sous-titre / description */
  pageSubtitle: string;
  /** Libellé du bouton de soumission */
  submitLabel: string;
  /** Libellé spécifique pour le programme (ou null si masqué) */
  programItemPlaceholder?: { time: string; title: string; description: string };
  /** Configuration des champs */
  fields: Partial<Record<FieldKey, FieldConfig>>;
  /** Sections visibles dans l'ordre */
  sections: SectionConfig[];
}

/* -------------------------- Schémas par modèle -------------------------- */

const MARIAGE_DORE: FormSchema = {
  pageTitle: "Votre mariage doré",
  pageSubtitle: "Créez une invitation élégante pour célébrer votre union.",
  submitLabel: "Créer notre invitation de mariage",
  programItemPlaceholder: {
    time: "15h00",
    title: "Cérémonie religieuse",
    description: "Église Saint-Pierre",
  },
  fields: {
    ceremonyTitle: {
      label: "Titre de l'événement / célébration",
      placeholder: "Ex : LE MARIAGE, LA DOTE, CÉRÉMONIE...",
      helper: "Titre affiché au-dessus des noms (ex : LE MARIAGE, LA DOTE, CÉRÉMONIE COUTUMIÈRE...).",
    },
    title: { label: "Noms des mariés", placeholder: "Sara & Karim", required: true },
    hostName: { label: "Familles / parents", placeholder: "Familles Benali & El Amrani" },
    eventDate: { label: "Date du mariage", required: true },
    location: { label: "Lieu de la cérémonie", placeholder: "Riad El Yacout, Fès", required: true },
    coverImageUrl: {
      label: "Photo du couple (couverture)",
      helper: "Une belle photo de vous deux.",
    },
    musicUrl: { label: "Musique romantique", helper: "Votre chanson préférée." },
    storyText: {
      label: "Notre histoire d'amour",
      placeholder: "Comment nous nous sommes rencontrés…",
    },
    message: {
      label: "Citation ou verset",
      placeholder: "« L'amour est la seule chose qui se partage en se multipliant. »",
    },
    galleryUrls: { label: "Album de fiançailles" },
    dressCode: { label: "Tenue souhaitée", placeholder: "Tenue de soirée, blanc déconseillé" },
    giftInfo: {
      label: "Liste de mariage / cadeaux",
      placeholder: "Lien vers notre liste, ou « votre présence est notre plus beau cadeau »",
    },
    accommodationInfo: {
      label: "Hébergement pour invités",
      placeholder: "Hôtels partenaires, navette…",
    },
    program: {
      label: "Programme du jour",
      helper: "Cérémonie, vin d'honneur, dîner, soirée dansante…",
    },
  },
  sections: [
    {
      title: "Les mariés & la cérémonie",
      defaultOpen: true,
      fields: ["ceremonyTitle", "title", "hostName", "eventDate", "location", "coverImageUrl", "musicUrl"],
    },
    { title: "Notre histoire", fields: ["storyText", "message"] },
    { title: "Déroulé de la journée", defaultOpen: true, fields: ["program"] },
    { title: "Tenue & Dress code", defaultOpen: true, fields: ["dressCode"] },
    { title: "Album de fiançailles", fields: ["galleryUrls"] },
    { title: "Cadeaux & Hébergement", defaultOpen: true, fields: ["giftInfo", "accommodationInfo"] },
  ],
};

const FLORAL_ROSE: FormSchema = {
  ...MARIAGE_DORE,
  pageTitle: "Mariage floral & romantique",
  pageSubtitle: "Une invitation tout en douceur, aquarelle et pétales.",
  submitLabel: "Créer notre faire-part",
};

const ROYAL_EMERAUDE: FormSchema = {
  ...MARIAGE_DORE,
  pageTitle: "Mariage royal émeraude",
  pageSubtitle: "Pour un mariage fastueux, vert profond et touches dorées.",
  submitLabel: "Créer l'invitation royale",
};

const MARBRE_OR: FormSchema = {
  ...MARIAGE_DORE,
  pageTitle: "Mariage marbre & or rose",
  pageSubtitle: "L'élégance minimaliste pour votre grand jour.",
  submitLabel: "Créer le faire-part",
};

const ANNIVERSAIRE_FESTIF: FormSchema = {
  pageTitle: "Anniversaire festif",
  pageSubtitle: "Une invitation joyeuse pour célébrer une nouvelle année.",
  submitLabel: "Créer l'invitation d'anniversaire",
  programItemPlaceholder: {
    time: "19h00",
    title: "Apéritif",
    description: "Cocktails de bienvenue",
  },
  fields: {
    title: { label: "Nom du fêté + âge", placeholder: "Les 30 ans de Léa", required: true },
    hostName: { label: "Organisé par", placeholder: "Les amis de Léa" },
    eventDate: { label: "Date & heure de la fête", required: true },
    location: {
      label: "Lieu de la fête",
      placeholder: "Rooftop Le Sky, Casablanca",
      required: true,
    },
    coverImageUrl: { label: "Photo du fêté", helper: "Une photo qui vous ressemble." },
    musicUrl: { label: "Musique d'ambiance", helper: "Votre hit du moment." },
    message: {
      label: "Mot d'invitation",
      placeholder: "Préparez vos plus belles tenues, on va danser !",
    },
    galleryUrls: { label: "Photos souvenirs", helper: "Quelques moments à partager." },
    dressCode: { label: "Thème / dress code", placeholder: "Années 80, paillettes, total black…" },
    giftInfo: { label: "Cadeaux", placeholder: "Cagnotte en ligne, ou pas de cadeaux !" },
    program: { label: "Programme de la soirée", helper: "Apéro, dîner, gâteau, DJ…" },
  },
  sections: [
    {
      title: "L'essentiel de la fête",
      defaultOpen: true,
      fields: ["title", "hostName", "eventDate", "location", "coverImageUrl", "musicUrl"],
    },
    { title: "Mot d'invitation", fields: ["message"] },
    { title: "Programme de la soirée", defaultOpen: true, fields: ["program"] },
    { title: "Thème & dress code", fields: ["dressCode"] },
    { title: "Galerie photos", fields: ["galleryUrls"] },
    { title: "Cadeaux", fields: ["giftInfo"] },
  ],
};

const BAPTEME_IVOIRE: FormSchema = {
  pageTitle: "Baptême & cérémonie familiale",
  pageSubtitle: "Une invitation tendre pour partager ce moment précieux.",
  submitLabel: "Créer l'invitation du baptême",
  programItemPlaceholder: { time: "11h00", title: "Cérémonie", description: "À l'église" },
  fields: {
    title: { label: "Prénom de l'enfant", placeholder: "Le baptême de Sofia", required: true },
    hostName: { label: "Parents", placeholder: "Sara & Karim, ses parents" },
    eventDate: { label: "Date de la cérémonie", required: true },
    location: {
      label: "Lieu",
      placeholder: "Église Saint-Joseph, puis salle des fêtes",
      required: true,
    },
    coverImageUrl: { label: "Photo de l'enfant" },
    musicUrl: { label: "Musique douce" },
    storyText: { label: "Mot des parents", placeholder: "Quelques mots pour vos invités…" },
    message: { label: "Citation / verset", placeholder: "Une bénédiction ou un verset court." },
    galleryUrls: { label: "Photos de famille" },
    program: { label: "Déroulé de la journée", helper: "Cérémonie, déjeuner, goûter…" },
    accommodationInfo: { label: "Infos pratiques", placeholder: "Parking, accès, contact…" },
  },
  sections: [
    {
      title: "L'enfant & la cérémonie",
      defaultOpen: true,
      fields: ["title", "hostName", "eventDate", "location", "coverImageUrl", "musicUrl"],
    },
    { title: "Mot des parents", fields: ["storyText", "message"] },
    { title: "Déroulé de la journée", defaultOpen: true, fields: ["program"] },
    { title: "Infos pratiques", fields: ["accommodationInfo"] },
    { title: "Photos de famille", fields: ["galleryUrls"] },
  ],
};

const GALA_BORDEAUX: FormSchema = {
  pageTitle: "Gala & soirée de prestige",
  pageSubtitle: "Une invitation à la hauteur de votre événement.",
  submitLabel: "Créer l'invitation du gala",
  programItemPlaceholder: {
    time: "20h00",
    title: "Cocktail d'accueil",
    description: "Salon d'honneur",
  },
  fields: {
    title: {
      label: "Nom de l'événement",
      placeholder: "Gala annuel de la Fondation X",
      required: true,
    },
    hostName: { label: "Organisateur", placeholder: "Fondation X" },
    eventDate: { label: "Date du gala", required: true },
    location: { label: "Lieu", placeholder: "Hôtel Hyatt, Casablanca", required: true },
    coverImageUrl: { label: "Visuel officiel", helper: "Affiche ou photo du lieu." },
    musicUrl: { label: "Musique d'ambiance" },
    storyText: {
      label: "Présentation de l'événement",
      placeholder: "Objectifs, cause soutenue, invités d'honneur…",
    },
    program: { label: "Programme officiel", helper: "Cocktail, dîner, discours, animations…" },
    dressCode: { label: "Code vestimentaire", placeholder: "Smoking / robe longue exigés" },
    accommodationInfo: {
      label: "Informations pratiques",
      placeholder: "Parking voiturier, accès VIP…",
    },
    galleryUrls: { label: "Édition précédente" },
  },
  sections: [
    {
      title: "L'événement",
      defaultOpen: true,
      fields: ["title", "hostName", "eventDate", "location", "coverImageUrl", "musicUrl"],
    },
    { title: "Présentation", fields: ["storyText"] },
    { title: "Programme officiel", defaultOpen: true, fields: ["program"] },
    { title: "Code vestimentaire & accès", fields: ["dressCode", "accommodationInfo"] },
    { title: "Édition précédente", fields: ["galleryUrls"] },
  ],
};

const SOIREE_CHIC: FormSchema = {
  pageTitle: "Soirée chic & intime",
  pageSubtitle: "Une invitation minimaliste et sophistiquée.",
  submitLabel: "Créer l'invitation",
  programItemPlaceholder: { time: "21h00", title: "Cocktail", description: "" },
  fields: {
    title: { label: "Nom de la soirée", placeholder: "Soirée privée chez Yasmine", required: true },
    hostName: { label: "Hôte", placeholder: "Yasmine A." },
    eventDate: { label: "Date & heure", required: true },
    location: {
      label: "Lieu",
      placeholder: "Adresse privée — communiquée par message",
      required: true,
    },
    coverImageUrl: { label: "Visuel d'ambiance" },
    musicUrl: { label: "Playlist" },
    message: { label: "Mot d'invitation", placeholder: "Une soirée intimiste, en petit comité." },
    dressCode: { label: "Dress code", placeholder: "Chic et noir" },
    program: { label: "Déroulé (optionnel)" },
  },
  sections: [
    {
      title: "L'essentiel",
      defaultOpen: true,
      fields: ["title", "hostName", "eventDate", "location", "coverImageUrl", "musicUrl"],
    },
    { title: "Mot d'invitation", fields: ["message"] },
    { title: "Dress code", fields: ["dressCode"] },
    { title: "Déroulé", defaultOpen: true, fields: ["program"] },
  ],
};

const ART_DECO_NOIR: FormSchema = {
  ...GALA_BORDEAUX,
  pageTitle: "Soirée Art déco — Gatsby",
  pageSubtitle: "Une invitation rétro-glamour pour une fête inoubliable.",
  submitLabel: "Créer l'invitation Art déco",
  fields: {
    ...GALA_BORDEAUX.fields,
    title: { label: "Nom de la soirée", placeholder: "The Great Gatsby Night", required: true },
    dressCode: { label: "Code vestimentaire", placeholder: "Années 20 — robes à franges, smoking" },
  },
};

const BOHEME_TERRACOTTA: FormSchema = {
  ...MARIAGE_DORE,
  pageTitle: "Mariage bohème terracotta",
  pageSubtitle: "Pampa, sauge et terre brûlée — pour un mariage nature.",
  submitLabel: "Créer notre faire-part bohème",
  fields: {
    ...MARIAGE_DORE.fields,
    location: {
      label: "Lieu de la cérémonie",
      placeholder: "Domaine champêtre, en pleine nature",
      required: true,
    },
    dressCode: { label: "Tenue", placeholder: "Champêtre chic, tons naturels" },
  },
};

const SEMINAIRE_CORPORATE: FormSchema = {
  pageTitle: "Séminaire / Événement Corporate",
  pageSubtitle: "Créez une page d'inscription professionnelle.",
  submitLabel: "Créer la page du séminaire",
  programItemPlaceholder: {
    time: "09h00",
    title: "Keynote d'ouverture",
    description: "Présentation des résultats annuels",
  },
  fields: {
    title: { label: "Nom de l'événement", placeholder: "Séminaire Annuel 2026", required: true },
    hostName: { label: "Organisateur / Entreprise", placeholder: "Acme Corp" },
    eventDate: { label: "Date de l'événement", required: true },
    location: { label: "Lieu", placeholder: "Palais des Congrès", required: true },
    coverImageUrl: { label: "Image de couverture", helper: "Bannière principale de l'événement" },
    seminaireTheme: { label: "Thème principal", placeholder: "Innovation & Croissance" },
    seminaireOrganisateur: { label: "Présenté par", placeholder: "Direction Générale" },
    seminaireVideoUrl: {
      label: "Vidéo de référence",
      placeholder: "URL YouTube, Vimeo ou MP4",
      helper: "Affichée sur l'invitation",
    },
    seminaireSpeakers: { label: "Conférenciers & Intervenants" },
    seminaireSponsorLogos: { label: "Logos des Sponsors" },
    seminaireContact: { label: "Contact (Email ou Tél)", placeholder: "contact@acmecorp.com" },
    message: {
      label: "Mot de bienvenue / Introduction",
      placeholder: "Nous sommes ravis de vous convier à notre événement annuel...",
    },
    program: { label: "Agenda" },
    accommodationInfo: {
      label: "Hébergement & Transports",
      placeholder: "Hôtels recommandés, navettes...",
    },
  },
  sections: [
    {
      title: "Informations générales",
      defaultOpen: true,
      fields: ["title", "hostName", "seminaireTheme", "eventDate", "location", "coverImageUrl"],
    },
    {
      title: "Détails corporate",
      defaultOpen: true,
      fields: [
        "seminaireOrganisateur",
        "seminaireVideoUrl",
        "seminaireSpeakers",
        "seminaireSponsorLogos",
        "seminaireContact",
        "message",
      ],
    },
    { title: "Agenda", defaultOpen: true, fields: ["program"] },
    { title: "Infos pratiques", fields: ["accommodationInfo"] },
  ],
};

/* -------------------- Map par catégorie -------------------- */

const SCHEMAS_BY_CATEGORY = {
  mariage: MARIAGE_DORE,
  anniversaire: ANNIVERSAIRE_FESTIF,
  bapteme: BAPTEME_IVOIRE,
  gala: GALA_BORDEAUX,
  soiree: SOIREE_CHIC,
  seminaire: SEMINAIRE_CORPORATE,
} as const;

/** Surcharges spécifiques pour quelques modèles particuliers. */
const SCHEMA_OVERRIDES: Partial<Record<TemplateId, FormSchema>> = {
  "mariage-floral-rose": FLORAL_ROSE,
  "mariage-royal-emeraude": ROYAL_EMERAUDE,
  "mariage-marbre-or": MARBRE_OR,
  "mariage-boheme-terracotta": BOHEME_TERRACOTTA,
  "gala-art-deco": ART_DECO_NOIR,
};

export function getFormSchema(id: TemplateId): FormSchema {
  const override = SCHEMA_OVERRIDES[id];
  if (override) return override;
  const t = getTemplate(id);
  if (!t) return MARIAGE_DORE;
  return SCHEMAS_BY_CATEGORY[t.category] ?? MARIAGE_DORE;
}
