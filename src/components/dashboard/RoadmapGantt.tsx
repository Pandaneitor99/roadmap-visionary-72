import { useState, useRef, useCallback, useEffect } from "react";
import { initiatives } from "@/data/initiatives";
import { supabase } from "@/integrations/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar, MapPin, Users, Target, Lightbulb, AlertCircle, Pencil, GripVertical, Loader2, Plus, Trash2 } from "lucide-react";

// Base date: Monday Jan 5 2026
const BASE_DATE = new Date(2026, 0, 5); // Jan 5, 2026

const MONTH_NAMES_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function generateSprints(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const startDay = new Date(BASE_DATE);
    startDay.setDate(startDay.getDate() + i * 14); // each sprint = 2 weeks
    const endDay = new Date(startDay);
    endDay.setDate(endDay.getDate() + 13); // 14 days total (Mon to Sun next week)

    const startStr = `${MONTH_NAMES_ES[startDay.getMonth()]} ${startDay.getDate()}`;
    const endStr = `${MONTH_NAMES_ES[endDay.getMonth()]} ${endDay.getDate()}`;

    return {
      id: i + 1,
      label: `S${i + 1}`,
      dates: `${startStr} - ${endStr}`,
      weeks: [i * 2 + 1, i * 2 + 2] as [number, number],
    };
  });
}

const INITIAL_SPRINT_COUNT = 13;

export interface RoadmapItem {
  id: string;
  title: string;
  type: "feature" | "issues" | "improvements";
  objectiveTag: "experience" | "adoption" | "recurring";
  weekStart: number;
  weekEnd: number;
  initiativeId?: string;
  rowId: string;
}

interface RowDef {
  id: string;
  label: string;
  section: "must" | "should" | "stabilization";
}

const initialRows: RowDef[] = [
  { id: "onboarding", label: "Onboarding", section: "must" },
  { id: "cr", label: "Rediseño Fact. CR", section: "must" },
  { id: "items", label: "Creación de Items", section: "must" },
  { id: "rating", label: "Calificación Tiendas", section: "must" },
  { id: "co", label: "Rediseño Fact. CO", section: "must" },
  { id: "rd", label: "Rediseño Fact. RD", section: "should" },
  { id: "adicion-items", label: "Adición de Ítems", section: "should" },
  { id: "soporte", label: "Soporte", section: "should" },
  { id: "mx", label: "Rediseño Fact. MX", section: "should" },
  { id: "issues", label: "Estabilización - Issues", section: "stabilization" },
  { id: "mejoras", label: "Estabilización - Mejoras", section: "stabilization" },
];

