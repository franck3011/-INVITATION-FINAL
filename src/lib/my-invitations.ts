// Local registry of invitations created on this device.
// Stored in localStorage so the user can find their invitations again
// without needing an account.

export interface MyInvitation {
  slug: string;
  adminToken: string;
  title: string;
  templateId: string;
  eventDate: string | null;
  createdAt: string;
}

const KEY = "inviti.my-invitations.v1";

function safeRead(): MyInvitation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x) => x && typeof x.slug === "string" && typeof x.adminToken === "string",
    );
  } catch {
    return [];
  }
}

function safeWrite(items: MyInvitation[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* quota or disabled */
  }
}

export function listMyInvitations(): MyInvitation[] {
  return safeRead().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveMyInvitation(item: MyInvitation) {
  const all = safeRead();
  const next = [item, ...all.filter((x) => x.slug !== item.slug)];
  safeWrite(next);
}

export function removeMyInvitation(slug: string) {
  safeWrite(safeRead().filter((x) => x.slug !== slug));
}
