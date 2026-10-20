import { useMemo } from "react";

interface Rsvp {
  id: string;
  status: string;
  guest_count: number;
  created_at: string;
}

interface Props {
  rsvps: Rsvp[];
}

export function StatsPanel({ rsvps }: Props) {
  const stats = useMemo(() => {
    const yes = rsvps.filter((r) => r.status === "yes").length;
    const no = rsvps.filter((r) => r.status === "no").length;
    const maybe = rsvps.filter((r) => r.status === "maybe").length;
    const guests = rsvps
      .filter((r) => r.status === "yes")
      .reduce((acc, r) => acc + (r.guest_count || 0), 0);
    const total = rsvps.length || 1;
    const last = rsvps.length
      ? rsvps.reduce((a, b) => (a.created_at > b.created_at ? a : b))
      : null;
    return {
      yes,
      no,
      maybe,
      guests,
      total: rsvps.length,
      pctYes: (yes / total) * 100,
      pctNo: (no / total) * 100,
      pctMaybe: (maybe / total) * 100,
      last,
    };
  }, [rsvps]);

  const series = useMemo(() => buildCumulative(rsvps), [rsvps]);

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-4 gap-4">
        <Stat label="Réponses" value={stats.total} />
        <Stat label="✓ Oui" value={stats.yes} accent />
        <Stat label="? Peut-être" value={stats.maybe} />
        <Stat label="Total convives" value={stats.guests} accent />
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="font-display text-lg text-primary">Répartition</h3>
          <p className="text-xs text-muted-foreground">
            {stats.last
              ? `Dernière réponse ${timeAgo(stats.last.created_at)}`
              : "Aucune réponse pour l'instant"}
          </p>
        </div>

        {stats.total === 0 ? (
          <p className="text-sm text-muted-foreground">
            Les statistiques apparaîtront ici dès la première réponse.
          </p>
        ) : (
          <>
            <div className="h-3 w-full rounded-full overflow-hidden bg-secondary/60 flex">
              <div
                className="bg-green-500 transition-all"
                style={{ width: `${stats.pctYes}%` }}
                title={`Oui : ${stats.yes}`}
              />
              <div
                className="bg-yellow-400 transition-all"
                style={{ width: `${stats.pctMaybe}%` }}
                title={`Peut-être : ${stats.maybe}`}
              />
              <div
                className="bg-red-400 transition-all"
                style={{ width: `${stats.pctNo}%` }}
                title={`Non : ${stats.no}`}
              />
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground flex-wrap">
              <span>
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5" />
                Oui {Math.round(stats.pctYes)}%
              </span>
              <span>
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-1.5" />
                Peut-être {Math.round(stats.pctMaybe)}%
              </span>
              <span>
                <span className="inline-block w-2 h-2 rounded-full bg-red-400 mr-1.5" />
                Non {Math.round(stats.pctNo)}%
              </span>
            </div>

            {series.length >= 2 && (
              <div className="pt-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Évolution cumulée
                </p>
                <Sparkline data={series} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-5 border border-border ${accent ? "bg-accent/15" : "bg-card"}`}>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-3xl text-primary mt-1">{value}</p>
    </div>
  );
}

function buildCumulative(rsvps: Rsvp[]): { day: string; total: number }[] {
  if (rsvps.length === 0) return [];
  const byDay = new Map<string, number>();
  for (const r of rsvps) {
    const d = new Date(r.created_at).toISOString().slice(0, 10);
    byDay.set(d, (byDay.get(d) || 0) + 1);
  }
  const days = [...byDay.keys()].sort();
  let cum = 0;
  return days.map((d) => {
    cum += byDay.get(d)!;
    return { day: d, total: cum };
  });
}

function Sparkline({ data }: { data: { day: string; total: number }[] }) {
  const w = 600;
  const h = 80;
  const pad = 4;
  const max = Math.max(...data.map((d) => d.total), 1);
  const step = data.length > 1 ? (w - pad * 2) / (data.length - 1) : 0;
  const points = data
    .map((d, i) => `${pad + i * step},${h - pad - (d.total / max) * (h - pad * 2)}`)
    .join(" ");
  const area = `${pad},${h - pad} ${points} ${pad + (data.length - 1) * step},${h - pad}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
      <polygon points={area} fill="currentColor" className="text-accent/20" />
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-accent"
      />
    </svg>
  );
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.floor(h / 24);
  return `il y a ${d} j`;
}
