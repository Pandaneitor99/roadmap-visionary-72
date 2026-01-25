import { useState } from "react";
import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { initiatives, krDetailsQ1 } from "@/data/initiatives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

type StatusFilter = "all" | "in-progress" | "not-started" | "backlog";

export default function Iniciativas() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredInitiatives = initiatives.filter((i) => {
    return statusFilter === "all" || i.status === statusFilter;
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

      {/* Filters - Solo por estado */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted/50 border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Estado:</span>
        </div>
        
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
            <Badge variant="outline" className="border-primary text-primary">Por iniciar desarrollo</Badge>
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
            <Badge variant="outline" className="border-amber-500 text-amber-600">Por iniciar no desarrollo</Badge>
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
