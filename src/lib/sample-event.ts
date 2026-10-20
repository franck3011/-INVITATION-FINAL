import type { Template } from "@/lib/templates";
import previewMariage from "@/assets/preview-mariage.jpg";
import previewAnniversaire from "@/assets/preview-anniversaire.jpg";
import previewBapteme from "@/assets/preview-bapteme.jpg";
import previewGala from "@/assets/preview-gala.jpg";
import previewSoiree from "@/assets/preview-soiree.jpg";

// Unsplash photo IDs soigneusement sélectionnés par catégorie
// Chaque template obtient une photo différente via hash sur son ID
const UNSPLASH_MARIAGE = [
  "photo-1519741497674-611481863552", // couple danse
  "photo-1511285560929-80b456fea0bc", // bague & mains
  "photo-1465495976277-4387d4b0b4c6", // cérémonie fleurs
  "photo-1520854221256-17451cc331bf", // allée cérémonie
  "photo-1606216794074-735e91aa2c92", // bouquet roses
  "photo-1583939003579-730e3918a45a", // couple rires
  "photo-1500917293891-ef795e70e1f6", // robe mariée
  "photo-1587271407850-8d438ca9fdf2", // table de réception
  "photo-1591604021695-0c69b7c05981", // roses dorées
  "photo-1529636798458-92182e662485", // château de mariage
  "photo-1541636649-5c3f77e86c7c", // décoration florale
  "photo-1550005809-91ad75fb315f", // champagne mariage
  "photo-1469371670807-013ccf25f16a", // cérémonie extérieure
  "photo-1508214751196-bcfd4ca60f91", // mariés main dans main
  "photo-1522673607200-164d1b6ce486", // couple au coucher de soleil
];

const UNSPLASH_ANNIVERSAIRE = [
  "photo-1464349095431-e9a21285b5f3", // gâteau bougies
  "photo-1530103862676-de8c9debad1d", // ballons colorés
  "photo-1513151233558-d860c5398176", // confettis
  "photo-1527529482837-4698179dc6ce", // fête de nuit
  "photo-1543269865-cbf427effbad", // amis qui fêtent
  "photo-1566895291281-ea63efd4a0bc", // champagne & flûtes
  "photo-1574236170878-efc62dc44d62", // disco ball
  "photo-1496024840928-4c417adf211d", // night party lights
  "photo-1517457373958-b7bdd4587205", // scène et lumières
  "photo-1533174072545-7a4b6ad7a6c3", // fête confettis
];

const UNSPLASH_BAPTEME = [
  "photo-1544126592-807ade215a0b", // bébé main
  "photo-1555252333-9f8e92e65df9", // fleurs blanches douces
  "photo-1504173010664-32509107de1b", // bébé couverture
  "photo-1519689680058-324335c77eba", // bébé chaussures
  "photo-1452827073306-6e85f7144f3e", // bébé famille
  "photo-1503454537195-1dcabb73ffb9", // bébé souriant
  "photo-1555252333-9f8e92e65df9", // bouquet blanc
  "photo-1578301978162-7aae4d755744", // famille heureuse
];

const UNSPLASH_GALA = [
  "photo-1531058020387-3be344556be6", // salle de gala luxe
  "photo-1540575467063-178a50c2df87", // salle conférence éclairée
  "photo-1505236858219-8359eb29e329", // lumières de scène
  "photo-1492684223066-81342ee5ff30", // fête lumières bokeh
  "photo-1519671482749-fd09be7ccebf", // foule événement
  "photo-1602631985686-1bb0e6a8696e", // table gala
  "photo-1519225421980-715cb0215aed", // soirée élégante
  "photo-1564981797816-1043664bf78d", // podium cérémonie
  "photo-1475721027785-f74eccf877e2", // scène de gala
  "photo-1547481887-a26e2cacbf28", // coupe remise de prix
];

const UNSPLASH_SOIREE = [
  "photo-1575037614876-c38a4d44f5b8", // cocktail bar
  "photo-1520333789090-1afc82db536a", // rooftop soirée
  "photo-1567521464027-f127ff144326", // apéro jardin
  "photo-1554118811-1e0d58224f24", // café lounge
  "photo-1504674900247-0877df9cc836", // table restaurant
  "photo-1414235077428-338989a2e8c0", // restaurant élégant
  "photo-1551632436-cbf8dd35adfa", // cocktail verre
  "photo-1543007630-9710e4a00a20", // soirée dj
];

