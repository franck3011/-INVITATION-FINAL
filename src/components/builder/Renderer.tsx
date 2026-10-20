import React from "react";
import type { BlockNode } from "./types";
import { Rnd } from "react-rnd";
import * as LucideIcons from "lucide-react";

export interface RendererProps {
  blocks: BlockNode[];
  isEditMode?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onUpdateTransform?: (
    id: string,
    position: { x: number; y: number },
    size: { width: string | number; height: string | number },
  ) => void;
}

export function Renderer({
  blocks,
  isEditMode,
  selectedId,
  onSelect,
  onUpdateTransform,
}: RendererProps) {
  return (
    <>
      {blocks.map((block) => (
        <BlockWrapper
          key={block.id}
          block={block}
          isEditMode={isEditMode}
          selectedId={selectedId}
          onSelect={onSelect}
          onUpdateTransform={onUpdateTransform}
        />
      ))}
    </>
  );
}

interface BlockRendererProps {
  block: BlockNode;
  isEditMode?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onUpdateTransform?: (
    id: string,
    position: { x: number; y: number },
    size: { width: string | number; height: string | number },
  ) => void;
}

function BlockWrapper(props: BlockRendererProps) {
  const { block, isEditMode, selectedId, onSelect, onUpdateTransform } = props;

  if (block.id === "root-section-1") {
    // The root section acts as the relative canvas.
    return (
      <div className="w-full relative" style={{ ...block.styles, overflow: "hidden" }}>
        {block.children?.map((child) => (
          <BlockWrapper
            key={child.id}
            block={child}
            isEditMode={isEditMode}
            selectedId={selectedId}
            onSelect={onSelect}
            onUpdateTransform={onUpdateTransform}
          />
        ))}
      </div>
    );
  }

  const isSelected = isEditMode && selectedId === block.id;

  // Edit mode with react-rnd
  if (isEditMode) {
    return (
      <Rnd
        position={block.position || { x: 0, y: 0 }}
        size={block.size || { width: "auto", height: "auto" }}
        cancel=".no-drag"
        onDragStop={(e, d) => {
          if (onUpdateTransform) {
            onUpdateTransform(
              block.id,
              { x: d.x, y: d.y },
              block.size || { width: "auto", height: "auto" },
            );
          }
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          if (onUpdateTransform) {
            onUpdateTransform(block.id, position, {
              width: ref.style.width,
              height: ref.style.height,
            });
          }
        }}
        className={
          isSelected ? "ring-2 ring-primary ring-inset z-50" : "hover:ring-1 hover:ring-primary/50"
        }
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: isSelected ? 1000 : block.styles?.zIndex || 10,
        }}
      >
        <div
          className={`no-drag absolute -top-6 left-0 text-[10px] px-2 py-1 rounded-t-md z-50 whitespace-nowrap cursor-pointer transition-colors text-white ${isSelected ? "bg-primary" : "bg-gray-400 hover:bg-gray-600"}`}
          onMouseDown={(e) => {
            e.stopPropagation();
            onSelect?.(block.id);
          }}
        >
          {isSelected ? block.type : `Sélectionner ${block.type}`}
        </div>
        <div className="w-full" style={{ height: block.size?.height === "auto" ? "auto" : "100%" }}>
          <BlockRendererCore block={block} />
        </div>
      </Rnd>
    );
  }

  // View mode (absolute positioned)
  return (
    <div
      style={{
        position: "absolute",
        left: block.position?.x || 0,
        top: block.position?.y || 0,
        width: block.size?.width || "auto",
        height: block.size?.height || "auto",
        zIndex: block.styles?.zIndex || 10,
      }}
    >
      <BlockRendererCore block={block} />
    </div>
  );
}

