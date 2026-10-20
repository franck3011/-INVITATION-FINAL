import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { getTemplate, isSeminaireTemplate } from "@/lib/templates";
import { getEventBySlug, submitRsvp, getPublicWishes } from "@/fns/events.functions";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";
import { EnvelopeIntro } from "@/components/envelope-intro";
import { TapToEnter } from "@/components/tap-to-enter";
import { TemplatePattern } from "@/components/template-pattern";
import { TemplateEffects } from "@/components/template-effects";
import {
  PreviewInvitation,
  getPalette,
  getTitleFontClass,
  type ThemeOverrides,
} from "@/components/preview-invitation";
import { Renderer } from "@/components/builder/Renderer";
import { RsvpReport } from "@/components/rsvp-report";
import React from "react";

const ScrollAnimationContext = React.createContext<
  "fade-blur" | "fade-slide" | "scale-up" | "none" | null
>("fade-blur");

interface ProgramItem {
  time: string;
  title: string;
  description?: string | null;
}

// Auto-detect a fitting emoji icon for a program step based on keywords.
function iconForStep(title: string, description?: string | null): string {
  const t = `${title} ${description ?? ""}`.toLowerCase();
  if (/(accueil|arriv|welcome|réception|reception)/.test(t)) return "🌿";
  if (/(cérémon|ceremon|mariage|union|échange|engagement|nikah|bénédict)/.test(t)) return "💍";
  if (/(cocktail|apéro|apero|verre|vin d'honneur|champagne)/.test(t)) return "🥂";
  if (/(photo|shoot|portrait)/.test(t)) return "📸";
  if (/(dîner|diner|repas|menu|table|brunch|déjeuner|dejeuner)/.test(t)) return "🍽";
  if (/(gâteau|gateau|pièce montée|piece montee|dessert)/.test(t)) return "🎂";
  if (/(dans|soir|fête|fete|after|dj|musique|bal)/.test(t)) return "💃";
  if (/(feu|artifice|firework)/.test(t)) return "🎆";
  if (/(discours|speech|témoin|temoin)/.test(t)) return "🎤";
  if (/(bapt|baptê|baptem)/.test(t)) return "👼";
  if (/(anniversaire|bougie|cadeau)/.test(t)) return "🎉";
  return "✦";
}

// Parse "HH:MM" or "HHhMM" / "HHh" into minutes from midnight; null if not parseable.
function parseTimeMinutes(s: string | undefined): number | null {
  if (!s) return null;
  const m = s.trim().match(/^(\d{1,2})\s*[:hH]\s*(\d{0,2})/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  if (isNaN(h) || isNaN(min)) return null;
  return h * 60 + min;
}

export const Route = createFileRoute("/i/$slug")({
  loader: async ({ params }) => {
    const ev = await getEventBySlug({ data: { slug: params.slug } });
    if (!ev) throw notFound();
    return { event: ev, expired: false };
  },
  head: ({ loaderData }) => {
    const ev = loaderData?.event;
    if (!ev) return { meta: [{ title: "Invitation — Inviti" }] };
    const desc = ev.message
      ? ev.message.slice(0, 160)
      : `Invitation pour ${ev.title} — ${ev.location}`;
    return {
      meta: [
        { title: `${ev.title} — Vous êtes invité·e` },
        { name: "description", content: desc },
        { property: "og:title", content: `${ev.title} — Vous êtes invité·e` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        ...(ev.cover_image_url
          ? [
              { property: "og:image", content: ev.cover_image_url },
              { property: "og:image:width", content: "1200" },
              { property: "og:image:height", content: "630" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:image", content: ev.cover_image_url },
            ]
          : [{ name: "twitter:card", content: "summary" }]),
        { name: "twitter:title", content: `${ev.title} — Vous êtes invité·e` },
        { name: "twitter:description", content: desc },
      ],
    };
  },
  component: PublicInvite,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <h1 className="font-display text-3xl text-primary">Invitation introuvable</h1>
        <p className="text-muted-foreground mt-2">Le lien semble incorrect.</p>
      </div>
    </div>
  ),
});

function formatDate(d: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(new Date(d));
  } catch {
    return d;
  }
}

function hexToHslString(hex: string) {
  if (!hex) return "";
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  } else {
    return "";
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

function Reveal({
  children,
  delay = 0,
  scale = false,
}: {
  children: React.ReactNode;
  delay?: number;
  scale?: boolean;
}) {
  const animationStyle = React.useContext(ScrollAnimationContext) || "fade-blur";

  if (animationStyle === "none") {
    return <>{children}</>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let initial: any = { opacity: 0 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let whileInView: any = { opacity: 1 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transition: any = { duration: 1, delay, ease: "easeOut" };

  if (animationStyle === "fade-blur") {
    initial = { opacity: 0, y: 40, scale: scale ? 0.95 : 1, filter: "blur(4px)" };
    whileInView = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
    transition.ease = [0.25, 0.1, 0.25, 1];
  } else if (animationStyle === "fade-slide") {
    initial = { opacity: 0, y: 40 };
    whileInView = { opacity: 1, y: 0 };
    transition.duration = 0.8;
  } else if (animationStyle === "scale-up") {
    initial = { opacity: 0, scale: 0.9 };
    whileInView = { opacity: 1, scale: 1 };
    transition.duration = 0.6;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-10%" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

function CountdownUnit({ value, label, ready }: { value: number; label: string; ready: boolean }) {
  const display = ready ? String(value).padStart(2, "0") : "––";
  const prevRef = useRef(display);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (ready && prevRef.current !== display) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 300);
      prevRef.current = display;
      return () => clearTimeout(t);
    }
  }, [display, ready]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "relative w-16 h-20 md:w-24 md:h-28 rounded-xl md:rounded-2xl",
          "bg-white/70 backdrop-blur-sm shadow-md border border-accent/20",
          "flex items-center justify-center overflow-hidden",
          "transition-transform duration-150",
          flip ? "scale-95" : "scale-100",
        ].join(" ")}
      >
        <span className="font-display text-4xl md:text-6xl text-accent tabular-nums select-none leading-none">
          {display}
        </span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-accent/10 pointer-events-none" />
      </div>
      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
        {label}
      </span>
    </div>
  );
}

function toCalDate(iso: string) {
  const d = new Date(iso);
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function downloadIcs(
  title: string,
  start: string,
  end: string,
  location: string,
  description: string,
) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Inviti//FR",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@inviti`,
    `DTSTAMP:${toCalDate(new Date().toISOString())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "invitation.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function AddToCalendar({
  title,
  date,
  location,
  description,
}: {
  title: string;
  date: string;
  location: string;
  description?: string | null;
}) {
  const [open, setOpen] = useState(false);

  const start = toCalDate(date);
  // Default to +6h after start
  const endDate = new Date(new Date(date).getTime() + 6 * 60 * 60 * 1000);
  const end = toCalDate(endDate.toISOString());
  const desc = description ?? "";

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(location)}`;
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${date}&enddt=${endDate.toISOString()}&location=${encodeURIComponent(location)}&body=${encodeURIComponent(desc)}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`;

  return (
    <div className="relative flex justify-center mt-10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-white/70 backdrop-blur-sm px-5 py-2.5 text-sm text-primary shadow-sm hover:bg-accent/10 hover:border-accent transition"
      >
        <span className="text-base">📅</span>
        Ajouter au calendrier
        <span className={`text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 z-50 min-w-[200px] bg-white rounded-xl shadow-xl border border-border/40 overflow-hidden"
          >
            <a
              href={googleUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-accent/10 transition"
            >
              <span className="text-lg">🗓️</span> Google Calendar
            </a>
            <button
              type="button"
              onClick={() => {
                downloadIcs(title, start, end, location, desc);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-accent/10 transition"
            >
              <span className="text-lg">🍎</span> Apple Calendrier
            </button>
            <a
              href={outlookUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-accent/10 transition"
            >
              <span className="text-lg">📧</span> Outlook
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />}
    </div>
  );
}

function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = now == null ? null : new Date(target).getTime() - now;
  const past = diff !== null && diff <= 0;

  const days = diff == null ? 0 : Math.floor(Math.max(0, diff) / 86400000);
  const hours = diff == null ? 0 : Math.floor((Math.max(0, diff) % 86400000) / 3600000);
  const mins = diff == null ? 0 : Math.floor((Math.max(0, diff) % 3600000) / 60000);
  const secs = diff == null ? 0 : Math.floor((Math.max(0, diff) % 60000) / 1000);
  const ready = now !== null;

  if (past) {
    return (
      <div className="text-center py-4" suppressHydrationWarning>
        <div className="text-4xl mb-3">💍</div>
        <p className="font-display text-2xl md:text-3xl text-primary">Le grand jour est arrivé !</p>
        <p className="text-muted-foreground text-sm mt-2">
          Merci d'être là pour célébrer cet amour.
        </p>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning>
      <div className="flex justify-center items-end gap-2 md:gap-4">
        <CountdownUnit value={days} label="jours" ready={ready} />
        <span className="font-display text-3xl md:text-5xl text-accent/40 pb-8 select-none">:</span>
        <CountdownUnit value={hours} label="heures" ready={ready} />
        <span className="font-display text-3xl md:text-5xl text-accent/40 pb-8 select-none">:</span>
        <CountdownUnit value={mins} label="minutes" ready={ready} />
        <span className="font-display text-3xl md:text-5xl text-accent/40 pb-8 select-none">:</span>
        <CountdownUnit value={secs} label="secondes" ready={ready} />
      </div>
    </div>
  );
}

function PublicInvite() {
  const { event, expired } = Route.useLoaderData();
  const template = getTemplate(event.template_id) ?? getTemplate("mariage-dore")!;
  const submit = useServerFn(submitRsvp);
  const fetchWishes = useServerFn(getPublicWishes);

  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"yes" | "no" | "maybe">("yes");
  const [guestCount, setGuestCount] = useState(1);
  const [accompanyingNames, setAccompanyingNames] = useState<string[]>([]);
  const [dietRestrictions, setDietRestrictions] = useState("");
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  // Champs séminaire
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Anti-spam & CAPTCHA state
  const [websiteUrl, setWebsiteUrl] = useState("");
  const formLoadedAtRef = useRef<number>(Date.now());
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    if (import.meta.env.VITE_TURNSTILE_SITE_KEY && !(window as any).turnstile) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  // Intro / opening state
  const [entered, setEntered] = useState(false);
  const [opening, setOpening] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [entered]);

  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleEnter() {
    // user gesture — start music if available
    if (event.music_url && audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .then(() => setMusicOn(true))
        .catch(() => {});
    }
    const shouldShowEnvelope = themeOverrides?.forceEnvelope || template.hasEnvelope;
    if (shouldShowEnvelope) {
      setOpening(true);
      window.setTimeout(() => setEntered(true), 1500);
    } else {
      setEntered(true);
    }
  }

  function toggleMusic() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.muted = false;
      a.play()
        .then(() => setMusicOn(true))
        .catch(() => {});
    } else {
      a.pause();
      setMusicOn(false);
    }
  }

  const programRaw = event.program;
  const program: ProgramItem[] = Array.isArray(programRaw)
    ? (programRaw as unknown as ProgramItem[])
    : [];

  // Compute which step is "active now" based on time-of-day, only if it's the event day.
  const eventDayKey = new Date(event.event_date).toDateString();
  const [nowMinutes, setNowMinutes] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNowMinutes(d.toDateString() === eventDayKey ? d.getHours() * 60 + d.getMinutes() : null);
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [eventDayKey]);

  let activeStepIndex = -1;
  if (nowMinutes !== null && program.length > 0) {
    for (let i = 0; i < program.length; i++) {
      const m = parseTimeMinutes(program[i].time);
      if (m !== null && m <= nowMinutes) activeStepIndex = i;
    }
  }

  // Page-wide scroll progress for the top progress bar.
  const { scrollYProgress: pageProgress } = useScroll();

  // Hero parallax — image translates slower than scroll.
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.4]);

  // Live wishes wall (public messages from other guests)
  const [wishes, setWishes] = useState<
    { name: string; status: "yes" | "no" | "maybe"; message: string; created_at: string }[]
  >([]);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [guestsCount, setGuestsCount] = useState(0);
  useEffect(() => {
    let cancelled = false;
    const load = () =>
      fetchWishes({ data: { slug: event.slug } })
        .then((d) => {
          if (cancelled) return;
          setWishes(d.wishes);
          setConfirmedCount(d.confirmed);
          setGuestsCount(d.guests);
        })
        .catch(() => {});
    if (entered) load();
    const id = window.setInterval(() => entered && load(), 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [event.slug, entered, fetchWishes]);

  // Share helpers
  const [shareOpen, setShareOpen] = useState(false);
  function inviteUrl() {
    return typeof window !== "undefined" ? window.location.href : "";
  }
  function shareText() {
    return `Vous êtes invité·e à ${event.title} — ${formatDate(event.event_date)}`;
  }
  async function nativeShare() {
    const url = inviteUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, text: shareText(), url });
        return;
      } catch {}
    }
    setShareOpen((v) => !v);
  }
  function copyLink() {
    navigator.clipboard.writeText(inviteUrl());
    toast.success("Lien copié !");
    setShareOpen(false);
  }

  const gallery = (event.gallery_urls ?? []) as string[];
  const themeOverrides = (event as any).theme_overrides as ThemeOverrides | null;
  const maxGuestsLimit = (event as any).max_guests_per_rsvp || themeOverrides?._ext?.maxGuestsPerRsvp || 20;
  const dark = !!template.dark;
  const palette = getPalette(template, themeOverrides);
  // CSS variable overrides apply the template's palette to EVERY section of the page,
  // so the entire invitation shares one unified background (the same as the hero).
  const pageThemeStyle: React.CSSProperties = {
    ["--ivory" as any]: palette.bg,
    ["--background" as any]: palette.bg,
    ["--foreground" as any]: palette.text,
    ["--muted-foreground" as any]: palette.sub,
    ["--accent" as any]: palette.accent,
    ["--primary" as any]: palette.accent,
    ["--primary-foreground" as any]: palette.bg,
    ["--secondary" as any]: dark
      ? `color-mix(in oklab, ${palette.bg} 80%, white)`
      : `color-mix(in oklab, ${palette.bg} 90%, black)`,
    ["--secondary-foreground" as any]: palette.text,
    ["--card" as any]: dark
      ? `color-mix(in oklab, ${palette.bg} 78%, white)`
      : `color-mix(in oklab, ${palette.bg} 70%, white)`,
    ["--card-foreground" as any]: palette.text,
    ["--border" as any]: palette.rule,
    ["--muted" as any]: dark
      ? `color-mix(in oklab, ${palette.bg} 85%, white)`
      : `color-mix(in oklab, ${palette.bg} 92%, black)`,
    background: palette.bg,
    color: palette.text,
    ["--title-color" as any]: palette.titleColor,
    ["--subtitle-color" as any]: palette.subtitleColor,
  };
  const titleClass = `${getTitleFontClass(template, themeOverrides)} text-4xl sm:text-5xl md:text-7xl lg:text-8xl`;
  const titleStyle: React.CSSProperties = themeOverrides?.fontSizeTitle
    ? { fontSize: themeOverrides.fontSizeTitle + "px" }
    : {};
  const isWedding = template.category === "mariage";
  const isSeminaire = isSeminaireTemplate(event.template_id) || template.category === "seminaire";

  // Vérification deadline RSVP côté client
  const rsvpDeadline = (event as any).rsvp_deadline || (event as any).link_expires_at || null;
  const [rsvpClosed, setRsvpClosed] = useState(() =>
    rsvpDeadline ? new Date(rsvpDeadline) < new Date() : false,
  );
  useEffect(() => {
    if (!rsvpDeadline) return;
    const check = () => setRsvpClosed(new Date(rsvpDeadline) < new Date());
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, [rsvpDeadline]);

  // RSVPs pour le rapport (chargés depuis wishes)
  const [rsvpsForReport, setRsvpsForReport] = useState<
    { status: string; guest_count?: number | null }[]
  >([]);

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`;
  const mapLink =
    (event as any).map_link ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;

  if (expired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory text-foreground p-8">
        <div className="max-w-md text-center space-y-4">
          <div className="text-5xl">⌛</div>
          <h1 className="font-display text-3xl text-primary">Invitation expirée</h1>
          <p className="text-muted-foreground">
            Le lien de cette invitation n'est plus valide. Contactez l'hôte pour plus
            d'informations.
          </p>
        </div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rsvpClosed) {
      toast.error("Les réponses sont clôturées.");
      return;
    }
    if (!name.trim()) {
      toast.error("Votre nom est requis");
      return;
    }
    const cleanAccompanying = guestCount > 1
      ? accompanyingNames.slice(0, guestCount - 1).map((n) => (n || "").trim()).filter(Boolean)
      : [];
    if (status === "yes" && guestCount > 1 && cleanAccompanying.length < guestCount - 1) {
      toast.error(`Veuillez renseigner le nom de chaque personne accompagnante (${cleanAccompanying.length}/${guestCount - 1})`);
      return;
    }
    setSubmitting(true);
    try {
      await submit({
        data: {
          slug: event.slug,
          name,
          status,
          guestCount,
          dietRestrictions: dietRestrictions || null,
          message: rsvpMessage || null,
          company: company || null,
          jobTitle: jobTitle || null,
          phone: phone || null,
          email: email || null,
          websiteUrl: websiteUrl || null,
          formLoadedAt: formLoadedAtRef.current,
          turnstileToken: turnstileToken || null,
          accompanyingNames: cleanAccompanying.length > 0 ? cleanAccompanying : null,
        },
      });
      if (status === "yes") {
        const confetti = (await import("canvas-confetti")).default;
        confetti({ particleCount: 150, spread: 80, colors: ["#C9A961", "#6B1E2E", "#FBF7F0"] });
      }
      setDone(true);
    } catch (err: any) {
      console.error(err);
      const msg = err?.message || err?.data?.message || "Erreur, réessayez";
      const cleanMsg = msg.includes("Error:") ? msg.split("Error:")[1].trim() : msg;
      toast.error(cleanMsg);
    } finally {
      setSubmitting(false);
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <ScrollAnimationContext.Provider value={themeOverrides?.scrollAnimation || "fade-blur"}>
      <div
        className="min-h-screen"
        style={{
          ...pageThemeStyle,
          ...(themeOverrides?.fontWeightAll
            ? { fontWeight: themeOverrides.fontWeightAll }
            : themeOverrides?.allBold
              ? { fontWeight: 700 }
              : {}),
        }}
      >
        <Toaster richColors position="top-center" />

        {/* Back to top button */}
        <AnimatePresence>
          {showNav && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-xl"
              style={{ background: "var(--accent, #C9A961)", color: "#fff" }}
              aria-label="Retour en haut"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>

        {/* Top scroll progress bar */}
        <motion.div
          style={{ scaleX: pageProgress }}
          className="fixed top-0 inset-x-0 z-50 h-[3px] bg-gradient-to-r from-accent via-amber-400 to-accent origin-left"
          aria-hidden
        />

        {/* Sticky nav */}
        <AnimatePresence>
          {showNav && (
            <motion.nav
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              className="fixed top-0 inset-x-0 z-40 bg-ivory/90 backdrop-blur border-b border-border/40"
            >
              <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="font-display text-primary text-sm md:text-base truncate"
                >
                  {event.title}
                </button>
                <div className="hidden md:flex gap-6 text-sm text-foreground/70">
                  {program.length > 0 && (
                    <button onClick={() => scrollTo("programme")} className="hover:text-primary">
                      Programme
                    </button>
                  )}
                  <button onClick={() => scrollTo("lieu")} className="hover:text-primary">
                    Lieu
                  </button>
                  {gallery.length > 0 && (
                    <button onClick={() => scrollTo("galerie")} className="hover:text-primary">
                      Galerie
                    </button>
                  )}
                  <button
                    onClick={() => scrollTo("rsvp")}
                    className="hover:text-primary font-medium"
                  >
                    RSVP
                  </button>
                </div>
                <button
                  onClick={() => scrollTo("rsvp")}
                  className="md:hidden rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground"
                >
                  RSVP
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {themeOverrides?.builderData ? (
          <section
            className="relative min-h-[800px] flex justify-center bg-[#f0f0f0] overflow-hidden"
            onClick={(e) => {
              if (
                (e.target as HTMLElement).innerText?.toLowerCase().includes("rsvp") ||
                (e.target as HTMLElement).closest("button")
              ) {
                scrollTo("rsvp");
              }
            }}
          >
            <div className="w-[400px] bg-white relative shadow-xl overflow-hidden min-h-[800px]">
              <Renderer blocks={themeOverrides.builderData} isEditMode={false} />
            </div>
          </section>
        ) : (
          <>
            {/* HERO */}
            <section
              ref={heroRef}
              className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
              {!isSeminaire && (
                <>
                  <TemplatePattern
                    pattern={template.pattern}
                    color={dark ? "#e6c570" : "#9a6e41"}
                    opacity={0.1}
                  />
                  <TemplateEffects template={template} density={1.2} />
                </>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ y: heroY, opacity: heroOpacity }}
                className="relative z-10 w-full px-4 py-12 flex justify-center will-change-transform"
              >
                <div className="w-full max-w-sm">
                  <PreviewInvitation
                    template={template}
                    coverImageUrl={event.cover_image_url ?? null}
                    coverImageUrl2={
                      Array.isArray(event.gallery_urls) && event.gallery_urls.length > 0
                        ? (event.gallery_urls[0] as string)
                        : null
                    }
                    title={event.title}
                    hostName={event.host_name ?? null}
                    message={event.message}
                    eventDate={event.event_date}
                    themeOverrides={themeOverrides}
                  />
                  <div className="mt-6 text-center">
                    <p
                      className={`font-display text-lg md:text-xl ${dark ? "text-ivory" : "text-primary"}`}
                      style={{
                        ...(themeOverrides?.fontSizeDate
                          ? { fontSize: themeOverrides.fontSizeDate + "px" }
                          : {}),
                        ...(themeOverrides?.fontWeightDate
                          ? { fontWeight: themeOverrides.fontWeightDate }
                          : themeOverrides?.dateBold
                            ? { fontWeight: 700 }
                            : {}),
                      }}
                    >
                      {formatDate(event.event_date)}
                    </p>
                    <p
                      className={`text-sm mt-1 ${dark ? "text-ivory/80" : "text-foreground/70"}`}
                      style={
                        themeOverrides?.fontSizeBody
                          ? { fontSize: themeOverrides.fontSizeBody + "px" }
                          : undefined
                      }
                    >
                      ⚜ {event.location}
                    </p>
                    {event.host_name && (
                      <p
                        className={`font-serif italic text-sm mt-2 ${dark ? "text-ivory/70" : "text-foreground/60"}`}
                        style={
                          themeOverrides?.fontSizeBody
                            ? { fontSize: themeOverrides.fontSizeBody + "px" }
                            : undefined
                        }
                      >
                        — {event.host_name} —
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* scroll indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/80 text-2xl"
                aria-hidden
              >
                ⌄
              </motion.div>
            </section>

            {/* CITATION / MESSAGE GLOBAL */}
            {event.message && (
              <section className="py-20 md:py-32 px-4 relative flex justify-center text-center bg-ivory">
                <Reveal delay={0.2} scale>
                  <div className="max-w-3xl mx-auto space-y-8 relative">
                    <span className="text-6xl text-accent/30 font-serif absolute -top-10 -left-6 leading-none select-none">
                      "
                    </span>
                    <p
                      className="font-serif italic text-xl md:text-3xl leading-relaxed text-foreground/80 whitespace-pre-line relative z-10"
                      style={
                        themeOverrides?.fontSizeMessage
                          ? { fontSize: themeOverrides.fontSizeMessage + "px" }
                          : {}
                      }
                    >
                      {event.message}
                    </p>
                    <span className="text-6xl text-accent/30 font-serif absolute -bottom-16 -right-6 leading-none select-none">
                      "
                    </span>
                  </div>
                </Reveal>
              </section>
            )}

            {/* COUNTDOWN */}
            <section className="py-20 md:py-28 px-4 bg-ivory">
              <Reveal>
                <p
                  className="text-center uppercase tracking-[0.3em] text-muted-foreground mb-3 font-bold"
                  style={
                    themeOverrides?.fontSizeLabel
                      ? { fontSize: themeOverrides.fontSizeLabel + "px" }
                      : undefined
                  }
                >
                  {themeOverrides?.textPlusQue || "Plus que"}
                </p>
                <Countdown target={event.event_date} />
                <AddToCalendar
                  title={event.title}
                  date={event.event_date}
                  location={event.location}
                  description={event.message}
                />
              </Reveal>
            </section>

            {/* SEMINAIRE DETAILS */}
            {isSeminaire &&
              (event.seminaire_theme ||
                event.seminaire_organisateur ||
                event.seminaire_intervenants ||
                themeOverrides?.seminaireSpeakers?.length ||
                themeOverrides?.seminaireVideoUrl ||
                event.seminaire_sponsors ||
                themeOverrides?.seminaireSponsorLogos?.length) && (
                <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-secondary/30 to-ivory">
                  <Reveal scale>
                    <div className="max-w-4xl mx-auto bg-card rounded-3xl p-6 md:p-12 shadow-xl shadow-black/5 border border-border text-center md:text-left">
                      {event.seminaire_theme && (
                        <div className="mb-10 text-center">
                          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                            Thème de l'événement
                          </p>
                          <h3 className="font-display text-3xl md:text-5xl text-primary">
                            {event.seminaire_theme}
                          </h3>
                        </div>
                      )}

                      {themeOverrides?.seminaireVideoUrl && (
                        <div className="mb-12 rounded-2xl overflow-hidden border border-border shadow-md aspect-video relative bg-black/5 flex items-center justify-center">
                          {themeOverrides.seminaireVideoUrl.includes("youtube") ||
                          themeOverrides.seminaireVideoUrl.includes("youtu.be") ? (
                            <iframe
                              className="absolute inset-0 w-full h-full"
                              src={`https://www.youtube.com/embed/${themeOverrides.seminaireVideoUrl.split(/v=|youtu\.be\//)[1]?.split("&")[0]}?rel=0`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          ) : themeOverrides.seminaireVideoUrl.includes("vimeo") ? (
                            <iframe
                              className="absolute inset-0 w-full h-full"
                              src={`https://player.vimeo.com/video/${themeOverrides.seminaireVideoUrl.split("vimeo.com/")[1]?.split("?")[0]}`}
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <video
                              className="absolute inset-0 w-full h-full object-cover"
                              controls
                              src={themeOverrides.seminaireVideoUrl}
                            />
                          )}
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-8 mb-12 bg-secondary/10 p-6 md:p-8 rounded-2xl border border-border/50">
                        {event.seminaire_organisateur && (
                          <div>
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">
                              Organisateur
                            </p>
                            <p className="font-medium text-foreground text-lg">
                              {event.seminaire_organisateur}
                            </p>
                          </div>
                        )}
                        {event.seminaire_contact && (
                          <div>
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">
                              Contact
                            </p>
                            <p className="font-medium text-foreground text-lg">
                              {event.seminaire_contact}
                            </p>
                          </div>
                        )}
                      </div>

                      {((themeOverrides?.seminaireSpeakers &&
                        themeOverrides.seminaireSpeakers.length > 0) ||
                        event.seminaire_intervenants) && (
                        <div className="mt-12 pt-10 border-t border-border/50">
                          <p className="text-sm uppercase tracking-widest text-accent mb-8 font-bold text-center">
                            Nos Intervenants
                          </p>

                          {themeOverrides?.seminaireSpeakers &&
                          themeOverrides.seminaireSpeakers.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {themeOverrides.seminaireSpeakers.map((speaker, i) => (
                                <div
                                  key={i}
                                  className="flex flex-col items-center p-6 bg-ivory rounded-2xl border border-border shadow-sm hover:shadow-md transition"
                                >
                                  {speaker.photoUrl ? (
                                    <img
                                      src={speaker.photoUrl}
                                      alt={speaker.name}
                                      className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm border-2 border-white"
                                    />
                                  ) : (
                                    <div className="w-24 h-24 rounded-full bg-secondary/30 mb-4 flex items-center justify-center border-2 border-white shadow-sm">
                                      <span className="text-2xl">👤</span>
                                    </div>
                                  )}
                                  <p className="font-display text-xl text-primary font-bold text-center">
                                    {speaker.name}
                                  </p>
                                  {speaker.role && (
                                    <p className="text-sm text-foreground/80 mt-1 text-center font-medium">
                                      {speaker.role}
                                    </p>
                                  )}
                                  {speaker.company && (
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1 text-center">
                                      {speaker.company}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-foreground/80 leading-relaxed whitespace-pre-line text-center text-lg">
                              {event.seminaire_intervenants}
                            </p>
                          )}
                        </div>
                      )}

                      {((themeOverrides?.seminaireSponsorLogos &&
                        themeOverrides.seminaireSponsorLogos.length > 0) ||
                        event.seminaire_sponsors) && (
                        <div className="mt-12 pt-10 border-t border-border/50">
                          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-8 font-bold text-center">
                            Sponsors & Partenaires
                          </p>

                          {themeOverrides?.seminaireSponsorLogos &&
                          themeOverrides.seminaireSponsorLogos.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-6 items-center">
                              {themeOverrides.seminaireSponsorLogos.map((logo, i) => (
                                <div
                                  key={i}
                                  className="bg-white px-4 py-3 rounded-xl border border-border shadow-sm flex items-center justify-center hover:scale-105 transition-transform"
                                >
                                  <img
                                    src={logo}
                                    alt="Sponsor"
                                    className="max-h-12 md:max-h-16 w-auto object-contain mix-blend-multiply"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-foreground/80 leading-relaxed whitespace-pre-line text-center">
                              {event.seminaire_sponsors}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </Reveal>
                </section>
              )}

            {/* STORY — uniquement pour les mariages */}
            {isWedding && (event.story_text || event.message) && (
              <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-ivory to-secondary/30">
                <Reveal>
                  <div className="max-w-2xl mx-auto text-center">
                    <p
                      className="uppercase tracking-[0.3em] text-accent mb-4 font-bold"
                      style={
                        themeOverrides?.fontSizeLabel
                          ? { fontSize: themeOverrides.fontSizeLabel + "px" }
                          : undefined
                      }
                    >
                      {themeOverrides?.textNotreHistoire || "Notre histoire"}
                    </p>
                    {!isSeminaire && <div className="ornament max-w-[8rem] mx-auto mb-8">✦</div>}
                    <p
                      className="font-serif italic text-lg md:text-2xl leading-relaxed text-foreground/85 break-words font-bold"
                      style={{
                        ...(themeOverrides?.fontSizeMessage
                          ? { fontSize: themeOverrides.fontSizeMessage + "px" }
                          : {}),
                        ...(themeOverrides?.messageColor
                          ? { color: themeOverrides.messageColor }
                          : {}),
                      }}
                    >
                      {event.story_text || event.message}
                    </p>
                  </div>
                </Reveal>
              </section>
            )}

            {/* ENVELOPPE DE SECTIONS ANNEXES */}
            {themeOverrides?.extraSectionColor && (
              <style>{`
                .extra-section {
                  --foreground: ${hexToHslString(themeOverrides.extraSectionColor)};
                  --primary: ${hexToHslString(themeOverrides.extraSectionColor)};
                  --muted-foreground: ${hexToHslString(themeOverrides.extraSectionColor)};
                }
                .extra-section h2,
                .extra-section h3,
                .extra-section p,
                .extra-section label,
                .extra-section button {
                  color: ${themeOverrides.extraSectionColor};
                }
              `}</style>
            )}

            {/* PROGRAMME */}
            {program.length > 0 && (
              <section id="programme" className="py-20 md:py-28 px-6 bg-ivory extra-section">
                <Reveal>
                  <div className="max-w-2xl mx-auto text-center mb-12">
                    <p
                      className="uppercase tracking-[0.3em] text-accent mb-4"
                      style={
                        themeOverrides?.fontSizeLabel
                          ? { fontSize: themeOverrides.fontSizeLabel + "px" }
                          : undefined
                      }
                    >
                      {themeOverrides?.textLeDeroule ? "Programme" : "Programme"}
                    </p>
                    <h2
                      className="font-display text-3xl md:text-5xl text-primary"
                      style={
                        themeOverrides?.fontSizeSubtitle
                          ? { fontSize: themeOverrides.fontSizeSubtitle + "px" }
                          : undefined
                      }
                    >
                      {themeOverrides?.textLeDeroule || "Le déroulé"}
                    </h2>
                    {!isSeminaire && <div className="ornament max-w-[8rem] mx-auto mt-6">✦</div>}
                  </div>
                </Reveal>

                <div className="max-w-xl mx-auto relative pb-4">
                  {program.map((item, i) => {
                    const isActive = i === activeStepIndex;
                    const icon = iconForStep(item.title ?? "", item.description);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex flex-col items-center text-center mb-14 md:mb-16 last:mb-0"
                      >
                        {/* icon node on the rail */}
                        <div className="relative z-10 mb-4">
                          {isActive && (
                            <motion.span
                              aria-hidden
                              className="absolute inset-0 -m-2 rounded-full bg-accent/30"
                              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            />
                          )}
                          <div
                            className={`relative h-12 w-12 rounded-full flex items-center justify-center text-xl shadow-sm ring-4 ring-ivory transition ${
                              isActive
                                ? "bg-accent text-white shadow-lg shadow-accent/30"
                                : "bg-card border border-accent/30 text-accent"
                            }`}
                          >
                            <span>{icon}</span>
                          </div>
                        </div>

                        {item.time && (
                          <p
                            className={`font-display text-2xl md:text-3xl leading-none ${
                              isActive ? "text-accent" : "text-accent/90"
                            }`}
                            style={{
                              ...(themeOverrides?.fontSizeDate
                                ? { fontSize: themeOverrides.fontSizeDate + "px" }
                                : {}),
                              ...(themeOverrides?.fontWeightDate
                                ? { fontWeight: themeOverrides.fontWeightDate }
                                : themeOverrides?.dateBold
                                  ? { fontWeight: 700 }
                                  : {}),
                            }}
                          >
                            {item.time}
                          </p>
                        )}
                        {item.title && (
                          <h3
                            className="font-display text-lg md:text-2xl text-primary mt-2 max-w-md"
                            style={
                              themeOverrides?.fontSizeBody
                                ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                : undefined
                            }
                          >
                            {item.title}
                          </h3>
                        )}
                        {item.description && (
                          <p
                            className="text-sm md:text-base text-muted-foreground mt-2 leading-relaxed max-w-md mx-auto"
                            style={
                              themeOverrides?.fontSizeBody
                                ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                : undefined
                            }
                          >
                            {item.description}
                          </p>
                        )}
                        {isActive && (
                          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-medium px-3 py-1 uppercase tracking-[0.2em]">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            En cours
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* LIEU */}
            <section id="lieu" className="py-20 md:py-28 px-6 bg-secondary/30 extra-section">
              <Reveal scale>
                <div className="max-w-3xl mx-auto text-center mb-10">
                  <p
                    className="uppercase tracking-[0.3em] text-accent mb-4"
                    style={
                      themeOverrides?.fontSizeLabel
                        ? { fontSize: themeOverrides.fontSizeLabel + "px" }
                        : undefined
                    }
                  >
                    {themeOverrides?.textLeLieu || "Le lieu"}
                  </p>
                  <h2
                    className="font-display text-2xl sm:text-3xl md:text-5xl text-primary break-words"
                    style={
                      themeOverrides?.fontSizeSubtitle
                        ? { fontSize: themeOverrides.fontSizeSubtitle + "px" }
                        : undefined
                    }
                  >
                    {event.location}
                  </h2>
                  {!isSeminaire && <div className="ornament max-w-[8rem] mx-auto mt-6">✦</div>}
                </div>
              </Reveal>
              <Reveal delay={0.1} scale>
                <div className="max-w-5xl mx-auto space-y-4">
                  {event.venue_image_url && (
                    <button
                      type="button"
                      onClick={() => setLightbox(event.venue_image_url!)}
                      className="block w-full rounded-2xl overflow-hidden shadow-xl border border-border/40 group"
                    >
                      <img
                        src={event.venue_image_url}
                        alt={`Photo ${event.location}`}
                        className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </button>
                  )}
                  <div className="rounded-xl overflow-hidden shadow-md border border-border/40">
                    <iframe
                      src={mapSrc}
                      className="w-full h-[90px]"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Carte ${event.location}`}
                    />
                  </div>
                </div>
                <div className="text-center mt-6">
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-full border border-accent text-primary px-6 py-2 text-sm hover:bg-accent/10 transition"
                  >
                    Itinéraire vers le lieu →
                  </a>
                </div>
              </Reveal>
            </section>

            {/* DRESS CODE */}
            {event.dress_code && (
              <section className="py-16 md:py-20 px-6 bg-secondary/30 extra-section">
                <Reveal>
                  <div className="max-w-2xl mx-auto text-center mb-8">
                    <p
                      className="uppercase tracking-[0.3em] text-accent mb-3"
                      style={
                        themeOverrides?.fontSizeLabel
                          ? { fontSize: themeOverrides.fontSizeLabel + "px" }
                          : undefined
                      }
                    >
                      {themeOverrides?.textDressCodeHeader || "Tenue souhaitée"}
                    </p>
                    <h2
                      className="font-display text-3xl md:text-5xl text-primary"
                      style={
                        themeOverrides?.fontSizeSubtitle
                          ? { fontSize: themeOverrides.fontSizeSubtitle + "px" }
                          : undefined
                      }
                    >
                      {themeOverrides?.textDressCode || "Dress code"}
                    </h2>
                    {!isSeminaire && <div className="ornament max-w-[8rem] mx-auto mt-4">✦</div>}
                  </div>
                </Reveal>
                <div className="max-w-xl mx-auto">
                  <Reveal>
                    <div className="bg-card rounded-2xl p-6 border border-border/40 shadow-sm flex items-start gap-4">
                      <div className="text-3xl shrink-0">👗</div>
                      <div>
                        <h3
                          className="font-display text-xl text-primary mb-2"
                          style={
                            themeOverrides?.fontSizeSubtitle
                              ? { fontSize: themeOverrides.fontSizeSubtitle + "px" }
                              : undefined
                          }
                        >
                          {themeOverrides?.textDressCode || "Dress code"}
                        </h3>
                        <p
                          className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line"
                          style={
                            themeOverrides?.fontSizeBody
                              ? { fontSize: themeOverrides.fontSizeBody + "px" }
                              : undefined
                          }
                        >
                          {event.dress_code}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </section>
            )}

            {/* GALERIE (ENTRE DRESS CODE ET CADEAUX) */}
            {gallery.length > 0 && (
              <section id="galerie" className="py-20 md:py-28 px-6 bg-ivory extra-section">
                <Reveal>
                  <div className="max-w-2xl mx-auto text-center mb-12">
                    <p
                      className="uppercase tracking-[0.3em] text-accent mb-4"
                      style={
                        themeOverrides?.fontSizeLabel
                          ? { fontSize: themeOverrides.fontSizeLabel + "px" }
                          : undefined
                      }
                    >
                      {themeOverrides?.textSouvenirs || "Souvenirs"}
                    </p>
                    <h2
                      className="font-display text-3xl md:text-5xl text-primary"
                      style={
                        themeOverrides?.fontSizeSubtitle
                          ? { fontSize: themeOverrides.fontSizeSubtitle + "px" }
                          : undefined
                      }
                    >
                      {themeOverrides?.textGalerie || "Galerie"}
                    </h2>
                    {!isSeminaire && <div className="ornament max-w-[8rem] mx-auto mt-6">✦</div>}
                  </div>
                </Reveal>
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                  {gallery.map((url, i) => (
                    <Reveal key={url} delay={(i % 6) * 0.05} scale>
                      <button
                        type="button"
                        onClick={() => setLightbox(url)}
                        className="block w-full aspect-square overflow-hidden rounded-xl shadow-md group"
                      >
                        <img
                          src={url}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </button>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {/* CADEAUX & INFOS PRATIQUES */}
            {(event.gift_info || event.accommodation_info) && (
              <section className="py-20 md:py-28 px-6 bg-secondary/30 extra-section">
                <Reveal>
                  <div className="max-w-2xl mx-auto text-center mb-12">
                    <p
                      className="uppercase tracking-[0.3em] text-accent mb-4"
                      style={
                        themeOverrides?.fontSizeLabel
                          ? { fontSize: themeOverrides.fontSizeLabel + "px" }
                          : undefined
                      }
                    >
                      {themeOverrides?.textBonASavoir || "Bon à savoir"}
                    </p>
                    <h2
                      className="font-display text-3xl md:text-5xl text-primary"
                      style={
                        themeOverrides?.fontSizeSubtitle
                          ? { fontSize: themeOverrides.fontSizeSubtitle + "px" }
                          : undefined
                      }
                    >
                      {themeOverrides?.textInfosPratiques || "Cadeaux & Hébergement"}
                    </h2>
                    {!isSeminaire && <div className="ornament max-w-[8rem] mx-auto mt-6">✦</div>}
                  </div>
                </Reveal>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
                  {[
                    [themeOverrides?.textCadeaux || "Cadeaux", "🎁", event.gift_info],
                    [
                      themeOverrides?.textHebergement || "Hébergement",
                      "🏨",
                      event.accommodation_info,
                    ],
                  ]
                    .filter(([, , v]) => v)
                    .map(([title, icon, text], i) => (
                      <Reveal key={title as string} delay={i * 0.1}>
                        <div className="bg-card rounded-2xl p-6 border border-border/40 shadow-sm h-full">
                          <div className="text-3xl mb-3">{icon}</div>
                          <h3
                            className="font-display text-xl text-primary mb-2"
                            style={
                              themeOverrides?.fontSizeSubtitle
                                ? { fontSize: themeOverrides.fontSizeSubtitle + "px" }
                                : undefined
                            }
                          >
                            {title}
                          </h3>
                          <p
                            className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line"
                            style={
                              themeOverrides?.fontSizeBody
                                ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                : undefined
                            }
                          >
                            {text}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* LISTE DE CADEAUX */}
        {themeOverrides?.giftList && themeOverrides.giftList.length > 0 && (
          <section className="py-20 md:py-28 px-6 extra-section">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="uppercase tracking-[0.3em] text-accent mb-4">🎁 Liste de vœux</p>
                <h2 className="font-display text-3xl md:text-5xl text-primary">
                  {themeOverrides?.textCadeaux || "Liste de cadeaux"}
                </h2>
                <div className="ornament max-w-[8rem] mx-auto mt-6">✦</div>
              </div>
            </Reveal>
            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {themeOverrides.giftList.map((item, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="group bg-card rounded-2xl border border-border/40 shadow-sm p-5 h-full flex flex-col hover:shadow-md transition">
                    <div className="text-4xl mb-3">{item.emoji || "🎁"}</div>
                    <h3 className="font-display text-lg text-primary mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-foreground/70 mb-3 flex-1">{item.description}</p>
                    )}
                    <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-border/30">
                      {item.price && (
                        <span className="text-sm font-semibold text-accent">{item.price}</span>
                      )}
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground hover:opacity-90 transition"
                        >
                          Voir ↗
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* RSVP */}
        <section id="rsvp" className="py-24 md:py-32 px-6 bg-secondary/30 extra-section">
          {/* Livre d'or — combined with wishes wall */}
          {(confirmedCount > 0 || wishes.length > 0) && (
            <Reveal>
              <div className="max-w-4xl mx-auto mb-14">
                {confirmedCount > 0 && (
                  <div className="flex items-center justify-center gap-6 md:gap-10 mb-10 flex-wrap">
                    <Counter label="Invités confirmés" value={confirmedCount} icon="✓" />
                    <Counter label="Personnes attendues" value={guestsCount} icon="👥" />
                    {wishes.length > 0 && (
                      <Counter label="Mots laissés" value={wishes.length} icon="💌" />
                    )}
                  </div>
                )}

                {wishes.length > 0 && (
                  <div>
                    <p className="text-center uppercase tracking-[0.3em] text-xs text-accent mb-2">
                      💌 Livre d'or
                    </p>
                    <h3 className="text-center font-display text-2xl md:text-4xl text-primary mb-8">
                      Ce que disent les invités
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishes.slice(0, 9).map((w, i) => (
                        <motion.div
                          key={`${w.name}-${w.created_at}`}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                          className="relative rounded-2xl bg-card border border-border/50 shadow-sm p-5 hover:shadow-md transition"
                        >
                          <span className="absolute -top-3 left-4 text-3xl text-accent/70 leading-none select-none">
                            “
                          </span>
                          <p className="text-sm md:text-base text-foreground/85 italic leading-relaxed whitespace-pre-line">
                            {w.message}
                          </p>
                          <div className="mt-4 flex items-center justify-between gap-3">
                            <p className="font-display text-primary text-sm">— {w.name}</p>
                            <span
                              className={`text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5 ${
                                w.status === "yes"
                                  ? "bg-green-100 text-green-700"
                                  : w.status === "maybe"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-rose-100 text-rose-700"
                              }`}
                            >
                              {w.status === "yes"
                                ? "Présent·e"
                                : w.status === "maybe"
                                  ? "Peut-être"
                                  : "Absent·e"}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          )}

          {/* ===================== RSVP OU RAPPORT ===================== */}
          {rsvpClosed ? (
            // Rapport de participation après clôture
            <RsvpReport
              rsvps={wishes.map((w) => ({ status: w.status, guest_count: 1 }))}
              invitedCount={null}
              eventTitle={event.title}
              deadline={rsvpDeadline}
            />
          ) : (
            <Reveal scale>
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                  <p
                    className="uppercase tracking-[0.3em] text-accent mb-4"
                    style={
                      themeOverrides?.fontSizeLabel
                        ? { fontSize: themeOverrides.fontSizeLabel + "px" }
                        : undefined
                    }
                  >
                    {themeOverrides?.textRsvpTitre ||
                      (isSeminaire ? "Inscription" : "Confirmez votre présence")}
                  </p>
                  <h2
                    className="font-display text-3xl md:text-5xl text-primary"
                    style={
                      themeOverrides?.fontSizeSubtitle
                        ? { fontSize: themeOverrides.fontSizeSubtitle + "px" }
                        : undefined
                    }
                  >
                    {themeOverrides?.textRsvpSousTitre ||
                      (isSeminaire ? "Participez à l'événement" : "Serez-vous des nôtres ?")}
                  </h2>
                  {!isSeminaire && <div className="ornament max-w-[8rem] mx-auto mt-6">✦</div>}
                  {rsvpDeadline && (
                    <p className="text-xs text-muted-foreground mt-3">
                      📅 Réponses avant le{" "}
                      {new Date(rsvpDeadline).toLocaleString("fr-FR", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </p>
                  )}
                </div>

                <div
                  className="bg-card rounded-2xl shadow-xl p-8 border border-border/50"
                  style={
                    themeOverrides?.fontWeightAll
                      ? { fontWeight: themeOverrides.fontWeightAll }
                      : undefined
                  }
                >
                  <AnimatePresence mode="wait">
                    {done ? (
                      <motion.div
                        key="done"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6"
                      >
                        <div className="text-5xl mb-3">
                          {status === "yes"
                            ? isSeminaire
                              ? "🎤"
                              : "🥂"
                            : status === "no"
                              ? "💌"
                              : "🤔"}
                        </div>
                        <h3 className="font-display text-3xl text-primary mb-2">Merci {name} !</h3>
                        <p className="text-muted-foreground">
                          Votre réponse a bien été enregistrée.
                        </p>
                        {status === "yes" && (
                          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 shadow-lg text-left relative overflow-hidden" id="vip-pass-card">
                            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest shadow-sm">
                              Pass VIP • Accès Événement
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-6 mt-2">
                              <div className="bg-white p-3 rounded-xl shadow-md border border-amber-200 flex-shrink-0">
                                <QRCodeCanvas
                                  value={`${typeof window !== "undefined" && window.location.origin ? window.location.origin : "https://invitation-digital1-main.vercel.app"}/pass/${event.slug}?name=${encodeURIComponent(name)}&guests=${guestCount}&accompanying=${encodeURIComponent(accompanyingNames.slice(0, guestCount - 1).filter(Boolean).join(", "))}&date=${encodeURIComponent(event.event_date)}&title=${encodeURIComponent(event.title)}`}
                                  size={135}
                                  level="H"
                                  includeMargin={false}
                                />
                              </div>
                              <div className="space-y-1 text-center sm:text-left flex-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Billet Digital VIP</p>
                                <h4 className="font-display text-xl font-bold text-foreground">{event.title}</h4>
                                <p className="text-sm font-medium text-foreground/90">👤 Invité : <span className="font-bold">{name}</span></p>
                                <p className="text-xs text-muted-foreground">👥 Nombre total de personnes : <span className="font-semibold">{guestCount}</span></p>
                                {guestCount > 1 && accompanyingNames.slice(0, guestCount - 1).filter(Boolean).length > 0 && (
                                  <div className="text-[11px] text-amber-700 font-medium bg-amber-500/10 p-1.5 rounded-md mt-1 border border-amber-500/20">
                                    <span className="font-bold">Accompagnants :</span> {accompanyingNames.slice(0, guestCount - 1).filter(Boolean).join(", ")}
                                  </div>
                                )}
                                <p className="text-xs text-muted-foreground">📅 {new Date(event.event_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                              </div>
                            </div>
                            <div className="mt-5 pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row gap-2 justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  const canvas = document.querySelector("#vip-pass-card canvas") as HTMLCanvasElement | null;
                                  if (canvas) {
                                    const a = document.createElement("a");
                                    a.href = canvas.toDataURL("image/png");
                                    a.download = `Pass-VIP-${event.slug}-${name.replace(/\s+/g, "-")}.png`;
                                    a.click();
                                    toast.success("Pass VIP (QR Code) téléchargé !");
                                  }
                                }}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-white font-medium text-xs shadow-md hover:bg-amber-600 transition"
                              >
                                <span>📥</span> Télécharger mon QR Code
                              </button>
                            </div>
                            <p className="text-[11px] text-muted-foreground text-center mt-3 italic">
                              💡 Présentez ce QR code sur votre téléphone à l'accueil le jour de l'événement.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={onSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div>
                          <label
                            className="text-sm font-medium block mb-1"
                            style={
                              themeOverrides?.fontSizeBody
                                ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                : undefined
                            }
                          >
                            {isSeminaire ? "Nom complet" : "Votre nom"}
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder={isSeminaire ? "Jean Dupont" : ""}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            style={
                              themeOverrides?.fontSizeBody
                                ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                : undefined
                            }
                          />
                        </div>

                        {/* Champs supplémentaires pour séminaire */}
                        {isSeminaire && (
                          <>
                            <div>
                              <label className="text-sm font-medium block mb-1">
                                Entreprise / Organisation
                              </label>
                              <input
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="Nom de l'entreprise"
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium block mb-1">
                                Fonction / Poste
                              </label>
                              <input
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="Directeur, Manager…"
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-sm font-medium block mb-1">Téléphone</label>
                                <input
                                  type="tel"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  placeholder="+225 …"
                                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium block mb-1">Email</label>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="vous@email.com"
                                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        <div>
                          <label
                            className="text-sm font-medium block mb-2"
                            style={
                              themeOverrides?.fontSizeBody
                                ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                : undefined
                            }
                          >
                            {isSeminaire ? "Participerez-vous ?" : "Votre réponse"}
                          </label>
                          <div
                            className={`grid gap-2 ${isSeminaire ? "grid-cols-2" : "grid-cols-3"}`}
                          >
                            {(isSeminaire
                              ? ([
                                  ["yes", "✓ Oui, je participe"],
                                  ["no", "✗ Non, je ne peux pas"],
                                ] as const)
                              : ([
                                  ["yes", "✓ Oui"],
                                  ["maybe", "? Peut-être"],
                                  ["no", "✗ Non"],
                                ] as const)
                            ).map(([v, l]) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setStatus(v as any)}
                                className={`rounded-md px-3 py-2 text-sm border transition ${
                                  status === v
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background border-input hover:border-accent"
                                }`}
                                style={
                                  themeOverrides?.fontSizeBody
                                    ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                    : undefined
                                }
                              >
                                {l}
                              </button>
                            ))}
                          </div>
                        </div>

                        {!isSeminaire && status !== "no" && (
                          <>
                            <div>
                              <label
                                className="text-sm font-medium block mb-1"
                                style={
                                  themeOverrides?.fontSizeBody
                                    ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                    : undefined
                                }
                              >
                                Nombre de personnes
                              </label>
                              <input
                                type="number"
                                min={1}
                                max={maxGuestsLimit}
                                value={guestCount}
                                onChange={(e) =>
                                  setGuestCount(Math.min(maxGuestsLimit, Math.max(1, parseInt(e.target.value) || 1)))
                                }
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                style={
                                  themeOverrides?.fontSizeBody
                                    ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                    : undefined
                                }
                              />
                              {maxGuestsLimit < 20 && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Maximum autorisé : {maxGuestsLimit} {maxGuestsLimit > 1 ? "personnes" : "personne"} par réponse.
                                </p>
                              )}
                            </div>
                            {guestCount > 1 && status === "yes" && (
                              <div className="space-y-3 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-left animate-fade-in">
                                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                                  <span>👥</span> Noms des {guestCount - 1} personne{guestCount > 2 ? "s" : ""} accompagnante{guestCount > 2 ? "s" : ""} (requis) :
                                </p>
                                {Array.from({ length: guestCount - 1 }).map((_, idx) => (
                                  <div key={idx} className="space-y-1">
                                    <label className="text-xs font-semibold text-foreground/90 block">
                                      Accompagnant(e) n°{idx + 1} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      required={status === "yes"}
                                      placeholder={`Ex: Prénom & Nom de la personne ${idx + 2}`}
                                      value={accompanyingNames[idx] || ""}
                                      onChange={(e) => {
                                        const next = [...accompanyingNames];
                                        next[idx] = e.target.value;
                                        setAccompanyingNames(next);
                                      }}
                                      className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            <div>
                              <label
                                className="text-sm font-medium block mb-1"
                                style={
                                  themeOverrides?.fontSizeBody
                                    ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                    : undefined
                                }
                              >
                                Allergies / Régimes alimentaires (optionnel)
                              </label>
                              <textarea
                                value={dietRestrictions}
                                onChange={(e) => setDietRestrictions(e.target.value)}
                                rows={2}
                                placeholder="Végétarien, sans gluten..."
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                style={
                                  themeOverrides?.fontSizeBody
                                    ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                    : undefined
                                }
                              />
                            </div>
                          </>
                        )}
                        <div>
                          <label
                            className="text-sm font-medium block mb-1"
                            style={
                              themeOverrides?.fontSizeBody
                                ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                : undefined
                            }
                          >
                            {isSeminaire && status === "no"
                              ? "Raison (optionnel)"
                              : "Mot pour l'hôte (optionnel)"}
                          </label>
                          <textarea
                            value={rsvpMessage}
                            onChange={(e) => setRsvpMessage(e.target.value)}
                            rows={2}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            style={
                              themeOverrides?.fontSizeBody
                                ? { fontSize: themeOverrides.fontSizeBody + "px" }
                                : undefined
                            }
                          />
                        </div>
                        {/* Honeypot invisible anti-spam (bot trap) */}
                        <div style={{ display: "none", opacity: 0, position: "absolute", left: "-9999px" }} aria-hidden="true">
                          <label htmlFor="websiteUrl">Ne pas remplir ce champ :</label>
                          <input
                            type="text"
                            id="websiteUrl"
                            name="websiteUrl"
                            tabIndex={-1}
                            autoComplete="off"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                          />
                        </div>
                        {/* Conteneur Turnstile CAPTCHA (si clé configurée sur Vercel) */}
                        {import.meta.env.VITE_TURNSTILE_SITE_KEY && (
                          <div className="my-3 flex justify-center">
                            <div
                              ref={(el) => {
                                if (el && !el.hasChildNodes() && (window as any).turnstile) {
                                  (window as any).turnstile.render(el, {
                                    sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
                                    callback: (token: string) => setTurnstileToken(token),
                                  });
                                }
                              }}
                            />
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full rounded-full bg-primary py-3 text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition"
                          style={
                            themeOverrides?.fontSizeBody
                              ? { fontSize: themeOverrides.fontSizeBody + "px" }
                              : undefined
                          }
                        >
                          {submitting
                            ? "Envoi…"
                            : isSeminaire
                              ? "Confirmer mon inscription"
                              : "Envoyer ma réponse"}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>
          )}
        </section>

        <footer className="py-10 text-center text-xs text-muted-foreground bg-ivory border-t border-border/30">
          Créé avec <span className="font-display text-primary">Inviti</span> ✦
        </footer>

        {/* Audio element (always mounted so we can control playback) */}
        {event.music_url && (
          <audio ref={audioRef} src={event.music_url} loop preload="auto" className="hidden" />
        )}

        {/* Floating music button */}
        {event.music_url && entered && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed bottom-5 right-5 z-30 rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center shadow-lg hover:scale-105 transition"
            aria-label={musicOn ? "Pause musique" : "Jouer musique"}
          >
            {musicOn ? "⏸" : "🎶"}
          </button>
        )}

        {/* Floating share button + menu */}
        {entered && (
          <div className={`fixed bottom-5 z-30 ${event.music_url ? "right-20" : "right-5"}`}>
            <AnimatePresence>
              {shareOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-14 right-0 bg-card border border-border/60 rounded-2xl shadow-xl p-2 min-w-[200px]"
                >
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${shareText()} ${inviteUrl()}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setShareOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 text-sm"
                  >
                    <span className="text-lg">💬</span> WhatsApp
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(`${shareText()}\n\n${inviteUrl()}`)}`}
                    onClick={() => setShareOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 text-sm"
                  >
                    <span className="text-lg">✉️</span> Email
                  </a>
                  <button
                    onClick={copyLink}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 text-sm"
                  >
                    <span className="text-lg">🔗</span> Copier le lien
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={nativeShare}
              className="rounded-full bg-accent text-white w-12 h-12 flex items-center justify-center shadow-lg hover:scale-105 transition"
              aria-label="Partager l'invitation"
            >
              ↗
            </button>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setLightbox(null)}
            >
              <img
                src={lightbox}
                alt=""
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Intro overlay (envelope or tap-to-enter) */}
        <AnimatePresence>
          {!entered &&
            (themeOverrides?.forceEnvelope || template.hasEnvelope ? (
              <EnvelopeIntro
                key="env"
                template={template}
                hostName={event.host_name}
                title={event.title}
                opening={opening}
                onOpen={handleEnter}
                themeOverrides={themeOverrides}
              />
            ) : (
              <TapToEnter
                key="tap"
                template={template}
                hostName={event.host_name}
                title={event.title}
                onEnter={handleEnter}
              />
            ))}
        </AnimatePresence>
      </div>
    </ScrollAnimationContext.Provider>
  );
}

function Counter({ label, value, icon }: { label: string; value: number; icon: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const duration = 900;
    const from = display;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <div className="text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <p className="font-display text-3xl md:text-4xl text-primary leading-none tabular-nums">
        {display}
      </p>
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
