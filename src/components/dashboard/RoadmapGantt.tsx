import { useState } from "react";
import { initiatives } from "@/data/initiatives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Target, Lightbulb, AlertCircle } from "lucide-react";

const sprints = [
  { id: 1, label: "Sprint 1", dates: "Ene 5 - Ene 18", weeks: [1, 2] },
  { id: 2, label: "Sprint 2", dates: "Ene 19 - Feb 1", weeks: [3, 4] },
  { id: 3, label: "Sprint 3", dates: "Feb 2 - Feb 15", weeks: [5, 6] },
  { id: 4, label: "Sprint 4", dates: "Feb 16 - Mar 1", weeks: [7, 8] },
  { id: 5, label: "Sprint 5", dates: "Mar 2 - Mar 15", weeks: [9, 10] },
  { id: 6, label: "Sprint 6", dates: "Mar 16 - Mar 29", weeks: [11, 12] },
];

interface RoadmapItem {
  id: string;
  title: string;
  type: "feature" | "issues" | "improvements";
  objectiveTag: "experience" | "adoption" | "recurring";
  weekStart: number;
  weekEnd: number;
  initiativeId?: string;
}

const roadmapItems: RoadmapItem[] = [
  // Rediseño Facturación Costa Rica
  { id: "cr-mvp", title: "Rediseño Facturación CR - MVP", type: "feature", objectiveTag: "adoption", weekStart: 3, weekEnd: 5, initiativeId: "1" },
  { id: "cr-v2", title: "Rediseño Facturación CR - V2", type: "feature", objectiveTag: "adoption", weekStart: 6, weekEnd: 6, initiativeId: "1" },
  
  // Creación de Items
  { id: "items", title: "Creación de Items", type: "feature", objectiveTag: "adoption", weekStart: 7, weekEnd: 9, initiativeId: "4" },
  
  // Calificación Tiendas
  { id: "rating", title: "Calificación Tiendas App", type: "feature", objectiveTag: "experience", weekStart: 10, weekEnd: 10, initiativeId: "3" },
  
  // Rediseño Facturación Colombia
  { id: "co", title: "Rediseño Facturación Colombia", type: "feature", objectiveTag: "adoption", weekStart: 11, weekEnd: 12, initiativeId: "5" },
  
  // Estabilización - Issues
  { id: "issues-1", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 2, weekEnd: 2, initiativeId: "2" },
  { id: "issues-2", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 7, weekEnd: 7, initiativeId: "2" },
  { id: "issues-3", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 10, weekEnd: 10, initiativeId: "2" },
  
  // Estabilización - Mejoras generales
  { id: "mejoras-1", title: "Mejoras Generales", type: "improvements", objectiveTag: "experience", weekStart: 1, weekEnd: 1, initiativeId: "2" },
  { id: "mejoras-2", title: "Mejoras Generales", type: "improvements", objectiveTag: "experience", weekStart: 6, weekEnd: 6, initiativeId: "2" },
  { id: "mejoras-3", title: "Mejoras Generales", type: "improvements", objectiveTag: "experience", weekStart: 12, weekEnd: 12, initiativeId: "2" },
];

