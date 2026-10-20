/**
 * i18n.ts — Support multilingue pour l'invitation publique
 * Langues : fr (Français), en (English), ar (العربية)
 */

export type Lang = "fr" | "en" | "ar";

export const LANG_OPTIONS: { value: Lang; label: string; flag: string; rtl?: boolean }[] = [
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "ar", label: "العربية", flag: "🇲🇦", rtl: true },
];

type Dict = {
  plusQue: string;
  jours: string;
  heures: string;
  minutes: string;
  secondes: string;
  leGrandJourEst: string;
  merciDetre: string;
  notreHistoire: string;
  programme: string;
  leLieu: string;
  galerie: string;
  souvenirs: string;
  bonASavoir: string;
  dressCode: string;
  cadeaux: string;
  hebergement: string;
  rsvpTitre: string;
  rsvpSousTitre: string;
  votreNom: string;
  votrePresence: string;
  oui: string;
  non: string;
  peutEtre: string;
  nombrePersonnes: string;
  restrictions: string;
  message: string;
  envoyer: string;
  merciConfirmation: string;
  livreOr: string;
  ajouterCalendrier: string;
  googleCalendar: string;
  appleCalendrier: string;
  outlookCalendrier: string;
  listeVoeux: string;
  rappelText: string;
};

const FR: Dict = {
  plusQue: "Plus que",
  jours: "jours",
  heures: "heures",
  minutes: "minutes",
  secondes: "secondes",
  leGrandJourEst: "Le grand jour est arrivé !",
  merciDetre: "Merci d'être là pour célébrer cet amour.",
  notreHistoire: "Notre histoire",
  programme: "Programme",
  leLieu: "Le lieu",
  galerie: "Galerie Photos",
  souvenirs: "Souvenirs",
  bonASavoir: "Bon à savoir",
  dressCode: "Code vestimentaire",
  cadeaux: "Liste de cadeaux",
  hebergement: "Hébergement",
  rsvpTitre: "Confirmez votre présence",
  rsvpSousTitre: "Merci de nous répondre avant la date limite.",
  votreNom: "Votre nom",
  votrePresence: "Votre présence",
  oui: "✅ Avec joie !",
  non: "❌ Je ne pourrai pas",
  peutEtre: "🤔 Peut-être",
  nombrePersonnes: "Nombre de personnes",
  restrictions: "Allergies / Régimes alimentaires",
  message: "Un mot pour les mariés",
  envoyer: "Envoyer ma réponse",
  merciConfirmation: "Merci pour votre réponse ! 🎉",
  livreOr: "Livre d'or",
  ajouterCalendrier: "Ajouter au calendrier",
  googleCalendar: "Google Calendar",
  appleCalendrier: "Apple Calendrier",
  outlookCalendrier: "Outlook",
  listeVoeux: "Liste de vœux",
  rappelText: "Rappel",
};

const EN: Dict = {
  plusQue: "Only",
  jours: "days",
  heures: "hours",
  minutes: "minutes",
  secondes: "seconds",
  leGrandJourEst: "The big day is here!",
  merciDetre: "Thank you for being here to celebrate this love.",
  notreHistoire: "Our story",
  programme: "Schedule",
  leLieu: "The venue",
  galerie: "Photo Gallery",
  souvenirs: "Memories",
  bonASavoir: "Good to know",
  dressCode: "Dress code",
  cadeaux: "Gift registry",
  hebergement: "Accommodation",
  rsvpTitre: "Confirm your attendance",
  rsvpSousTitre: "Please reply before the deadline.",
  votreNom: "Your name",
  votrePresence: "Your attendance",
  oui: "✅ Joyfully!",
  non: "❌ I cannot make it",
  peutEtre: "🤔 Maybe",
  nombrePersonnes: "Number of guests",
  restrictions: "Allergies / Dietary restrictions",
  message: "A message for the couple",
  envoyer: "Send my reply",
  merciConfirmation: "Thank you for your reply! 🎉",
  livreOr: "Guestbook",
  ajouterCalendrier: "Add to calendar",
  googleCalendar: "Google Calendar",
  appleCalendrier: "Apple Calendar",
  outlookCalendrier: "Outlook",
  listeVoeux: "Wish list",
  rappelText: "Reminder",
};

const AR: Dict = {
  plusQue: "بعد",
  jours: "أيام",
  heures: "ساعات",
  minutes: "دقائق",
  secondes: "ثواني",
  leGrandJourEst: "اليوم العظيم قد حلّ!",
  merciDetre: "شكراً لتواجدك للاحتفال بهذا الحب.",
  notreHistoire: "قصتنا",
  programme: "البرنامج",
  leLieu: "المكان",
  galerie: "معرض الصور",
  souvenirs: "ذكريات",
  bonASavoir: "معلومات مفيدة",
  dressCode: "كود اللباس",
  cadeaux: "قائمة الهدايا",
  hebergement: "الإقامة",
  rsvpTitre: "أكّد حضورك",
  rsvpSousTitre: "يرجى الرد قبل الموعد النهائي.",
  votreNom: "اسمك",
  votrePresence: "حضورك",
  oui: "✅ بكل سعادة!",
  non: "❌ لن أتمكن من الحضور",
  peutEtre: "🤔 ربما",
  nombrePersonnes: "عدد الأشخاص",
  restrictions: "الحساسية / القيود الغذائية",
  message: "رسالة للعروسين",
  envoyer: "إرسال ردي",
  merciConfirmation: "شكراً على ردك! 🎉",
  livreOr: "سجل الزوار",
  ajouterCalendrier: "أضف إلى التقويم",
  googleCalendar: "تقويم Google",
  appleCalendrier: "تقويم Apple",
  outlookCalendrier: "Outlook",
  listeVoeux: "قائمة الأمنيات",
  rappelText: "تذكير",
};

const DICTS: Record<Lang, Dict> = { fr: FR, en: EN, ar: AR };

export function t(lang: Lang | null | undefined, key: keyof Dict): string {
  return DICTS[lang ?? "fr"]?.[key] ?? FR[key];
}

export function isRtl(lang: Lang | null | undefined): boolean {
  return lang === "ar";
}
