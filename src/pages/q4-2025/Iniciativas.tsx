import { useState } from "react";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { initiativesQ42025, krDetailsQ42025 } from "@/data/q4-2025";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

type FilterType = "all" | "experience" | "adoption";
type StatusFilter = "all" | "done" | "not-done";

export default function IniciativasQ42025() {
  const [objectiveFilter, setObjectiveFilter] = useState<FilterType>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredInitiatives = initiativesQ42025.filter((i) => {
    const matchesObjective = objectiveFilter === "all" || i.objectiveTag === objectiveFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "done" ? i.status === "done" : i.status !== "done");
    return matchesObjective && matchesStatus;
  });

  const notDoneInitiatives = filteredInitiatives.filter((i) => i.status !== "done");
  const doneInitiatives = filteredInitiatives.filter((i) => i.status === "done");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Iniciativas Q4 2025</h1>
        <p className="text-muted-foreground">Todas las iniciativas planeadas para TMD Mobile Q4 2025</p>
        <p className="text-xs text-muted-foreground mt-1">Haz clic en una tarjeta para ver los detalles completos</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted/50 border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filtros:</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Objetivo:</span>
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant={objectiveFilter === "all" ? "default" : "outline"}
              onClick={() => setObjectiveFilter("all")}
              className="h-7 text-xs"
            >
              Todos
            </Button>
            <Button 
              size="sm" 
              variant={objectiveFilter === "experience" ? "default" : "outline"}
              onClick={() => setObjectiveFilter("experience")}
              className="h-7 text-xs"
            >
              Experiencia
            </Button>
            <Button 
              size="sm" 
              variant={objectiveFilter === "adoption" ? "default" : "outline"}
              onClick={() => setObjectiveFilter("adoption")}
              className="h-7 text-xs"
            >
              Adopción
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Estado:</span>
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              className="h-7 text-xs"
            >
              Todos
            </Button>
            <Button 
              size="sm" 
              variant={statusFilter === "done" ? "default" : "outline"}
              onClick={() => setStatusFilter("done")}
              className="h-7 text-xs"
            >
              Terminadas
            </Button>
            <Button 
              size="sm" 
              variant={statusFilter === "not-done" ? "default" : "outline"}
              onClick={() => setStatusFilter("not-done")}
              className="h-7 text-xs"
            >
              No terminadas
            </Button>
          </div>
        </div>
      </div>

      {notDoneInitiatives.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="border-amber-500 text-amber-600">No terminadas</Badge>
            <span className="text-sm text-muted-foreground">({notDoneInitiatives.length})</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {notDoneInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ42025} />
            ))}
          </div>
        </div>
      )}

      {doneInitiatives.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Terminadas</Badge>
            <span className="text-sm text-muted-foreground">({doneInitiatives.length})</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {doneInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ42025} />
            ))}
          </div>
        </div>
      )}

      {filteredInitiatives.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No hay iniciativas que coincidan con los filtros seleccionados.
        </div>
      )}
    </div>
  );
}