export function RoadmapGantt() {
  const [selectedInitiative, setSelectedInitiative] = useState<typeof initiatives[0] | null>(null);

  const getInitiative = (id?: string) => initiatives.find(i => i.id === id);

  const getItemColor = (item: RoadmapItem) => {
    if (item.type === "issues") return "bg-amber-500";
    if (item.type === "improvements") return "bg-[hsl(var(--badge-experience))]";
    if (item.objectiveTag === "experience") return "bg-[hsl(var(--badge-experience))]";
    return "bg-[hsl(var(--badge-adoption))]";
  };

  const handleItemClick = (item: RoadmapItem) => {
    const initiative = getInitiative(item.initiativeId);
    if (initiative) {
      setSelectedInitiative(initiative);
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl bg-card p-6 shadow-sm">
        <div className="min-w-[900px]">
          {/* Header - Sprints */}
          <div className="mb-2 grid grid-cols-[180px_repeat(6,1fr)] gap-1">
            <div className="text-sm font-medium text-muted-foreground">Iniciativa</div>
            {sprints.map((sprint) => (
              <div
                key={sprint.id}
                className="rounded-lg bg-muted px-2 py-2 text-center"
              >
                <div className="text-sm font-medium text-foreground">{sprint.label}</div>
                <div className="text-xs text-muted-foreground">{sprint.dates}</div>
              </div>
            ))}
          </div>

          {/* Sub-header - Weeks */}
          <div className="mb-4 grid grid-cols-[180px_repeat(12,1fr)] gap-1">
            <div></div>
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="rounded bg-muted/50 px-1 py-1 text-center text-xs text-muted-foreground"
              >
                S{i + 1}
              </div>
            ))}
          </div>

          {/* Feature Rows */}
          <div className="space-y-2">
            {/* Rediseño Facturación Costa Rica */}
            <RoadmapRow
              label="Rediseño Facturación CR"
              items={roadmapItems.filter(i => i.id.startsWith("cr-"))}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Creación de Items */}
            <RoadmapRow
              label="Creación de Items"
              items={roadmapItems.filter(i => i.id === "items")}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Calificación Tiendas */}
            <RoadmapRow
              label="Calificación Tiendas"
              items={roadmapItems.filter(i => i.id === "rating")}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Rediseño Facturación Colombia */}
            <RoadmapRow
              label="Rediseño Facturación CO"
              items={roadmapItems.filter(i => i.id === "co")}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Separator */}
            <div className="border-t border-border my-3" />

            {/* Estabilización - Issues */}
            <RoadmapRow
              label="Estabilización - Issues"
              items={roadmapItems.filter(i => i.id.startsWith("issues-"))}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Estabilización - Mejoras */}
            <RoadmapRow
              label="Estabilización - Mejoras"
              items={roadmapItems.filter(i => i.id.startsWith("mejoras-"))}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t pt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--badge-experience))]" />
              <span className="text-xs text-muted-foreground">Experiencia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--badge-adoption))]" />
              <span className="text-xs text-muted-foreground">Adopción</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-xs text-muted-foreground">Issues</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--badge-experience))]" />
              <span className="text-xs text-muted-foreground">Mejoras Generales (Experiencia)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Initiative Modal */}
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
                    {selectedInitiative.status === "in-progress" ? "En Progreso" : "Backlog"}
                  </Badge>
                </div>
                <DialogTitle className="text-xl">{selectedInitiative.title}</DialogTitle>
                <DialogDescription className="text-sm">
                  {selectedInitiative.objectiveText}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Meta info */}
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

                {/* Problem */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span>Problema</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-5">
                    {selectedInitiative.problem}
                  </p>
                </div>

                {/* Hypothesis */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <span>Hipótesis</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-5">
                    {selectedInitiative.hypothesis}
                  </p>
                </div>

                {/* Key Results */}
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

                {/* KPIs */}
                <div className="space-y-1.5">
                  <div className="text-sm font-medium">KPIs Impactados</div>
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
        const item = items.find(i => week >= i.weekStart && week <= i.weekEnd);
        const isStart = item?.weekStart === week;
        const isEnd = item?.weekEnd === week;
        const isSingle = item && item.weekStart === item.weekEnd;

        if (!item) {
          return <div key={week} className="h-9" />;
        }

        return (
          <div
            key={week}
            onClick={() => onItemClick(item)}
            className={`flex h-9 items-center justify-center text-xs font-medium text-white cursor-pointer transition-all hover:opacity-90 hover:scale-[1.02] ${getItemColor(item)} ${
              isSingle ? "rounded-lg" : isStart ? "rounded-l-lg" : isEnd ? "rounded-r-lg" : ""
            }`}
          >
            {isStart && (
              <span className="truncate px-1 text-[10px]">
                {item.title}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
