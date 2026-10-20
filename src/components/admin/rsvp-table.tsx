import { useMemo, useState, useEffect } from "react";
import { readNotes, writeNote } from "@/lib/admin-notes";

interface Rsvp {
  id: string;
  name: string;
  status: string;
  guest_count: number;
  diet_restrictions?: string | null;
  message: string | null;
  created_at: string;
  extra_data?: {
    company?: string | null;
    jobTitle?: string | null;
    email?: string | null;
    phone?: string | null;
    dietRestrictions?: string | null;
    diet_restrictions?: string | null;
  } | null;
}

interface Props {
  slug: string;
  rsvps: Rsvp[];
}

type StatusFilter = "all" | "yes" | "no" | "maybe";
type SortKey = "date" | "name" | "guests";

export function RsvpTable({ slug, rsvps }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingNote, setEditingNote] = useState<string | null>(null);

  useEffect(() => {
    setNotes(readNotes(slug));
  }, [slug]);

  const filtered = useMemo(() => {
    let list = [...rsvps];
    if (status !== "all") list = list.filter((r) => r.status === status);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "guests") return b.guest_count - a.guest_count;
      return a.created_at < b.created_at ? 1 : -1;
    });
    return list;
  }, [rsvps, search, status, sortKey]);

  function updateNote(rsvpId: string, value: string) {
    writeNote(slug, rsvpId, value);
    setNotes((n) => ({ ...n, [rsvpId]: value }));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un invité…"
          className="flex-1 min-w-[180px] rounded-md border border-input bg-background px-3 py-1.5 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
        >
          <option value="all">Tous les statuts</option>
          <option value="yes">Oui</option>
          <option value="maybe">Peut-être</option>
          <option value="no">Non</option>
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
        >
          <option value="date">Tri : date</option>
          <option value="name">Tri : nom</option>
          <option value="guests">Tri : nb convives</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="p-8 text-center text-muted-foreground border border-border rounded-xl">
          Aucun invité ne correspond.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Nb</th>
                <th className="px-4 py-2">Message / Infos sup.</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Note privée</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="px-4 py-2 font-medium">{r.name}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        r.status === "yes"
                          ? "bg-green-100 text-green-800"
                          : r.status === "no"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {r.status === "yes" ? "Oui" : r.status === "no" ? "Non" : "Peut-être"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{r.guest_count}</td>
                  <td className="px-4 py-2 max-w-xs text-xs space-y-1">
                    {r.message && (
                      <p className="truncate" title={r.message}>
                        {r.message}
                      </p>
                    )}
                    {(r.diet_restrictions || r.extra_data?.dietRestrictions || r.extra_data?.diet_restrictions) && (
                      <p className="text-amber-700 mt-1 font-medium">Diet: {r.diet_restrictions || r.extra_data?.dietRestrictions || r.extra_data?.diet_restrictions}</p>
                    )}
                    {r.extra_data && (
                      <div className="text-muted-foreground mt-1">
                        {r.extra_data.company && <div>🏢 {r.extra_data.company}</div>}
                        {r.extra_data.jobTitle && <div>💼 {r.extra_data.jobTitle}</div>}
                        {r.extra_data.email && (
                          <div>
                            ✉️{" "}
                            <a href={`mailto:${r.extra_data.email}`} className="hover:underline">
                              {r.extra_data.email}
                            </a>
                          </div>
                        )}
                        {r.extra_data.phone && <div>📞 {r.extra_data.phone}</div>}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString("fr-FR")}
                  </td>
                  <td className="px-4 py-2 min-w-[180px]">
                    {editingNote === r.id ? (
                      <textarea
                        autoFocus
                        defaultValue={notes[r.id] ?? ""}
                        onBlur={(e) => {
                          updateNote(r.id, e.target.value);
                          setEditingNote(null);
                        }}
                        className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs"
                        rows={2}
                      />
                    ) : (
                      <button
                        onClick={() => setEditingNote(r.id)}
                        className="text-left text-xs text-muted-foreground hover:text-foreground italic w-full"
                      >
                        {notes[r.id] || "+ ajouter une note"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
