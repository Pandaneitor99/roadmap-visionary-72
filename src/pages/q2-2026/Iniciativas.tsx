import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { initiativesQ22026, krDetailsQ22026 } from "@/data/q2-2026";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type StatusFilter = "todos" | "por-iniciar" | "en-progreso";

function getCategoryDisplay(initiative: typeof initiativesQ22026[0]) {
  const categoryTag = initiative.categoryTag;
  if (categoryTag === "engagement") return { label: "Engagement", colorClass: "border-[hsl(var(--badge-engagement))] text-[hsl(var(--badge-engagement))]" };
  if (categoryTag === "experimentacion") return { label: "Experimentación", colorClass: "border-[hsl(var(--alegra-orange))] text-[hsl(var(--alegra-orange))]" };
  if (categoryTag === "adopcion") return { label: "Adopción", colorClass: "border-[hsl(var(--badge-adoption))] text-[hsl(var(--badge-adoption))]" };
  if (categoryTag === "experiencia") return { label: "Experiencia", colorClass: "border-[hsl(var(--badge-experience))] text-[hsl(var(--badge-experience))]" };
  if (initiative.objectiveTag === "experience") return { label: "Experiencia", colorClass: "border-[hsl(var(--badge-experience))] text-[hsl(var(--badge-experience))]" };
  if (initiative.objectiveTag === "adoption") return { label: "Adopción", colorClass: "border-[hsl(var(--badge-adoption))] text-[hsl(var(--badge-adoption))]" };
  return { label: "General", colorClass: "border-muted-foreground text-muted-foreground" };
}

function getStatusDisplay(status: string) {
  if (status === "in-progress") return { label: "En Progreso", colorClass: "bg-[hsl(var(--sidebar-background))] text-white" };
  if (status === "not-started" || status === "backlog" || status === "should-have") return { label: "Por iniciar", colorClass: "bg-muted text-muted-foreground" };
  if (status === "done") return { label: "Completado", colorClass: "bg-[hsl(var(--badge-adoption))] text-white" };
  return { label: status, colorClass: "bg-muted text-muted-foreground" };
}

export default function IniciativasQ22026() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [devOpen, setDevOpen] = useState(true);
  const [nonDevOpen, setNonDevOpen] = useState(true);

  // All Q2 initiatives (excluding backlog trade-offs to focus on Q2 commitment)
  const q2Initiatives = initiativesQ22026.filter(i => i.status !== "backlog");

  const filterByStatus = (items: typeof initiativesQ22026) => {
    if (statusFilter === "todos") return items;
    if (statusFilter === "en-progreso") return items.filter(i => i.status === "in-progress");
    if (statusFilter === "por-iniciar") return items.filter(i => i.status === "not-started" || i.status === "should-have");
    return items;
  };

  const devInitiatives = filterByStatus(q2Initiatives.filter(i => i.objectiveTag !== "non-dev"));
  const nonDevInitiatives = filterByStatus(q2Initiatives.filter(i => i.objectiveTag === "non-dev"));
  const devInProgress = devInitiatives.filter(i => i.status === "in-progress");
  const devNotStarted = devInitiatives.filter(i => i.status === "not-started" || i.status === "should-have");
  const nonDevInProgress = nonDevInitiatives.filter(i => i.status === "in-progress");
  const nonDevNotStarted = nonDevInitiatives.filter(i => i.status === "not-started" || i.status === "should-have");

  const statusFilters: { value: StatusFilter; label: string }[] = [
    { value: "todos", label: "Todos" },
    { value: "por-iniciar", label: "Por iniciar" },
    { value: "en-progreso", label: "En progreso" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Iniciativas Q2 2026</h1>
          <p className="text-muted-foreground">Todas las iniciativas planeadas para TMD Mobile Q2 2026</p>
          <p className="text-xs text-muted-foreground mt-1">Haz clic en una tarjeta para ver los detalles completos</p>
        </div>
        <Badge className="bg-[hsl(var(--sidebar-background))] text-white px-4 py-2 text-sm font-medium h-fit">
          Q2 · {q2Initiatives.length} iniciativas
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground mr-2">Por estado:</span>
          {statusFilters.map((filter) => (
            <Button key={filter.value} variant={statusFilter === filter.value ? "default" : "outline"} size="sm"
              onClick={() => setStatusFilter(filter.value)}
              className={statusFilter === filter.value ? "bg-[hsl(var(--sidebar-background))] hover:bg-[hsl(var(--sidebar-background))]/90 text-white" : "hover:bg-muted-foreground/20 hover:text-foreground"}>
              {filter.label}
            </Button>
          ))}
        </div>

        {(devInProgress.length > 0 || devNotStarted.length > 0) && (
          <Collapsible open={devOpen} onOpenChange={setDevOpen}>
            <div className="flex items-center gap-3 mb-4">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors">
                    🛠️ Desarrollo
                    {devOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                  </Badge>
                </Button>
              </CollapsibleTrigger>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">{devInitiatives.length} iniciativas</span>
            </div>
            <CollapsibleContent className="space-y-6">
              {devInProgress.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getStatusDisplay("in-progress").colorClass}>{getStatusDisplay("in-progress").label}</Badge>
                    <span className="text-sm text-muted-foreground">({devInProgress.length})</span>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {devInProgress.map((initiative) => (
                      <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ22026} getCategoryDisplay={getCategoryDisplay} getStatusDisplay={getStatusDisplay} />
                    ))}
                  </div>
                </div>
              )}
              {devNotStarted.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getStatusDisplay("not-started").colorClass}>{getStatusDisplay("not-started").label}</Badge>
                    <span className="text-sm text-muted-foreground">({devNotStarted.length})</span>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {devNotStarted.map((initiative) => (
                      <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ22026} getCategoryDisplay={getCategoryDisplay} getStatusDisplay={getStatusDisplay} />
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        )}

        {(nonDevInProgress.length > 0 || nonDevNotStarted.length > 0) && (
          <Collapsible open={nonDevOpen} onOpenChange={setNonDevOpen}>
            <div className="flex items-center gap-3 mb-4">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                  <Badge className="bg-amber-500 text-white px-4 py-1.5 text-sm font-medium cursor-pointer hover:bg-amber-500/90 transition-colors">
                    📋 No Desarrollo
                    {nonDevOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                  </Badge>
                </Button>
              </CollapsibleTrigger>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">{nonDevInitiatives.length} iniciativas</span>
            </div>
            <CollapsibleContent className="space-y-6">
              {nonDevInProgress.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getStatusDisplay("in-progress").colorClass}>{getStatusDisplay("in-progress").label}</Badge>
                    <span className="text-sm text-muted-foreground">({nonDevInProgress.length})</span>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {nonDevInProgress.map((initiative) => (
                      <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ22026} getCategoryDisplay={getCategoryDisplay} getStatusDisplay={getStatusDisplay} />
                    ))}
                  </div>
                </div>
              )}
              {nonDevNotStarted.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getStatusDisplay("not-started").colorClass}>{getStatusDisplay("not-started").label}</Badge>
                    <span className="text-sm text-muted-foreground">({nonDevNotStarted.length})</span>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {nonDevNotStarted.map((initiative) => (
                      <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ22026} getCategoryDisplay={getCategoryDisplay} getStatusDisplay={getStatusDisplay} />
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        )}

        {devInitiatives.length === 0 && nonDevInitiatives.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No hay iniciativas que coincidan con el filtro seleccionado.
          </div>
        )}
      </div>
    </div>
  );
}