const initialItems: RoadmapItem[] = [
  { id: "onboarding", title: "Onboarding", type: "feature", objectiveTag: "adoption", weekStart: 3, weekEnd: 3, initiativeId: "onboarding", rowId: "onboarding" },
  { id: "cr-mvp", title: "Rediseño Facturación CR 4.4", type: "feature", objectiveTag: "adoption", weekStart: 4, weekEnd: 6, initiativeId: "1", rowId: "cr" },
  { id: "cr-v2", title: "Rediseño Facturación CR V2", type: "feature", objectiveTag: "adoption", weekStart: 7, weekEnd: 7, initiativeId: "1", rowId: "cr" },
  { id: "items", title: "Creación de Items", type: "feature", objectiveTag: "adoption", weekStart: 8, weekEnd: 10, initiativeId: "4", rowId: "items" },
  { id: "rating", title: "Calificación Tiendas app", type: "feature", objectiveTag: "experience", weekStart: 10, weekEnd: 10, initiativeId: "3", rowId: "rating" },
  { id: "co", title: "Rediseño Facturación Colombia", type: "feature", objectiveTag: "adoption", weekStart: 11, weekEnd: 13, initiativeId: "5", rowId: "co" },
  { id: "rd", title: "Rediseño Facturación RD", type: "feature", objectiveTag: "adoption", weekStart: 15, weekEnd: 16, initiativeId: "11", rowId: "rd" },
  { id: "adicion-items", title: "Adición de Ítems", type: "feature", objectiveTag: "adoption", weekStart: 17, weekEnd: 20, initiativeId: "13", rowId: "adicion-items" },
  { id: "soporte", title: "Soporte", type: "feature", objectiveTag: "experience", weekStart: 21, weekEnd: 22, initiativeId: "22", rowId: "soporte" },
  { id: "mx", title: "Rediseño Facturación MX", type: "feature", objectiveTag: "adoption", weekStart: 23, weekEnd: 24, initiativeId: "12", rowId: "mx" },
  { id: "issues-1", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 2, weekEnd: 2, initiativeId: "2", rowId: "issues" },
  { id: "issues-2", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 7, weekEnd: 7, initiativeId: "2", rowId: "issues" },
  { id: "issues-3", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 14, weekEnd: 14, initiativeId: "2", rowId: "issues" },
  { id: "issues-4", title: "Issues", type: "issues", objectiveTag: "recurring", weekStart: 25, weekEnd: 25, initiativeId: "2", rowId: "issues" },
  { id: "mejoras-1", title: "Mejoras", type: "improvements", objectiveTag: "experience", weekStart: 1, weekEnd: 1, initiativeId: "2", rowId: "mejoras" },
  { id: "mejoras-2", title: "Mejoras", type: "improvements", objectiveTag: "experience", weekStart: 6, weekEnd: 6, initiativeId: "2", rowId: "mejoras" },
  { id: "mejoras-3", title: "Mejoras", type: "improvements", objectiveTag: "experience", weekStart: 14, weekEnd: 14, initiativeId: "2", rowId: "mejoras" },
  { id: "mejoras-4", title: "Mejoras", type: "improvements", objectiveTag: "experience", weekStart: 26, weekEnd: 26, initiativeId: "2", rowId: "mejoras" },
];

interface DragState {
  item: RoadmapItem;
  offsetWeek: number;
}

interface ResizeState {
  itemId: string;
  edge: "start" | "end";
  originalStart: number;
  originalEnd: number;
}

