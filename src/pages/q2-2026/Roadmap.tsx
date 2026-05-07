import { RoadmapGantt } from "@/components/dashboard/RoadmapGantt";

export default function RoadmapQ22026() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Roadmap Q2 2026</h1>
        <p className="text-muted-foreground">
          Cronograma de desarrollo por sprints
        </p>
      </div>

      <RoadmapGantt quarter="q2" startSprint={9} initialSprintCount={8} />
    </div>
  );
}
