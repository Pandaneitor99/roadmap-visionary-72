import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { initiatives } from "@/data/initiatives";
import { Badge } from "@/components/ui/badge";

export default function Iniciativas() {
  const inProgressInitiatives = initiatives.filter(i => i.status === "in-progress");
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
          <Badge className="bg-success text-success-foreground">In Progress</Badge>
          <span className="text-sm text-muted-foreground">({inProgressInitiatives.length})</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {inProgressInitiatives.map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} />
          ))}
        </div>
      </div>

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