export function RoadmapGantt() {
  const [items, setItems] = useState<RoadmapItem[]>(initialItems);
  const [rows, setRows] = useState<RowDef[]>(initialRows);
  const [loading, setLoading] = useState(true);
  const [selectedInitiative, setSelectedInitiative] = useState<typeof initiatives[0] | null>(null);
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);
  const [dropTarget, setDropTarget] = useState<{ rowId: string; week: number } | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const resizeRef = useRef<ResizeState | null>(null);
  const [dragRowId, setDragRowId] = useState<string | null>(null);
  const [sprintCount, setSprintCount] = useState(INITIAL_SPRINT_COUNT);
  const sprints = generateSprints(sprintCount);
  const totalWeeks = sprintCount * 2;
  const [resizingItemId, setResizingItemId] = useState<string | null>(null);

  // New item creation state
  const [creatingItem, setCreatingItem] = useState<{ rowId: string; week: number } | null>(null);
  const [newItemData, setNewItemData] = useState<Partial<RoadmapItem>>({
    title: "",
    type: "feature",
    objectiveTag: "adoption",
  });

  // Delete confirmation
  const [deletingItem, setDeletingItem] = useState<RoadmapItem | null>(null);

  // Add row state
  const [showAddRow, setShowAddRow] = useState(false);
  const [newRowData, setNewRowData] = useState({ label: "", section: "must" as RowDef["section"] });

  // Delete row confirmation
  

  // Load data from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [rowsRes, itemsRes] = await Promise.all([
          supabase.from("roadmap_rows").select("*").order("sort_order"),
          supabase.from("roadmap_items").select("*"),
        ]);

        if (rowsRes.data && rowsRes.data.length > 0) {
          setRows(rowsRes.data.map((r: any) => ({
            id: r.id,
            label: r.label,
            section: r.section as RowDef["section"],
          })));
        }

        if (itemsRes.data && itemsRes.data.length > 0) {
          setItems(itemsRes.data.map((i: any) => ({
            id: i.id,
            title: i.title,
            type: i.type as RoadmapItem["type"],
            objectiveTag: i.objective_tag as RoadmapItem["objectiveTag"],
            weekStart: i.week_start,
            weekEnd: i.week_end,
            initiativeId: i.initiative_id,
            rowId: i.row_id,
          })));
        }
      } catch (err) {
        console.log("Using local data (Supabase not available):", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Persist item to Supabase
  const saveItem = useCallback(async (item: RoadmapItem) => {
    try {
      await supabase.from("roadmap_items").upsert({
        id: item.id,
        title: item.title,
        type: item.type,
        objective_tag: item.objectiveTag,
        week_start: item.weekStart,
        week_end: item.weekEnd,
        initiative_id: item.initiativeId || null,
        row_id: item.rowId,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error saving item:", err);
    }
  }, []);

  // Delete item from Supabase
  const deleteItemFromDb = useCallback(async (itemId: string) => {
    try {
      await supabase.from("roadmap_items").delete().eq("id", itemId);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  }, []);

  // Persist rows order to Supabase
  const saveRows = useCallback(async (newRows: RowDef[]) => {
    try {
      const updates = newRows.map((r, idx) => ({
        id: r.id,
        label: r.label,
        section: r.section,
        sort_order: idx,
        updated_at: new Date().toISOString(),
      }));
      await supabase.from("roadmap_rows").upsert(updates);
    } catch (err) {
      console.error("Error saving rows:", err);
    }
  }, []);

  // Save a single new row to Supabase
  const saveNewRow = useCallback(async (row: RowDef, sortOrder: number) => {
    try {
      await supabase.from("roadmap_rows").upsert({
        id: row.id,
        label: row.label,
        section: row.section,
        sort_order: sortOrder,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error saving new row:", err);
    }
  }, []);

  // Delete row from Supabase (cascade deletes items)
  const deleteRowFromDb = useCallback(async (rowId: string) => {
    try {
      await supabase.from("roadmap_rows").delete().eq("id", rowId);
    } catch (err) {
      console.error("Error deleting row:", err);
    }
  }, []);

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

  // --- Create Item ---
  const handleCellClick = useCallback((rowId: string, week: number) => {
    // Only create if cell is empty
    const existing = items.find(i => i.rowId === rowId && week >= i.weekStart && week <= i.weekEnd);
    if (existing) return;
    setCreatingItem({ rowId, week });
    setNewItemData({ title: "", type: "feature", objectiveTag: "adoption" });
  }, [items]);

  const handleCreateItem = useCallback(() => {
    if (!creatingItem || !newItemData.title?.trim()) return;
    const newId = `item-${Date.now()}`;
    const newItem: RoadmapItem = {
      id: newId,
      title: newItemData.title!.trim(),
      type: newItemData.type as RoadmapItem["type"] || "feature",
      objectiveTag: newItemData.objectiveTag as RoadmapItem["objectiveTag"] || "adoption",
      weekStart: creatingItem.week,
      weekEnd: creatingItem.week,
      rowId: creatingItem.rowId,
    };
    setItems(prev => [...prev, newItem]);
    saveItem(newItem);
    setCreatingItem(null);
  }, [creatingItem, newItemData, saveItem]);

  // --- Delete Item ---
  const handleConfirmDelete = useCallback(() => {
    if (!deletingItem) return;
    setItems(prev => prev.filter(i => i.id !== deletingItem.id));
    deleteItemFromDb(deletingItem.id);
    setDeletingItem(null);
    setEditingItem(null);
  }, [deletingItem, deleteItemFromDb]);

  // --- Add Row ---
  const handleAddRow = useCallback(() => {
    if (!newRowData.label.trim()) return;
    const newId = `row-${Date.now()}`;
    const newRow: RowDef = {
      id: newId,
      label: newRowData.label.trim(),
      section: newRowData.section,
    };
    setRows(prev => {
      const updated = [...prev, newRow];
      saveNewRow(newRow, updated.length - 1);
      return updated;
    });
    setNewRowData({ label: "", section: "must" });
    setShowAddRow(false);
  }, [newRowData, saveNewRow]);


  // --- Move Row Up/Down ---
  const moveRow = useCallback((rowId: string, direction: "up" | "down") => {
    setRows(prev => {
      const idx = prev.findIndex(r => r.id === rowId);
      if (idx === -1) return prev;
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const newRows = [...prev];
      [newRows[idx], newRows[targetIdx]] = [newRows[targetIdx], newRows[idx]];
      saveRows(newRows);
      return newRows;
    });
  }, [saveRows]);

  // --- Resize handlers ---
  const handleResizeStart = useCallback((e: React.MouseEvent, itemId: string, edge: "start" | "end") => {
    e.preventDefault();
    e.stopPropagation();
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    resizeRef.current = { itemId, edge, originalStart: item.weekStart, originalEnd: item.weekEnd };
    setResizingItemId(itemId);
  }, [items]);

  const handleResizeMove = useCallback((rowId: string, week: number) => {
    const resize = resizeRef.current;
    if (!resize) return;

    const item = items.find(i => i.id === resize.itemId);
    if (!item) return;

    let newStart = item.weekStart;
    let newEnd = item.weekEnd;

    if (resize.edge === "start") {
      newStart = Math.max(1, Math.min(week, item.weekEnd));
    } else {
      newEnd = Math.max(week, item.weekStart);
    }

    const rowItems = items.filter(i => i.rowId === rowId && i.id !== resize.itemId);
    const hasCollision = rowItems.some(i =>
      (newStart >= i.weekStart && newStart <= i.weekEnd) ||
      (newEnd >= i.weekStart && newEnd <= i.weekEnd) ||
      (newStart <= i.weekStart && newEnd >= i.weekEnd)
    );
    if (hasCollision) return;

    setItems(prev => prev.map(i =>
      i.id === resize.itemId ? { ...i, weekStart: newStart, weekEnd: newEnd } : i
    ));
  }, [items]);

  const handleResizeEnd = useCallback(() => {
    if (resizeRef.current) {
      const item = items.find(i => i.id === resizeRef.current?.itemId);
      if (item) saveItem(item);
    }
    resizeRef.current = null;
    setResizingItemId(null);
  }, [items, saveItem]);

  useEffect(() => {
    const onMouseUp = () => {
      if (resizeRef.current) {
        handleResizeEnd();
      }
    };
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [handleResizeEnd]);

  // --- Drag and Drop for items ---
  const handleDragStart = useCallback((e: React.DragEvent, item: RoadmapItem, week: number) => {
    const offsetWeek = week - item.weekStart;
    dragRef.current = { item, offsetWeek };
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, rowId: string, week: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropTarget({ rowId, week });
  }, []);

  const handleDragLeave = useCallback(() => {
    setDropTarget(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetRowId: string, targetWeek: number) => {
    e.preventDefault();
    setDropTarget(null);
    const drag = dragRef.current;
    if (!drag) return;

    const duration = drag.item.weekEnd - drag.item.weekStart;
    const newStart = targetWeek - drag.offsetWeek;
    const newEnd = newStart + duration;

    if (newStart < 1) return;

    const rowItems = items.filter(i => i.rowId === targetRowId && i.id !== drag.item.id);
    const hasCollision = rowItems.some(i =>
      (newStart >= i.weekStart && newStart <= i.weekEnd) ||
      (newEnd >= i.weekStart && newEnd <= i.weekEnd) ||
      (newStart <= i.weekStart && newEnd >= i.weekEnd)
    );
    if (hasCollision) return;

    const updatedItem = { ...drag.item, weekStart: newStart, weekEnd: newEnd, rowId: targetRowId };
    setItems(prev => prev.map(i =>
      i.id === drag.item.id ? updatedItem : i
    ));
    saveItem(updatedItem);
    dragRef.current = null;
  }, [items, saveItem]);

  // --- Row reorder drag ---
  const handleRowDragStart = useCallback((e: React.DragEvent, rowId: string) => {
    setDragRowId(rowId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/row", rowId);
  }, []);

  const handleRowDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleRowDrop = useCallback((e: React.DragEvent, targetRowId: string) => {
    e.preventDefault();
    if (!dragRowId || dragRowId === targetRowId) {
      setDragRowId(null);
      return;
    }
    setRows(prev => {
      const newRows = [...prev];
      const fromIdx = newRows.findIndex(r => r.id === dragRowId);
      const toIdx = newRows.findIndex(r => r.id === targetRowId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      // Adopt the target row's section
      newRows[fromIdx] = { ...newRows[fromIdx], section: newRows[toIdx].section };
      const [moved] = newRows.splice(fromIdx, 1);
      newRows.splice(toIdx, 0, moved);
      saveRows(newRows);
      return newRows;
    });
    setDragRowId(null);
  }, [dragRowId, saveRows]);

  // --- Edit item ---
  const handleEditSave = useCallback(() => {
    if (!editingItem) return;
    setItems(prev => prev.map(i => i.id === editingItem.id ? editingItem : i));
    saveItem(editingItem);
    setEditingItem(null);
  }, [editingItem, saveItem]);

  const renderSection = (sectionRows: RowDef[], sectionLabel?: string) => (
    <>
      {sectionLabel && (
        <div className="text-xs font-medium text-muted-foreground mb-1 pl-1">{sectionLabel}</div>
      )}
      {sectionRows.map((row, idx) => {
        const rowItems = items.filter(i => i.rowId === row.id);
        return (
          <RoadmapRow
            key={row.id}
            row={row}
            items={rowItems}
            totalWeeks={totalWeeks}
            onItemClick={handleItemClick}
            getItemColor={getItemColor}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onEditItem={setEditingItem}
            dropTarget={dropTarget}
            onRowDragStart={handleRowDragStart}
            onRowDragOver={handleRowDragOver}
            onRowDrop={handleRowDrop}
            onResizeStart={handleResizeStart}
            onResizeMove={handleResizeMove}
            resizingItemId={resizingItemId}
            onCellClick={handleCellClick}
          />
        );
      })}
    </>
  );

  const mustRows = rows.filter(r => r.section === "must");
  const shouldRows = rows.filter(r => r.section === "should");
  const stabRows = rows.filter(r => r.section === "stabilization");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Cargando roadmap...</span>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl bg-card/60 backdrop-blur-md border border-white/10 p-4 shadow-lg">
        <div className="min-w-[1200px]">
          {/* Header - Sprints */}
          <div className="mb-2" style={{ display: "grid", gridTemplateColumns: `160px repeat(${sprintCount}, 1fr)`, gap: "2px" }}>
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
          <div className="mb-3" style={{ display: "grid", gridTemplateColumns: `160px repeat(${totalWeeks}, 1fr)`, gap: "2px" }}>
            <div></div>
            {Array.from({ length: totalWeeks }, (_, i) => (
              <div
                key={i}
                className="rounded-md bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/5 px-0.5 py-0.5 text-center text-[9px] text-muted-foreground"
              >
                W{i + 1}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="space-y-1">
            {renderSection(mustRows)}

            <div className="border-t border-border my-2" />
            {renderSection(shouldRows, "Should-Haves")}

            <div className="border-t border-border my-2" />
            {renderSection(stabRows)}
          </div>

          {/* Add Row / Add Sprint Buttons */}
          <div className="mt-3 flex justify-start gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground gap-1"
              onClick={() => setShowAddRow(true)}
            >
              <Plus className="h-3 w-3" />
              Agregar fila
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground gap-1"
              onClick={() => setSprintCount(prev => prev + 1)}
            >
              <Plus className="h-3 w-3" />
              Agregar sprint
            </Button>
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
            <div className="ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Plus className="h-3 w-3" /> Clic celda vacía para crear ·
              <GripVertical className="h-3 w-3" /> Arrastra filas y bloques
            </div>
          </div>
        </div>
      </div>

      {/* Initiative Detail Modal */}
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
                  <p className="text-sm text-muted-foreground leading-relaxed pl-5">
                    {selectedInitiative.problem}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <span>Hipótesis</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-5">
                    {selectedInitiative.hypothesis}
                  </p>
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

      {/* Edit Item Modal */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-md">
          {editingItem && (
            <>
              <DialogHeader>
                <DialogTitle>Editar Iniciativa</DialogTitle>
                <DialogDescription>Modifica las propiedades del bloque en el roadmap.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={editingItem.title}
                    onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select
                      value={editingItem.type}
                      onValueChange={v => setEditingItem({ ...editingItem, type: v as RoadmapItem["type"] })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature">Feature</SelectItem>
                        <SelectItem value="issues">Issues</SelectItem>
                        <SelectItem value="improvements">Mejoras</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Objetivo</Label>
                    <Select
                      value={editingItem.objectiveTag}
                      onValueChange={v => setEditingItem({ ...editingItem, objectiveTag: v as RoadmapItem["objectiveTag"] })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adoption">Adopción</SelectItem>
                        <SelectItem value="experience">Experiencia</SelectItem>
                        <SelectItem value="recurring">Recurrente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Semana inicio</Label>
                    <Input
                      type="number"
                      min={1}
                      max={totalWeeks}
                      value={editingItem.weekStart}
                      onChange={e => setEditingItem({ ...editingItem, weekStart: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Semana fin</Label>
                    <Input
                      type="number"
                      min={editingItem.weekStart}
                      max={totalWeeks}
                      value={editingItem.weekEnd}
                      onChange={e => setEditingItem({ ...editingItem, weekEnd: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeletingItem(editingItem)}
                    className="gap-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Eliminar
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditingItem(null)}>Cancelar</Button>
                    <Button onClick={handleEditSave}>Guardar</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Item Modal */}
      <Dialog open={!!creatingItem} onOpenChange={() => setCreatingItem(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nueva Celda</DialogTitle>
            <DialogDescription>
              Crear un nuevo bloque en semana W{creatingItem?.week} de la fila "{rows.find(r => r.id === creatingItem?.rowId)?.label}".
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={newItemData.title || ""}
                onChange={e => setNewItemData({ ...newItemData, title: e.target.value })}
                placeholder="Nombre de la celda"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select
                  value={newItemData.type || "feature"}
                  onValueChange={v => setNewItemData({ ...newItemData, type: v as RoadmapItem["type"] })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="issues">Issues</SelectItem>
                    <SelectItem value="improvements">Mejoras</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Objetivo</Label>
                <Select
                  value={newItemData.objectiveTag || "adoption"}
                  onValueChange={v => setNewItemData({ ...newItemData, objectiveTag: v as RoadmapItem["objectiveTag"] })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adoption">Adopción</SelectItem>
                    <SelectItem value="experience">Experiencia</SelectItem>
                    <SelectItem value="recurring">Recurrente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setCreatingItem(null)}>Cancelar</Button>
              <Button onClick={handleCreateItem} disabled={!newItemData.title?.trim()}>Crear</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Row Modal */}
      <Dialog open={showAddRow} onOpenChange={setShowAddRow}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nueva Fila</DialogTitle>
            <DialogDescription>Agregar una nueva fila de iniciativa al roadmap.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                value={newRowData.label}
                onChange={e => setNewRowData({ ...newRowData, label: e.target.value })}
                placeholder="Nombre de la iniciativa"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label>Sección</Label>
              <Select
                value={newRowData.section}
                onValueChange={v => setNewRowData({ ...newRowData, section: v as RowDef["section"] })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="must">Must-Have</SelectItem>
                  <SelectItem value="should">Should-Have</SelectItem>
                  <SelectItem value="stabilization">Estabilización</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowAddRow(false)}>Cancelar</Button>
              <Button onClick={handleAddRow} disabled={!newRowData.label.trim()}>Agregar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Item Confirmation */}
      <AlertDialog open={!!deletingItem} onOpenChange={() => setDeletingItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar celda?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará "{deletingItem?.title}" del roadmap. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </>
  );
}

// --- Row Component ---

interface RoadmapRowProps {
  row: RowDef;
  items: RoadmapItem[];
  totalWeeks: number;
  onItemClick: (item: RoadmapItem) => void;
  getItemColor: (item: RoadmapItem) => string;
  onDragStart: (e: React.DragEvent, item: RoadmapItem, week: number) => void;
  onDragOver: (e: React.DragEvent, rowId: string, week: number) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, rowId: string, week: number) => void;
  onEditItem: (item: RoadmapItem) => void;
  dropTarget: { rowId: string; week: number } | null;
  onRowDragStart: (e: React.DragEvent, rowId: string) => void;
  onRowDragOver: (e: React.DragEvent) => void;
  onRowDrop: (e: React.DragEvent, rowId: string) => void;
  onResizeStart: (e: React.MouseEvent, itemId: string, edge: "start" | "end") => void;
  onResizeMove: (rowId: string, week: number) => void;
  resizingItemId: string | null;
  onCellClick: (rowId: string, week: number) => void;
}

function RoadmapRow({
  row,
  items,
  totalWeeks,
  onItemClick,
  getItemColor,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onEditItem,
  dropTarget,
  onRowDragStart,
  onRowDragOver,
  onRowDrop,
  onResizeStart,
  onResizeMove,
  resizingItemId,
  onCellClick,
}: RoadmapRowProps) {
  return (
    <div
      className="grid grid-cols-[160px_repeat(26,1fr)] items-center gap-0.5"
      onDragOver={onRowDragOver}
      onDrop={e => onRowDrop(e, row.id)}
    >
      {/* Row label with grip handle, edit, delete, and move buttons */}
      <div
        className="group/label flex items-center gap-0.5 truncate text-xs font-medium text-foreground pr-1 cursor-grab active:cursor-grabbing"
        draggable
        onDragStart={e => onRowDragStart(e, row.id)}
        title={row.label}
      >
        <GripVertical className="h-3 w-3 text-muted-foreground flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity" />
        <span className="overflow-hidden whitespace-nowrap flex-1" style={{ textOverflow: "ellipsis" }}>
          {row.label}
        </span>
        {items.length > 0 && (
          <button
            onClick={e => { e.stopPropagation(); onEditItem(items[0]); }}
            className="opacity-0 group-hover/label:opacity-100 transition-opacity hover:bg-muted rounded p-0.5 flex-shrink-0"
            title="Editar iniciativa"
            draggable={false}
            onDragStart={e => e.stopPropagation()}
          >
            <Pencil className="h-2.5 w-2.5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Week cells */}
      {Array.from({ length: 26 }, (_, weekIndex) => {
        const week = weekIndex + 1;
        const item = items.find(i => week >= i.weekStart && week <= i.weekEnd);
        const isStart = item?.weekStart === week;
        const isEnd = item?.weekEnd === week;
        const isSingle = item && item.weekStart === item.weekEnd;
        const isDropHere = dropTarget?.rowId === row.id && dropTarget?.week === week && !item;
        const isResizing = item && resizingItemId === item.id;

        if (!item) {
          return (
            <div
              key={week}
              className={`h-7 rounded-sm transition-colors cursor-pointer group/cell ${
                isDropHere
                  ? "bg-primary/20 border border-dashed border-primary/40"
                  : "hover:bg-white/5"
              }`}
              onDragOver={e => onDragOver(e, row.id, week)}
              onDragLeave={onDragLeave}
              onDrop={e => onDrop(e, row.id, week)}
              onMouseMove={() => {
                if (resizingItemId) onResizeMove(row.id, week);
              }}
              onClick={() => onCellClick(row.id, week)}
            >
              <div className="h-full w-full flex items-center justify-center opacity-0 group-hover/cell:opacity-40 transition-opacity">
                <Plus className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
          );
        }

        return (
          <div
            key={week}
            draggable={!isResizing}
            onDragStart={e => {
              if (isResizing) { e.preventDefault(); return; }
              onDragStart(e, item, week);
            }}
            onClick={() => onItemClick(item)}
            onMouseMove={() => {
              if (resizingItemId === item.id) onResizeMove(row.id, week);
            }}
            title={item.title}
            className={`group relative flex h-7 items-center text-[8px] font-medium text-white cursor-grab active:cursor-grabbing transition-all hover:opacity-90 hover:scale-[1.02] overflow-hidden ${getItemColor(item)} ${
              isSingle ? "rounded-md" : isStart ? "rounded-l-md" : isEnd ? "rounded-r-md" : ""
            }`}
          >
            {/* Left resize handle */}
            {isStart && (
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize z-10 hover:bg-white/30 transition-colors"
                onMouseDown={e => onResizeStart(e, item.id, "start")}
                draggable={false}
              />
            )}
            {isStart && (
              <span
                className="block w-full px-2 overflow-hidden whitespace-nowrap"
                style={{ textOverflow: "ellipsis" }}
              >
                {item.title}
              </span>
            )}
            {/* Right resize handle */}
            {isEnd && (
              <div
                className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize z-10 hover:bg-white/30 transition-colors"
                onMouseDown={e => onResizeStart(e, item.id, "end")}
                draggable={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
