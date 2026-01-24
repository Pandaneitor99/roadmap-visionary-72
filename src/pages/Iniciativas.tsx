import { useState } from "react";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { initiatives, krDetailsQ1 } from "@/data/initiatives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

type FilterType = "all" | "experience" | "adoption" | "non-dev";
type StatusFilter = "all" | "in-progress" | "not-started" | "backlog";

export default function Iniciativas() {
  const [objectiveFilter, setObjectiveFilter] = useState<FilterType>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredInitiatives = initiatives.filter((i) => {
    const matchesObjective = objectiveFilter === "all" || i.objectiveTag === objectiveFilter;
    const matchesStatus = statusFilter === "all" || i.status === statusFilter;
    return matchesObjective && matchesStatus;
  });

  const inProgressInitiatives = filteredInitiatives.filter(i => i.status === "in-progress");
  const notStartedInitiatives = filteredInitiatives.filter(i => i.status === "not-started");
  const nonDevInitiatives = notStartedInitiatives.filter(i => i.objectiveTag === "non-dev");
  const devNotStartedInitiatives = notStartedInitiatives.filter(i => i.objectiveTag !== "non-dev");
  const backlogInitiatives = filteredInitiatives.filter(i => i.status === "backlog");

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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted/50 border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filtros:</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Objetivo:</span>
          <div className="flex flex-wrap gap-1">
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
            <Button 
              size="sm" 
              variant={objectiveFilter === "non-dev" ? "default" : "outline"}
              onClick={() => setObjectiveFilter("non-dev")}
              className="h-7 text-xs"
            >
              No desarrollo
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Estado:</span>
          <div className="flex flex-wrap gap-1">
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
              variant={statusFilter === "in-progress" ? "default" : "outline"}
              onClick={() => setStatusFilter("in-progress")}
              className="h-7 text-xs"
            >
              En Progreso
            </Button>
            <Button 
              size="sm" 
              variant={statusFilter === "not-started" ? "default" : "outline"}
              onClick={() => setStatusFilter("not-started")}
              className="h-7 text-xs"
            >
              Por iniciar
            </Button>
            <Button 
              size="sm" 
              variant={statusFilter === "backlog" ? "default" : "outline"}
              onClick={() => setStatusFilter("backlog")}
              className="h-7 text-xs"
            >
              Backlog
            </Button>
          </div>
        </div>
      </div>

      {/* In Progress */}
      {inProgressInitiatives.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-success text-success-foreground">En Progreso</Badge>
            <span className="text-sm text-muted-foreground">({inProgressInitiatives.length})</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {inProgressInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ1} />
            ))}
          </div>
        </div>
      )}

      {/* Por iniciar - Desarrollo */}
      {devNotStartedInitiatives.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="border-primary text-primary">Por iniciar</Badge>
            <span className="text-sm text-muted-foreground">({devNotStartedInitiatives.length})</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {devNotStartedInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ1} />
            ))}
          </div>
        </div>
      )}

      {/* Por iniciar - No de desarrollo */}
      {nonDevInitiatives.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="border-amber-500 text-amber-600">Por iniciar (No desarrollo)</Badge>
            <span className="text-sm text-muted-foreground">({nonDevInitiatives.length})</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Iniciativas que no requieren desarrollo técnico
          </p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {nonDevInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ1} />
            ))}
          </div>
        </div>
      )}

      {/* Backlog */}
      {backlogInitiatives.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Backlog</Badge>
            <span className="text-sm text-muted-foreground">({backlogInitiatives.length})</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {backlogInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} krDetails={krDetailsQ1} />
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
