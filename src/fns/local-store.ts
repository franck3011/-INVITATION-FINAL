import fs from "fs";
import path from "path";
import os from "os";

const DATA_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), "invitation-data")
  : path.resolve(process.cwd(), "data");
const EVENTS_FILE = path.join(DATA_DIR, "local_events.json");
const RSVPS_FILE = path.join(DATA_DIR, "local_rsvps.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {}
  }
}

export function getAllLocalEvents(): any[] {
  ensureDir();
  if (!fs.existsSync(EVENTS_FILE)) return [];
  try {
    const raw = fs.readFileSync(EVENTS_FILE, "utf-8");
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

export function saveLocalEvent(event: any) {
  ensureDir();
  const all = getAllLocalEvents();
  const idx = all.findIndex((e) => e.slug === event.slug || e.admin_token === event.admin_token);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...event };
  } else {
    all.unshift(event);
  }
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(all, null, 2), "utf-8");
  } catch (e) {
    console.warn("[local-store] saveLocalEvent write failed:", e);
  }
}

export function getLocalEventBySlug(slug: string): any | null {
  const all = getAllLocalEvents();
  return all.find((e) => e.slug === slug) || null;
}

export function getLocalEventByAdminToken(token: string): any | null {
  const all = getAllLocalEvents();
  return all.find((e) => e.admin_token === token) || null;
}

export function updateLocalEvent(token: string, updates: any): boolean {
  ensureDir();
  const all = getAllLocalEvents();
  const idx = all.findIndex((e) => e.admin_token === token);
  if (idx < 0) return false;
  all[idx] = { ...all[idx], ...updates };
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(all, null, 2), "utf-8");
  } catch (e) {
    console.warn("[local-store] updateLocalEvent write failed:", e);
  }
  return true;
}

export function deleteLocalEvent(eventId: string) {
  ensureDir();
  const all = getAllLocalEvents().filter((e) => e.id !== eventId);
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(all, null, 2), "utf-8");
  } catch (e) {
    console.warn("[local-store] deleteLocalEvent write failed:", e);
  }
}

export function getAllLocalRsvps(): any[] {
  ensureDir();
  if (!fs.existsSync(RSVPS_FILE)) return [];
  try {
    const raw = fs.readFileSync(RSVPS_FILE, "utf-8");
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

export function saveLocalRsvp(rsvp: any) {
  ensureDir();
  const all = getAllLocalRsvps();
  all.unshift(rsvp);
  try {
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(all, null, 2), "utf-8");
  } catch (e) {
    console.warn("[local-store] saveLocalRsvp write failed:", e);
  }
}

export function getLocalRsvps(eventId: string): any[] {
  const all = getAllLocalRsvps();
  return all.filter((r) => r.event_id === eventId);
}

export function saveLocalUpload(filename: string, buffer: Uint8Array): string {
  const uploadsDir = process.env.VERCEL
    ? path.join(os.tmpdir(), "invitation-uploads")
    : path.resolve(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    try {
      fs.mkdirSync(uploadsDir, { recursive: true });
    } catch {}
  }
  try {
    fs.writeFileSync(path.join(uploadsDir, filename), buffer);
  } catch (e) {
    console.warn("[local-store] saveLocalUpload write failed:", e);
  }
  return `/uploads/${filename}`;
}

