import { useState } from "react";
import { Calendar, Target, MapPin, Users, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Initiative } from "@/data/initiatives";

interface InitiativeCardProps {
  initiative: Initiative;
}

export function InitiativeCard({ initiative }: InitiativeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isExperience = initiative.objectiveTag === "experience";

  return (
    <>
      <Card 
        className="group relative overflow-hidden border-0 bg-card shadow-sm transition-all hover:shadow-md cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
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
                  ? "bg-success text-success-foreground hover:bg-success"
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
            <p className="text-sm text-foreground/80 line-clamp-2">{initiative.problem}</p>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Key Results
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {initiative.keyResults.map((kr, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  <Target className="h-3 w-3" />
                  {kr}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Lanzamiento: {initiative.date}</span>
          </div>
        </CardContent>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </div>
      </Card>

      {/* Modal for expanded view */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <DialogTitle className="text-xl">{initiative.title}</DialogTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={initiative.status === "in-progress" ? "default" : "secondary"}
                    className={
                      initiative.status === "in-progress"
                        ? "bg-success text-success-foreground"
                        : ""
                    }
                  >
                    {initiative.status === "in-progress" ? "In Progress" : "Backlog"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      isExperience
                        ? "border-[hsl(var(--badge-experience))] text-[hsl(var(--badge-experience))]"
                        : "border-[hsl(var(--badge-adoption))] text-[hsl(var(--badge-adoption))]"
                    }
                  >
                    {isExperience ? "Experiencia" : "Adopción"}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Estrategia / Objetivo completo */}
            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Estrategia / Objetivo
              </h4>
              <p className="text-sm text-foreground">{initiative.objectiveText}</p>
            </div>

            {/* Problema */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Problema a resolver
              </h4>
              <p className="text-sm text-foreground/80">{initiative.problem}</p>
            </div>

            {/* Hipótesis */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Hipótesis
              </h4>
              <p className="text-sm text-foreground/80">{initiative.hypothesis}</p>
            </div>

            {/* Key Results */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Key Results Relacionados
              </h4>
              <div className="flex flex-wrap gap-2">
                {initiative.keyResults.map((kr, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    <Target className="h-3 w-3 mr-1" />
                    {kr}
                  </Badge>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                KPIs
              </h4>
              <div className="flex flex-wrap gap-2">
                {initiative.kpis.map((kpi, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {kpi}
                  </div>
                ))}
              </div>
            </div>

            {/* Info adicional */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3" />
                  Versión / País
                </div>
                <p className="text-sm font-medium">{initiative.version}</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Users className="h-3 w-3" />
                  Dependencias
                </div>
                <p className="text-sm font-medium">{initiative.dependencies}</p>
              </div>
            </div>

            {/* Fecha */}
            <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground border-t">
              <Calendar className="h-4 w-4" />
              <span>Fecha estimada de lanzamiento: <span className="font-medium text-foreground">{initiative.date}</span></span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
