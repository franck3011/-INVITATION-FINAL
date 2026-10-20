import type { PatternId } from "@/lib/templates";

interface Props {
  pattern?: PatternId;
  /** SVG fill/stroke color */
  color?: string;
  /** 0..1 */
  opacity?: number;
  className?: string;
}

/**
 * Tileable decorative SVG patterns rendered as a full-bleed background layer.
 * Uses inline <svg><pattern> so colors stay theme-aware.
 */
export function TemplatePattern({
  pattern = "none",
  color = "currentColor",
  opacity = 0.12,
  className = "",
}: Props) {
  if (!pattern || pattern === "none") return null;

  const id = `pat-${pattern}`;
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        {pattern === "damask" && <DamaskPattern id={id} color={color} />}
        {pattern === "floral" && <FloralPattern id={id} color={color} />}
        {pattern === "artdeco" && <ArtDecoPattern id={id} color={color} />}
        {pattern === "boheme" && <BohemePattern id={id} color={color} />}
        {pattern === "marble" && <MarblePattern id={id} color={color} />}
        {pattern === "watercolor" && <WatercolorPattern id={id} color={color} />}
        {pattern === "eucalyptus" && <EucalyptusPattern id={id} color={color} />}
        {pattern === "monogram" && <MonogramPattern id={id} color={color} />}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function DamaskPattern({ id, color }: { id: string; color: string }) {
  return (
    <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="1">
        <path d="M40 8 C 52 20, 52 28, 40 40 C 28 28, 28 20, 40 8 Z" />
        <path d="M40 40 C 52 52, 52 60, 40 72 C 28 60, 28 52, 40 40 Z" />
        <circle cx="40" cy="40" r="2.5" fill={color} />
        <circle cx="0" cy="0" r="1.5" fill={color} />
        <circle cx="80" cy="0" r="1.5" fill={color} />
        <circle cx="0" cy="80" r="1.5" fill={color} />
        <circle cx="80" cy="80" r="1.5" fill={color} />
        <path d="M10 40 Q 20 30, 30 40 Q 20 50, 10 40 Z" />
        <path d="M50 40 Q 60 30, 70 40 Q 60 50, 50 40 Z" />
      </g>
    </pattern>
  );
}

function FloralPattern({ id, color }: { id: string; color: string }) {
  return (
    <pattern id={id} width="100" height="100" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round">
        {/* branch */}
        <path d="M10 80 Q 30 60, 50 65 Q 70 70, 90 50" />
        <path d="M30 70 q -4 -8, -10 -10" />
        <path d="M50 65 q 0 -10, -6 -14" />
        <path d="M70 60 q 4 -10, 12 -12" />
        {/* petals */}
        <g fill={color} opacity="0.6">
          <circle cx="20" cy="62" r="2" />
          <circle cx="44" cy="51" r="2" />
          <circle cx="82" cy="48" r="2" />
          <circle cx="35" cy="20" r="2" />
          <circle cx="78" cy="18" r="2" />
        </g>
        <path d="M30 25 Q 40 10, 50 25 Q 40 30, 30 25 Z" />
        <path d="M65 30 Q 75 15, 85 30 Q 75 35, 65 30 Z" />
      </g>
    </pattern>
  );
}

function ArtDecoPattern({ id, color }: { id: string; color: string }) {
  return (
    <pattern id={id} width="60" height="60" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="1">
        {/* fan */}
        <path d="M30 50 L 10 20" />
        <path d="M30 50 L 18 18" />
        <path d="M30 50 L 30 14" />
        <path d="M30 50 L 42 18" />
        <path d="M30 50 L 50 20" />
        <path d="M10 20 Q 30 0, 50 20" />
        <path d="M18 24 Q 30 12, 42 24" />
        {/* diamond */}
        <path d="M30 52 L 36 58 L 30 64 L 24 58 Z" fill={color} />
      </g>
    </pattern>
  );
}

function BohemePattern({ id, color }: { id: string; color: string }) {
  return (
    <pattern id={id} width="120" height="120" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round">
        {/* pampas */}
        <path d="M20 110 Q 22 70, 28 30" />
        <g stroke={color} strokeWidth="0.6">
          <path d="M22 90 q -6 -2, -10 -8" />
          <path d="M22 75 q -7 -1, -12 -6" />
          <path d="M24 60 q -7 0, -12 -5" />
          <path d="M26 45 q -6 1, -11 -3" />
          <path d="M22 90 q 6 -2, 10 -8" />
          <path d="M22 75 q 7 -1, 12 -6" />
          <path d="M24 60 q 7 0, 12 -5" />
          <path d="M26 45 q 6 1, 11 -3" />
        </g>
        <path d="M90 115 Q 92 80, 96 45" />
        <g stroke={color} strokeWidth="0.6">
          <path d="M92 95 q -6 -2, -10 -7" />
          <path d="M92 80 q -7 -1, -12 -5" />
          <path d="M94 65 q -7 0, -12 -4" />
          <path d="M92 95 q 6 -2, 10 -7" />
          <path d="M92 80 q 7 -1, 12 -5" />
          <path d="M94 65 q 7 0, 12 -4" />
        </g>
        {/* small leaves */}
        <path d="M55 30 q 5 -8, 12 -6 q -3 8, -12 6 Z" />
        <path d="M65 80 q 6 -7, 13 -5 q -3 8, -13 5 Z" />
      </g>
    </pattern>
  );
}

function MarblePattern({ id, color }: { id: string; color: string }) {
  return (
    <pattern id={id} width="200" height="200" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="0.6" strokeLinecap="round">
        <path d="M0 30 Q 50 10, 100 35 T 200 28" />
        <path d="M0 80 Q 60 70, 110 90 T 200 75" />
        <path d="M0 130 Q 40 110, 90 130 T 200 125" />
        <path d="M0 175 Q 70 160, 130 185 T 200 170" />
        <path d="M30 0 Q 40 50, 20 100 T 35 200" opacity="0.6" />
        <path d="M150 0 Q 165 60, 145 110 T 160 200" opacity="0.6" />
      </g>
    </pattern>
  );
}

function WatercolorPattern({ id, color }: { id: string; color: string }) {
  return (
    <pattern id={id} width="180" height="180" patternUnits="userSpaceOnUse">
      <g fill={color} opacity="0.35">
        <ellipse cx="40" cy="50" rx="38" ry="22" />
        <ellipse cx="130" cy="40" rx="30" ry="18" />
        <ellipse cx="60" cy="120" rx="44" ry="26" />
        <ellipse cx="150" cy="140" rx="28" ry="20" />
      </g>
      <g fill="none" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
        <path d="M30 50 q 10 -18 22 -8 q 8 12 -4 20 q -12 6 -18 -12 Z" />
        <path d="M130 40 q 10 -14 18 -4 q 6 10 -4 16 q -10 4 -14 -12 Z" />
        <path d="M58 122 q 12 -16 22 -6 q 6 12 -6 18 q -12 4 -16 -12 Z" />
      </g>
    </pattern>
  );
}

function EucalyptusPattern({ id, color }: { id: string; color: string }) {
  return (
    <pattern id={id} width="160" height="160" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round">
        {/* curved branch */}
        <path d="M-10 30 Q 40 50 80 35 T 170 50" />
        <path d="M-10 120 Q 50 100 90 130 T 170 110" />
      </g>
      <g fill={color} opacity="0.7">
        {/* leaves along branches */}
        <ellipse cx="20" cy="35" rx="6" ry="3" transform="rotate(20 20 35)" />
        <ellipse cx="40" cy="42" rx="6" ry="3" transform="rotate(-15 40 42)" />
        <ellipse cx="62" cy="36" rx="7" ry="3.5" transform="rotate(25 62 36)" />
        <ellipse cx="92" cy="40" rx="6" ry="3" transform="rotate(-20 92 40)" />
        <ellipse cx="120" cy="44" rx="7" ry="3.5" transform="rotate(15 120 44)" />
        <ellipse cx="148" cy="50" rx="6" ry="3" transform="rotate(-10 148 50)" />
        <ellipse cx="20" cy="118" rx="6" ry="3" transform="rotate(-15 20 118)" />
        <ellipse cx="50" cy="112" rx="7" ry="3.5" transform="rotate(20 50 112)" />
        <ellipse cx="80" cy="124" rx="6" ry="3" transform="rotate(-25 80 124)" />
        <ellipse cx="110" cy="120" rx="7" ry="3.5" transform="rotate(15 110 120)" />
        <ellipse cx="140" cy="115" rx="6" ry="3" transform="rotate(-10 140 115)" />
      </g>
    </pattern>
  );
}

function MonogramPattern({ id, color }: { id: string; color: string }) {
  return (
    <pattern id={id} width="140" height="140" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="0.7" strokeLinecap="round">
        <circle cx="70" cy="70" r="34" />
        <circle cx="70" cy="70" r="28" opacity="0.6" />
        <path d="M52 60 L 60 86 M60 60 L 60 86 M60 60 L 76 86 M76 60 L 76 86" opacity="0.5" />
        <path d="M82 60 q 8 0 8 8 q 0 8 -8 8 L 82 86" opacity="0.5" />
        <path d="M30 70 H 14 M126 70 H 110" />
        <path d="M70 30 V 14 M70 126 V 110" />
      </g>
    </pattern>
  );
}