function BlockRendererCore({ block }: { block: BlockNode }) {
  const { type, props, styles } = block;
  const inlineStyles: React.CSSProperties = { ...styles } as any;

  switch (type) {
    case "Text":
      return (
        <p style={inlineStyles} {...props}>
          {props.text || "Texte vide"}
        </p>
      );
    case "Heading":
      const Tag = (props.level || "h2") as any;
      return (
        <Tag style={inlineStyles} {...props}>
          {props.text || "Titre"}
        </Tag>
      );
    case "Image":
      return (
        <div style={{ width: "100%", height: "100%", display: inlineStyles.display || "block" }}>
          <img
            src={props.src || "https://placehold.co/600x400?text=Image"}
            alt={props.alt || "Image"}
            style={{ ...inlineStyles, width: "100%", height: "100%", objectFit: "cover" }}
            {...props}
          />
        </div>
      );
    case "Button":
      return (
        <div style={{ display: inlineStyles.display || "inline-block" }}>
          <a
            href={props.href || "#"}
            style={{
              display: "inline-block",
              padding: "10px 24px",
              backgroundColor: "#000",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              textAlign: "center",
              ...inlineStyles,
            }}
            onClick={(e) => e.preventDefault()}
            {...props}
          >
            {props.text || "Bouton"}
          </a>
        </div>
      );
    case "Spacer":
      return (
        <div
          style={{ minHeight: props.height || "20px", width: "100%", ...inlineStyles }}
          {...props}
        />
      );
    case "Divider":
      return (
        <div style={{ padding: "10px 0", width: "100%", ...inlineStyles }}>
          <hr
            style={{
              borderTop: `${props.thickness || 1}px ${props.style || "solid"} ${props.color || "#ccc"}`,
              width: "100%",
            }}
          />
        </div>
      );
    case "Video":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: "200px",
            backgroundColor: "#000",
            ...inlineStyles,
          }}
        >
          {props.src ? (
            <iframe
              src={props.src}
              className="w-full h-full border-0 pointer-events-none"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">
              Vidéo
            </div>
          )}
        </div>
      );
    case "Map":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: "200px",
            backgroundColor: "#e5e7eb",
            ...inlineStyles,
          }}
        >
          {props.src ? (
            <iframe
              src={props.src}
              className="w-full h-full border-0 pointer-events-none"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              Google Map
            </div>
          )}
        </div>
      );
    case "Icon":
      const IconComponent = (LucideIcons as any)[props.iconName || "Star"];
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            ...inlineStyles,
          }}
        >
          {IconComponent ? (
            <IconComponent size={props.size || "100%"} color={props.color || "currentColor"} />
          ) : (
            <span>Icon?</span>
          )}
        </div>
      );
    case "Motif":
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            ...inlineStyles,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke={props.color || "currentColor"}
            strokeWidth="1"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" />
          </svg>
        </div>
      );
    case "Countdown":
      return (
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            ...inlineStyles,
          }}
        >
          <div className="flex flex-col items-center justify-center bg-white shadow rounded p-2 flex-1">
            <span className="text-xl font-bold">12</span>
            <span className="text-[10px] uppercase">Jours</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-white shadow rounded p-2 flex-1">
            <span className="text-xl font-bold">08</span>
            <span className="text-[10px] uppercase">Heures</span>
          </div>
        </div>
      );
    case "Gallery":
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            width: "100%",
            height: "100%",
            ...inlineStyles,
          }}
        >
          <div className="bg-gray-200 rounded w-full h-full min-h-[50px]"></div>
          <div className="bg-gray-200 rounded w-full h-full min-h-[50px]"></div>
        </div>
      );
    case "RsvpForm":
      return (
        <div
          className={`bg-white p-6 rounded-lg shadow-sm border w-full h-full`}
          style={inlineStyles}
        >
          <h3 className="font-bold text-lg mb-4">{props.title || "Formulaire RSVP"}</h3>
          <div className="space-y-4 opacity-70 pointer-events-none">
            <input type="text" placeholder="Prénom & Nom" className="w-full border rounded p-2" />
            <div className="flex gap-4">
              <label>
                <input type="radio" /> Oui
              </label>
              <label>
                <input type="radio" /> Non
              </label>
            </div>
            <button className="w-full bg-primary text-primary-foreground p-2 rounded">
              Confirmer
            </button>
          </div>
        </div>
      );
    default:
      // Removed Columns/Column for Canva mode, or they can just render as boxes
      return (
        <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-white/50">
          {type} (Free layout)
        </div>
      );
  }
}
