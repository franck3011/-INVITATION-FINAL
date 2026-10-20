import React from "react";
import { Settings, Image as ImageIcon, Upload, X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface InlineTextEditorProps {
  children: React.ReactNode;
  themeKey: string;
  currentFontSize?: number | null;
  currentColor?: string | null;
  currentFont?: string | null;
  currentBgColor?: string | null;
  currentPadding?: number | null;
  currentHidden?: boolean | null;
  onUpdate: (updates: any) => void;
  isBuilder?: boolean;
  currentText?: string | null;
  textKey?: string;
  textLabel?: string;
}

export function InlineTextEditor({
  children,
  themeKey,
  currentFontSize,
  currentColor,
  currentFont,
  currentBgColor,
  currentPadding,
  currentHidden,
  onUpdate,
  isBuilder,
  currentText,
  textKey,
  textLabel,
}: InlineTextEditorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (currentHidden && !isBuilder) return null;

  if (!isBuilder) return <>{children}</>;

  if (currentHidden) {
    return (
      <button
        onClick={(e) => { e.stopPropagation(); onUpdate({ ['hide' + themeKey]: false }); }}
        className="flex items-center justify-center gap-2 w-full max-w-[200px] mx-auto py-2 my-2 text-xs font-medium text-white bg-slate-800 rounded-md hover:bg-slate-700 shadow-sm transition-colors cursor-pointer"
        title="Restaurer cet élément"
      >
        <span className="opacity-70">Masqué</span>
        <span className="underline decoration-white/50">Restaurer</span>
      </button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
          <div 
            className="relative group cursor-pointer inline-block transition-all hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:rounded-sm pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
          {children}
          <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-50">
            <Settings className="w-3 h-3" />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent 
        className="w-72 p-4 z-[99999]" 
        align="center"
        sideOffset={8}
        onPointerDownOutside={() => setIsOpen(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm">Modifier le texte et style</h4>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {textKey && (
          <div className="space-y-1.5 mb-3 pb-3 border-b">
            <label className="text-xs font-medium text-muted-foreground block">
              {textLabel || "Texte"}
            </label>
            <input
              type="text"
              value={currentText ?? ""}
              onChange={(e) => onUpdate({ [textKey]: e.target.value })}
              placeholder="Modifier le texte..."
              className="w-full text-xs border border-border rounded p-1.5 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground block">Police</label>
            <select
              value={currentFont || ""}
              onChange={(e) => onUpdate({ ["font" + themeKey]: e.target.value || null })}
              className="w-full text-xs border border-border rounded p-1"
            >
              <option value="">Par défaut</option>
              <option value="script">Manuscrite</option>
              <option value="display">Élégante</option>
              <option value="serif">Classique</option>
              <option value="sans">Moderne</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground block">Couleur texte</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentColor || "#000000"}
                onChange={(e) => onUpdate({ [themeKey.charAt(0).toLowerCase() + themeKey.slice(1) + "Color"]: e.target.value })}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground block">Arrière-plan</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentBgColor || "#ffffff"}
                onChange={(e) => onUpdate({ ["bg" + themeKey]: e.target.value })}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <button 
                onClick={() => onUpdate({ ["bg" + themeKey]: null })}
                className="text-[10px] underline text-muted-foreground"
              >
                Transparent
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-2 pt-4 mt-4 border-t">
          <label className="text-xs font-medium text-muted-foreground block">Taille (px)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="10"
              max="120"
              value={currentFontSize || 30}
              onChange={(e) => onUpdate({ ["fontSize" + themeKey]: parseInt(e.target.value) })}
              className="w-full"
            />
            <span className="text-xs w-8 text-right">{currentFontSize || "Auto"}</span>
          </div>
        </div>
        <div className="space-y-2 pt-4 mt-4 border-t">
          <label className="text-xs font-medium text-muted-foreground block">Espacement (Fond)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="64"
              value={currentPadding ?? 12}
              onChange={(e) => onUpdate({ ["padding" + themeKey]: parseInt(e.target.value) })}
              className="w-full"
            />
            <span className="text-xs w-8 text-right">{currentPadding ?? "Auto"}</span>
          </div>
        </div>
        <div className="pt-4 mt-4 border-t">
          <button 
            onClick={() => onUpdate({ ["hide" + themeKey]: true })}
            className="w-full text-red-500 text-xs font-medium hover:underline text-left flex items-center justify-center gap-2"
          >
            <X className="w-3 h-3" /> Masquer cet élément
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface InlineImageEditorProps {
  children: React.ReactNode;
  onImageUpload: (file: File) => void;
  isBuilder?: boolean;
}

export function InlineImageEditor({
  children,
  onImageUpload,
  isBuilder,
}: InlineImageEditorProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!isBuilder) return <>{children}</>;

  return (
    <div
      className="relative group cursor-pointer inline-block w-full h-full transition-all hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:rounded-md pointer-events-auto select-none"
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInputRef.current?.click();
      }}
    >
      {children}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md z-50 pointer-events-none">
        <div className="bg-white text-black px-3 py-2 rounded-full flex items-center gap-2 text-sm shadow-lg font-medium">
          <Upload className="w-4 h-4" />
          Changer l'image
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onImageUpload(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}
