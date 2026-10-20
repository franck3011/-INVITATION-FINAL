import type { Template } from "@/lib/templates";

export interface GenerativeProps {
  template: Template;
  coverImageUrl: string;
  coverImageUrl2?: string | null;
  title?: string | null;
  hostName?: string | null;
  message?: string | null;
  eventDate?: string | null;
  themeOverrides?: any | null;
  musicUrl?: string | null;
  isBuilder?: boolean;
  onThemeUpdate?: (updates: any) => void;
  onImageUpdate?: (key: string, file: File) => void;
}

export function parseDateParts(iso?: string | null) {
  if (!iso) return { day: "14", month: "Juin", weekday: "Samedi", year: "2026", time: "18h00" };
  try {
    const d = new Date(iso);
    const day = String(d.getUTCDate()).padStart(2, "0");
    const month = d.toLocaleDateString("fr-FR", { month: "long", timeZone: "UTC" });
    const weekday = d.toLocaleDateString("fr-FR", { weekday: "long", timeZone: "UTC" });
    const year = String(d.getUTCFullYear());
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    return {
      day,
      month: month.charAt(0).toUpperCase() + month.slice(1),
      weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
      year,
      time: `${hh}h${mm}`,
    };
  } catch {
    return { day: "14", month: "Juin", weekday: "Samedi", year: "2026", time: "18h00" };
  }
}
