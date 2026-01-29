import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { initiatives, krDetailsQ1 } from "@/data/initiatives";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabFilter = "must-haves" | "trade-offs";

export default function Iniciativas() {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabFilter) || "must-haves";
  const [activeTab, setActiveTab] = useState<TabFilter>(initialTab);

  useEffect(() => {
    const tab = searchParams.get("tab") as TabFilter;
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Must-Haves: todas las iniciativas menos las del backlog
  const mustHaveInitiatives = initiatives.filter(i => i.status !== "backlog");
  
  // Trade-offs: todas las del backlog
  const tradeOffInitiatives = initiatives.filter(i => i.status === "backlog");

  // Separar Must-Haves en desarrollo y no desarrollo
  const devInitiatives = mustHaveInitiatives.filter(i => i.objectiveTag !== "non-dev");
  const nonDevInitiatives = mustHaveInitiatives.filter(i => i.objectiveTag === "non-dev");

  // Dentro de desarrollo, separar por estado
  const devInProgress = devInitiatives.filter(i => i.status === "in-progress");
  const devNotStarted = devInitiatives.filter(i => i.status === "not-started");

  // Dentro de no desarrollo, separar por estado
  const nonDevInProgress = nonDevInitiatives.filter(i => i.status === "in-progress");
  const nonDevNotStarted = nonDevInitiatives.filter(i => i.status === "not-started");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Iniciativas Q1 2026</h1>
        <p className="text-muted-foreground">
          Todas las iniciativas planeadas para TMD Mobile Q1 2026
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Haz clic en una tarjeta para ver los detalles completos
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabFilter)} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="must-haves" className="flex items-center gap-2">
            Must-Haves
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
              {mustHaveInitiatives.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="trade-offs" className="flex items-center gap-2">
            Trade-offs
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
              {tradeOffInitiatives.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Must-Haves Tab */}
        <TabsContent value="must-haves" className="space-y-8 mt-6">
          {/* Chip separador - Desarrollo */}
          {devInitiatives.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium">
                  🛠️ Desarrollo
                </Badge>
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">{devInitiatives.length} iniciativas</span>
              </div>

              {/* En Progreso - Desarrollo */}
              {devInProgress.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-success text-success-foreground">En Progreso</Badge>
                    <span className="text-sm text-muted-foreground">({devInProgress.length})</span>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {devInProgress.map((initiative) => (
                      <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ1} />
                    ))}
                  </div>
                </div>
              )}

              {/* Por iniciar - Desarrollo */}
              {devNotStarted.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="border-primary text-primary">Por iniciar</Badge>
                    <span className="text-sm text-muted-foreground">({devNotStarted.length})</span>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {devNotStarted.map((initiative) => (
                      <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ1} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chip separador - No Desarrollo */}
          {nonDevInitiatives.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-amber-500 text-white px-4 py-1.5 text-sm font-medium">
                  📋 No Desarrollo
                </Badge>
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">{nonDevInitiatives.length} iniciativas</span>
              </div>

              {/* En Progreso - No Desarrollo */}
              {nonDevInProgress.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-success text-success-foreground">En Progreso</Badge>
                    <span className="text-sm text-muted-foreground">({nonDevInProgress.length})</span>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {nonDevInProgress.map((initiative) => (
                      <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ1} />
                    ))}
                  </div>
                </div>
              )}

              {/* Por iniciar - No Desarrollo */}
              {nonDevNotStarted.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="border-amber-500 text-amber-600">Por iniciar</Badge>
                    <span className="text-sm text-muted-foreground">({nonDevNotStarted.length})</span>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {nonDevNotStarted.map((initiative) => (
                      <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ1} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {mustHaveInitiatives.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No hay iniciativas Must-Have.
            </div>
          )}
        </TabsContent>

        {/* Trade-offs Tab */}
        <TabsContent value="trade-offs" className="space-y-6 mt-6">
          <div className="rounded-lg bg-muted/50 border p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Iniciativas en backlog que podrían ser consideradas si hay capacidad adicional o si las prioridades cambian.
            </p>
          </div>

          {tradeOffInitiatives.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tradeOffInitiatives.map((initiative) => (
                <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ1} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No hay iniciativas en Trade-offs.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
