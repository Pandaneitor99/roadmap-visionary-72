import { InitiativeCard } from "@/components/dashboard/InitiativeCard";
import { initiatives } from "@/data/initiatives";

export default function Iniciativas() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Iniciativas</h1>
        <p className="text-muted-foreground">
          Todas las iniciativas planeadas para TMD Mobile 2026
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {initiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} initiative={initiative} />
        ))}
      </div>
    </div>
  );
}
