import React, { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface TableGroup {
  id: string;
  name: string;
  guestIds: string[]; // RSVP ids
}

interface SeatingPlanProps {
  rsvps: any[];
  initialPlan?: { tables: TableGroup[] } | null;
  onSave: (newPlan: { tables: TableGroup[] }) => void;
}

export function SeatingPlan({ rsvps, initialPlan, onSave }: SeatingPlanProps) {
  const [tables, setTables] = useState<TableGroup[]>(
    initialPlan?.tables || [
      { id: "t-1", name: "Table 1 — Famille", guestIds: [] },
      { id: "t-2", name: "Table 2 — Amis", guestIds: [] },
    ]
  );
  const [newTableName, setNewTableName] = useState("");

  // Filter only guests who said "yes"
  const yesGuests = rsvps.filter((r) => r.status === "yes");

  // Get all assigned guest IDs
  const assignedGuestIds = new Set(tables.flatMap((t) => t.guestIds));
  const unassignedGuests = yesGuests.filter((g) => !assignedGuestIds.has(g.id));

  function addTable(e: React.FormEvent) {
    e.preventDefault();
    if (!newTableName.trim()) return;
    const newT = {
      id: "t-" + Date.now(),
      name: newTableName.trim(),
      guestIds: [],
    };
    const updated = [...tables, newT];
    setTables(updated);
    setNewTableName("");
    onSave({ tables: updated });
    toast.success("Table ajoutée ! 🍽️");
  }

  function removeTable(tableId: string) {
    const updated = tables.filter((t) => t.id !== tableId);
    setTables(updated);
    onSave({ tables: updated });
    toast.success("Table supprimée");
  }

  function assignGuestToTable(guestId: string, targetTableId: string) {
    // Remove from any table first
    const updated = tables.map((t) => ({
      ...t,
      guestIds: t.id === targetTableId
        ? [...t.guestIds.filter((id) => id !== guestId), guestId]
        : t.guestIds.filter((id) => id !== guestId),
    }));
    setTables(updated);
    onSave({ tables: updated });
    toast.success("Invité placé !");
  }

  function unassignGuest(guestId: string) {
    const updated = tables.map((t) => ({
      ...t,
      guestIds: t.guestIds.filter((id) => id !== guestId),
    }));
    setTables(updated);
    onSave({ tables: updated });
    toast.success("Invité retiré de la table");
  }

  function printSeatingChart() {
    const printWin = window.open("", "_blank");
    if (!printWin) return;
    const tablesHtml = tables
      .map((t) => {
        const tableGuests = t.guestIds
          .map((id) => yesGuests.find((g) => g.id === id))
          .filter(Boolean);
        const totalPers = tableGuests.reduce((acc, g) => acc + (g.guest_count || 1), 0);
        return `
        <div style="background:#fdfaf6;border:2px solid #9a7b4f;border-radius:12px;padding:15px;margin-bottom:20px;break-inside:avoid">
          <h3 style="margin:0 0 10px 0;color:#9a7b4f;font-size:18px;border-bottom:1px solid #ede5da;padding-bottom:6px">
            🍽️ ${t.name} <span style="font-size:13px;color:#666">(${tableGuests.length} invités, ${totalPers} places)</span>
          </h3>
          <ul style="margin:0;padding-left:20px;list-style:square">
            ${tableGuests
              .map((g: any) => `<li style="margin-bottom:4px;font-weight:500">${g.name} ${g.guest_count > 1 ? `(+${g.guest_count - 1} acc.)` : ""}</li>`)
              .join("")}
            ${tableGuests.length === 0 ? `<li style="color:#999;font-style:italic">Table vide</li>` : ""}
          </ul>
        </div>`;
      })
      .join("");

    printWin.document.write(`<html><head><title>Plan de Table</title>
      <style>body{font-family:system-ui,-apple-system,sans-serif;padding:30px;color:#222}h1{font-size:24px;margin-bottom:20px;color:#333}.grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:20px}@media print{button{display:none}}</style></head>
      <body>
      <h1>🍽️ Plan de Table & Placement des Invités</h1>
      <button onclick="window.print()" style="margin-bottom:20px;padding:10px 24px;background:#9a7b4f;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:bold">🖨️ Imprimer le Plan de Table</button>
      <div class="grid">${tablesHtml}</div>
      </body></html>`);
    printWin.document.close();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-accent/10 p-4 rounded-xl border border-accent/30">
        <div>
          <h3 className="font-display text-lg font-bold text-primary">🍽️ Organisation du Plan de Table</h3>
          <p className="text-xs text-muted-foreground">
            Placez facilement vos invités présents dans vos différentes tables pour la réception.
          </p>
        </div>
        <button
          type="button"
          onClick={printSeatingChart}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-xs hover:opacity-90 transition shadow-sm flex items-center gap-2"
        >
          <span>🖨️</span> Imprimer le Plan de Table
        </button>
      </div>

      {/* Add new table */}
      <form onSubmit={addTable} className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Nom de la table (ex: Table 3 — Les Amis)"
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          + Créer Table
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Unassigned pool */}
        <div className="md:col-span-1 bg-card rounded-xl border border-border p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
              <span>⏳</span> À Placer ({unassignedGuests.length})
            </h4>
            <span className="text-[11px] text-muted-foreground">Présents confirmés</span>
          </div>
          {unassignedGuests.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-6 italic">
              Tous les invités confirmés ont été placés dans une table ! ✨
            </p>
          ) : (
            <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
              {unassignedGuests.map((g) => (
                <div
                  key={g.id}
                  className="p-2.5 rounded-lg border border-border/80 bg-background flex items-center justify-between gap-2 shadow-2xs hover:border-primary/50 transition"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{g.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      👥 {g.guest_count || 1} pers. {(g.diet_restrictions || g.extra_data?.dietRestrictions || g.extra_data?.diet_restrictions) ? `• 🥗 ${g.diet_restrictions || g.extra_data?.dietRestrictions || g.extra_data?.diet_restrictions}` : ""}
                    </p>
                  </div>
                  <select
                    onChange={(e) => {
                      if (e.target.value) assignGuestToTable(g.id, e.target.value);
                    }}
                    defaultValue=""
                    className="text-xs rounded border border-input bg-secondary px-2 py-1 max-w-[110px]"
                  >
                    <option value="" disabled>Placer...</option>
                    {tables.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tables grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {tables.map((t) => {
              const tableGuests = t.guestIds
                .map((id) => yesGuests.find((g) => g.id === id))
                .filter(Boolean);
              const totalPers = tableGuests.reduce((acc, g) => acc + (g.guest_count || 1), 0);

              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card rounded-xl border border-primary/30 p-4 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-2 mb-2">
                      <div>
                        <h4 className="font-display font-bold text-primary text-base">{t.name}</h4>
                        <p className="text-[11px] text-muted-foreground">
                          {tableGuests.length} invité(s) • <span className="font-semibold text-foreground">{totalPers} place(s)</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTable(t.id)}
                        className="text-muted-foreground hover:text-destructive text-xs p-1"
                        title="Supprimer la table"
                      >
                        🗑️
                      </button>
                    </div>

                    {tableGuests.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-6 italic border border-dashed border-border/50 rounded-lg">
                        Table vide. Utilisez le menu déroulant à gauche pour placer un invité ici.
                      </p>
                    ) : (
                      <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                        {tableGuests.map((g: any) => (
                          <div
                            key={g.id}
                            className="text-xs p-2 rounded bg-secondary/60 flex items-center justify-between gap-2"
                          >
                            <span className="font-medium truncate">
                              👤 {g.name} <span className="text-muted-foreground font-normal">({g.guest_count || 1} p.)</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => unassignGuest(g.id)}
                              className="text-muted-foreground hover:text-destructive text-[11px] px-1"
                              title="Retirer de la table"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
