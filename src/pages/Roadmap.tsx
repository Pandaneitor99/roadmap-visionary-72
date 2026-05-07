import { RoadmapGantt } from "@/components/dashboard/RoadmapGantt";

export default function Roadmap() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Roadmap</h1>
        <p className="text-muted-foreground">
          Cronograma de desarrollo por sprints
        </p>
      </div>

      <RoadmapGantt quarter="q1" />
    </div>
  );
}