const UNSPLASH_SEMINAIRE = [
  "photo-1540575467063-178a50c2df87", // salle conférence éclairée
  "photo-1505373877841-8d25f7d46678", // speaker sur scène
  "photo-1587825140708-dfaf72ae4b04", // présentation écran
  "photo-1515187029135-18ee286d815b", // table ronde pros
  "photo-1557804506-669a67965ba0", // meeting salle vitrée
  "photo-1552664730-d307ca884978", // équipe réunion
  "photo-1475721027785-f74eccf877e2", // grand auditorium
  "photo-1538688525198-9b88f6f53126", // networking cocktail
  "photo-1559136555-9303baea8ebd", // laptop & data
  "photo-1582213782179-e0d53f98f2ca", // team work open space
  "photo-1531482615713-2afd69097998", // conférence projecteur
  "photo-1591115765373-5207764f72e7", // webinar écran
  "photo-1454165804606-c3d57bc86b40", // contrat signature
  "photo-1600880292203-757bb62b4baf", // réunion board room
  "photo-1573164713714-d95e436ab8d6", // workshop post-its
];

const PHOTOS_BY_CATEGORY: Record<string, string[]> = {
  mariage: UNSPLASH_MARIAGE,
  anniversaire: UNSPLASH_ANNIVERSAIRE,
  bapteme: UNSPLASH_BAPTEME,
  gala: UNSPLASH_GALA,
  soiree: UNSPLASH_SOIREE,
  seminaire: UNSPLASH_SEMINAIRE,
};

const LOCAL_FALLBACK: Record<string, string> = {
  mariage: previewMariage,
  anniversaire: previewAnniversaire,
  bapteme: previewBapteme,
  gala: previewGala,
  soiree: previewSoiree,
  seminaire: previewGala,
};

// Hash stable : même ID → même index → même photo toujours
function stableIndex(id: string, max: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 131 + id.charCodeAt(i)) | 0;
  return Math.abs(h) % max;
}

// Données d'exemple variées par catégorie
const SAMPLES: Record<
  string,
  { title: string; hostName: string; location: string; message: string }[]
