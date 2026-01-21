import { Calendar, Target } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Initiative } from "@/data/initiatives";

interface InitiativeCardProps {
  initiative: Initiative;
}

export function InitiativeCard({ initiative }: InitiativeCardProps) {
  const isExperience = initiative.objectiveTag === "experience";

  return (
    <Card className="group relative overflow-hidden border-0 bg-card shadow-sm transition-all hover:shadow-md">
      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          isExperience ? "bg-[hsl(var(--badge-experience))]" : "bg-[hsl(var(--badge-adoption))]"
        }`}
      />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight text-foreground">
            {initiative.title}
          </h3>
          <Badge
            variant={initiative.status === "in-progress" ? "default" : "secondary"}
            className={
              initiative.status === "in-progress"
                ? "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] hover:bg-[hsl(var(--success))]"
                : ""
            }
          >
            {initiative.status === "in-progress" ? "In Progress" : "Backlog"}
          </Badge>
        </div>
        <Badge
          variant="outline"
          className={`w-fit ${
            isExperience
              ? "border-[hsl(var(--badge-experience))] text-[hsl(var(--badge-experience))]"
              : "border-[hsl(var(--badge-adoption))] text-[hsl(var(--badge-adoption))]"
          }`}
        >
          {isExperience ? "Experiencia" : "Adopción"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Problema
          </h4>
          <p className="text-sm text-foreground/80">{initiative.problem}</p>
        </div>
        <div>
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Hipótesis
          </h4>
          <p className="text-sm text-foreground/80">{initiative.hypothesis}</p>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            KPIs Impactados
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {initiative.kpis.map((kpi, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
              >
                <Target className="h-3 w-3" />
                {kpi}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Lanzamiento: {initiative.date}</span>
        </div>
      </CardContent>
    </Card>
  );
}
