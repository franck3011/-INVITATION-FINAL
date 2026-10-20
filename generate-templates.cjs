const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "src", "lib", "templates.ts");
let content = fs.readFileSync(FILE_PATH, "utf8");

const adjectives = [
  "Éternel",
  "Romantique",
  "Prestige",
  "Majestueux",
  "Délicat",
  "Luxe",
  "Soyeux",
  "Botanique",
  "Céleste",
  "Féérique",
  "Scintillant",
  "Poétique",
  "Cristal",
  "Saphir",
  "Rubis",
  "Améthyste",
  "Ivoire",
  "Nacre",
  "Velours",
  "Satin",
  "Diamant",
  "Opale",
  "Aurore",
  "Crépuscule",
  "Aquarelle",
  "Floral",
  "Divin",
  "Absolu",
  "Infini",
  "Harmonie",
];
const nouns = [
  "Amour",
  "Serment",
  "Union",
  "Promesse",
  "Alliance",
  "Cérémonie",
  "Jardin",
  "Rêve",
  "Éclat",
  "Symphonie",
  "Château",
  "Domaine",
  "Rivage",
  "Éden",
  "Oasis",
  "Secret",
  "Passion",
  "Douceur",
  "Lumière",
  "Étoile",
  "Idylle",
  "Romance",
];

const colors = [
  "from-[oklch(0.97_0.02_85)] via-[oklch(0.94_0.04_85)] to-[oklch(0.88_0.07_85)]", // Gold/Cream
  "from-[oklch(0.97_0.01_30)] via-[oklch(0.94_0.02_30)] to-[oklch(0.90_0.03_30)]", // Rose Gold
  "from-[oklch(0.93_0.04_60)] via-[oklch(0.82_0.09_50)] to-[oklch(0.68_0.12_45)]", // Terracotta
  "from-[oklch(0.94_0.03_140)] via-[oklch(0.85_0.06_140)] to-[oklch(0.72_0.08_140)]", // Sage Green
  "from-[oklch(0.98_0.01_240)] via-[oklch(0.95_0.03_240)] to-[oklch(0.90_0.05_240)]", // Soft Blue
  "from-[oklch(0.96_0.03_320)] via-[oklch(0.92_0.05_320)] to-[oklch(0.88_0.08_320)]", // Lavender
  "from-[oklch(0.98_0.01_60)] via-[oklch(0.96_0.02_60)] to-[oklch(0.92_0.04_60)]", // Warm Ivory
  "from-[oklch(0.22_0.07_160)] via-[oklch(0.30_0.10_160)] to-[oklch(0.18_0.05_160)]", // Emerald (Dark)
  "from-[oklch(0.28_0.08_18)] via-[oklch(0.34_0.12_18)] to-[oklch(0.22_0.06_18)]", // Burgundy (Dark)
  "from-[oklch(0.20_0.08_240)] via-[oklch(0.26_0.12_240)] to-[oklch(0.16_0.06_240)]", // Navy (Dark)
  "from-[oklch(0.16_0.02_60)] via-[oklch(0.20_0.03_60)] to-[oklch(0.14_0.02_60)]", // Black/Gold (Dark)
];

const accents = ["text-burgundy", "text-gold", "text-ivory"];
const fonts = ["display", "script"];
const emojis = ["💍", "🕊️", "✨", "🤍", "🥂", "🌿", "🌹", "🦋", "🌸", "💐", "🌷", "🌾", "💎", "❤️"];
const effects = ["petals", "deco", "minimal", "ribbon", "leaves", "lights", "butterflies"];
const patterns = [
  "floral",
  "damask",
  "marble",
  "boheme",
  "none",
  "watercolor",
  "eucalyptus",
  "monogram",
];

let newTemplates = [];
for (let i = 1; i <= 172; i++) {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const name = `${noun} ${adj}`;
  const id = `mariage-gen-${i}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const bg = colors[Math.floor(Math.random() * colors.length)];
  const isDark = bg.includes("0.2") || bg.includes("0.1"); // Simple heuristic for dark themes based on lightness
  const accent = isDark ? (Math.random() > 0.5 ? "text-gold" : "text-ivory") : "text-burgundy";
  const font = fonts[Math.floor(Math.random() * fonts.length)];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const effect = effects[Math.floor(Math.random() * effects.length)];
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];

  newTemplates.push(`  {
    id: "${id}", category: "mariage",
    name: "${name}", tagline: "Édition Limitée Haute Couture",
    bgClass: "bg-gradient-to-br ${bg}",
    accentClass: "${accent}", titleFont: "${font}", emoji: "${emoji}", effect: "${effect}", pattern: "${pattern}"${isDark ? ", dark: true" : ""}
  }`);
}

const arrayCode = `\n/* -------------------- MARIAGE MASSIF (172 modèles auto-générés) -------------------- */\nconst MARIAGE_MASSIVE: Template[] = [\n${newTemplates.join(",\n")}\n];\n`;

if (!content.includes("MARIAGE_MASSIVE")) {
  // Insert the array right before export const TEMPLATES
  content = content.replace(
    "export const TEMPLATES: Template[] = [",
    arrayCode + "\nexport const TEMPLATES: Template[] = [",
  );

  // Add it to the TEMPLATES array
  content = content.replace("...MARIAGE_EXTRA,", "...MARIAGE_EXTRA,\n  ...MARIAGE_MASSIVE,");

  fs.writeFileSync(FILE_PATH, content, "utf8");
  console.log("Successfully added 172 new wedding templates!");
} else {
  console.log("Templates already exist.");
}
