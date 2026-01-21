import { Lightbulb, Target, CalendarCheck, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { OKRCard } from "@/components/dashboard/OKRCard";
import { initiatives, okrs } from "@/data/initiatives";

export default function Dashboard() {
  const inProgressCount = initiatives.filter((i) => i.status === "in-progress").length;
  const backlogCount = initiatives.filter((i) => i.status === "backlog").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Vista general del roadmap TMD Mobile 2026</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Iniciativas Totales"
          value={initiatives.length}
          subtitle="Para 2026"
          icon={Lightbulb}
        />
        <StatCard
          title="En Progreso"
          value={inProgressCount}
          subtitle="Activas ahora"
          icon={TrendingUp}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="En Backlog"
          value={backlogCount}
          subtitle="Por iniciar"
          icon={CalendarCheck}
        />
        <StatCard
          title="OKRs Activos"
          value={okrs.length}
          subtitle="Objetivos clave"
          icon={Target}
        />
      </div>

      {/* OKRs Summary */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Resumen de OKRs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {okrs.map((okr) => (
            <OKRCard key={okr.id} okr={okr} />
          ))}
        </div>
      </div>

      {/* Recent Initiatives */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Iniciativas Activas</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {initiatives
            .filter((i) => i.status === "in-progress")
            .map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} />
            ))}
        </div>
      </div>
    </div>
  );
}
