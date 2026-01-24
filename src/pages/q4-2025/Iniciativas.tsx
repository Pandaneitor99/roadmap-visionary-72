import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { initiativesQ42025, krDetailsQ42025 } from "@/data/q4-2025";
import { Badge } from "@/components/ui/badge";

export default function IniciativasQ42025() {
  const notDoneInitiatives = initiativesQ42025.filter((i) => i.status !== "done");
  const doneInitiatives = initiativesQ42025.filter((i) => i.status === "done");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Iniciativas Q4 2025</h1>
        <p className="text-muted-foreground">Todas las iniciativas planeadas para TMD Mobile Q4 2025</p>
        <p className="text-xs text-muted-foreground mt-1">Haz clic en una tarjeta para ver los detalles completos</p>
      </div>

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
    </div>
  );
}
