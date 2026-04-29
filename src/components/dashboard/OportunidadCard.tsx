import { Lightbulb, Sparkles, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Q2Opportunity } from "@/data/q2-opportunities";

const ALEGRA_GREEN = "#00B386";

const tagColor = (t: string) => {
  if (t === "Engagement") return "#FF6B00";
  if (t === "Adopción") return ALEGRA_GREEN;
  if (t === "Experiencia") return "#0066FF";
  return "#737373";
};

export function OportunidadCard({ op }: { op: Q2Opportunity }) {
  const links = op.links ?? (op.link ? [{ label: "Ver diseño", url: op.link }] : []);
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <div
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${ALEGRA_GREEN}15` }}
          >
            <Lightbulb className="h-4 w-4" style={{ color: ALEGRA_GREEN }} />
          </div>
          <h3 className="text-sm font-bold leading-snug text-neutral-900">{op.title}</h3>
        </div>
        {links.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 justify-end">
            {links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors hover:bg-emerald-50"
                style={{
                  borderColor: `${ALEGRA_GREEN}55`,
                  color: ALEGRA_GREEN,
                  backgroundColor: `${ALEGRA_GREEN}10`,
                }}
              >
                <Sparkles className="h-3 w-3" /> {l.label}{" "}
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {op.tags.map((t) => (
          <Badge
            key={t}
            variant="outline"
            className="text-[10px] font-semibold"
            style={{ borderColor: tagColor(t), color: tagColor(t) }}
          >
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Diagnóstico
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600">{op.diagnostico}</p>
      </div>

      <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50/40 p-3">
        <p
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: ALEGRA_GREEN }}
        >
          Oportunidad
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-700">{op.oportunidad}</p>
      </div>
    </div>
  );
}
