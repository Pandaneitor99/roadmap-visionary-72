import { initiatives } from "@/data/initiatives";

const sprints = [
  { id: 1, label: "Sprint 1" },
  { id: 2, label: "Sprint 2" },
  { id: 3, label: "Sprint 3" },
  { id: 4, label: "Sprint 4" },
  { id: 5, label: "Sprint 5" },
  { id: 6, label: "Sprint 6" },
];

export function RoadmapGantt() {
  const sortedInitiatives = [...initiatives].sort((a, b) => {
    // Estabilización goes to bottom
    if (a.title === "Estabilización") return 1;
    if (b.title === "Estabilización") return -1;
    return a.sprintStart - b.sprintStart;
  });

  return (
    <div className="overflow-x-auto rounded-xl bg-card p-6 shadow-sm">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="mb-4 grid grid-cols-[200px_repeat(6,1fr)] gap-2">
          <div className="text-sm font-medium text-muted-foreground">Iniciativa</div>
          {sprints.map((sprint) => (
            <div
              key={sprint.id}
              className="rounded-lg bg-muted px-3 py-2 text-center text-sm font-medium text-foreground"
            >
              {sprint.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {sortedInitiatives.map((initiative) => {
            const isExperience = initiative.objectiveTag === "experience";
            const isStabilization = initiative.title === "Estabilización";
            const startCol = initiative.sprintStart;
            const span = initiative.sprintEnd - initiative.sprintStart + 1;

            return (
              <div
                key={initiative.id}
                className="grid grid-cols-[200px_repeat(6,1fr)] items-center gap-2"
              >
                <div className="truncate text-sm font-medium text-foreground">
                  {initiative.title}
                </div>
                {sprints.map((sprint) => {
                  const isInRange =
                    sprint.id >= initiative.sprintStart && sprint.id <= initiative.sprintEnd;
                  const isStart = sprint.id === initiative.sprintStart;
                  const isEnd = sprint.id === initiative.sprintEnd;

                  if (!isInRange) {
                    return <div key={sprint.id} className="h-10" />;
                  }

                  return (
                    <div
                      key={sprint.id}
                      className={`flex h-10 items-center justify-center text-xs font-medium text-white transition-transform hover:scale-[1.02] ${
                        isStabilization
                          ? "bg-muted-foreground/40"
                          : isExperience
                          ? "bg-[hsl(var(--badge-experience))]"
                          : "bg-[hsl(var(--badge-adoption))]"
                      } ${isStart ? "rounded-l-lg" : ""} ${isEnd ? "rounded-r-lg" : ""}`}
                    >
                      {isStart && !isStabilization && (
                        <span className="truncate px-2">{initiative.title}</span>
                      )}
                      {isStabilization && sprint.id === 3 && (
                        <span className="truncate px-2">Estabilización (Recurrente)</span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-6 border-t pt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(var(--badge-experience))]" />
            <span className="text-xs text-muted-foreground">Experiencia</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(var(--badge-adoption))]" />
            <span className="text-xs text-muted-foreground">Adopción</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted-foreground/40" />
            <span className="text-xs text-muted-foreground">Recurrente</span>
          </div>
        </div>
      </div>
    </div>
  );
}
