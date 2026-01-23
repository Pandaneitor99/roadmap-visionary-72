import { Lightbulb, Target, CalendarCheck, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { OKRCard } from "@/components/dashboard/OKRCard";
import { initiativesQ42025, okrsQ42025, krDetailsQ42025 } from "@/data/q4-2025";
import { strategyInfo } from "@/data/initiatives";

export default function DashboardQ42025() {
  const inProgressCount = initiativesQ42025.filter((i) => i.status === "in-progress").length;
  const backlogCount = initiativesQ42025.filter((i) => i.status === "backlog").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Q4 2025</h1>
        <p className="text-muted-foreground">Vista general del roadmap TMD Mobile Q4 2025</p>
      </div>

      {/* Strategy & North Star (se mantiene la actual) */}
      <div className="rounded-xl border bg-card p-4">
        <div className="grid gap-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Estrategia</div>
            <p className="text-sm text-foreground/80 leading-relaxed">{strategyInfo.strategy}</p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">North Star Metric</div>
            <p className="text-sm text-foreground/80 leading-relaxed">{strategyInfo.northStarMetric}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Iniciativas Totales" value={initiativesQ42025.length} subtitle="Q4 2025" icon={Lightbulb} />
        <StatCard
          title="En Progreso"
          value={inProgressCount}
          subtitle="Activas ahora"
          icon={TrendingUp}
        />
        <StatCard title="En Backlog" value={backlogCount} subtitle="Por iniciar" icon={CalendarCheck} />
        <StatCard title="OKRs" value={okrsQ42025.length} subtitle="Objetivos" icon={Target} />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">OKRs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {okrsQ42025.map((okr) => (
            <OKRCard key={okr.id} okr={okr} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Iniciativas</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {initiativesQ42025.map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ42025} />
          ))}
        </div>
      </div>
    </div>
  );
}
