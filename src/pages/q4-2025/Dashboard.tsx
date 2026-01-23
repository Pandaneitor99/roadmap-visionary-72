import { Lightbulb, Target, CalendarCheck, TrendingUp, Compass, Star } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { OKRCard } from "@/components/dashboard/OKRCard";
import { initiativesQ42025, okrsQ42025, krDetailsQ42025 } from "@/data/q4-2025";
import { strategyInfo } from "@/data/initiatives";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardQ42025() {
  const notDoneCount = initiativesQ42025.filter((i) => i.status !== "done").length;
  const doneCount = initiativesQ42025.filter((i) => i.status === "done").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Q4 2025</h1>
        <p className="text-muted-foreground">Vista general del roadmap TMD Mobile Q4 2025</p>
      </div>

      {/* Strategy & North Star */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Compass className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold text-primary">Estrategia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">{strategyInfo.strategy}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-[hsl(var(--alegra-orange))]/5 to-[hsl(var(--alegra-orange))]/10 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--alegra-orange))]/10">
                <Star className="h-4 w-4 text-[hsl(var(--alegra-orange))]" />
              </div>
              <CardTitle className="text-sm font-semibold text-[hsl(var(--alegra-orange))]">North Star Metric</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">{strategyInfo.northStarMetric}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Iniciativas Totales" value={initiativesQ42025.length} subtitle="Q4 2025" icon={Lightbulb} />
        <StatCard
          title="No terminadas"
          value={notDoneCount}
          subtitle="Pendientes"
          icon={TrendingUp}
        />
        <StatCard title="Terminadas" value={doneCount} subtitle="Completadas" icon={CalendarCheck} />
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
