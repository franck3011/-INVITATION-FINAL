import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  BlockNode,
  BlockType,
  STARTER_TEMPLATES,
  StarterTemplate,
} from "@/components/builder/types";
import { Renderer } from "@/components/builder/Renderer";
import { SiteHeader } from "@/components/site-chrome";
import { createEvent } from "@/fns/events.functions";
import { saveMyInvitation } from "@/lib/my-invitations";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

// ── Inject Google Fonts (same as existing templates) ─────────────
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?" +
  [
    "Playfair+Display:ital,wght@0,400..900;1,400..900",
    "Cormorant+Garamond:ital,wght@0,400..700;1,400..700",
    "Cinzel:wght@400..900",
    "Cinzel+Decorative:wght@400;700;900",
    "Great+Vibes",
    "Parisienne",
    "Dancing+Script:wght@400..700",
    "Sacramento",
    "Allura",
    "Tangerine:wght@400;700",
    "Bodoni+Moda:ital,wght@0,400..900;1,400..900",
    "Montserrat:ital,wght@0,400..700;1,400..700",
    "Lora:ital,wght@0,400..700;1,400..700",
    "EB+Garamond:ital,wght@0,400..800;1,400..800",
    "Marcellus",
    "Prata",
    "Inter:wght@400;600;700",
  ]
    .map((f) => "family=" + f)
    .join("&") +
  "&display=swap";

if (typeof document !== "undefined") {
  const ID = "builder-fonts";
  if (!document.getElementById(ID)) {
    const link = document.createElement("link");
    link.id = ID;
    link.rel = "stylesheet";
    link.href = GOOGLE_FONTS_HREF;
    document.head.appendChild(link);
  }
}

export const Route = createFileRoute("/create/builder")({
  head: () => ({
    meta: [
      { title: "Éditeur Visuel — Inviti" },
      {
        name: "description",
        content:
          "Créez votre invitation digitale de A à Z avec l'éditeur visuel Drag & Drop d'Inviti.",
      },
    ],
  }),
  component: BuilderDemo,
});

const BLOCK_CATEGORIES = [
  {
    label: "Texte",
    emoji: "✏️",
    types: [
      { type: "Heading" as BlockType, label: "Titre", emoji: "🔤" },
      { type: "Text" as BlockType, label: "Paragraphe", emoji: "📝" },
    ],
  },
  {
    label: "Médias",
    emoji: "🖼️",
    types: [
      { type: "Image" as BlockType, label: "Image", emoji: "🖼️" },
      { type: "Video" as BlockType, label: "Vidéo", emoji: "🎥" },
      { type: "Gallery" as BlockType, label: "Galerie", emoji: "🗂️" },
    ],
  },
  {
    label: "Interaction",
    emoji: "🎯",
    types: [
      { type: "Button" as BlockType, label: "Bouton", emoji: "🔘" },
      { type: "RsvpForm" as BlockType, label: "RSVP Form", emoji: "📋" },
      { type: "Countdown" as BlockType, label: "Compte à rebours", emoji: "⏱️" },
    ],
  },
  {
    label: "Déco & Mise en page",
    emoji: "✨",
    types: [
      { type: "Map" as BlockType, label: "Carte Maps", emoji: "📍" },
      { type: "Divider" as BlockType, label: "Séparateur", emoji: "➖" },
      { type: "Icon" as BlockType, label: "Icône", emoji: "⭐" },
      { type: "Motif" as BlockType, label: "Motif déco", emoji: "🌸" },
    ],
  },
];

const DEFAULT_SIZES: Partial<
  Record<BlockType, { width: number | string; height: number | string }>
> = {
  Heading: { width: 340, height: "auto" },
  Text: { width: 320, height: "auto" },
  Image: { width: 360, height: 260 },
  Video: { width: 380, height: 220 },
  Gallery: { width: 360, height: 260 },
  Button: { width: 200, height: "auto" },
  RsvpForm: { width: 360, height: 280 },
  Countdown: { width: 340, height: 100 },
  Map: { width: 380, height: 240 },
  Divider: { width: 360, height: 20 },
  Icon: { width: 80, height: 80 },
  Motif: { width: 100, height: 100 },
};

