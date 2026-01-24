import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { initiatives } from "@/data/initiatives";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export default function Iniciativas() {
  const inProgressInitiatives = initiatives.filter(i => i.status === "in-progress");
  const notStartedInitiatives = initiatives.filter(i => i.status === "not-started");
  const nonDevInitiatives = notStartedInitiatives.filter(i => i.objectiveTag === "non-dev");
  const devNotStartedInitiatives = notStartedInitiatives.filter(i => i.objectiveTag !== "non-dev");
  const backlogInitiatives = initiatives.filter(i => i.status === "backlog");

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

      {/* In Progress */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-success text-success-foreground">En Progreso</Badge>
          <span className="text-sm text-muted-foreground">({inProgressInitiatives.length})</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {inProgressInitiatives.map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} />
          ))}
        </div>
      </div>

      {/* Por iniciar - Desarrollo */}
      {devNotStartedInitiatives.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="border-primary text-primary">Por iniciar</Badge>
            <span className="text-sm text-muted-foreground">({devNotStartedInitiatives.length})</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {devNotStartedInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} />
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
            <a 
              href="https://linear.app/mobile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 ml-2 text-primary hover:underline"
            >
              Ver ejemplo <ExternalLink className="h-3 w-3" />
            </a>
          </p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {nonDevInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} />
            ))}
          </div>
        </div>
      )}

      {/* Backlog */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">Backlog</Badge>
          <span className="text-sm text-muted-foreground">({backlogInitiatives.length})</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {backlogInitiatives.map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} />
          ))}
        </div>
      </div>
    </div>
  );
}
