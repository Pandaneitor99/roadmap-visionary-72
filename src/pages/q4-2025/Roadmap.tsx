import { RoadmapGanttQ42025 } from "@/components/dashboard/RoadmapGanttQ42025";

export default function RoadmapQ42025() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Roadmap Q4 2025</h1>
        <p className="text-muted-foreground">Cronograma (12 semanas, 6 sprints)</p>
      </div>

      <RoadmapGanttQ42025 />
    </div>
  );
}
