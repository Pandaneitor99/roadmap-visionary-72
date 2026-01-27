import { Lightbulb, CalendarCheck, TrendingUp, Compass, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/dashboard/StatCard";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { OKRCard } from "@/components/dashboard/OKRCard";
import { initiatives, okrs, strategyInfo } from "@/data/initiatives";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const navigate = useNavigate();
  const inProgressCount = initiatives.filter((i) => i.status === "in-progress").length;
  const notStartedCount = initiatives.filter((i) => i.status === "not-started").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Q1 2026</h1>
        <p className="text-muted-foreground">Vista general del roadmap TMD Mobile Q1 2026</p>
      </div>

      {/* Strategy & North Star */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Compass className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold text-primary">Estrategia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {strategyInfo.strategy}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-[hsl(var(--alegra-orange))]/5 to-[hsl(var(--alegra-orange))]/10 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--alegra-orange))]/10">
                <Star className="h-4 w-4 text-[hsl(var(--alegra-orange))]" />
              </div>
              <CardTitle className="text-sm font-semibold text-[hsl(var(--alegra-orange))]">North Star Metric</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {strategyInfo.northStarMetric}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div 
          className="cursor-pointer"
          onClick={() => navigate("/iniciativas")}
        >
          <StatCard
            title="Iniciativas Totales"
            value={5}
            subtitle="Q1 2026"
            icon={Lightbulb}
          />
        </div>
        <div 
          className="cursor-pointer"
          onClick={() => navigate("/iniciativas?status=in-progress")}
        >
          <StatCard
            title="En Progreso"
            value={inProgressCount}
            subtitle="Activas ahora"
            icon={TrendingUp}
          />
        </div>
        <div 
          className="cursor-pointer"
          onClick={() => navigate("/iniciativas?status=not-started")}
        >
          <StatCard
            title="Por iniciar"
            value={3}
            subtitle="Próximas"
            icon={CalendarCheck}
          />
        </div>
        <div 
          className="cursor-pointer"
          onClick={() => navigate("/roadmap")}
        >
          <StatCard
            title="Sprint Actual"
            value={2}
            subtitle="En curso"
            icon={Zap}
          />
        </div>
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
