import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { initiatives, krDetailsQ1 } from "@/data/initiatives";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type TabFilter = "must-haves" | "should-haves" | "trade-offs";
type StatusFilter = "todos" | "por-iniciar" | "en-progreso";
type TradeOffFilter = "todos" | "oportunidades" | "requerimientos";

// Helper to get display tag info
function getCategoryDisplay(initiative: typeof initiatives[0]) {
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
function getStatusDisplay(status: string) {
  if (status === "in-progress") {
    return { label: "En Progreso", colorClass: "bg-[hsl(var(--sidebar-background))] text-white" };
  }
  if (status === "not-started" || status === "backlog" || status === "should-have") {
    return { label: "Por iniciar", colorClass: "bg-muted text-muted-foreground" };
  }
  if (status === "done") {
    return { label: "Completado", colorClass: "bg-[hsl(var(--badge-adoption))] text-white" };
  }
  return { label: status, colorClass: "bg-muted text-muted-foreground" };
}

export default function Iniciativas() {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabFilter) || "must-haves";
  const [activeTab, setActiveTab] = useState<TabFilter>(initialTab);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [tradeOffFilter, setTradeOffFilter] = useState<TradeOffFilter>("todos");
  const [devOpen, setDevOpen] = useState(true);
  const [nonDevOpen, setNonDevOpen] = useState(true);

  useEffect(() => {
    const tab = searchParams.get("tab") as TabFilter;
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Must-Haves: todas las iniciativas que no son backlog ni should-have
  const mustHaveInitiatives = initiatives.filter(i => i.status !== "backlog" && i.status !== "should-have");
  
  // Should-Haves: iniciativas marcadas como should-have
  const shouldHaveInitiatives = initiatives.filter(i => i.status === "should-have");
  
  // Trade-offs: todas las del backlog, filtradas por tipo
  const allTradeOffInitiatives = initiatives.filter(i => i.status === "backlog");
  const tradeOffInitiatives = tradeOffFilter === "todos" 
    ? allTradeOffInitiatives 
    : tradeOffFilter === "oportunidades"
      ? allTradeOffInitiatives.filter(i => i.tradeOffType === "oportunidad")
      : allTradeOffInitiatives.filter(i => i.tradeOffType === "requerimiento");

  // Apply status filter
  const filterByStatus = (items: typeof initiatives) => {
    if (statusFilter === "todos") return items;
    if (statusFilter === "en-progreso") return items.filter(i => i.status === "in-progress");
    if (statusFilter === "por-iniciar") return items.filter(i => i.status === "not-started");
    return items;
  };

  // Separar Must-Haves en desarrollo y no desarrollo
  const devInitiatives = filterByStatus(mustHaveInitiatives.filter(i => i.objectiveTag !== "non-dev"));
  const nonDevInitiatives = filterByStatus(mustHaveInitiatives.filter(i => i.objectiveTag === "non-dev"));

  // Dentro de desarrollo, separar por estado
  const devInProgress = devInitiatives.filter(i => i.status === "in-progress");
  const devNotStarted = devInitiatives.filter(i => i.status === "not-started");

  // Dentro de no desarrollo, separar por estado
  const nonDevInProgress = nonDevInitiatives.filter(i => i.status === "in-progress");
  const nonDevNotStarted = nonDevInitiatives.filter(i => i.status === "not-started");

  const statusFilters: { value: StatusFilter; label: string }[] = [
    { value: "todos", label: "Todos" },
    { value: "por-iniciar", label: "Por iniciar" },
    { value: "en-progreso", label: "En progreso" },
  ];

  const tradeOffFilters: { value: TradeOffFilter; label: string }[] = [
    { value: "todos", label: "Todos" },
    { value: "oportunidades", label: "Oportunidades" },
    { value: "requerimientos", label: "Requerimientos" },
  ];

  return (
    <div className="space-y-6">
      {/* Header con tabs a la derecha */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Iniciativas Q1 2026</h1>
          <p className="text-muted-foreground">
            Todas las iniciativas planeadas para TMD Mobile Q1 2026
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Haz clic en una tarjeta para ver los detalles completos
          </p>
        </div>

        {/* Tabs en la esquina superior derecha */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabFilter)} className="w-auto">
          <TabsList className="bg-transparent p-0 gap-2">
            <TabsTrigger 
              value="must-haves" 
              className="data-[state=active]:bg-[hsl(var(--sidebar-background))] data-[state=active]:text-white data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground px-4 py-2 rounded-md font-medium transition-all"
            >
              Must-Haves
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs bg-white/20 text-inherit">
                {mustHaveInitiatives.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="should-haves" 
              className="data-[state=active]:bg-[hsl(var(--sidebar-background))] data-[state=active]:text-white data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground px-4 py-2 rounded-md font-medium transition-all"
            >
              Should-Haves
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs bg-white/20 text-inherit">
                {shouldHaveInitiatives.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="trade-offs" 
              className="data-[state=active]:bg-[hsl(var(--sidebar-background))] data-[state=active]:text-white data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground px-4 py-2 rounded-md font-medium transition-all"
            >
              Trade-offs
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs bg-white/20 text-inherit">
                {allTradeOffInitiatives.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Status filters - only show in Must-Haves tab */}
      {activeTab === "must-haves" && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Por estado:</span>
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={statusFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(filter.value)}
              className={statusFilter === filter.value 
                ? "bg-[hsl(var(--sidebar-background))] hover:bg-[hsl(var(--sidebar-background))]/90 text-white" 
                : "hover:bg-muted-foreground/20 hover:text-foreground"}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      )}

      {/* Tab Content - Must-Haves */}
      {activeTab === "must-haves" && (
        <div className="space-y-6">
          {/* Sección Desarrollo - Colapsable */}
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
                {/* En Progreso - Desarrollo */}
                {devInProgress.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={getStatusDisplay("in-progress").colorClass}>
                        {getStatusDisplay("in-progress").label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">({devInProgress.length})</span>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      {devInProgress.map((initiative) => (
                        <InitiativeCard 
                          key={initiative.id} 
                          initiative={initiative} 
                          krDetails={krDetailsQ1}
                          getCategoryDisplay={getCategoryDisplay}
                          getStatusDisplay={getStatusDisplay}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Por iniciar - Desarrollo */}
                {devNotStarted.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={getStatusDisplay("not-started").colorClass}>
                        {getStatusDisplay("not-started").label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">({devNotStarted.length})</span>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {devNotStarted.map((initiative) => (
                        <InitiativeCard 
                          key={initiative.id} 
                          initiative={initiative} 
                          krDetails={krDetailsQ1}
                          getCategoryDisplay={getCategoryDisplay}
                          getStatusDisplay={getStatusDisplay}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Sección No Desarrollo - Colapsable */}
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
                {/* En Progreso - No Desarrollo */}
                {nonDevInProgress.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={getStatusDisplay("in-progress").colorClass}>
                        {getStatusDisplay("in-progress").label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">({nonDevInProgress.length})</span>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {nonDevInProgress.map((initiative) => (
                        <InitiativeCard 
                          key={initiative.id} 
                          initiative={initiative} 
                          krDetails={krDetailsQ1}
                          getCategoryDisplay={getCategoryDisplay}
                          getStatusDisplay={getStatusDisplay}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Por iniciar - No Desarrollo */}
                {nonDevNotStarted.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={getStatusDisplay("not-started").colorClass}>
                        {getStatusDisplay("not-started").label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">({nonDevNotStarted.length})</span>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {nonDevNotStarted.map((initiative) => (
                        <InitiativeCard 
                          key={initiative.id} 
                          initiative={initiative} 
                          krDetails={krDetailsQ1}
                          getCategoryDisplay={getCategoryDisplay}
                          getStatusDisplay={getStatusDisplay}
                        />
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
      )}

      {/* Tab Content - Should-Haves */}
      {activeTab === "should-haves" && (
        <div className="space-y-6">
          {/* Trade-off type filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Por tipo:</span>
            {tradeOffFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={tradeOffFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTradeOffFilter(filter.value)}
                className={tradeOffFilter === filter.value 
                  ? "bg-[hsl(var(--sidebar-background))] hover:bg-[hsl(var(--sidebar-background))]/90 text-white" 
                  : "hover:bg-muted-foreground/20 hover:text-foreground"}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="rounded-lg bg-muted/50 border p-4">
            <p className="text-sm text-muted-foreground">
              Iniciativas importantes que se implementarán si hay capacidad adicional durante el semestre.
            </p>
          </div>

          {(() => {
            const filteredShouldHaves = tradeOffFilter === "todos" 
              ? shouldHaveInitiatives 
              : tradeOffFilter === "oportunidades"
                ? shouldHaveInitiatives.filter(i => i.tradeOffType === "oportunidad")
                : shouldHaveInitiatives.filter(i => i.tradeOffType === "requerimiento");

            return filteredShouldHaves.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredShouldHaves.map((initiative) => (
                  <InitiativeCard 
                    key={initiative.id} 
                    initiative={initiative} 
                    krDetails={krDetailsQ1}
                    getCategoryDisplay={getCategoryDisplay}
                    getStatusDisplay={getStatusDisplay}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No hay iniciativas en Should-Haves que coincidan con el filtro.
              </div>
            );
          })()}
        </div>
      )}

      {/* Tab Content - Trade-offs */}
      {activeTab === "trade-offs" && (
        <div className="space-y-6">
          {/* Trade-off type filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Por tipo:</span>
            {tradeOffFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={tradeOffFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTradeOffFilter(filter.value)}
                className={tradeOffFilter === filter.value 
                  ? "bg-[hsl(var(--sidebar-background))] hover:bg-[hsl(var(--sidebar-background))]/90 text-white" 
                  : "hover:bg-muted-foreground/20 hover:text-foreground"}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="rounded-lg bg-muted/50 border p-4">
            <p className="text-sm text-muted-foreground">
              Iniciativas en backlog que podrían ser consideradas si hay capacidad adicional o si las prioridades cambian.
            </p>
          </div>

          {tradeOffInitiatives.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tradeOffInitiatives.map((initiative) => (
                <InitiativeCard 
                  key={initiative.id} 
                  initiative={initiative} 
                  krDetails={krDetailsQ1}
                  getCategoryDisplay={getCategoryDisplay}
                  getStatusDisplay={getStatusDisplay}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No hay iniciativas en Trade-offs que coincidan con el filtro.
            </div>
          )}
        </div>
      )}
    </div>
  );
}