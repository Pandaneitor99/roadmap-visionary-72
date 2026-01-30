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
  { id: 1, label: "S1", dates: "Ene 5 - Ene 18", weeks: [1, 2] },
  { id: 2, label: "S2", dates: "Ene 19 - Feb 1", weeks: [3, 4] },
  { id: 3, label: "S3", dates: "Feb 2 - Feb 15", weeks: [5, 6] },
  { id: 4, label: "S4", dates: "Feb 16 - Mar 1", weeks: [7, 8] },
  { id: 5, label: "S5", dates: "Mar 2 - Mar 15", weeks: [9, 10] },
  { id: 6, label: "S6", dates: "Mar 16 - Mar 29", weeks: [11, 12] },
  { id: 7, label: "S7", dates: "Mar 30 - Apr 12", weeks: [13, 14] },
  { id: 8, label: "S8", dates: "Apr 13 - Apr 26", weeks: [15, 16] },
  { id: 9, label: "S9", dates: "Apr 27 - May 10", weeks: [17, 18] },
  { id: 10, label: "S10", dates: "May 11 - May 24", weeks: [19, 20] },
  { id: 11, label: "S11", dates: "May 25 - Jun 7", weeks: [21, 22] },
  { id: 12, label: "S12", dates: "Jun 8 - Jun 21", weeks: [23, 24] },
  { id: 13, label: "S13", dates: "Jun 22 - Jul 5", weeks: [25, 26] },
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
  // Onboarding
  { id: "onboarding", title: "Onboarding", type: "feature", objectiveTag: "adoption", weekStart: 3, weekEnd: 3, initiativeId: "onboarding" },
  
  // Rediseño Facturación Costa Rica
  { id: "cr-mvp", title: "Rediseño Facturación CR 4.4", type: "feature", objectiveTag: "adoption", weekStart: 4, weekEnd: 6, initiativeId: "1" },
  { id: "cr-v2", title: "Rediseño Facturación CR V2", type: "feature", objectiveTag: "adoption", weekStart: 7, weekEnd: 7, initiativeId: "1" },
  
  // Creación de Items
  { id: "items", title: "Creación de Items", type: "feature", objectiveTag: "adoption", weekStart: 8, weekEnd: 10, initiativeId: "4" },
  
  // Calificación Tiendas
  { id: "rating", title: "Calificación Tiendas app", type: "feature", objectiveTag: "experience", weekStart: 10, weekEnd: 10, initiativeId: "3" },
  
  // Rediseño Facturación Colombia
  { id: "co", title: "Rediseño Facturación Colombia", type: "feature", objectiveTag: "adoption", weekStart: 11, weekEnd: 13, initiativeId: "5" },
  
  // Rediseño Facturación República Dominicana
  { id: "rd", title: "Rediseño Facturación RD", type: "feature", objectiveTag: "adoption", weekStart: 15, weekEnd: 16, initiativeId: "11" },
  
  // Adición de Ítems
  { id: "adicion-items", title: "Adición de Ítems", type: "feature", objectiveTag: "adoption", weekStart: 17, weekEnd: 20, initiativeId: "13" },
  
  // Soporte
  { id: "soporte", title: "Soporte", type: "feature", objectiveTag: "experience", weekStart: 21, weekEnd: 22, initiativeId: "22" },
  
  // Rediseño Facturación México
  { id: "mx", title: "Rediseño Facturación MX", type: "feature", objectiveTag: "adoption", weekStart: 23, weekEnd: 24, initiativeId: "12" },
  
  // Estabilización - Issues
  { id: "issues-1", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 2, weekEnd: 2, initiativeId: "2" },
  { id: "issues-2", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 7, weekEnd: 7, initiativeId: "2" },
  { id: "issues-3", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 14, weekEnd: 14, initiativeId: "2" },
  { id: "issues-4", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 25, weekEnd: 25, initiativeId: "2" },
  
  // Estabilización - Mejoras generales
  { id: "mejoras-1", title: "Mejoras", type: "improvements", objectiveTag: "experience", weekStart: 1, weekEnd: 1, initiativeId: "2" },
  { id: "mejoras-2", title: "Mejoras", type: "improvements", objectiveTag: "experience", weekStart: 6, weekEnd: 6, initiativeId: "2" },
  { id: "mejoras-3", title: "Mejoras", type: "improvements", objectiveTag: "experience", weekStart: 14, weekEnd: 14, initiativeId: "2" },
  { id: "mejoras-4", title: "Mejoras", type: "improvements", objectiveTag: "experience", weekStart: 26, weekEnd: 26, initiativeId: "2" },
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
      <div className="overflow-x-auto rounded-2xl bg-card/60 backdrop-blur-md border border-white/10 p-4 shadow-lg">
        <div className="min-w-[1200px]">
          {/* Header - Sprints */}
          <div className="mb-2 grid grid-cols-[140px_repeat(13,1fr)] gap-0.5">
            <div className="text-xs font-medium text-muted-foreground">Iniciativa</div>
            {sprints.map((sprint) => (
              <div
                key={sprint.id}
                className="rounded-lg bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 px-1 py-1.5 text-center shadow-sm"
              >
                <div className="text-xs font-medium text-foreground">{sprint.label}</div>
                <div className="text-[9px] text-muted-foreground leading-tight">{sprint.dates}</div>
              </div>
            ))}
          </div>

          {/* Sub-header - Weeks */}
          <div className="mb-3 grid grid-cols-[140px_repeat(26,1fr)] gap-0.5">
            <div></div>
            {Array.from({ length: 26 }, (_, i) => (
              <div
                key={i}
                className="rounded-md bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/5 px-0.5 py-0.5 text-center text-[9px] text-muted-foreground"
              >
                W{i + 1}
              </div>
            ))}
          </div>

          {/* Feature Rows */}
          <div className="space-y-1">
            {/* Onboarding */}
            <RoadmapRow
              label="Onboarding"
              items={roadmapItems.filter(i => i.id === "onboarding")}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Rediseño Facturación Costa Rica */}
            <RoadmapRow
              label="Rediseño Fact. CR"
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
              label="Rediseño Fact. CO"
              items={roadmapItems.filter(i => i.id === "co")}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Separator */}
            <div className="border-t border-border my-2" />
            
            {/* Should-Haves Section */}
            <div className="text-xs font-medium text-muted-foreground mb-1 pl-1">Should-Haves</div>

            {/* Rediseño Facturación República Dominicana */}
            <RoadmapRow
              label="Rediseño Fact. RD"
              items={roadmapItems.filter(i => i.id === "rd")}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Adición de Ítems */}
            <RoadmapRow
              label="Adición de Ítems"
              items={roadmapItems.filter(i => i.id === "adicion-items")}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Soporte */}
            <RoadmapRow
              label="Soporte"
              items={roadmapItems.filter(i => i.id === "soporte")}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Rediseño Facturación México */}
            <RoadmapRow
              label="Rediseño Fact. MX"
              items={roadmapItems.filter(i => i.id === "mx")}
              onItemClick={handleItemClick}
              getItemColor={getItemColor}
            />

            {/* Separator */}
            <div className="border-t border-border my-2" />

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
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/10 pt-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--badge-experience))]" />
              <span className="text-[10px] text-muted-foreground">Experiencia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--badge-adoption))]" />
              <span className="text-[10px] text-muted-foreground">Adopción y Engagement</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-[10px] text-muted-foreground">Issues</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--badge-experience))]" />
              <span className="text-[10px] text-muted-foreground">Mejoras</span>
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
                    {selectedInitiative.status === "in-progress" ? "En Progreso" : "Por iniciar"}
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
    <div className="grid grid-cols-[140px_repeat(26,1fr)] items-center gap-0.5">
      <div 
        className="truncate text-xs font-medium text-foreground pr-1 overflow-hidden whitespace-nowrap" 
        style={{ textOverflow: 'ellipsis' }}
        title={label}
      >
        {label}
      </div>
      {Array.from({ length: 26 }, (_, weekIndex) => {
        const week = weekIndex + 1;
        const item = items.find(i => week >= i.weekStart && week <= i.weekEnd);
        const isStart = item?.weekStart === week;
        const isEnd = item?.weekEnd === week;
        const isSingle = item && item.weekStart === item.weekEnd;

        if (!item) {
          return <div key={week} className="h-7" />;
        }

        return (
          <div
            key={week}
            onClick={() => onItemClick(item)}
            title={item.title}
            className={`flex h-7 items-center text-[8px] font-medium text-white cursor-pointer transition-all hover:opacity-90 hover:scale-[1.02] overflow-hidden ${getItemColor(item)} ${
              isSingle ? "rounded-md" : isStart ? "rounded-l-md" : isEnd ? "rounded-r-md" : ""
            }`}
          >
            {isStart && (
              <span 
                className="block w-full px-1 overflow-hidden whitespace-nowrap"
                style={{ textOverflow: 'ellipsis' }}
              >
                {item.title}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}