const DEFAULT_PROPS: Partial<Record<BlockType, Record<string, any>>> = {
  Heading: { text: "Titre de votre invitation", level: "h2" },
  Text: { text: "Votre message ici..." },
  Button: { text: "Répondre à l'invitation", href: "#rsvp" },
  Image: { src: "", alt: "Image" },
  Video: { src: "" },
  Map: { address: "", src: "" },
  Icon: { iconName: "Heart", size: 48, color: "#C9A961" },
  Motif: { color: "#C9A961" },
  RsvpForm: { title: "Confirmez votre présence" },
  Countdown: {},
  Gallery: {},
  Divider: { thickness: 1, style: "solid", color: "#e5e7eb" },
  Section: {},
};

function BuilderDemo() {
  const [started, setStarted] = useState(false);
  const [blocks, setBlocks] = useState<BlockNode[]>(STARTER_TEMPLATES[0].canvas);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const navigate = useNavigate();
  const submitEvent = useServerFn(createEvent);
  const [isPublishing, setIsPublishing] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [forceEnvelope, setForceEnvelope] = useState(false);
  const [scrollAnimation, setScrollAnimation] = useState<
    "fade-blur" | "fade-slide" | "scale-up" | "none"
  >("fade-blur");
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
  const EXT_BY_TYPE: Record<string, string> = {
    "audio/mpeg": "mp3",
    "audio/mp3": "mp3",
    "audio/ogg": "ogg",
    "audio/wav": "wav",
    "audio/x-wav": "wav",
    "audio/mp4": "m4a",
    "audio/x-m4a": "m4a",
  };
  const ALLOWED_AUDIO = Object.keys(EXT_BY_TYPE);

  async function handleAudioUpload(file: File) {
    if (!ALLOWED_AUDIO.includes(file.type)) {
      toast.error("Format audio non supporté (MP3, WAV, OGG)");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error(`Fichier trop volumineux (max 10 Mo)`);
      return;
    }
    setUploadingMedia(true);
    try {
      const ext = EXT_BY_TYPE[file.type] ?? "mp3";
      const rand = crypto.getRandomValues(new Uint8Array(6));
      const randStr = Array.from(rand, (b) => b.toString(16).padStart(2, "0")).join("");
      const path = `${Date.now()}-${randStr}.${ext}`;
      const { error } = await supabase.storage
        .from("event-media")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      const { data: pub } = supabase.storage.from("event-media").getPublicUrl(path);
      setMusicUrl(pub.publicUrl);
      toast.success("Musique ajoutée avec succès");
    } catch (e) {
      console.warn("Échec upload Supabase, fallback:", e);
      if (file.size > 3.5 * 1024 * 1024) {
        toast.error("Le fichier dépasse 3.5 Mo pour le stockage direct. Utilisez un fichier plus léger ou collez une URL MP3.");
        setUploadingMedia(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setMusicUrl(reader.result as string);
        toast.success("Musique ajoutée");
      };
      reader.onerror = () => toast.error("Échec de la lecture du fichier audio");
      reader.readAsDataURL(file);
    } finally {
      setUploadingMedia(false);
    }
  }

  // Show template picker first
  if (!started) {
    return (
      <TemplatePicker
        onSelect={(tpl) => {
          setBlocks(JSON.parse(JSON.stringify(tpl.canvas)));
          setStarted(true);
        }}
      />
    );
  }

  const handlePublish = async () => {
    if (!eventTitle || !eventDate) {
      toast.error("Veuillez remplir le titre et la date de l'événement.");
      return;
    }
    try {
      setIsPublishing(true);
      const res = await submitEvent({
        data: {
          templateId: "builder",
          title: eventTitle,
          eventDate: eventDate,
          location: "À définir",
          musicUrl: musicUrl,
          themeOverrides: {
            builderData: blocks,
            fontPairIndex: 0,
            forceEnvelope: forceEnvelope,
            scrollAnimation: scrollAnimation,
          },
        },
      });
      saveMyInvitation({
        slug: res.slug ?? res.adminToken,
        adminToken: res.adminToken,
        title: eventTitle,
        templateId: "builder",
        eventDate: eventDate,
        createdAt: new Date().toISOString(),
      });
      toast.success("Invitation publiée avec succès !");
      navigate({ to: "/admin/$token", params: { token: res.adminToken } });
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la publication");
      setIsPublishing(false);
    }
  };

  const addBlock = (type: BlockType) => {
    const root = blocks.find((i) => i.id === "root-section-1");
    const count = root?.children?.length || 0;
    const offsetX = 20 + (count % 5) * 15;
    const offsetY = 30 + (count % 8) * 30;
    const size = DEFAULT_SIZES[type] || { width: 300, height: "auto" };
    const props = DEFAULT_PROPS[type] || {};

    const newBlock: BlockNode = {
      id: `${type.toLowerCase()}-${Date.now()}`,
      type,
      props,
      styles: {
        padding: type === "Heading" || type === "Text" ? "8px" : "0px",
        backgroundColor: "transparent",
      },
      position: { x: offsetX, y: offsetY },
      size,
    };

    setBlocks((prev) => {
      const root = prev.find((i) => i.id === "root-section-1");
      if (root) {
        return prev.map((item) =>
          item.id === "root-section-1"
            ? { ...item, children: [...(item.children || []), newBlock] }
            : item,
        );
      }
      return [...prev, newBlock];
    });
    setSelectedId(newBlock.id);
  };

  const handleUpdateTransform = (
    id: string,
    position: { x: number; y: number },
    size: { width: string | number; height: string | number },
  ) => {
    setBlocks((prev) => {
      const newBlocks = JSON.parse(JSON.stringify(prev));
      const update = (nodes: BlockNode[]) => {
        for (let node of nodes) {
          if (node.id === id) {
            node.position = position;
            node.size = size;
            return true;
          }
          if (node.children && update(node.children)) return true;
        }
        return false;
      };
      update(newBlocks);
      return newBlocks;
    });
  };

  const selectedBlock = (() => {
    const find = (nodes: BlockNode[]): BlockNode | null => {
      for (const n of nodes) {
        if (n.id === selectedId) return n;
        if (n.children) {
          const f = find(n.children);
          if (f) return f;
        }
      }
      return null;
    };
    return find(blocks);
  })();

  const updateSelectedBlock = (
    field: "props" | "styles" | "position" | "size",
    key: string,
    value: any,
  ) => {
    setBlocks((prev) => {
      const newBlocks = JSON.parse(JSON.stringify(prev));
      const update = (nodes: BlockNode[]) => {
        for (let node of nodes) {
          if (node.id === selectedId) {
            if (!node[field]) (node as any)[field] = {};
            (node[field] as any)[key] = value;
            return true;
          }
          if (node.children && update(node.children)) return true;
        }
        return false;
      };
      update(newBlocks);
      return newBlocks;
    });
  };

  const deleteSelected = () => {
    setBlocks((prev) => {
      const newBlocks = JSON.parse(JSON.stringify(prev));
      const remove = (nodes: BlockNode[]) => {
        const idx = nodes.findIndex((n) => n.id === selectedId);
        if (idx !== -1) {
          nodes.splice(idx, 1);
          return true;
        }
        for (let node of nodes) {
          if (node.children && remove(node.children)) return true;
        }
        return false;
      };
      remove(newBlocks);
      return newBlocks;
    });
    setSelectedId(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <Toaster richColors position="top-center" />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b shadow-sm z-20">
        <div className="flex items-center gap-3">
          <a href="/" className="font-display text-primary text-xl font-bold">
            Inviti
          </a>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-600">Éditeur Visuel</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {blocks.find((b) => b.id === "root-section-1")?.children?.length || 0} élément(s)
          </span>
          <button
            onClick={() => setShowPublishModal(true)}
            className="bg-primary text-white font-bold py-2 px-5 rounded-full text-sm shadow hover:bg-primary/90 transition-all"
          >
            🚀 Publier l'invitation
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Elements */}
        <div className="w-56 bg-white border-r flex flex-col overflow-y-auto">
          <div className="p-3 border-b font-bold text-xs uppercase tracking-wider text-gray-500">
            Éléments
          </div>
          <div className="p-2 flex flex-col gap-1">
            {BLOCK_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 px-2 pt-3 pb-1 font-bold">
                  {cat.emoji} {cat.label}
                </div>
                {cat.types.map(({ type, label, emoji }) => (
                  <button
                    key={type}
                    onClick={() => addBlock(type)}
                    className="w-full p-2.5 text-sm text-left rounded-lg hover:bg-primary/8 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-base">{emoji}</span>
                    <span className="group-hover:font-medium transition-all">{label}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Canvas - Center */}
        <div className="flex-1 flex flex-col bg-[#f0f2f5] relative overflow-hidden">
          {/* Canvas label */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-white/80 backdrop-blur text-[10px] text-gray-500 px-3 py-1 rounded-full border shadow-sm pointer-events-none">
            Format mobile — 400px × 800px
          </div>

          <div
            className="flex-1 overflow-y-auto py-12 flex justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedId(null);
            }}
          >
            <div
              className="bg-white shadow-2xl relative overflow-hidden"
              style={{ width: 400, minHeight: 800 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedId(null);
              }}
            >
              <Renderer
                blocks={blocks}
                isEditMode={true}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onUpdateTransform={handleUpdateTransform}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-72 bg-white border-l flex flex-col z-10 overflow-hidden">
          <div className="p-3 border-b flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-gray-500">
              Propriétés
            </span>
            {selectedId && (
              <button
                onClick={deleteSelected}
                className="text-red-500 hover:text-red-700 text-xs font-medium"
              >
                🗑 Supprimer
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {!selectedBlock ? (
              <div className="space-y-6">
                <div className="text-center text-gray-400 text-sm mt-4 space-y-2 px-4">
                  <div className="text-3xl">👈</div>
                  <p>
                    Cliquez sur un élément pour le modifier, ou configurez les options globales
                    ci-dessous.
                  </p>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    🎬 Expérience Animée
                  </h4>

                  <div className="space-y-2 bg-gray-50 p-3 rounded-lg border">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={forceEnvelope}
                        onChange={(e) => setForceEnvelope(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Enveloppe virtuelle à l'ouverture
                      </span>
                    </label>
                    <p className="text-[10px] text-gray-500 leading-tight">
                      Oblige les invités à décacheter une enveloppe animée avant de voir
                      l'invitation.
                    </p>
                  </div>

                  <div className="space-y-2 bg-gray-50 p-3 rounded-lg border">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700 block mb-1">
                        Animation de défilement (Scroll)
                      </span>
                      <select
                        value={scrollAnimation}
                        onChange={(e) => setScrollAnimation(e.target.value as any)}
                        className="w-full text-xs rounded border-gray-300"
                      >
                        <option value="fade-blur">Haute Couture (Flou + Apparition douce)</option>
                        <option value="fade-slide">Classique (Glissement vers le haut)</option>
                        <option value="scale-up">Dynamique (Zoom léger)</option>
                        <option value="none">Aucune (Affichage direct)</option>
                      </select>
                    </label>
                  </div>

                  <div className="space-y-2 bg-gray-50 p-3 rounded-lg border">
                    <label className="text-sm font-medium text-gray-700 block">
                      🎶 Musique de fond (MP3)
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => e.target.files?.[0] && handleAudioUpload(e.target.files[0])}
                      className="text-xs w-full"
                    />
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-gray-500 shrink-0">ou lien direct MP3 :</span>
                      <input
                        type="url"
                        placeholder="https://.../musique.mp3"
                        value={musicUrl?.startsWith("data:") ? "" : (musicUrl || "")}
                        onChange={(e) => setMusicUrl(e.target.value.trim() || null)}
                        className="flex-1 px-2 py-1 text-xs border rounded bg-white"
                      />
                    </div>
                    {uploadingMedia && (
                      <p className="text-[10px] text-gray-500 mt-1">Envoi en cours…</p>
                    )}
                    {musicUrl && (
                      <div className="mt-2 flex items-center justify-between bg-green-50 px-2 py-1.5 rounded border border-green-100">
                        <p className="text-[10px] font-medium text-green-700">✓ Musique activée</p>
                        <button
                          type="button"
                          onClick={() => setMusicUrl(null)}
                          className="text-[10px] text-red-500 hover:underline"
                        >
                          Retirer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Type badge */}
                <div className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded inline-block">
                  {selectedBlock.type}
                </div>

                {/* --- TEXT CONTENT --- */}
                {(selectedBlock.type === "Text" ||
                  selectedBlock.type === "Heading" ||
                  selectedBlock.type === "Button") && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">Contenu</label>
                    <textarea
                      className="w-full p-2 text-sm border rounded-lg min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={selectedBlock.props?.text || ""}
                      onChange={(e) => updateSelectedBlock("props", "text", e.target.value)}
                    />
                  </div>
                )}

                {/* --- TYPOGRAPHY --- */}
                {(selectedBlock.type === "Text" || selectedBlock.type === "Heading") && (
                  <div className="space-y-3 pt-3 border-t">
                    <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                      Typographie
                    </h4>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">Police</label>
                      <select
                        className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                        value={selectedBlock.styles?.fontFamily || ""}
                        onChange={(e) =>
                          updateSelectedBlock("styles", "fontFamily", e.target.value)
                        }
                      >
                        <option value="">Par défaut (Système)</option>
                        <option value="Playfair Display, serif">Playfair Display — Élégant</option>
                        <option value="Cinzel, serif">Cinzel — Majestueux</option>
                        <option value="Great Vibes, cursive">Great Vibes — Manuscrit</option>
                        <option value="Cormorant Garamond, serif">
                          Cormorant Garamond — Raffiné
                        </option>
                        <option value="Montserrat, sans-serif">Montserrat — Moderne</option>
                        <option value="Inter, sans-serif">Inter — Classique</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <div className="space-y-1 flex-1">
                        <label className="text-xs font-bold text-gray-600">Taille</label>
                        <input
                          type="text"
                          className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                          value={selectedBlock.styles?.fontSize || ""}
                          onChange={(e) =>
                            updateSelectedBlock("styles", "fontSize", e.target.value)
                          }
                          placeholder="24px"
                        />
                      </div>
                      <div className="space-y-1 flex-1">
                        <label className="text-xs font-bold text-gray-600">Graisse</label>
                        <select
                          className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                          value={selectedBlock.styles?.fontWeight || ""}
                          onChange={(e) =>
                            updateSelectedBlock("styles", "fontWeight", e.target.value)
                          }
                        >
                          <option value="">Normal</option>
                          <option value="300">Fin</option>
                          <option value="400">Régulier</option>
                          <option value="600">Semi-gras</option>
                          <option value="700">Gras</option>
                          <option value="900">Extra-gras</option>
                        </select>
                      </div>
                    </div>
                    {/* Text alignment */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">Alignement</label>
                      <div className="flex gap-1">
                        {(["left", "center", "right"] as const).map((align) => (
                          <button
                            key={align}
                            onClick={() => updateSelectedBlock("styles", "textAlign", align)}
                            className={`flex-1 py-1.5 text-xs border rounded-lg transition-colors ${selectedBlock.styles?.textAlign === align ? "bg-primary text-white border-primary" : "hover:bg-gray-100"}`}
                          >
                            {align === "left" ? "⬅" : align === "center" ? "⬛" : "➡"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- IMAGE / VIDEO SOURCE --- */}
                {(selectedBlock.type === "Image" || selectedBlock.type === "Video") && (
                  <div className="space-y-1 pt-3 border-t">
                    <label className="text-xs font-bold text-gray-600">URL de la source</label>
                    <input
                      type="text"
                      className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={selectedBlock.props?.src || ""}
                      onChange={(e) => updateSelectedBlock("props", "src", e.target.value)}
                      placeholder="https://..."
                    />
                    {selectedBlock.props?.src && selectedBlock.type === "Image" && (
                      <img
                        src={selectedBlock.props.src}
                        alt="Preview"
                        className="w-full h-24 object-cover rounded-lg mt-1 border"
                      />
                    )}
                  </div>
                )}

                {/* --- MAP / ADDRESS --- */}
                {selectedBlock.type === "Map" && (
                  <div className="space-y-1 pt-3 border-t">
                    <label className="text-xs font-bold text-gray-600">Adresse du lieu</label>
                    <input
                      type="text"
                      className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={selectedBlock.props?.address || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateSelectedBlock("props", "address", val);
                        updateSelectedBlock(
                          "props",
                          "src",
                          val
                            ? `https://maps.google.com/maps?q=${encodeURIComponent(val)}&output=embed`
                            : "",
                        );
                      }}
                      placeholder="Ex: 10 Rue de la Paix, Paris"
                    />
                    <p className="text-[10px] text-gray-400">
                      La carte Google Maps sera générée automatiquement.
                    </p>
                  </div>
                )}

                {/* --- APPEARANCE --- */}
                <div className="space-y-3 pt-3 border-t">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                    Apparence
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">Couleur texte</label>
                      <div className="flex items-center gap-2 border rounded-lg p-1.5">
                        <input
                          type="color"
                          className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                          value={selectedBlock.styles?.color || "#000000"}
                          onChange={(e) => updateSelectedBlock("styles", "color", e.target.value)}
                        />
                        <span className="text-[10px] text-gray-500 font-mono truncate">
                          {selectedBlock.styles?.color || "#000000"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">Fond</label>
                      <div className="flex items-center gap-2 border rounded-lg p-1.5">
                        <input
                          type="color"
                          className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                          value={selectedBlock.styles?.backgroundColor || "#ffffff"}
                          onChange={(e) =>
                            updateSelectedBlock("styles", "backgroundColor", e.target.value)
                          }
                        />
                        <span className="text-[10px] text-gray-500 font-mono truncate">
                          {selectedBlock.styles?.backgroundColor || "#ffffff"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Border radius slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-gray-600">Arrondi des bords</label>
                      <span className="text-xs text-gray-400">
                        {selectedBlock.styles?.borderRadius || "0px"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full accent-primary"
                      value={parseInt(String(selectedBlock.styles?.borderRadius || "0"))}
                      onChange={(e) =>
                        updateSelectedBlock("styles", "borderRadius", `${e.target.value}px`)
                      }
                    />
                  </div>

                  {/* Opacity slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-gray-600">Opacité</label>
                      <span className="text-xs text-gray-400">
                        {Math.round(parseFloat(String(selectedBlock.styles?.opacity ?? 1)) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      className="w-full accent-primary"
                      value={parseFloat(String(selectedBlock.styles?.opacity ?? 1))}
                      onChange={(e) =>
                        updateSelectedBlock("styles", "opacity", parseFloat(e.target.value))
                      }
                    />
                  </div>
                </div>

                {/* --- POSITION & SIZE --- */}
                <div className="space-y-3 pt-3 border-t">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                    Position & Taille
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">X</label>
                      <input
                        type="number"
                        className="w-full p-2 text-sm border rounded-lg"
                        value={selectedBlock.position?.x || 0}
                        onChange={(e) =>
                          updateSelectedBlock("position", "x", parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">Y</label>
                      <input
                        type="number"
                        className="w-full p-2 text-sm border rounded-lg"
                        value={selectedBlock.position?.y || 0}
                        onChange={(e) =>
                          updateSelectedBlock("position", "y", parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">Largeur</label>
                      <input
                        type="text"
                        className="w-full p-2 text-sm border rounded-lg"
                        value={selectedBlock.size?.width || ""}
                        onChange={(e) =>
                          updateSelectedBlock(
                            "size",
                            "width",
                            isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value),
                          )
                        }
                        placeholder="ex: 300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">Hauteur</label>
                      <input
                        type="text"
                        className="w-full p-2 text-sm border rounded-lg"
                        value={selectedBlock.size?.height || ""}
                        onChange={(e) =>
                          updateSelectedBlock(
                            "size",
                            "height",
                            e.target.value === "auto"
                              ? "auto"
                              : isNaN(Number(e.target.value))
                                ? e.target.value
                                : Number(e.target.value),
                          )
                        }
                        placeholder="ex: 200 ou auto"
                      />
                    </div>
                  </div>
                </div>

                {/* --- LAYERS --- */}
                <div className="space-y-2 pt-3 border-t">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                    Calques
                  </h4>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() =>
                        updateSelectedBlock(
                          "styles",
                          "zIndex",
                          Math.max(1, (selectedBlock.styles?.zIndex || 10) - 1),
                        )
                      }
                      className="flex-1 py-1.5 text-xs bg-gray-100 border rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      ↓ Reculer
                    </button>
                    <div className="w-8 text-center text-xs font-mono border rounded bg-gray-50 py-1.5">
                      {selectedBlock.styles?.zIndex || 10}
                    </div>
                    <button
                      onClick={() =>
                        updateSelectedBlock(
                          "styles",
                          "zIndex",
                          (selectedBlock.styles?.zIndex || 10) + 1,
                        )
                      }
                      className="flex-1 py-1.5 text-xs bg-gray-100 border rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      ↑ Avancer
                    </button>
                  </div>
                </div>

                {/* Delete */}
                <div className="pt-3 border-t">
                  <button
                    onClick={deleteSelected}
                    className="w-full py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    🗑 Supprimer cet élément
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[440px] max-w-full mx-4">
            <h2 className="text-2xl font-bold mb-1">Publier l'invitation</h2>
            <p className="text-sm text-gray-500 mb-6">
              Quelques informations pour finaliser votre publication.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Titre de l'invitation *</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Ex: Mariage de Sarah & Marc"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Date de l'événement *</label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPublishModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-sm disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                {isPublishing ? "⏳ Publication..." : "✅ Confirmer & Publier"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Template Picker — shown before the canvas
// ─────────────────────────────────────────────────────────────────
function TemplatePicker({ onSelect }: { onSelect: (tpl: StarterTemplate) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#fbf8f3] flex flex-col">
      <Toaster richColors position="top-center" />

      {/* Header */}
      <div className="border-b bg-white px-8 py-4 flex items-center justify-between shadow-sm">
        <a href="/" className="font-display text-primary text-2xl font-bold tracking-tight">
          Inviti
        </a>
        <span className="text-sm text-gray-500">Éditeur visuel — Nouvelle invitation</span>
      </div>

      {/* Hero */}
      <div className="text-center py-14 px-4">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c9a961] font-semibold mb-3">
          Éditeur Drag & Drop
        </p>
        <h1 className="text-4xl md:text-5xl font-display text-[#3a2417] mb-4">
          Choisissez votre point de départ
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto text-base">
          Sélectionnez un modèle pré-designé pour commencer rapidement, ou partez d'une toile
          vierge. Tout est personnalisable ensuite.
        </p>
      </div>

      {/* Grid of starter templates */}
      <div className="max-w-5xl mx-auto px-6 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {STARTER_TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl)}
            onMouseEnter={() => setHovered(tpl.id)}
            onMouseLeave={() => setHovered(null)}
            className="group text-left rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
            style={{
              borderColor: hovered === tpl.id ? "#c9a961" : "transparent",
            }}
          >
            {/* Preview thumbnail */}
            <div
              className="h-44 flex items-center justify-center relative overflow-hidden"
              style={{ background: tpl.bgPreview }}
            >
              {/* Mini card preview */}
              <div className="w-28 h-36 rounded-xl shadow-2xl flex flex-col items-center justify-center gap-1 bg-white/10 backdrop-blur-sm border border-white/30">
                <span className="text-3xl">{tpl.emoji}</span>
                <div
                  className="w-16 h-1 rounded"
                  style={{
                    background:
                      tpl.id === "blank"
                        ? "#e2e8f0"
                        : tpl.id === "seminaire"
                          ? "#3b82f6"
                          : tpl.id === "bapteme"
                            ? "#7eb5e0"
                            : "#c9a961",
                  }}
                />
                <div
                  className="w-12 h-0.5 rounded opacity-60"
                  style={{
                    background:
                      tpl.id === "blank"
                        ? "#e2e8f0"
                        : tpl.id === "seminaire"
                          ? "#3b82f6"
                          : tpl.id === "bapteme"
                            ? "#7eb5e0"
                            : "#c9a961",
                  }}
                />
              </div>

              {/* Hover overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hovered === tpl.id ? "opacity-100" : "opacity-0"}`}
                style={{ background: "rgba(0,0,0,0.3)" }}
              >
                <span className="bg-white text-gray-800 font-bold text-sm px-5 py-2 rounded-full shadow">
                  Commencer →
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 bg-white">
              <div className="font-bold text-gray-800 text-base mb-0.5">
                {tpl.emoji} {tpl.name}
              </div>
              <div className="text-xs text-gray-500">{tpl.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-gray-400 pb-8">
        💡 Vous pourrez modifier chaque élément librement dans l'éditeur.
      </p>
    </div>
  );
}
