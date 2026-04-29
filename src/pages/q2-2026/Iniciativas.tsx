import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { OportunidadCard } from "@/components/dashboard/OportunidadCard";
import { initiativesQ22026, krDetailsQ22026 } from "@/data/q2-2026";
import { q2Opportunities } from "@/data/q2-opportunities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [devOpen, setDevOpen] = useState(true);
  const [nonDevOpen, setNonDevOpen] = useState(true);

  // Non-dev initiatives (kept from existing data)
  const nonDevInitiatives = initiativesQ22026.filter(
    (i) => i.objectiveTag === "non-dev" && i.status !== "backlog",
  );
  const nonDevInProgress = nonDevInitiatives.filter((i) => i.status === "in-progress");
  const nonDevNotStarted = nonDevInitiatives.filter(
    (i) => i.status === "not-started" || i.status === "should-have",
  );

  const totalCount = q2Opportunities.length + nonDevInitiatives.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Iniciativas Q2 2026</h1>
          <p className="text-muted-foreground">
            Oportunidades de desarrollo identificadas en el Roadmap Review e iniciativas no-dev
          </p>
        </div>
        <Badge className="bg-[hsl(var(--sidebar-background))] text-white px-4 py-2 text-sm font-medium h-fit">
          Q2 · {totalCount} iniciativas
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Desarrollo — Oportunidades */}
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
            <span className="text-sm text-muted-foreground">{q2Opportunities.length} oportunidades</span>
          </div>
          <CollapsibleContent>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {q2Opportunities.map((op) => (
                <OportunidadCard key={op.id} op={op} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* No Desarrollo */}
        {nonDevInitiatives.length > 0 && (
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
      </div>
    </div>
  );
}
