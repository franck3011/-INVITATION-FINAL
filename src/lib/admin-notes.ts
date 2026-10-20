// Private per-RSVP notes, stored locally for the organizer.
// Never sent to the server, never visible to guests.

const KEY_PREFIX = "inviti.admin-notes.v1.";

function key(slug: string) {
  return KEY_PREFIX + slug;
}

export function readNotes(slug: string): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key(slug));
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function writeNote(slug: string, rsvpId: string, note: string) {
  if (typeof window === "undefined") return;
  try {
    const all = readNotes(slug);
    if (note.trim()) {
      all[rsvpId] = note;
    } else {
      delete all[rsvpId];
    }
    window.localStorage.setItem(key(slug), JSON.stringify(all));
  } catch {
    /* quota or disabled */
  }
}
