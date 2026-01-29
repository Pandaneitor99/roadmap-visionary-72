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

// Helper to get display tag info
function getDefaultCategoryDisplay(initiative: Initiative) {
  const categoryTag = initiative.categoryTag;
  
  if (categoryTag === "engagement") {
    return { label: "Engagement", colorClass: "border-[hsl(var(--badge-engagement))] text-[hsl(var(--badge-engagement))]" };
  }
  if (categoryTag === "experimentacion") {
    return { label: "Experimentación", colorClass: "border-[hsl(var(--alegra-orange))] text-[hsl(var(--alegra-orange))]" };
  }
  if (categoryTag === "adopcion") {
    return { label: "Adopción", colorClass: "border-[hsl(var(--badge-adoption))] text-[hsl(var(--badge-adoption))]" };
  }
  if (categoryTag === "experiencia") {
    return { label: "Experiencia", colorClass: "border-[hsl(var(--badge-experience))] text-[hsl(var(--badge-experience))]" };
  }
  
  // Fallback to objectiveTag
  if (initiative.objectiveTag === "experience") {
    return { label: "Experiencia", colorClass: "border-[hsl(var(--badge-experience))] text-[hsl(var(--badge-experience))]" };
  }
  if (initiative.objectiveTag === "adoption") {
    return { label: "Adopción", colorClass: "border-[hsl(var(--badge-adoption))] text-[hsl(var(--badge-adoption))]" };
  }
  
  return { label: "General", colorClass: "border-muted-foreground text-muted-foreground" };
}

// Helper to get status badge info
function getDefaultStatusDisplay(status: string) {
  if (status === "in-progress") {
    return { label: "En Progreso", colorClass: "bg-[hsl(var(--sidebar-background))] text-white" };
  }
  if (status === "not-started" || status === "backlog") {
    return { label: "Por iniciar", colorClass: "bg-muted text-muted-foreground" };
  }
  if (status === "done") {
    return { label: "Completado", colorClass: "bg-[hsl(var(--badge-adoption))] text-white" };
  }
  return { label: status, colorClass: "bg-muted text-muted-foreground" };
}

// Get accent color based on category
function getAccentColor(initiative: Initiative) {
  const categoryTag = initiative.categoryTag;
  
  if (categoryTag === "engagement") {
    return "bg-[hsl(var(--badge-engagement))]";
  }
  if (categoryTag === "experimentacion") {
    return "bg-[hsl(var(--alegra-orange))]";
  }
  if (categoryTag === "adopcion") {
    return "bg-[hsl(var(--badge-adoption))]";
  }
  if (categoryTag === "experiencia") {
    return "bg-[hsl(var(--badge-experience))]";
  }
  
  // Fallback to objectiveTag
  if (initiative.objectiveTag === "experience") {
    return "bg-[hsl(var(--badge-experience))]";
  }
  if (initiative.objectiveTag === "adoption") {
    return "bg-[hsl(var(--badge-adoption))]";
  }
  
  return "bg-muted-foreground";
}

export interface InitiativeCardProps {
  initiative: Initiative;
  /** Optional map to show full KR text in the expanded modal (key: KR id like "KR 2.1") */
  krDetails?: Record<string, string>;
  /** Optional custom function to get category display */
  getCategoryDisplay?: (initiative: Initiative) => { label: string; colorClass: string };
  /** Optional custom function to get status display */
  getStatusDisplay?: (status: string) => { label: string; colorClass: string };
}

export function InitiativeCard({ 
  initiative, 
  krDetails,
  getCategoryDisplay = getDefaultCategoryDisplay,
  getStatusDisplay = getDefaultStatusDisplay 
}: InitiativeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const categoryDisplay = getCategoryDisplay(initiative);
  const statusDisplay = getStatusDisplay(initiative.status);
  const accentColor = getAccentColor(initiative);

  return (
    <>
      <Card 
        className="group relative overflow-hidden border-0 bg-card/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-card cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className={`absolute left-0 top-0 h-full w-1 ${accentColor}`} />
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold leading-tight text-foreground">
              {initiative.title}
            </h3>
            <Badge className={statusDisplay.colorClass}>
              {statusDisplay.label}
            </Badge>
          </div>
          <Badge
            variant="outline"
            className={`w-fit ${categoryDisplay.colorClass}`}
          >
            {categoryDisplay.label}
          </Badge>
          {initiative.exampleLink && (
            <a 
              href={initiative.exampleLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Ver ejemplo <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Problema
            </h4>
            <p className="text-sm text-foreground/80 line-clamp-2">{initiative.problem}</p>
          </div>
          {initiative.keyResults.length > 0 && (
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
          )}
          {initiative.date !== "-" && (
            <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Lanzamiento: {initiative.date}</span>
            </div>
          )}
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
                  <Badge className={statusDisplay.colorClass}>
                    {statusDisplay.label}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={categoryDisplay.colorClass}
                  >
                    {categoryDisplay.label}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Estrategia / Objetivo completo */}
            {initiative.objectiveText !== "Iniciativa no de desarrollo" && (
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Estrategia / Objetivo
                </h4>
                <p className="text-sm text-foreground">{initiative.objectiveText}</p>
              </div>
            )}

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
            {initiative.keyResults.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Key Results Relacionados
                </h4>
                <div className="space-y-2">
                  {initiative.keyResults.map((kr, index) => (
                    <div key={index} className="rounded-lg border bg-background p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <Target className="h-3 w-3 mr-1" />
                          {kr}
                        </Badge>
                      </div>
                      {krDetails?.[kr] && (
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {krDetails[kr]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* KPIs */}
            {initiative.kpis.length > 0 && (
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
            )}

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
            {initiative.date !== "-" && (
              <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground border-t">
                <Calendar className="h-4 w-4" />
                <span>Fecha estimada de lanzamiento: <span className="font-medium text-foreground">{initiative.date}</span></span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