> = {
  mariage: [
    {
      title: "Sara & Karim",
      hostName: "Familles Benali & Tahiri",
      location: "Riad El Yacout, Marrakech",
      message: "Votre présence sera notre plus beau cadeau",
    },
    {
      title: "Émilie & Thomas",
      hostName: "Familles Martin & Leclerc",
      location: "Château de Vaux, Loire",
      message: "Un jour magique à partager avec vous",
    },
    {
      title: "Nadia & Pierre",
      hostName: "Les mariés",
      location: "Villa Rosa, Côte d'Azur",
      message: "Avec toute notre joie, nous vous invitons",
    },
    {
      title: "Léa & Julien",
      hostName: "Familles Morel & Fontaine",
      location: "Mas Provençal, Aix",
      message: "Ce que l'amour a uni personne ne le séparera",
    },
    {
      title: "Amira & Hugo",
      hostName: "Familles Kadi & Dupont",
      location: "Manoir des Roses, Bordeaux",
      message: "Rejoignez-nous pour ce moment inoubliable",
    },
    {
      title: "Clara & Romain",
      hostName: "Les familles réunies",
      location: "Abbaye de Talloires, Annecy",
      message: "L'amour est la plus belle des aventures",
    },
    {
      title: "Sofia & Matteo",
      hostName: "Familles Rossi & Ferrara",
      location: "Domaine des Oliviers, Montpellier",
      message: "Un jour de bonheur partagé avec ceux qu'on aime",
    },
    {
      title: "Inès & Adrien",
      hostName: "Familles Caron & Blanc",
      location: "Château Margaux, Bordeaux",
      message: "Faites de ce jour un souvenir éternel",
    },
    {
      title: "Yasmine & Raphaël",
      hostName: "Les deux familles",
      location: "Palais des Roses, Tunis",
      message: "Avec tout notre amour nous vous convions",
    },
    {
      title: "Alice & Benjamin",
      hostName: "Familles Durand & Lambert",
      location: "Domaine de la Tortinière, Tours",
      message: "Notre amour mérite vos sourires",
    },
    {
      title: "Manon & Luca",
      hostName: "Familles Bernard & Rossi",
      location: "Villa Toscane, Nice",
      message: "Ensemble pour la vie",
    },
    {
      title: "Chloé & Antoine",
      hostName: "Les mariés et familles",
      location: "Prieuré de Bénisson-Dieu",
      message: "La vie à deux commence ici",
    },
  ],
  anniversaire: [
    {
      title: "Les 30 ans de Léa",
      hostName: "Léa Moreau",
      location: "Rooftop Le Perchoir, Paris",
      message: "Une nuit à ne pas oublier",
    },
    {
      title: "50 ans de Michel",
      hostName: "Michel & la famille",
      location: "Château Beaumont, Bordeaux",
      message: "Un demi-siècle de bonheur !",
    },
    {
      title: "Les 18 ans d'Inès",
      hostName: "Inès Benali",
      location: "La Plage, Cannes",
      message: "La vie commence maintenant !",
    },
    {
      title: "40 ans de Sophie",
      hostName: "Sophie Laurent",
      location: "Loft Haussmann, Paris",
      message: "40 ans de grâce et d'élégance",
    },
    {
      title: "Les 25 ans de Luca",
      hostName: "Luca Ferraro",
      location: "Villa Toscane, Nice",
      message: "Quart de siècle — ça se fête !",
    },
    {
      title: "60 ans de Martine",
      hostName: "Martine & famille",
      location: "Mas des Oliviers, Aix",
      message: "L'âge des grandes fêtes",
    },
    {
      title: "Les 21 ans de Jade",
      hostName: "Jade Renard",
      location: "Club Wanderlust, Paris",
      message: "Enfin adulte — première vraie soirée !",
    },
    {
      title: "Les 35 ans d'Ali",
      hostName: "Ali Kader",
      location: "Sky Bar Marseille",
      message: "Trente-cinq ans d'aventures",
    },
  ],
  bapteme: [
    {
      title: "Baptême de Yasmine",
      hostName: "Famille Haddad",
      location: "Chapelle Sainte-Marie, Lyon",
      message: "Partagez ce jour de lumière avec nous",
    },
    {
      title: "Baptême de Léon",
      hostName: "Famille Mercier",
      location: "Église Saint-Pierre, Paris",
      message: "Entouré de ceux qu'il aime",
    },
    {
      title: "Baptême d'Élise",
      hostName: "Famille Dumas",
      location: "Abbatiale de Cluny",
      message: "La grâce illumine notre maison",
    },
    {
      title: "Baptême de Nathan",
      hostName: "Famille Bouchard",
      location: "Cathédrale Saint-Jean, Lyon",
      message: "Un nouveau chemin commence",
    },
    {
      title: "Baptême de Zoé",
      hostName: "Famille Lemaire",
      location: "Église Notre-Dame, Strasbourg",
      message: "Avec toute notre joie et gratitude",
    },
  ],
  gala: [
    {
      title: "Gala Étoile 2026",
      hostName: "Fondation Lumière",
      location: "Opéra Garnier, Paris",
      message: "Une soirée d'exception sous les étoiles",
    },
    {
      title: "Dîner Prestige",
      hostName: "Club des Ambassadeurs",
      location: "Grand Palais, Paris",
      message: "L'excellence à l'état pur",
    },
    {
      title: "Gala de Charité",
      hostName: "Association Demain",
      location: "Hôtel de Crillon, Paris",
      message: "Ensemble pour un monde meilleur",
    },
    {
      title: "Soirée Awards 2026",
      hostName: "Conseil d'Administration",
      location: "Palais des Congrès, Monaco",
      message: "L'heure de célébrer l'excellence",
    },
    {
      title: "Black & Gold Gala",
      hostName: "Club Élite",
      location: "Château Vaux-le-Vicomte",
      message: "Une nuit comme nulle autre",
    },
  ],
  soiree: [
    {
      title: "Soirée Privée",
      hostName: "Maison Noire",
      location: "Loft 19, Paris",
      message: "Dress code chic — entrée sur invitation",
    },
    {
      title: "Garden Party",
      hostName: "Famille Rousseau",
      location: "Villa Les Pins, Biarritz",
      message: "Champagne, soleil et bonne humeur",
    },
    {
      title: "Rooftop Sessions",
      hostName: "Studio Creative",
      location: "Toit de Paris XVIII",
      message: "Les plus belles soirées finissent au sommet",
    },
    {
      title: "Dîner entre Amis",
      hostName: "Le groupe des 10",
      location: "Restaurant L'Ardoise, Lyon",
      message: "Parce que les meilleurs moments se partagent",
    },
  ],
  seminaire: [
    {
      title: "Summit Digital 2026",
      hostName: "Tech Leaders Forum",
      location: "Palais des Congrès, Paris",
      message: "Transformer le numérique ensemble",
    },
    {
      title: "Leadership Forum",
      hostName: "Executive Club France",
      location: "Grand Hôtel, Lyon",
      message: "Construire les leaders de demain",
    },
    {
      title: "Innovation Day",
      hostName: "Startup Nation",
      location: "Station F, Paris",
      message: "Innover ou disparaître",
    },
    {
      title: "Azure Leadership 2026",
      hostName: "Azure Corp",
      location: "La Défense, Paris",
      message: "Leadership et vision stratégique",
    },
    {
      title: "Gold Summit Awards",
      hostName: "Fondation Excellence",
      location: "Monaco Convention Centre",
      message: "Célébrons l'excellence ensemble",
    },
    {
      title: "Women in Business",
      hostName: "WIB Network",
      location: "Hôtel Lutetia, Paris",
      message: "Inspirer. Connecter. Agir.",
    },
    {
      title: "Ocean Forum 2026",
      hostName: "Blue Economy Alliance",
      location: "Palais des Mers, Brest",
      message: "Innovation et durabilité maritime",
    },
    {
      title: "Crimson Awards Gala",
      hostName: "Conseil d'Administration",
      location: "Grand Palais, Paris",
      message: "L'heure de récompenser l'excellence",
    },
    {
      title: "Startup Pitch Day",
      hostName: "Mint Ventures",
      location: "Station F, Paris",
      message: "Pitchez. Financez. Croissez.",
    },
    {
      title: "AI & Futur 2026",
      hostName: "Institut de l'IA",
      location: "Cité des Sciences, Paris",
      message: "L'intelligence artificielle au service de l'humain",
    },
    {
      title: "Sand & Strategy",
      hostName: "Desert Business Forum",
      location: "InterContinental, Dubaï",
      message: "Sobriété et chaleur stratégique",
    },
    {
      title: "Night Conference Pro",
      hostName: "Night Owl Events",
      location: "Palais Brongniart, Paris",
      message: "Les grandes idées naissent la nuit",
    },
    {
      title: "Coral Workshop 2026",
      hostName: "Atelier Créatif Pro",
      location: "Cité du Design, Lyon",
      message: "Créer, collaborer, innover",
    },
    {
      title: "Violet Tech Summit",
      hostName: "Purple Innovation Lab",
      location: "Viva Technology, Paris",
      message: "La disruption technologique en marche",
    },
    {
      title: "Forest Retreat Corporate",
      hostName: "Green Business Alliance",
      location: "Domaine de Chantilly",
      message: "Stratégie et sérénité en pleine nature",
    },
  ],
};

export function getSampleEvent(template: Template) {
  const cat = template.category as string;
  const catSamples = SAMPLES[cat] ?? SAMPLES.mariage;

  const sampleIdx = stableIndex(template.id, catSamples.length);
  const s = catSamples[sampleIdx];

  const photoArray = PHOTOS_BY_CATEGORY[cat] ?? PHOTOS_BY_CATEGORY.mariage;
  const photoIdx = stableIndex(template.id, photoArray.length);
  const photoId = photoArray[photoIdx];

  return {
    ...s,
    eventDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
    coverImageUrl: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&q=80`,
  };
}
