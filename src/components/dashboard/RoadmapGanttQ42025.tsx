import { useState } from "react";
import { initiativesQ42025, roadmapQ42025 } from "@/data/q4-2025";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Target, Lightbulb, AlertCircle } from "lucide-react";

interface RoadmapItem {
  id: string;
  title: string;
  objectiveTag: "experience" | "adoption";
  weekStart: number;
  weekEnd: number;
  initiativeId: string;
}

export function RoadmapGanttQ42025() {
  const [selectedInitiative, setSelectedInitiative] = useState<(typeof initiativesQ42025)[0] | null>(null);

  const items = roadmapQ42025.items as RoadmapItem[];
  const getInitiative = (id?: string) => initiativesQ42025.find((i) => i.id === id);

  const rows = initiativesQ42025
    .map((initiative) => ({
      initiative,
      items: items.filter((it) => it.initiativeId === initiative.id),
    }))
    .filter((row) => row.items.length > 0);

  const getItemColor = (item: RoadmapItem) => {
    if (item.objectiveTag === "experience") return "bg-[hsl(var(--badge-experience))]";
    return "bg-[hsl(var(--badge-adoption))]";
  };

  const handleItemClick = (item: RoadmapItem) => {
    const initiative = getInitiative(item.initiativeId);
    if (initiative) setSelectedInitiative(initiative);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl bg-card p-6 shadow-sm">
        <div className="min-w-[900px]">
          <div className="mb-2 grid grid-cols-[180px_repeat(6,1fr)] gap-1">
            <div className="text-sm font-medium text-muted-foreground">Iniciativa</div>
            {roadmapQ42025.sprints.map((s) => (
              <div key={s.id} className="rounded-lg bg-muted px-2 py-2 text-center">
                <div className="text-sm font-medium text-foreground">{s.label}</div>
                <div className="text-xs text-muted-foreground">
                  Semanas {s.weeks[0]}–{s.weeks[1]}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4 grid grid-cols-[180px_repeat(12,1fr)] gap-1">
            <div />
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="rounded bg-muted/50 px-1 py-1 text-center text-xs text-muted-foreground"
              >
                W{i + 1}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {rows.map((row) => (
              <RoadmapRow
                key={row.initiative.id}
                label={row.initiative.title}
                items={row.items}
                onItemClick={handleItemClick}
                getItemColor={getItemColor}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t pt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--badge-experience))]" />
              <span className="text-xs text-muted-foreground">Experiencia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--badge-adoption))]" />
              <span className="text-xs text-muted-foreground">Adopción</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedInitiative} onOpenChange={() => setSelectedInitiative(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedInitiative && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className={
                      selectedInitiative.objectiveTag === "experience"
                        ? "bg-[hsl(var(--badge-experience))]/10 text-[hsl(var(--badge-experience))]"
                        : "bg-[hsl(var(--badge-adoption))]/10 text-[hsl(var(--badge-adoption))]"
                    }
                  >
                    {selectedInitiative.objectiveTag === "experience" ? "Experiencia" : "Adopción"}
                  </Badge>
                  <Badge variant={selectedInitiative.status === "in-progress" ? "default" : "secondary"}>
                    {selectedInitiative.status === "in-progress"
                      ? "En Progreso"
                      : selectedInitiative.status === "done"
                        ? "Done"
                        : "Backlog"}
                  </Badge>
                </div>
                <DialogTitle className="text-xl">{selectedInitiative.title}</DialogTitle>
                <DialogDescription className="text-sm">{selectedInitiative.objectiveText}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedInitiative.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedInitiative.version}</span>
                  </div>
                  {selectedInitiative.dependencies !== "-" && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{selectedInitiative.dependencies}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span>Problema</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-5">{selectedInitiative.problem}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <Lightbulb className="h-4 w-4 text-[hsl(var(--alegra-orange))]" />
                    <span>Hipótesis</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-5">{selectedInitiative.hypothesis}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <Target className="h-4 w-4 text-primary" />
                    <span>Key Results Relacionados</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-5">
                    {selectedInitiative.keyResults.map((kr) => (
                      <Badge key={kr} variant="outline" className="text-xs">
                        {kr}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm font-medium">KPIs</div>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-5">
                    {selectedInitiative.kpis.map((kpi, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {kpi}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

interface RoadmapRowProps {
  label: string;
  items: RoadmapItem[];
  onItemClick: (item: RoadmapItem) => void;
  getItemColor: (item: RoadmapItem) => string;
}

function RoadmapRow({ label, items, onItemClick, getItemColor }: RoadmapRowProps) {
  return (
    <div className="grid grid-cols-[180px_repeat(12,1fr)] items-center gap-1">
      <div className="truncate text-sm font-medium text-foreground pr-2">{label}</div>
      {Array.from({ length: 12 }, (_, weekIndex) => {
        const week = weekIndex + 1;
        const item = items.find((i) => week >= i.weekStart && week <= i.weekEnd);
        const isStart = item?.weekStart === week;
        const isEnd = item?.weekEnd === week;
        const isSingle = item && item.weekStart === item.weekEnd;

        if (!item) return <div key={week} className="h-9" />;

        return (
          <div
            key={week}
            onClick={() => onItemClick(item)}
            className={`flex h-9 items-center justify-center text-xs font-medium text-primary-foreground cursor-pointer transition-all hover:opacity-90 hover:scale-[1.02] ${getItemColor(item)} ${
              isSingle ? "rounded-lg" : isStart ? "rounded-l-lg" : isEnd ? "rounded-r-lg" : ""
            }`}
          >
            {isStart && <span className="truncate px-1 text-[10px]">{item.title}</span>}
          </div>
        );
      })}
    </div>
  );
}
