export interface Initiative {
  id: string;
  title: string;
  status: "in-progress" | "backlog";
  date: string;
  objectiveTag: "experience" | "adoption";
  problem: string;
  hypothesis: string;
  kpis: string[];
  sprintStart: number;
  sprintEnd: number;
}

export const initiatives: Initiative[] = [
  {
    id: "1",
    title: "Rediseño Facturación Costa Rica",
    status: "in-progress",
    date: "04/02/2026",
    objectiveTag: "adoption",
    problem: "La conversión en app (63%) es mucho menor que en web (CO 83%, RD 77%) y el volumen de facturas no creció con la versión 4.4.",
    hypothesis: "Rediseñar la factura aumentará la intención de uso y la adopción cross-platform.",
    kpis: ["KR 2.1 (Ventas)", "KR 2.2 (Conversión)", "KR 2.3 (WAU)"],
    sprintStart: 1,
    sprintEnd: 2,
  },
  {
    id: "2",
    title: "Estabilización",
    status: "in-progress",
    date: "12/03/2026",
    objectiveTag: "experience",
    problem: "Se reportan 8k errores semanales en Sentry/Amplitude.",
    hypothesis: "Corregir errores proactivamente antes del reporte incrementará la satisfacción.",
    kpis: ["KR 1.3 (Reducción de errores)"],
    sprintStart: 1,
    sprintEnd: 6,
  },
  {
    id: "3",
    title: "Creación de ítems (Rediseño)",
    status: "backlog",
    date: "26/03/2026",
    objectiveTag: "adoption",
    problem: "La pantalla actual no tiene los mismos campos que la web, limitando su uso.",
    hypothesis: "Un nuevo flujo de creación y adición de ítems aumentará la creación de facturas.",
    kpis: ["KR 2.1", "KR 2.2", "KR 2.3 (Creación de items y facturas)"],
    sprintStart: 3,
    sprintEnd: 4,
  },
  {
    id: "4",
    title: "Calificación Tiendas",
    status: "backlog",
    date: "12/02/2026",
    objectiveTag: "experience",
    problem: "Las apps con >4.5 estrellas tienen mejor conversión de descarga y visibilidad.",
    hypothesis: "Incentivar la calificación tras una factura exitosa mejorará el rating en tiendas.",
    kpis: ["KR 1.1 (Google Play)", "KR 1.2 (App Store)"],
    sprintStart: 5,
    sprintEnd: 6,
  },
  {
    id: "5",
    title: "Rediseño Facturación Colombia",
    status: "backlog",
    date: "03/04/2026",
    objectiveTag: "adoption",
    problem: "Solo el 16% de los usuarios pagos usan la app para facturar.",
    hypothesis: "El rediseño aumentará el uso, la conversión y el cross-selling.",
    kpis: ["KR 2.1", "KR 2.2", "KR 2.3"],
    sprintStart: 5,
    sprintEnd: 6,
  },
];

export interface OKR {
  id: string;
  objective: string;
  type: "experience" | "adoption";
  keyResults: {
    id: string;
    name: string;
    baseline: string;
    target: string;
    current: number;
    progress: number;
  }[];
}

export const okrs: OKR[] = [
  {
    id: "obj-1",
    objective: "Mejorar Experiencia de Usuario",
    type: "experience",
    keyResults: [
      { id: "kr-1.1", name: "Rating Google Play", baseline: "4.7", target: "4.9", current: 4.8, progress: 50 },
      { id: "kr-1.2", name: "Rating App Store", baseline: "4.3", target: "4.7", current: 4.5, progress: 50 },
      { id: "kr-1.3", name: "Reducción de errores", baseline: "8k/sem", target: "-80%", current: 4000, progress: 50 },
    ],
  },
  {
    id: "obj-2",
    objective: "Aumentar Adopción y Engagement",
    type: "adoption",
    keyResults: [
      { id: "kr-2.1", name: "Facturas creadas", baseline: "0", target: "30k", current: 12000, progress: 40 },
      { id: "kr-2.2", name: "Tasa de instalación", baseline: "0%", target: "25%", current: 10, progress: 40 },
      { id: "kr-2.3", name: "WAU (Weekly Active Users)", baseline: "0%", target: "60%", current: 25, progress: 42 },
    ],
  },
];
