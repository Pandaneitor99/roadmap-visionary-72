import { OKRCard } from "@/components/dashboard/OKRCard";
import { okrs } from "@/data/initiatives";

export default function OKRs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">OKRs 2026</h1>
        <p className="text-muted-foreground">
          Objetivos y Resultados Clave para TMD Mobile
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {okrs.map((okr) => (
          <OKRCard key={okr.id} okr={okr} />
        ))}
      </div>
    </div>
  );
}
