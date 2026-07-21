import { RoadmapGantt } from "@/components/dashboard/RoadmapGantt";

export default function RoadmapQ32026() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Roadmap Q3 2026</h1>
        <p className="text-muted-foreground">
          Cronograma de desarrollo por sprints
        </p>
      </div>

      <RoadmapGantt quarter="q3" seedFrom="q2" startSprint={14} initialSprintCount={7} />
    </div>
  );
}
